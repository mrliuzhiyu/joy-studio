---
name: feedback_wechat_text_emphasis
description: 公众号正文重点划线统一使用浅灰色粗标记线，压在文字下部，不用浏览器默认细下划线
metadata:
  type: feedback
---

# 公众号正文加粗与下划线（长期默认）

Joy 2026-08-23 明确：以后公众号正文里的重点划线，统一使用《产品文档为什么总是过期？AI时代正在换一种写法》的最终成品样式。

Joy 提供的成品截图显示：这不是浏览器默认的细下划线，而是贴在粗体文字下部的浅灰色粗标记线。换行后，每一行文字底部都要继续出现。

## 固定样式

```html
<strong style="text-decoration:none;background-image:linear-gradient(to bottom,transparent 64%,rgb(229,231,235) 64%);background-repeat:repeat-x;padding:0 2px;box-decoration-break:clone;-webkit-box-decoration-break:clone;">重点结论</strong>
```

- 文字保持黑色粗体。
- 划线使用浅灰色 `rgb(229,231,235)`，从文字高度约 64% 处开始，形成压住字脚的粗标记线。
- 使用行内 `background-image`，使多行重点句的每一行都有标记效果。
- 不使用浏览器默认 `text-decoration:underline` 细线。
- 不使用金色或其他强调色，不自定义单独的下划线偏移。
- 正文背景保持干净，不为强调句增加左侧竖条、色块、卡片或渐变。
- 加粗可以用于段内关键词；下划线只给少数完整结论，数量仍按每篇内容决定。

## 成品基准

视觉基准是 Joy 2026-08-23 提供的成品截图：粗体结论下方有一条浅灰粗标记线，标记线位于字形后方而不是字形下面留出间隔。后续文章直接复用上述完整行内样式，不再根据“下划线”字面含义自行设计。

关联：[[feedback_writing_voice]] · [[feedback_cover_blackwhite]]
