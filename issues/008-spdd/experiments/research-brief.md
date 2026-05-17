# 008 期研究简报 · SPDD —— 结构化 Prompt 驱动开发

> 研究日期：2026-05-17 ｜ 截稿后不再收录
> 方法：8 轮 WebSearch + 多次 WebFetch 一手源核实。每条标 CONFIRMED（一手源已打开确认）/ 二手 / NOT FOUND。

---

## 开篇结论 · 问题 1：SPDD 是不是真术语？

**结论：SPDD 是一个真实、有名有姓、刚冒头但来源权威的术语 —— 不是作者的自造词。**

- 「Structured-Prompt-Driven Development（SPDD）」由 **Thoughtworks 的 Wei Zhang（张巍）和 Jessie Jie Xia（夏婕，Thoughtworks 全球 CIO）** 提出，描述 Thoughtworks 内部 IT 团队用于 agentic 编程的工作流。
- 文章 **2026-04-28 发表在 martinfowler.com**（Martin Fowler 的个人网站，软件工程领域最权威的写作平台之一），并由 Martin Fowler 本人在 X 上转发推荐。
- 作者口述的「约 7 个维度的 canvas」就是文章里的 **REASONS Canvas**，七个维度逐一对得上（见问题 2）。
- 作者口述的核心规则「现实和 prompt 偏离时先改 prompt 再重新生成代码」是原文逐字主张：*"When reality diverges, fix the prompt first — then update the code."*
- 作者提到的「计费引擎案例」和「约 99% 意图对齐度」也都在原文里（见问题 6）。

**定位判断：正在冒头的术语（emerging term），不是已确立的行业标准。** 三点佐证它的边缘性：
1. 发表至今约 3 周（截至 2026-05-17），传播主要靠 Martin Fowler 一次转发 + 一批二手转载站（daily.dev、各类 blog 聚合）。
2. 没有独立第三方采用 SPDD 这个确切叫法 —— 搜到的全部指回 Fowler 那篇原文。
3. 配套开源工具 openspdd **是作者个人仓库**，不是 Thoughtworks 官方项目（见问题 5）。

换句话说：SPDD 这个词**真实存在、来源够硬（Fowler + Thoughtworks CIO），但还非常新、还没沉淀成被广泛引用的方法论**。它属于更大的 **spec-driven development（SDD）** 家族里、专门强调「prompt 本身（而非 spec 文档）作为载体」的一个变体。

---

## 1. SPDD / Structured-Prompt-Driven Development 的真实性与源头

**主源（CONFIRMED，已 WebFetch 全文）**
- 标题：*Structured-Prompt-Driven Development (SPDD)*
- 作者：Wei Zhang、Jessie Jie Xia（均来自 Thoughtworks；Jessie Xia 是 Thoughtworks 全球 CIO）
- 发表：2026-04-28，martinfowler.com
- URL：https://martinfowler.com/articles/structured-prompt-driven/

原文核心定义与主张（逐字引用）：
- *"Instead of relying on ad hoc chats, SPDD turns prompts into assets that can be: versioned controlled, reviewed, reused, and improved over time."* —— 把 prompt 当可版本化、可评审、可复用的资产。
- *"The real question isn't 'How do we generate more code?' It's how do we make AI-generated changes governable, reviewable, and reusable."* —— 问题不是「怎么生成更多代码」，而是「怎么让 AI 生成的改动可治理、可评审、可复用」。
- *"In the AI era, software development isn't a contest of model IQ. It's a contest of engineer cognitive bandwidth."* —— AI 时代拼的不是模型 IQ，是工程师的认知带宽。
- 提出 SPDD 的动机正是作者口述的论点：把 AI 辅助从「个人效率」升级为「组织级、可规模化的能力」，且不牺牲质量。

**Martin Fowler 转发（CONFIRMED 二手定位用）**
- Martin Fowler 在 X 转发并背书：「Thoughtworks internal IT use a workflow for agentic programming called Structured-Prompt-Driven Development (SPDD).」
- URL：https://x.com/martinfowler/status/2049115357781098709

**二手转载（仅说明传播面，不作论据）**
- daily.dev、traeai、geekfence、booboone、mgks.dev 等多家站点转载同一篇文章。这些都是对 Fowler 原文的复述，没有独立信息。一律按二手处理。

> 写作提示：文章里凡引述 SPDD 的定义、REASONS、工作流，统一引 martinfowler.com 那一篇原文，不要引转载站。

---

## 2. 那个「canvas」—— REASONS Canvas

**结论：作者口述的「约 7 个维度的 canvas」= REASONS Canvas，七维度逐一对得上，是 SPDD 原文里发表的真实框架。CONFIRMED。**

来源：同上 martinfowler.com 原文 + openspdd 仓库 README（GitHub，已 WebFetch 双重确认）。

REASONS = 七个维度首字母缩写，原文分三组：

| 字母 | 维度 | 原文含义 | 对应作者口述 |
|---|---|---|---|
| R | Requirements 需求 | 要解决什么问题 + DoD（完成定义） | ① 要解决什么问题 + 完成标准 ✓ |
| E | Entities 实体 | 领域实体与关系 | ② 涉及哪些业务实体和关系 ✓ |
| A | Approach 方法 | 满足需求的实现策略 | ③ 用什么策略实现 ✓ |
| S | Structure 结构 | 改动在系统里的位置、组件与依赖 | ④ 改动在系统哪个位置、影响哪些组件 ✓ |
| O | Operations 操作 | 把抽象策略拆成具体、可测的实现步骤 | ⑤ 实现步骤细到方法签名 ✓ |
| N | Norms 规范 | 跨切面工程规范（命名、可观测性、防御式编码等） | ⑥ 跨团队工程规范 ✓ |
| S | Safeguards 安全边界 | 不可协商的边界（不变量、性能上限、安全规则等） | ⑦ 不能碰的边界（性能红线、安全约束）✓ |

三组划分（原文）：
- 抽象层 / 意图与设计：R + E + A
- 执行层 / 实现路径：S + O
- 治理层 / 通用标准：N + S

openspdd README 里有一句很适合作为「prompt 不只是建议」的论据：
- *"Plans are 'suggestions', REASONS Canvas is a 'contract'."* —— 普通 AI 生成的计划是「建议」，REASONS Canvas 是「契约」：提供明确的方法签名、错误处理、执行顺序，防止 AI 越界自由发挥。
- 仓库 URL：https://github.com/gszhangwei/open-spdd（v0.4.17，2026-05-14；502 stars；MIT；Go 写的）

**另一个易混淆项 —— 学术界的「The Prompt Canvas」（注意：不是同一个东西）**
- 论文：*The Prompt Canvas: A Literature-Based Practitioner Guide for Creating Effective Prompts in Large Language Models*
- 作者：Michael Hewing、Vincent Leinhos（德国 Münster 应用科学大学）
- 发表：2024-12-06，arXiv:2412.05127 — URL：https://arxiv.org/abs/2412.05127
- 状态：CONFIRMED 存在，但**与 SPDD 的 REASONS Canvas 无关**。这是面向通用 prompt 工程（学习资源，给学生/员工用）的框架，不是面向代码生成的 7 维结构。不要把两者混为一谈。

> 写作提示：REASONS Canvas 是 SPDD 自带的、唯一对得上作者口述的 canvas。「Prompt Canvas」是另一个学术框架，可以作为「prompt 结构化早有人做」的背景，但别说成是 SPDD 的那个 canvas。

---

## 3. 严肃来源 / 论文 —— prompt 即代码、结构化 prompt、SDD、intent-driven

**3.1 Prompt-with-Me（arXiv，CONFIRMED，已 WebFetch）**
- 标题：*Prompt-with-Me: in-IDE Structured Prompt Management for LLM-Driven Software Engineering*
- 作者：Ziyou Li、Agnia Sergeyuk、Maliheh Izadi
- 发表：2025-09，arXiv:2509.17096 — URL：https://arxiv.org/html/2509.17096v1
- 关键发现（逐字）：*"Unlike source code, prompts are rarely versioned, reviewed, or maintained across the software development lifecycle."* —— prompt 几乎不像源代码那样被版本化、评审、维护。
- 提出 prompt 的四维分类法（Intent / Author Role / SDLC Phase / Prompt Type），明确主张把 prompt 当一等公民，支持 prompt 的「versioning, quality assurance, and CI/CD integration」。
- 价值：这是 SPDD 核心理念（prompt 当代码管理）**最硬的独立学术背书** —— 一篇与 SPDD 无关的论文，独立得出了「prompt 应被版本化/评审」的结论。

**3.2 Spec-Driven Development: From Code to Contract（arXiv，CONFIRMED，已 WebFetch）**
- 标题：*Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants*
- 作者：Deepak Babu Piskala；发表 2026 — URL：https://arxiv.org/html/2602.00180v1
- 核心主张：*"In spec-driven development, code is the implementation detail of the specification—not the other way around."* / *"The spec declares intent; the code realizes it."*
- 提出 spec 的三个严格度层级：spec-first / spec-anchored / spec-as-source（与下面 Böckeler 的分层一致，互为印证）。
- 重要：这篇论文**自己也列了 SDD 的局限** —— 过度规范（over-specification）、规范腐烂（specification rot）、虚假信心（正确的 spec 也可能掩盖错误的需求）、并明说 spec 「不是消除人类判断的银弹」。可同时用于正方和反方。
- 案例数据（论文转引，作二手）：金融服务 API-first 微服务「集成周期缩短 75%」；有经验研究指 LLM 生成代码配合精炼 spec「错误减少最高 50%」—— 这些是论文转引的二手数据，引用时需标注。

**3.3 GitHub 官方对 SDD 的定义（CONFIRMED，已 WebFetch）**
- 文章：*Spec-driven development with AI: Get started with a new open source toolkit*
- 作者：Den Delimarsky（GitHub 首席产品经理）；发表 2025-09-02
- URL：https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- 关键论据（逐字）：*"language models excel at pattern completion, but not at mind reading"*；模糊的 prompt 逼 AI「去猜成千上万条没说出口的需求」；*"We treat coding agents like search engines when we should be treating them more like literal-minded pair programmers."*
- 这段是「为什么裸 prompt 不够、需要结构」的最佳官方表述。

---

## 4. 核心主张的数据 —— 「AI 让个人变快、但没让团队交付变快」

**这是全文最关键的实证地基。结论：作者的核心论点有强力数据支撑，且支持证据明显多于反对。**

**4.1 Faros AI 研究 —— 直接命中作者论点（CONFIRMED，已 WebFetch 两个独立来源交叉确认）**
- 来源机构：Faros AI（工程效能度量平台，用平台遥测数据而非问卷）
- 2025 年数据：分析 **10,000+ 名开发者、1,255 个团队**：
  - 任务完成数 **+21%**
  - 合并的 PR 数 **+98%**（接近翻倍）
  - 代码评审时长 **+91%**
  - 平均 PR 体积 **+154%**
  - 每开发者 bug 数 **+9%**
  - **DORA 四项指标（部署频率、变更前置时间、变更失败率、MTTR）零变化**
- 一句话总结（逐字转引）：*"Developers produced nearly double the PRs and team delivery stayed exactly the same."*
- 2026 年更新数据（样本扩大到 22,000+ 开发者、4,000+ 团队），趋势更极端：
  - 每开发者任务数 +33.7%、每开发者 Epic 数 +66.2%
  - PR 评审中位时长 **+441%**
  - 每开发者 bug 数 +54%、每 PR 事故率 +242.7%
- URL（二手转述，含完整数字与归属）：https://dev.to/viniciosneves/your-devs-are-faster-with-ai-your-team-might-not-be-mc5
- URL（Faros 官方博客，含其原始研究与方法论）：https://www.faros.ai/blog/key-takeaways-from-the-dora-report-2025
- ⚠️ 待 verify：上述 dev.to 文章转引了一份 **Anthropic 内部 132 名工程师的调查**（每日合并 PR +67%、组织交付指标不变）。这条只有二手转述，未找到 Anthropic 一手发布，引用时须标「据二手转述」或直接略去。

**4.2 METR 研究 —— 「AI 让资深开发者在熟悉代码库上变慢」（CONFIRMED，已 WebFetch 原文 + 更新页）**
- 原研究：*Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity*
- 发表：2025-07-10，metr.org（arXiv:2507.09089）
- URL：https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/
- 发现（逐字）：*"when developers are allowed to use AI tools, they take 19% longer to complete issues"*
- 规模：16 名有经验的开源开发者、246 个 issue、项目平均 22,000+ stars / 100 万+ 行代码、平均每个 issue 约 2 小时。
- 感知差：开发者预期 AI 提速 24%，实际慢 19%，事后仍以为自己快了 20%。
- **重要 caveat（必须如实写出，否则误导读者）：**
  - METR 自己声明：*"We do not claim that our developers or repositories represent a majority or plurality of software development work."* —— 不宣称样本能代表大多数软件开发。这是「资深开发者 + 熟悉的成熟代码库」这一特定切片的结果。
  - **METR 2026-02-24 的更新页**进一步弱化了这个结论：对晚于 2025 的 AI 工具，原班开发者估计为「提速 18%」（置信区间 −38% 到 +9%），新招开发者「提速 4%」；METR 同时承认实验设计有严重的选择偏差（30%–50% 的开发者因为「不想在没有 AI 的情况下做某些任务」而不提交那些任务），正在重做实验，并坦承现有数据可能**低估**了 AI 的真实收益。
  - 更新页 URL：https://metr.org/blog/2026-02-24-uplift-update/
- 用法：METR 是「个人层面 AI 也未必更快」的有力佐证，但**绝不能写成「AI 让所有人变慢」的定论** —— METR 自己已经在收回这个强读法。诚实的写法是：连「资深开发者在熟悉代码库上更快」这种最该成立的场景，证据都是混合甚至偏负的。

**4.3 DORA 报告 —— 注意 2024 与 2025 结论相反（CONFIRMED，已 WebFetch 两份）**

这是一个**重要张力，必须向作者点明**：

- **2024 DORA 报告**（URL：https://dora.dev/research/2024/dora-report/）：
  - 逐字：*"AI adoption significantly increases individual productivity, flow, and job satisfaction. However, it also negatively impacts software delivery stability and throughput."*
  - 即：AI 显著提升个人生产力，但**拖累**团队交付的稳定性和吞吐。
  - 量化（Faros 转引 2024 DORA）：AI 采用率每提高 25 个百分点，交付吞吐下降 1.5%、交付稳定性下降 7.2%。⚠️ 这个精确数字是 Faros 转引，引用时标二手。
- **2025 DORA 报告**（URL：https://cloud.google.com/blog/products/ai-machine-learning/announcing-the-2025-dora-report）：
  - 逐字：*"Unlike last year, we observe a positive relationship between AI adoption on both software delivery throughput and product performance."* —— 与去年不同，今年观察到 AI 与吞吐、产品表现都呈正相关。
  - 但仍有保留：*"AI adoption does continue to have a negative relationship with software delivery stability."* —— AI 与交付稳定性仍呈负相关。
  - 核心框架「AI 是放大器」（逐字）：*"AI doesn't fix a team; it amplifies what's already there. Strong teams use AI to become even better... Struggling teams will find that AI only highlights and intensifies their existing problems."*
  - 90% 受访者工作中用 AI，80%+ 自觉提效，但 30% 对 AI 生成代码「几乎不信任或不信任」。

> 写作提示：这个反转对文章是好素材而非麻烦。诚实的叙述是：2024 年数据支持「AI 拖累团队交付」；2025 年随团队学会怎么用，吞吐转正 —— 但稳定性始终是负的，且 DORA 一再强调价值来自「团队/平台/流程」而不是工具本身。这恰好是 SPDD 想解决的问题域。不要只引对自己有利的那一年。

**4.4 CodeRabbit 研究 —— AI 代码的评审/质量负担（CONFIRMED，多来源交叉）**
- 报告：*State of AI vs Human Code Generation Report*，CodeRabbit 发布，2025-12-17
- 规模：分析 470 个开源 GitHub PR（320 个 AI 协作 + 150 个纯人类）
- 发现：AI 协作的 PR 整体问题数约为人类的 **1.7 倍**（每 PR 10.83 个问题 vs 6.45 个）；逻辑/正确性问题多 75%，安全漏洞最高 2.74 倍，可读性问题 3 倍。
- URL（CodeRabbit 官方）：https://www.coderabbit.ai/blog/state-of-ai-vs-human-code-generation-report
- 用途：佐证「为什么 review 负担涨」—— AI 代码不是单纯「更多」，是「单位更多 + 单位更难审」。

---

## 5. 「先改 prompt / spec 再改代码」「prompt 作为唯一真相来源」—— 谁在主张

**5.1 SPDD 本身（CONFIRMED）** —— 见问题 1。原文逐字：先改 prompt 再改代码；prompt 是被持续维护、与代码同步的一等产物。

**5.2 GitHub Spec Kit（CONFIRMED，已 WebFetch）**
- 仓库：https://github.com/github/spec-kit ｜ 官方介绍见问题 3.3
- 主张：spec 是 source of truth，代码是服务于 spec 的产物（"code serves specifications"）。
- 工作流四步：Specify → Plan → Tasks → Implement。核心有个「constitution」文档，记录项目不可协商的原则（对应 SPDD 的 Norms+Safeguards）。
- 体量：约 97,000 stars，支持 30+ AI 编码 agent。是目前 SDD 阵营声量最大的开源项目。

**5.3 Tessl（CONFIRMED，已 WebFetch）**
- 公司博客：*Tessl launches spec-driven development tools*，2025-09-23 — URL：https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry/
- 创始人兼 CEO：Guy Podjarny（Snyk 创始人；此处一手源只称其「Tessl founder and CEO」，"Snyk 创始人"身份属业界常识，引用时如要写出可另标注）。
- 主张：spec 是 source of truth，「改代码前先改 spec」；产品含 Tessl Framework（写 spec / vibe-spec）和 Tessl Spec Registry（10,000+ 预置 spec，让 agent 正确使用开源库、避免 API 幻觉）。
- ⚠️ 注意：作者口述里「改 prompt/spec 再改代码」最干净的逐字表述来自 SPDD 原文和 Tessl 文档页；Tessl 这篇**发布博客**本身没有逐字写出「先改 spec 再改代码」那句强主张（用 `@generate` 注解等暗示 spec 先行）。引「先改 spec」这句强主张时优先用 SPDD 原文。

**5.4 学术侧（CONFIRMED）** —— Prompt-with-Me（问题 3.1）、SDD-from-Code-to-Contract（问题 3.2）都独立主张 prompt/spec 应为被版本化、被维护的真相载体。

> 小结：「先改上游、再生成代码」「上游产物是唯一真相来源」不是 SPDD 独有 —— 这是整个 SDD 阵营（spec-kit / Kiro / Tessl）的共识。SPDD 的差异点在于：上游产物是**结构化 prompt（REASONS Canvas）**，而不是一份独立的 spec 文档。这个区别值得在文章里讲清楚（见问题 8）。

---

## 6. 计费引擎案例 + 「99% 意图对齐度」

**结论：作者口述的「计费引擎案例 + 约 99% 意图对齐度」对应 SPDD 原文里的真实示例。CONFIRMED（已 WebFetch 原文确认）。**

SPDD 原文里有一个完整的端到端示例：
- 案例：把一个 **token 计费系统（token-billing）** 扩展为支持**多档计费（Standard 与 Premium 两档）**、且**按模型差异化定价（model-aware pricing）**。
- 演示从需求到单元测试的六个步骤，逐步走完。
- 「99%」逐字出处：*"A business logic implementation with exceptionally high intent alignment (~99%)."* —— 一次意图对齐度极高（约 99%）的业务逻辑实现。
- 配套代码仓库：https://github.com/gszhangwei/token-billing

**说明 / 待 verify：**
- 作者口述说的「不同档次订阅、不同模型不同计费规则」与原文的 token-billing 多档 + model-aware pricing 是同一个案例，可确认。
- ⚠️ 「99%」是 SPDD 原文作者自述的对齐度，**不是第三方独立测量或同行评审的结果** —— 它本质是 Thoughtworks 团队对自己案例的一手陈述。文章引用时务必如实标注「这是方法提出者对自身案例的自述数字」，不要写成被验证过的客观指标。「意图对齐度（intent alignment）」也不是有统一定义的标准化度量。
- 该案例并非外部独立发表的 case study，就是 SPDD 原文自带的演示 —— 与作者「这可能是作者一手案例」的猜测部分吻合：它是 SPDD 提出方的一手案例。

---

## 7. 反方（项目硬规矩：反方材料不少于正方）

**7.1 来自 Thoughtworks 自己人的怀疑 —— 最强反方一手源（CONFIRMED，已 WebFetch）**
- 文章：*Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl*
- 作者：Birgitta Böckeler（Thoughtworks，AI 辅助开发领域知名作者）；发表 2025-10-15，martinfowler.com
- URL：https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- 关键批评：
  - **一刀切的工作流不成立**：工具对不同规模的问题适配很差，小任务被重流程拖累。
  - **评审负担反而更重**（核心打击点）：冗长的 markdown 文件让评审变得乏味 —— 她明说「我宁愿审代码，也不愿审这一堆 markdown 文件」。
  - **虚假的控制感**：即便有精致的工作流，agent 仍频繁忽略指令、误读已有代码。
  - **历史教训**：警告 SDD 在重蹈 Model-Driven Development（模型驱动开发）的覆辙 —— 当年也承诺代码生成，结果带来僵化 + 非确定性。
- 分量：这是 SPDD「同门」的公开质疑，发在同一个 martinfowler.com 上。文章里把它和 SPDD 并置，反方就站得住。

**7.2 「Spec 会腐烂」「文档优先的尝试历来都失败」—— 第二强反方一手源（CONFIRMED，已 WebFetch）**
- 文章：*What spec-driven development gets wrong*
- 作者：Amelia Wattenberger（Augment Code，Product Lead）；发表 2026-02-20
- URL：https://www.augmentcode.com/blog/what-spec-driven-development-gets-wrong
- 关键批评（逐字）：
  - *"The only documentation you can 100% trust is the code itself."* —— 唯一能 100% 信任的文档就是代码本身。
  - *"Every documentation-first initiative in software has failed for the same reason: it asked developers to do continuous maintenance work that nobody sees and nobody rewards."* —— 软件史上每一次「文档优先」都因同一个原因失败：要求开发者做没人看见、没人奖励的持续维护。
  - 对 AI 场景尤其危险：过期的 spec 比过期的设计文档更糟 —— agent 会「自信地执行一个已经不符合现实的计划，而且不会提示哪里出了问题」。
- **这一条正面回击作者口述里那个自问**：「spec、文档历来都会过期变味 —— 凭什么 prompt 不一样？」Wattenberger 的回答是：没有不一样，prompt/spec 一样会腐烂，区别只在 AI 让腐烂的代价更高。

**7.3 SDD 在团队规模下崩溃 —— 协调开销吃掉个人提效（二手，需谨慎引用）**
- 多篇分析指出：十个开发者各跑各的 SDD 工作流，会产出更多代码，但也带来更多冲突、重复、架构漂移和集成期返工 —— 个人提效被协调开销吃掉。
- 代表来源：Arcturus Labs «Why Spec-Driven Development Breaks at Scale» — http://arcturus-labs.com/blog/2025/10/17/why-spec-driven-development-breaks-at-scale-and-how-to-fix-it/
- ⚠️ 这些是观点性博客（二手/观点），不是实证研究。引用时定位为「业界观点」而非「数据」。注意这一条与作者论点其实**同向** —— 它说明「个人快、团队不快」是真问题；但它也暗示 SDD/SPDD 本身可能是问题的一部分，不只是解药。

**7.4 结构化 prompt 杀掉「快和流畅」—— vibe coding 之争（CONFIRMED 多来源）**
- 「vibe coding」由 Andrej Karpathy 于 2025-02 提出（Wikipedia 词条：https://en.wikipedia.org/wiki/Vibe_coding），指完全交给 AID 的高层 prompt 流。
- 反方逻辑：vibe coding 的全部价值在于「动量」和「快」—— 一天能试三种不同方案。SPDD 那种先填七维 Canvas 的流程，正面牺牲掉了这种快与流畅。SPDD 原文也承认这是「认知带宽」的投入。
- 但要平衡：业界共识也指出 vibe coding「在生产需求下会崩」（2025-08 一份对 18 位 CTO 的调查中 16 位报告了 AI 生成代码直接导致的生产事故 —— 此为二手转述，未找到 Final Round AI 一手报告，引用须标二手）。
- 代表来源：Addy Osmani «Vibe coding is not the same as AI-Assisted engineering» — https://addyo.substack.com/p/vibe-coding-is-not-the-same-as-ai

**7.5 「重型开销」「spec 写不全」—— 综合批评（部分二手）**
- 论点：spec/结构化 prompt 永远写不到穷尽、总会留解释空间、且写在「软件还没碰到真实世界之前」；小修小补上套这套流程，「一个 prompt 直接发给 agent 会更快」。
- 注意：这一条**SDD 论文 2602.00180 自己也承认**（over-specification、specification rot，见问题 3.2）—— 即正方文献自己就列了这些局限，可以用「连支持者都承认」的方式来写，更有力。

> 反方材料量已与正方相当甚至更多，且包含两个高质量一手源（Böckeler、Wattenberger）和正方文献的自我批评。硬规矩满足。

---

## 8. Landscape —— SPDD 在版图里的位置

一张尽量准确的地图（均已 WebFetch 或多来源确认）：

```
AI 编码方法论光谱（左=自由/快，右=结构/可控）

  vibe coding ──────────── AI 辅助工程 ──────────── spec-driven development (SDD)
  (Karpathy, 2025-02)      (日常 Copilot 式)         (spec/prompt 作为真相来源)
  纯自由 prompt，                                     │
  聊天记录即历史                                       ├── GitHub Spec Kit  (~97k stars, spec 文档 + constitution)
  生产环境会崩                                         ├── Kiro            (轻量 spec-first, VS Code, AWS)
                                                      ├── Tessl           (spec-anchored / spec-as-source + Spec Registry)
                                                      └── SPDD            (结构化 prompt = REASONS Canvas;
                                                                           上游载体是 prompt 而非独立 spec 文档)
```

各家定位（来源：Böckeler 那篇 sdd-3-tools.html，CONFIRMED）：
- **Kiro**：轻量、spec-first，VS Code 内三步走（Requirements → Design → Tasks），有个叫「steering」的记忆库。
- **Spec Kit**：GitHub 出品，CLI 路线，强调「constitution」（项目根本规则），产出一堆 markdown，Specify-Plan-Tasks 工作流。目前基本是 spec-first。
- **Tessl**：唯一明确探索 spec-anchored / spec-as-source 的，把 spec 映射到具体代码文件，文件标「GENERATED FROM SPEC - DO NOT EDIT」。

Böckeler 提出的 SDD 三个严格度层级（也被 arXiv 2602.00180 独立采用，互证）：
1. **spec-first**：spec 引导初始开发，之后丢弃。
2. **spec-anchored**：spec 随特性演进持续维护，靠测试强制同步。
3. **spec-as-source**：spec 是主产物，人类从不编辑生成的代码。

**SPDD 在版图里的精确位置：**
- SPDD 属于 SDD 大家族右半区。
- 它的差异化在于：**上游真相载体是「结构化 prompt」（REASONS Canvas），而不是一份独立形态的 spec 文档**。spec-kit 产出 markdown spec，Tessl 产出 spec 文件，SPDD 强调的是把 prompt 本身结构化、版本化、当代码管。从「先改上游再生成代码」「上游是唯一真相源」这两条看，SPDD 与整个 SDD 阵营完全同构 —— 它更像 SDD 的一个**叙事/术语变体**，强调「prompt 即资产」这个切入口。
- 与 vibe coding 是明确对立面：SPDD 原文的整个动机就是「ad hoc chats（即兴聊天）不可治理」。
- intent-driven development：「intent 是真相来源」是这一整片区域共同的口号（GitHub、Tessl、多篇文章都在用「from code-is-truth to intent-is-truth」的说法），不是某个产品的专名。可作为统摄性概念，不必当成独立工具。

---

## 仍未核实 / 需要作者介入的清单

1. **Anthropic 内部 132 名工程师的调查**（每日 PR +67%、组织指标不变）—— 只见 dev.to 一处二手转述，**未找到 Anthropic 一手发布**。状态 ⚠️ 待 verify。建议：要么作者另寻一手源，要么引用时明写「据二手转述」，要么直接略去（Faros 数据已足够支撑论点）。

2. **2024 DORA「每 25 个百分点 AI 采用 → 吞吐 −1.5% / 稳定性 −7.2%」的精确数字** —— 来自 Faros 转引，未在 2024 DORA 报告页面直接逐字核到该数字。状态 ⚠️ 二手。建议：引用时标「据 Faros 转引 2024 DORA」，或作者直接查 2024 DORA 报告全文 PDF 求证。

3. **「18 位 CTO 中 16 位报告 AI 生成代码导致生产事故」（Final Round AI, 2025-08）** —— 二手转述，未找到一手报告。状态 ⚠️ 待 verify。建议：引用须标二手，或略去。

4. **SPDD 的「99% 意图对齐度」** —— 已 CONFIRMED 在 SPDD 原文中，但它是**方法提出方对自身案例的自述**，非独立测量。不算「待核实」，但作者落笔时必须如实标注其性质，不能当客观指标用。本条列出仅作提醒。

5. **Faros 一手研究的完整方法论** —— 21%/98%/91% 等数字已由两个独立来源交叉确认且归属明确（Faros AI），但本次未打开 Faros 那份原始报告 PDF 逐页核对。若文章要重度依赖这组数字，建议作者下载 Faros 原始报告再确认一遍样本与口径。其余引用按 CONFIRMED 可用。

6. **openspdd 与 Thoughtworks 的关系** —— 已确认 openspdd 是作者个人仓库（gszhangwei = Wei Zhang），不是 Thoughtworks 官方开源项目。文章若提到这个工具，不要写成「Thoughtworks 官方工具」。本条已澄清，列出仅作提醒。
