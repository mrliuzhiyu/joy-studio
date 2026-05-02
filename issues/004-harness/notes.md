# 004 · 让 AI 真正能干活的不是模型，是 harness · notes

## 一句话定位

2026 年的 Anthropic 用同一颗 Opus 4.7 跑五套独立产品。让它们变成五个完全不同产品的不是模型，是模型外面那一层执行壳——业内 2025 年下半年到 2026 年才稳定下来的统一叫法是 harness。这篇文章把这一层从 0 讲清楚：模型自己其实什么都做不了、harness 是什么、跟 LangChain 这种 framework 不是一回事、Anthropic 为什么要为同一颗模型做这么多套、以及这一层正在变成 AI 时代最值钱的工种之一。

## 核心观点

- 模型是无状态函数：吃 token 吐 token，没有记忆、没有工具、没有规划——主流对 AI 的想象是错的
- 看上去 AI 在做事，做事的其实是模型外面那个程序，这个程序就叫 harness
- harness ≠ framework：LangChain / LangGraph 是积木（写 harness 用的），Claude Code / Cursor / Devin 是成品；production 级 harness 几乎都不用 LangChain
- 同模型不同 harness 的产品差距已经超过模型代际差——HumanLayer 实测同 Opus 4.6 在不同 harness 下 Terminal Bench 排名从 #33 到 #5，CORE-Bench 上同模型 minimal scaffold 42% vs Claude Code 78%（差 36pp）
- Anthropic 自家为同一颗 Opus 做五套 harness（Claude.ai / Code / Cowork / Design / Computer Use），是这一层不可压缩的最强证据
- harness 词源不是 Anthropic 一篇博客直接迁过来的——2024-10 Anthropic 用 scaffold；2025-11 Anthropic「Effective harnesses for long-running agents」标题首次用 harness；2026-03 Anthropic 第二篇 + OpenAI + Martin Fowler 同期发文让它成为产业默认词
- harness 的本义是套在马身上的鞍具缰绳——业内沿用这个隐喻（Boris Cherny "saddle for a horse"、Martin Fowler 站点缰绳/马鞍隐喻），中文圈译名混乱（壳 / 御舆 / 驾驭工程 三路并存）
- 这一层会持续多久是真问题：模型能力变强会吞掉部分 harness 组件，但抽象层往上挪、工作不消失
- 工种位移：prompt engineer → AI engineer / agent engineer / harness engineer；LinkedIn 2026 Jobs on the Rise 榜首是 AI engineer

## 读者画像

每天用 AI 工具做产品的工程师 / 产品经理 / 技术 PM / CTO / 独立开发者。Cursor、Claude Code、ChatGPT 都用过，但说不清 harness 是什么、跟 framework 什么关系、为什么 Anthropic 自己也要做这么多套。不是 AI 研究员（他们早搞清楚了），也不是完全零编程经验的家人群读者。

## 6 章提纲

每章核心 3-4 个点 + 一段收口观察。不预设细颗粒子论点。每章 1500-2500 字。

### 01 同一颗 Opus 跑出五套 Claude

- Anthropic 五套独立产品（Claude.ai / Claude Code / Cowork / Design / Computer Use）共用一颗 Opus 4.7
- 同一句话进五个产品出五件事：聊天 / 改 repo / 拆任务 / 生成 UI / 接管鼠标
- 不是孤例：Cursor / Cognition Devin / Aider / Codex CLI / Cline / Goose / Replit Agent 全行业都是这个结构
- 数据：HumanLayer 实测同 Opus 4.6 在 Terminal Bench 2.0 上不同 harness 排名 #33 → #5
- Addy Osmani 那句金句：a decent model with a great harness beats a great model with a bad harness（保留英文）
- **观点段**：让同一颗大脑变成五套完全不同产品的，不是模型，是模型外面那一层执行壳——这一层在 2026 年被业内统一称作 harness
- 收口：**不再走 002 / 003 的"这篇文章讲清楚 X 件事"交付承诺套路**，改成单句金句论断收口——「模型代际差正在收敛，harness 差距正在拉大」。让读者自然带着好奇往下读，不预告章节

### 02 模型自己什么都不会做

- 主流对模型的想象是错的：以为 Claude / GPT 是能听懂话、能记忆、能调工具、能干活的智能体
- 模型只做一件事：吃 token、吐 token——无状态函数
- 没记忆 / 没工具 / 没规划 / 不知道时间和文件——**散文化处理，不要四段排比**
- Claude Code 修 src/auth.py 登录 bug 的完整工具调用循环拆解（用户回车 → harness 打包 system prompt 和工具列表 → API → 模型吐 read_file 文字 → harness 真去读文件 → 再次发请求 → 循环）
- 章末金句藏叙事里：模型是大脑，harness 是身体；房间里的人 + 房间外助理隐喻
- **删掉**原稿的第一人称顿悟段（"2025 年中我同时用 Claude.ai 和 Claude Code"），按 memory 规则宁可不写也不凭空我认为
- **删掉**章末"这是这篇文章接下来要彻底展开的事"——不要章节间跳转语
- **观点段**：99% 用户对模型的想象都加了 harness 的滤镜——他们以为强的是模型，实际强的是模型 + 那层壳的整体

### 03 harness 这个词怎么来的，里面装着什么

- 词源溯源：lm-eval-harness（[2020-08 EleutherAI](https://github.com/EleutherAI/lm-evaluation-harness)）→ Anthropic 2024-10 SWE-bench 用 scaffold（[anthropic.com/news/swe-bench-sonnet](https://www.anthropic.com/news/swe-bench-sonnet)）→ 2025-11 Anthropic「Effective harnesses for long-running agents」（[anthropic.com/engineering/effective-harnesses-for-long-running-agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)）标题首次用 harness → 2026-03 Anthropic 第二篇 + OpenAI Harness Engineering（[openai.com/index/harness-engineering](https://openai.com/index/harness-engineering/)）+ Martin Fowler Birgitta Böckeler（[martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html)）同期发文 → 词义稳定
- harness 本义解释：**这一段是中文读者打开词的入口**——「Harness 这个英文单词，本义是马具、鞍具——就是套在马身上那一整套缰绳、笼头、鞍子，让骑手能驾驭一匹马的装备。放到 AI 语境里，意思几乎一模一样：给 AI 模型这匹野马套上一整套装备，让它变得可控、可用、能干活。」
- Anthropic Boris Cherny（Head of Claude Code）专访也用了 saddle for a horse 隐喻（[Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)）；Martin Fowler 站点 Birgitta Böckeler 也沿用缰绳/马鞍隐喻——这是业内通用比喻
- 中文圈译名混乱：36Kr 翻"壳"或保留原词 / 知乎和 GitHub 开源书走"御舆""缰绳与马鞍" / 菜鸟教程"驾驭工程"——三路并存，本文用 harness 原词
- 定义：harness 是模型外部、应用程序里面那一层执行壳——决定 system prompt / 工具集 / context 策略 / 工作流 / 权限 / 错误恢复 / 记忆机制
- Martin Fowler 公式：Agent = Model + Harness（[文章原文](https://martinfowler.com/articles/harness-engineering.html)）
- **不要列 6 大组件清单**——挑 2 个深讲：
  - context management：用 Claude Code auto-compaction 一个具体故事（你聊到 30 万 token 时它怎么挑保留什么）
  - tool system + permission：用 write_file 之前 Claude Code 必须 confirm 这种产品决策为什么是 harness 不是模型
  - 其他组件（workflow / error recovery / memory）一段话点一下，不展开
- Anthropic 第二篇 Harness design 金句素材（[anthropic.com/engineering/harness-design-long-running-apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)）：「every component in a harness encodes an assumption about what the model can't do on its own」「find the simplest solution possible, and only increase complexity when needed」
- **观点段**：harness 这套东西不是设计出来的——是 vibe coding 这一年翻车反推出来的产物；每个组件都对应一种过去半年踩过的坑

### 04 harness 不是 LangChain

- 这一章从读者最常见的困惑切入：harness 是不是就是 LangChain / LangGraph / LlamaIndex / AutoGen
- 不是。framework 是积木（写 harness 用的工具库），harness 是成品（终端用户能直接用的产品）
- 层级图：硬件 → 模型权重 → API → framework（可选）→ harness → 用户
- 反直觉的事实：production 级 harness 几乎都不用 LangChain。Claude Code 自研（Boris Cherny 自述 50 万行 TypeScript）、Cursor 自研（[2026-04-30 自家 harness 演化博客](https://cursor.com/blog/continually-improving-agent-harness)）、Devin 自研、Aider 自研、Codex CLI 自研
- Anthropic 2024 年 12 月 Building Effective Agents（[anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)）原文：「We suggest that developers start by using LLM APIs directly: many patterns can be implemented in a few lines of code.」「Frameworks can help you get started quickly, but don't hesitate to reduce abstraction layers and build with basic components as you move to production.」
- 反向证据：LangChain 自己开源 Deep Agents 复刻 Claude Code（[Medium](https://medium.com/@richardhightower/deep-agents-langchain-just-open-sourced-a-replica-of-claude-code-69e72ced54b8)）——这反过来证明 Claude Code 不基于 LangChain
- LangChain 自家也开始用 harness 这个词（[Your harness, your memory · LangChain Blog](https://www.langchain.com/blog/your-harness-your-memory)）—— 承认 harness 这一层是核心
- 同模型不同 harness 数据放这里：Matt Mayer 实测 Claude Opus 在 Claude Code 里 77% vs 在 Cursor 里 93%（[thoughts.jock.pl · 2026-04-15](https://thoughts.jock.pl/p/ai-coding-harness-agents-2026)）；CORE-Bench 同模型 minimal scaffold 42% vs Claude Code 78%（差 36pp · 同源）
- Cursor 自家 harness 演化博客的硬细节：dynamic context、OpenAI patch-based vs Anthropic string-replacement format 双重适配、tool call 跑到 2-3 个 9 可靠性、对话中切模型时 harness 自动适配
- 章中插图：层级架构图
- **观点段**：framework 解决的是写一个 agent 应用的工程问题，harness 解决的是把这个应用做成产品给用户用的产品决策——前者是技术、后者是判断；这就是为什么 production 级 harness 不用 framework

### 05 harness 这一层能持续多久

- 这是真问题不是反方：模型能力越来越强，harness 这层会被吞掉吗
- 三种走向并行存在，不是辩论：
  - **走向一**：Karpathy 2023-05 Microsoft Build "State of GPT" 演讲提的 LLM OS（[HN 讨论](https://news.ycombinator.com/item?id=36057236)）—— 模型应该自己当 OS，编排输入输出 / code interpreter / browser；这个视角下 harness 是模型功能未成熟前的过渡形态
  - **走向二**：长 context 与 native tools 持续把 harness 部分组件吃进模型本身。Claude 1M（2026-03-13 GA）、Gemini 2.5 已 2M token、GPT-5.4 400K——原本属于 harness 的 context 管理被部分吞掉
  - **走向三**：Aider 极简派代码哲学。Paul Gauthier 公开立场：「Very large context windows aren't useful in practice. Every model seems to get confused when you feed them more than ~25-30k tokens」（[Simon Willison 引用 · 2025-01](https://simonwillison.net/2025/Jan/26/paul-gauthier/)）；Aider 仓库本身（无 LangChain 依赖、纯自研、token 用量比 Claude Code 少 4.2 倍）—— 把 harness 做薄是另一条路
- 但 harness 不会消失：Anthropic 自家立场（[Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)）—— context 管理是 engineering 问题不是模型问题；LangChain "your harness, your memory" 也持有同样观点
- 历史类比：CPU 越来越强，OS 没消失，OS 抽象层在升高——同样的事会发生在 harness
- **观点段**：harness 这个词五年后可能没人用了——可能改叫 agent runtime、agent OS、AI middleware——但这一层的工作不会消失，只会改名字、抽象层往上挪

### 06 写 harness 是新的写代码

- 工种位移：prompt engineer 退潮（[The Prompt Engineer Job Is Dead · SolidAITech](https://www.solidaitech.com/2026/04/prompt-engineer-job-dead-ai-careers.html)、[InfoQ 实访](https://www.infoq.cn/article/7fgaffffykbmxw11u0bt)、[学职平台 · 学信网（2025-05-14）](https://xz.chsi.com.cn/xz/zyts/202505/20250514/2293380910.html)）
- AI engineer / agent engineer 上行：[LinkedIn Jobs on the Rise 2026 美国](https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c) AI engineer 是 2026 美国最快增长岗位；[WEF · LinkedIn 数据](https://www.weforum.org/stories/2026/01/ai-has-already-added-1-3-million-new-jobs-according-to-linkedin-data/) 2023-2025 全球新增 130 万 AI 相关岗位含 7.5 万 AI engineer
- harness engineer 萌芽：Addy Osmani / Martin Fowler 站点开始用这个 title；目前还太新没在主流招聘网站独立成 title
- 谁吃红利：能为垂直场景定制 harness 的人——医疗 harness、法律 harness、教学 harness、设计 harness……每个垂直行业最终都需要为它量身做的执行壳
- 实战上手路径按读者画像分（学 003 第 7 章）：
  - 想轻装试水 → Claude Code（开箱即用）
  - 写代码为主 → Cursor / Claude Code / Codex CLI
  - 想自己定制 → Claude Agent SDK / Vercel AI SDK / Mastra
  - 团队级部署 → Devin / Factory（Factory 写时核实 factory.ai）
  - 国内 → Trae（字节）/ CodeBuddy（腾讯）/ Coze / Manus
- 给读者拿走的东西：辨别口诀（看那个壳决定了什么 = 看 harness 设计了什么）+ 三种中文译名照常使用即可不需要硬翻
- **观点段**：写代码这件事正在让位给写 harness——不是模型替代了程序员，是会写 harness 的程序员在替代只会调 prompt 的程序员
- **删掉**原稿的"2027 年回头看 2026"句式——那是 003 模板复刻

## 风格约束

- 不用中文双引号包概念（harness / framework / agent / Opus / Claude Code 等术语第一次出现可保留英文裸写）
- 不要"等等——这不就是 X 吗"反问 + 破折号过渡
- 不要"最 X"排比（最锋利、最深、最激进、最值钱的工种之一）
- 不要"事实上 / 实际上 / 值得一提的是 / 更重要的是"过渡——直接进下一段事实
- 不要"反方 1 2 3 4"硬切清单——让叙事自己流
- 不要总结句式收尾——让读者自己得出
- **不要章节间跳转语**——公众号长文一气呵成，"下一章会讲""这是后面要展开的""至此可以引出"这种说法读者用不上，全部删除。每章独立完整，下一章自然承接，不需要预告
- 不要假第一人称——只在真实经验处用，宁可不写也不要凭空"我认为"
- 技术专名保留英文（harness / framework / scaffold / Claude Code / Cursor / Devin / Aider / Codex / LangChain / LangGraph / Vercel AI SDK / Mastra / lm-evaluation-harness / SWE-bench / Terminal Bench / CORE-Bench / agentic engineering / Computer Use / Agent SDK / Cowork / Design 等）
- 命令名保留原文（read_file / write_file / run_bash 等）
- 章节标题陈述句，控制在 ≤ 12 字（参 002 平均 11.7、003 平均 12.5）
- 章节编号 01-06
- 金句藏在叙事里，不加粗、不双引号、单句完成
- 每个事实带可点击 markdown 链接（draft.md 是 markdown 真源，PC 端可点）
- 链接策略遵循 [feedback_wechat_publication_v3.md](../../memory/feedback_wechat_publication_v3.md)（公号正文不带 a 标签，markdown 真源 draft.md 带）
- 一句一段密度（参公号特化规则）
- 强调两级（一级 strong / 二级 strong+underline）按 [design.md](../../design.md)
- 结尾给读者拿走的东西，不用"总结"或"结论"

## 配图清单

5 张图。统一调性（同字体、同 accent 色、同留白比例）。每张图下方图注「图 N · 内容描述 · 数据来源」。

| # | 嵌入位置 | 内容 | 来源 |
| --- | --- | --- | --- |
| 1 | 02 章末 | 模型 vs harness 谁在做什么：工具调用循环图 + 房间里的人 + 房间外助理隐喻 | 自制 HTML（diagram-1-model-vs-harness.html） |
| 2 | 03 章中 | harness 的马具/鞍具本义示意 + Agent = Model + Harness 公式 | 自制 HTML（diagram-2-harness-saddle.html） |
| 3 | 04 章中 | 层级架构图：硬件 → 模型权重 → API → framework → harness → 用户 | 自制 HTML（diagram-3-stack-layers.html） |
| 4 | 04 章末 | 同模型不同 harness 性能差距对比（HumanLayer Terminal Bench + Matt Mayer + CORE-Bench 三组数据） | 自制 HTML（diagram-4-harness-perf-gap.html） |
| 5 | 06 章 | harness 产品图谱（编程类 / 通用 agent / 国内 / 国外，按设计哲学分布） | 自制 HTML（diagram-5-harness-landscape.html） |

## 事实核实状态

详见 [experiments/research-brief.md](experiments/research-brief.md)。下面是关键变更清单——

| 项 | 状态 | 说明 |
| --- | --- | --- |
| Claude Cowork 真实存在 | ✅ CONFIRMED | [claude.com/product/cowork](https://claude.com/product/cowork) · 2026-04-09 GA |
| Claude Design 真实存在 | ✅ CONFIRMED | [anthropic.com/news/claude-design-anthropic-labs](https://www.anthropic.com/news/claude-design-anthropic-labs) · 2026-04-17 |
| Anthropic 2024-10 SWE-bench 用 harness 一词 | ❌ 修正 | 那篇用的是 scaffold；harness 在 Anthropic 标题首现是 2025-11-26 Effective harnesses |
| Karpathy 推文用 harness | ❌ 修正 | 那条用的是 agentic engineering；harness 不是 Karpathy 造的 |
| Cognition Devin 同模型 harness 高出 X 个百分点 | ❌ 替换 | Cognition 公开数据中无该具体数字；改用 HumanLayer Terminal Bench Opus 4.6 #33→#5（01 章）+ Matt Mayer + CORE-Bench（04 章） |
| Anthropic Building Effective Agents 原文 | ✅ 已 verify | 原话是「start by using LLM APIs directly」「reduce abstraction layers as you move to production」 |
| Boris Cherny saddle 隐喻 | ✅ 业内共用 | [Pragmatic Engineer 专访](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) · 03 章用，明确归属业内沿用比喻 |
| Anthropic 第二篇 Harness design 博客 | ✅ 新增 | [2026-03-24 · harness-design-long-running-apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) · 03 章金句来源 |
| OpenAI Harness Engineering 博客 | ✅ 新增 | [openai.com/index/harness-engineering](https://openai.com/index/harness-engineering/) |
| Martin Fowler 站点 harness engineering 长文 | ✅ 新增 | [Birgitta Böckeler 文](https://martinfowler.com/articles/harness-engineering.html) · Agent = Model + Harness 公式 |
| Cursor 自家 harness 演化博客 | ✅ 新增 | [2026-04-30 · cursor.com/blog/continually-improving-agent-harness](https://cursor.com/blog/continually-improving-agent-harness) · 04 章 |
| Karpathy LLM OS 来源 | ⚠️ 用演讲不用推文 | 推文 X 抓取 402，改用 [2023 Microsoft Build · State of GPT 演讲 · HN 讨论](https://news.ycombinator.com/item?id=36057236) |
| BLS prompt engineer 数据 | ❌ NOT FOUND | BLS 无该细分；改用 LinkedIn Jobs on the Rise 2026 + WEF LinkedIn 数据 + 国内学职平台 |
| Paul Gauthier「我支持 minimal harness」直接 quote | ❌ NOT FOUND | 改用 Aider 代码 + Paul context window quote 间接证据 |
| 反方文章 NOT FOUND | ❌ 整章重设 | 06 章不再叫"反方"，改成"harness 这一层能持续多久"时间坐标讨论 |
| Factory 官方独立强源 | ⚠️ 弱 | 06 章引用前需补 factory.ai 链接 |
| LangChain 退潮具体数字 | ⚠️ 待 verify | Ravoid 文章给的具体 star 数需 Joy 上 GitHub 核实 |

## 素材来源

完整链接库见 [experiments/research-brief.md](experiments/research-brief.md)。draft.md 里的事实都从这里出。

---

## 附录：开篇示例 v2（按编辑评审 + Joy 反馈调整）

按 reader agent + editor agent 反馈调整后的 01 + 02 章开篇。改动清单——

- 01 章瘦身：词源链条 + 中文译名 + Matt Mayer + CORE-Bench 全部挪到 03/04 章；只保留五套产品 + HumanLayer 数据 + Addy Osmani 金句
- 01 章末"接下来要交付四件事"提纲式结尾删除，改成单句金句论断收口（不再走 002 / 003 的交付承诺套路）
- 02 章删除可疑的第一人称顿悟段（"2025 年中我同时用 Claude.ai 和 Claude Code"）
- 02 章「实际上模型只做一件事」的"实际上"删掉
- 02 章四段排比"它没有记忆/工具/规划"改成散文化处理
- 02 章末"这是这篇文章接下来要彻底展开的事"跳转语删掉，金句独立完成
- 全文章节间跳转语彻底排查（"下一章会"、"接下来要讲"、"是后面要展开的"等）

### 附录 · 01 同一颗 Opus 跑出五套 Claude（开篇 v2）

2026 年的 Anthropic 同时在跑五个独立产品。

聊天端 [Claude.ai](https://claude.ai)、编程端 [Claude Code](https://www.anthropic.com/product/claude-code)、协作端 [Claude Cowork](https://claude.com/product/cowork)（2026-04-09 GA）、设计端 [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)（2026-04-17 research preview）、控制电脑端 [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use)（API 仍 beta）。底层只有一颗模型——Claude Opus 4.7。同样的权重、同样的 API、同样的 token 接口。

但把同一句话丢进这五个产品，得到的不是五份相似的回答，是五件完全不同的事。

Claude.ai 给你一段文字答复。Claude Code 直接读你 repo、改你文件、跑你测试。Cowork 把任务拆给一组虚拟同事并行执行。Design 把对话变成可交互的 UI 原型。Computer Use 接管你的鼠标和键盘自己点。

让同一颗大脑变成五套完全不同产品的，不是模型——五个产品共用同一颗。是模型外面那一层执行壳。这一层在 2026 年被业内统一称作 harness。

不是 Anthropic 一家这么干。Cursor、Cognition Devin、Aider、Codex CLI、Cline、Block Goose、Replit Agent——过去一年里冒出来的 AI 编程产品几乎都是这个结构。底层模型就是 Anthropic、OpenAI、Google 那几家在卖，差异化全在模型外面那层 harness 设计上。

数据更直接。HumanLayer 一份实测：同样的 Claude Opus 4.6，跑在 Claude Code 里 Terminal Bench 2.0 排第 33；换到一套未参与 post-training 的简洁 harness 后，同模型同任务直接到第 5（[Skill Issue: Harness Engineering for Coding Agents · HumanLayer Blog · 2026-03-12](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)）。模型没换，排名跳了 28 位，差距全在 harness。Addy Osmani 总结得最干脆：a decent model with a great harness beats a great model with a bad harness（[Agent Harness Engineering · 2026-04-19](https://addyosmani.com/blog/agent-harness-engineering/)）。

模型代际差正在收敛，harness 差距正在拉大。

### 附录 · 02 模型自己什么都不会做（开篇 v2）

要理解 harness 是什么，得先把模型不是什么讲清楚。

主流对模型的想象是错的。绝大多数人——包括很多每天用 AI 工具做产品的工程师——把 Claude 或 GPT 想象成一个能听懂话、能记忆、能调工具、能干活的智能体。这个想象在过去三年被各种产品体验反复加强。跟 ChatGPT 聊天它记得上文。给 Claude Code 一个任务它自己读文件改代码。给 Cursor 一句指令它在编辑器里直接给你 diff。看上去 AI 在主动做事。

模型只做一件事：吃一段 token，吐一段 token。

它没记忆，每次 API 调用对它来说都是全新的；它不记得你上一句说了什么，所谓的多轮对话是 harness 把历史 token 一次次塞回去伪装出来的。它没工具，不会自己读文件、不会自己跑命令、不会自己上网搜索。它没规划，不会自己列任务清单、不会自己安排步骤。它甚至不知道你电脑上有什么、当前是几点、自己叫什么名字。

模型是一个无状态函数。给它一段输入文字，它产出一段输出文字。这是它训练阶段全部教会的事。

那 Claude Code 自己读文件、改代码、跑测试是怎么发生的？不是模型在做，是 Claude Code 这个本地程序在做。

把一次完整的工具调用拆开看。

你在 Claude Code 里敲一句帮我修 src/auth.py 里那个登录 bug，回车。

Claude Code 这个本地程序接到你的输入。它打包——你的话 + 一段预先写好的 system prompt + 一份它支持的工具列表（read_file、write_file、run_bash、grep 等）+ 之前的对话历史。打包好的内容发到 Anthropic 的 API。

服务器上模型跑一次推理，吐出一段文字，里面写着：我要调 read_file 工具，参数是 src/auth.py。

Claude Code 拿到这段文字，自己解析。它在你电脑上真的去打开 src/auth.py，把文件内容塞回对话历史。

再发一次请求给 API。模型再吐一段：我要调 write_file，把第 42 行改成这样。Claude Code 又自己执行——打开文件、修改、保存。

再发请求。模型说我要调 run_bash，跑 pytest tests/test_auth.py。Claude Code 在你电脑上真的跑这个命令，把 stdout 塞回去。

循环。直到模型输出任务完成。

整个过程里，模型只贡献了那几次产生下一段文字。其他所有看起来像 AI 在做事的部分——读文件、跑命令、规划、把结果塞回去、决定什么时候停——全是 Claude Code 这个外壳程序在做。

这个外壳程序就是 harness。

打个比方——模型是一个被关在房间里的人。房间里只有一台只能写字的打字机，没有窗户、没有门、没有任何外部连接。这个人很博学，能根据你递进去的纸条写出极聪明的回应。但他什么也做不了。他只会写字。

harness 是房间外面的助理。助理读这个人写的字条，按字条上的吩咐去外面办事——读文件、跑命令、问别人——把结果再递进去给屋里的人。你看到的 AI 在干活，是这个助理在干活，不是房间里那个人。

模型是大脑，harness 是身体。

![模型 vs harness：谁在做什么（占位）](assets/diagram-1-model-vs-harness.html)

---

## 复盘（发布后填）

- 阅读量：
- 读者反馈中反复出现的关键词：
- 哪段写得最好（被截图传播的段落）：
- 最有争议的段落：
- 下次能更好的：
