# 002 配图素材

## 文件夹结构

```
assets/
├── README.md                                # 本文件
├── diagram-1-evolution.html                 # 配图 1 · 四代演进总图（自包含 SVG）
├── diagram-2-token-space.html               # 配图 2 · token 化数学空间（自包含 SVG）
├── diagram-3-architecture-compare.html      # 配图 3 · MiniCPM-o vs Chameleon（自包含 SVG）
└── tools/
    └── image-to-card.html                   # 工具页 · 把外部图片打包成 self-contained 引用卡片
```

## 三张架构 diagram（已完成）

我手画的架构图，全部用 SVG + inline CSS 写成，**不依赖任何外部图片**。HTML 文件本身就是完整素材。

工作流：
1. 浏览器打开 `diagram-X.html`
2. 用截图工具截图（推荐 ShareX / Win+Shift+S / 微信 Alt+A）
3. 截图保存为 PNG
4. 上传到公众号素材库
5. 在 `platforms/wechat.html` 里把对应位置的占位图替换成素材库 URL

截图建议：在高分辨率屏幕上截，导出尺寸 ≥ 1500px 宽，公众号显示后清晰度足。

## 工具页 · image-to-card.html

把任何外部图片（GPT-4o 官方博客 banner、Llama 4 产品图、Chameleon 论文架构图等）打包成 self-contained 的引用卡片 HTML。图片用 base64 内嵌进 HTML，文件本身就是完整素材，不依赖任何外部资源。

### 三种卡片类型

| 类型 | 适用场景 | 包含 |
|---|---|---|
| 官方引用（quote）| 引用厂商博客原话 + banner 图 | 标题 / 引文 / 图 / 图说明 / 出处链接 |
| 图示（figure）| 引用论文里的架构图 | 标题 / 图 / 图说明 / 解释文字 / 出处链接 |
| Banner | 单图 + 标题 + 出处 | 标题 / 图 / 出处链接 |

### 使用流程

1. **浏览器打开** [tools/image-to-card.html](tools/image-to-card.html)
2. **拖图 / 选图**（支持 PNG / JPG / WebP / SVG，建议 ≤ 2MB，太大 base64 后 HTML 体积膨胀）
3. **填标题、引文、图说明、出处链接**
4. **右侧实时预览**——满意后点下载，或复制 HTML 源码
5. **拿到 self-contained HTML 卡片** → 浏览器打开 → 截图 → 上传公众号素材库

### 卡片样式说明

按 [design.md](../../../design.md) 的书摘公号风：
- 顶部 6px 黑线 + 卡片本体
- 标题用浅灰大写字间距宽（小标识感）
- 引文 16px 正文 / 14px 说明 / 12px 出处链接
- 出处链接靠下，灰色细线分隔
- 字体栈用 Optima-Regular + PingFangTC-light（跟正文一致）

## 怎么从外部网址抓图

### 1. HTML 页面里的图（绝大多数情况）

浏览器打开 → 右键图片 → 图片另存为

适用：官方博客（OpenAI / Anthropic / Google / Meta blog）、GitHub README、第三方分析文章

### 2. 抓不到原图（懒加载 / 动画 / 背景图）

F12 打开开发者工具 → Network → Img 标签 → 刷新页面 → 找到目标图片 URL → 右键 Open in new tab → 另存为

或：F12 → Elements → 找到 `<img>` 标签 → 复制 src URL → 浏览器粘贴打开 → 另存为

### 3. arXiv 论文里的图

arXiv 的论文是 PDF。两种办法：

- 下载 PDF → 用截图工具截图（推荐 ShareX / Snipping Tool）→ 保存为 PNG
- 用 PDF 工具提取（pdfimages / Adobe Acrobat 导出图片）

### 4. 视频里的图

公众号文章不嵌视频，但视频里的关键画面可以截图。VLC / Potplayer 都支持暂停 + 截图。

## 版权处理

- **arXiv 论文里的架构图**：学术使用通常 OK，标明来源（论文标题 + arXiv ID + 作者）
- **GitHub 仓库 README 里的图**：开源项目自己提供，可使用，标来源（仓库 URL）
- **官方博客里的图**：厂商版权，引用使用通常 OK 但要标明来源（博客标题 + URL）
- **每张卡片底部都有出处链接**——本身就是合规引用的形式

## 002 文章里要做的几张引用卡片（建议）

按 [draft.md](../draft.md) 的章节顺序，建议补做以下卡片：

| 位置 | 卡片类型 | 建议内容 |
|---|---|---|
| 02 章 BLIP 段 | figure | BLIP 论文 / GitHub 的架构示意 |
| 03 章 CLIP 段 | figure | CLIP 论文里的对比学习示意图 |
| 04 章 GPT-4o 段 | quote | OpenAI 官方博客 banner + trained end-to-end 那段原话 |
| 04 章 Gemini 段 | quote | Google 官方博客 banner + built from the ground up 那段原话 |
| 04 章 Chameleon 段 | figure | 论文 Figure 1 架构图 |
| 05 章 Chameleon QK-Norm 段 | figure | 论文 §2.4 训练损失曲线（如有） |
| 05 章 Llama 4 段 | quote | Meta 官博 banner + first natively multimodal Llama 那段 |
| 05 章 MiniCPM-o 段 | figure | OpenBMB GitHub README 架构图 |
| 06 章 各厂商分类 | banner | 各模型 logo / 官方主图（可选）|

按需挑做。每张卡片做完放在 `assets/citation-cards/` 子目录。

## 完整素材工作流

1. 阅读 draft.md，列出要做的引用卡片清单
2. 浏览器打开外部网址，下载所需图片到本地
3. 用 [tools/image-to-card.html](tools/image-to-card.html) 把每张图打包成 HTML 卡片
4. 浏览器打开卡片 → 截图 → 保存 PNG
5. 上传所有 PNG（架构 diagram + 引用卡片）到公众号素材库
6. 在 `platforms/wechat.html`（SKILL 生成）里把图片占位符替换成素材库 URL
7. 公众号编辑器 Ctrl+V 粘贴 → 检查 → 发布
