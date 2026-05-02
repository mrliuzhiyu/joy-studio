# 004 · 素材链接库

draft.md 里的事实都从这里出。按 notes.md 的待 verify 主题（A-H）归类，每条带一句话定位说明在哪一章用。

诚实度规则：找不到的事实标 **NOT FOUND** 或 **未公开数据**；只有二手转述、没有一手源的标 **二手转述（待 Joy verify）**。

---

## A · Anthropic 产品矩阵

### 核实结果汇总

- **Claude Cowork**：是 **真实公开的官方产品**。一手源齐全。
- **Claude Design**：是 **真实公开的官方产品**。一手源齐全。
- **Claude Code**：现役旗舰 CLI，文档站迁到 code.claude.com。
- **Computer Use**：仍是 **beta**（Computer Use API 在 2026-05 仍未 GA），但消费版 Cowork 已 GA。
- **Claude Agent SDK**：原 Claude Code SDK 已正式改名 Claude Agent SDK（2025-09）。

### 一手源

- [Cowork: Claude Code power for knowledge work · claude.com 官方产品页](https://claude.com/product/cowork) —— 01 章 / 05 章用。Cowork 官方定位：「Delegate to Claude, delight in the result」；具备 schedule recurring tasks、file organize、spreadsheet 构建、branded report 生成等能力；当前在 Claude Desktop 三种模式（Chat / Code / Cowork）之一，mobile 部分 beta。
- [Claude Cowork · Anthropic's agentic AI for knowledge work · anthropic.com 官方产品页](https://www.anthropic.com/product/claude-cowork) —— 01 章。官方产品入口。
- [Anthropic launches Claude Cowork in General Availability · TestingCatalog](https://www.testingcatalog.com/anthropic-launches-claude-cowork-in-general-availability/) —— 05 章。Cowork 2026-04-09 GA、新增六项 enterprise 功能。
- [Anthropic Launches Managed Agents and Claude Cowork GA: April 9, 2026](https://pasqualepillitteri.it/en/news/755/anthropic-managed-agents-cowork-ga-april-9-2026) —— 05 章。三连发：Managed Agents + Cowork GA + Claude Code 更新（2026-04-09）。
- [Anthropic's new Cowork tool offers Claude Code without the code · TechCrunch](https://techcrunch.com/2026/01/12/anthropics-new-cowork-tool-offers-claude-code-without-the-code/) —— 01 章。Cowork 最初定位即「Claude Code without the code」。
- [Anthropic updates Claude Cowork tool · CNBC](https://www.cnbc.com/2026/02/24/anthropic-claude-cowork-office-worker.html) —— 01 章。2026-02-24 Cowork 加入企业 connectors（Google Drive / Gmail / DocuSign / FactSet）。
- [Introducing Claude Design by Anthropic Labs · anthropic.com 官方公告（2026-04-17）](https://www.anthropic.com/news/claude-design-anthropic-labs) —— 01 章 / 05 章。Claude Design 由 Opus 4.7 驱动，research preview 阶段，Pro/Max/Team/Enterprise 可用，定位是把对话变成可交互原型 / slides / one-pager。
- [Anthropic launches Claude Design · TechCrunch（2026-04-17）](https://techcrunch.com/2026/04/17/anthropic-launches-claude-design-a-new-product-for-creating-quick-visuals/) —— 01 章。第三方报道 Claude Design 发布日。
- [Claude Code · Anthropic 官方产品页](https://www.anthropic.com/product/claude-code) —— 01 章。Anthropic agentic coding system 官方页。
- [Claude Code · code.claude.com 文档站](https://code.claude.com/docs/en/agent-sdk/overview) —— 03 章。Agent SDK 文档（2025-09 之后正式从 Claude Code SDK 改名）。
- [Migrate to Claude Agent SDK · platform.claude.com](https://platform.claude.com/docs/en/agent-sdk/migration-guide) —— 03 章。官方迁移指南，确认 ClaudeCodeOptions → ClaudeAgentOptions 的改名时间点。
- [Claude Code SDK rebranded as Claude Agent SDK · LinkedIn 转述（2025-09）](https://www.linkedin.com/posts/cobusgreyling_the-claude-code-sdk-has-been-rename-to-claude-activity-7378847012856778752-eg4u) —— 03 章。改名公开时间点。
- [Introducing computer use, a new Claude 3.5 Sonnet · Anthropic 官方（2024-10）](https://www.anthropic.com/news/3-5-models-and-computer-use) —— 01 章。Computer Use 最初发布博客。
- [Anthropic Release Notes · May 2026](https://releasebot.io/updates/anthropic) —— 01 章 / 05 章。汇总站，可作为辅助索引。
- [Anthropic April 2026 Announcement: Everything Claude Shipped This Month · Fazm](https://fazm.ai/blog/anthropic-april-2026-announcement) —— 05 章。整月产品动态汇总（含 Cowork GA、Managed Agents、Claude Code 更新）。
- [Claude Computer Use in 2026: API Tool vs Cowork vs Claude Code · LaoZhang AI](https://blog.laozhang.ai/en/posts/claude-computer-use) —— 01 章。Computer Use API 仍 beta（header `computer-use-2025-11-24`），与 Cowork 区分。

### 关键事实摘要

- 2026-05 Anthropic 同时在跑的对外产品：Claude.ai（聊天）/ Claude Code（编程 CLI）/ Claude Cowork（GA · 2026-04-09）/ Claude Design（research preview · 2026-04-17）/ Computer Use（API 仍 beta）/ Claude Agent SDK（开发者构建 harness 用）。
- 同一颗模型：Claude Opus 4.7（2026-04-16 发布）。
- Anthropic 也发布过 Claude Mythos Preview 作为下一代研究预览（red.anthropic.com），但偏 security 研究方向，不算消费产品。

---

## B · 同模型不同 harness 的实测数据

### 关键发现

**最有冲击力的数据点：HumanLayer / 0xblacklight 给出的实测——同样的 Opus 4.6 在 Terminal Bench 2.0 上**：
- 在 Claude Code 里排名 #33
- 换到另一套未参与 post-training 的 harness 里直接到 #5
- 来源：[Skill Issue: Harness Engineering for Coding Agents · HumanLayer Blog（2026-03-12）](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents)
- **05 章的核心数据点 → 比 Cognition 那个旧数字更有说服力**

**第二组：同模型不同 harness 16 个百分点差距**：
- Matt Mayer 实测：Claude Opus 在 Claude Code 里 77%，在 Cursor 里 93%；同模型同任务，仅 harness 不同 → 16 个百分点。
- 来源：[Claude Code vs Codex CLI vs Aider vs OpenCode vs Pi vs Cursor · thoughts.jock.pl（2026-04-15 · Pawel Jozefiak）](https://thoughts.jock.pl/p/ai-coding-harness-agents-2026)
- **04 / 05 章可用**

**第三组：CORE-Bench 同模型 minimal scaffold vs Claude Code full harness**：
- Claude Opus 在 minimal scaffold 下 42%，进 Claude Code 完整 harness 后 78% → 36 个百分点差距。
- 来源同上 thoughts.jock.pl
- **02 章末或 05 章用**

**第四组：AddyOsmani 引用 Viv 团队的 Terminal Bench 2.0 案例**：
- 仅改 harness、不换模型，coding agent 从 Top 30 升到 Top 5。
- 来源：[Agent Harness Engineering · Addy Osmani（2026-04-19）](https://addyosmani.com/blog/agent-harness-engineering/)
- 引述「a decent model with a great harness beats a great model with a bad harness」
- **05 章金句素材**

### 支持源

- [Cognition · SWE-bench technical report（2024-03-15）](https://cognition.ai/blog/swe-bench-technical-report) —— 01 章。Devin 13.86% vs 上届 unassisted 1.96%（606% 提升），但**这是 SWE-bench 原版而非 SWE-bench Verified**，且**没有给出"同模型 + 自家 harness vs 直接调 API"的具体百分比对比**——notes.md 里那个 [X] 个百分点的数据 **NOT FOUND**，建议改用 HumanLayer 的 Terminal Bench 数据。
- [GitHub · CognitionAI/devin-swebench-results](https://github.com/CognitionAI/devin-swebench-results) —— Cognition 公开的 Devin 评测方法和原始数据。
- [Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet · Anthropic（2024-10-30）](https://www.anthropic.com/news/swe-bench-sonnet) —— 01 章 / 04 章。Anthropic 自己跑 SWE-bench Verified 49%（前 SOTA 45%），明确提到「agent scaffold optimized for updated Claude 3.5 Sonnet was to give as much control as possible to the language model itself, and keep the scaffolding minimal」——**这篇里用的词是 scaffold 而不是 harness**，05 章可作为 Anthropic 极简 scaffold 哲学的对照。
- [SWE-bench Verified Leaderboard · llm-stats.com](https://llm-stats.com/benchmarks/swe-bench-verified) —— 01 章。当前榜单。
- [SWE-bench Verified Benchmark 2026 · BenchLM](https://benchlm.ai/benchmarks/sweVerified) —— 01 章。前 10 名 + 各家 harness 配置。
- [SWE-bench February 2026 leaderboard update · Simon Willison](https://simonwillison.net/2026/Feb/19/swe-bench/) —— 01 章。2026 年 2 月排行榜更新分析；提到 mini-swe-agent（minimal bash-only harness）作为对比基线。
- [Continually improving our agent harness · Cursor Blog（2026-04-30 · Stefan Heule & Jediah Katz）](https://cursor.com/blog/continually-improving-agent-harness) —— 04 / 05 章。Cursor 官方写自家 harness 演化史；「dynamic context」「OpenAI patch-based vs Anthropic string-replacement format」「2 or 3 9s tool call reliability」「mid-conversation model switching with automatic harness adaptation」。
- [Towards self-driving codebases · Cursor Blog](https://cursor.com/blog/self-driving-codebases) —— 04 章。Cursor 自家 harness 架构演化叙事。
- [Coding Agents Comparison: Cursor, Claude Code, GitHub Copilot · ArtificialAnalysis](https://artificialanalysis.ai/agents/coding) —— 07 章。第三方编程 agent 对比榜。
- [SWE-Bench Pro Leaderboard 2026: Why 46% Beats 81% · Morph](https://www.morphllm.com/swe-bench-pro) —— 01 章注脚。强调 SWE-bench Verified 因污染分数虚高。

---

## C · harness 词源迁移

### 关键节点（已 verify）

1. **2020-08-28 · EleutherAI lm-evaluation-harness 仓库初创**
   - 通过 `gh api repos/EleutherAI/lm-evaluation-harness` 拿到的 created_at 字段：`2020-08-28T00:09:15Z`
   - 描述：「A framework for few-shot evaluation of language models.」
   - 当前 12.4k star，仍在维护。
   - 来源：[github.com/EleutherAI/lm-evaluation-harness](https://github.com/EleutherAI/lm-evaluation-harness)
   - **01 章 / 03 章用**——harness 这个词最早是评测脚手架，不是产品壳。

2. **2024-10-30 · Anthropic SWE-bench Sonnet 博客**
   - URL：[Raising the bar on SWE-bench Verified with Claude 3.5 Sonnet · Anthropic](https://www.anthropic.com/news/swe-bench-sonnet)
   - **重要更正**：此篇中 Anthropic 用的是 **scaffold / scaffolding** 这个词，**不是 harness**。原话：「the agent scaffold optimized for updated Claude 3.5 Sonnet was to give as much control as possible to the language model itself, and keep the scaffolding minimal」。
   - **notes.md 提到「Anthropic 第一次公开用 harness 描述 agent 执行壳」需要修正——这篇用的是 scaffold。真正的 harness 一词在 Anthropic 官方语境的明确出现见下面第 3 / 4 条。**

3. **2025-11-26 · Anthropic 官方博客「Effective harnesses for long-running agents」**
   - URL：[Effective harnesses for long-running agents · Anthropic Engineering](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
   - 作者：Justin Young + 12 位 contributors（David Hershey、Prithvi Rajasakeran、Jeremy Hadfield、Naia Bouscal、Michael Tingley、Jesse Mu、Jake Eaton、Marius Buleandara、Maggie Vo、Pedram Navid、Nadine Yasser、Alex Notov）。
   - 提到 Claude Agent SDK 是「a powerful, general-purpose agent harness adept at coding...」
   - **这是 Anthropic 第一次在标题里使用 harness 描述 agent 执行壳。01 章 / 03 章核心引证。**

4. **2026-03-24 · Anthropic 第二篇「Harness design for long-running application development」**
   - URL：[Harness design for long-running application development · Anthropic Engineering](https://www.anthropic.com/engineering/harness-design-long-running-apps)
   - 作者：Prithvi Rajasekaran（Anthropic Labs），致谢 Mike Krieger 等。
   - 关键引文：「every component in a harness encodes an assumption about what the model can't do on its own」「find the simplest solution possible, and only increase complexity when needed」。
   - **03 / 06 章金句素材。**

5. **2026-02 · Karpathy agentic engineering 推文**
   - URL：[Karpathy 2026-02-04 · X · status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220)
   - **WebFetch 取不到 X 内容（402），但 003 期已用过这条 ID，notes.md 已确认存在。**
   - **重要更正**：根据多个二手来源（[The New Stack · Vibe coding is passé](https://thenewstack.io/vibe-coding-is-passe/)、[AI Systems Lab · Why Vibe Coding Ends in 2026](https://medium.com/ai-systems-lab/why-vibe-coding-ends-in-2026-karpathy-explains-f9c490f5f019)、[Frank's World · Andrej Karpathy on the Evolution from Vibe Coding to Agentic Engineering](https://www.franksworld.com/2026/05/01/andrej-karpathy-on-the-evolution-from-vibe-coding-to-agentic-engineering/)），**Karpathy 这条推文里用的词是 agentic engineering，不是 harness**。harness 一词不是 Karpathy 提出的。
   - **02 章 / 06 章用作 vibe coding → agentic engineering 演化引用。**

### 词源演进的真正脉络（基于查证后的修正）

- 2020-08：lm-evaluation-harness（EleutherAI）—— 评测脚手架义。
- 2024-10：Anthropic SWE-bench Sonnet 博客 —— 用 scaffold 而非 harness。
- 2025-11：Anthropic「Effective harnesses for long-running agents」—— 第一次在官方语境用 harness 描述 agent 执行壳。
- 2026-02：Karpathy agentic engineering 推文 —— 推动整个产业接受这一范式（但他本人未发明 harness 一词）。
- 2026-03：Anthropic 第二篇 harness design 文章 + Martin Fowler 的 harness engineering 长文 + OpenAI 的 harness engineering 博客 —— 这一波集中发文让 harness 真正成为产业默认词。
- 2026-04：Addy Osmani / 36Kr / 知乎 / HumanLayer / Anthropic Labs / Cursor 等密集发文，词义稳定。

### 其他词源支持源

- [Harness engineering: leveraging Codex in an agent-first world · OpenAI](https://openai.com/index/harness-engineering/) —— 03 章。OpenAI Codex 团队 2026-02-11 的 harness engineering 定义文（WebFetch 403，但通过其他源确认存在与日期）。
- [Harness engineering for coding agent users · Martin Fowler · Birgitta Böckeler（2026-04-02，更早 memo 2026-02-17）](https://martinfowler.com/articles/harness-engineering.html) —— 03 章核心。给出「Agent = Model + Harness」公式 + Guides（feedforward）和 Sensors（feedback）两层模型 + 缰绳与马鞍隐喻（与 Joy 02 章房间助理隐喻可对照）。
- [Agent Harness Engineering · Addy Osmani（2026-04-19）](https://addyosmani.com/blog/agent-harness-engineering/) —— 03 章。「agent harness = every piece of code, configuration, and execution logic that isn't the model itself」+「a decent model with a great harness beats a great model with a bad harness」。
- [Skill Issue: Harness Engineering for Coding Agents · HumanLayer · Kyle (0xblacklight)（2026-03-12）](https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents) —— 03 章 / 05 章核心 benchmark 数据。
- [The GAN-Style Agent Loop: Deconstructing Anthropic's Harness Architecture · Epsilla](https://www.epsilla.com/blogs/anthropic-harness-engineering-multi-agent-gan-architecture) —— 03 章。把 Anthropic harness design 拆成 GAN 风格 generator + evaluator。
- [Anthropic on X · 2026-03-24 推文宣传 harness design 博客](https://x.com/AnthropicAI/status/2036481033621623056) —— 03 章。官方推文转发自家 multi-agent harness 文章。
- [Building Claude Code with Boris Cherny · Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) —— 03 / 05 章。Boris Cherny（Head of Claude Code）专访，明确提到模型能力 + scaffolding/harnessing 「saddle for a horse」隐喻。

---

## D · framework 退潮 + Anthropic Building Effective Agents

### 一手源

- [Building Effective AI Agents · Anthropic（2024-12-19 · Erik Schluntz & Barry Zhang）](https://www.anthropic.com/research/building-effective-agents) —— **04 章核心引证**。
  - 关键原文（已 verify）：「We suggest that developers start by using LLM APIs directly: many patterns can be implemented in a few lines of code.」
  - 「Frameworks can help you get started quickly, but don't hesitate to reduce abstraction layers and build with basic components as you move to production.」
  - 「frameworks often create extra layers of abstraction that can obscure the underlying prompts and responses, making them harder to debug」「can also make it tempting to add complexity when a simpler setup would suffice.」
  - **比 notes.md 里 paraphrase 的「大多数情况下你不需要 framework」更准确——原文没说"大多数情况下不需要"，原文说的是"建议直接用 API"。**

### LangChain 退潮证据

- [The LangChain Exit: Why Production Teams Are Quietly Rewriting to Raw SDKs in 2026 · Ravoid](https://ravoid.com/blog/langchain-exit-raw-sdk-migration-2026) —— 04 章。LangChain v0.1/v0.2/v0.3 持续 breaking change → 团队 migration 成本接近重写 → 干脆切到 raw SDK。**二手转述（待 Joy verify）**——文章本身有较强的论点，但其声明 LangChain 135k star 和 LangGraph 24k 的精确数字需 Joy 在 GitHub 当场核实。
- [State of Agent Engineering · LangChain 自己的报告](https://www.langchain.com/state-of-agent-engineering) —— 04 章。LangChain 自己的 framework 现状。
- [The AI Agent Framework Landscape in 2025: What Changed and What Matters · Medium · Trung Hieu Tran](https://medium.com/@hieutrantrung.it/the-ai-agent-framework-landscape-in-2025-what-changed-and-what-matters-3cd9b07ef2c3) —— 04 章。描述 framework → vendor SDK 迁移趋势。

### 主流 harness 不用 LangChain 的证据

- Cursor：[Continually improving our agent harness](https://cursor.com/blog/continually-improving-agent-harness) 全文不出现 LangChain，自家 harness。
- Claude Code：[Building Claude Code with Boris Cherny · Pragmatic Engineer](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) Boris 自述 50 万行 TypeScript 自研，不用 LangChain；Anthropic 自家 [Building Effective Agents 博客](https://www.anthropic.com/research/building-effective-agents) 直接劝你不用 framework。
- LangChain 自己开源 Deep Agents 仿 Claude Code：[Deep Agents · LangChain Just Open-Sourced a Replica of Claude Code · Medium](https://medium.com/@richardhightower/deep-agents-langchain-just-open-sourced-a-replica-of-claude-code-69e72ced54b8) —— 这反过来证明 Claude Code 不是基于 LangChain 的（否则不需要"复刻"）。
- Aider：[paul-gauthier/aider · GitHub](https://github.com/paul-gauthier/aider) 仓库无 langchain 依赖，纯自研。
- Devin：Cognition 自家闭源，2024-03 SWE-bench technical report 描述了自家 agent 架构无 LangChain 引用。
- Codex CLI：[GitHub · openai/codex](https://github.com/openai/codex) 是 OpenAI 自家轻量 CLI agent，无 LangChain 依赖。

### LangChain 自家立场（反向论证）

- [Your harness, your memory · LangChain Blog](https://www.langchain.com/blog/your-harness-your-memory) —— 06 章用。LangChain 也开始用 harness 这个词，承认 harness 这一层是核心；他们的论点是 memory 不该被绑死在模型厂商，应保持 open harness。
- [Models Are Almost Obsolete. Harnesses Are What Matter Now! · Medium · Nayeem Islam](https://medium.com/@nomannayeem/models-are-almost-obsolete-harnesses-are-what-matter-now-a5230a7995c6) —— 02 / 05 章口吻参考。

---

## E · 反方证据（harness 会被吞）

### 反方一手源

- [Karpathy 2023-11 LLM OS 推文 · X · status/1723140519554105733](https://x.com/karpathy/status/1723140519554105733) —— 06 章核心。Karpathy 2023-11 提出 LLM OS 概念：LLM 是新 OS 的 kernel process，编排输入输出、code interpreter、browser 等。**WebFetch 取不到 X 但 URL 经多个二手源（[Andrej Karpathy's Keynote at Microsoft Build 2023 · Tony Tong · Medium](https://medium.com/@tonytong.ai/andrej-karpathys-keynote-at-microsoft-build-2023-8b45a2bbf22e)）确认存在；引用时建议带「据多方报道」声明，或直接用 Microsoft Build 2023 的演讲作为更稳的源。**
- [Karpathy 2023-09 LLM OS 跟进推文 · X · status/1707437820045062561](https://x.com/karpathy/status/1707437820045062561) —— 06 章。「With many pieces dropping recently, a more complete picture is emerging of LLMs not as a chatbot, but the kernel process of a new Operating System.」（二手转述，需 Joy verify。）
- Karpathy 2023-05 Microsoft Build 主题演讲「State of GPT」：[Andrej Karpathy – State of GPT (At MSBuild 2023) · Hacker News 讨论](https://news.ycombinator.com/item?id=36057236) + [State of GPT - May 2023 · Typefully · Alex Volkov 总结](https://typefully.com/altryne/state-of-gpt-may-2023-andrej-karpahys-kUdTbcn) —— 06 章。**这个比单条推文更稳。**

### 长 context / native tools 进展

- [Stop Chasing Million-Token Context Windows · Medium · Reliable Data Engineering](https://medium.com/@reliabledataengineering/stop-chasing-million-token-context-windows-youre-solving-the-wrong-problem-696b8ba881d7) —— 06 章。提到 Claude Opus 4.6 / Sonnet 4.6 在 2026-03-13 长 context 1M GA。
- [Gemini 2M context window - Complete Guide · AIonX](https://aionx.co/gemini-advanced-reviews/gemini-2m-context-window/) —— 06 章。Gemini 2.5 已 2M token context。
- [AI Context Window Sizes 2026 · Claude 5 Hub](https://claude5.com/news/context-window-evolution-how-200k-to-1m-tokens-redefine-ai-c) —— 06 章。三家对比：Claude 1M / Gemini 1-2M / GPT-5.4 400K。

### 反反方（harness 不会消失）

- [Effective context engineering for AI agents · Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) —— 06 章。Anthropic 自家立场：context 管理 = engineering 问题，不能只靠模型解决。
- [Your harness, your memory · LangChain Blog](https://www.langchain.com/blog/your-harness-your-memory) —— 06 章。LangChain 的论点：「even as model improvements absorb some scaffolding, this gets replaced by other types of scaffolding」「a system around the LLM is always needed to facilitate tool interaction」。
- [The Agent Harness Is the Architecture · Medium · Evangelos Pappas](https://medium.com/@epappas/the-agent-harness-is-the-architecture-and-your-model-is-not-the-bottleneck-5ae5fd067bb2) —— 06 章。「70% of agent performance lives outside the model」论点（这是二手论断，**实际 Terminal Bench / CORE-Bench 数据更扎实**）。

### Aider 极简派（Paul Gauthier 立场）

- [paul-gauthier · Aider GitHub](https://github.com/paul-gauthier/aider) —— 06 章。Aider 仓库本身就是极简派的代码证据。
- [A quote from Paul Gauthier · Simon Willison（2025-01-26）](https://simonwillison.net/2025/Jan/26/paul-gauthier/) —— 06 章。Paul 的核心立场：「Very large context windows aren't useful in practice. Every model seems to get confused when you feed them more than ~25-30k tokens.」**这个 quote 不是直接谈 minimal harness，但反映了 Aider 派的极简哲学。notes.md 提到 Paul 关于 minimal harness 的公开表述 —— 没找到一手「我支持 minimal harness」的直接 quote，建议改用 Aider 的代码 + 这条 context window 的 quote 作为间接证据。**
- [Aider — CLI for AI Coding (2023) · LLMReference](https://www.llmreference.com/harness/aider) —— 07 章。第三方对 Aider 极简哲学的描述。
- [Aider Uses 4.2x Fewer Tokens Than Claude Code · Morph](https://www.morphllm.com/comparisons/morph-vs-aider-diff) —— 07 章。Aider 极简哲学带来的具体后果：token 用量 4.2 倍少。

### NOT FOUND 项

- **Marmelab / HN / Scott Logic 类似 003 反方文风的 harness 反方文章 NOT FOUND**——搜了一轮没找到专门反对 harness 的中长篇博客。06 章建议改用 Karpathy LLM OS + LangChain "your harness, your memory" 中关于 memory 被吞的担忧 + Paul Gauthier minimal 派代码哲学三条立柱，不再寻找单篇反方文章。

---

## F · 中文圈翻译现状

### 中文圈关键文章

- [一文读懂 Harness Engineering：从 14 篇工程文章中，寻找那个让 AI 不再离经叛道的壳 · 36Kr（2026-04-02）](https://eu.36kr.com/zh/p/3749464991187458) —— **F 组主力源**。把 harness 翻译成「壳」，副标题「让 AI 不再离经叛道的壳」；同时用「约束工程」作为补充。**这个翻译策略值得在 01 章一句带过**。
- [Harness：模型非瓶颈，AI 问题初现 · 36Kr（2026-03-27）](https://eu.36kr.com/zh/p/3736640995721472) —— F 组核心。**关键发现：这篇全文用 Harness 原词，不翻译。** 引文：「模型决定能力的上限，而系统，开始决定结果是否可复现」「AI 的问题，不再是能力，而是收敛」「约束，必须进入结构层」。**与 Joy 文章主线高度同频，可作为间接背书。**
- [Harness Engineering 深度解析：AI Agent 时代的工程范式革命 · 知乎](https://zhuanlan.zhihu.com/p/2014014859164026634) —— F 组。**WebFetch 403**——通过列表元数据可知存在，是中文圈 harness engineering 系统讨论之一。
- [Harness Engineering 深度解读：AI Agent 时代的「缰绳与马鞍」 · 知乎](https://zhuanlan.zhihu.com/p/2016495809307374819) —— F 组。「缰绳与马鞍」翻译延续 Martin Fowler 的隐喻；**这种翻译路线和 36Kr 的「壳」是中文圈两个主流路线**。
- [Harness Engineering（驾驭工程）· 菜鸟教程](https://www.runoob.com/ai-agent/harness-engineering.html) —— F 组。把 Harness 翻成「驾驭」（动词义），「Human Steer, Agent Execute」，**第三种翻译路线**。
- [54k+ Star 爆火！AI 新王者框架 Harness Agent 来了 · 博客园（尼恩）](https://www.cnblogs.com/crazymakercircle/p/19856262) —— F 组。中文社区另一种讨论路线。
- [前言 · 智能体 Harness 工程指南 · GitBook](https://yeasy.gitbook.io/harness_engineering_guide) —— F 组。中文圈系统化 GitBook 教程。
- [Harness Engineering：AI Agent 落地企业的工程化核心 · 知乎](https://zhuanlan.zhihu.com/p/2025639164599608541) —— F 组。
- [2026 年 AI 编程 Agent 的真正分水岭——Harness 详解 · 腾讯云开发者社区](https://cloud.tencent.com/developer/article/2653784) —— F 组。腾讯云转载主流 harness 解读。
- [Agent Harness 到底是什么 · 知乎](https://zhuanlan.zhihu.com/p/2011508456717304293) —— F 组。
- [Agent Harness：2026 年 AI 工程的核心范式 · 知乎](https://zhuanlan.zhihu.com/p/2022027288405976801) —— F 组。
- [《御舆：解码 Agent Harness》· lintsinghua/claude-code-book · GitHub](https://github.com/lintsinghua/claude-code-book) —— F 组。**中文圈一本 42 万字专门讲 Agent Harness 的开源书，把 harness 翻成「御舆」（驾驭车马）**——是目前中文圈最系统的论述之一。
- [Claude Code 源码逆向工程与系统性分析！Harness Engineering · qingkeai](https://qingkeai.online/archives/Claude%20Code) —— F 组。中文圈逆向 Claude Code 的尝试。
- [最新风口 Harness，李开复、陆奇已重金入场 · 36Kr](https://36kr.com/p/3768661067252483) —— F 组。中文媒体把 harness 当风口炒作的代表（**反向素材：说明这词在中文圈已破圈**）。

### 中文翻译现状小结（可直接进 01 章）

- 36Kr 有时翻「壳」、有时不翻保留 Harness。
- 知乎走「缰绳与马鞍」「御舆」「驾驭工程」三种路线。
- 菜鸟教程：「驾驭工程」。
- 博客园 / 腾讯云：保留 Harness 原词为主。
- **中文圈尚未收敛到统一译名 → Joy 在文里用 harness 原词是合理选择**。

### NOT FOUND 项

- 中文圈技术博主对 harness 一词专门写过澄清/批评文章 —— 没找到独立的"为什么 harness 这个词不准确 / 应该改翻法"的反思文。06 章不需要这部分。

---

## G · 主流 harness 产品图谱

### 编程类 harness

| 产品 | 官网 / 主源 | 设计哲学 | 近 6 个月大事件 |
|---|---|---|---|
| Claude Code | [code.claude.com](https://code.claude.com/) · [Anthropic 产品页](https://www.anthropic.com/product/claude-code) | autonomous overnight runs / multi-agent / CLAUDE.md context persistence | 2026-04-09 同 Cowork GA 一起更新；50 万行 TypeScript（[Boris Cherny 访谈](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny)） |
| Cursor | [cursor.com](https://cursor.com/) · [agent harness blog](https://cursor.com/blog/continually-improving-agent-harness) | IDE-integrated / dynamic context / model-agnostic | 2026-04-30 自家 harness 演化博客；2 or 3 9s tool reliability |
| Cognition Devin | [devin.ai](https://devin.ai/) · [pricing](https://devin.ai/pricing/) | autonomous + VM / 端到端 PR | Devin 2.0 砍价 96%（500 → 20 美元/月）2025-04；ARR 73x 增长（[AgentMarketCap 2026-04-11](https://agentmarketcap.ai/blog/2026/04/11/cognition-devin-73x-arr-growth-coding-agent-revenue)） |
| Aider | [aider GitHub](https://github.com/paul-gauthier/aider) | minimalist / git-first / per-change commit | 4.2x fewer tokens 数据（Morph） |
| Codex CLI | [openai.com/codex](https://openai.com/codex/) · [GitHub openai/codex](https://github.com/openai/codex) | lightweight terminal agent | 2026 加 persisted /goal workflows、plugin marketplace、in-app browser、automatic reviewer agent（[OpenAI Codex changelog](https://developers.openai.com/codex/changelog)） |
| Cline | [Best Cline Alternatives 2026 · Morph](https://www.morphllm.com/comparisons/cline-alternatives) | VS Code 扩展 / approve-everything 哲学 | 持续是开源 BYOM 主流方案 |
| Block Goose | [GitHub aaif-goose/goose](https://github.com/aaif-goose/goose) | open-source / desktop + CLI / native MCP | Apache 2.0；Block（前 Square） |
| Replit Agent | [Replit Agent · 第三方综述](https://mightybot.ai/blog/coding-ai-agents-for-accelerating-engineering-workflows/) | 云 IDE 内嵌 / 整项目生成 | 2026 持续迭代 |
| Continue | [augmentcode 比对页](https://www.augmentcode.com/tools/sourcegraph-cody-vs-continue-enterprise-comparison) | 开源 BYOM | 持续企业版 |
| Sourcegraph Cody / Amp | [sourcegraph.com/docs/cody](https://sourcegraph.com/docs/cody) | enterprise hybrid（local 编辑器 + 远程 search） | **2025-07-23 停 Cody Free/Pro，推 Amp 作为独立 agentic 产品**（[augmentcode 比对页](https://www.augmentcode.com/tools/sourcegraph-cody-vs-continue-enterprise-comparison)） |
| Factory | （搜索没拿到独立强源） | autonomous engineering platform | **官方独立强源 NOT FOUND**——只有第三方 mention。Joy 提到则建议补一个 factory.ai 官网链接核实。 |

### 国产 harness

| 产品 | 主源 | 设计哲学 | 近 6 个月大事件 |
|---|---|---|---|
| Trae（字节） | [trae.ai](https://www.trae.ai/) | ByteDance Doubao 后端 + 编程 IDE | 国内版 2025-03 上线，5 月 MAU 破百万；国际版 $3 首月 / $10 月（[36Kr · ByteDance Tencent collective investments](https://eu.36kr.com/en/p/3512870506158984)） |
| CodeBuddy（腾讯） | [codebuddy.ai](https://codebuddy.ai/) | Hunyuan 后端 + 内部码农工具开放 | 90% 腾讯码农在用，整体编码时长降 40%；国内版免费、Pro 需积分（[36Kr 同上](https://eu.36kr.com/en/p/3512870506158984)） |
| Coze（字节） | （平台型，非编程类） | low-code AI agent 平台 | 仍是字节通用 agent 平台，主战场不是 coding |
| Manus | [SCMP 报道](https://www.scmp.com/tech/big-tech/article/3319841/tech-giants-tencent-bytedance-vie-ai-agent-supremacy-after-manus-relocates) | 端到端通用 agent / 一句话执行 | 2025 因地缘原因迁海外；国内空缺被腾讯字节抢占 |
| Dify | [Dify 与 Coze 对比 · 博客园](https://www.cnblogs.com/tangshiye/p/19031576) | 开源 LLM 应用平台 / 企业内部工作流 | 持续企业版 |
| Qoder（阿里） | （003 期已用） | Spec-driven coding 平台 | 003 期出处 |

### 综合榜与对比

- [The 2026 Guide to Coding CLI Tools: 15 AI Agents Compared · Tembo](https://www.tembo.io/blog/coding-cli-tools-comparison) —— 07 章。15 个 CLI agent 对比。
- [Best AI Coding Agents in 2026, Ranked · MightyBot](https://mightybot.ai/blog/coding-ai-agents-for-accelerating-engineering-workflows/) —— 07 章。第三方综合榜。
- [8 Best AI Coding Agents in 2026 · Fungies](https://fungies.io/best-ai-coding-agents-2026-comparison-benchmarks/) —— 07 章。
- [awesome-cli-coding-agents · GitHub](https://github.com/bradAGI/awesome-cli-coding-agents) —— 07 章。awesome list 形式收录所有 CLI 类 agent + 它们的 harness。
- [awesome-harness-engineering · GitHub](https://github.com/ai-boost/awesome-harness-engineering) —— 03 / 07 章。harness engineering 主题资源汇总。
- [Best AI Coding Assistants as of March 2026 · Shakudo](https://www.shakudo.io/blog/best-ai-coding-assistants) —— 07 章。

---

## H · 工种位移

### prompt engineer 退潮

- [The Prompt Engineer Job Is Dead — What Replaced It in 2026 · SolidAITech](https://www.solidaitech.com/2026/04/prompt-engineer-job-dead-ai-careers.html) —— 07 章。明确说 prompt engineer 头衔在 2025 年峰值后下行，被 AI engineer / agent engineer 替代。
- [The Decline of Prompt Engineering and the Rise of Process Automation Skills · LinkedIn](https://www.linkedin.com/pulse/decline-prompt-engineering-rise-process-automation-skills-mark-murphy-bzdvc) —— 07 章。LinkedIn 长文论述退潮。
- [Prompt Engineering Jobs Are Obsolete in 2025 · Salesforce Ben](https://www.salesforceben.com/prompt-engineering-jobs-are-obsolete-in-2025-heres-why/) —— 07 章。
- [实访用人单位：Prompt 工程师真是低门槛"香饽饽"？· InfoQ · 王一鹏](https://www.infoq.cn/article/7fgaffffykbmxw11u0bt) —— 07 章中文佐证。
- [提示词工程师为何遇冷？· 学职平台 · 学信网（2025-05-14）](https://xz.chsi.com.cn/xz/zyts/202505/20250514/2293380910.html) —— 07 章。**国内官方平台明确确认 prompt engineer 遇冷。**

### agent engineer / AI engineer 上行

- [LinkedIn Jobs on the Rise 2026 · 美国](https://www.linkedin.com/pulse/linkedin-jobs-rise-2026-25-fastest-growing-roles-us-linkedin-news-dlb1c) —— 07 章。AI Engineer 是 2026 美国最快增长岗位。
- [AI engineer role tops LinkedIn's 2026 'Jobs on the Rise' list · HR Leader](https://www.hrleader.com.au/business/27698-ai-engineer-tops-linkedin-s-2026-jobs-on-the-rise-list) —— 07 章。LinkedIn 2026 年榜首是 AI engineer。
- [AI has already added 1.3 million jobs · World Economic Forum（2026-01）](https://www.weforum.org/stories/2026/01/ai-has-already-added-1-3-million-new-jobs-according-to-linkedin-data/) —— 07 章。LinkedIn 数据：2023-2025 全球新增 130 万 AI 相关岗位，含 7.5 万 AI engineer。
- [The World's Fastest-Growing Jobs in 2025 · LinkedIn Talent](https://www.linkedin.com/business/talent/blog/talent-acquisition/worlds-fastest-growing-jobs-2025) —— 07 章。
- [2026 AI Agent 职业路线图 · 知乎](https://zhuanlan.zhihu.com/p/1997380871779542933) —— 07 章。中文圈 agent 工程师转型路线图。
- [2026 Agentic AI 工程师学习路线图 · gitcode csdn](https://gitcode.csdn.net/69e04d3154b52172bc6a3f07.html) —— 07 章。

### harness engineer 萌芽

- [Agent Harness Engineering · Addy Osmani](https://addyosmani.com/blog/agent-harness-engineering/) —— 07 章。提到 harness engineer 作为新兴 discipline。
- [What Is Harness Engineering? Complete Guide · NxCode](https://www.nxcode.io/resources/news/what-is-harness-engineering-complete-guide-2026) —— 07 章。
- [Harness engineering for coding agent users · Martin Fowler](https://martinfowler.com/articles/harness-engineering.html) —— 07 章。

### 国内市场数据

- 中文圈 prompt engineer 招聘量在 BOSS 直聘 / 智联 2025 vs 2023 下降约 70%——**二手转述（待 Joy verify）**——多个 csdn / 知乎文章重复这个数字，但没找到 BOSS 直聘官方 API 数据源。引用时建议带「据中文圈技术媒体汇总数据」声明。
- 中国十大招聘网站 2026 排名：[新浪科技（2026-03-07）](https://finance.sina.com.cn/tech/roll/2026-03-07/doc-inhqcpvq1931265.shtml)。

### NOT FOUND 项

- **美国 BLS 数据 NOT FOUND**——和 003 期一样，BLS 没有 prompt/agent engineer 这种细分岗位的官方统计；只有 software developer / programmer 大类。如果 07 章要用 BLS 数据，建议用 003 期那条 BLS programmer -27.5% / developer -0.3% 间接说明背景，但**不要直接说「BLS 显示 prompt engineer 招聘量下降」——这个数据不存在**。
- **harness engineer 招聘绝对量数据 NOT FOUND**——这个 title 还太新，主流招聘网站（LinkedIn 搜「harness engineer」会先返回 Harness.io 公司岗位，污染搜索；BOSS 直聘 / 拉勾没有这个 title 标签）。07 章建议改成「这个工种正在萌芽」的定性描述，不强行给数字。

---

## 关键 NOT FOUND 与诚实度声明

| 项 | 状态 | 影响 | 建议 |
|---|---|---|---|
| Cognition Devin "同模型 + 自家 harness vs 直接调 API 高出 X 个百分点" | NOT FOUND | 01 章 hook 数据 | 改用 HumanLayer Terminal Bench #33 → #5 数据，更扎实 |
| Anthropic SWE-bench 博客最早用 harness 一词 | 修正 | 词源章节 | 那篇用 scaffold；harness 在标题首现是 2025-11 Effective Harnesses 那篇 |
| Karpathy 推文用 harness 一词 | 修正 | 词源章节 | Karpathy 用的是 agentic engineering，不是 harness。harness 一词不是他造的 |
| BLS prompt engineer / agent engineer 数据 | NOT FOUND | 07 章 | BLS 无此细分；同 003 期处理：用 software developer / programmer 大类做背景 |
| harness engineer 国内招聘绝对量 | NOT FOUND | 07 章 | 改定性描述 |
| Marmelab/HN/Scott Logic 类似 003 风格的 harness 反方文章 | NOT FOUND | 06 章 | 改用 Karpathy LLM OS + LangChain memory + Aider 极简三立柱 |
| Paul Gauthier 「我支持 minimal harness」直接 quote | NOT FOUND | 06 章 | 用 Aider 代码 + context window quote 间接证明 |
| Factory 官方独立强源 | 弱 | 07 章产品图谱 | Joy 提到则建议补 factory.ai 链接，否则建议从图谱删除 |
| Anthropic Cowork / Design 是否真实公开产品 | **CONFIRMED** | 全文 | 两者都是真实官方产品，一手源齐全 |
