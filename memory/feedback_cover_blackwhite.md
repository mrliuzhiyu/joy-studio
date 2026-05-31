---
name: feedback_cover_blackwhite
description: 封面 / 头图一律纯黑白无彩色；不放顶部 logo/badge 行，主视觉用本期主题的单色图标居中
metadata:
  type: feedback
---

Joy 2026-05-31：封面（头图）要**纯黑白、零彩色**，并且要有 logo。

**Why**：009 的封面是暖黄金渐变底（暗金 #b8860b），Joy 不喜欢，两次强调「不要屎黄色背景和黄色配色」「无颜色，黑白就行」。零彩色是 Joy 一贯偏好（见 [[feedback_wechat_image_workflow]]）。

**How to apply**：
- 版式学 009 的 cover-final.html（900×383 母图，微信从中央 383 方裁；结构：左竖条 + 右上 pill badge + 期号 kicker + 大标题 + 副标 + 底部署名）。
- 但配色全部黑白灰：底 `#fafafa` / 白，标题 `#1a1a1a`，副标 `#666`，署名 `#aaa`，竖条 / pill 边框 / logo 方块全用黑 `#1a1a1a`，**关键词强调用下划线（text-decoration underline）而不是颜色**。
- **不放顶部 logo / badge 行**（Joy 2026-05-31 明确嫌它占顶部）。主视觉改用**与本期主题相关的单色图标**，居中放在标题上方（如 010 用 Postgres 大象）。图标从 simple-icons 取黑色版：`Invoke-WebRequest "https://cdn.simpleicons.org/<slug>/1a1a1a" -OutFile assets/icon.svg`，用 `<img src="icon.svg">` 引入。Joy 身份靠底部署名「刘志宇 Joy · AI 观察」就够，不必再放 logo。
- 做法：写一个 div 版 `assets/cover.html`（不用 cover-template 的 canvas），`navigate` → `emulate viewport 900x383x2` → `take_screenshot` 存 `cover-0XX.png`。比 canvas 模板可控。
- 范围：本条只管**封面**。正文结构图（diagram）的书摘风暗金 / 暗红是另一回事（009 先例、Joy 接受过）；除非 Joy 要全套黑白统一，否则正文图不动。

关联：[[feedback_text_architecture_diagrams]] · [[feedback_wechat_image_workflow]] · [[feedback_writing_voice]]
