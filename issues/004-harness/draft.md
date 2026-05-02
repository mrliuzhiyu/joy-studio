# 让 AI 真正能干活的不是模型，是 harness

Harness 这个英文单词，本义是马具、鞍具，就是套在马身上那一整套缰绳、笼头、鞍子，让骑手能驾驭一匹马的装备。放到 AI 语境里意思几乎一模一样：给 AI 模型这匹野马套上一整套装备，让它变得可控、可用、能干活。

2026 年 2 月，Andrej Karpathy 发了一条推文，讲过去两个月编程怎么变得面目全非（[karpathy/status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220)）。

原话很直接：coding agents basically didn't work before December and basically work since。意思是去年 12 月之前 coding agent 基本不能用，12 月之后才真正能干活，因为模型在 long-term coherence 和 tenacity 上有了质变，能撑过大型长任务。

Karpathy 接着说 programming is becoming unrecognizable，编程正在变得面目全非。不再是敲代码，是用英文给 AI agent 派任务、并行管理多个 agent。最大红利在哪儿？他原话是这样的：the biggest prize is in figuring out how you can keep ascending the layers of abstraction to set up long-running orchestrator Claws with all of the right tools, memory and instructions。搭 long-running orchestrator 配上对的工具、记忆、指令。

orchestrator + tools + memory + instructions。这就是这篇文章讲的东西，业内统一叫它 harness。

它是 2024 到 2026 这波 AI 工程化转向里的运行时层。其他几块也同时在发生：流程层的 SDD（规范驱动开发）、底层的记忆系统、通用 framework 的退潮。

这篇文章讲中间那块。

---

## 01 一个模型，五种 Claude

先把名词说清楚。Anthropic 是做 Claude 的公司，Opus 是它最强一档的模型。具体到这篇文章写作的时候是 Claude Opus 4.7。下面 Opus 和 Claude 模型指同一个东西。

2026 年的 Anthropic 同时在跑五个独立产品。

聊天端 [Claude.ai](https://claude.ai)、编程端 [Claude Code](https://www.anthropic.com/product/claude-code)、协作端 [Claude Cowork](https://claude.com/product/cowork)（2026-04-09 GA）、设计端 [Claude Design](https://www.anthropic.com/news/claude-design-anthropic-labs)（2026-04-17 research preview）、控制电脑端 [Computer Use](https://www.anthropic.com/news/3-5-models-and-computer-use)（API 仍 beta）。底层只有一颗模型，就是 Claude Opus 4.7。同样的权重、同样的 API、同样的 token 接口。

但把同一句话丢进这五个产品，得到的不是五份相似的回答，是五件完全不同的事。

Claude.ai 给你一段文字答复。Claude Code 直接读你 repo、改你文件、跑你测试。Cowork 把任务拆给一组虚拟同事并行执行。Design 把对话变成可交互的 UI 原型。Computer Use 接管你的鼠标和键盘自己点。

让同一颗大脑变成五套完全不同产品的，不是模型，五个产品共用同一颗。是模型外面那一层执行壳。这一层在 2026 年被业内统一称作 harness。

不是 Anthropic 一家这么干。Cursor、Cognition Devin、Aider、Codex CLI、Cline、Block Goose、Replit Agent，过去一年里冒出来的 AI 编程产品几乎都是这个结构。底层模型就是 Anthropic、OpenAI、Google 那几家在卖，差异化全在模型外面那层 harness 设计上。

数据更直接。HumanLayer 一份实测：同样的 Claude Opus 4.6，跑在 Claude Code 里 Terminal Bench 2.0 排第 33；换到一套未参与 post-training 的简洁 harness 后，同模型同任务直接到第 5（[Skill Issue: Harness Engineering for Coding Agents · HumanLayer Blog · 2026-03-12](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)）。模型没换，排名跳了 28 位，差距全在 harness。Addy Osmani 总结得最干脆：a decent model with a great harness beats a great model with a bad harness（[Agent Harness Engineering · 2026-04-19](https://addyosmani.com/blog/agent-harness-engineering/)）。

模型代际差正在收敛，harness 差距正在拉大。

---

## 02 大模型只会说话，不会做事

要理解 harness 是什么，得先把模型不是什么讲清楚。

模型训完之后，是一坨冻在 GPU 上的权重。它本身做不了任何事，下面把这种状态叫裸模型。

主流对模型的想象是错的。绝大多数人（包括很多每天用 AI 工具做产品的工程师）把 Claude 或 GPT 想象成一个能听懂话、能记忆、能调工具、能干活的智能体。这个想象在过去三年被各种产品体验反复加强。跟 ChatGPT 聊天它记得上文。给 Claude Code 一个任务它自己读文件改代码。给 Cursor 一句指令它在编辑器里直接给你 diff。看上去 AI 在主动做事。

模型只做一件事：吃一段 token，吐一段 token。

它没记忆，每次 API 调用对它来说都是全新的；它不记得你上一句说了什么，所谓的多轮对话是 harness 把历史 token 一次次塞回去伪装出来的。它没工具，不会自己读文件、不会自己跑命令、不会自己上网搜索。它没规划，不会自己列任务清单、不会自己安排步骤。它甚至不知道你电脑上有什么、当前是几点、自己叫什么名字。

模型是一个无状态函数。给它一段输入文字，它产出一段输出文字。这是它训练阶段全部教会的事。

那 Claude Code 自己读文件、改代码、跑测试是怎么发生的？不是模型在做，是 Claude Code 这个本地程序在做。

把一次完整的工具调用拆开看。

你在 Claude Code 里敲一句帮我修 src/auth.py 里那个登录 bug，回车。

Claude Code 这个本地程序接到你的输入。它打包：你的话 + 一段预先写好的 system prompt + 一份它支持的工具列表（read_file、write_file、run_bash、grep 等）+ 之前的对话历史。打包好的内容发到 Anthropic 的 API。

服务器上模型跑一次推理，吐出一段文字，里面写着：我要调 read_file 工具，参数是 src/auth.py。

Claude Code 拿到这段文字，自己解析。它在你电脑上真的去打开 src/auth.py，把文件内容塞回对话历史。

再发一次请求给 API。模型再吐一段：我要调 write_file，把第 42 行改成这样。Claude Code 又自己执行：打开文件、修改、保存。

再发请求。模型说我要调 run_bash，跑 pytest tests/test_auth.py。Claude Code 在你电脑上真的跑这个命令，把 stdout 塞回去。

循环。直到模型输出任务完成。

整个过程里，模型只贡献了那几次产生下一段文字。其他所有看起来像 AI 在做事的部分（读文件、跑命令、规划、把结果塞回去、决定什么时候停）全是 Claude Code 这个外壳程序在做。

这个外壳程序就是 harness。

打个比方。模型是一个被关在房间里的人。房间里只有一台只能写字的打字机，没有窗户、没有门、没有任何外部连接。这个人很博学，能根据你递进去的纸条写出极聪明的回应。但他什么也做不了。他只会写字。

harness 是房间外面的助理。助理读这个人写的字条，按字条上的吩咐去外面办事（读文件、跑命令、问别人），把结果再递进去给屋里的人。你看到的 AI 在干活，是这个助理在干活，不是房间里那个人。

模型是大脑，harness 是身体。

![模型 vs harness：谁在做什么（占位 · 见 assets/diagram-1-model-vs-harness.html）](assets/diagram-1-model-vs-harness.html)

---

## 03 拆开 harness 这层壳

harness 不是个新词。

2020 年 8 月，EleutherAI 发布了一个叫 lm-evaluation-harness 的开源项目（[github/EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)），是一套用来评测大语言模型的脚手架。当时这个 harness 指的是评测脚手架，不是产品壳。它的工作是把模型放到一致的测试环境里跑各种 benchmark，看哪个模型在哪个任务上分数高。

接下来四年这个词没怎么变义。直到 2024 年 10 月，Anthropic 发了一篇叫 Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet 的博客（[anthropic.com/news/swe-bench-sonnet](https://www.anthropic.com/news/swe-bench-sonnet)），讲他们怎么用 Claude 3.5 Sonnet 在 SWE-bench Verified 上拿到 49% 的成绩。文章里描述围绕模型搭的代码生成框架时，用的词是 scaffold：agent scaffold optimized for updated Claude 3.5 Sonnet was to give as much control as possible to the language model itself, and keep the scaffolding minimal。这个词跟 harness 含义接近，但还不是 harness。

harness 第一次出现在 Anthropic 标题里是 2025 年 11 月。那篇博客叫 Effective harnesses for long-running agents（[anthropic.com/engineering/effective-harnesses-for-long-running-agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)）。一个原本指评测脚手架的词，被 Anthropic 用来指 agent 执行壳。

接下来几个月这个词被密集采用。2026 年 3 月 Anthropic 又发了第二篇 Harness design for long-running application development（[anthropic.com/engineering/harness-design-long-running-apps](https://www.anthropic.com/engineering/harness-design-long-running-apps)）。同期 OpenAI 发了 Harness engineering: leveraging Codex（[openai.com/index/harness-engineering](https://openai.com/index/harness-engineering/)），Martin Fowler 站点出了 Birgitta Böckeler 那篇 Harness engineering for coding agent users（[martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html)）。Karpathy 2026 年 2 月那条被广泛引用的推文用的词是 agentic engineering 不是 harness（[karpathy/status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220)）。harness 这个词不是他造的，但他对范式转向的定性给了这层壳工程化的合法性。一年之内 harness 从评测圈渗透到整个 AI agent 圈，变成产业默认词。

中文圈尚未收敛译名。36Kr 有时翻成壳、有时直接保留 Harness 原词（[一文读懂 Harness Engineering · 36Kr · 2026-04](https://eu.36kr.com/zh/p/3749464991187458)）。知乎和 GitHub 开源书走御舆和缰绳与马鞍路线（[claude-code-book · GitHub](https://github.com/lintsinghua/claude-code-book) 把 harness 翻成御舆，本义是驾驭车马的器具）。菜鸟教程译作驾驭工程（[Harness Engineering · 菜鸟教程](https://www.runoob.com/ai-agent/harness-engineering.html)）。三种路线并存，没有共识。本文用 harness 原词。

业内沿用本义那个马具的比喻已经成了共识。Anthropic Claude Code 的负责人 Boris Cherny 在 Pragmatic Engineer 那期专访里直接用了 saddle for a horse（给马上鞍）这个表述（[Building Claude Code with Boris Cherny · Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)）。Martin Fowler 站点 Birgitta Böckeler 那篇长文也是从马具隐喻展开的，把 harness 拆成 guides（缰绳，feedforward 引导）和 sensors（感应器，feedback 反馈）两层。

Birgitta Böckeler 那篇文章给了一个简洁公式：Agent = Model + Harness。一个 AI agent 是一颗模型加一套围绕它的执行壳。模型部分是厂商的事，harness 部分是产品团队的事。

这层壳里装着什么。

最核心的是 context management，也就是上下文管理。模型有一个有限的 token 窗口，超过这个窗口就没法处理。但实际任务里，你给 Claude Code 一个项目让它修 bug，它要读你的源码、读你的依赖、读你的测试、读你之前的对话历史、读 system prompt 里的工具定义，加起来很容易就超过窗口。

这时候 harness 要做决定：保留什么、压缩什么、丢什么。Claude Code 的做法是 auto-compaction，当对话长度逼近窗口上限时，它会自动把历史对话压缩成摘要，腾出空间给新内容。这件事看上去自动，但底层是大量产品决策：什么时候触发压缩、压缩到什么粒度、保留哪些片段不能丢、压缩之后的摘要怎么塞回 system prompt。每个决策都直接影响用户体验。同样的模型，压缩策略不同的两套 harness，长任务上的表现能差一倍。

第二核心是 tool system 加 permission，工具系统和权限边界。harness 要决定给模型暴露哪些工具：read_file、write_file、run_bash、grep、git_commit……每多一个工具是一种新能力。但更关键的是权限，哪些工具可以静默执行、哪些必须先问用户。

Claude Code 的处理方式很具体。read_file 默认静默；write_file 默认要 confirm；run_bash 看命令，常见的 ls、cat 静默，但涉及 sudo、rm、network 的会先问；git_commit 必须 confirm。这套规则没有写在模型里，是 harness 配置的。换个 harness 同一颗 Claude Opus 4.7 的行为会完全不一样。Devin 默认在虚拟机里跑、所有命令静默执行；Cursor 把 confirm 提到编辑器侧、用户用键盘快捷键批准；Aider 走 git-first 路线、每个改动一个独立 commit、用户随时 git revert。

这两个组件覆盖了 harness 一半以上的工作量。剩下还有几个。workflow orchestration 是怎么规划任务、什么时候拆子任务、什么时候进 plan mode。error recovery 是工具调用失败怎么重试、模型输出格式错怎么纠正、超时怎么降级。memory 是 CLAUDE.md、MEMORY.md 这种跨会话的事实保留机制、用户偏好怎么记、上一次会话的决策怎么继承。每一项都是单独的产品决策。

Anthropic 第二篇 Harness design 那篇博客里有一句被反复引用：every component in a harness encodes an assumption about what the model can't do on its own。harness 里每一个组件都对应一个关于模型还做不到什么的假设。模型还不能自己管 context，所以 harness 加了 auto-compaction；模型还不能自己判断哪些命令危险，所以 harness 加了 permission；模型还会把 JSON 写错，所以 harness 加了 retry。每个组件都是一个补丁。

补丁从哪儿来？

不是设计出来的，是踩坑踩出来的。harness 这套结构是过去 18 个月 vibe coding 翻车反推出来的产物。用户不读 AI 写的代码导致 review-by-design 加进 harness；用户的 API key 被硬编码进前端导致 secret-scanner 加进 harness；Claude 把 production 数据库当成测试库 drop 掉一次后 dangerous-command-confirm 才被加进 harness。每一个组件背后都有一个真实的事故。

这套东西不像数据库或者操作系统那样有几十年理论积累，它没有 Codd 论文、没有 UNIX 哲学。它是一年里被现实逼出来的工程产物。这种成长姿态本身值得留意：产业等不及理论收敛了。

![harness 是模型的鞍具：词源与公式（占位 · 见 assets/diagram-2-harness-saddle.html）](assets/diagram-2-harness-saddle.html)

---

## 04 vibe coding 死了之后

要把 harness 放回它真正的位置，得把整个 2024 到 2026 这波工程化转向画成一张图。

这张图的起点是 vibe coding 死于 2026 年 2 月。但它真正失效的时间更早。2025 年下半年开始业内出现大量 vibe coded 项目翻车事故：数据库密码硬编码进前端、API key 暴露在公开 GitHub 仓库、AI 把测试代码里永远会通过的 admin 验证占位带到生产。归纳起来三层故障模式：不可审（你不读代码，出 bug 时不知道从哪查）、不可复现（同样的 prompt 下次给可能给出不一样的代码）、不可协作（团队里没有第二个人能接手维护你不读的代码）。Gartner 2025 年发出过一个被反复引用的预测：到 2027 年 1/4 的生产环境缺陷将源于 AI 生成代码（[Five AI Realities · GV · Tessl](https://www.gv.com/news/five-ai-realities-with-tessl-guy-podjarny)）。这个数字对企业客户是无法接受的。

整个行业从 2025 年下半年开始补这三个洞。补的方式不是一个。

流程层先补。SDD（Spec-Driven Development）把人的监督前置成结构化的 spec，让 AI agent 拿 spec 跑、跑完用测试验证。GitHub Spec Kit（[github/spec-kit](https://github.com/github/spec-kit) · 92k star）、AWS Kiro IDE（[kiro.dev](https://kiro.dev/)）、阿里 Qoder、Tessl（1.25 亿美元 A 轮）、腾讯云 CloudBase AI Toolkit 一起把这个范式工业化。半年内这条赛道从 GitHub 实验变成大厂默认配置。这是这个系列上一篇文章《前端、后端、PM 正在塌缩成一个岗位》讲的事。

运行时层接着补。harness 围绕模型搭的执行壳，让 AI agent 能稳定生产可上线的代码。Anthropic 写 Claude Code、Cursor 写 Composer、Cognition 写 Devin、OpenAI 写 Codex CLI、Aider 一个人写极简版本。每家都在自家 harness 里把 vibe coding 翻车反推出来的补丁工程化。auto-compaction 解决 context 失控、permission boundary 解决危险命令静默执行、planning mode 解决任务规划缺失、retry-on-format-error 解决模型输出格式错。每一项都对应一个具体的 vibe coding 故障模式。

还有一个更隐蔽的转向：LangChain 这种通用 framework 在 production agent 上退潮。这件事看上去是技术选型变化，底下是整个工程范式的位移。framework 假设的是开发者拿积木拼一个 agent 应用。但 production 团队发现他们要的不是积木而是产品决策。Claude Code、Cursor、Devin、Aider 全部自研、不引入 LangChain。LangChain 自家在 2025 年开源 Deep Agents 复刻 Claude Code（[Deep Agents · Medium](https://medium.com/@richardhightower/deep-agents-langchain-just-open-sourced-a-replica-of-claude-code-69e72ced54b8)），又发了 Your harness, your memory（[langchain.com/blog/your-harness-your-memory](https://www.langchain.com/blog/your-harness-your-memory)）开始用 harness 这个词。他们也在向 harness 中间件方向转型。

记忆系统是第四块拼图。但它不算独立补丁，它是 harness 里面一个组件，因为跨 harness 同步的需求强烈、逐渐独立出来。Anthropic 在 Claude Code 里写 CLAUDE.md 和 MEMORY.md（项目级 + 用户级记忆）；Cursor 有自己的 memory 系统；Mem0、LangMem、Letta（前 MemGPT）这种第三方记忆中间件在尝试做跨 harness 标准。这一块还没收敛，本文不展开。它值得单独一篇文章。

把这四块放在一张图里。

横轴是时间，从 2024 到 2027；纵轴是抽象层，从模型层、运行时层、流程层、到底层记忆。2024 年这张图基本只有模型层（OpenAI / Anthropic / Google 在卷模型代际）加一片混乱的 framework 试探层。2025 年下半年到 2026 年初，流程层（SDD）和运行时层（harness）同时被填上。2026 年 LangChain 这种 framework 让位，团队直接调 API。记忆系统在这张图最底层缓慢成形，未收敛。2027 之后这张图会向 agent runtime 和 agent OS 抽象层升级，那是另一个故事。

四块互相依赖。SDD 没有 harness 跑不起来，你写了 spec 但没有能稳定执行 spec 的 agent 等于没写。harness 没有记忆系统留不住状态，你的 agent 工作 8 小时但忘了昨天的决策。记忆系统没有标准 framework 退潮后只能跟着 harness 走，但 harness 之间不互通。这就是 2026 年 AI 工程的真实图景：四块拼起来才能跑。

四块同时出现是同一个底层问题的四个侧面。底层问题是 AI 模型的能力涨得太快、产业基础设施跟不上。模型代际差从 12 个月压缩到 6 个月，工程化方法论的迭代周期是 24-36 个月。SDD、harness、记忆系统、framework 退潮这四件事其实是产业在用 18 个月硬补 AI 暴涨这两年欠下的工程化债。

四块里讲得最系统的是 SDD（中文圈有上一篇那种长文、36Kr 也覆盖过），记忆系统下一篇会专门讲，framework 退潮属于技术选型话题大家都懂。harness 这一层是 production AI 产品差异化真正住的地方，但到 2026 年 5 月还没有一篇系统讲清楚的中文长文。

---

## 05 harness 不是 LangChain

读到这里大概率会冒出一个问题。harness 是不是就是 LangChain？或者 LangGraph、LlamaIndex、AutoGen？

不是。这是中文圈对 harness 这个词最大的混淆来源。

LangChain 这类是 framework，AI agent 开发框架。它给开发者一套抽象：Chain、Agent、Tool、Memory、Graph、Node、Edge。开发者拿这些抽象拼装出自己的 agent 应用。它本身不是个能直接用的产品，是写 agent 用的积木。

harness 是成品。Claude Code、Cursor、Devin、Aider、Codex CLI 都是 harness。它们已经做完了所有产品决策：用什么 system prompt、提供哪些工具、怎么管 context、什么时候进 planning、什么时候问用户、怎么记忆。终端用户下载下来就能用。

用前端类比一下：LangChain ≈ React 这种前端框架（写应用的库）；Claude Code ≈ Notion、Linear、Figma（用框架做出来的具体产品）。两个层级不同。

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

LangChain 在第 4 层。Claude Code 在第 5 层。框架可以用来写 harness，但 harness 不一定基于框架。这就到了一个反直觉的事实。

production 级 harness 几乎都不用 LangChain。

Claude Code 是 Anthropic 自己写的 50 万行 TypeScript（[Building Claude Code with Boris Cherny · Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)），不基于任何 third-party agent framework。Cursor 自研整个 agent loop（[Continually improving our agent harness · Cursor Blog](https://cursor.com/blog/continually-improving-agent-harness)）。Cognition Devin 自家闭源的 agent 架构（[Cognition · SWE-bench technical report](https://cognition.ai/blog/swe-bench-technical-report)）也不用 LangChain。Aider 是 Paul Gauthier 一个人写的纯 Python，仓库里没有 langchain 依赖（[paul-gauthier/aider · GitHub](https://github.com/paul-gauthier/aider)）。OpenAI 自家的 Codex CLI（[GitHub · openai/codex](https://github.com/openai/codex)）是轻量 TypeScript agent，也不用 LangChain。

LangChain 火的两年是 2023 到 2024，大量项目基于它。到 2025 年这股风变了，做严肃 agent 产品的团队普遍开始绕开它。

这件事 Anthropic 自己讲过。2024 年 12 月那篇 Building Effective Agents（[anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)）里有几句被反复引用：

We suggest that developers start by using LLM APIs directly: many patterns can be implemented in a few lines of code.

Frameworks can help you get started quickly, but don't hesitate to reduce abstraction layers and build with basic components as you move to production.

意思是：做 agent 应用建议直接调 LLM API 写，很多模式几行代码就能实现；框架能让你快速起步，但到 production 阶段不要犹豫减少抽象层、回到基础组件来搭。

Anthropic 给的理由也直接：frameworks often create extra layers of abstraction that can obscure the underlying prompts and responses, making them harder to debug。通用框架那层抽象在 production 上反而成了噪音。debug 的时候你不知道 LangChain 内部在哪一层把你的 prompt 改了什么、把模型的输出怎么解析了。结果是你 debug 的不是自己的 agent，是框架本身。

另一个反向证据来自 LangChain 自己。2025 年下半年 LangChain 开源了一个叫 Deep Agents 的项目（[Deep Agents · LangChain Just Open-Sourced a Replica of Claude Code · Medium](https://medium.com/@richardhightower/deep-agents-langchain-just-open-sourced-a-replica-of-claude-code-69e72ced54b8)），目标是用 LangChain 复刻 Claude Code。这个动作本身证明了一件事：Claude Code 不是基于 LangChain 写的。否则不需要"复刻"自家用户的产品。

LangChain 自己也开始用 harness 这个词了。他们发了一篇博客叫 Your harness, your memory（[langchain.com/blog/your-harness-your-memory](https://www.langchain.com/blog/your-harness-your-memory)），承认 harness 这一层是 agent 产品的核心；他们的论点是 memory 不该被绑死在模型厂商，应该保留在 open harness 里。这篇博客是 LangChain 在重新定位，从 framework 提供方转向 harness 中间件提供方。

同一颗模型，搭在不同 harness 上，跑出来的成绩可以差几十个百分点。

Matt Mayer 在 thoughts.jock.pl 一篇实测（[AI coding harness agents 2026 · 2026-04-15](https://thoughts.jock.pl/p/ai-coding-harness-agents-2026)）跑过这个对比：同样的 Claude Opus，在 Claude Code 里 77%，在 Cursor 里 93%。同一个模型同一个任务，仅仅 harness 不同，差了 16 个百分点。同一组实测的 CORE-Bench 数据更夸张：同样的 Claude Opus，在 minimal scaffold 下 42%，进 Claude Code 完整 harness 后 78%。差了 36 个百分点。

这种差距来自哪里。Cursor 在 2026 年 4 月公开过自家 harness 的演化史（[Continually improving our agent harness · Cursor Blog · 2026-04-30](https://cursor.com/blog/continually-improving-agent-harness)），里面有几个细节。dynamic context 是根据当前任务动态决定塞哪些文件进 context。同时支持 OpenAI patch-based 和 Anthropic string-replacement 两种文件编辑格式，同一个 IDE 行为，对不同模型用不同的 prompting 策略。tool call reliability 跑到 2 到 3 个 9，也就是工具调用成功率到 99% 到 99.9%。对话中切换模型时 harness 自动适配，你聊到一半切换到 Sonnet，harness 知道 Sonnet 偏好怎样的 prompt 格式，自动重写 system prompt。

每一个细节都是一年级别的工程投入。LangChain 这种通用框架不会给你这些细节，它只能给你抽象。

到 production 阶段，你要的是细节。

![层级架构图：硬件 → 模型 → API → framework → harness → 用户（占位 · 见 assets/diagram-3-stack-layers.html）](assets/diagram-3-stack-layers.html)

![同模型不同 harness 性能差距对比（占位 · 见 assets/diagram-4-harness-perf-gap.html）](assets/diagram-4-harness-perf-gap.html)

---

## 06 harness 五年后还在不在

读到这里会冒出一个很自然的问题。既然 harness 是这一年踩坑反推出来的产物、模型还在变强，等模型有一天能自己处理 context、自己判断危险命令、自己规划任务……harness 这一层会不会被吞掉？

这是个真问题。真到几个不同立场的人在公开表达不同看法。

Andrej Karpathy 2023 年 5 月在 Microsoft Build 那次 State of GPT 演讲里给过一个长期判断（[State of GPT · Microsoft Build 2023 · HN 讨论](https://news.ycombinator.com/item?id=36057236)）：LLM 应该被理解成新一代操作系统的 kernel process，不只是聊天机器人。模型本身就该编排输入输出、调度 code interpreter、调度 browser、调度文件系统。Karpathy 后来把这个想法叫 LLM OS。这个视角下 harness 不是一个独立的层，是模型功能未成熟前的临时拐杖。模型能力补齐之后，这层会被吞回模型本身。

这两年模型能力的扩张确实在吃掉 harness 的部分组件。Claude 在 2026 年 3 月把 1M token context 推到 GA（[Claude 1M 长 context · 2026-03](https://medium.com/@reliabledataengineering/stop-chasing-million-token-context-windows-youre-solving-the-wrong-problem-696b8ba881d7)）；Gemini 2.5 已经稳定支持 2M token context（[Gemini 2M context window · AIonX](https://aionx.co/gemini-advanced-reviews/gemini-2m-context-window/)）；GPT-5.4 400K。原本 harness 层的 auto-compaction 在长 context 模型上压力小很多，你聊到 30 万 token 时 Claude 1M 还能直接读完整对话，不需要 harness 强行压缩。原本属于 harness 的 native tool calling 能力也在被训练进模型本身。现代模型在训练时被特意训练得懂工具调用的格式，很多以前 harness 要做的格式纠错和重试，模型自己已经能避免了。

跟 Karpathy 同方向但另一种姿态的，是 Aider 极简派。Aider 作者 Paul Gauthier 持续在公开表达一种立场：harness 越薄越好。他有一段被 Simon Willison 引用过的话（[A quote from Paul Gauthier · Simon Willison · 2025-01-26](https://simonwillison.net/2025/Jan/26/paul-gauthier/)）：Very large context windows aren't useful in practice. Every model seems to get confused when you feed them more than ~25-30k tokens. Aider 的代码仓库（[paul-gauthier/aider · GitHub](https://github.com/paul-gauthier/aider)）就是这个哲学的物化：纯 Python、不引入 LangChain、不做复杂 context 管理、不做 subagent、每个改动一个独立 git commit、用户随时回滚。Aider 在 token 使用量上比 Claude Code 少 4.2 倍（[Aider Uses 4.2x Fewer Tokens Than Claude Code · Morph](https://www.morphllm.com/comparisons/morph-vs-aider-diff)）。这是把 harness 做薄的具体后果。

把这三个立场放一起看会发现一件事：它们指向同一个未来。harness 这一层的某些组件会被模型吞掉、另一些会被极简派砍掉、剩下的会留下来。但留下来的那部分到底是什么。

Anthropic 自己给过答案。在 2025 年下半年那篇 Effective context engineering for AI agents（[anthropic.com/engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)）里他们的核心论点是：context 管理不是模型问题，是 engineering 问题。模型再大，你也得决定哪些 token 该进 context、哪些不该进、它们的顺序怎么排、彼此之间的依赖怎么暴露。这件事不会因为 context 窗口变大消失，只是从节省窗口的优化变成构建窗口的设计。LangChain 在 Your harness, your memory 那篇里持有相同立场（[langchain.com/blog/your-harness-your-memory](https://www.langchain.com/blog/your-harness-your-memory)）：even as model improvements absorb some scaffolding, this gets replaced by other types of scaffolding。模型吞掉一层 harness，新的 harness 会在更高抽象层长出来。

历史里有个直接类比可以参照：CPU 和 OS 的关系。八十年代有人预测 CPU 越来越强、OS 这一层会被吞掉。结果四十年下来 CPU 性能涨了几千倍，OS 没消失，反而抽象层不断往上升：从 DOS 到 Windows、到 macOS、到 iOS、到容器、到 serverless。每一代 OS 都把上一代的麻烦事吞进去，然后给上层暴露新的抽象。harness 大概率会走这条路。

这种升级已经有具体信号。Anthropic 在 2025 年 9 月把 Claude Code SDK 改名 Claude Agent SDK（[platform.claude.com · 迁移指南](https://platform.claude.com/docs/en/agent-sdk/migration-guide)），把 Code 这个特定场景去掉、扩张成通用 agent 工具包的定位。LangChain 从 2025 下半年转向 harness 中间件方向，Your harness, your memory 那篇博客把记忆作为跨 harness 标准化的抓手在推。Mastra、Vercel AI SDK 这种新一代 TypeScript agent 工具包直接把自己定位成 agent runtime，不再叫 framework、叫 runtime。词在变。下一代抽象不再是写一个新 framework，是把 harness 这一层做成行业级的工程基础设施。

现实的判断是：harness 这个词五年后不一定还在用。它可能改叫 agent runtime、agent OS、AI middleware、agentic platform……名字会换。但这层壳要解决的问题不会消失：上下文怎么管、工具怎么暴露、权限怎么划、错误怎么恢复、记忆怎么维持、人和 agent 怎么交接。

工作不会消失，会改名字。抽象层会往上挪。

---

## 07 写 harness 是新的写代码

开篇那个反差对一个具体的从业者意味着什么？同一颗 Opus 跑出五套完全不同的产品，差异化全在模型外面那层 harness。

意味着工种正在重排。

prompt engineer 这个 2023 年到 2024 年最火的 AI 头衔，现在在退潮。SolidAITech 在 2026 年 4 月发了一篇直接的判断：The Prompt Engineer Job Is Dead — What Replaced It in 2026（[solidaitech.com](https://www.solidaitech.com/2026/04/prompt-engineer-job-dead-ai-careers.html)）。InfoQ 王一鹏在 2025 年 5 月做了一组用人单位实访，结论是 prompt 工程师并不是当年宣传的低门槛香饽饽（[infoq.cn · Prompt 工程师真是低门槛香饽饽？](https://www.infoq.cn/article/7fgaffffykbmxw11u0bt)）。国内官方平台也在确认这件事。学信网下面的学职平台 2025 年 5 月发文《提示词工程师为何遇冷？》（[xz.chsi.com.cn · 学职平台](https://xz.chsi.com.cn/xz/zyts/202505/20250514/2293380910.html)）。一个工种从国内国际两边同时被宣告退潮，已经是结论性的事实。

替代它的工种叫 AI engineer / agent engineer。LinkedIn 2026 年 Jobs on the Rise 美国版榜单（[linkedin.com](https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c)）把 AI engineer 列为 2026 年增长最快的岗位之一。世界经济论坛援引 LinkedIn 的数据（[weforum.org · 2026-01](https://www.weforum.org/stories/2026/01/ai-has-already-added-1-3-million-new-jobs-according-to-linkedin-data/)）：2023 到 2025 三年全球新增 130 万 AI 相关岗位，其中 AI engineer 单一头衔贡献了 7.5 万。

prompt engineer 死了，AI engineer 火了。表面看是 AI 工程岗位的内部洗牌。但拆开来看是一个更具体的能力位移。prompt engineer 的核心能力是给一个固定的模型写出能让它表现好的 prompt。这个能力今天大模型自己都能做了（你直接问 Claude 怎么 prompt 自己解决这道题它会给你一份很好的 prompt）。AI engineer 的核心能力是把模型放进一个可控、可复用、可扩展的系统里。这个系统就是 harness。

会写 harness 的人在替代只会调 prompt 的人。

harness engineer 这个具体头衔还在萌芽期。Addy Osmani 4 月那篇专门用了这个 title（[Agent Harness Engineering · 2026-04-19](https://addyosmani.com/blog/agent-harness-engineering/)）。Martin Fowler 站点 Birgitta Böckeler 那篇长文标题就是 Harness engineering for coding agent users（[martinfowler.com/articles/harness-engineering.html](https://martinfowler.com/articles/harness-engineering.html)）。但主流招聘网站还没有把 harness engineer 立成一个独立 title，你在 LinkedIn 搜这个词主要返回一家叫 Harness.io 的 CI/CD 公司岗位。这一年 harness engineer 的工作在被 AI engineer / agent engineer 这种更宽的 title 吸收。

但具体技能要求已经在分化。会调 LangChain 不再加分。会自己写 harness 的工具系统、会设计 context 管理策略、会跟 agent loop 调试到 99% 工具调用成功率。这些是新的稀缺技能。

接下来的红利在垂直 harness。

通用 harness（Claude Code、Cursor、Devin）已经被巨头占满。但每一个垂直行业都需要为它的具体场景定制 harness。医疗 harness 要懂 HIPAA 合规、要懂电子病历格式、要懂临床决策的责任边界。法律 harness 要懂判例引用规范、要懂客户保密、要懂 retainer 工作流。教学 harness 要懂学生进度跟踪、要懂作业引导而不是答案给出。设计 harness 要懂 Figma 协议、要懂版式规则、要懂品牌一致性。这些 harness 不能从 Claude Code 一键迁移，每一个都要从底下重写。

下一年红利集中的一类工程师就是能在一个垂直场景里把 harness 重做一遍的人。

红利窗口比 SaaS 时代窄。垂直 SaaS 当年用了 5 到 8 年才把大行业占满。Veeva 2007 起步做医疗 SaaS 用了 6 年到 IPO，那是 SaaS 时代典型的窗口长度。AI 工具的扩张节奏明显更快：Claude Code 从内部产品到 50 万行 TypeScript GA 用了 18 个月，Cursor 从 IDE 插件到独角兽不到两年。垂直 harness 的窗口大概率压缩到两到三年，2026 到 2028 这段时间是入场期。再往后基本不会再出现一个独立团队做出了面向 X 行业的 harness 这种创业故事，垂直位会被同期成长起来的玩家占满。

具体到一个问题：你现在该用什么 harness。

按背景画像分。

想轻装试水的读者，从 Claude Code 开始（[Claude Code · Anthropic](https://www.anthropic.com/product/claude-code)）。开箱即用、文档全、生态最成熟。

写代码为主的读者，Claude Code、Cursor、Codex CLI 三选一。三套各有侧重：Claude Code CLI 优先、Cursor 编辑器优先、Codex CLI 轻量。

想自己写垂直 harness 的读者，Claude Agent SDK（[platform.claude.com/docs/en/agent-sdk](https://platform.claude.com/docs/en/agent-sdk/migration-guide)）、Vercel AI SDK、Mastra。这三套是目前活跃的 harness 构建工具包，对比 LangChain 它们更轻、更聚焦 production agent 这个场景。

想做团队级部署的读者，Devin（[devin.ai](https://devin.ai/)）、Factory。这一类是把 harness 包成 SaaS 给整个工程团队用。

国内场景，Trae（字节）、CodeBuddy（腾讯）、Coze（字节通用 agent 平台）、Manus（端到端通用 agent）。每家底层模型不一样、harness 设计哲学不一样、价格不一样。选之前先看它们的 harness 怎么处理 context 管理和权限边界这两件最关键的事。

以后再看到一个 AI 产品，先别问它用了什么模型，先问它的 harness 设计了什么。

模型决定它能不能做。harness 决定它做不做得好。

![harness 产品图谱：编程类 / 通用 agent / 国内 / 国外（占位 · 见 assets/diagram-5-harness-landscape.html）](assets/diagram-5-harness-landscape.html)
