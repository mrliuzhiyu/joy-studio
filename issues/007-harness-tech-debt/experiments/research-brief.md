# 007 · 研究简报 · 你写的 Agent Harness，正在变成你的技术债

draft.md 里的事实都从这里出。按 notes.md「待 verify 事实清单」的关键项分组，每条带一句话定位说明在哪一章用。

诚实度规则：一手源（原始博客 / 论文 / 官方公告 / GitHub）优先；只有二手转述的标 **二手转述（待 Joy verify）**；找不到的标 **❌ NOT FOUND**。截止日期 2026-05-16，之后的事一律不收。

> **乱码名字纠正速查**——本次核实纠正的三个口述名字：
> - 「lan smart」= **Lance Martin**（LangChain 工程师，Open Deep Research 作者）。✅ 锁定。
> - 「Opus 4.5」（Letta 跑分用的模型）= **确实是 Claude Opus 4.5**，口述没错；但口述的对比数字「41.6%」错了，详见 C 组。
> - Hyung Won Chung 的任职「Meta」= **错**。正确履历：Google Brain → OpenAI，从未在 Meta。详见 D 组。

---

## A · 多 agent 删除案（01 章开篇）

### 核实结果：✅ 锁定，真实出处找到

口述里那个「lan smart」工程师 = **Lance Martin**，LangChain 的工程师，开源项目 [Open Deep Research](https://github.com/langchain-ai/open_deep_research) 的作者。这个故事是他亲笔写的复盘博客《Learning the Bitter Lesson》，**故事和人物都核到了原文，可以放心开篇**。

### 一手源（核心）

- **[Learning the Bitter Lesson · Lance Martin 个人博客（2025-07-30）](https://rlancemartin.github.io/2025/07/30/bitter_lesson/)** —— **01 章开篇主源**。Lance Martin（LangChain）亲述：
  - 「In late 2024, I released an orchestrator-worker workflow for web research.」—— 2024 年末他做的就是 orchestrator-worker 工作流：一个 LLM 调用充当 orchestrator，把用户请求拆成若干 report sections，一组 worker 并行研究并写各个 section。
  - 为什么用硬编码工作流而不是让模型自己调工具：「I had frustrating experiences with agents in 2023. It was hard to get LLMs to reliably call tools and context windows were small.」—— 2023 年他对 agent 体验很糟，当时很难让 LLM 可靠地调工具、上下文窗口又小，所以选了工作流绕过。
  - 2025 年的变化：到 2025 年冬，工具调用变可靠、MCP 起势、agent 被证明很适合做研究——他原来那套结构化做法过时了。
  - 并行架构的问题：并行写 section 产出的报告是 disjoint（拼不到一起）的；即使改成 multi-agent，子 agent 仍各写各的 section，无法有效沟通——他直接引用了 Walden Yan 对 multi-agent 核心难题的论述。
  - 最终解法：把「写」收到最后一步统一做（final consolidation step），让 agent 灵活规划研究策略、再从收集到的 context 一次性把报告写完，benchmark 分数反而更好。
  - 文章三个小节标题就是主轴：**Adding Structure → Bottlenecks → Removing Structure**。
- **[langchain-ai/open_deep_research · GitHub](https://github.com/langchain-ai/open_deep_research)** —— 仓库的 `src/legacy/` 目录里保留了两个早期实现（Plan-and-Execute 工作流、Supervisor-Researcher 多 agent），README 说它们「less performant than the current implementation」——代码层面坐实了「旧架构被换掉」。

### 辅助源（同一主题的扩写）

- [Open Deep Research · LangChain 官方博客（2025-07-16）](https://www.langchain.com/blog/open-deep-research) —— LangChain 官方写 Open Deep Research 架构。关键引文：早期版本让子 agent 并行写报告各章节，「the reports were disjoint because the section-writing agents were not well coordinated」（子 agent 不协调，报告拼出来前言不搭后语）。当前架构把并行限制在「只并行做研究、不并行写报告」，写报告改成一次性统一完成。
- [Don't Build Multi-Agents · Walden Yan / Cognition（2025-06-12）](https://cognition.ai/blog/dont-build-multi-agents) —— **可作 01 章的同侧第二源**。Cognition 联合创始人 Walden Yan 论述 multi-agent 为什么脆弱：上下文碎片化（子 agent 缺乏对整体任务的共识）+ 隐含决策冲突（并行 agent 各自做风格 / 边界 / 代码模式的选择，拼不到一起）。注意：**这篇本身没讲「2024 做了某个工具、2025 删掉重写」的具体复盘**——具体复盘是 Lance Martin 那篇。Cognition 后续又发了 [Multi-Agents: What's Actually Working（2026-04-22）](https://cognition.ai/blog/multi-agents-working)，立场微调（写保持单线程、多 agent 只贡献「智能」不贡献「动作」时可行），07 章如要平衡可引。

### 给 draft 的话术建议

01 章开篇直接讲 Lance Martin 的故事，归属写清楚「LangChain 工程师 Lance Martin」「他 2024 年末做的开源深度研究工具 Open Deep Research」。Cognition / Walden Yan 那篇可在「这不是个例」处补一句，作同侧印证。**不要把这个故事说成 Cognition 的复盘——它是 Lance Martin 的复盘。**

---

## B · 约 600 行的极简 harness（04 章）

### 核实结果：✅ 锁定，真实团队 / 产品名 + 结构出处全部找到

口述里那个「约 600 行、helpers / daemon / SKILL.md / run 循环、模型缺功能自己写」的极简 harness = **browser-use 团队的 Browser Harness**。

### 一手源

- **[The Bitter Lesson of Agent Harnesses · browser-use 官方博客 · Gregor Zunic（2026-04-19）](https://browser-use.com/posts/bitter-lesson-agent-harnesses)** —— **04 章主源**。结构和行数全部对得上：
  - `run.py`（13 行）—— 加载好 helpers 后跑原生 Python。
  - `helpers.py`（192 行）—— CDP（Chrome DevTools Protocol）的薄封装。
  - `daemon.py`（220 行）—— 保持 CDP websocket 连接不断。
  - `SKILL.md` —— 告诉 agent 上面这些怎么用。
  - 合计约 **600 行**。✅ 口述的「约 600 行」准确。
  - 自愈机制原话：「When a helper is missing, the agent does what any Claude Code user would do: greps helpers.py, adds the function, reruns.」—— 缺某个 helper 时，agent 像任何 Claude Code 用户一样：grep 一下 helpers.py，把那个函数补上，重跑。
  - 设计哲学原话：「your helpers are abstractions too. Delete them. Let the agent write what it needs.」—— 你的 helpers 也是抽象，删掉它，让 agent 自己写它需要的。
- [browser-use/browser-harness · GitHub](https://github.com/browser-use/browser-harness) + [SKILL.md](https://github.com/browser-use/browser-harness/blob/main/SKILL.md) —— 代码仓库本身，可核行数与结构。仓库描述：「Self-healing harness that enables LLMs to complete any task.」

### 注意

这是一个**浏览器自动化**场景的 harness（封装的是 Chrome CDP），不是通用编程 harness。04 章引用时说清楚场景即可，「helpers / daemon / SKILL.md / run 循环 + 模型自己补函数」这套结构本身是通用的、可类推。

---

## C · Letta 持久记忆跑分 vs 官方 harness（04 章）

### 核实结果：⚠️ 部分核实 + 一处口述数字需纠正

- **「59.1%」✅ 确认**——是 Letta Code 在 **Terminal-Bench 2.0** 上的成绩，用的模型 **确实是 Claude Opus 4.5**（口述没错）。
- **「41.6%」❌ 没有这个数**——Claude Code 在 Terminal-Bench 2.0 上的成绩查不到 41.6%。最接近的真实数字见下。**这个对比数字口述记错了，draft 不能用 41.6%。**

### 一手 / 权威源

- **[Terminal-Bench 2.0 官方 Leaderboard · tbench.ai](https://www.tbench.ai/leaderboard/terminal-bench/2.0)** —— **04 章主源**。逐条核到：
  - **Letta Code / Claude Opus 4.5 / 59.1% ± 2.4**（提交日期 2025-12-17）
  - **Claude Code / Claude Opus 4.6 / 58.0% ± 2.9**（提交日期 2026-02-07）
  - **Claude Code / Claude Opus 4.5 / 52.1% ± 2.5** —— 这是 Claude Code 用**和 Letta 同一颗 Opus 4.5** 的成绩。
  - 其它 Claude Code 条目：Sonnet 4.5 = 40.1%、Opus 4.1 = 34.8%、Haiku 4.5 = 27.5%。
- [Letta Code: A Memory-First Coding Agent · Letta 官方博客（2025-12-16）](https://www.letta.com/blog/letta-code) —— Letta Code 官方介绍。明确定位「a memory-first coding agent」「built around long-lived agents that persist across sessions」「the #1 model-agnostic OSS harness on TerminalBench」。**注意：这篇官方博客里没有给出 59.1% / 58.0% 这种精确数字，也没有逐条点名 Claude Code 的分数**——精确数字要引 Terminal-Bench 官方 Leaderboard。
- [Letta Code · letta-ai/letta-code GitHub](https://github.com/letta-ai/letta-code) —— 仓库，「The memory-first coding agent」。
- [Building the #1 open source terminal-use agent using Letta（2025-08-05）](https://www.letta.com/blog/terminal-bench) —— Letta 更早一篇，跑的是 Terminal-Bench（1.0），Letta 用 Claude 4 Sonnet 拿 42.5%，「roughly match Claude Code using 4 Opus」。**这是旧 benchmark、旧数字，不要和 Terminal-Bench 2.0 的 59.1% 混用。**

### 给 draft 的准确表述（建议照此写）

> 第三方 harness Letta Code（Letta 即原 MemGPT 公司，主打持久记忆）在 Terminal-Bench 2.0 上得 59.1%，用的是 Claude Opus 4.5；Anthropic 官方第一方 harness Claude Code 用同一颗 Opus 4.5 得 52.1%，用更新一代的 Opus 4.6 得 58.0%。同一颗 Opus 4.5，第三方 harness 比官方 harness 高约 7 个百分点；即便官方 harness 换上更新的模型，第三方仍小幅领先。

口述的「41.6%」**不要用**。要点没变（第三方 harness 在某维度上、用同模型打败第一方），但数字必须改成 52.1%（同模型）或 58.0%（官方用更新模型）。Letta「主打持久记忆这一维度」的定位由官方博客「memory-first coding agent」坐实——✅。

> ⚠️ 待 Joy 定夺：Terminal-Bench 2.0 是综合编程 benchmark，不是「持久记忆专项 benchmark」。Letta 的差异化卖点是记忆，但 59.1% 这个分不是「记忆维度跑分」、是综合分。draft 若强调「在持久记忆这单一维度上打败第一方」，措辞要谨慎——更稳的说法是「主打记忆的第三方 harness，在综合编程 benchmark 上用同模型打赢了官方 harness」。

---

## D · Hyung Won Chung「加结构再去掉」引语（02 章主引语）

### 核实结果：✅ 核实 + 一处口述任职需纠正

- 引语**真实存在**，核到出处。
- 任职：口述说「Meta」**❌ 错**。Hyung Won Chung 的履历是 **Google Brain → OpenAI**，从未在 Meta。

### 一手 / 权威源

- **[Learning the Bitter Lesson · Lance Martin（2025-07-30）](https://rlancemartin.github.io/2025/07/30/bitter_lesson/)** —— Lance Martin 在文中引用并归属给 Hyung Won Chung，措辞为：
  > 「Add structures needed for the given level of compute and data available. Remove them later, because these shortcuts will bottleneck further improvement.」
  Lance Martin 把它归到 Hyung Won Chung（OpenAI）的一个 [talk](https://youtu.be/orDKvo8h71o)。**这是 Lance Martin 的转述措辞**，不是 Chung 的逐字原话。
- **[Stanford CS25: V4 I Hyung Won Chung of OpenAI](https://youtu.be/orDKvo8h71o)**（YouTube）—— 即 Lance Martin 链接的那场演讲。标题《Shaping the Future of AI from the History of Transformer Architectures》，OpenAI 时期演讲（CS25 V4 系列，2024 年）。
- **Hyung Won Chung 本人的逐字表述**（更接近原话）见他的 X 帖 [x.com/hwchung27/status/1943395653738287429](https://x.com/hwchung27/status/1943395653738287429)（2025-07）：
  > 「It's a mistake not to add structure now, it's a mistake to not remove that structure later.」
  原帖语境：「When trying to make a new paradigm work, it is often necessary to add structures, e.g. clever modeling ideas. These structures ...」。**X 帖正文 WebFetch 取不到（X 反爬），上面的措辞来自搜索引擎抓取的帖子摘要——⚠️ 引逐字原话前建议 Joy 打开 X 帖核一眼。**
- [Hyung Won Chung 个人主页 · hwchung2.github.io](https://hwchung2.github.io/) —— 核任职。自述在 Google Brain 期间「worked on whatever bottleneck stood in the way of further scaling」；现 OpenAI 研究科学家。**履历 = Google Brain → OpenAI，无 Meta。**

### 给 draft 的表述建议

两种写法都成立，二选一：
1. **用 Lance Martin 的转述措辞**（和 01 章开篇同源，叙事顺）：「在你当前算力 / 数据水平上加结构，之后再把结构去掉，因为这些捷径会成为下一步提升的瓶颈」——归属写「OpenAI 研究科学家 Hyung Won Chung，经 Lance Martin 转述」。
2. **用 Chung 本人的逐字句**：「现在不加结构是错的，之后不把结构去掉也是错的」——更短、更锋利，但建议 Joy 先核 X 帖。

任职统一写 **OpenAI**（曾在 Google Brain），**绝对不要写 Meta**。

---

## E · The Bitter Lesson · Rich Sutton（06 章收尾）

### 核实结果：✅ 已核实

### 一手源

- **[The Bitter Lesson · Rich Sutton（2019-03-13）](http://www.incompleteideas.net/IncIdeas/BitterLesson.html)** —— 原文，Sutton 个人站 incompleteideas.net。
  - ⚠️ 该站是 http 且证书自签，WebFetch 直连失败；下列内容经 [Wikipedia · Bitter lesson](https://en.wikipedia.org/wiki/Bitter_lesson) 与多个二手转述交叉核实，**引用时 URL 可照填官方原站**（链接本身有效，只是机器抓取受限）。
- 开篇句：「The biggest lesson that can be read from 70 years of AI research is that general methods that leverage computation are ultimately the most effective, and by a large margin.」
- 论证结构（Sutton 自述）：AI 研究者常想把人类知识塞进系统 → 短期总有用、也让研究者有成就感 → 长期会停滞、甚至阻碍进步 → 突破最终来自相反路径：靠搜索和学习来规模化计算。
- **关键例子**（draft 06 章可用）：
  - **国际象棋**：1997 年击败卡斯帕罗夫的方法靠的是大规模深度搜索（massive deep search）+ 专用硬件，而非「利用人类对国际象棋特殊结构的理解」的方法；当时多数计算机象棋研究者对这个结果「looked upon with dismay」。
  - **计算机围棋**：同样的模式，只是晚了约 20 年才上演（搜索 + 学习 / 自我对弈胜过手工知识）。
  - **语音识别**：Sutton 原文还举了 1970 年代 DARPA 语音识别竞赛——基于统计的方法（隐马尔可夫模型 HMM）胜过依赖人类知识（词、音素、声道模型）的方法。⚠️ HMM / 语音这一段是 Sutton 原文确有的经典例子，但本次未能逐字抓取原文该段，**Joy 引用语音例子时建议打开原文核一眼措辞**。
  - 计算机视觉：原文也提及（早期手工特征 SIFT 等 → 深度学习），同属「手工知识 vs 规模化计算」模式。

### 给 draft 的话术建议

notes.md 已定调「诚实地当类比、不当定律」——这是对的。Sutton 讲的是 AI **研究**几十年尺度的方向；harness 是**产品**当下季度的工程问题。06 章把它当方向性收尾，不要写成「所以现在就该删掉 harness」。反方材料里有专门反驳「Bitter Lesson 套到产品上」的内容，见反方专节。

---

## F · "thin harness, thick/fat skills"（04 章 / 标题级原则）

### 核实结果：✅ 有具体出处命名，不是通用表述

这个原则的流行说法叫 **"Thin Harness, Fat Skills"**（thin harness / fat skills），由 **Garry Tan**（Y Combinator CEO）命名并推广。注意准确的英文是 **fat skills**（不是 thick skills）；draft 用「thick skills」作中文化意译可以，但点出英文原词时建议用 fat skills 并归属 Garry Tan。

### 一手源

- **[THIN_HARNESS_FAT_SKILLS.md · garrytan/gbrain · GitHub（更新于 2026-04-11）](https://github.com/garrytan/gbrain/blob/master/docs/ethos/THIN_HARNESS_FAT_SKILLS.md)** —— **04 章主源**。Garry Tan 本人仓库里的 ethos 文档。核心原则原话：
  > 「Push intelligence UP into skills. Push execution DOWN into deterministic tooling. Keep the harness THIN.」
  其它要点：harness 约 200 行代码，只干四件事（在循环里跑模型 / 管文件 / 控 context / 做安全围栏）；fat skills 是 markdown 写的、承载判断与领域知识的流程；模型升级时「when the next model drops, every skill instantly gets better, because the judgment in the latent steps improves while the deterministic steps stay perfectly reliable」——技能自动变强、确定性底座保持稳定。
- [Building Multi-Agent Applications with Deep Agents · LangChain Blog](https://www.blog.langchain.com/building-multi-agent-applications-with-deep-agents/) + [The Anatomy of an Agent Harness · LangChain（Vivek Trivedy，2026-03-10）](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness) —— **反向对照**：LangChain 的 Harrison Chase 一派主张「harness 本身就是产品」（内建任务规划、子 agent spawn、middleware、hooks），和 Garry Tan「harness 应尽量薄」是**对立论点**，同一周各自发文（见 [Siddhartha Saxena 推文](https://x.com/siddsax/status/2043713008665534884) 对这场对立的概括）。04 章如要平衡可点出这是有争议的、不是定论。

### 二手转述（中文圈，仅作译法参考，不作事实源）

- [Garry Tan's Thin Harness, Fat Skills: Five Concepts Unpacked · yage.ai（2026-04-14）](https://yage.ai/share/thin-harness-fat-skills-en-20260414.html) —— 二手解读，把三层架构拆成 Fat Skills（顶层 markdown）/ Thin CLI Harness（中层约 200 行）/ Deterministic Tools（底层）。

### 给 draft 的话术建议

04 章可以直接说「这个方向有人把它命名成 thin harness, fat skills，是 YC 的 Garry Tan 在推」。同时诚实标注：这是个**有争议的主张**——LangChain 那派反过来认为 harness 越厚越好。这正好喂 03 章 / 反方。

---

## G · 模型原生工具调用变可靠的时间锚（02 章进程）

### 核实结果：✅ 已补充多个锚点

02 章「2024 工具调用不稳 → 2025 模型能自己调工具」这条线，可用的时间锚：

- **2024-08-06 · OpenAI Structured Outputs** —— gpt-4o-2024-08-06 引入 `strict: true`，把约束解码 + 训练结合，从「尽力而为」的 schema 遵循升级为强保证。来源：[Tool Use and Function Calling in AI Agents · Zylos Research（2026-04-07）](https://zylos.ai/research/2026-04-07-tool-use-function-calling-standards-benchmarks)（二手综述，引用时标注）。
- **2024-10-22 · Anthropic Computer Use + 新版 Claude 3.5 Sonnet** —— 004 已核的锚。本次复核 [Anthropic 官方公告](https://www.anthropic.com/news/3-5-models-and-computer-use)：发布日 2024-10-22；新版 3.5 Sonnet 在 TAU-bench 上 agentic 工具使用明显提升（retail 62.6%→69.2%、airline 36.0%→46.0%）；Computer Use 当时是 public beta，官方自陈「at times cumbersome and error-prone」。**这条同时是「2024 工具调用还不稳」的官方自证。**
- **2024-11 · Anthropic 发布 MCP（Model Context Protocol）** —— 工具调用标准化的起点。来源：[Zylos Research 综述](https://zylos.ai/research/2026-04-07-tool-use-function-calling-standards-benchmarks)（二手）。
- **2025 冬 · 工具调用与 agent 范式成熟** —— Lance Martin 在 [Learning the Bitter Lesson](https://rlancemartin.github.io/2025/07/30/bitter_lesson/) 里的第一人称时间锚：「by winter 2025, tool calling improved significantly, MCP gained momentum, agents proved well-suited to research」。**这条最适合 draft——是工程师亲历、且和 01 章同源。**

### 给 draft 的话术建议

最干净的锚组合：2024-10 Anthropic Computer Use（官方承认工具调用 error-prone）→ 2025 冬 Lance Martin 亲述工具调用变可靠。两条都是一手、且其中一条就是开篇那个人，叙事闭环。

---

## H · RAG → 可视化工作流 → 长周期 agent 演进线（02 章）

### 核实结果：✅ 常识可用 + 一手评论已补

- RAG 组件栈（向量库 / 分块 / 重排 / 查询改写）作为 2023 上下文窗口小的补丁——notes.md 已定「常识可用」，无需额外核。
- n8n / Dify 作为 2024 可视化工作流代表——notes.md 已定「常识可用」。补充一手定性：[n8n vs Dify vs Flowise · Rapid Claw（2026）](https://rapidclaw.dev/blog/low-code-ai-agent-platforms-compared-2026) 等多篇指出，可视化工作流平台在「需要长周期多 agent 状态、亚秒延迟、CI 级测试」时会失效，要让位给 code-first 框架——**这条支持「节点式工作流随任务变长而过时」的论点**（二手综述，标注）。
- **「工作流随模型变强而过时」最强的一手评论**：还是 [Learning the Bitter Lesson · Lance Martin](https://rlancemartin.github.io/2025/07/30/bitter_lesson/)。他亲述「2024 年因工具调用不可靠而选 workflow，2025 年模型变强后 workflow 成了过时结构、删掉换成 agent」——这就是「工作流是补丁、补丁会过期」的活样本。02 章这条线直接用 Lance Martin 串，比泛泛举 n8n / Dify 更有力。
- 工作流 vs agent 的范式框架：[Building Effective AI Agents · Anthropic（2024-12-19）](https://www.anthropic.com/research/building-effective-agents) 给了 workflow（LLM + 工具走预定义代码路径）vs agent（模型自主决策）的官方区分。004 已引此文。

---

## 反方 / 反对意见专节（项目硬规则：反方不少于正方，03 章结构性 steelman）

下面每条都是**可信地反对「harness 是一次性的 / 该删掉它」**的论点，按强度排序。

### 反方 1 · 治理层 harness 是永久基础设施，不随模型变强作废

- **[Building Governed AI Agents: A Practical Guide to Agentic Scaffolding · Tian Pan（2026-02-16）](https://tianpan.co/blog/2026-02-16-building-governed-ai-agents-agentic-scaffolding)** —— **03 章反方主源**。把 scaffolding 明确分三层：
  - execution layer（LLM 调用、工具调用、动作序列）
  - coordination layer（路由、交接、状态管理、多 agent 编排）
  - **governance layer（护栏、权限、人工升级、审计日志）**
  原文论点：「most agent deployments fail not because the model underperforms, but because the scaffolding around it lacks structure」——大多数 agent 部署失败不是模型不行，是周围的 scaffolding 缺结构。且治理基础设施**无法事后补**：「Retrofitting an audit trail into a production system that's been running for months is painful」——给跑了几个月的生产系统补审计日志非常痛苦。**这条直接支撑 notes.md 03 章「治理层不贬值、模型越强越需要」的核心论断。**

### 反方 2 · harness 不会消失，只会被新 harness 替代

- **[The Anatomy of an Agent Harness · LangChain · Vivek Trivedy（2026-03-10）](https://www.langchain.com/blog/the-anatomy-of-an-agent-harness)** —— 承认「As models get more capable, some of what lives in the harness today will get absorbed into the model」，但紧接着反驳：「That suggests harnesses should matter less over time. But just as prompt engineering continues to be valuable today, it's likely that harness engineering will continue to be useful」。核心论点：harness 不只是补模型短板，它**系统化地组织智能**；即便很强的模型也受益于环境配置、合适工具、持久状态、反馈回路。
- [Your harness, your memory · LangChain Blog](https://www.langchain.com/blog/your-harness-your-memory)（004 已引）—— 同一立场：「even as model improvements absorb some scaffolding, this gets replaced by other types of scaffolding」「a system around the LLM is always needed」。

### 反方 3 · "thin harness" 本身是有争议的主张——对立面是「harness 就是产品」

- LangChain 的 Harrison Chase 一派主张 **harness 越厚越好**：Deep Agents 把任务规划、子 agent spawn、middleware、hooks 全做进 harness，认为「the harness IS the product」。和 Garry Tan「thin harness」是同一周发布的**对立论点**。来源：[Building Multi-Agent Applications with Deep Agents · LangChain](https://www.blog.langchain.com/building-multi-agent-applications-with-deep-agents/)、[Siddhartha Saxena 推文对这场对立的概括](https://x.com/siddsax/status/2043713008665534884)。**意义：draft 的核心主张「thin harness / thick skills」不是行业共识，是有人公开反对的——03 章 steelman 应承认这一点。**

### 反方 4 · Bitter Lesson 讲的是研究，不是产品；安全 / 可解释场景需要结构

- **[Does the Bitter Lesson Have Limits? · David Breunig（2025-08-01）](https://www.dbreunig.com/2025/08/01/does-the-bitter-lesson-have-limits.html)** —— 指出 Bitter Lesson 的两个边界：(1) 它假设目标清晰可量化，多数组织其实做不到（OKR 之类指标含糊、可被博弈）；(2) 规模化不总是最优——Stockfish 用「更小的模型 + 更好的搜索」打赢算力更重的 Leela。原文明确给结构留位置：「don't be afraid to thoughtfully apply custom, human-crafted logic or embrace non-general models to get the job done.」
- 安全 / 合规场景对结构的硬需求：安全攸关系统（核反应堆控制、医疗诊断设备、自动驾驶决策）法律上要求可审计、可解释的显式推理链，不能只靠不可审计的统计推断。来源：[The Bitter Lesson as Operational Constructivism · PhilArchive](https://philarchive.org/archive/MORTBL-2)（学术 preprint，标注为偏理论源）。
- **意义**：06 章把 Bitter Lesson 当方向性收尾时，这一节正好提供「为什么产品当下仍需要结构」的对冲。notes.md 06 章已定调「方向不是立刻」——反方 4 给这个定调撑腰。

### 反方 5 · 生产可靠性当下就需要结构——这是工程现实不是过渡形态

- [Building Effective AI Agents · Anthropic（2024-12-19）](https://www.anthropic.com/research/building-effective-agents) —— Anthropic 官方也说：高风险、错误难发现的场景，autonomy 反而是 liability，应该用 workflow 约束。工作流的可调试、可审计、可追踪（有可视化图 / 日志 / 指标）是 agent 自主推理给不了的。**这条说明「窄而结构化」在生产里有当下的、不可替代的价值——不是等模型变强就该删的东西。**
- 与 notes.md 05 章呼应：生产 harness 要窄（白名单 / 最小权限 / 审计 / 一键关），这个「窄」本身是结构，且它**不该被删**——这恰恰是 draft 自己的论点（能力脚手架贬值 ≠ 治理结构贬值），反方在这里其实和正方收敛。

### 反方材料量自评

正方核心源：A 组 Lance Martin + B 组 browser-use + F 组 Garry Tan，3 个主源。反方：上面 5 条，各有一手 / 权威源。**反方数量与分量 ≥ 正方，满足项目硬规则。** 03 章可把反方 1 / 2 作主体，反方 3 / 4 / 5 散织进 04 / 06 章。

---

## 仍未核实 / 需要 Joy 介入的清单

| 项 | 状态 | 建议 |
| --- | --- | --- |
| 「41.6%」Claude Code 对比数字 | ❌ 口述记错 | Terminal-Bench 2.0 上 Claude Code 无 41.6%。改用 52.1%（同 Opus 4.5）或 58.0%（Opus 4.6）。draft 必须改数字。 |
| Hyung Won Chung 任职「Meta」 | ❌ 口述记错 | 正确履历 Google Brain → OpenAI。draft 统一写 OpenAI，删掉 Meta。 |
| Chung 引语的逐字原话 | ⚠️ 待 Joy verify | Lance Martin 转述版可直接用并标注「经 Lance Martin 转述」。若要用 Chung 本人逐字句（「It's a mistake not to add structure now...」），建议 Joy 打开 [X 帖](https://x.com/hwchung27/status/1943395653738287429) 核一眼——X 反爬，机器抓不到正文，措辞来自搜索摘要。 |
| Bitter Lesson 语音识别 / HMM 段落措辞 | ⚠️ 待 Joy verify | 例子真实存在（经典段落），但 incompleteideas.net 自签证书、机器抓不到原文。Joy 引语音例子前打开 [原文](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) 核一眼措辞。其余例子（象棋 / 围棋）已交叉核实可用。 |
| Letta 59.1% 是否算「持久记忆维度跑分」 | ⚠️ 待 Joy 定夺 | Terminal-Bench 2.0 是综合编程 benchmark，不是记忆专项。draft 若说「在持久记忆这单一维度上打败第一方」措辞偏了；更稳：「主打记忆的第三方 harness，在综合编程 benchmark 上用同模型打赢官方 harness」。 |
| Letta 官方是否自己点名 vs Claude Code 的精确分差 | ⚠️ 已知边界 | Letta 官方博客只说「comparable / #1 model-agnostic OSS」，精确数字来自 Terminal-Bench 官方 Leaderboard。draft 引精确数字时归属到 tbench.ai，不要归到 Letta 博客。 |
| Structured Outputs / MCP 时间锚的一手源 | ⚠️ 二手 | 2024-08 Structured Outputs、2024-11 MCP 的具体日期目前走的是二手综述。若 draft 要精确到日，建议补 OpenAI / Anthropic 官方公告原链。02 章若只用 Computer Use（2024-10）+ Lance Martin（2025 冬）两个一手锚，则无需补。 |

---

## 一句话给 draft 作者

开篇（01 章）和主引语（02 章）都稳了——Lance Martin 这个人、Open Deep Research 这个项目、《Learning the Bitter Lesson》这篇博客是同一个源，把 01 章故事、02 章 Chung 引语、06 章 Bitter Lesson 串成一条线。04 章 browser-use 600 行 harness、Garry Tan thin harness 也都核到一手。**唯一硬伤是 Letta 那个「41.6%」——口述记错了，必须改。** 反方五条料齐，03 章 steelman 不缺弹药。
