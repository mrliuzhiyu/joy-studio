# AI 记忆框架的发明者、正在抛弃自己的发明

三年前一篇论文成了行业圣经。三年后写论文的人退回了 markdown。

---

## 01 一篇论文被自己人抛弃了

2026 年 2 月 12 日、一家叫 Letta 的公司在自家博客上贴了一篇公告——[Introducing Context Repositories](https://www.letta.com/blog/context-repositories)。

Letta 是干什么的——是过去两年最被关注的 AI 记忆框架公司之一。它的产品定位是「memory-first coding agent」、专门给 AI agent 设计长期记忆的基础设施。这里说的 agent、是行业里用得越来越多的一个词、指那种不只是回答你问题、还能自己读文件、跑命令、改代码、帮你执行任务的 AI 程序——比如 Claude Code、Cursor 这些命令行或 IDE 里的 AI 助手。

Letta 这家公司是 2024 年 9 月从 UC Berkeley 出 stealth（早期保密阶段结束、对外公开）的——[TechCrunch 当时的报道](https://techcrunch.com/2024/09/23/letta-one-of-uc-berkeleys-most-anticipated-ai-startups-has-just-come-out-of-stealth/) 它是 Berkeley 最被期待的 AI 创业公司之一、首轮 $10M 种子、Jeff Dean（Google Deepmind 首席科学家、AI 圈最有分量的工程师之一）个人投资。

它存在的意义、就是把一篇 2023 年的 AI 记忆论文产品化。

那篇论文叫 [MemGPT: Towards LLMs as Operating Systems](https://arxiv.org/abs/2310.08560)、2023-10-12 投到 arxiv（学术论文预印本平台）。一作 Charles Packer 后来就是 Letta 的 CEO。

副标题翻译过来——「让大语言模型变成操作系统」。论文的核心想法是、给 AI 设计一套像电脑操作系统那样的记忆管理——三层记忆、层与层之间的数据自动搬运、AI 自己决定什么时候把哪条记忆从慢的存储调到快的存储。

这个想法一出来、引发了过去两年 AI 记忆框架的整波大爆发。Letta、Mem0、Zep、cognee、Memary、LangMem——一连串记忆框架基于这套思想冒出来。每家都在卷自己的检索算法、自己的存储后端、自己的抽象层。

到 2026 年 2 月 12 日这一天、Letta 在 Context Repositories 那篇公告里写了这么一句话——

「prior approaches to memory limited agents to MemGPT-style memory tools or virtual filesystem operations」

中文意思是——之前的记忆方案、把 AI agent 限制在 MemGPT 风格的记忆工具或虚拟文件系统操作里。

prior 这个词是关键——直译是「之前的」、潜台词是「过时的」。

写出 MemGPT 论文那套方案的人、亲口把这套方案标记成了「之前的方案」。

Letta 给出的新方案——叫 Context Repositories——是一个 git（程序员用了快二十年的代码版本管理工具）版本管理的 markdown（一种最朴素的纯文本格式、就是你在公众号、GitHub 看到的那种带格式的纯文本）文件夹。[按 Letta MemFS 文档自己的说法](https://docs.letta.com/letta-code/memory/)、目前甚至**只支持精确文本匹配**（grep、glob 这种最传统的 Unix 时代搜索方式）、**不支持语义搜索**（按内容意思来匹配的搜索、是过去两年向量数据库这一类工具的核心能力）。

也就是说——***MemGPT 团队抛弃了 MemGPT、退回到一个跟 git 版本控制 + 文本文件没什么区别的方案***。

---

这件事不是 Letta 一家发生的孤立事件。

[Mem0 的 GitHub repo](https://github.com/mem0ai/mem0)（调研时 54.6k stars、是这两年用得最多的 AI 记忆框架）2026 年 4 月升级了核心算法——从过去主打的向量检索、变成 hybrid retrieval（混合检索）——把 semantic（语义）、BM25（一种基于词频的传统搜索算法、是搜索引擎在向量出现前几十年用的主流方法）、entity matching（实体匹配、看记忆里有没有出现你问句里提到的具体名字 / 名词）三种信号并行打分融合。

这版升级里有一个细节——graph relationships（图谱关系、Mem0 之前主推的关系存储能力）**不再暴露给查询使用**、退到后台只作为打分的信号之一。不是去掉了图、是把图退到了信号层、不让查询者直接走图。

[Anthropic 给 Claude Code 的官方记忆文档](https://code.claude.com/docs/en/memory) 写得清清楚楚——它的记忆系统就是两类 markdown 文件（用户写的 CLAUDE.md + Claude 自己写的 Auto Memory）、加 Claude 自己用标准文件工具读取。**没有向量数据库、没有图谱、没有 embedding（一种把文字压成一组数字、按数字距离判断意思相近的处理、是过去两年向量检索的核心、04 章会展开）、没有任何"花哨"的检索基础设施**。

三家——MemGPT 论文的发明者团队、用得最广的开源记忆框架、头部 production AI 编程 agent——都在 2026 年这几个月、用各自的方式说同一件事：

AI 记忆这一层、过去两年走的那条复杂化路径、是过度设计。

---

## 02 记忆是装在模型外面的

要理解为什么 markdown 加文本搜索就够、得先把 AI 模型自己是什么讲清楚。

模型自己没记忆——这件事一句话讲完。

你跟 ChatGPT 聊天、它记得你上一句说什么、看上去是在「记得」。但模型本身没有任何状态保存——每次推理（模型从输入生成输出的过程）对它来说都是全新的、它不知道你上一秒说过什么、不知道你叫什么、不知道现在几点。

ChatGPT 这个应用之所以看起来有记忆、是因为它每次给模型发请求时、把过去的对话历史完整附带过去。模型看见的是「过去聊过的全文 + 你这条新话」、它根据这一整段产出回答。看似多轮对话、其实每一次都是单次问答、只不过输入越来越长。

打个比方——模型是一个被关在房间里只会写字的人。这个房间没有窗户、没有电话、没有任何外部连接、也没有「前一秒的记忆」。你递一张纸条进去——纸条上抄满你跟他过去聊过的所有内容、再加上你这次的问题——他写一段回答给你、纸条递回来。仅此而已。

下次你再问、要再递一张新纸条进去——上面又得抄上之前所有的对话内容（包括他上次的回答）、加这次的问题。你不抄、他什么都不知道。

这就是 AI 模型的真相。

所谓「AI 记得你」——记的不是模型本身、是模型外面那个程序。它把你过去说过的话、按某种方式存下来、在你下次发消息时挑出相关的部分塞进这张「纸条」。这层「挑相关、塞进去」的机制——就是记忆系统。

上一期讲 harness 时、把这套「外面的程序」叫做 [模型外面那一层执行壳](../004-harness/draft.md)。记忆系统是这层壳里专门管「记什么 / 取什么 / 塞回 prompt」的那一块。

所以 ***AI 记忆的设计问题、本质上不是设计模型——是设计这层壳里的笔记本机制***。

而 Letta、Mem0、Anthropic 这三家在 2026 年告诉行业的是——这个笔记本不需要做得太花哨。

---

## 03 一篇论文怎么火成行业标准

时间倒回 2023 年 10 月 12 日。

UC Berkeley Sky Lab——一个由 Joseph Gonzalez 和 Ion Stoica 两位教授带的研究小组——给 arxiv 提交了一篇论文。Sky Lab 是 AI 系统方向最有名的实验室之一、Ion Stoica 是大数据时代 Spark（一个在数据工程领域几乎人人用的开源框架）的创造者之一、是 Databricks 公司的联合创始人。能写进这个实验室的论文、本身就有学术地位的背书。

那篇论文的几位作者——Charles Packer、Sarah Wooders、Kevin Lin、Vivian Fang、Shishir G. Patil、Ion Stoica、Joseph E. Gonzalez。Packer 和 Wooders 是 PhD 学生、Stoica 和 Gonzalez 是导师。

论文标题——MemGPT: Towards LLMs as Operating Systems。

副标题里这个 OS（Operating System / 操作系统）类比、是这篇论文的核心想法。

操作系统是你电脑里那个最底层的程序——Windows、macOS、Linux 这些。它做的关键事之一、是管理你电脑的内存层级——内存条（小但快）、硬盘（大但慢）、CPU 缓存（最快但最小）。操作系统帮你自动决定数据放在哪一层、什么时候从慢的搬到快的、什么时候从快的退回慢的——这套机制叫**虚拟内存管理**、是操作系统几十年发展的核心成就之一。

MemGPT 论文做的事是——把这套虚拟内存的思路、搬到 AI 记忆上。

想象一个图书馆。

最贵重、最常用的几本书放在图书管理员桌上、伸手就能拿到——是内存。

借出去过、可能会再借的、放在借阅区开放书架上——是缓存。

冷门、古旧的、放在地下三层档案库里、要专门走流程才能调出来——是档案库。

读者每次来借书、图书管理员要能在三个地方间灵活调度——书一旦从档案库被频繁请求、就要预先调到开放书架上；某本桌上的书三个月没被碰、就放回开放书架。

MemGPT 给 AI 记忆设计了类似的三层——

**核心记忆**（core memory）——AI 跟你对话时、跟前文一起常驻在它的「视线范围」（context window、就是模型每次能看到的那段文字的上限）里、像图书管理员桌上的书。

**回忆记忆**（recall memory）——可以搜索的过去对话历史、像借阅区开放书架。

**档案记忆**（archival memory）——长期冷存储、像地下档案库——等到 AI 需要时再调出来。

⚠️ 这三层名 core / recall / archival 是业内通用复述、abstract 没直接列出、写时建议核论文 PDF §3.2

最关键的——这三层的搬运、由 AI agent 自己决定。它通过调用工具（tool call、就是模型生成一段标准格式的指令、外部程序去执行）告诉外部程序「把这条从档案搬到核心」或者「这条核心的可以归档了」。AI 自己当自己的图书管理员。

这个想法当年发表时、被视为一个浪漫的研究愿景——它把 AI 系统设计的方向、从「让模型记得更多」改成了「让模型自己管理记忆」。论文很快成为 AI 记忆这条研究线的开山作之一。

---

2024 年 9 月 23 日——一年后——Charles Packer 和 Sarah Wooders 把 MemGPT 商业化、成立 Letta、出 stealth、$10M 种子轮、Felicis 领投、Jeff Dean 个人投资。Letta 当时的产品定位写得很清楚——为 AI agent 提供「stateful（有状态）记忆」的基础设施、把 MemGPT 论文的思想做成开发者用的 SDK（一套代码工具包、让别的开发者能在自己的应用里直接调用）和服务。

同一时间段、整个行业开始卷 AI 记忆框架——

Mem0 —— 把 MemGPT 思想简化成轻量 API 层、走嫁接派（把记忆能力作为外挂、加进任何 AI 应用）。

Zep —— 走知识图谱派、强调记忆里实体之间的关系存储。

cognee —— 走 ontology（本体论）+ 知识图谱、给企业知识库做长期记忆。

Memary、LangMem、Supermemory、MemPalace——一个又一个围绕「让 AI 能跨 session 记得东西」的项目从 GitHub 上冒出来。

每家都在卷——谁的检索算法更好、谁的存储后端更高效、谁的抽象层更优雅、谁的 LongMemEval（一个长期对话记忆评测、500 题、6 类能力）跑分更高。

到 2025 年底、AI 记忆框架变成 GitHub 上最拥挤的赛道之一。

MemGPT 那个 OS 隐喻很漂亮。它让 AI 记忆这件事看起来像有标准答案的工程题、所有人都在比谁更精致。

---

## 04 Letta 是怎么自己拆台的

回到 2026 年 2 月 12 日 Letta 那篇 [Context Repositories 公告](https://www.letta.com/blog/context-repositories)。

这次它讲的不是「我们升级了 MemGPT 的检索算法」、不是「我们加了新的存储后端」、不是「我们又在 LongMemEval 上拿了几分」——它讲的是、**整套架构换了**。

新方案的核心——

每个 agent 都有一个本地的 memory 文件夹、就在你硬盘上的某个目录、文件夹里全是 markdown 文件、每个文件用 YAML frontmatter（一种在 markdown 文件最顶部用结构化数据描述这个文件元信息的格式）说明这个文件存的是什么。

整个文件夹用 git 做版本控制——每次 agent 改了某个文件、必须自己 commit + push（commit 是 git 里"保存这一版"的动作、push 是"把这版同步到中央仓库")、改动才会被「记住」。如果 agent 改错了、回滚到前一个版本就行——这是 git 几十年前就解决的事。

agent 操作记忆的方式——直接用 bash（命令行）操作这些文件。要找东西用 grep（一种纯文本搜索工具、是 Unix 几十年前就有的最朴素搜索方式）、用 glob（按文件名模式匹配的搜索）。要改东西用 sed（命令行文本编辑工具）、或者直接读完整个文件再写回去。

按 [Letta MemFS（memory filesystem）官方文档](https://docs.letta.com/letta-code/memory/) 自己的说法——

「currently only supports exact-match search (grep, glob) with no semantic/embedding-based search capability」

中文意思是——目前只支持精确匹配搜索（grep、glob）、没有任何基于语义或 embedding 的搜索能力。

embedding 是上一段讲到的「向量检索」——把文字压成一组数字、按数字距离判断意思相近——是过去两年所有主流 AI 记忆框架（包括 Letta 自己的旧版）的核心。

***Letta 公开宣布——它的新一代记忆系统、不要这个能力***。

---

为什么——不是技术上做不到。Letta 在公告里给出的解释、加上 production agent（指实际给真实用户跑起来的 AI 程序、对应"实验室 / 演示"的反义）这一年的实践、指向一组共同观察。

MemGPT 的 OS 类比当年很漂亮、但实际跑起来、agent 通过 tool call 调度三层记忆这件事、不是它的强项。模型擅长读文本、不擅长扮演图书管理员。把记忆做成它能直接 grep 的一个文件夹、它自己会用、不用专门学一套 memory API（API 是一种让两个程序对接的标准接口）。

AI 写记忆这件事最大的风险是它写错——把「这个项目用 Python 3.12」错记成「Python 3.10」、过几天才被发现。MemGPT 那套方案需要专门设计 self-correcting memory（自我修正记忆）的机制。git 解决这事的方式简单粗暴——回滚到上一个版本就好、commit history（git 自动保留的"每次改动 + 改动者 + 改动说明"的链条）天然就是审计日志。

production agent 又天然就在用 bash——读文件、跑命令、写文件、看 diff 这些都是它本职。把记忆做成它已经会的工具能操作的、比给它一套新 memory API 更顺手。

把这些放在一起——MemGPT 那套虚拟内存抽象、在 production 环境里是不必要的中间层。它解决的问题（context 装不下）、可以用更简单的方案解决（直接用文件、让 agent 自己读）。它制造的复杂度（学一套 memory API、信任 AI 当图书管理员）、不值得。

抛弃 MemGPT 这件事由 MemGPT 团队自己做出来、跟外部批评不是一个量级的信号。

---

## 05 Anthropic 给的一手答案

跟 Letta 自己拆台同步发生的另一件事——Anthropic 把头部 production AI 编程 agent 怎么做记忆、写在了官方文档里。

[Anthropic 的 Claude Code 官方记忆文档](https://code.claude.com/docs/en/memory) 写得清清楚楚——它的记忆系统就是两套机制——

**第一套 · CLAUDE.md 文件**——你（用户）写的、给 Claude 的持久指令。可以放在你项目根目录（`./CLAUDE.md`）、可以放在你用户目录（`~/.claude/CLAUDE.md`、这里 `~` 是 Unix 命令行里"你的用户主目录"的简写）、可以放在系统级目录给整个组织共享、可以放在 `./CLAUDE.local.md` 给本地开发用（不进 git）。

**第二套 · Auto Memory**——Claude 自己写的、基于跟你工作过程中识别出的有用信息（build 命令、API 路径、debug 经验等）。存在 `~/.claude/projects/<project>/memory/` 这个目录——是一个 markdown 文件夹、里面有一份 MEMORY.md（索引）+ 若干主题文件（debugging.md、api-conventions.md 等）。

加载方式按官方文档原话——

> The first 200 lines of MEMORY.md, or the first 25KB, whichever comes first, are loaded at the start of every conversation.

中文意思是——MEMORY.md 的前 200 行、或前 25KB（看哪个先到）、在每次对话开始时加载。

主题文件不预先加载——Claude 在工作过程中如果需要、用它的标准文件工具（read_file 这种）按需读取。

整个机制里、***没有向量数据库、没有图谱、没有 embedding、没有任何专门为「AI 记忆」设计的基础设施***。就是 markdown 文件加 Claude 自己的标准文件读取工具。

🔑 [Joy 待填：你读 Claude Code 源码看到的具体细节——加载逻辑在哪个文件、有没有 surprise、跟你预期的差异；这一段是 Joy 一手数据、本期唯一处出现、必须由 Joy 本人补]

---

跟 Auto Memory 配套的、还有一个 Anthropic 自己**没正式公告**、但社区扒到的功能——社区起名叫 [claudefa.st 上叫 Auto Dream](https://claudefa.st/blog/guide/mechanics/auto-dream)（自动做梦）。

⚠️ 这个名字是社区起的、Anthropic 官方文档里没有；它目前在 Claude Code 的 `/memory` 菜单里可见、但用 server-side feature flag（服务端的功能开关、可以让一部分用户先用上某功能）控制、还没对一般用户开放

它做的事——按 [claudefa.st 那篇社区分析](https://claudefa.st/blog/guide/mechanics/auto-dream) 拆解——是后台主动整理 memory 文件、四个阶段——

**Orient · 定位**——扫描已有的 memory 文件、给自己梳理一遍存了什么。

**Analyze · 分析**——翻 session 转录、找其中高价值的 pattern。

**Consolidate · 整合**——把新发现的合并进现有的主题文件、做关键维护：相对日期变绝对日期、删掉被新事实推翻的、移除过期、合并重叠条目。

**Prune & Index · 修剪和编排**——把 MEMORY.md 控制在 200 行以下（这是 Claude Code 启动时实际加载的阈值、超过的部分根本不会读）。

整个机制类比的是 [REM 睡眠的记忆巩固](https://en.wikipedia.org/wiki/Memory_consolidation)——人睡觉做梦时大脑也在做类似的事、把一天的经验整理、淘汰不重要的、合并相关的。

按 [Akita on Rails 那篇 2026-04-06 的深度分析](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/) 引用的 2026-03 Claude Code 源码 leak（Anthropic 不小心发布了一个 npm 包版本、暴露了 512,000 行 TypeScript 内部代码）推断——Auto Dream 这个子系统的实现就是 grep 搜 JSONL（一种结构化文本日志格式、每行一条 JSON）日志——纯文本操作、没用什么 fancy 的算法。

⚠️ 源码 leak 是 Akita 文章的二手转述、Joy 自己读过 Claude Code 源码、可在 🔑 那一段补一手 verify

---

放在一起看——

Claude Code 这套头部编程 agent、记忆系统是 markdown + 标准文件读取。Auto Dream 这个主动遗忘机制、底层是 grep on text logs。

Letta 自己拆掉的、是「AI 记忆需要一套专门设计的虚拟内存抽象」这个假设。Anthropic 是另一家头部 production 团队、从自己的产品经验出发、独立得出了同方向的判断——做记忆系统不需要「专门设计的虚拟内存抽象」。

两家不同方向走来、各自的实践指向同一件事——之前那些更复杂的方案是过度设计。

---

## 06 Mem0 的妥协是退潮的预告

Mem0 是这两年用得最多的 AI 记忆框架。[Mem0 GitHub repo](https://github.com/mem0ai/mem0) 调研时 54.6k stars（写时复核）、是 Y Combinator S24 的项目、走的是「轻量 API、嫁接到任何 AI 应用」的路线。

要先说清楚 Mem0 跟 MemGPT 的关系——Mem0 不是 MemGPT 论文一作的公司（那家是 Letta）。Mem0 是受 MemGPT 思想启发的另一派、不是「发明者」、也不是「直接产品化」。它代表的是另一类——基于 MemGPT 范式做出来的下一代框架。

Mem0 的初代设计——以向量检索为核心。

向量检索（vector retrieval / semantic search）是过去两年最热的检索方式——把每段记忆压成一组数字（向量、几百到几千维）、按这组数字之间的距离判断「意思相不相近」——距离近的就召回。它的优势是——能处理「用户问的‘咖啡’跟记忆里的‘拿铁’其实是同一类」这种语义相关性、比纯文本匹配（BM25 那一类）灵活。

2026 年 4 月、Mem0 升级了它的核心算法——按官方说法、新版是 hybrid retrieval（混合检索）：semantic（语义）+ BM25（基于词频的传统搜索）+ entity matching（实体匹配）三种信号并行打分、融合输出。

LongMemEval 上 Mem0 拿到 93.4 分、对比上一版 67.8 分——提升 25.6 分。LoCoMo（另一个长对话评测）拿到 91.6 分、提升 20.2 分。这是 AI 记忆赛道近两年最快进步的一段时间。

---

但这版升级里有一个细节、值得注意——

按 [Mem0 graph memory 文档](https://docs.mem0.ai/platform/features/graph-memory) 自己的说法——文档里关于这个变更有两点关键事实：旧版搜索结果里的 relations 字段不再返回数据；entity relationships are consumed indirectly through retrieval ranking, not exposed as a queryable graph structure。

中文意思是——实体关系不再以可查询的图结构暴露、而是间接通过检索打分被消费。

也就是说——Mem0 的「图谱」在新版里、不是给查询者直接走的图、而是退到后台、当作打分时的一个信号源。

***不是去掉了图、是把图退到了信号层***。

---

这个妥协是这一波框架退潮的预告——比 Letta 那则公告早 2 个月、可以当预演看。

向量这条路独走不通——长 context（直接把所有记忆塞进 prompt）+ BM25（传统词匹配）在事实召回上经常赢过纯向量。

纯图也走不通——从对话流里抽实体和关系（NER + Relation Extraction、自然语言处理里的两个经典任务）这一步本身准确率不高、抽错的关系会污染整个图。按 [HotpotQA 多跳问答 leaderboard](https://hotpotqa.github.io/) 上 2024-2025 的成绩、连最强的模型在多跳实体抽取上也只能做到 ~85% F1（一种衡量准确率的综合指标、范围 0-100）——剩下 ~15% 是抽错的。

最后变成 hybrid 这种"三种信号融合"——是工程妥协的体面收尾。

---

向量对关系无能、最干脆的例子是这个——也是行业里讲解多跳推理（multi-hop reasoning、要在多个事实之间转两次或更多次才能答出来的问题）的标准例子。

你的记忆库里存了两条——

「张三认识李四」

「李四在 C 公司」

你问 AI——「张三跟哪家公司有关系？」

向量检索是这样工作的——把「张三」压成一组数字、把所有记忆条目也压成数字、按距离排序找最近的几条。

问题是——「张三」在向量空间里跟「李四在 C 公司」这条距离根本不近——因为这条文本里压根没出现「张三」、向量层面就跟「张三」不像。「张三认识李四」这条会被找出来、但只用这一条 AI 回答不出问题——它不知道李四在哪家公司。

知识图谱是这样工作的——张三是一个节点、李四是一个节点、C 公司是一个节点。「认识」是张三到李四的连线、「任职于」是李四到 C 公司的连线。问「张三跟哪家公司有关」——从张三这个节点出发、沿「认识」走到李四、再沿「任职于」走到 C 公司——答案直接就到。

向量擅长找「意思相近的内容」。图谱擅长追「实体之间的关系链」。需求层面就不是同一类。

但图谱建图本身有 ~15% 错误率——抽错了「李四在 C 公司」记成「李四在 D 公司」、查询时图谱给你的答案就是 D 公司——错得理直气壮、还看不出来错在哪。

[Akita on Rails 那篇 2026-04 的文章](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/) 给的最干脆的判断是这样——

> When BM25 misses, you know why: the word isn't there. When a vector DB returns garbage, you get a plausible-looking wrong chunk, with no diagnostic signal at all.

中文意思是——BM25 没找到、你知道为什么（这个词不在记忆里）。向量库返回错的、你看不出哪里错（拿到的是「看上去合理但实际是错的」那种内容、连诊断信号都没有）。

可解释性是 BM25 派的核心优势——失败你看得见。这件事在 production 比「召回率高几个点」重要得多。

---

Mem0 把图退到信号层、不是技术问题——是产品判断。

它承认——一个直接暴露给查询的图、对用户来说不好用（错的看不出来）、对开发者来说不好维护（建图错了影响所有查询）。把它退到后台当信号、是把不可信的能力转成辅助打分——是工程妥协的体面方式。

---

## 07 这一层为什么退回

把三件事并排放——

Letta 抛弃 MemGPT 退回 git markdown。

Mem0 把图退到后台信号层、不再暴露给查询。

Anthropic 一手文档显示 Claude Code 用纯 markdown + 标准文件工具。

三件事指向同一个方向——AI 记忆这一层、正在退回最朴素的「文件 + 文本搜索」。

为什么——三层原因。

---

**第一**：长 context 的反扑。

[Claude Sonnet / Opus 1M token 上下文已 GA](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)（GA = General Availability、正式对所有用户开放）、Gemini 2.5 Pro 2M token、GPT-5.4 400K token——过去两年最大的模型升级之一、是 context window（每次推理能看到的文字量上限、token 是 AI 模型的处理单位、可以粗略当成"半个汉字"或"一个英文音节"）从 4K-32K 涨到几百万。

⚠️ 长 context 数字写时再核

原本属于「记忆框架」该解决的核心问题——「context 装不下、所以要外面有个智能记忆系统」——被模型本身吃掉一大半。直接把所有相关记忆塞进 prompt、跟搞一套精致的检索系统比、在事实召回上经常前者赢。

这件事改写了「AI 记忆」这个问题的难度——它从「设计一个能压缩 + 检索的智能记忆系统」、退化成「设计一个把对的文件交给模型的简单方案」。

但长 context 不是免费——按 [Akita on Rails 那篇](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/) 给的数据、200K tokens 一次推理 Claude Sonnet 4.6 收 $0.63、有缓存的 follow-up 降到 $0.10——比一次纯向量检索贵几十到几百倍。延迟也成数量级增加。所以长 context 不是把所有问题都吞掉、是吞掉了「context 装不下」这个特定的痛点；成本和延迟敏感的场景仍然有 RAG / 记忆这类辅助检索的位置。

---

**第二**：模型自己读 markdown 比走抽象层快。

一旦 agent 能直接 grep / glob / 读 markdown——为它专门做的 memory API 就成中间层。增加学习成本、增加调试成本、增加抽象漏洞——不增加能力。

Letta 抛弃 MemGPT 抽象、Anthropic 不给 Claude Code 加任何 memory 抽象、都是这个判断。

---

**第三**：production 团队都在自建。

Anthropic、Cursor、Letta、Mem0——头部跑 production AI agent 的团队、记忆系统都是自家做的；Letta 和 Mem0 自家也是产品级别的自建实现（它们自己就是 framework、但产品里用的不是别家的 framework）。

[LangChain 在 2025 那篇 「Your harness, your memory」](https://www.langchain.com/blog/your-harness-your-memory) 里把 harness 跟 memory 绑在一起讨论、判断也是同方向——记忆没有跨产品的通用方案。

framework 给的是通用解、production 要的是具体解。每家产品的记忆都是「具体」问题——为这个产品场景、为这种用户、为这类工作流——通用框架在 production 永远会差一截。

---

把三层原因加起来——AI 记忆框架这一层退回的不是「方向错了」、是「市场不在那」。

复杂的检索算法 + 漂亮的抽象 + 跨模态的统一 API——这些是给「通用框架」准备的能力。

***但 production 不要通用——production 要具体***。

---

这件事对你的意义、按场景分——

**如果你在做单用户、本地、单设备 agent**——直接 markdown + 文件搜索。参考 Claude Code 的设计——一份 CLAUDE.md（你写的）+ 一份 MEMORY.md（让 AI 自己写的、限制在 200 行内）+ 几个主题 markdown 文件。Postgres + pgvector 是过度设计。

**如果你在做多用户、需要权限和审计**——必须上数据库 + 权限模型。Mem0 比裸搭快、但用之前确认你的需求对得上 Mem0 的能力——hybrid retrieval 对事实召回够、复杂关系查询要单独看。

**如果你在做 agent 自管理 + 跨 session 学习**——Letta MemFS（git-tracked markdown）这条路适合。git 版本控制天然解决 AI 写错记忆的回滚问题。

**如果你在做超大规模 + 跨多团队**——需要自建。开源框架在这个体量都会撞瓶颈。Anthropic Managed Agents、Cursor、ChatGPT 这一档全是自研。

---

回到 2026 年 2 月 12 日 Letta 那个公告。

那一天 Letta 在公告里只用「prior approach」四个字、给过去两年所有押注 AI 记忆框架的赌局判了死刑。

这一层的工程教训简单——它的发明者已经告诉你、答案不在他们一开始的方案里。

---

## 参考资料

一手 ·

- [MemGPT 论文 · *Towards LLMs as Operating Systems* · arxiv 2310.08560](https://arxiv.org/abs/2310.08560)
- [Anthropic Claude Code 记忆官方文档](https://code.claude.com/docs/en/memory)
- [Anthropic Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Letta Context Repositories 公告 · 2026-02-12](https://www.letta.com/blog/context-repositories)
- [Letta MemFS 文档](https://docs.letta.com/letta-code/memory/)
- [Mem0 GitHub repo](https://github.com/mem0ai/mem0)
- [Mem0 论文 · arxiv 2504.19413](https://arxiv.org/html/2504.19413v1)
- [Mem0 graph memory 文档](https://docs.mem0.ai/platform/features/graph-memory)
- [Letta GitHub](https://github.com/letta-ai/letta)
- [Letta-Code · the memory-first coding agent](https://github.com/letta-ai/letta-code)
- [Letta 出 stealth · TechCrunch 2024-09-23](https://techcrunch.com/2024/09/23/letta-one-of-uc-berkeleys-most-anticipated-ai-startups-has-just-come-out-of-stealth/)
- [LongMemEval 论文 · arxiv 2410.10813](https://arxiv.org/pdf/2410.10813)
- [LoCoMo 基准 · Snap Research](https://snap-research.github.io/locomo/)

二手 / 强分析源 ·

- [Akita on Rails · *Is RAG Dead? Long Context, Grep, and the End of the Mandatory Vector DB* · 2026-04-06](https://akitaonrails.com/en/2026/04/06/rag-is-dead-long-context/)
- [Auto Dream 社区分析 · claudefa.st](https://claudefa.st/blog/guide/mechanics/auto-dream)
- [LangChain · Your harness, your memory](https://www.langchain.com/blog/your-harness-your-memory)
- [HotpotQA 多跳问答 leaderboard](https://hotpotqa.github.io/)

接续 ·

- [004 期 · 让 AI 真正能干活的不是模型、是 harness](../004-harness/draft.md)

— 完 —

> \#AI #记忆系统 #Letta #MemGPT #agent
