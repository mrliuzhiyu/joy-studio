#!/usr/bin/env python3
"""
YouTube 视频转录抓取工具

把 YouTube 视频的字幕（手动或自动生成）抓成 markdown，方便引用 / 摘录 / 喂给 AI 做研究素材。

用法：
  python scripts/fetch_youtube.py <url 或 video_id> [<url 或 video_id>...]
  python scripts/fetch_youtube.py --from-file <markdown 文件>          # 扫文件里所有 YouTube 链接
  python scripts/fetch_youtube.py <id> --output <目录>                  # 指定输出目录
  python scripts/fetch_youtube.py <id> --lang zh-Hans,en               # 优先字幕语言
  python scripts/fetch_youtube.py <id> --skip-existing                 # 已存在的跳过

依赖（首次使用）：
  pip install -r scripts/requirements.txt
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

# Windows 控制台默认 GBK，强制 stdout/stderr 用 UTF-8 输出中文
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

try:
    from youtube_transcript_api import YouTubeTranscriptApi
    from youtube_transcript_api._errors import (
        TranscriptsDisabled,
        NoTranscriptFound,
        VideoUnavailable,
    )
    try:
        from youtube_transcript_api.proxies import GenericProxyConfig
        HAS_PROXY_CONFIG = True
    except ImportError:
        HAS_PROXY_CONFIG = False
except ImportError:
    print("缺依赖：pip install -r scripts/requirements.txt", file=sys.stderr)
    sys.exit(1)

import requests


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
}


# 支持的 YouTube URL 形态：
#   https://www.youtube.com/watch?v=XXXXXXXXXXX
#   https://youtu.be/XXXXXXXXXXX
#   https://www.youtube.com/embed/XXXXXXXXXXX
#   https://www.youtube.com/shorts/XXXXXXXXXXX
#   裸 11 字符 video id
URL_PATTERNS = [
    re.compile(r'(?:youtube\.com/watch\?v=|youtu\.be/|youtube\.com/embed/|youtube\.com/shorts/)([a-zA-Z0-9_-]{11})'),
]
BARE_ID_PATTERN = re.compile(r'^[a-zA-Z0-9_-]{11}$')


def extract_video_id(s: str) -> str | None:
    """从 URL 或裸 id 提取 11 字符 video id。"""
    s = s.strip()
    for pattern in URL_PATTERNS:
        match = pattern.search(s)
        if match:
            return match.group(1)
    if BARE_ID_PATTERN.match(s):
        return s
    return None


def collect_ids_from_file(path: Path) -> list[str]:
    """从 markdown / 任意文本文件里扫所有 YouTube 链接，返回去重后的 video id 列表。"""
    text = path.read_text(encoding="utf-8")
    ids = []
    seen = set()
    for pattern in URL_PATTERNS:
        for match in pattern.finditer(text):
            vid = match.group(1)
            if vid not in seen:
                seen.add(vid)
                ids.append(vid)
    return ids


def get_video_metadata(video_id: str) -> dict:
    """从 YouTube oEmbed 接口拿视频标题、作者。

    oEmbed 是 YouTube 公开接口，不需要 API key，几乎不被反爬限制。
    返回字段：title / author / author_url / thumbnail_url。
    """
    url = f"https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v={video_id}&format=json"
    try:
        r = requests.get(url, headers=HEADERS, timeout=10)
        r.raise_for_status()
        data = r.json()
        return {
            "title": data.get("title", "(unknown)"),
            "author": data.get("author_name", "(unknown)"),
            "author_url": data.get("author_url", ""),
            "thumbnail_url": data.get("thumbnail_url", ""),
        }
    except Exception as e:
        return {
            "title": "(failed to fetch metadata)",
            "author": "(unknown)",
            "author_url": "",
            "thumbnail_url": "",
            "metadata_error": str(e),
        }


def _snippet_field(snippet, field: str, default=None):
    """兼容老版 dict-style 和新版 object-style snippet。"""
    if isinstance(snippet, dict):
        return snippet.get(field, default)
    return getattr(snippet, field, default)


def fetch_transcript(video_id: str, languages: list[str], proxy: str | None = None) -> tuple[list, str]:
    """获取视频转录。

    优先级：手动字幕 > 自动生成字幕；语言按 languages 顺序找。
    返回 (entries, language_label)，entries 为字幕列表，failed 时为空。
    proxy 是 http(s) 代理 URL，比如 http://127.0.0.1:7890；中国大陆访问 YouTube 必需。
    """
    try:
        # youtube-transcript-api 1.x：实例方法 .list()，老版是类方法 .list_transcripts()
        if hasattr(YouTubeTranscriptApi, "list_transcripts"):
            transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)
        else:
            kwargs = {}
            if proxy and HAS_PROXY_CONFIG:
                kwargs["proxy_config"] = GenericProxyConfig(http_url=proxy, https_url=proxy)
            transcript_list = YouTubeTranscriptApi(**kwargs).list(video_id)
    except TranscriptsDisabled:
        return [], "字幕被禁用"
    except VideoUnavailable:
        return [], "视频不可用（私有 / 删除 / 区域限制）"
    except Exception as e:
        return [], f"获取字幕列表失败: {e}"

    transcript = None
    lang_used = None

    # 1. 优先手动创建的字幕
    for lang in languages:
        try:
            transcript = transcript_list.find_manually_created_transcript([lang])
            lang_used = f"{lang} · 手动"
            break
        except NoTranscriptFound:
            continue

    # 2. 退回自动生成字幕
    if transcript is None:
        for lang in languages:
            try:
                transcript = transcript_list.find_generated_transcript([lang])
                lang_used = f"{lang} · 自动生成"
                break
            except NoTranscriptFound:
                continue

    # 3. 还不行就拿任何能拿到的
    if transcript is None:
        for t in transcript_list:
            transcript = t
            kind = "自动生成" if getattr(t, "is_generated", False) else "手动"
            lang_used = f"{t.language_code} · {kind}"
            break

    if transcript is None:
        return [], "没有可用字幕"

    try:
        entries = transcript.fetch()
        # 转换为 list 形式（新版可能是 FetchedTranscript 对象）
        return list(entries), lang_used
    except Exception as e:
        return [], f"抓取字幕内容失败: {e}"


def format_seconds(seconds: float) -> str:
    """秒数 -> [HH:MM:SS] 或 [MM:SS]，方便读和搜。"""
    seconds = int(seconds)
    h = seconds // 3600
    m = (seconds % 3600) // 60
    s = seconds % 60
    if h > 0:
        return f"{h:02d}:{m:02d}:{s:02d}"
    return f"{m:02d}:{s:02d}"


def write_markdown(video_id: str, meta: dict, entries: list, lang: str, out_dir: Path) -> Path:
    """把元信息 + 转录写成 markdown 文件。"""
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{video_id}.md"

    # 总时长 = 最后一条字幕的 start + duration
    total_seconds = 0.0
    if entries:
        last = entries[-1]
        total_seconds = float(_snippet_field(last, "start", 0)) + float(_snippet_field(last, "duration", 0))

    title = meta.get("title", "(unknown)")
    author = meta.get("author", "(unknown)")
    author_url = meta.get("author_url", "")

    lines = [
        f"# {title}",
        "",
        f"- **作者**：{author}" + (f"（{author_url}）" if author_url else ""),
        f"- **视频**：https://www.youtube.com/watch?v={video_id}",
        f"- **时长**：{format_seconds(total_seconds)}",
        f"- **字幕**：{lang}",
        f"- **抓取时间**：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
    ]

    if "metadata_error" in meta:
        lines.append(f"- **元信息抓取错误**：{meta['metadata_error']}")

    lines.extend([
        "",
        "---",
        "",
        "## 转录",
        "",
    ])

    for entry in entries:
        timestamp = format_seconds(_snippet_field(entry, "start", 0))
        text = _snippet_field(entry, "text", "").replace("\n", " ").strip()
        if not text:
            continue
        lines.append(f"`[{timestamp}]` {text}")

    lines.append("")  # trailing newline
    out_path.write_text("\n".join(lines), encoding="utf-8")
    return out_path


def main():
    parser = argparse.ArgumentParser(
        description="抓 YouTube 视频转录文本",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__,
    )
    parser.add_argument("inputs", nargs="*", help="YouTube URLs 或 11 字符 video IDs")
    parser.add_argument("--from-file", type=Path, help="从 markdown 文件扫 YouTube 链接")
    parser.add_argument(
        "--output", "-o",
        type=Path,
        default=Path("experiments/youtube"),
        help="输出目录（默认 experiments/youtube/）",
    )
    parser.add_argument(
        "--lang",
        default="zh-Hans,zh-CN,zh,en,en-US",
        help="优先字幕语言，逗号分隔（默认中文优先 fallback 英文）",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        help="输出目录里已存在 {video_id}.md 的跳过，不重抓",
    )
    parser.add_argument(
        "--sleep",
        type=float,
        default=0.5,
        help="每个视频之间等待秒数，避免被限流（默认 0.5）",
    )
    parser.add_argument(
        "--proxy",
        default=os.environ.get("HTTPS_PROXY") or os.environ.get("HTTP_PROXY"),
        help="HTTP(S) 代理 URL（如 http://127.0.0.1:7890）。中国大陆访问 YouTube 必需。"
             "默认读 HTTPS_PROXY / HTTP_PROXY 环境变量",
    )
    args = parser.parse_args()

    video_ids = []
    seen = set()

    if args.from_file:
        if not args.from_file.exists():
            print(f"❌ 文件不存在：{args.from_file}", file=sys.stderr)
            sys.exit(1)
        scanned = collect_ids_from_file(args.from_file)
        print(f"从 {args.from_file} 扫到 {len(scanned)} 个 YouTube 视频")
        for vid in scanned:
            if vid not in seen:
                seen.add(vid)
                video_ids.append(vid)

    for inp in args.inputs:
        vid = extract_video_id(inp)
        if vid is None:
            print(f"⚠️  无法识别 video id：{inp}", file=sys.stderr)
            continue
        if vid not in seen:
            seen.add(vid)
            video_ids.append(vid)

    if not video_ids:
        print("没有可处理的视频。\n", file=sys.stderr)
        parser.print_help()
        sys.exit(1)

    languages = [l.strip() for l in args.lang.split(",") if l.strip()]

    print(f"\n开始处理 {len(video_ids)} 个视频，输出到 {args.output}/")
    print(f"字幕语言优先级：{' > '.join(languages)}")
    if args.proxy:
        print(f"代理：{args.proxy}")
    else:
        print("代理：无（如果 YouTube 拒绝访问，用 --proxy http://127.0.0.1:7890 或设 HTTPS_PROXY 环境变量）")
    print()

    success = 0
    failed = 0
    skipped = 0

    for i, vid in enumerate(video_ids, 1):
        out_path = args.output / f"{vid}.md"

        print(f"[{i}/{len(video_ids)}] {vid}")

        if args.skip_existing and out_path.exists():
            print(f"   ⏭  已存在，跳过")
            skipped += 1
            continue

        meta = get_video_metadata(vid)
        print(f"   📺 {meta['title']}")
        print(f"   👤 {meta['author']}")

        entries, lang = fetch_transcript(vid, languages, proxy=args.proxy)
        if not entries:
            print(f"   ❌ {lang}")
            failed += 1
            if i < len(video_ids):
                time.sleep(args.sleep)
            continue

        out_path = write_markdown(vid, meta, entries, lang, args.output)
        print(f"   ✓ 写入 {out_path}（{len(entries)} 条字幕，{lang}）")
        success += 1

        if i < len(video_ids):
            time.sleep(args.sleep)

    print(f"\n完成：成功 {success} / 失败 {failed} / 跳过 {skipped}")
    print(f"输出在 {args.output.resolve()}/")


if __name__ == "__main__":
    main()
