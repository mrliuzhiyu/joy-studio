# 让 AI 真正能干活的不是模型，是 harness

Harness 这个英文单词，本义是马具——套在马身上那一整套缰绳、笼头、鞍子，让骑手能驾驭一匹马的装备。

放到 AI 语境里意思几乎一样：给模型这匹野马套上一整套装备，让它变得可控、可用、能干活。

2026 年 2 月 Andrej Karpathy 发了一条推文，讲过去两个月编程怎么变得面目全非（[karpathy/status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220)）。

他说去年 12 月之前 coding agent 基本不能用，12 月之后才真正能干活，因为模型在长任务上有了质变——能撑过几小时的复杂任务不掉链子。

他接着说编程正在变得面目全非。不再是敲代码，是用自然语言给 agent 派任务、并行管理多个 agent。最大的红利在哪儿？他原话翻过来就是：搭一个能长时间跑的编排器，配上对的工具、记忆、指令。

编排器加工具加记忆加指令。这就是这篇文章讲的东西，业内统一叫它 harness。

它是 2024 到 2026 这波 AI 工程化转向里的运行时层。这篇文章只讲这一层。

---

## 01 一个模型，五种 Claude

先把名词说清楚。Anthropic 是做 Claude 的公司，Opus 是它最强一档的模型。这篇文章写的时候是 Claude Opus 4.7。下面 Opus 和 Claude 模型指同一个东西。

2026 年的 Anthropic 同时跑五个独立产品。

聊天端 [Claude.ai](https://claude.ai)。编程端 [Claude Code](https://www.anthropic.com/product/claude-code)。协作端 [Claude Cowork](https://claude.com/product/cowork)（2026-04-09 GA）。设计端 [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)（2026-04-17 研究预览）。控制电脑端 [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use)（API 仍 beta）。

底层只有一颗模型，就是 Claude Opus 4.7。同样的权重、同样的 API、同样的 token 接口。

但把同一句话丢进这五个产品，得到的不是五份相似的回答，是五件完全不同的事。

Claude.ai 给你一段文字答复。Claude Code 直接读你 repo、改你文件、跑你测试。Cowork 把任务拆给一组虚拟同事并行执行。Design 把对话变成可交互的 UI 原型。Computer Use 接管你的鼠标和键盘自己点。

让同一颗大脑变成五套完全不同产品的，不是模型。是模型外面那一层执行壳。

这一层在 2026 年被业内统一称作 harness。

不是 Anthropic 一家这么干。Cursor、Cognition Devin、Aider、Codex CLI、Cline，过去一年里冒出来的 AI 编程产品几乎都是这个结构。底层模型就是 Anthropic、OpenAI、Google 那几家在卖，差异化全在模型外面那层 harness 设计上。

数据更直接。HumanLayer 一份实测：同样的 Claude Opus 4.6，跑在 Claude Code 里 Terminal Bench 2.0 排第 33；换到一套未参与 post-training 的简洁 harness 后，同模型同任务直接到第 5（[HumanLayer Blog · 2026-03-12](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)）。

模型没换，排名跳了 28 位，差距全在 harness。

Addy Osmani 把这件事总结成一句话：一个普通模型配一套好 harness，会打败一个最强模型配一套差 harness（[Agent Harness Engineering · 2026-04-19](https://addyosmani.com/blog/agent-harness-engineering/)）。

模型代际差正在收敛，harness 差距正在拉大。

---

## 02 模型只会说话，不会做事

要搞清楚 harness 是什么，得先搞清楚模型不是什么。

模型训完之后，是一坨冻在 GPU 上的权重。它什么都做不了。这种状态叫裸模型。

绝大多数人对模型的想象是错的。把 Claude 或 GPT 想成一个能听懂话、能记忆、能调工具、能干活的智能体。

模型只做一件事：吃一段 token，吐一段 token。

没记忆，每次 API 调用对它都是全新的。

没工具，不会读文件、不会跑命令、不会上网。

没规划，不会列任务清单、不会安排步骤。

不知道你电脑上有什么、当前几点、自己叫什么名字。

它是个无状态函数。给一段文字进去，吐一段文字出来。

那为什么 Claude Code 自己能读文件、改代码、跑测试？

不是模型在做。是 Claude Code 这个本地程序在做。

举个例子。你敲一句"帮我修 auth.py 里那个 bug"，回车。

Claude Code 把你的话、系统提示词、它的工具清单（read_file、write_file、run_bash 等）打包，发到 Anthropic 的 API。

服务器上模型跑一次推理，吐回一段文字：我要调 read_file，参数是 auth.py。

Claude Code 真去打开 auth.py，把内容塞回对话历史。再发一次请求。

模型说要调 write_file 改第 42 行。Claude Code 真去改。

模型说跑 pytest。Claude Code 真去跑。

循环。直到模型说任务完成。

整个过程里，模型只贡献了几次"产生下一段文字"。读文件、跑命令、规划、决定什么时候停，全是 Claude Code 这个外壳程序在做。

这个外壳程序就是 harness。

打个比方。模型是一个被关在房间里的人。房间里只有一台打字机，没有窗户、没有门，他只会写字。

harness 是房间外面的助理。助理读屋里那个人递出来的字条，按字条吩咐去办事，把结果再递进去。

你看到的"AI 在做事"，是这个助理在做事，不是房间里那个人。

模型是大脑，harness 是身体。

---

## 03 harness 里装什么

harness 这个词不是 Anthropic 造的。

2020 年 8 月 EleutherAI 发布了一个叫 [lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness) 的开源项目，那时候它指的是评测脚手架。直到 2025 年 11 月 Anthropic 一篇博客把它用来指 agent 执行壳（[Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)），这个意思才在产业里收敛下来。

中文圈译名还没共识。36Kr 有时翻成"壳"、有时直接用 harness 原词（[一文读懂 Harness Engineering · 36Kr · 2026-04](https://eu.36kr.com/zh/p/3749464991187458)）。GitHub 开源书走"御舆"路线（[claude-code-book](https://github.com/lintsinghua/claude-code-book)）。菜鸟教程译作"驾驭工程"。本文继续用 harness 原词。

业内沿用马具的比喻已经成了共识。Anthropic Claude Code 负责人 Boris Cherny 在 Pragmatic Engineer 那期专访里直接说 harness 就是给马上鞍那回事（[Building Claude Code with Boris Cherny](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)）。

harness 这层壳里装着什么？

最核心的是 context 管理，也就是上下文管理。

模型有一个有限的 token 窗口，超过这个窗口就没法处理。但实际任务里，你给 Claude Code 一个项目让它修 bug，它要读你的源码、读你的依赖、读你的测试、读你之前的对话历史、读 system prompt 里的工具定义。加起来很容易就超过窗口。

这时候 harness 要做决定：保留什么、压缩什么、丢什么。

Claude Code 的做法叫 auto-compaction。当对话长度逼近窗口上限时，它会自动把历史对话压缩成摘要，腾出空间给新内容。

这件事看上去自动，底下是大量产品决策：什么时候触发压缩、压缩到什么粒度、保留哪些片段不能丢、压缩之后的摘要怎么塞回 system prompt。每个决策都直接影响用户体验。

同样的模型，压缩策略不同的两套 harness，长任务上的表现能差一倍。

第二核心是工具系统。

harness 要决定给模型暴露哪些工具：read_file、write_file、run_bash、grep、git_commit……每多一个工具是一种新能力。

但更关键的是权限边界。哪些工具可以静默执行、哪些必须先问用户。

Claude Code 的处理方式很具体。read_file 默认静默。write_file 默认要确认。run_bash 看命令，常见的 ls、cat 静默，但涉及 sudo、rm、网络请求的会先问。git_commit 必须确认。

这套规则没有写在模型里，是 harness 配置的。换个 harness 同一颗 Claude Opus 的行为会完全不一样。Devin 默认在虚拟机里跑、所有命令静默执行。Cursor 把确认提到编辑器侧、用户用键盘快捷键批准。Aider 走 git-first 路线、每个改动一个独立 commit、用户随时回滚。

Anthropic 在第二篇 harness 设计博客里有一句被反复引用（[Harness design for long-running application development · 2026-03](https://www.anthropic.com/engineering/harness-design-long-running-apps)）：harness 里每一个组件，都对应一个关于"模型还做不到什么"的假设。

模型还不能自己管 context，所以 harness 加了 auto-compaction。模型还不能自己判断哪些命令危险，所以 harness 加了权限边界。模型还会把 JSON 写错，所以 harness 加了重试。

每个组件都是一个补丁。

补丁从哪儿来？

不是设计出来的，是踩坑踩出来的。

用户不读 AI 写的代码，所以加了代码审查机制。用户的 API key 被硬编码进前端，所以加了密钥扫描。Claude 把生产数据库当成测试库 drop 掉一次，所以加了危险命令二次确认。每一个组件背后都有一个真实的事故。

这套东西不像数据库或者操作系统那样有几十年理论积累。它是一年里被现实逼出来的工程产物。

![harness 是模型的鞍具：词源与公式（占位 · 见 assets/diagram-2-harness-saddle.html）](assets/diagram-2-harness-saddle.html)

---

## 04 harness 不是 LangChain

读到这里大概率会冒出一个问题。harness 是不是就是 LangChain？或者 LangGraph、LlamaIndex、AutoGen？

不是。这是中文圈对 harness 这个词最大的混淆来源。

LangChain 这类是 framework，是 AI agent 开发框架。它给开发者一套抽象：Chain、Agent、Tool、Memory、Graph、Node、Edge。开发者拿这些抽象拼装出自己的 agent 应用。

它本身不是个能直接用的产品，是写 agent 用的积木。

harness 是成品。Claude Code、Cursor、Devin、Aider、Codex CLI 都是 harness。它们已经做完了所有产品决策：用什么 system prompt、提供哪些工具、怎么管 context、什么时候进 planning、什么时候问用户、怎么记忆。终端用户下载下来就能用。

用前端类比一下。LangChain 像 React 这种框架——是写应用的库。Claude Code 像 Notion、Linear、Figma——是用框架做出来的具体产品。两个层级不同。

完整的层级画出来是这样的。

```text
用户                    ← 敲键盘的你
  ↑
harness 层              ← Claude Code / Cursor / Devin / Aider（成品）
  ↑
framework 层（可选）    ← LangChain / LangGraph / Vercel AI SDK / Mastra
  ↑
API 层                  ← Anthropic / OpenAI / Google API（HTTP 接口）
  ↑
模型层                  ← Claude Opus / GPT-5 / Gemini（厂商训出来的权重）
  ↑
硬件层                  ← GPU / TPU
```

如果熟悉操作系统类比：模型像 CPU、API 像系统调用、framework 像 libc 这类系统库、harness 像 macOS / Windows / Linux 操作系统本身。你日常用的是 macOS 这一层，CPU 在底下你看不见。

LangChain 在第 4 层。Claude Code 在第 5 层。框架可以用来写 harness，但 harness 不一定基于框架。

这就到了一个反直觉的事实。

production 级 harness 几乎都不用 LangChain。

Claude Code 是 Anthropic 自己写的 50 万行 TypeScript（[Pragmatic Engineer 专访](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)），不基于任何第三方 agent framework。Cursor 自研整个 agent loop（[Cursor Blog · 2026-04-30](https://cursor.com/blog/continually-improving-agent-harness)）。Aider 是 Paul Gauthier 一个人写的纯 Python，仓库里没有 langchain 依赖（[paul-gauthier/aider](https://github.com/paul-gauthier/aider)）。

LangChain 火的两年是 2023 到 2024，大量项目基于它。到 2025 年这股风变了，做严肃 agent 产品的团队普遍开始绕开它。

这件事 Anthropic 自己讲过。2024 年 12 月那篇关于 agent 设计的官方博客（[Building Effective Agents](https://www.anthropic.com/research/building-effective-agents)）里建议很直接：做 agent 应用建议直接调 LLM API 写，很多模式几行代码就能实现；框架能让你快速起步，但到 production 阶段不要犹豫减少抽象层、回到基础组件来搭。

Anthropic 给的理由也直接：通用框架那层抽象在 production 上反而成了噪音。debug 的时候你不知道 LangChain 内部在哪一层把你的 prompt 改了什么、把模型的输出怎么解析了。结果是你 debug 的不是自己的 agent，是框架本身。

同一颗模型搭在不同 harness 上，跑出来的成绩可以差几十个百分点。

Matt Mayer 在 thoughts.jock.pl 一篇实测里跑过这个对比（[AI coding harness agents 2026](https://thoughts.jock.pl/p/ai-coding-harness-agents-2026)）：同样的 Claude Opus，在 Claude Code 里 77 分，在 Cursor 里 93 分。同一个模型同一个任务，仅仅 harness 不同，差了 16 分。

同一组实测的 CORE-Bench 数据更夸张：同样的 Claude Opus，在最简 scaffold 下 42 分，进 Claude Code 完整 harness 后 78 分。差了 36 分。

这种差距来自哪里？Cursor 在 2026 年 4 月公开过自家 harness 的演化史，里面有几个细节：根据当前任务动态决定塞哪些文件进 context；同时支持 OpenAI 的 patch 编辑格式和 Anthropic 的字符串替换格式，对不同模型用不同的 prompt 策略；工具调用成功率跑到 99% 以上；对话中切到新模型时 harness 自动适配新模型偏好的 prompt 格式。

每一个细节都是一年级别的工程投入。LangChain 这种通用框架不会给你这些细节，它只能给你抽象。

到 production 阶段，你要的是细节。

![层级架构图：硬件 → 模型 → API → framework → harness → 用户（占位 · 见 assets/diagram-3-stack-layers.html）](assets/diagram-3-stack-layers.html)

![同模型不同 harness 性能差距对比（占位 · 见 assets/diagram-4-harness-perf-gap.html）](assets/diagram-4-harness-perf-gap.html)

---

## 05 harness 五年后还在不在

读到这里会冒出一个很自然的问题。

既然 harness 是这一年踩坑反推出来的产物、模型还在变强，等模型有一天能自己处理 context、自己判断危险命令、自己规划任务……harness 这一层会不会被吞掉？

这是个真问题。

Andrej Karpathy 2023 年 5 月在 Microsoft Build 那次 State of GPT 演讲里给过一个长期判断（[State of GPT · 2023](https://news.ycombinator.com/item?id=36057236)）：大模型应该被理解成新一代操作系统的内核进程，不只是聊天机器人。模型本身就该编排输入输出、调度代码解释器、调度浏览器、调度文件系统。Karpathy 后来把这个想法叫 LLM OS。

这个视角下 harness 不是一个独立的层，是模型功能未成熟前的临时拐杖。模型能力补齐之后，这层会被吞回模型本身。

这两年模型能力的扩张确实在吃掉 harness 的部分组件。

Claude 在 2026 年 3 月把 1M token context 推到 GA（[Claude 1M 长 context · 2026-03](https://medium.com/@reliabledataengineering/stop-chasing-million-token-context-windows-youre-solving-the-wrong-problem-696b8ba881d7)）。Gemini 2.5 已经稳定支持 2M token context（[Gemini 2M context window](https://aionx.co/gemini-advanced-reviews/gemini-2m-context-window/)）。GPT-5.4 是 400K。

原本 harness 层的 auto-compaction 在长 context 模型上压力小很多。你聊到 30 万 token 时 Claude 1M 还能直接读完整对话，不需要 harness 强行压缩。

原本属于 harness 的工具调用能力也在被训练进模型本身。现代模型在训练时被特意训练得懂工具调用的格式，很多以前 harness 要做的格式纠错和重试，模型自己已经能避免了。

但完全吞掉的那一天不会到来。

Anthropic 在 2025 年下半年那篇关于 context 工程的官方文章（[Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)）里有一句核心论点：context 管理不是模型问题，是工程问题。

模型再大，你也得决定哪些 token 该进 context、哪些不该进、它们的顺序怎么排、彼此之间的依赖怎么暴露。这件事不会因为 context 窗口变大消失，只是从"节省窗口的优化"变成"构建窗口的设计"。

历史里有个直接类比可以参照：CPU 和 OS 的关系。

八十年代有人预测 CPU 越来越强、OS 这一层会被吞掉。结果四十年下来 CPU 性能涨了几千倍，OS 没消失，反而抽象层不断往上升：从 DOS 到 Windows、到 macOS、到 iOS、到容器、到 serverless。

每一代 OS 都把上一代的麻烦事吞进去，然后给上层暴露新的抽象。

harness 大概率会走这条路。

这种升级已经有具体信号。

Anthropic 在 2025 年 9 月把 Claude Code SDK 改名 Claude Agent SDK（[迁移指南](https://platform.claude.com/docs/en/agent-sdk/migration-guide)），把"Code"这个特定场景去掉、扩张成通用 agent 工具包的定位。Mastra、Vercel AI SDK 这种新一代 TypeScript 工具包直接把自己定位成 agent runtime，不再叫 framework，叫 runtime。

词在变。

现实的判断是：harness 这个词五年后不一定还在用。它可能改叫 agent runtime、agent OS、AI middleware、agentic platform……名字会换。

但这层壳要解决的问题不会消失：上下文怎么管、工具怎么暴露、权限怎么划、错误怎么恢复、记忆怎么维持、人和 agent 怎么交接。

工作不会消失，会改名字。抽象层会往上挪。

---

## 06 写 harness 是新的写代码

回到开篇那个反差：同一颗 Opus 跑出五套完全不同的产品，差异化全在模型外面那层 harness。

这件事对一个具体的从业者意味着什么？

意味着工种在重排。

prompt engineer 这个 2023 年到 2024 年最火的 AI 头衔，现在在退潮。

国外 SolidAITech 在 2026 年 4 月发了一篇直接的判断，标题翻过来叫《提示词工程师这个岗位已经死了——2026 年谁在替代它》（[solidaitech.com](https://www.solidaitech.com/2026/04/prompt-engineer-job-dead-ai-careers.html)）。国内 InfoQ 王一鹏在 2025 年 5 月做了一组用人单位实访，结论是提示词工程师并不是当年宣传的低门槛香饽饽（[infoq.cn](https://www.infoq.cn/article/7fgaffffykbmxw11u0bt)）。学信网下面的学职平台 2025 年 5 月也发文《提示词工程师为何遇冷？》（[xz.chsi.com.cn](https://xz.chsi.com.cn/xz/zyts/202505/20250514/2293380910.html)）。

一个工种从国内国际两边同时被宣告退潮，已经是结论性的事实。

替代它的工种叫 AI engineer 或 agent engineer。LinkedIn 2026 年增长最快岗位榜单（美国版）把 AI engineer 列为 2026 年增长最快的岗位之一（[linkedin.com](https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c)）。世界经济论坛援引 LinkedIn 的数据（[weforum.org · 2026-01](https://www.weforum.org/stories/2026/01/ai-has-already-added-1-3-million-new-jobs-according-to-linkedin-data/)）：2023 到 2025 三年全球新增 130 万 AI 相关岗位，AI engineer 这一个头衔贡献了 7.5 万。

prompt engineer 死了，AI engineer 火了。

表面看是 AI 工程岗位的内部洗牌，拆开来看是一次能力位移。

prompt engineer 的核心能力是给一个固定的模型写出能让它表现好的 prompt。这个能力今天大模型自己都能做了——你直接问 Claude 怎么 prompt 自己解决这道题，它会给你一份很好的 prompt。

AI engineer 的核心能力是把模型放进一个可控、可复用、可扩展的系统里。这个系统就是 harness。

会写 harness 的人在替代只会调 prompt 的人。

接下来的红利在垂直 harness。

通用 harness（Claude Code、Cursor、Devin）已经被巨头占满。但每一个垂直行业都需要为它的具体场景定制 harness。

医疗 harness 要懂 HIPAA 合规、要懂电子病历格式、要懂临床决策的责任边界。法律 harness 要懂判例引用规范、要懂客户保密、要懂律师工作流。教学 harness 要懂学生进度跟踪、要懂作业引导而不是答案给出。设计 harness 要懂 Figma 协议、要懂版式规则、要懂品牌一致性。

这些 harness 不能从 Claude Code 一键迁移。每一个都要从底下重写。

下一年红利集中的一类工程师，就是能在一个垂直场景里把 harness 重做一遍的人。

红利窗口比 SaaS 时代窄。垂直 SaaS 当年用了 5 到 8 年才把大行业占满。AI 工具的扩张节奏明显更快：Claude Code 从内部产品到 50 万行 TypeScript GA 用了 18 个月，Cursor 从编辑器插件到独角兽不到两年。垂直 harness 的窗口大概率压缩到两到三年，2026 到 2028 这段时间是入场期。

具体到你现在该用什么 harness，按背景画像来。

想轻装试水的读者，从 [Claude Code](https://www.anthropic.com/product/claude-code) 开始。开箱即用、文档全、生态最成熟。

写代码为主的读者，Claude Code、Cursor、Codex CLI 三选一。Claude Code 命令行优先、Cursor 编辑器优先、Codex CLI 轻量。

想自己写垂直 harness 的读者，[Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/migration-guide)、Vercel AI SDK、Mastra。这三套是目前活跃的 harness 构建工具包，比 LangChain 更轻、更聚焦 production agent 这个场景。

想做团队级部署的读者，[Devin](https://devin.ai/)、Factory。这一类是把 harness 包成 SaaS 给整个工程团队用。

国内场景，Trae（字节）、CodeBuddy（腾讯）、Coze（字节通用 agent 平台）、Manus（端到端通用 agent）。每家底层模型不一样、harness 设计哲学不一样、价格不一样。选之前先看它们的 harness 怎么处理 context 管理和权限边界这两件最关键的事。

以后再看到一个 AI 产品，先别问它用了什么模型，先问它的 harness 设计了什么。

模型决定它能不能做。harness 决定它做不做得好。

![harness 产品图谱：编程类 / 通用 agent / 国内 / 国外（占位 · 见 assets/diagram-5-harness-landscape.html）](assets/diagram-5-harness-landscape.html)
