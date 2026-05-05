# 工作台脚本

## 首次安装依赖

两个脚本共用一组 Python 依赖，一次装齐：

```bash
pip install -r scripts/requirements.txt
```

包含：

- `requests` / `beautifulsoup4` / `pymupdf` — `fetch_images.py` 用
- `youtube-transcript-api` — `fetch_youtube.py` 用（直接拿 YouTube 字幕，不需要 API key）

---

## fetch_youtube.py · YouTube 视频转录抓取

把 YouTube 视频的字幕（手动或自动生成）抓成 markdown，方便引用 / 摘录 / 喂给 AI 做研究素材。视频里很多内容（演讲、访谈、播客）没有公开文字版，靠字幕能补上 research 来源里的视频盲区。

### 抓字幕的用法

**最常用**：从一篇 issue 的 notes.md / draft.md 自动扫所有 YouTube 链接抓转录。

```bash
python scripts/fetch_youtube.py --from-file issues/005-agent-memory/notes.md --output issues/005-agent-memory/experiments/youtube/
```

**抓单个视频**：

```bash
python scripts/fetch_youtube.py https://www.youtube.com/watch?v=XXXXXXXXXXX
python scripts/fetch_youtube.py XXXXXXXXXXX                    # 也支持裸 video id
```

**抓多个**：

```bash
python scripts/fetch_youtube.py <url1> <url2> <id3> --output issues/005-agent-memory/experiments/youtube/
```

**全部参数**：

| 参数 | 作用 |
|---|---|
| `inputs` | YouTube URLs 或 11 字符 video IDs（可多个） |
| `--from-file` | 从 markdown 文件扫 YouTube 链接，自动抓全 |
| `--output` / `-o` | 输出目录（默认 `experiments/youtube/`） |
| `--lang` | 优先字幕语言，逗号分隔（默认 `zh-Hans,zh-CN,zh,en,en-US`） |
| `--skip-existing` | 已抓过的不重抓 |
| `--sleep` | 每个视频之间等待秒数（默认 0.5，避免被限流） |

### 字幕优先级

1. **手动字幕**（按 `--lang` 顺序找）
2. **自动生成字幕**（按 `--lang` 顺序找）
3. **任何可用字幕**（fallback）

中文视频默认拿到中文字幕；英文视频拿到英文字幕；如果都没有手动字幕，自动生成的也照拿。

### 输出格式

每个视频一个 markdown 文件，例如 `experiments/youtube/dQw4w9WgXcQ.md`：

```markdown
# 视频标题

- **作者**：频道名
- **视频**：https://www.youtube.com/watch?v=dQw4w9WgXcQ
- **时长**：03:32
- **字幕**：zh-Hans · 自动生成
- **抓取时间**：2026-05-03 14:30:00

---

## 转录

`[00:00]` 第一句话
`[00:05]` 第二句话
...
```

时间戳用反引号包成 inline code，markdown 渲染后醒目；秒数对齐方便复盘时跳读。

### 中国大陆访问 YouTube

直连 YouTube 会被拒（IP block / 区域限制）。脚本支持代理：

```bash
# 方式 1：命令行 --proxy 参数
python scripts/fetch_youtube.py <id> --proxy http://127.0.0.1:7890

# 方式 2：环境变量（推荐，一次设好后所有调用都自动用）
export HTTPS_PROXY=http://127.0.0.1:7890
python scripts/fetch_youtube.py <id>
```

`7890` 是 Clash 的默认端口。其他常见代理工具：v2rayN（10809）、Shadowsocks（1080）。具体端口看你本地代理的设置。

### 字幕抓不到怎么办

- **字幕被禁用**：作者关掉了字幕功能。无解，只能手听
- **YouTube 拒绝访问**：见上面「中国大陆访问 YouTube」
- **没有任何字幕**：脚本会试自动生成，但小语种 / 低播放量视频可能没自动字幕
- **YouTube 限流**：调大 `--sleep` 间隔（如 `--sleep 2`）

### 跟 research-brief 流程对接

工作流第 4 步深度搜索，遇到 YouTube 视频时：

1. 视频链接放进 notes.md「待 verify 的事实清单」或者临时 notes
2. `python scripts/fetch_youtube.py --from-file issues/00X-{slug}/notes.md --output issues/00X-{slug}/experiments/youtube/`
3. 转录 markdown 在 `experiments/youtube/` 下，每个视频一个文件
4. 在 research-brief 引用时直接用「video_id 视频转录」+ 时间戳定位段落

---

## fetch_images.py · 图片素材自动抓取

从 markdown 里的所有引用链接（或单个 URL）自动抓图，生成索引页和 self-contained HTML 引用卡片。

### 抓图的用法

**最常用**：从一篇 issue 的 draft.md 自动抓所有引用链接的图，并生成卡片。

```bash
python scripts/fetch_images.py issues/002-native-multimodal/draft.md --cards --max-per-source 8
```

输出到 `issues/002-native-multimodal/assets/extracted/`，浏览器打开 `index.html` 挑图。

**抓单个 URL**：

```bash
python scripts/fetch_images.py https://openai.com/index/hello-gpt-4o/ --output assets/extracted
```

**全部参数**：

| 参数 | 作用 |
|---|---|
| `target` | markdown 文件路径，或单个 URL |
| `--output` / `-o` | 输出目录（默认根据 markdown 路径推导）|
| `--cards` | 为每张图生成 self-contained HTML 引用卡片（base64 内嵌）|
| `--no-pdf` | 跳过 PDF（arXiv 论文）|
| `--max-per-source` | 每个源最多保留几张图（防止某些页 100+ 装饰图）|

### 抓取规则

- **HTML 页面**：提取 `<img>` / `<source>` / `srcset` / `og:image` / `twitter:image`
- **arXiv abs URL**：自动转 PDF URL（`/abs/` → `/pdf/`）
- **PDF**：用 PyMuPDF 提取嵌入图（< 200×150 像素或 < 8KB 的过滤掉）
- **直接图片 URL**：下载

每个源单独建子目录（用 URL 转出来的安全文件名），里面包含：
- 抓到的所有图片文件
- `metadata.json` 记录来源、抓取时间、每张图的 alt / size / 原始 URL
- 如果用了 `--cards`，每张图旁边还有同名 `.card.html` 文件（self-contained 引用卡片）

### 输出目录结构

```
issues/002-native-multimodal/assets/extracted/
├── index.html                                # 索引页（浏览器打开挑图）
├── openai.com-index-hello-gpt-4o/
│   ├── img-01-banner.jpg
│   ├── img-01-banner.card.html              # self-contained 引用卡片（图 base64 内嵌）
│   ├── img-02-...
│   └── metadata.json
├── arxiv.org-pdf-2405.09818/
│   ├── page001-img01.png                    # Chameleon 论文里的架构图
│   ├── page004-img02.png
│   ├── page010-img01.png                    # QK-Norm loss 曲线（如果论文里有）
│   └── metadata.json
└── ...
```

### 索引页 index.html 怎么用

浏览器打开后是一个网格，每张图一张卡：
- 缩略图（点击放大）
- alt 文字（图片说明）
- 来源 URL（点击访问）
- 文件大小
- **→ 打开引用卡片**（如果用了 `--cards`）—— 点击打开 self-contained HTML 卡片

挑选要用的图后：
1. 浏览器打开对应的 `.card.html`
2. 截图（推荐 ShareX / Win+Shift+S / 微信 Alt+A）
3. 上传 PNG 到公众号素材库
4. 在 `platforms/wechat.html` 里替换占位图

### 抓不到怎么办

- **HTML 页面是 JS 重渲染的**（如 Reddit / Twitter）：脚本抓不到。手动浏览器右键
- **要登录的页面**：脚本抓不到。手动浏览器右键
- **PDF 里没有嵌入图**（论文用 vector graphic / TikZ）：PyMuPDF 提取不到。需要 PDF 截图工具
- **arXiv 偶尔超时**：脚本会自动重试 2 次，再不行手动下 PDF

### 版权处理

- arXiv 论文图：学术使用 OK，标来源（论文标题 + arXiv ID）
- GitHub README 图：开源项目自己提供，OK 但标来源
- 官方博客图：厂商版权，引用 OK 但标来源
- 卡片底部自动带出处链接，本身就是合规引用形式
