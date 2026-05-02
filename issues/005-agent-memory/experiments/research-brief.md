# 005 · AI 记忆系统 · research-brief

调研窗口：2026-05-02。draft.md 里所有事实从这里出。

每条素材按"一句话定位 + URL + 状态"组织。状态码：
- ✅ 一手 / 已 verify
- ⚠️ 二手 / 写时复核
- ❌ 不靠或失效（不要用）
- 🔑 Joy 一手数据（draft 时 Joy 自己填）

---

## A · 学术源头

### A1 · MemGPT 论文（这一切的起点）

**[MemGPT: Towards LLMs as Operating Systems · arxiv 2310.08560](https://arxiv.org/abs/2310.08560)** — ✅
- 作者：Charles Packer / Sarah Wooders / Kevin Lin / Vivian Fang / Shishir G. Patil / Ion Stoica / Joseph E. Gonzalez
- 机构：UC Berkeley Sky Lab（Stoica + Gonzalez 是导师组）
- 提交：2023-10-12（v1）、2024-02-12（v2）
- **核心思想直接抄到 abstract**：「we propose virtual context management, a technique drawing inspiration from hierarchical memory systems in traditional operating systems that provide the appearance of large memory resources through data movement between fast and slow memory」
- 评测域：document analysis + multi-session chat
- **三层记忆名称**（abstract 没直接列出、但论文正文 + 业内复述一致）：core memory（in-context、像 RAM）/ recall memory（对话历史可搜索、像 cache）/ archival memory（长期冷存储、像 disk）
- 副标题"Towards LLMs as Operating Systems"——这是后来"agent OS"派的源头

### A2 · CoALA 框架（episodic / semantic / procedural 这三分法的学术起点）

**[Atlan · Types of AI Agent Memory](https://atlan.com/know/types-of-ai-agent-memory/)** — ⚠️ 二手转述
- AI agent 标准记忆四分法源自 CoALA framework（Princeton, [arXiv 2309.02427](https://arxiv.org/abs/2309.02427)）
- 四类：in-context（working memory，活跃 context）/ episodic（过去交互的情景）/ semantic（事实性世界知识）/ procedural（技能、工具用法、稳定 workflow）
- procedural memory 在 LLM agent 里典型实现是模型权重 + system prompt + 工具注册表
- **本期写作建议**：通俗版讲 episodic / semantic / procedural 时，分别译成"情景记忆 / 事实记忆 / 技能记忆"，第一次出现先用大白话解释（"上次那次对话是怎么聊的"= episodic、"用户叫什么"= semantic、"怎么处理这种情况"= procedural）

### A3 · LangMem（CoALA 的工业实现）

**[LangChain LangMem Concepts](https://langchain-ai.github.io/langmem/concepts/conceptual_guide/)** — ✅ 一手
- LangMem 直接采用 CoALA 三分法（episodic / semantic / procedural）
- ConversationSummaryMemory：把对话历史压成 semantic summary
- LangMem hot-path vs background memory extraction：实时提取 vs 后台异步提取

### A4 · LongMemEval 基准

**[LongMemEval · arxiv 2410.10813](https://arxiv.org/pdf/2410.10813)** — ✅ 一手论文
- 500 题人工编写
- 6 类能力测试：信息抽取（information extraction）/ 多会话推理（multi-session reasoning）/ 时序推理（temporal reasoning）/ 知识更新（knowledge updates）/ 弃权（abstention）/ 单会话偏好
- 平均 ~115K tokens / ~50 sessions per case

### A5 · LoCoMo 基准

**[LoCoMo · Snap Research](https://snap-research.github.io/locomo/)** — ✅ 一手
- 论文：[arxiv 2402.17753](https://arxiv.org/abs/2402.17753)
- 数据集：超长对话、平均 300 turns + 9k tokens、最多 35 sessions
- 评测：QA + 事件总结 + 多模态对话生成

### A6 · MIRIX 多 agent 记忆系统

**[MIRIX paper · arxiv 2507.07957](https://arxiv.org/pdf/2507.07957)** — ⚠️ 备用
- 多 agent 记忆系统、可参考其架构图但本期不深入

### A7 · Charles Packer / Sarah Wooders 起源故事

**[Felicis · Academia to Agentic AI](https://www.felicis.com/blog/academia-to-agentic-ai-ion-stoica-charles-packer-sarah-wooders-letta-databricks)** — ⚠️ Felicis 是 Letta 投资人、PR 调
- 关键信息：Packer + Wooders 在 UC Berkeley Sky Lab 同导师（Joseph Gonzalez + Ion Stoica）做 PhD 时合作 MemGPT
- MemGPT 是"first paper to introduce self-managed memory for agents"
- **Letta 演化**：他们意识到 memory management 应该在 framework 里、不是丢给个体实现 → Letta 是这个洞察的产品化

**[Charles Packer 个人页](https://charlespacker.com/)** — ✅ 一手
**[Charles Packer Google Scholar](https://scholar.google.com/citations?user=gCbeGRIAAAAJ&hl=en)** — ✅ 一手

---

## B · 框架工具（GitHub 上能搜到的主流）

### B1 · Mem0（用得最多的）

**[Mem0 GitHub](https://github.com/mem0ai/mem0)** — ✅ 一手
- **GitHub stars 调研时 54.6k**（写时复核）
- 最新版本：v1.0.11 OpenClaw Plugin（2026-04-29）
- Y Combinator S24
- **架构（2026-04 算法升级后）**：hybrid retrieval — semantic + BM25 keyword + entity matching 三种信号并行打分、融合
- 多层记忆：User / Session / Agent state
- 实测分数：
  - LongMemEval 93.4（+25.6 提升）
  - LoCoMo 91.6（+20.2 提升）
  - BEAM 1M tokens 64.1
  - BEAM 10M tokens 48.6
  - 所有评测 single-pass retrieval 一次 LLM call

**[Mem0 paper · arxiv 2504.19413](https://arxiv.org/html/2504.19413v1)** — ✅ 一手论文 *Building Production-Ready AI Agents with Scalable Long-Term Memory*

**[Mem0 graph memory feature](https://docs.mem0.ai/platform/features/graph-memory)** — ⚠️ 写时复核
- Neo4j + Kuzu（2025-09 加入 Kuzu，embedded graph DB、无需独立服务进程）
- 关键变化：「graph relationships exposed via the old relations field on search results are no longer populated」—— 关系信息是通过 retrieval ranking 间接消费的、不再暴露为可查图结构
- 这意味着：Mem0 graph 模式不是"另一种存储"、而是"另一种打分信号"

**[State of AI Agent Memory 2026 · Mem0 Blog](https://mem0.ai/blog/state-of-ai-agent-memory-2026)** — ⚠️ Mem0 自己的盘点

**[Mem0 vs Letta · Vectorize](https://vectorize.io/articles/mem0-vs-letta)** — ⚠️ 二手对比
- 关键句：「Mem0 provides a clean, pluggable memory API that fits into any stack — ideal for teams that want persistent agent memory without changing their architecture. Letta provides a complete agent runtime with sophisticated, self-editing memory built in」
- Mem0 = API 嫁接派 / Letta = runtime 重型派

### B2 · Letta（前 MemGPT，runtime 派）

**[Letta GitHub](https://github.com/letta-ai/letta)** — ✅ 一手
- **GitHub stars 调研时 22.4k**（写时复核）
- 最新版本：v0.16.7（2026-03-31）
- repo 介绍："the platform for building stateful agents: AI with advanced memory that can learn and self-improve over time"

**[Letta-Code GitHub](https://github.com/letta-ai/letta-code)** — ✅ 一手
- "the memory-first coding agent"
- 直接对标 Claude Code 的产品

**[Letta 出 stealth · TechCrunch 2024-09-23](https://techcrunch.com/2024/09/23/letta-one-of-uc-berkeleys-most-anticipated-ai-startups-has-just-come-out-of-stealth/)** — ✅ 一手报道
- $10M seed
- Felicis 领投、Jeff Dean 个人投资

**[Introducing Context Repositories · Letta Blog 2026-02-12](https://www.letta.com/blog/context-repositories)** — ✅ 一手
- 引文：「Context Repositories... a rebuild of how memory works in Letta Code based on programmatic context management and git-based versioning」
- 引文：「prior approaches to memory limited agents to MemGPT-style memory tools or virtual filesystem operations」—— Letta 自己承认 MemGPT 的三层模型是 "prior approach"
- 文件结构：本地 filesystem + YAML frontmatter 描述 + 分层（system/ 总是加载、其他按需）
- 检索：标准工具链（bash + 标准 shell 命令），**没有强调 vector / semantic search**

**[Letta MemFS / Memory Doc · docs.letta.com/letta-code/memory](https://docs.letta.com/letta-code/memory/)** — ✅ 一手
- MemFS = "memory filesystem"
- 存储：git 版本控制、本地 clone 到 `~/.letta/agents/<your-agent-id>/memory`
- 检索现状：「currently only supports exact-match search (grep, glob) with no semantic/embedding-based search capability」
- **跟 Claude Code 殊途同归**：都从 vector store 走回 filesystem + 文本检索

**[Stateful Agents Workshop · Charles Packer · YouTube](https://www.youtube.com/watch?v=E0k9Ppq6yXY)** — ⚠️ 备用、可剪片段引用

### B3 · LangMem（已在 A3 引）

### B4 · 其他记忆框架（盘点用）

- **Zep** — knowledge graph 派、Graphiti（持续更新的时序图谱）；写文章时如果讲到"另一条路"可点
- **cognee** — knowledge graph + ontology 派
- **Memary** — 多 agent 记忆
- **Supermemory** — [supermemory.ai/research](https://supermemory.ai/research/) — LongMemEval_s 上 Multi Session 71.43%、Temporal 76.69%
- **Memanto** — [arxiv 2604.22085](https://arxiv.org/html/2604.22085) — LongMemEval 89.8 / LoCoMo 87.1
- **MemPalace** — Mem0 竞品、$0 vs $249/mo 卖点

**[Best AI Agent Memory Frameworks 2026 · Atlan](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/)** — ⚠️ 盘点
**[Top 10 AI Memory Products 2026 · Medium · Bobur](https://medium.com/@bumurzaqov2/top-10-ai-memory-products-2026-09d7900b5ab1)** — ⚠️ 盘点

### B5 · Joy 自己研究过的（draft 时本人填）

🔑 Joy 自己列：研究了哪些（Mem0、Letta、Zep、LangMem、cognee、Memary 等里实际跑过的子集）+ 各自上手感受 + 选型理由 + 抛弃理由

---

## C · 大厂自建记忆系统

### C1 · Anthropic Claude Code（Joy 一手核心）

**[Anthropic 官方 · How Claude remembers your project · code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory)** — ✅ 一手 · 这一篇是本期最重要的一手源
- **Claude Code 两套记忆机制**：
  1. **CLAUDE.md files** — 用户写的、给 Claude 的持久指令
  2. **Auto Memory** — Claude 自己写的、基于用户纠正和偏好积累的笔记
- CLAUDE.md 类型：
  - Managed policy（macOS：`/Library/Application Support/ClaudeCode/CLAUDE.md`、Linux：`/etc/claude-code/CLAUDE.md`、Windows：`C:\Program Files\ClaudeCode\CLAUDE.md`）
  - Project（`./CLAUDE.md` 或 `./.claude/CLAUDE.md`）
  - User（`~/.claude/CLAUDE.md`）
  - Local（`./CLAUDE.local.md`、加 `.gitignore`）
- Auto Memory 存储路径：`~/.claude/projects/<project>/memory/MEMORY.md` + 主题文件（debugging.md、api-conventions.md 等）
- **关键引文 1**：「The first 200 lines of `MEMORY.md`, or the first 25KB, whichever comes first, are loaded at the start of every conversation」
- **关键引文 2**：「Topic files like `debugging.md` or `patterns.md` are not loaded at startup. Claude reads them on demand using its standard file tools when it needs the information」
- **关键引文 3**：「Auto memory is machine-local. All worktrees and subdirectories within the same git repository share one auto memory directory. Files are not shared across machines or cloud environments」
- AGENTS.md：Claude Code 不读 AGENTS.md、读 CLAUDE.md；可以用 `@AGENTS.md` import
- CLAUDE.md 是 user message after system prompt、不是 system prompt（所以不是 hard enforcement）
- 大小目标：CLAUDE.md < 200 行（更长会降低遵循率）
- 版本要求：Auto Memory 需 Claude Code v2.1.59+
- **核心结论**：**Claude Code 记忆系统就是纯 markdown 文件 + 用 Claude 自己的标准 file tools 读取，没有 vector DB、没有 graph DB、没有 embedding**
- Joy 朋友圈里的"markdown + grep"判断 ✅ 一手 verify

🔑 Joy 写时补：你读 Claude Code 源码的具体经历——读到了什么文件、看到的具体加载逻辑、对你的判断的影响

### C2 · Anthropic Auto Dream（feature-flagged、未公告）

**[Claude Code Dreams · claudefa.st](https://claudefa.st/blog/guide/mechanics/auto-dream)** — ⚠️ 社区源
**[AntonioCortes · Auto Memory and Auto Dream 2026-03-30](https://antoniocortes.com/en/2026/03/30/auto-memory-and-auto-dream-how-claude-code-learns-and-consolidates-its-memory/)** — ⚠️ 社区博客
**[MindStudio · What Is Claude Code AutoDream](https://www.mindstudio.ai/blog/what-is-claude-code-autodream-memory-consolidation)** — ⚠️ 二手
**[grandamenium/dream-skill GitHub](https://github.com/grandamenium/dream-skill)** — ✅ 社区复刻实现
**[Claude Code Auto-Dream Explained · Claude Lab](https://claudelab.net/en/articles/claude-code/claude-code-auto-dream-memory-consolidation-guide)** — ⚠️
**[Geeky Gadgets · AutoDream](https://www.geeky-gadgets.com/claude-autodream-memory-files/)** — ⚠️

事实清单（多源印证、可写）：
- 名称：Auto Dream / AutoDream
- 状态：2026-03 在 Claude Code `/memory` 菜单可见、但 server-side feature flag 控制、未对一般用户开放
- 触发：idle 期间后台运行（也有"24 小时自动触发"的描述）
- **四阶段（多源一致）**：
  1. **Orient**：扫描并梳理已有 memory 文件
  2. **Analyze**：搜索 session 转录、抽取高价值 pattern
  3. **Consolidate**：合并新信息进现有主题文件 + 关键维护（相对日期 → 绝对日期、删除被新事实推翻的、移除过期、合并重叠条目）
  4. **Prune & Index**：保持 MEMORY.md 在 200 行以下（这是 startup 加载阈值）
- 类比：REM 睡眠的记忆巩固
- 实现：grep on JSONL logs（[Akita on Rails 文](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)）

⚠️ **Joy verify 注意事项**：Anthropic 官方 docs（C1 那篇）只提"auto memory"、没提"Auto Dream"——所以 Auto Dream 是社区命名 / 提前发现的功能。draft 里写时建议表述：「社区发现 Anthropic 在 Claude Code 里加了一个未正式公告的功能、用户和媒体起名为 Auto Dream / AutoDream、是 auto memory 的补充层」、不要直接说"Anthropic 推出 Auto Dream"。

### C3 · Anthropic Claude Memory（用户面、March 2026）

**[Free Claude users get memory + import from rivals · 9to5Mac 2026-03-02](https://9to5mac.com/2026/03/02/free-claude-users-can-now-use-memory-and-import-context-from-rivals/)** — ⚠️ 二手报道
- 时间锚点：2026-03 Anthropic 给所有 Claude 账户（free + Pro）开 memory
- **关键产品功能**：从 ChatGPT 等竞品 import 历史 context（业内首次跨家 memory 迁移）
- 反方向 import 不可行（默认）

**[Claude Memory 2026 Complete Guide · Lumichats](https://lumichats.com/blog/claude-memory-2026-complete-guide-how-to-use)** — ⚠️ 二手指南
- 关键引文：「Claude automatically scans your chat history and generates a synthesized summary of key facts about you, and that summary is updated roughly every 24 hours and surfaces in future standalone conversations」
- 用户可直接命令 Claude 立刻更新 memory（用专门的工具）

**[Is Claude's Memory Worth the Price? · xtrace.ai](https://xtrace.ai/blog/claude-memory-2026-limits-and-fixes)** — ⚠️ 二手

⚠️ **draft 时核**：Anthropic 官方有没有发过专门的 Claude memory（用户面）公告 / blog？需要 Joy 去 [anthropic.com/news](https://www.anthropic.com/news) 翻 2026-03 archive 一手核。

### C4 · Anthropic Managed Agents · filesystem memory（April 2026）

**[Anthropic 官方 · Scaling Managed Agents](https://www.anthropic.com/engineering/managed-agents)** — ✅ 一手（但本文的重点是 context engineering、不是 memory 公告）
- 关键引文：「the session provides this same benefit, serving as a context object that lives outside Claude's context window」
- session log：durably stored、可通过 `getEvents()` interface 取（positional slices of the event stream）

**[Anthropic adds memory to Claude Managed Agents · SD Times](https://sdtimes.com/anthropic/anthropic-adds-memory-to-claude-managed-agents/)** — ⚠️ 二手报道
**[ETIH EdTech · Anthropic adds persistent memory to Managed Agents in beta](https://www.edtechinnovationhub.com/news/anthropic-brings-persistent-memory-to-claude-managed-agents-in-public-beta)** — ⚠️
**[Techzine · Anthropic adds memory to Claude Managed Agents](https://www.techzine.eu/news/devops/140836/anthropic-adds-memory-to-claude-managed-agents/)** — ⚠️

事实清单（多源印证）：
- 时间：2026-04-23 public beta
- 关键设计：memory mounts directly onto a filesystem
- agent 用 bash + code execution capabilities 操作 memory
- agent 间可共享学到的东西
- developer 可通过 API 或 Claude Console 直接 export / edit / manage memories

⚠️ **draft 时核**：找 Anthropic 官方 2026-04-23 一手公告链接（[anthropic.com/news](https://www.anthropic.com/news) 翻档）、目前我手上的 [managed-agents engineering 博客](https://www.anthropic.com/engineering/managed-agents) 不直接讲 filesystem memory 公告。

### C5 · Anthropic 上下文工程 / harness 上下文层

**[Anthropic · Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)** — ✅ 一手
- 引文：「context engineering is an emerging discipline... less about finding the right words for prompts, and more about answering 'what configuration of context is most likely to generate our model's desired behavior?'」
- compaction：把 context 压缩成 high-fidelity summary
- structured note-taking / agentic memory：agent 主动写笔记、persisted 到 context window 之外、需要时调回

**[Anthropic · Effective harnesses for long-running agents · 2025-11](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)** — ✅ 一手
- 这是 harness 词在 Anthropic 标题首次出现的源（004 期已用）
- 005 简短点一下、不展开

**[Anthropic Claude Cookbook · context engineering: memory, compaction, and tool clearing](https://platform.claude.com/cookbook/tool-use-context-engineering-context-engineering-tools)** — ✅ 一手 cookbook
- compaction lets Claude save a summary of its context window
- memory tool lets Claude write context to files

### C6 · OpenAI ChatGPT Memory

**[OpenAI · Memory and new controls for ChatGPT 2024-02](https://openai.com/index/memory-and-new-controls-for-chatgpt/)** — ✅ 一手公告
- 首发：2024-02 试点、用户可控
- 「taken steps to assess and mitigate biases, and steer ChatGPT away from proactively remembering sensitive information, like your health details — unless you explicitly ask it to」

**完整时间线**（多源印证）：
- 2024-02：试点
- 2024-09-05：开放给 Free / Plus / Team / Enterprise
- 2025-04-10：升级"reference all past conversations"——跨聊天记忆
- 2025-06-03：Free 用户也开（lightweight 版本）
- 2025-07-11：[Axios 报道](https://www.axios.com/2025/07/11/chatgpt-memory-update) 全版本可用
- 2025-11-06 至 11-07：**memory 集体丢失事件**

**[OpenAI Status · Issues with ChatGPT Memory 2025-11](https://status.openai.com/incidents/01K9D7DASB76TK1DEGPMG6ZAM4)** — ✅ 一手 status page
- 事件期：2025-11-06 至 11-07
- 状态：partial recovery for subset of impacted users、incident window 期间新建的 memory 仍有 gap
- OpenAI 在恢复事前 memory

**[OpenAI Developer Community · ⚠️ Critical: ChatGPT Data Loss](https://community.openai.com/t/critical-chatgpt-data-loss-engineering-fix-urgently-needed/1360675)** — ⚠️ 用户 thread

**[Tech Yahoo · ChatGPT memories disappearing for users](https://tech.yahoo.com/ai/chatgpt/articles/chatgpt-memories-disappearing-users-heres-080000832.html)** — ⚠️ 二手
**[The Outpost · Widespread Data Loss](https://theoutpost.ai/news-story/chat-gpt-memory-feature-experiences-widespread-data-loss-users-report-missing-personal-information-21563/)** — ⚠️ 二手

**[OpenAI Developer Community · EU GDPR Data Loss — Rollback Loop · 2025-12](https://community.openai.com/t/eu-gdpr-data-loss-rollback-loop-chat-frozen-at-september-2025-lost-oct-dec/1368508)** — ⚠️ 二手
- 后续欧盟用户 GDPR 投诉 thread

**[Embrace The Red · How ChatGPT remembers you 深度分析](https://embracethered.com/blog/posts/2025/chatgpt-how-does-chat-history-memory-preferences-work/)** — ✅ 一手技术分析
- 拆解 OpenAI 是怎么实际存 memory 的
- saved memories vs chat history（两种）

### C7 · Cursor Memory / Cursor 自家 harness 演化

**[Cursor · Continually improving the agent harness · 2026-04-30](https://cursor.com/blog/continually-improving-agent-harness)** — ✅ 一手
- 004 已重点引、005 简短点一下
- 关键：dynamic context、OpenAI patch-based vs Anthropic string-replacement format 双适配、tool call 跑到 2-3 个 9 可靠性

### C8 · LangChain 自家 · Your harness, your memory

**[LangChain · Your harness, your memory](https://www.langchain.com/blog/your-harness-your-memory)** — ✅ 一手
- LangChain 自己承认 harness 这一层是核心
- 005 用：framework 派也开始喊 harness 这个词、是 framework 退潮的间接证据
- 跟 004 第 04 章的"production harness 不用 LangChain"同构、本期讲记忆框架退潮时呼应一下

---

## D · Joy 朋友圈一手观点（draft 取材）

朋友圈原文（2026-04 末）核心观点摘录——由 Joy draft 时按需引用：

🔑 Joy 一手 ·

- 起手：刷遍 GitHub 上能搜到的 agent 记忆框架 + 看 Claude Code 框架的记忆源码 + 自己做 Demo
- 第一弯路：找开源框架、看 star 数、看接口、挑顺眼的塞进去
- 第二弯路：用 PostgreSQL + 向量数据库（pgvector）、折腾半天、发现 JSON 或 markdown 文件就够
- **核心判断**：「幻想找个好的 Agent 的记忆框架的思路、可能是错误的。没有一劳永逸的捷径」
- 四问框架：**记给谁？记什么？记多久？怎么取？**
- 三种"记给谁"：单用户私有 / 多用户共享 / agent 自己经验
- 四种"记什么"：基础信息（事实）/ 偏好 / 行为模式 / 关系
- 关系存储：文本难以表达、需要结构化或图
- "记多久"洞察：记忆库变垃圾堆、检索质量反降
- 检索四种：精确 / 模糊联想 / 向量 / 知识图谱
- A-B-C 跳两步例子：A 认识 B、B 在 C 公司、问 A 跟哪家公司有关 — 向量找不到（语义不像）/ 图谱直接走（沿关系链）
- 知识图谱适用判断：大量实体关系 OR 多跳推理
- 第三条路：让 agent 自己管 = MemGPT 的 OS 类比 + 三层记忆 + tool call 自管 + LLM 重写自己 prompt
- **Claude Code 源码读后感**：纯 markdown + grep、没有花哨东西、效果还很好
- **结论**：「给 agent 加记忆，说到底不是一个选框架的问题、是到底有没有想清楚 agent 到底需要记住什么」

---

## E · 反方 / 反反方（避免一边倒）

### E1 · "RAG 已死、长 context + grep 才是未来" 派

**[Akita on Rails · Is RAG Dead? Long Context, Grep, and the End of the Mandatory Vector DB · 2026-04-06](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)** — ✅ 强反方源
- 200K tokens on Claude Sonnet 4.6 = $0.63（cached follow-up = $0.10）
- vs RAG pipeline 工程成本 40-80 小时 = $1,600-$3,200（可换 30,000 次 Sonnet 查询）
- 关键引文：「The 'RAG is cheaper in tokens' argument ignores that tokens are the cheapest thing in the entire equation」
- 关键引文：「Engineers cost a lot, servers cost a lot, bugs in production cost a whole lot more」
- **Claude Code 源码 leak（2026-03）**：512,000 行 TypeScript、暴露 zero embeddings
  - MEMORY.md：25KB markdown 索引、~200 行、只放 pointers 不放数据
  - 主题文件：on demand 用 lexical search 拉
  - autoDream 子系统：「just grep, on text logs」on JSONL 日志
- 关键引文（哲学）：「Memory is treated as a hint. The system assumes that what's stored may be stale, wrong... the model has to verify before it trusts it」
- **vector DB 的真问题**：
  - False neighbors（cosine similarity 返回 topical match 不是 relevant answer）
  - Chunking disasters（重要表格被切、定义跟用法分离）
  - Opaque failures（错了不知道为什么）
  - Staleness（每次文档更新都要重新 embed）
- 关键引文：「When BM25 misses, you know why: the word isn't there. When a vector DB returns garbage, you get a plausible-looking wrong chunk, with no diagnostic signal at all」
- **新建议**：「start with keyword [BM25/grep], and add vector only if you feel the gap」（反向于过去"start with vectors, fall back to keyword"）

**[byteiota · RAG vs Long Context 2026: Is Retrieval Really Dead?](https://byteiota.com/rag-vs-long-context-2026-retrieval-debate/)** — ⚠️ 二手综述
**[TianPan · Long-Context Models vs. RAG: When the 1M-Token Window Is the Wrong Tool](https://tianpan.co/blog/2026-04-09-long-context-vs-rag-production-decision-framework)** — ⚠️ 决策框架版本

### E2 · 反反方："RAG 没死、它跟 memory 解决不同问题"

**[Atlan · AI Memory System vs RAG: Differences, Tradeoffs, and Use Cases](https://atlan.com/know/ai-memory-system-vs-rag/)** — ⚠️ 二手
- 共识：RAG 跟 memory 解决不同问题
  - RAG：检索"对所有人通用"的知识（文档、codebase、specs）
  - memory：保存"agent 在跨 session 学到的东西"

**[RAGFlow · From RAG to Context · 2025 年终回顾](https://ragflow.io/blog/rag-review-2025-from-rag-to-context)** — ⚠️ RAGFlow 自家立场

**[Long Context vs. RAG for LLMs: An Evaluation and Revisits · arxiv 2501.01880](https://arxiv.org/html/2501.01880v1)** — ✅ 一手论文
- 学术评测：长 context vs RAG 各赢什么
- 长 context 在 factual recall 占优、但成本高 1250 倍

### E3 · LongMemEval 实测：长 context vs memory 各赢什么

**[LongMemEval paper](https://arxiv.org/pdf/2410.10813)** — ✅ 一手
- long-context GPT-5-mini 在事实召回这一项还是赢过 memory 系统
- memory 系统在 persona consistency 和 temporal reasoning 上仍然赢
- **写作可用**：这是 005 第 06 章"怎么取"末尾、说"看场景决定"的硬数据

### E4 · Mem0 graph 模式实测争议

**[Best Mem0 Alternatives · Vectorize](https://vectorize.io/articles/mem0-alternatives)** — ⚠️ 竞品视角
**[Mem0 graph memory 文档](https://docs.mem0.ai/platform/features/graph-memory)** — ⚠️ Mem0 自家说法
- 关键变化：「graph relationships exposed via the old relations field on search results are no longer populated, and entity relationships are consumed indirectly through retrieval ranking, not exposed as a queryable graph structure」
- 解读：Mem0 的 graph 不是真图查询、是图作为打分信号——这是 v1 → 当前算法的关键演化

⚠️ **draft 时**：Joy 朋友圈说"Mem0 是这个品类用的最多的、核心就是向量存储"——按现在的事实，应该改成"Mem0 一开始是向量存储派、2026-04 升级成 hybrid 后是 semantic + BM25 + entity matching 三信号融合"，不是单纯向量。

---

## F · 法律 / 隐私真空地带

### F1 · GDPR 第 17 条 · 删除权

**[GDPR Art 17 · 一手法条](https://gdpr-info.eu/art-17-gdpr/)** — ✅ 一手
- 「the right to erasure ('right to be forgotten')」
- 用户可要求 controller 删除其个人数据

### F2 · EDPB Opinion 28/2024（关键判例）

**[Cloud Security Alliance · The Right to Be Forgotten — But Can AI Forget? · 2025-04-11](https://cloudsecurityalliance.org/blog/2025/04/11/the-right-to-be-forgotten-but-can-ai-forget)** — ⚠️ 二手
**[Keferboeck · GDPR and AI: The "Right to Be Forgotten" Now Means Unlearning](https://keferboeck.com/en-gb/articles/gdpr-and-ai-right-to-be-forgotten-now-means-unlearning)** — ⚠️ 二手
**[Handley Gill · EDPB Coordinated Enforcement Action Article 17](https://www.handleygill.co.uk/handley-gill-blog/edpb-coordinated-enforcement-action-article-17-gdpr-right-to-erasure-right-to-be-forgotten)** — ⚠️ 二手

事实清单（多源印证）：
- **EDPB Opinion 28/2024（2024-12）**：AI models trained on personal data **不自动 anonymous**、推翻 Hamburg DPA 早期立场（说 LLM 不存储个人数据）；要求 case-by-case
- 监管口径：DPA 可命令 erase part of dataset / whole dataset / **AI model itself**
- **EDPB 2025 协同执法行动**：30 个 EU DPA 参与、专门针对 right to erasure
- **2026 协同执法主题**：2025-10-14 EDPB 公告

### F3 · 美国 California AB 1008（2025）

**[CMS Law · GDPR / AI Act updates 2025](https://cms.law/en/deu/legal-updates/2025-in-data-protection)** — ⚠️ 二手综述
- AB 1008 explicitly requires AI developers to honor deletion requests for personal information embedded in models
- 2025 生效

### F4 · 技术挑战 · "AI 能不能真的忘"

**[TechPolicy · The Right to Be Forgotten Is Dead: Data Lives Forever in AI](https://www.techpolicy.press/the-right-to-be-forgotten-is-dead-data-lives-forever-in-ai/)** — ⚠️ 评论
**[IAPP · The AI right to unlearn](https://iapp.org/news/a/the-ai-right-to-unlearn-reconciling-human-rights-with-generative-systems)** — ⚠️ 评论

事实清单：
- 一旦数据嵌入模型架构、没有干净的隔离方法可在不重训练情况下移除
- **"source-free unlearning"**（2025-09 学术提案）：用代理数据集 + 校准随机噪声、不需要原始训练数据、效果接近完全重训练但只需小部分计算

### F5 · ChatGPT 2025-11 失忆事件 · GDPR 启示（C6 已引）

OpenAI status page incident `01K9D7DASB76TK1DEGPMG6ZAM4` —— 第一次大规模 memory 数据完整性事件。**写法**：放在第 05 章"记多久"作反面案例——记得太多不是好事 + 记得了又突然忘也不是好事 + 黑箱遗忘比黑箱记忆更可怕。

⚠️ **本期处理**：法律 / 隐私不是本期主轴（本期主轴是工程方法论）。第 05 章"记多久"用 1-2 段简短带过即可、不展开。如果要单独写"AI 记忆 + GDPR"、可以另起一篇（候选 C 已经讨论过、暂存 inbox）。

---

## G · 国内现象（轻量、不展开）

### G1 · 国内主线是"长 context"派、不是"memory framework"派

**[2026 中国 AI 大模型平台排行榜 · 腾讯新闻](https://news.qq.com/rain/a/20260305A0668M00)** — ⚠️ 二手
**[中国 AI 工具对比分析 · 知乎](https://zhuanlan.zhihu.com/p/2017344495369352898)** — ⚠️ 二手综述

事实清单：
- **Kimi（Moonshot）**：长文本派起家、2 million 字节无损 context、对标 RAG / memory 都用长 context 砸
- **Doubao（字节跳动）**：2026-02 Doubao 2.0 全场景 AI agent 平台 + 硬件生态（机器人、3D 打印机、智能车）
- **Tongyi（阿里 Qwen 3.6-Max）**：2026 默认百万 token 超长 context、agent 编程能力突破
- **Yuanbao（腾讯元宝）**：2025-09 Youtu-agent 智能体框架、不需要模型训练或闭源 API

### G2 · 字节 M3-Agent · 多模态长期记忆

**[ByteDance M3-Agent · 2025-08 发布](https://www.zeeklog.com/dou-bao-wan-quan-jie-du-2026nian-zi-jie-tiao-dong-de-quan-chang-jing-aizhi-neng-ti-ping-tai-2)** — ⚠️ 二手综述
- multimodal AI agent framework with long-term memory
- 知识随时间累积

⚠️ **本期处理**：国内不是本期主轴。如果要点一笔、放第 06 章末尾或第 07 章——「国内 AI 圈 2026 主线是百万 token 长 context、不是 memory framework；Kimi、Doubao、通义都在长 context 砸；Mem0 / Letta 这种独立 memory framework 在国内复刻较少」——表态不展开。

---

## H · 接 004 期延伸（一句话点过）

**[004 期 draft.md · 让 AI 真正能干活的不是模型、是 harness](../004-harness/draft.md)** — ✅ 内部源
- 005 第 02 章一句话复述 004 第 02 章核心：模型是无状态函数、吃 token 吐 token、没记忆没工具没规划
- draft 里给链接（PC 端可点）、wechat.html 不带链接但句子含「上一篇讲 harness 时讲过」之类引用

---

## I · 检索方式技术细节（第 06 章弹药）

### I1 · 向量检索为什么对关系无能

**[Akita on Rails 同上 · 详细论证](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)** — ✅
- cosine similarity 返回 topical match、不是 relevant answer
- 多跳关系（A 认识 B、B 在 C 公司、问 A 跟哪家公司有关）：A 跟 C 在向量空间不近、走不通

### I2 · 知识图谱真正的难点 · NER + Relation Extraction 准确率

写作判断：Joy 朋友圈说图谱代价是"数据库工程复杂度翻倍"、这个对一半。**真正代价**：从对话流抽实体和关系（NER + RE）这一步本身准确率不高、抽错就污染整个图。

**素材建议**：去 [HotpotQA leaderboard](https://hotpotqa.github.io/) 找 multi-hop QA 的 SOTA 准确率（比如 Joint EM ~70%、F1 ~85%）、说明即使 SOTA 也距离 prod 还差一截。

### I3 · BM25 + lexical search 的复兴

**[Akita on Rails 同上](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)** — ✅
- 「start with keyword, and add vector only if you feel the gap」
- BM25 失效有可解释性（词不在）、向量失效是 plausible-looking wrong（最危险）

---

## J · 可能用上的金句（draft 写时挑）

整理一组本期可能直接 inline 的金句：

| 来源 | 金句 |
| --- | --- |
| Anthropic 官方 Claude Code 文档 | 「The first 200 lines of MEMORY.md, or the first 25KB, whichever comes first, are loaded at the start of every conversation」 |
| Anthropic 官方 Claude Code 文档 | 「Auto memory is machine-local. Files are not shared across machines or cloud environments」 |
| Akita on Rails · 哲学 | 「Memory is treated as a hint. The system assumes that what's stored may be stale, wrong... the model has to verify before it trusts it」 |
| Akita on Rails · vector vs grep | 「When BM25 misses, you know why: the word isn't there. When a vector DB returns garbage, you get a plausible-looking wrong chunk, with no diagnostic signal at all」 |
| Akita on Rails · 反 RAG | 「The 'RAG is cheaper in tokens' argument ignores that tokens are the cheapest thing in the entire equation」 |
| MemGPT abstract | 「we propose virtual context management... drawing inspiration from hierarchical memory systems in traditional operating systems」 |
| MemGPT 副标题 | "Towards LLMs as Operating Systems" |
| Letta 自家 Context Repositories blog | 「prior approaches to memory limited agents to MemGPT-style memory tools or virtual filesystem operations」（Letta 自承 MemGPT 是 prior approach） |
| 004 期同位语 | 「模型是大脑、harness 是身体」（005 类比："harness 是身体、记忆是给身体配的笔记本"） |
| Joy 朋友圈 | 「给 agent 加记忆、说到底不是一个选框架的问题、是到底有没有想清楚 agent 到底需要记住什么」（这一句是结尾必引、可微调） |

---

## K · 待 Joy 一手 verify 的可疑事实

draft 写完后逐条核：

| # | 项 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | Anthropic 2026-03 Claude memory 用户面公告原始 URL | ⚠️ 待 verify | 9to5Mac 报道是二手、需在 anthropic.com/news 找一手 |
| 2 | Anthropic 2026-04-23 Managed Agents memory 公告原始 URL | ⚠️ 待 verify | SD Times 等是二手、需在 anthropic.com/news 找一手 |
| 3 | Auto Dream 是不是 Anthropic 官方命名 | ❌ 不是 | 社区起的名 / 媒体起的名；Anthropic 官方 docs 只用 "auto memory"。draft 表述："社区命名 Auto Dream"或"未公告功能" |
| 4 | Claude Code 源码 leak 2026-03（512k 行 TypeScript） | ⚠️ 待 verify | Akita on Rails 文章引用、Joy 自己读过源码可补真实读后感 |
| 5 | MemGPT 三层名称 core / recall / archival | ⚠️ 待 verify | 二手源（Leonie Monigatti、Vectorize、Atlan 等）一致表述、但 abstract 没直接列、需翻论文 PDF 第 3.2 节 confirm |
| 6 | Joy 自己 Postgres + pgvector 翻车的具体过程 | 🔑 Joy 一手 | draft 时由 Joy 自己写——什么场景、用了多久、最后切到什么、为什么 |
| 7 | Joy 读 Claude Code 源码看到的"markdown + grep"具体细节 | 🔑 Joy 一手 | draft 时由 Joy 自己写——读了哪些文件、看到的具体逻辑 |
| 8 | Mem0 当前 stars / Letta 当前 stars | ⚠️ 写时复核 | Mem0 ~54.6k / Letta ~22.4k（5/2 数据）、发布前再核 |
| 9 | LongMemEval / LoCoMo 数据 | ✅ 已 verify | Mem0 自家公布、可信 |
| 10 | ChatGPT memory 2025-11 失忆事件 OpenAI 官方说明 | ✅ 已 verify | [status.openai.com incident 01K9D7DASB76TK1DEGPMG6ZAM4](https://status.openai.com/incidents/01K9D7DASB76TK1DEGPMG6ZAM4) 一手 |
| 11 | 国内 AI 厂家长 context 主线判断 | ⚠️ 弱 | 二手综述较多、写时表述要保守 |
| 12 | LangChain Your harness, your memory 引文准确性 | ⚠️ 写时复核 | 004 已用、005 不展开、可点一下 |
| 13 | EDPB Opinion 28/2024 引文准确性 | ⚠️ 写时复核 | 二手转述、原文可在 [edpb.europa.eu](https://edpb.europa.eu) 翻 |

---

## L · 调研留档（兜底链接 · 不是直接素材但写时备用）

### L1 · 综述 / 盘点
- [Best AI Agent Memory Frameworks 2026 · Atlan](https://atlan.com/know/best-ai-agent-memory-frameworks-2026/)
- [Top 10 AI Memory Products 2026 · Medium](https://medium.com/@bumurzaqov2/top-10-ai-memory-products-2026-09d7900b5ab1)
- [AI agent memory systems in 2026 · Hermes OS](https://hermesos.cloud/blog/ai-agent-memory-systems)
- [Top 6 AI Agent Memory Frameworks · DEV Community](https://dev.to/nebulagg/top-6-ai-agent-memory-frameworks-for-devs-2026-1fef)
- [Spheron · Agent Memory Infrastructure on GPU Cloud](https://www.spheron.network/blog/agent-memory-gpu-cloud-mem0-zep-guide/)
- [TECHSY · 8 Best AI Agent Memory Tools in 2026](https://techsy.io/en/blog/best-ai-agent-memory-tools)

### L2 · 学术
- [Agent-Memory-Paper-List GitHub](https://github.com/Shichun-Liu/Agent-Memory-Paper-List)
- [Position: Episodic Memory is the Missing Piece for Long-Term LLM Agents · arxiv 2502.06975](https://arxiv.org/pdf/2502.06975)
- [From Human Memory to AI Memory · arxiv 2504.15965](https://arxiv.org/html/2504.15965v1)
- [Evaluating Memory in LLM Agents via Incremental Multi-Turn Interactions · arxiv 2507.05257](https://arxiv.org/html/2507.05257v3)

### L3 · Anthropic 工程博客 / cookbook
- [Anthropic Engineering · 系列首页](https://www.anthropic.com/engineering)（写时翻最新）

### L4 · 备用 / 备查
- [Long-Term Memory AI Guide April 2026 · Supermemory](https://blog.supermemory.ai/what-is-long-term-memory-ai/)
- [AI Memory and Context · Sphere](https://www.sphereinc.com/blogs/ai-memory-and-context/)
- [Beyond the Context Window · arxiv 2603.04814](https://arxiv.org/html/2603.04814v1)
- [Spatial Metaphors for LLM Memory · MemPalace · arxiv 2604.21284](https://arxiv.org/html/2604.21284v1)

---

## M · 调研发现的反方点 · 朋友圈/notes 需要修订

回看 notes.md 和 Joy 朋友圈、调研发现这几处需要在 draft 时表述更准：

1. **"Mem0 核心就是向量存储"** ❌ 修正 → 「Mem0 一开始是向量存储派、2026-04 升级算法后是 hybrid——semantic + BM25 + entity matching 三信号并行融合」
2. **"得用结构化或向量标签的方式把实体间的连接存下来"** ❌ 修正 → 删"向量标签"、改成"结构化字段或知识图谱"
3. **"知识图谱代价在数据库工程复杂度翻倍"** ⚠️ 补 → 真正代价是从对话流抽实体关系（NER + RE）准确率不高、抽错污染整个图
4. **"Claude Code 用 markdown + grep 效果还很好"** ✅ 一手 verify、但补隐含假设 → 单用户 / 单设备 / 本地 / 单线程；Letta 走同一条路（MemFS）也只支持 grep + glob、是行业级证据
5. **"三层记忆 + 把 agent 当 OS"= MemGPT 论文原创** ✅ 必须显式归属 → "这就是 2023-10 UC Berkeley Charles Packer 那篇 MemGPT: Towards LLMs as Operating Systems 提的、Letta 是该论文的产品化"
6. **"记多久"漏了 GDPR / 主动遗忘** ✅ 补 → ChatGPT 2025-11 失忆事件 + GDPR 第 17 条 + EDPB Opinion 28/2024 + Auto Dream 主动遗忘
7. **三种 vs 四种记忆维度混了 ownership 和 cognitive type** ✅ 在 notes 已修 → draft 时按 notes.md 的 03/04 章拆法分别讲

---

## 调研结束日期

2026-05-02

下一步进入 Step 5：写 draft.md 开篇 1-2 段示例校风格（按 WORKFLOW.md）。
