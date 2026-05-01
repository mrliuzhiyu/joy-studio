# 前端、后端、PM 正在塌缩成一个岗位

从 vibe coding 到 SDD，AI 时代的开发流水线正在被重新装配

2026 年初，得物把独立的前端部门拆了，并入一个新成立的 AI 全栈团队（[得物前端并入 AI 全栈部门 · gitcode csdn](https://gitcode.csdn.net/69b2699f0a2f6a37c596c871.html)）。国内大厂里第一家公开做这件事。

不是孤例。美国劳动统计局把软件相关岗位拆成两类做就业统计：programmer 是按既定规范写代码的执行型岗位，software developer 是做架构、定方案、解决复杂问题的设计型岗位。2023 到 2025 三年，前者掉了 27.5%，后者只掉了 0.3%。前者的跌幅是后者的 90 倍。同期国内头部公司的纯前端岗位减少了 40% 以上，全栈、AI 全栈、agentic engineering 类岗位翻了三倍（数据转述自 [InfoQ "前端已死"是危言耸听吗](https://www.infoq.cn/article/syoqdk2chqym37kprebi)、[大厂 CIO 独家分享：AI 如何重塑开发者未来十年 · InfoQ](https://www.infoq.cn/article/kjoqp8efou9wguktr26f)）。

让流水线塌方的不是 AI 本身。AI 写代码这件事已经发生了三四年——从 2021 年 GitHub Copilot 公测，到 2023 年 ChatGPT 引爆 vibe coding，到 2024 年 Cursor 成为很多团队的标配——这中间前端没塌、后端没塌、PM 也没塌。AI 生成代码的能力是连续提升的，但流水线的塌方是离散的，发生在 2025 到 2026 这个窗口期。

让它塌的是 SDD（Spec-Driven Development，规范驱动开发）——一种 2026 年才真正成形的新开发范式。GitHub 在 2025 年发布的同名工具集 Spec Kit 已经有 92k star（[github/spec-kit](https://github.com/github/spec-kit)），AWS 把它做成了一个独立 IDE 叫 Kiro（[Kiro 官网](https://kiro.dev/)），阿里 2025 年 8 月发布的 Qoder 内置了同样的工作流（[Qoder 负责人揭秘](https://www.cnblogs.com/alisystemsoftware/p/19121515)），腾讯云的 CloudBase AI Toolkit 直接复刻了 Kiro 的命令格式（[Spec 工作流文档](https://docs.cloudbase.net/en/ai/cloudbase-ai-toolkit/spec-workflow)）。半年内这条赛道从一个 GitHub 实验变成了行业默认配置。

这篇文章把四件事讲清楚：SDD 到底是什么、为什么过去 12 个月所有大厂都在押注它、它会不会变成下一个失败的方法论（已经有不少人在指控它就是瀑布回潮）、以及最后一个落地的问题——你现在该怎么做。

---

## 01 得物把前端部门并进了 AI 全栈

把视角拉回到具体的组织调整上。

得物的前端团队在 2024 年还是公司里最庞大的工程序列之一，原因符合大多数 to C 互联网公司的常规——多端、多业务线、视觉密集、迭代频繁。前端的核心价值是把 PM 给的需求 + 设计师给的稿子，转化成用户实际看到的页面，并跟后端联调好接口。这条价值链清晰、稳定，过去十年没怎么变过。

2026 年初这个部门被整体拆掉了。前端工程师没被裁，他们被并入一个新成立的 AI 全栈团队。换句话说，岗位编号没消失，但岗位定位变了——他们不再做把设计稿翻译成 UI 代码这件具体的事，而是用 AI 工具完成从需求到上线的全栈交付。

这个调整不是孤例。同期国内头部公司的招聘市场上，纯前端岗位减少了 40% 以上，与之相对的全栈、AI 全栈、agentic engineering 这类岗位翻了三倍。美国劳动统计局把软件相关岗位拆成 programmer 和 software developer 两类——前者按既定规范写代码、后者做架构和设计——2023 到 2025 三年，前者掉了 27.5%，后者只掉了 0.3%。同样的趋势在国内国外同步发生。

这种数据告诉我们的不是前端这个工种死了——前端工程师还在变多——而是 PRD 到设计到前端到后端这条传统流水线本身在塌方。

为什么塌？

最朴素的解释是 AI 替代了某些岗位。这个解释不够。AI 写代码这件事已经发生了三四年。GitHub Copilot 2021 年 6 月公测，那是大模型辅助写代码这件事第一次进入主流视野。2023 年 ChatGPT 把 AI 写代码这件事变成了任何一个有 OpenAI 账号的人都能做的事。2024 年 Cursor 把 AI 编辑器这件事推到了产品化的程度，成为很多团队的标配。三年下来 AI 生成代码的质量、速度、可控性都在连续提升。

但这三年里前端没塌、后端没塌、PM 也没塌。组织结构基本上保持原样——大厂还是按 PRD/设计/前端/后端拆活，独立工种各自有清晰的 KPI 和晋升通道。

如果 AI 替代是塌方的原因，2025 到 2026 这个窗口期发生了什么特别的事，导致塌方在这个时间点突然加速？

发生的特别的事就是 SDD 这个范式在 2025 年下半年到 2026 年初的工业化。AI 编码能力到了一个新阈值——能基于结构化规范、在数小时甚至数天的连续工作内，自主完成中等复杂度的功能开发。在这个能力之前，AI 是一个高效的代码补全器；在这个能力之后，AI 是一个可以独立交付任务的虚拟工程师。这个能力跃迁让人类的角色从写代码的执行者变成定义规范的设计者。一旦工种的本质变了，按工种拆分的组织结构就开始失效。

得物砍前端部门只是这个失效的第一个公开样本。

接下来这篇文章想讲清楚四件事。SDD 到底是什么；为什么过去 12 个月所有大厂都在押注它；它会不会变成下一个失败的方法论（已经有不少人指控它就是瀑布回潮）；以及最后一个落地的问题——你现在该怎么做。

---

## 02 SPEC 是什么，SDD 是什么

要理解 SDD，得先把 SPEC 这个词说清楚。

SPEC 不是 PRD。

PRD 是产品文档，目的是让 PM、设计师、前端、后端、测试这五种人对一个功能形成共同的理解。它的写作对象是人，文风是叙事，验收靠会议——一群人坐在一起对着 PRD 逐条过，过完意见统一，开始拆活。

SPEC 是规范，目的是让 AI agent 不带歧义地把一个意图落实成可运行的代码。它的写作对象是 AI，文风是结构化（自然语言 + 约束 + 测试条件 + 边界场景），验收靠跑测试——agent 拿 SPEC 生成代码，跑预设的测试，挂掉的部分回头改 SPEC 或者改实现。

PRD 写完会被存进语雀或者 Confluence，主要供后人查阅。SPEC 写完会被 AI agent 拿去执行，生成代码、跑测试、改了再生成。它跟代码的关系，更接近源码跟编译产物的关系。

SDD（Spec-Driven Development）就是基于这个区分的开发范式。一篇 2026 年 2 月发表的立场论文（[Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants, arXiv:2602.00180](https://arxiv.org/abs/2602.00180)）把这个范式的核心定义为：把规范当成单一真源，代码作为生成或验证的次级产物。

跟传统流程比，这是一种反转。

传统流程里，代码是真源——它可以编译、可以测试、可以被版本控制；文档是注解，是给后人理解代码用的辅助物。文档过期不影响系统运行，代码过期则会导致 bug。SDD 反过来，规范是真源——它定义系统应该做什么、约束是什么、边界场景如何处理；代码是从规范派生出的可运行产物。规范变了，代码就要重新生成。

这个反转在 2026 年才真正在工业界成立，原因不是哲学上的进化，是工程上的能力点突破。AI agent 在 2025 年达到了一个新阈值——能够基于结构化规范、在数小时甚至数天的连续工作内，自主完成中等复杂度的功能开发，包括理解上下文、设计架构、写代码、跑测试、修 bug、提交 PR。在这个能力之前，规范驱动是纸上谈兵——你写了规范也没人执行；在这个能力之后，规范是给 AI 跑的程序，规范的精度直接决定系统的精度。

学术界把 SDD 分成三个层次。Martin Fowler 站点上一篇详细的工具对比文章（[Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)）梳理了这三层：

**spec-first**：编码前先写规范，规范引导开发，代码仍然是真源。这一层最低，最容易做，门槛最浅。今天大部分开始尝试 SDD 的团队都停在这一层。

**spec-anchored**：规范在功能演进过程中持续维护，跟代码双向同步。规范变了代码要更新，代码改了规范也要回写。这一层比第一层难，需要工具链支持双向同步。

**spec-as-source**：规范本身就是源文件，代码是从规范自动生成的产物，理论上不应该被人手动编辑。这一层最激进，目前只有 Tessl 等少数厂商在认真追求。

鄙视链从左到右递增，工程难度也是。但 Martin Fowler 那篇文章里有一句话冷得让人后背发凉：模型驱动开发（MDD）二十年前就尝试过把规范作为源文件，惨败收场——规范在工业界从来没能真正取代代码。如今把 LLM 的非确定性叠加上 spec-as-source，可能同时继承 MDD 和 LLM 双方的缺点。这个警告很真实，第 6 章会回来处理。

![传统 PRD-前端-后端 流水线 vs SDD 流程对比图（占位 · 见 assets/diagram-1-traditional-vs-sdd.html）](assets/diagram-1-traditional-vs-sdd.html)

为什么 SDD 这个范式 2026 年才真正成立？三个原因交汇在一起。一是 AI agent 的能力到了能自主完成中等复杂度任务的槛；二是 vibe coding 在过去一年里暴露了所有无监督执行的故障模式；三是大厂被市场推着工业化——你不能跟客户说我用一个不可审、不可复现的方法生成了你的核心系统。这三件事的合流催生了 SDD 这个新范式从 2025 年下半年开始在工业界快速落地。

理解第二件事——vibe coding 这一年里发生了什么——是理解 SDD 为什么这个时间点出现的关键。

---

## 03 vibe coding 一年生命周期

vibe coding 这个词的诞生有个准确日期：2025 年 2 月 2 日。

那天 Andrej Karpathy 在 X 上发了一条他自己后来说是 shower thoughts throwaway tweet 的推文（[原帖](https://x.com/karpathy/status/2019137879310836075)）。原话：There's a new kind of coding I call vibe coding, where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.

中文意思大致是：有一种新的编程方式我叫它 vibe coding——完全跟着感觉走、拥抱指数曲线、忘掉代码本身的存在。

具体描述更激进。Karpathy 说他写代码的方式是：跟 AI 提需求，AI 给方案，自己不看 diff、全部接受，遇到错误就把错误信息复制粘贴回去给 AI，让 AI 自己改，整个过程几乎不读代码。

这条推文当时让很多人皱眉。一个 OpenAI 联合创始人、Tesla 自动驾驶前负责人、深度学习教育界最有影响力的人之一，公开倡导一种不审代码的开发方式？很多资深工程师在 X 上反对，说这是不负责任。

但接下来一年，vibe coding 这个词以一种谁都没料到的速度渗透了整个软件行业。Collins Dictionary 把它评为 2025 年度词汇。一份业内调研显示 92% 的美国开发者用过这种工作方式（[Andrej Karpathy Vibe Coding · Klover](https://www.klover.ai/andrej-karpathy-vibe-coding/)）。学术界专门发了论文研究它（[Vibe coding · arXiv:2506.23253v1](https://arxiv.org/html/2506.23253v1)）。Cursor、Windsurf、v0 这些工具的用户增长曲线，本质都是 vibe coding 的工具化承接。

我自己也是 2025 年中开始用这种方式做侧项目。一个周末就能搭一个完整的 web 应用——前端 React、后端 Node、数据库 SQLite、UI 用 shadcn——以前一周才能做完的东西，现在一晚上做完。那种快感很难形容，像突然从骑自行车换到了开高铁。

但 vibe coding 火的同时，问题也在累积。

最致命的问题是 Karpathy 那句 forget that the code even exists。当你不读 AI 写的代码时，你没法判断它对不对。短期内 AI 写的小工具看上去能跑，长期看你交付的是一堆你自己也不理解的代码。代码不可审，意味着出 bug 时你不知道从哪查；代码不可复现，意味着同样的 prompt 下次给可能给出不一样的结果；代码不可协作，意味着团队里没有第二个人能接手维护。

到了 2025 年下半年，业内开始大量出现 vibe coding 翻车事件。开发者用 vibe coding 搭出来的 SaaS 应用上线后被发现有严重的安全漏洞，因为 AI 默认把数据库密码硬编码在前端代码里。某个独立开发者把整个 vibe coded 项目的源码上传到 GitHub，被网友发现里面有数十处暴露的 API key。我自己也踩过坑——一个看上去能跑的小程序，上线后才发现 AI 自动加了一个永远会通过的 admin 验证逻辑，因为它不知道那是测试代码不应该上生产。

Gartner 在那段时间发出预测：到 2027 年，1/4 的生产环境缺陷将源于 AI 生成代码（数据见 [Five AI Realities with Tessl's Guy Podjarny · GV](https://www.gv.com/news/five-ai-realities-with-tessl-guy-podjarny)）。这个数字对企业级客户来说是无法接受的，对创业公司来说是迟早要还的债。

到了 2026 年 2 月 4 日——恰好是 vibe coding 这个词发明一周年的祭日——Karpathy 自己亲手宣告它过时（[原帖](https://x.com/karpathy/status/2026731645169185220)）。完整原话：

Many people have tried to come up with a better name for this to differentiate it from vibe coding, personally, my current favorite is agentic engineering. Agentic because the new default is that you are not writing the code directly 99% of the time, you are orchestrating agents who do and acting as oversight. Engineering to emphasize that there is an art & science and expertise to it.

中文意思：很多人在试图给这种新的工作方式起一个比 vibe coding 更准确的名字——我目前的首选是 agentic engineering。agentic 因为新的默认是 99% 的代码不是你直接写的，是你在编排 agent 去写，并作为监督方；engineering 是为了强调这件事有它自己的艺术、科学和专业性。

这条新推文跟一年前那条的根本区别是 acting as oversight 这五个字。

vibe coding 的关键词是 forget——忘掉代码、忘掉细节、跟着感觉走。agentic engineering 的关键词是 oversight——监督代码、监督 agent、保持判断力。新范式不再要求人完全脱手，而是要求人作为最后一道把关。Karpathy 这一年里看到的就是 vibe coding 在工业级场景里的反复翻车，逼他从 forget 转到 oversight。

这个转折直接催生了 SDD 这个范式的工业化。如果 agentic engineering 是新的工作方式，它必须有一个工业化的方法论——如何让 agent 在监督下稳定生产可上线的代码？答案就是 SDD：把人的监督前置成结构化的规范，而不是事后的代码审查。规范在前，agent 在中，监督在后——这就是 agentic engineering 时代的标准工作流。

![Karpathy 2025-02-02 vibe coding 原帖 vs 2026-02-04 agentic engineering 帖横向对比（占位 · 待手动截图）](assets/karpathy-tweets-comparison.png)

---

## 04 大厂在过去 12 个月做了什么

agentic engineering 是范式名，SDD 是方法论。要在工程上落地，必须有一个具体的工作流——一组清晰的步骤、一组对应的工具、一种可被团队复制的协作方式。这件事过去 12 个月在大厂一波一波地完成了。

最早动手的是 GitHub。2025 年 9 月发布的 Spec Kit（[GitHub Blog · Spec-driven development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)、[github/spec-kit](https://github.com/github/spec-kit)）是一个轻量的 CLI 工具集，定义了六个核心命令：

- `/speckit.constitution` 建立项目宪法（项目的不变约束）
- `/speckit.specify` 写功能规范
- `/speckit.plan` 制定技术实现方案
- `/speckit.tasks` 生成可执行任务清单
- `/speckit.implement` 让 agent 实现
- `/speckit.clarify`（可选）澄清规范里模糊的地方

Spec Kit 不绑定具体 IDE，支持 30 多种 AI agent，包括 Claude Code、Cursor、Copilot、Cline、Codex 等等。半年时间它在 GitHub 上拿到了 92k star，是这个赛道公认的起点。

紧跟着是 AWS。2025 年中发布的 Kiro（[Kiro 官网](https://kiro.dev/)、[Introducing Kiro](https://kiro.dev/blog/introducing-kiro/)）把 SDD 做成了一个独立的 IDE，基于 Code OSS 改造。Kiro 的工作流被压缩成三个核心 Markdown 文件：requirements.md（需求）、design.md（技术方案）、tasks.md（拆解后的任务清单，通常 25 步以上）。这三个文件先经人工 review、approve，agent 才开始 implement。Kiro 还独创了一套 Hooks 机制——文件保存、PR 打开、仓库变更等事件可以触发预定义的 agent 动作（重新生成测试、更新文档、级联更新规范），把传统 CI/CD 的自动化能力直接嵌入本地开发循环。这是 Kiro 跟其他工具最显眼的差异——它不只是把 SDD 做出来，它把围绕 SDD 的工程师日常自动化掉了。

国内第一个跟进的是阿里。2025 年 8 月 22 日发布的 Qoder（[Qoder 负责人揭秘](https://www.cnblogs.com/alisystemsoftware/p/19121515)）号称中国首个 agentic coding 平台。Qoder 的核心 Quest Mode 就是 spec 驱动（[Quest Mode 任务模式文档](https://caug.cn/docs/quest-mode)）——开发者用自然语言描述意图，Quest Mode 自动识别缺失信息、补全规范、拆解子任务、调用工具完成编码、跑测试、自动修复 bug。Qoder 的整体设计参考了 Kiro，但做了中国市场需要的本地化适配，包括对国产模型的支持、对国内云原生工具链的集成、对中文规范文档的优化。

腾讯云走得更直接。CloudBase AI Toolkit（[Spec 工作流官方文档](https://docs.cloudbase.net/en/ai/cloudbase-ai-toolkit/spec-workflow)、[GitHub](https://github.com/tencentcloudbase/cloudbase-ai-toolkit)）的 Spec 工作流被官方文档明确说成是 Kiro 风格——同样的 requirements.md / design.md / tasks.md 三件套结构、同样的命令前缀（`/spec` 进入规范模式、`/no_spec` 跳过规范直接编码）。腾讯云没有藏着掖着，直接把这套工作流当成产品基础能力开放给国内开发者。

最激进的是 Tessl。Snyk 创始人 Guy Podjarny 离开自己创办的安全独角兽后，去年专门做了一家公司叫 Tessl，刚拿了 1.25 亿美元 A 轮（投资方包括 Index Ventures、Accel、GV、boldstart Ventures，[融资报道见 Calcalist](https://www.calcalistech.com/ctechnews/article/i7ucn8teu)）。Tessl 不做工具集、不做 IDE，他们做的是一整套 spec-as-source 框架——你写完 spec，框架直接维护从 spec 到代码的双向映射，代码上明确标注 generated from spec, do not edit manually。这是 SDD 三层级里最激进的一层，也是 Martin Fowler 站点警告"可能继承 MDD 失败"的那一层。Tessl 是这个豪赌唯一的认真选手。

社区层面有两个值得记住的项目。

一个是 OpenSpec（[Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)），核心理念叫 delta isolation——每次需求变更不重写整个 spec，只描述本次的 ADDED / MODIFIED / REMOVED Requirements，把每次变更隔离成一个独立的 mini-project，最后合并。这个设计精明地避开了瀑布最大的 BDUF（Big Design Up Front）陷阱，第 7 章会回来讨论它的意义。

另一个是 cc-sdd（[gotalab/cc-sdd](https://github.com/gotalab/cc-sdd)），日本开发者 gotalab 做的，3.2k star。它不是新工具，是一个适配层——把 Kiro 风格的 SDD 工作流打包成可在 Claude Code、Codex、Cursor、Copilot、Windsurf、OpenCode、Gemini CLI、Antigravity 这八种 agent 上一键启用的 skill 集合。换句话说，你不必装 Kiro IDE，也能在你已经在用的 agent 里跑同样的 SDD 工作流。

![六家工具工作流并排对比（占位 · 见 assets/diagram-2-six-tools-compare.html）](assets/diagram-2-six-tools-compare.html)

把这六家放一起看，最显眼的不是它们各自的差异，是它们的相似度。GitHub、AWS、阿里、腾讯、社区——五种背景、四个国家、不同时间点的发布——居然不约而同收敛到了同一套结构：requirements / design / tasks 三件套 + 人工审批节点 + agent 自主实现 + 测试反馈循环。Tessl 略偏一个方向，但本质上是同一套结构推到 spec-as-source 层。

这种收敛不是抄袭。GitHub Spec Kit 的 README 上有一段话写得很直白：specifications become executable, directly generating working implementations rather than just guiding them. 当你接受这个核心命题后，requirements / design / tasks 几乎是唯一合理的拆解。这是 AI agent 编码的工业化必然产生的形态，跟工厂分工的标准化是同一种逻辑——一旦生产方式定下来，组织形态就只能长成那个样子。

Gartner 那条 1/4 生产缺陷将源于 AI 生成代码 的预测，正在以一种很现实的方式被这个行业吸收——它正在被定位成 SDD 必须解决的问题。SDD 不是某种学术派的乌托邦，是行业为自己未来三年的 AI 代码生产设计的工业级防御方案。

但它真的能解决问题吗？接下来几个月里出现了大量质疑这件事的声音，他们的论点不能简单否定。

---

## 05 SDD 不是普世工作流

我用 SDD 跑过几次之后的判断很清楚：它不是新一代默认开发范式，是给特定象限准备的工具。错的象限上硬用，要么仪式过载、要么变成 markdown 形态的瀑布。

下面三种场景的体验完全不一样。

### 简单项目：SDD 是仪式过载

单文件、单一职责、自己用、不上生产的小工具——SDD 在这种场景上代价大于收益。

constitution / specify / clarify 三步加起来比直接写代码慢得多，clarify 里 AI 反复问的边界条件你大半根本不在乎，spec 里大半篇幅是你读完没感觉的扩展约束。最后输出的代码 + 测试覆盖看上去工整，但你本来就不需要测试覆盖——这种工具一周用一次，出错重跑就是了。

vibe coding 五分钟拿到一个能跑的版本，反而是这种场景的最优解。

### 复杂项目：SDD 的约束开始救你

多模块、多边界、上生产、需求相对稳定的项目——SDD 在这种场景上是真救命。

你心里清楚每个模块的规则，但拼在一起的边界情况会多到一边写一边漏。直接 vibe coding 的话，你能预想到 Claude 写到一半你就会开始抓狂——一个个补漏、回头改设计、来回返工。

SDD 的强约束在这种场景下从负担翻成保护。constitution 阶段你写的几条规则会在后续 plan 和 implement 阶段被 Claude 自己引用、自己检查；specify 阶段 AI 会主动列出你没想到的 user story；clarify 阶段问的那些问题，至少一半是你直接 vibe coding 一定会写到一半才发现、然后倒回去改设计的那种问题。

多花的时间换的是没漏关键场景的稳定。

### 中间地带最难

需求变更频繁的中型项目是 SDD 最尴尬的象限。

spec 写完之后甲方加一个需求，spec / plan / tasks 三个文档要回头改一遍。这本来应该是 SDD 的优势——spec 是活契约可以重写——但每次重写都要再跑一遍 plan / tasks 把上下文重新铺开。这种写完一次还能用很久的前期成本，在频繁变更下被摊薄。

变更越频繁，SDD 的 ROI 越差。这种场景里 spec 永远跟不上现实，每次同步 spec 的成本超过省下来的 oversight 成本。这种活反而该回到 vibe coding 加严格 PR review 的老路。

### 我现在的决策树

| 项目特征 | 做法 |
| --- | --- |
| 单文件、自用、不上生产的小工具 | vibe coding |
| 多模块、多边界、上生产、需求相对稳定 | SDD 全套 |
| 需求变更频繁的中型项目 | vibe coding + 严格 PR review |
| 不知道复杂度的探索性项目 | 先 vibe coding 摸边界，摸清楚后视情况转 SDD |

跟那些 GitHub 上写 SDD 是新一代默认开发范式的文章比，这个判断保守得多。SDD 是给复杂、稳定、上生产这一象限准备的工具。

回到第 4 章那六家工具的工作流——它们都默认你的项目处在这个象限。如果你不在这个象限，工具再好也救不了你。

---

## 06 SDD 是不是又一次瀑布

读到这里你可能会有一个直觉的反应：把规范放到代码前面、要求人工审批、流程化分阶段执行——这听起来跟瀑布开发有什么本质区别？

这个反应不是你一个人的。国际开发社区在 2025 年下半年到 2026 年初已经吵了一波。Hacker News 上一篇 800+ 赞的热帖标题就是 Spec-Driven Development: The Waterfall Strikes Back（[HN 帖子](https://news.ycombinator.com/item?id=45935763)）。法国软件咨询公司 Marmelab 写了一篇同名长文（[Marmelab 文](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)）。Medium 上有篇直白叫 Spec-Driven Development Is Waterfall in Markdown（[Medium 文](https://medium.com/@iamalvisng/spec-driven-development-is-waterfall-in-markdown-e2921554a600)）。

这类质疑里数据最硬的是 Scott Logic 公司技术总监 Colin Eberhardt 的一次实测（[Scott Logic 原文](https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html)）。他用同一个开发任务跑了两次。一次走完整 Spec Kit 工作流（constitution → specify → plan → tasks → implement），一次用普通的迭代式 prompt（直接跟 AI agent 对话写代码）。结果是这样：

- **SDD 工作流**：33.5 分钟 agent 执行时间 + 3.5 小时人工审查 ≈ 4 小时
- **常规迭代**：8 分钟 agent 时间 + 15 分钟代码审查 ≈ 23 分钟

SDD 慢了 10 倍。生成的代码量是 689 行，生成的 markdown 文档是 2577 行——文档量是代码的将近 4 倍。Eberhardt 的原文判断很狠：Spec Kit drags you right back into the past（Spec Kit 把你直接拽回过去）。

更扎心的吐槽来自 Hacker News 那个热帖里一个网友的实测。他用 Spec Kit 写一个简单到不能再简单的功能——在页面上显示当前日期。Agent 在动手写代码前生成了 1300 行 markdown，包括需求文档、技术方案、任务清单、边界场景分析、错误处理策略。最终代码大约 30 行。1300 行文档对 30 行代码——文档是代码的 43 倍。

Spec Kit 自己的 GitHub issue tracker 里有一个标题更直白的 issue（[#75](https://github.com/github/spec-kit/issues/75)）：SpecKit creates the illusion of work, generating a bunch of text。这是从用户而不是评论员发出的吐槽——SpecKit 创造了在工作的错觉，生成了一大堆文本。

Martin Fowler 站点那篇工具对比文章里的另一句话冷得让人后背发凉：模型驱动开发（MDD）从 2000 年代到 2010 年代尝试过把规范作为源文件，最终因为复杂度、维护成本、对工具链的过度依赖而失败。LLM 加上 spec-as-source 可能同时继承两边的缺点——MDD 的复杂度 + LLM 的非确定性。如果说 MDD 失败是因为规范跟实现的鸿沟由人来弥合不可持续，那 LLM 让这个鸿沟变得更宽（因为 LLM 的输出是统计性的，不可能 100% 复现规范）。

最深一刀来自 Eberhardt 原文里一句关于代码和规范本质差异的话：Code is law because it is formal language you can reason about, you can test, you can run. Specifications written in markdown lack this formality. 翻译成中文：代码之所以可以作为律法，因为它是可形式化、可推理、可测试、可运行的语言。规范写成 markdown 没有这种形式严谨性。AI agent 可以忽视规范、可以过度执行规范、可以伪装成执行了规范实际并没有。

把这些质疑摊开看，没一个是 X 上键政打嘴炮——全部来自实测、来自 GitHub issue、来自学术综述。SDD 不是没争议的银弹。下一章必须正面回应这些质疑，否则不诚实。

![Scott Logic 实测：SDD 4 小时 vs 常规迭代 23 分钟（占位 · 见 assets/diagram-3-scott-logic-data.html）](assets/diagram-3-scott-logic-data.html)

---

## 07 区别只有一句话：spec 能不能改

正面回应来自 AWS Principal Engineer Marc Brooker 在 2026 年 4 月发表的一篇博客（[Spec Driven Development isn't Waterfall](https://brooker.co.za/blog/2026/04/09/waterfall-vs-spec.html)）。Brooker 是 AWS 内部最有影响力的工程师之一，也是 X 上常发分布式系统观察的 @MarcJBrooker。他的反驳一句话：区别不在写不写 spec，在冻不冻结 spec。

瀑布的死法是 phase gate 锁死。需求一旦签字就不能改，必须按它做完整个项目；中间发现需求错了，要走变更评审、要重新走签批流程、要承担合同层面的责任。月级的反馈循环——意思是从写下需求到知道它对不对，中间隔了几周到几个月。这种反馈节奏决定了 BDUF（Big Design Up Front）必须把所有事都想到位，因为后面没机会改。

SDD 的活法是 minutes 级反馈循环。Brooker 在原文里写得很具体：你写一段 spec，让 agent 跑实现，5 到 15 分钟拿到结果。spec 错了或者不完整，你改 spec 让 agent 重跑。整个循环以分钟为单位。spec 不是合同，是可重写的活契约——它每次只活到下一次 implement，下一次 implement 完成就可能被改。

OpenSpec 的 delta isolation 是这个思路的工程化表达。每次需求变更不重写整个 spec，只描述本次变更——OpenSpec 的文件结构里有 ADDED Requirements / MODIFIED Requirements / REMOVED Requirements 三个段落，每次 change 是一个独立的 mini-project，merge 后才合入主 spec。这个设计精确地避开了瀑布最大的 BDUF 陷阱——你不必一开始就把所有事想全，只需要描述当下要变什么。

Karpathy 那条 agentic engineering 推文里 acting as oversight 这五个字是另一层。spec 不是给 AI 的命令——命令意味着 AI 必须严格执行、人不需要监督。spec 是给被监督执行的 AI 的契约——契约意味着 AI 在执行的过程中可能误解、可能跑偏、可能伪装一致，而人作为监督方在每个关键节点都要回看判断。这种分工承认了 spec 不必完美就能用——只要监督机制在线，spec 的瑕疵在执行过程中会被人发现并补回去。

承认 spec 不完美但人也不脱手，是 SDD 跟瀑布的另一个根本区别。瀑布假设如果规范足够详尽就能完全规避执行风险，所以才有 BDUF；SDD 假设规范永远不可能完全详尽，但执行循环足够快、监督足够紧的时候，不完美的规范也能产出可上线的系统。两个假设之上的工程实践完全不同。

但是承认 SDD 跟瀑布有本质区别，不等于说它在所有场景下都该用。

中文 AI 圈技术博主 Jimmy Song 在他的 AI 手册里给出了 SDD 工业化的硬指标（[SDD 简介：从氛围编程到 SDD · Jimmy Song](https://jimmysong.io/zh/book/ai-handbook/sdd/overview/)）：当某类任务上 AI 自动产出的成功率稳定在 90% 以上、可部署率达到 85% 以上、返工率低于 10%，才算 SDD 在这类任务上从实验阶段跨进了生产力工具阶段。低于这条线，硬上 SDD 就是一种 markdown 形态的瀑布——你花了 SDD 的时间成本，但拿到的是不可靠的产出。

适用场景画线：高频重复 + 已有清晰规则 + 与核心业务解耦的任务最适合走 SDD。具体例子有配置清理、安全漏洞修复、API 客户端代码生成、boilerplate 工程脚手架、后台管理界面生成、数据迁移脚本。这些任务的特点是规则本身可以被精确表达成 spec、AI agent 出错的时候后果可控、人工监督的成本不高。

不适合的场景反而是几类——快速原型验证、探索性开发、短期一次性脚本。这些场景里你不知道规范应该长什么样、写规范的成本远大于直接试错的成本，硬上 SDD 反而会拖慢你。这些场景里 vibe coding 的残余仍然是最快的路径——不是因为 vibe coding 好，是因为这些场景对工业化没需求。

![Waterfall 月级反馈 vs SDD 分钟级反馈对比图（占位 · 见 assets/diagram-4-waterfall-vs-sdd-feedback.html）](assets/diagram-4-waterfall-vs-sdd-feedback.html)

把反方和正方的论点都摊开看，我自己的判断是：反方对了一半，错的场景下 SDD 就是 markdown 形态的瀑布，慢、重、文档过多；正方也对了一半，对的场景下 SDD 是真正的范式升级，把 agentic engineering 的不可控收编成可工业化生产的能力。这两个判断不冲突，关键是你能不能识别你正在做的事属于哪种场景。

---

## 08 写 spec 是新的写代码

回到第 1 章那个问题：得物为什么砍前端部门？现在能解释了。

PRD 到设计到前端到后端这条流水线本身不是技术分工，是组织分工。它的存在前提是一个具体的物理约束——一个人脑装不下整个产品的全栈上下文。所以你需要 PM 把意图翻译成 PRD、设计师把 PRD 翻译成原型、前端把原型翻译成 UI 代码、后端把 UI 需求翻译成接口设计、测试再去验证整条链路是不是闭合。每一步翻译都是因为信息没办法在一个人脑里直接流通。

这条流水线在 PC 软件时代成型，在互联网时代被工业化（敏捷、scrum、双周迭代），在移动互联网时代被极致细化（前端再分 web 端 / iOS / Android，后端再分服务层 / 数据层 / 中间件）。它的合理性建立在每个环节的复杂度足以撑起一个独立工种这个前提上。

当 AI agent 持有全栈上下文之后，这条流水线的存在前提就消失了。

agentic engineering + SDD 让一个人可以同时承担 PM、设计师、前端、后端的工作。具体是怎么做的：他在 IDE 里写一份 spec，这是 PM 在做的事——把意图结构化；然后让 AI 生成 design.md，这是设计师 + 架构师在做的事——把意图转化成结构和组件；review 一下 approve；然后让 agent 拆出 tasks.md 并按顺序 implement，这是前端 + 后端在做的事——把方案变成可运行代码；最后跑测试 + review PR，这是测试 + tech lead 在做的事——把代码变成可上线的产物。整个过程在一个 IDE 里完成、由一个人主导、AI 承担所有翻译环节。

得物砍前端部门的本质就是这件事。不是 AI 替代了前端工程师——前端工程师还在编制里——而是把意图翻译成 UI 代码这件具体的事不再需要一个独立工种。前端工程师被并入 AI 全栈团队，他的新工作不是按设计稿写 React 组件，而是用 SDD 工作流完成从需求到上线的全栈交付。

谁吃到红利？

美国 BLS 的就业数据已经回答了。能做架构、能拆边界、能写出可被 AI 准确执行的清晰描述的 software developer，三年只跌了 0.3%。这部分人在 SDD 时代价值反而上升——他们承担的是 spec 设计者的角色，是流水线塌缩后唯一不可替代的环节。

谁被淘汰？

只会按规范执行 if/else 的 programmer，三年跌了 27.5%。跌幅是 developer 的 90 倍。这个数据告诉我们的不是 AI 厉害——AI 三四年前就会写 if/else 了——而是这部分人承担的本来就是流水线里最容易被 SDD 工作流吃掉的那一段。当 spec 写清楚之后，按 spec 实现 if/else 这件事本来就该让 agent 去做，留给一个人来做就是浪费。

技能位移的核心是从我能不能写出来变成我能不能描述清楚让 AI 写出来。这两件事用到的能力截然不同。前者是编码能力——语法熟练、API 熟悉、debugging 经验。后者是抽象能力——把模糊需求变成精确约束、把人类意图变成机器可执行的结构、把边界场景预先考虑清楚。

抽象能力训练得最深的人，恰好是有架构经验的资深工程师、好的产品经理、做过设计 system 的高级设计师。这三种人在 SDD 时代价值会上升，他们的边界正在交融。这不是预测，这是发生中的事。

落地建议按读者画像分。

如果你想轻装试水，最低成本的入口是 cc-sdd（[gotalab/cc-sdd](https://github.com/gotalab/cc-sdd)）。在你已经在用的 agent（Claude Code、Codex、Cursor 任意一个）里装一组 skill，就能跑 Kiro 风格的 SDD 工作流。不需要换 IDE，不需要学新工具。

如果你的团队偏 AWS 生态，Kiro IDE（[kiro.dev](https://kiro.dev/)）是配套最完整的选择，Hooks 系统在跨服务团队里特别有用。

如果你在阿里云生态里，Qoder 的 Quest Mode（[Qoder Quest Mode 文档](https://caug.cn/docs/quest-mode)）是国内最早成型的 agentic coding 平台，对国内云原生工具链的集成最深。

如果你在腾讯云生态里，CloudBase AI Toolkit（[Spec 工作流文档](https://docs.cloudbase.net/en/ai/cloudbase-ai-toolkit/spec-workflow)）的 Spec 工作流跟 Kiro 完全兼容，迁移成本最低。

如果你想自己 hack 工作流、对工具链有深度定制需求，Spec Kit（[github/spec-kit](https://github.com/github/spec-kit)）+ OpenSpec（[Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec)）的组合最灵活——前者给你六个核心命令的工作流框架，后者给你 delta isolation 的需求变更管理。

---

## 写在最后

2027 年回头看 2026，大概会像今天回头看 2014 年那个全栈工程师概念被造出来的时刻——一个不可逆的角色重组。差别在 2014 年那次重组的是某个工种内部的边界（前端开始处理一些 BFF 层的逻辑、后端开始懂一点 React），2026 年这次重组的是 PRD 到前端到后端这条流水线本身。

得物的组织调整只是这次重组的第一个公开样本。可以预见接下来 6 到 12 个月会有更多类似的调整。互联网公司的人力结构会重新分布——比例上 PM、纯前端、纯后端会减少，全栈、AI 全栈、agentic engineering 这类岗位会上升。资深架构师的价值会进一步放大，因为他们承担的是 spec 设计者的角色。初级 programmer 会承受最大压力，因为他们承担的本来就是被 SDD 工作流最先吃掉的那一段。

这件事不会等你做好准备。它已经在发生。

下次你再听到一家公司说我们在做 AI 全栈、我们在做 agentic engineering、我们在用 SDD 工作流、我们正在重组研发组织——你至少知道这些词指的是同一件事，知道这件事过去 12 个月在全球的进展，知道反对方真正的质疑在哪里、支持方的反驳逻辑是什么，知道在你自己的工作里什么场景该上 SDD、什么场景该留给 vibe coding 残余。

最关键的是知道一件事：不是 AI 让程序员失业，是会写 spec 的程序员在吃掉只会写代码的程序员的工资。这个判断在 2026 年还可以辩论，到 2027 年就只是事实。

— 完 —

作者提示：本文所有数据为 2026 年 5 月 1 日前公开可查的信息。BLS 就业数据为转述自第三方报道，原始数据待核实。Karpathy 引文为 X 平台原帖原文，翻译为意译。

---

## 参考资料

### 学术 / 概念源头

- [Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants · arXiv:2602.00180](https://arxiv.org/abs/2602.00180)
- [Constitutional Spec-Driven Development · arXiv:2602.02584](https://arxiv.org/abs/2602.02584)
- [Understanding Specification-Driven Code Generation with LLMs · arXiv:2601.03878v1](https://arxiv.org/html/2601.03878v1)
- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl · Martin Fowler 站点](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html)

### 工具生态

- [GitHub Spec Kit · github/spec-kit](https://github.com/github/spec-kit)
- [Spec-driven development with AI · GitHub Blog](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [Spec Kit issue #75 · SpecKit creates the illusion of work](https://github.com/github/spec-kit/issues/75)
- [Kiro 官网](https://kiro.dev/) · [Introducing Kiro · Kiro blog](https://kiro.dev/blog/introducing-kiro/)
- [阿里 Qoder 负责人揭秘 · 阿里云博客](https://www.cnblogs.com/alisystemsoftware/p/19121515) · [Quest Mode 任务模式 · Qoder 文档](https://caug.cn/docs/quest-mode)
- [腾讯云 CloudBase AI Toolkit Spec 工作流 · 官方文档](https://docs.cloudbase.net/en/ai/cloudbase-ai-toolkit/spec-workflow) · [TencentCloudBase/CloudBase-AI-ToolKit · GitHub](https://github.com/tencentcloudbase/cloudbase-ai-toolkit)
- [Tessl 官网](https://tessl.io/) · [Tessl A 轮融资报道 · Calcalist](https://www.calcalistech.com/ctechnews/article/i7ucn8teu)
- [OpenSpec · Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) · [OpenSpec 官网](https://openspec.dev/)
- [cc-sdd · gotalab/cc-sdd](https://github.com/gotalab/cc-sdd)

### Karpathy 与范式转折

- [Karpathy 2025-02-02 vibe coding 原帖 · X](https://x.com/karpathy/status/2019137879310836075)
- [Karpathy 2026-02-04 agentic engineering 帖 · X](https://x.com/karpathy/status/2026731645169185220)
- [Vibe coding is passé · The New Stack](https://thenewstack.io/vibe-coding-is-passe/)
- [Vibe coding · arXiv:2506.23253v1](https://arxiv.org/html/2506.23253v1)
- [Andrej Karpathy Vibe Coding · Klover](https://www.klover.ai/andrej-karpathy-vibe-coding/)

### 反方质疑 / SDD 是不是瀑布

- [Putting Spec Kit Through Its Paces: Radical Idea or Reinvented Waterfall? · Scott Logic](https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html)
- [Hacker News 热帖 · SDD: The Waterfall Strikes Back](https://news.ycombinator.com/item?id=45935763)
- [Spec-Driven Development: The Waterfall Strikes Back · Marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)
- [Spec-Driven Development Is Waterfall in Markdown · Medium](https://medium.com/@iamalvisng/spec-driven-development-is-waterfall-in-markdown-e2921554a600)

### 反反方 / 工业化指标

- [Spec Driven Development isn't Waterfall · Marc Brooker](https://brooker.co.za/blog/2026/04/09/waterfall-vs-spec.html)
- [SDD 简介：从氛围编程到 SDD · Jimmy Song](https://jimmysong.io/zh/book/ai-handbook/sdd/overview/)
- [Five AI Realities with Tessl's Guy Podjarny · GV (含 Gartner 预测)](https://www.gv.com/news/five-ai-realities-with-tessl-guy-podjarny)

### 国内现象 / 角色塌缩

- [得物前端并入 AI 全栈部门 · gitcode csdn](https://gitcode.csdn.net/69b2699f0a2f6a37c596c871.html)
- ["前端已死"是危言耸听吗 · InfoQ](https://www.infoq.cn/article/syoqdk2chqym37kprebi)
- [大厂 CIO 独家分享：AI 如何重塑开发者未来十年 · InfoQ](https://www.infoq.cn/article/kjoqp8efou9wguktr26f)
- [SDD 大厂集体押注：阿里腾讯亚马逊都在用 · 博客园](https://www.cnblogs.com/ljbguanli/p/19352109)
- [规范驱动开发深入解析：从方法论到 AI 范式转移 · 腾讯云](https://cloud.tencent.com/developer/article/2631688)
- [规范驱动开发：用 AI 写生产级代码的完整指南 · 腾讯云](https://cloud.tencent.com/developer/article/2586438)
