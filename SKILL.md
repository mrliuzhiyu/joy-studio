---
name: wx-article
description: |
  按「参考答案阅览室」风格的书摘公号排版，生成微信公众号文章的单文件 HTML。
  严格遵循 design.md 中的字体/字号/间距/颜色规范（Optima-Regular + PingFangTC-light / 16px / 1.75em / 0.578px letter-spacing / 32px 段间距 / Futura-Medium 章节编号 + 6px 粗黑线）。
  产出 HTML 自带"复制正文（无白边）"按钮，用 JavaScript 精确选中 article 内容，避免 Ctrl+A 带入 body 白边导致公众号左右错位。
  Use when: 用户说"写公众号"、"做公众号排版"、"公众号文章"、"粘到公众号"、"书摘公号风"、"参考答案阅览室那种排版"、或上传了公众号截图要求复刻。
  Do NOT use when: 用户要写博客、论坛帖、Notion 文档——那些平台的排版规则不同。
allowed-tools:
  - Read
  - Write
  - Edit
  - Bash
---

# 微信公众号 · 书摘公号风排版

## 什么时候调用这个 skill

**触发场景**（满足任意一个即可主动用它）：
- 用户说"写公众号"、"做一篇公众号文章"、"公众号排版"、"粘到公众号"
- 用户上传公众号截图说"复刻这种样式"
- 用户提到"书摘号"、"参考答案阅览室"、"机器之心风格"、"知识型公号"这类关键词
- 在已有项目里用户提到"把结果写成公众号"、"导出公众号版"

**不要用于**：
- 博客（比如 VitePress / Hexo / Jekyll）——那些有自己的 CSS
- Notion / 飞书 / 语雀文档——富文本规则不同
- 技术 README / markdown 文档——公众号样式会看起来过度装饰
- 营销长图文/长图——那是另一种排版逻辑（用 design-html skill）

---

## 产出规范

**每次调用必须输出一个单文件 HTML**，包含：

### 必须包含
1. **精确对齐 design.md** 的字体栈、字号、行高、字间距、margin、颜色——不要自创数值
2. **外层单一 `<article>` 容器**，`max-width: 677px`（公众号内容区实际宽度），居中，白底
3. **右上角浮动"复制正文（无白边）"按钮**（`position: fixed`），带 JS 实现 `selectNodeContents(article)` + `execCommand('copy')`
4. **章节编号用 `<section display:inline-block; border-top:6px solid #000>` + Futura-Medium 36px**
5. **所有样式 inline**——不要用 `<style>` 块、不要 CSS 变量、不要 class
6. **粘贴说明框**放在 article **外面**（不参与复制）

### 必须避免
- `<style>` 块 / `<link>` 外部 CSS / CSS 变量 `var(--x)` / `:root` / `@media` / `@keyframes`（都会被公众号编辑器剥）
- `display: flex` / `display: grid`（iOS 微信不稳）
- `position: absolute/relative`（正文内）
- `<iframe>` / `<script>` 除了复制按钮那一段 JS
- 用 `class` 做样式控制（class 不生效）
- 裸的 `<body>` padding（会被编辑器吃壳，反而导致左右错位）
- `<img>` 不带 `width="X" height="Y"` 属性（iOS 不渲染）

---

## 执行流程

**第 1 步 · 收集素材**
问用户：
- 文章主题 / 核心观点
- 是否有截图素材（公众号不嵌 iframe，要用 `<img>` + 上传到素材库）
- 是否有特定日期 / 作者署名
- 章节数（通常 5-7 章最好看）

**第 2 步 · 写作**
按 [design.md](./design.md) 的每条规则逐块生成 HTML。建议用 [template.html](./template.html) 作为起手式，直接替换示例章节的内容。

**第 3 步 · 产出位置**
默认写到 `issues/00X-{slug}/platforms/wechat.html`，X 是当前最大编号 + 1，slug 是英文短句。若对应 issue 文件夹不存在则先创建（含 `assets/` `experiments/` `platforms/` 三个子目录）。除非用户另有指定。

**第 4 步 · 告诉用户怎么用**
一句话说明：
- 浏览器打开 HTML
- 点右上角"复制正文（无白边）"按钮
- 到公众号图文编辑器 Ctrl+V
- 图片占位处替换成实际截图（上传到素材库后）
- **真实效果要在 iOS/Mac 微信里看**（Windows 上 Optima 不存在会回退）

---

## 关键知识 · 微信粘贴兼容性

（详细见 [design.md](./design.md) 末尾"微信 HTML 兼容性清单"）

公众号图文编辑器处理粘贴 HTML 的核心事实：
- 保留：所有 inline style 白名单属性（font、color、margin、padding、border、width、max-width）
- 剥掉：`<style>`、`<script>`、`<link>`、`<iframe>`、`<form>`、`id`、`on*` 事件
- 段落 margin 会被**部分重置**——所以 `<section>` 包段落比裸 `<p>` 更稳
- 最外层**只包一层 `<section>`**（或 article），再嵌 2-3 层内层即可

---

## 相关资源

- [design.md](./design.md) — 完整字体/字号/颜色/间距规范
- [template.html](./template.html) — 空模板（起手式，直接改内容）
- [refs/cankao-content.html](./refs/cankao-content.html) — 参考答案阅览室原始 HTML（design.md 抠样式的源）
- [refs/cankao-judgment.html](./refs/cankao-judgment.html) / [cankao-sunyatsen.html](./refs/cankao-sunyatsen.html) — 范文样本，写新文章时可对照风格
