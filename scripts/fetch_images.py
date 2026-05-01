#!/usr/bin/env python3
"""
图片素材自动抓取工具

用法：
  python scripts/fetch_images.py <markdown 文件>            # 从 markdown 抓所有引用链接
  python scripts/fetch_images.py <URL>                      # 抓单个 URL
  python scripts/fetch_images.py <md> --output <目录>       # 指定输出目录
  python scripts/fetch_images.py <md> --cards               # 同时生成 self-contained HTML 卡片
  python scripts/fetch_images.py <md> --no-pdf              # 跳过 PDF（arXiv 论文）
  python scripts/fetch_images.py <md> --max-per-source 5    # 每个源最多保留几张图

依赖（首次使用）：
  pip install -r scripts/requirements.txt
"""

from __future__ import annotations

import argparse
import base64
import json
import re
import sys
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import urljoin, urlparse

# Windows 控制台默认 GBK，强制 stdout/stderr 用 UTF-8 输出中文
if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

import requests
from bs4 import BeautifulSoup

try:
    import fitz  # PyMuPDF
    HAS_PYMUPDF = True
except ImportError:
    HAS_PYMUPDF = False


HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/131.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml,application/pdf,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9,zh-CN;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Sec-Ch-Ua": '"Chromium";v="131", "Not_A Brand";v="24"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Platform": '"Windows"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1",
}
TIMEOUT = 30
MIN_IMAGE_SIZE = 8000          # 8 KB · 过滤装饰小图（icon / 1x1 像素）
MAX_IMAGE_SIZE = 8_000_000     # 8 MB · 过滤过大图，base64 后会爆炸
RETRY = 2
SLEEP_BETWEEN = 0.5

CONTENT_TYPE_TO_EXT = {
    "image/png": ".png",
    "image/jpeg": ".jpg",
    "image/jpg": ".jpg",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/gif": ".gif",
}


# ────────────────────────────────────────────────────────────────────
# 工具函数
# ────────────────────────────────────────────────────────────────────

def slugify(text: str, max_len: int = 60) -> str:
    """转为安全文件名"""
    text = re.sub(r'[<>:"/\\|?*\x00-\x1f]', "-", str(text))
    text = re.sub(r"\s+", "-", text)
    text = re.sub(r"-+", "-", text)
    text = text.strip("-.")
    return text[:max_len] or "untitled"


def url_to_dirname(url: str) -> str:
    parsed = urlparse(url)
    name = (parsed.netloc + parsed.path).replace("/", "-").strip("-")
    return slugify(name)


def is_arxiv_abs(url: str) -> bool:
    return "arxiv.org/abs/" in url


def is_arxiv_pdf(url: str) -> bool:
    return "arxiv.org/pdf/" in url or url.lower().endswith(".pdf")


def normalize_arxiv_url(url: str) -> str:
    if is_arxiv_abs(url):
        return url.replace("/abs/", "/pdf/")
    return url


def is_image_url(url: str) -> bool:
    path = urlparse(url).path.lower()
    return path.endswith((".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"))


def safe_get(url: str, **kwargs) -> requests.Response | None:
    last_err = None
    for attempt in range(RETRY + 1):
        try:
            resp = requests.get(
                url,
                headers=HEADERS,
                timeout=TIMEOUT,
                allow_redirects=True,
                **kwargs,
            )
            if resp.status_code == 200:
                return resp
            last_err = f"HTTP {resp.status_code}"
        except Exception as e:
            last_err = str(e)
        if attempt < RETRY:
            time.sleep(1.5 ** attempt)
    print(f"    [error] GET {url}: {last_err}")
    return None


def escape_html(s: str) -> str:
    return (
        str(s)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


# ────────────────────────────────────────────────────────────────────
# HTML 抓图
# ────────────────────────────────────────────────────────────────────

def extract_html_images(url: str) -> tuple[list[dict], dict]:
    """
    返回 (images, meta)
    images: list of {alt, url}
    meta: {title, description}
    """
    resp = safe_get(url)
    if not resp:
        return [], {}

    soup = BeautifulSoup(resp.content, "html.parser")

    title = soup.title.get_text(strip=True) if soup.title else url
    og_desc = soup.find("meta", property="og:description")
    description = og_desc["content"].strip() if og_desc and og_desc.get("content") else ""

    images: list[dict] = []
    seen: set[str] = set()

    def add(src: str | None, alt: str = ""):
        if not src:
            return
        full = urljoin(url, src.strip())
        if full in seen:
            return
        if not full.startswith(("http://", "https://")):
            return
        seen.add(full)
        images.append({"alt": alt or "", "url": full})

    # OG image / Twitter card image
    og = soup.find("meta", property="og:image")
    if og and og.get("content"):
        add(og["content"], "og:image")
    tw = soup.find("meta", attrs={"name": "twitter:image"})
    if tw and tw.get("content"):
        add(tw["content"], "twitter:image")

    # 所有 <img>
    for img in soup.find_all("img"):
        src = (
            img.get("src")
            or img.get("data-src")
            or img.get("data-original")
            or img.get("data-lazy-src")
        )
        add(src, img.get("alt", ""))
        # srcset 取第一个 URL
        srcset = img.get("srcset") or img.get("data-srcset")
        if srcset:
            first = srcset.split(",")[0].strip().split()[0]
            add(first, img.get("alt", ""))

    # <source> 标签（picture 元素）
    for src_tag in soup.find_all("source"):
        srcset = src_tag.get("srcset")
        if srcset:
            first = srcset.split(",")[0].strip().split()[0]
            add(first, "picture")

    return images, {"title": title, "description": description}


# ────────────────────────────────────────────────────────────────────
# PDF 抓图
# ────────────────────────────────────────────────────────────────────

def extract_pdf_images(url: str) -> list[dict]:
    """
    返回 list of {alt, content (bytes), filename}
    """
    if not HAS_PYMUPDF:
        print("    [skip] PDF · 未安装 PyMuPDF（pip install pymupdf）")
        return []

    resp = safe_get(url)
    if not resp:
        return []

    images: list[dict] = []
    try:
        doc = fitz.open(stream=resp.content, filetype="pdf")
    except Exception as e:
        print(f"    [error] PDF parse: {e}")
        return []

    for page_num, page in enumerate(doc, start=1):
        for img_index, img_info in enumerate(page.get_images(full=True), start=1):
            xref = img_info[0]
            try:
                pix = fitz.Pixmap(doc, xref)
            except Exception:
                continue
            if pix.width < 200 or pix.height < 150:
                pix = None
                continue
            try:
                if pix.n - pix.alpha > 3:
                    pix = fitz.Pixmap(fitz.csRGB, pix)
                content = pix.tobytes("png")
            except Exception:
                pix = None
                continue
            pix = None
            if len(content) < MIN_IMAGE_SIZE:
                continue
            filename = f"page{page_num:03d}-img{img_index:02d}.png"
            images.append({
                "alt": f"PDF p.{page_num}",
                "content": content,
                "filename": filename,
                "size": len(content),
            })
    doc.close()
    return images


# ────────────────────────────────────────────────────────────────────
# 下载单图
# ────────────────────────────────────────────────────────────────────

def download_one_image(img_url: str) -> tuple[bytes, str, str] | None:
    """返回 (content, content_type, filename) 或 None"""
    resp = safe_get(img_url)
    if not resp:
        return None
    content = resp.content
    if len(content) < MIN_IMAGE_SIZE:
        return None
    if len(content) > MAX_IMAGE_SIZE:
        return None

    content_type = resp.headers.get("Content-Type", "").split(";")[0].strip().lower()

    # 文件名 + 扩展名
    parsed = urlparse(img_url)
    base = Path(parsed.path).name or "image"
    if "." not in base:
        ext = CONTENT_TYPE_TO_EXT.get(content_type, ".jpg")
        base += ext
    return content, content_type, base


# ────────────────────────────────────────────────────────────────────
# 主流程：抓单个 URL
# ────────────────────────────────────────────────────────────────────

def fetch_one_url(
    url: str,
    base_dir: Path,
    skip_pdf: bool = False,
    max_per_source: int | None = None,
) -> dict:
    print(f"\n>>> {url}")

    # 类型识别
    if is_arxiv_abs(url):
        url = normalize_arxiv_url(url)
        print(f"    [arxiv] 转 PDF URL: {url}")

    is_pdf = is_arxiv_pdf(url)
    is_img = is_image_url(url)

    dir_name = url_to_dirname(url)
    out_dir = base_dir / dir_name
    out_dir.mkdir(parents=True, exist_ok=True)

    metadata = {
        "source_url": url,
        "fetched_at": datetime.now().isoformat(),
        "type": "pdf" if is_pdf else ("image" if is_img else "html"),
        "title": "",
        "description": "",
        "images": [],
    }

    if is_pdf:
        if skip_pdf:
            print("    [skip] PDF · 用 --no-pdf 跳过")
            return metadata
        print("    [pdf] 提取图片...")
        pdf_images = extract_pdf_images(url)
        if max_per_source:
            pdf_images = pdf_images[:max_per_source]
        for img in pdf_images:
            (out_dir / img["filename"]).write_bytes(img["content"])
            metadata["images"].append({
                "filename": img["filename"],
                "alt": img["alt"],
                "size": img["size"],
            })
            print(f"      saved: {img['filename']} ({img['size']//1024} KB)")

    elif is_img:
        print("    [image] 直接下载...")
        result = download_one_image(url)
        if result:
            content, ctype, fname = result
            (out_dir / fname).write_bytes(content)
            metadata["images"].append({
                "filename": fname,
                "alt": "",
                "original_url": url,
                "size": len(content),
                "content_type": ctype,
            })
            print(f"      saved: {fname} ({len(content)//1024} KB)")

    else:  # HTML
        print("    [html] 解析页面...")
        img_list, meta = extract_html_images(url)
        metadata["title"] = meta.get("title", "")
        metadata["description"] = meta.get("description", "")
        print(f"    [html] 找到 {len(img_list)} 个候选图片")
        if max_per_source:
            img_list = img_list[:max_per_source]

        for i, item in enumerate(img_list, start=1):
            time.sleep(SLEEP_BETWEEN)
            result = download_one_image(item["url"])
            if not result:
                continue
            content, ctype, original_name = result
            ext = Path(original_name).suffix or ".jpg"
            stem = slugify(Path(original_name).stem, 30)
            fname = f"img-{i:02d}-{stem}{ext}"
            (out_dir / fname).write_bytes(content)
            metadata["images"].append({
                "filename": fname,
                "alt": item["alt"],
                "original_url": item["url"],
                "size": len(content),
                "content_type": ctype,
            })
            print(f"      saved: {fname} ({len(content)//1024} KB) · {item['alt'][:50]}")

    # 写 metadata
    (out_dir / "metadata.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    return metadata


# ────────────────────────────────────────────────────────────────────
# Markdown 链接提取
# ────────────────────────────────────────────────────────────────────

LINK_RE = re.compile(r"\[([^\]]+)\]\((https?://[^\)]+)\)")


def extract_links_from_markdown(md_path: Path) -> list[tuple[str, str]]:
    text = md_path.read_text(encoding="utf-8")
    seen = set()
    out = []
    for m in LINK_RE.finditer(text):
        label, url = m.group(1).strip(), m.group(2).strip()
        if url in seen:
            continue
        seen.add(url)
        out.append((label, url))
    return out


# ────────────────────────────────────────────────────────────────────
# 索引页 + 引用卡片生成
# ────────────────────────────────────────────────────────────────────

CARD_TEMPLATE = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<style>
  body {{ margin:0; padding:40px 20px; background:#f2f2f2; font-family:'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif; }}
  .wrap {{ max-width:677px; margin:0 auto; }}
</style>
</head>
<body>
<div class="wrap">
<section style="border-top:6px solid rgb(0,0,0); padding:20px 24px 22px; margin:0; background:white; max-width:677px; box-sizing:border-box; font-family:Optima-Regular, PingFangTC-light, 'PingFang SC', sans-serif;">
<p style="margin:0 0 14px; line-height:1.4; letter-spacing:0.578px;">
  <span style="font-family:Optima-Regular, PingFangTC-light, 'PingFang SC', sans-serif; font-size:13px; color:rgb(150,150,150); letter-spacing:1.2px; text-transform:uppercase;">{label}</span>
</p>
<figure style="margin:0;">
  <img src="data:{ctype};base64,{b64}" alt="{alt}" style="display:block; width:100%; max-width:100%; height:auto;">{caption_block}
</figure>
<p style="margin:14px 0 0; padding-top:12px; border-top:1px solid rgb(236,236,236); line-height:1.5;">
  <span style="font-family:Optima-Regular, PingFangTC-light, sans-serif; font-size:12px; color:rgb(150,150,150); letter-spacing:0.5px;">出处 · </span><a href="{source_url}" style="font-family:Optima-Regular, PingFangTC-light, sans-serif; font-size:12px; color:rgb(85,85,85); letter-spacing:0.5px; text-decoration:none; border-bottom:1px solid rgb(200,200,200);">{source_url}</a>
</p>
</section>
</div>
</body>
</html>
"""


def guess_content_type(filename: str) -> str:
    ext = Path(filename).suffix.lower()
    return {
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml",
        ".gif": "image/gif",
    }.get(ext, "image/jpeg")


def generate_card(image_path: Path, source_url: str, label: str, alt: str, out_path: Path) -> None:
    content = image_path.read_bytes()
    b64 = base64.b64encode(content).decode("ascii")
    ctype = guess_content_type(image_path.name)
    caption = ""
    if alt and alt not in ("og:image", "twitter:image", "picture"):
        caption = f'\n  <figcaption style="margin:8px 0 0; font-size:12px; color:rgb(150,150,150); letter-spacing:0.5px; line-height:1.5;">{escape_html(alt)}</figcaption>'
    html = CARD_TEMPLATE.format(
        title=escape_html(label or "引用卡片"),
        label=escape_html(label or "SOURCE"),
        b64=b64,
        ctype=ctype,
        alt=escape_html(alt),
        caption_block=caption,
        source_url=escape_html(source_url),
    )
    out_path.write_text(html, encoding="utf-8")


def generate_index_page(base_dir: Path, all_metadata: list[dict]) -> None:
    items = []
    for m in all_metadata:
        source = m["source_url"]
        title = m.get("title") or source
        dirname = url_to_dirname(source)
        for img in m["images"]:
            items.append({
                "src": f"{dirname}/{img['filename']}",
                "card": f"{dirname}/{Path(img['filename']).stem}.card.html",
                "alt": img.get("alt", ""),
                "size_kb": img.get("size", 0) // 1024,
                "title": title,
                "source": source,
            })

    parts = [
        '<!DOCTYPE html>',
        '<html lang="zh-CN"><head><meta charset="UTF-8">',
        '<title>抓取的图片素材</title>',
        '<style>',
        'body{margin:0;padding:40px;background:#f2f2f2;font-family:system-ui,"PingFang SC","Microsoft YaHei",sans-serif;color:#222;}',
        'h1{margin:0 0 8px;font-size:22px;}',
        '.lead{color:#666;margin:0 0 32px;max-width:780px;line-height:1.6;}',
        '.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;}',
        '.card{background:white;padding:14px;border-top:3px solid #000;}',
        '.card img{width:100%;height:auto;display:block;margin-bottom:10px;background:#fafafa;cursor:zoom-in;}',
        '.meta{font-size:11px;color:#999;letter-spacing:0.5px;margin-bottom:6px;display:flex;justify-content:space-between;}',
        '.alt{font-size:13px;color:#222;margin:0 0 8px;line-height:1.4;min-height:36px;}',
        '.title{font-size:11px;color:#666;margin:0 0 4px;line-height:1.4;}',
        '.src{font-size:10px;color:#aaa;word-break:break-all;line-height:1.5;}',
        'a{color:#666;text-decoration:none;border-bottom:1px solid #ddd;}',
        'a:hover{color:#000;border-bottom-color:#000;}',
        '.card-link{display:inline-block;margin-top:8px;font-size:11px;color:rgb(198,97,63);border-bottom-color:rgb(198,97,63);}',
        '</style></head><body>',
        f'<h1>抓取的图片素材 · 共 {len(items)} 张</h1>',
        f'<p class="lead">从 {len(all_metadata)} 个 URL 抓取得到。点击图片放大；点击 → 卡片 打开 self-contained HTML 引用卡片，截图后可上传公众号素材库。</p>',
        '<div class="grid">',
    ]
    for it in items:
        parts.append('<div class="card">')
        parts.append(f'<a href="{it["src"]}" target="_blank"><img src="{it["src"]}" alt="{escape_html(it["alt"])}"></a>')
        parts.append(f'<div class="meta"><span>{it["size_kb"]} KB</span></div>')
        parts.append(f'<div class="alt">{escape_html(it["alt"])[:120] or "(no alt)"}</div>')
        parts.append(f'<div class="title">{escape_html(it["title"])[:80]}</div>')
        parts.append(f'<div class="src"><a href="{it["source"]}" target="_blank">{escape_html(it["source"])}</a></div>')
        parts.append(f'<a class="card-link" href="{it["card"]}" target="_blank">→ 打开引用卡片</a>')
        parts.append('</div>')
    parts.append('</div></body></html>')

    (base_dir / "index.html").write_text("\n".join(parts), encoding="utf-8")


# ────────────────────────────────────────────────────────────────────
# main
# ────────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser(description="图片素材自动抓取工具")
    ap.add_argument("target", help="markdown 文件路径 或 单个 URL")
    ap.add_argument("--output", "-o", default=None,
                    help="输出目录（默认 <issue>/assets/extracted/ 或 ./extracted/）")
    ap.add_argument("--cards", action="store_true",
                    help="同时生成 self-contained HTML 引用卡片（base64 内嵌图）")
    ap.add_argument("--no-pdf", action="store_true", help="跳过 PDF（arXiv 论文）")
    ap.add_argument("--max-per-source", type=int, default=None,
                    help="每个源最多保留几张图（防止某些页 100+ 图）")
    args = ap.parse_args()

    target = args.target

    # 决定输出目录
    if args.output:
        base_dir = Path(args.output)
    else:
        target_path = Path(target)
        if target_path.exists() and target_path.suffix == ".md":
            base_dir = target_path.parent / "assets" / "extracted"
        else:
            base_dir = Path("./extracted")
    base_dir.mkdir(parents=True, exist_ok=True)
    print(f"输出目录: {base_dir.resolve()}\n")

    # 收集 URL
    target_path = Path(target)
    if target_path.exists() and target_path.suffix == ".md":
        print(f"读取 markdown: {target}")
        links = extract_links_from_markdown(target_path)
        print(f"找到 {len(links)} 个独立链接\n")
        urls = [(label, url) for label, url in links]
    else:
        urls = [(target, target)]

    # 抓取
    all_metadata = []
    for i, (label, url) in enumerate(urls, start=1):
        print(f"[{i}/{len(urls)}]", end=" ")
        try:
            metadata = fetch_one_url(
                url, base_dir,
                skip_pdf=args.no_pdf,
                max_per_source=args.max_per_source,
            )
            metadata["label"] = label
            all_metadata.append(metadata)
        except KeyboardInterrupt:
            print("\n[中断]")
            break
        except Exception as e:
            print(f"    [error] {e}")
        time.sleep(SLEEP_BETWEEN)

    # 生成卡片
    if args.cards:
        print("\n生成引用卡片...")
        for m in all_metadata:
            dirname = url_to_dirname(m["source_url"])
            d = base_dir / dirname
            for img in m["images"]:
                img_path = d / img["filename"]
                if not img_path.exists():
                    continue
                card_path = d / (Path(img["filename"]).stem + ".card.html")
                generate_card(
                    image_path=img_path,
                    source_url=m["source_url"],
                    label=m.get("label", "") or m.get("title", ""),
                    alt=img.get("alt", ""),
                    out_path=card_path,
                )
        print(f"卡片生成完毕")

    # 生成索引
    generate_index_page(base_dir, all_metadata)
    total_imgs = sum(len(m["images"]) for m in all_metadata)
    print(f"\n[done] 索引页: {base_dir / 'index.html'}")
    print(f"[done] 共 {total_imgs} 张图，来自 {len(all_metadata)} 个 URL")
    print(f"[done] 浏览器打开 index.html 挑选要用的图")


if __name__ == "__main__":
    main()
