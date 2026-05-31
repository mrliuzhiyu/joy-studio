# 工作流轻量版（Joy 2026-05-31 定）

Joy 觉得每期生成一堆 md 太重，提议「直接在对话里讨论、定了直接写 HTML」。对齐后采用**轻量版**（不是直接写 HTML）。

## 怎么做

- **讨论上对话**：选题、切入角度、提纲、标题，都在对话里敲定，不写成长 md。
- **md 收敛到两份半**：
  - 瘦 **notes.md**（决策快照）：钩子 + 核心观点 + 读者画像 + **待 verify 清单** + 配图意图 + 划界。不再写长提纲（提纲直接长进 draft）。
  - **research-brief.md**（事实底座）：保留。
  - **draft.md**（内容真源）：保留，Joy 审这一份。
- 拍板后**一次性**转 wechat.html，不提前进 HTML。

## 为什么 draft.md 不能跳过、不直接写 HTML

**Why（Joy 的诉求合理：对话讨论确实更快、长 notes 确实冗余），但 draft markdown 这层省不得：**

1. **markdown 是给人改字的，HTML 是给机器渲染的。** 在 md 里审一段话 / 调结构一目了然；在 `<p><strong>` 标签缝里改字，Joy 审着累、改着慢。
2. **内容和排版混在一起互相拖累。** 公号 HTML 约束多（正文不带链接、一句一段、字体 / 加粗规格）。先在 md 把内容和事实定死，再一次性套排版，反而快。
3. **draft 带可点链接、HTML 正文不带链接，需求冲突。** draft.md 是留痕真源（数字挂出处方便核），wechat.html 是发布态（链接撤掉改参考资料块）。合并就丢了可追溯性。

## 为什么 research-brief 最不能砍

它不是给读者的，是「尊重事实」硬约束的物理保障——防止把厂商自报当中立结论、把二手当一手（如 010 期 Tiger Data 的 28x/75%、Supabase 的立场全靠它标着）。且跨期复用，是料库。

## How to apply

开新期直接按轻量版：对话定方向 → 瘦 notes → research-brief → draft.md（Joy 审）→ 拍板转 wechat.html。WORKFLOW.md 第 3 步已同步。
关联：[[feedback_writing_voice]] · [[feedback_wechat_image_workflow]]
