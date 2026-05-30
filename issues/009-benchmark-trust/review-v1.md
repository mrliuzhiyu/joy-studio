# 009《榜单失信》· review-v1

评审范围：draft.md（v2）+ platforms/wechat.html，对照 research-brief.md 与 memory/feedback_writing_voice.md。
方式：工作流四维 agent（voice / 事实 / 结构 / 公众号）+ 完整性批评，13 agent 并行。数字核实 agent 本轮 schema 故障未产出，关键项由主回路自行用搜索补核（见下表）。
结论：评审后已落 draft v3 + wechat 同步，本文记录问题与处置。

---

## 一、数字核实（主回路补核）

| 数字 | 结论 | 处置 |
| --- | --- | --- |
| Verified = OpenAI 2024-08 的 500 题子集（标题红线） | ✅ 确认（[OpenAI 发布说明](https://openai.com/index/introducing-swe-bench-verified/)，2024-08-13、93 位 Python 开发者校验；原始 SWE-bench 普林斯顿 2294 题） | 标题成立；draft 补一手源 |
| OpenAI 27.6% / 59.4% / 训练污染 | ✅ 确认（[弃榜原文](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/)） | draft 口径统一为「抽查这批里 59.4%」 |
| Opus 4.8 Pro 64.3→69.2、领先约十分 | ✅ 多源一致（the-decoder / Vellum），但领先**仅在 SWE-bench Pro 这一项**，Terminal-Bench 上 GPT-5.5 占优 | draft/wechat 限定到 Pro；anthropic.com 原页 403，发布前人工再核一眼 |
| 脚手架 69/81、差十几分 | ⚠️ 二手（agentmarketcap），是否同源未定 | 图改「十几分」去假精确；正文保留 ⚠️ 标注 |
| 落差 37% / 50 倍 | ⚠️ 弱二手（aiagentsquare） | 正文加「据一份对比」+ ⚠️ |
| 饱和 20→90 | ⚠️ 区间（Epoch） | 用区间、不给假精确 |

## 二、分维问题（已处置）

- **voice（主要欠债·已改）**：03 / 04 / 06 三章原以金句升华、对仗格言、向读者喊话收尾，wechat 还给这些句子加了下划线 strong，放大说教腔。已全部改成停在事实/行业动作上，并去掉对应下划线。其余四条（少英文 / 短句 / 破折号 / 双引号）正文本就达标。
- **facts（最大风险·已改）**：wechat.html 原把 draft 的二手 ⚠️ 标注与出处系统性抹掉，读者看到的二手数字像已坐实。已在 wechat 正文补「据一份公开梳理 / 据一份对比 / 据其发布页与多家报道 / 据报道」等归属。59.4% 两版口径已统一。
- **structure（已改）**：04 章 benchmark 正当用法从一句半扩成独立一段，正反体量相当；01 章标题改「停用它的，正是做出它的人」与主标题区分；03 章标题改「摆数字的和拆数字的是同一家」去 gotcha；05→06 加过渡句。
- **wechat（已改）**：排版与公众号兼容性扎实（单层 article、仅复制按钮 script、无 flex/absolute、参考资料分组齐、URL 带 https）。文本图随 draft 同步更新。
- **completeness（待 Joy）**：缺一段 Joy 一手实测体感（屠榜模型到自己项目却拉胯的具体例子），补上能显著提升独特性、与 001/008 拉开差异——需 Joy 提供，不可编造。05 章已补「公开榜里相对可信的看法」回答读者「那到底看什么榜」。

## 三、结论

内容、结构、voice、公众号兼容均已达可发水平。**发布前剩两件**：
1. ⚠️ 人工开 anthropic.com/news/claude-opus-4-8 再核一眼 Opus 4.8 跑分与免责措辞（工具 403）。
2. 🔑（可选，强烈建议）补一段 Joy 一手体感。

iOS 微信预览确认 Optima 字体与 pre 文本图在窄屏不溢出后即可发。
