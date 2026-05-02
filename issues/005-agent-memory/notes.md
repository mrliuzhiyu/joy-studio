# 005 · AI 记忆框架的发明者、正在抛弃自己的发明 · notes

> **v2 · 2026-05-02 重写** — 抛弃了 v1 的"四问"骨架（来自 Joy 朋友圈、不够独立）、改用从 research-brief 一手事实独立得出的"行业级抛弃 MemGPT"叙事。

## 一句话定位

2023 年 UC Berkeley 一篇叫 MemGPT 的论文提出了"把 AI 当操作系统、给它分三层记忆"的方案、成了全行业 AI 记忆赛道的圣经、催生了 Letta、Mem0、Zep、cognee 一连串框架。但 2026 年发生了三件事——MemGPT 论文一作的公司 Letta 自己把这套方案标记成 *prior approach* 退回 git 加 markdown 文件夹、Mem0 把图谱关系退到后台不再暴露给查询、Anthropic 官方文档显示行业最复杂的 production agent（Claude Code）用的就是 markdown 加文件搜索——AI 记忆框架这一层、被它的发明者自己拆了。这件事改写了过去两年所有人对"AI 记忆系统"的赌局。

## 核心观点

- 模型自己没记忆——所谓"AI 记得你"是装在模型外面的一层程序在做的事。004 期讲过、本期一句话复述、不展开
- 2023-10 MemGPT 论文那个"LLMs as Operating Systems"+ 三层记忆（核心 / 回忆 / 档案）的范式、是行业 AI 记忆赛道最有影响力的学术输出之一
- Letta（论文一作 Charles Packer 创立、$10M 种子）把这套思想商业化、过去两年是 agent 记忆框架最显眼的代表
- 但 2026-02-12 Letta 自己公告 Context Repositories——退回 git-tracked markdown 文件夹、目前甚至不支持语义搜索、只用 grep / glob——并明确把 MemGPT 风格方案标记成 prior approach
- 这不是孤立事件——Mem0 同期把 graph relationships 退到后台信号层、不再暴露给查询；Anthropic 官方 Claude Code 文档显示用纯 markdown + 标准 file 工具
- 行业级现象：AI 记忆框架被它的发明者自己抛弃了
- 真原因有三层——长 context 反扑（Claude 1M / Gemini 2M）吞掉了原本属于"记忆框架"该解决的问题；模型自己读 markdown 比走抽象层快；production 团队都在自建、framework 给的是通用解
- 给读者的判断（不是方法论清单、是基于场景的判断）——单用户本地直接 markdown / 多用户上数据库 + 权限 / agent 自管理走 Letta MemFS / 超大规模自建

## 读者画像

每天用 ChatGPT、Claude、Cursor、Claude Code 这一类 AI 工具的工程师 / 产品经理 / 独立开发者 / 技术博主 / CTO。可能正想给自己的 AI 应用加记忆、可能在评估 Mem0 / Letta / Zep 该选哪个、可能听说过"知识图谱"或"向量数据库"但不确定要不要上。不是 AI 研究员（他们读论文不读公号），也不是完全零编程经验的家人群读者。

接 004 *harness* 期的读者最舒服——但本期独立成篇、没读过 004 也能进。

## 风格约束

### 本期特定建议（Joy 在选题阶段提的、本期写作时按建议处理、不进永久 memory）

- **通俗优先**：每个第一次出现的术语、先用大白话讲一遍。不假设读者懂 token、context、向量、embedding、RAG、harness、agent、MemGPT、Letta、Mem0、grep、markdown 这些词
- **用日常场景类比**：能用笔记本、抽屉、便利贴解释的、不要用 RAM/disk/cache、heap/stack、index/cursor 这些技术类比；MemGPT 那个 OS 类比讲到时、先把日常版（"想象图书馆有不同区域、有些书放在最方便取的地方、有些放在仓库"）讲透再让位给技术版
- **场景具体**：每讲一个抽象判断、先给一个读者能立刻代入的场景

### 独立思考原则（v2 关键）

- **不复刻 Joy 朋友圈的判断和框架**——朋友圈那版的"四问"分类、"三种记给谁"、"四档记什么"等等、本版完全不用
- **从 research-brief 的一手事实独立推论**——每个章节的核心观点都从可 verify 的事实导出、不靠个人经验作论据
- **Joy 个人经验放第 05 章一段**——读 Claude Code 源码读后感作为印证、不作为主线
- **抹掉"我研究了一个月"翻车叙事**——01 章起手是 2026-02-12 Letta 公告这个外部事实

### 通用约束（沿用 002 / 003 / 004 + memory 里的 feedback）

- 不用中文双引号包概念（agent / memory / framework / vector / graph / MemGPT / Letta / Mem0 / Anthropic 等术语第一次出现可保留英文裸写）
- 不要"等等——这不就是 X 吗"反问 + 破折号过渡
- 不要"最 X"排比、"事实上 / 实际上 / 值得一提的是"过渡
- 不要"反方 1 2 3 4"硬切清单——让叙事自己流
- **不要章节间跳转语**——"下一章会讲""接下来要展开""至此可以引出"全部删除。每章独立完整、下一章自然承接
- 不要总结句式收尾——让读者自己得出
- 第一人称克制——这一期主轴是行业级现象、第一人称只在 05 章一段（读源码读后感）出现、其他地方不用
- 技术专名保留英文（MemGPT / Letta / Mem0 / Zep / cognee / LangMem / Claude Code / Cursor / Anthropic / OpenAI / Managed Agents / pgvector / Postgres / markdown / grep / vector / embedding / RAG / NER / Auto Dream / Context Repositories / MemFS 等）
- 章节标题陈述句、≤ 12 字（参 002 平均 11.7、003 平均 12.5、004 平均 9-12）
- 章节编号 01-07
- 金句藏在叙事里、不加粗、不双引号、单句完成
- 每个事实带可点击 markdown 链接（draft.md 是 markdown 真源、PC 端可点）
- 链接策略遵循 [feedback_wechat_publication_v3.md](../../memory/feedback_wechat_publication_v3.md)（公号正文不带 a 标签、markdown 真源 draft.md 带）
- 一句一段密度（参公号特化规则）
- 强调两级（一级 strong / 二级 strong+underline）按 [design.md](../../design.md)
- 结尾给读者拿走的东西、不用"总结"或"结论"
- 不限字数 · 按 [feedback_long_form_writing.md](../../memory/feedback_long_form_writing.md)

## 7 章提纲

每章核心 3-4 个点 + 一段收口观察。不预设细颗粒论点。

### 01 一篇论文、一家公司、一个被自己抛弃的方案

- 起手是 2026-02-12 这天 [Letta 公告 Context Repositories](https://www.letta.com/blog/context-repositories) 这件事——一家做 AI 记忆框架的公司、退回 git-tracked markdown 文件夹、明确把 MemGPT 风格标记成 *prior approach*
- 戏剧性——Letta 是 [MemGPT 论文](https://arxiv.org/abs/2310.08560) 一作 Charles Packer 创立的公司、它就是为把 MemGPT 这套方案产品化而存在的
- 不是孤例——同期 [Mem0 把 graph relationships 退到后台信号层](https://github.com/mem0ai/mem0)、[Anthropic 官方文档显示 Claude Code 用纯 markdown + 标准 file 工具](https://code.claude.com/docs/en/memory)
- **观点段**：写出"AI 应该有记忆框架"那套理论的人、已经不再相信这套理论
- 不预告章节、单句金句论断收口（学 004 那套）

### 02 模型自己没记忆——记忆是装在外面的

- 接 004 第 02 章一句话复述：模型只做一件事、吃 token 吐 token；它没记忆、不记得你
- 一段具体场景：你在 ChatGPT 跟它讲过你叫什么、住哪、喜欢简洁回复——下次开聊它怎么"记得"
- 真相：不是模型记得、是 ChatGPT 这个产品把摘要塞回 prompt 让模型"看见"
- 这层"摘要 + 检索 + 塞回 prompt"的机制就是记忆系统
- **观点段**：所谓 AI 记得你、记的从来不是你的原话、是它根据你的话合成出来的一份摘要
- **不要**重复 004 第 02 章那段大段的工具调用循环讲解——本期一句话点过、留链接

### 03 一篇论文怎么"火"成行业标准

- [MemGPT 论文 2023-10-12 投稿 arxiv](https://arxiv.org/abs/2310.08560)——UC Berkeley Sky Lab、Charles Packer / Sarah Wooders / Joseph Gonzalez / Ion Stoica
- 副标题 *Towards LLMs as Operating Systems*——把大语言模型类比成操作系统、给它分三层记忆（核心 / 回忆 / 档案、像 RAM / 缓存 / 硬盘）
- 通俗讲虚拟内存类比：先给"图书馆三种存放方式"日常版、再让位给"电脑内存层级"技术版
- [2024-09-23 Letta 出 stealth · TechCrunch](https://techcrunch.com/2024/09/23/letta-one-of-uc-berkeleys-most-anticipated-ai-startups-has-just-come-out-of-stealth/)——Charles Packer / Sarah Wooders 把 MemGPT 商业化、$10M 种子、Jeff Dean 个人投资
- 2024-2025 年 Mem0、Zep、cognee、Memary、LangMem 一连串记忆框架基于这套思想冒出来——所有人都在卷哪种检索算法更好
- **观点段**：MemGPT 那个 OS 隐喻太漂亮——它让 AI 记忆这件事看起来像一个有标准答案的工程题、所有人都在比谁的答案更精致

### 04 Letta 是怎么自己拆台的

- 回到 01 章那条新闻、详细拆
- [Letta 2026-02-12 Context Repositories](https://www.letta.com/blog/context-repositories)——退回 git-tracked markdown 文件夹、只支持 grep / glob、不支持 semantic search
- [Letta MemFS 文档自己写](https://docs.letta.com/letta-code/memory/)：「currently only supports exact-match search (grep, glob) with no semantic/embedding-based search capability」
- 为什么——不是技术上做不到、是 production agent 实际跑起来发现：
  - agent 自己读自己的 markdown 比走"虚拟内存抽象"准
  - git 版本控制天然解决"AI 写错记忆怎么办"——回滚就好
  - agent 用 bash 操作文件比学一套专门的 memory API 直觉
- Letta 公告原话引文：「prior approaches to memory limited agents to MemGPT-style memory tools or virtual filesystem operations」
- **观点段**：抛弃 MemGPT 这件事、由 MemGPT 团队自己做出来、比任何外部批评都重

### 05 Anthropic 一手答案 · 用 markdown + 文件搜索

- [Anthropic 官方 Claude Code 记忆文档](https://code.claude.com/docs/en/memory)——两套机制：CLAUDE.md（用户写的指令）+ Auto Memory（Claude 自己写的笔记、存在 `~/.claude/projects/<project>/memory/`）
- 加载方式——MEMORY.md 前 200 行 / 25KB 启动加载、其他主题文件按需读、用 Claude 的标准 file 工具
- 关键事实：**没有 vector DB、没有 graph DB、没有 embedding**
- [Anthropic 还有一个未公告功能（社区起名 Auto Dream）](https://claudefa.st/blog/guide/mechanics/auto-dream)——四阶段（Orient / Analyze / Consolidate / Prune & Index）、类比 REM 睡眠的记忆巩固
- [Akita on Rails 2026-04-06 那篇](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/) 从 Claude Code 源码 leak 推断、autoDream 子系统就是 grep on JSONL 日志
- 🔑 [Joy 待填：你读 Claude Code 源码看到的具体细节——加载逻辑在哪个文件、有没有 surprise、跟你预期的差异]——本期 Joy 一手数据、唯一处出现
- **观点段**：行业最复杂的 production agent 在记忆这件事上、用了最朴素的工程方案——这不是行业级的"看破"、是行业级的承认：之前那些更复杂的方案是过度设计

### 06 框架退潮 · Mem0 的妥协是这一波的预告

- Mem0 是这两年用得最多的记忆框架（[GitHub 调研时 54.6k stars](https://github.com/mem0ai/mem0)）、一开始走的是向量检索路线
- 2026-04 升级核心算法——hybrid retrieval：semantic（语义）+ BM25（词频）+ entity matching（实体匹配）三种信号并行打分融合
- LongMemEval 上拿到 93.4 分、提升 25.6 分
- 但有一个细节——graph relationships（图谱关系）在新版里**不再暴露给查询**、退到后台只作为打分信号之一。不是去掉了图、是图退到信号层、不让查询者直接走图
- 为什么这个妥协是预告——向量这条路独走不通（事实召回输给 BM25 + 长 context）、纯图也走不通（建图准确率不够）、最后变成"什么都加一点、谁都不主导"的杂凑
- 简短一段讲为什么向量对关系无能：行业标准 A-B-C 跳两步例子（A 认识 B、B 在 C 公司、问 A 跟哪家公司有关——向量找不到、图谱直接走两步答出来）。不展开成大段——这是论证、不是文章主轴
- [Akita on Rails 那句最干脆的判断](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)：「When BM25 misses, you know why: the word isn't there. When a vector DB returns garbage, you get a plausible-looking wrong chunk, with no diagnostic signal at all」
- **观点段**：Mem0 hybrid 是这一波框架退潮的最强信号——一家产品级别还在跑的框架、把自己的核心检索从"高级算法"退回"三种基础信号融合"、说明高级算法这条路在 production 的回报递减

### 07 这一层为什么退回——给读者的判断

- 行业级退回到"文件 + 文本搜索"的真原因——三层
  - **第一**：长 context 的反扑——[Claude 1M / Gemini 2M / GPT-5.4 400K](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) 已 GA、原本属于"记忆框架"该解决的"context 装不下"问题被模型本身吃掉一大半
  - **第二**：模型自己读 markdown 比走抽象层快——一旦 agent 能直接 grep / glob、为它专门做的 memory API 就成中间层、增加复杂度不增加能力
  - **第三**：production 团队都在自建——Anthropic 自家、Cursor 自家、Letta 自家、Mem0 自家都不靠任何上游 framework；framework 给的是通用解、production 要的是具体解
- 给读者的判断（按场景分、不是方法论清单）：
  - 单用户、本地、单设备 agent → 直接 markdown + 文件搜索、参考 Claude Code 设计
  - 多用户、需要权限和审计 → 数据库 + 权限模型、Mem0 比裸搭快但记得 hybrid 是妥协方案
  - agent 自管理 + 跨 session 学习 → Letta MemFS（git-tracked markdown）路径
  - 超大规模 + 跨多团队 → 需要自建、开源框架在这个体量都会撞瓶颈
- **结尾金句**：这一层的工程教训不是"AI 记忆框架是个伪需求"——是它的发明者已经告诉你答案不在他们一开始的方案里
- 给读者拿走的东西：场景 → 方案的对照表 + 对"AI 记忆框架"这个赌局的清醒判断

## 配图清单

5 张图。统一调性（同字体、同 accent 色、同留白比例）。每张图下方图注「图 N · 内容描述 · 数据来源」。

| # | 嵌入位置 | 内容 | 来源 |
| --- | --- | --- | --- |
| 1 | 02 章末 | 模型 vs 记忆系统的关系：模型是无状态函数、记忆是装在外面的笔记本（接 004 第 1 张图视觉风格） | 自制 HTML（diagram-1-model-vs-memory.html） |
| 2 | 03 章末 | MemGPT 三层记忆架构图：核心 / 回忆 / 档案（OS 类比 + 日常类比并排） | 自制 HTML（diagram-2-memgpt-three-tiers.html） |
| 3 | 04 章中 | Letta 演化时间线：MemGPT 论文 2023-10 → Letta 出 stealth 2024-09 → Context Repositories 2026-02（自己抛弃自家方案） | 自制 HTML（diagram-3-letta-timeline.html） |
| 4 | 06 章中 | A-B-C 跳两步图谱例子可视化：向量找不到 vs 图谱直接走两步答出来 | 自制 HTML（diagram-4-vector-vs-graph.html） |
| 5 | 07 章末 | 决策树 / 选型对照表：什么场景用什么方案（markdown+grep / Mem0 / Letta MemFS / 自建） | 自制 HTML（diagram-5-decision-tree.html） |

## 待 verify 事实清单

draft 写完后必须挨个核：

| # | 项 | 状态 | 说明 |
| --- | --- | --- | --- |
| 1 | MemGPT 论文作者 / 年份 / 机构 | ✅ 已 verify | [arxiv 2310.08560](https://arxiv.org/abs/2310.08560) · UC Berkeley · Packer / Wooders / Lin / Fang / Patil / Stoica / Gonzalez · 2023-10-12 |
| 2 | MemGPT 三层名 core / recall / archival | ⚠️ 待 verify | 多个二手源一致表述、abstract 没直接列；写时建议翻论文 PDF §3.2 confirm 或归属"业内通用复述" |
| 3 | Letta 出 stealth 时间 / 融资 | ✅ 已 verify | [TechCrunch 2024-09-23](https://techcrunch.com/2024/09/23/letta-one-of-uc-berkeleys-most-anticipated-ai-startups-has-just-come-out-of-stealth/) · $10M seed · Jeff Dean 个人投资 |
| 4 | Letta Context Repositories 公告日期 + 内容 | ✅ 已 verify | [letta.com/blog/context-repositories 2026-02-12](https://www.letta.com/blog/context-repositories) · 引文「prior approaches to memory limited agents to MemGPT-style memory tools or virtual filesystem operations」准确 |
| 5 | Letta MemFS 不支持 semantic search | ✅ 已 verify | [docs.letta.com/letta-code/memory](https://docs.letta.com/letta-code/memory/) · 「currently only supports exact-match search (grep, glob) with no semantic/embedding-based search capability」 |
| 6 | Anthropic 官方 Claude Code 记忆文档关键引文 | ✅ 已 verify | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) · 「The first 200 lines of MEMORY.md, or the first 25KB, whichever comes first, are loaded at the start of every conversation」 |
| 7 | Auto Dream 是不是 Anthropic 官方命名 | ❌ 不是 | 社区起的名；Anthropic 官方 docs 只用 "auto memory"。draft 表述："社区命名 Auto Dream"或"未公告功能"、不要说"Anthropic 推出 Auto Dream" |
| 8 | Auto Dream 4 阶段 | ⚠️ 多源印证、社区扒 | [claudefa.st](https://claudefa.st/blog/guide/mechanics/auto-dream) + [AntonioCortes 2026-03-30](https://antoniocortes.com/en/2026/03/30/auto-memory-and-auto-dream-how-claude-code-learns-and-consolidates-its-memory/) + 多源——Orient / Analyze / Consolidate / Prune & Index |
| 9 | Claude Code 源码 leak 2026-03（512k 行 TypeScript） | ⚠️ 待 verify | [Akita on Rails 引用](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/) · Joy 自己读过源码可补一手 verify |
| 10 | 🔑 Joy 读 Claude Code 源码具体细节 | 🔑 Joy 一手 | draft 第 05 章必填——读了哪些文件、看到的具体逻辑、有没有 surprise；这是 Joy 一手数据、唯一处出现 |
| 11 | Mem0 当前 stars / Letta 当前 stars | ⚠️ 写时复核 | Mem0 ~54.6k / Letta ~22.4k（5/2 数据）、发布前再核 |
| 12 | Mem0 hybrid 算法升级 + LongMemEval 93.4 | ✅ 已 verify | [github.com/mem0ai/mem0](https://github.com/mem0ai/mem0) repo + [arxiv 2504.19413](https://arxiv.org/html/2504.19413v1) · 2026-04 |
| 13 | Mem0 graph relationships 退到后台信号层 | ⚠️ 写时复核 | [docs.mem0.ai/platform/features/graph-memory](https://docs.mem0.ai/platform/features/graph-memory) · 「entity relationships are consumed indirectly through retrieval ranking, not exposed as a queryable graph structure」 |
| 14 | ChatGPT memory 2025-11 失忆事件 OpenAI 官方说明 | ✅ 已 verify | [status.openai.com incident 01K9D7DASB76TK1DEGPMG6ZAM4](https://status.openai.com/incidents/01K9D7DASB76TK1DEGPMG6ZAM4) 一手 · 但本版 draft 不一定用、05 章可能放进去也可能不放、看篇幅 |
| 15 | 长 context 数据 Claude 1M / Gemini 2M / GPT-5.4 400K | ⚠️ 写时复核 | [Anthropic Effective context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) + 各家公告 |
| 16 | LangChain "Your harness, your memory" 引用 | ⚠️ 写时复核 | [langchain.com/blog/your-harness-your-memory](https://www.langchain.com/blog/your-harness-your-memory) · 第 06 章可点一下、不展开 |

## 素材来源

完整链接库见 [experiments/research-brief.md](experiments/research-brief.md)。draft.md 里所有事实都从这里出。

## 复盘（发布后填）

- 阅读量：
- 读者反馈中反复出现的关键词：
- 哪段写得最好（被截图传播的段落）：
- 最有争议的段落：
- 下次能更好的：
