# 工作台脚本

## fetch_images.py · 图片素材自动抓取

从 markdown 里的所有引用链接（或单个 URL）自动抓图，生成索引页和 self-contained HTML 引用卡片。

### 首次安装依赖

```bash
pip install -r scripts/requirements.txt
```

三个库：`requests`（HTTP）、`beautifulsoup4`（解析 HTML）、`pymupdf`（解析 arXiv PDF）。

### 用法

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
