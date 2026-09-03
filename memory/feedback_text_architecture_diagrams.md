# 配图规范：真实结构图优先

Joy 2026-05-30 明确：**结构图 / 对比图 / 流程图要画成真实的图，不要纯文字 `<pre>` 块那种。** 公众号里也要是真 `<img>`，不是占位、不是等宽文本。

## 默认做法

1. 写稿时为每张图做一个 HTML 源：`issues/00X-{slug}/assets/diagram-N.html`。
   - 背景保持干净，默认暖白或纯白；颜色只用于区分关系，不为填满画面增加色块。
   - 不再把每张图套进同一种信息图模板。避免英文眉题、超大口号标题、对称卡片矩阵、圆形编号、通用浏览器窗口、勾选图标、pill 和彩色左竖条。
   - 根据关系本身选择表达：请求链路用连线，状态变化用时序，职责归属用边界，数量比较才用图表。
   - 一张图只解决一个文字不容易说明的问题。只是把正文换成卡片重新排一遍的图，直接删除。
   - 默认一篇保留 2–3 张真正必要的图，不为每章机械配图。
   - 图注可以烤进图里；公众号正文也可保留一行极轻的图注，按当期版式决定。
2. 用 chrome-devtools 渲染成 PNG（这套流程已验证可用）：
   - `navigate_page` 到 `file:///.../assets/diagram-N.html`
   - `emulate`（width 960、deviceScaleFactor 2 出高清）
   - `take_snapshot` 拿到卡片元素 uid（结构是 body>div.fig，uid 形如 `N_2`，每次导航 uid 前缀会变，要重新 snapshot）
   - `take_screenshot` 带 `uid` + `filePath assets/diagram-N.png`（按元素裁切，干净无白边）
3. draft.md 用 `![图 N · 描述](assets/diagram-N.png)` 引图；wechat.html 用 `<figure><img src="../assets/diagram-N.png" width="620" style="max-width:100%;height:auto;display:block;margin:0 auto;"></figure>`（图注已在图里，不再加 caption 段）。
4. 封面同理：`assets/cover.html`（套 cover-template.html、中央 1:1 安全区）→ 浏览器渲染 → 截 canvas 元素 → `cover-009.png`。

## 发布前

- wechat.html 里的 `../assets/*.png` 是本地预览路径；正式发布要把图传公众号素材库、替换成素材库 URL，并按 design.md §10 给 `<img>` 补 `width`/`height` 属性（iOS 微信需要）。

## 例外

- 极简单、一两行的东西可以直接行文说清，不必做图。但凡是「结构 / 对比 / 流程 / 时序」就做真实图，**不要纯文字块**。

## AI 模板感检查

Joy 2026-08-19 明确反馈：统一的蓝绿卡片信息图 AI 味很重，尤其是英文眉题、大标题、圆形编号和每图同构。

发布前逐张问：删掉标题后，这张图是否仍然靠结构表达了一个关系？如果答案是否定的，它更可能是装饰海报，不是有用配图。

## 关联

[[feedback_writing_voice]]（图注也守 voice：少英文、不说教）。流程位置见 WORKFLOW.md 第 5、8 步（其文字仍写「文本图」，以本文件为准——结构图一律真实图）。
