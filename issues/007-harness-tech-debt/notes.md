# 007 · 你写的 Agent Harness，正在变成你的技术债 · notes

## 一句话钩子

你给 AI agent 搭的 harness——能力脚手架那部分——半衰期约等于一个模型发布周期。每一层都在补当时模型的一个洞；模型升级把洞填上，那层脚手架就从助力变成瓶颈、变成技术债。这篇讲的不是"别搭 harness"，是怎么搭才让它在过期那天一小时能删掉，而不是拖你一周。

## 核心观点（这篇要让读者改变的认知）

1. **harness 一开始是有用的资本，但会折旧。** 它让你早一年发了产品、赚到钱——按一年摊销它，不是当初就不该背的债。但没及时删掉的那部分，会变成技术债。错误不在"当初搭了它"，在"把它当核心产品长期维护、不断加层"。

2. **harness 必须劈成两类，大多数团队混为一谈。**
   - 能力脚手架：补模型当前短板。半衰期 ≈ 一个模型发布周期，会贬值。
   - 治理层：权限、安全、审计、集成、合规。不贬值，模型越强、越自主反而越需要。
   - "harness 大半作废"只对第一类成立。第二类要一直在。

3. **能力脚手架贬值是规律，不是意外。** 每一层都在补一个模型当时的洞：2023 上下文小 → RAG；2024 工具调用不稳 → 可视化工作流；2025 模型能自己调工具 → 那些节点成废铁。洞补上，脚手架就从助力变瓶颈。

4. **优化方向不是堆层，是 thin harness / fat skills。** 框架薄、技能厚——领域知识做成模型能直接读懂的 skill，模型升级时只调技能、不重写框架（这个原则英文叫 thin harness, fat skills，YC 的 Garry Tan 命名推广；准确是 fat 不是 thick）。主打记忆的第三方 harness Letta Code，用同一颗 Opus 4.5 在综合编程 benchmark Terminal-Bench 2.0 上打赢官方 Claude Code——靠找准方向深做，不是加层。

5. **训练 harness 和生产 harness 必须是两个东西。** 生产要窄（白名单 / 最小权限 / 审计 / 可一键关）；训练要宽（让模型试错、学会判断）。把生产白名单搬进训练 = 用工程约束替代了模型本该自己学会的判断，模型永远学不到白名单外的能力。

6. **可操作的判断标准：** 模型升级时，删一块 harness 要一小时 = 你有选项；要一周 = 你有债务。按"为删除而建"来设计。

7. **收口（给读者带走）：** 下次加一个 harness 组件，别问"它今天有没有用"，问"模型让它过时那天，我多快能删掉它"。

8. **跟 004 的收口一句：** 004 说写 harness 是新的、值钱的手艺；007 说你写的 harness 代码大半在贬值——不矛盾，**贬值的是代码，不贬值的是判断力**——知道该在哪儿薄、哪儿厚、哪儿投入。

## 读者画像

收窄到 **正在做 AI agent / agent 产品的人**：工程师、技术负责人、独立开发者。用 LangChain / LangGraph 或自研搭过 agent，听过 harness 这个词（不需要从 0 定义，但快速重述一段——本篇独立成篇）。

不是 006 那种纯 ChatGPT 用户大众盘。05 章额外触达做模型微调 / RL / agent 后训练的人——章首明说这一节给他们看、其他读者可略读。

读者最常见的误解：把自己搭的 harness 当核心资产长期维护、不断加层；没意识到能力脚手架是有保质期的、训练和生产的 harness 该是两套。

## 大致提纲（6 章，不预设字数，章节数可调）

### 引言 + 01 一个被删掉的架构

- 开篇是事实陈述，不用"扎心真相"类标题党钩子。讲多 agent 删除案：2024 有人做深度研究工具，一个大模型把任务拆成子任务、多个 worker 并行研究、最后汇总——因为当时直接让模型调工具不可靠，只能用硬编码工作流绕过。2025 模型工具调用变可靠，那套并行架构反成 bug 来源：子 agent 间不沟通、并行输出拼不到一起、报告前言不搭后语。删掉整套并行架构、让一个模型从头写到尾，效果反而更好。
- 顺势快速重述 harness（一段话，不展开成章）：套在模型外面那层编排代码 / 系统提示 / 工具调用 / 记忆 / 规划循环。
- 点出主轴：那套被删的 harness，当初存在只为补 2024 模型的短板。
- 收口：这不是个例，是 harness 的常态。

### 02 每一层 harness 都在补一个洞

- 进程：2023 上下文窗口小、记不住 → RAG / 向量库 / 分块器 / 重排序 / 查询改写。2024 工具调用不可靠 → 可视化工作流（n8n / Dify），一个节点一个节点串。2025 模型能自己调工具 → 那些节点变废铁。2026 一个长周期 agent 做到 2024 几十个节点的活。
- Hyung Won Chung 那句当主引语：在你当前算力水平上加结构，再把结构去掉，因为结构会成为下一个算力水平的瓶颈。他说的是模型架构，放 agent harness 上一字不差。
- 核心论断：能力脚手架贬值是规律——半衰期绑在模型发布周期上。
- 收口：洞补上，脚手架不会自动消失，留在原地变成瓶颈。

### 03 但不是所有 harness 都会过期

- （这章是 steelman / 反方）harness 劈两类：能力脚手架（补模型短板，贬值）vs 治理层（权限边界、最小权限、审计日志、可一键关、对接公司系统的集成胶水、合规）。
- 治理层不随模型变强作废——模型越强、越自主，权限和审计反而越必要。
- 被删掉的脚手架不是浪费：它让你早一年发产品。是折旧资本，不是当初就不该背的债。错误在"把它当核心产品长期维护"。
- 收口："harness 大半作废"只对能力脚手架成立；判断力在于分清手里哪块是哪类。

### 04 收缩的 harness，填空的模型

- thin harness / thick skills：框架薄、技能厚。约 600 行 harness 例子（helpers / 保持连接的 daemon / SKILL.md 告诉模型能干什么 / run 循环；模型发现缺某功能，自己读 helpers、自己写、继续干）。
- Letta 跑分：第三方 harness 在持久记忆这单一维度上，同模型打败第一方官方 harness——优化方向对了：找准模型真短板深挖，不是堆层。
- 把领域知识 / 工具逻辑 / 业务规则做成模型能直接读懂用的 skill；模型升级只调技能、不重写框架。
- 跟 004 收口：写 harness 仍是值钱的手艺——贬值的是代码，不贬值的是判断力。

### 05 训练用的 harness 和生产用的 harness 必须是两个东西

- 章首明说：这章给做模型训练 / RL / agent 后训练的人；只用产品的读者可略读。
- 生产 harness 要窄：严格工具白名单、最小权限、全程审计、日志、出问题一键关。
- 训练 harness 要宽：让模型试错、学会用工具、学会从失败恢复、学会自己做决策。
- 最常见错误：把生产白名单直接搬进训练环境 → 模型学到的是"在白名单里怎么表现"，白名单外的能力永远学不到。用软件工程的限制替代了模型本该自己学会的判断。
- 收口：窄是为了上线安全，宽是为了模型真学会；搞反了，你训出一个只会在围栏里走路的 agent。

### 06 把 harness 当成 90 天的东西

- 可操作判断标准：模型升级时，删一块 harness 要一小时 = 你有选项；要一周 = 你有债务。
- 为删除而建：每个组件留好删除路径；harness 配置化、技能化，不写死。
- Bitter Lesson 轻织进来当收尾方向（诚实地当类比、不当定律）：手工设计的知识长期输给规模化计算——但这是研究几十年尺度的方向，产品这个季度仍需要可靠性，所以是"方向"不是"立刻"。
- 收口（读者带走）：下次加一个 harness 组件，别问"它今天有没有用"，问"模型让它过时那天，我多快能删掉它"。

## 待 verify 事实清单

完整核实见 [experiments/research-brief.md](experiments/research-brief.md)。下面是关键结论 ——

| 项 | 状态 | 说明 |
| --- | --- | --- |
| 多 agent 删除案 | ✅ 锁定 | 「lan smart」= **Lance Martin**（LangChain 工程师，Open Deep Research 作者）。故事出自他亲笔复盘《Learning the Bitter Lesson》（2025-07-30）。可放心开篇 |
| 约 600 行的极简 harness | ✅ 锁定 | = **browser-use 团队的 Browser Harness**（Gregor Zunic《The Bitter Lesson of Agent Harnesses》2026-04-19）。run.py 13 行 + helpers.py 192 + daemon.py 220 + SKILL.md ≈ 600 行 |
| Letta 跑分 | ⚠️ 数字纠正 | Letta Code 59.1% ✅、Terminal-Bench 2.0 ✅、Opus 4.5 ✅。**口述「41.6%」错**——Claude Code 同 Opus 4.5 是 **52.1%**，Opus 4.6 是 **58.0%**。论点不变，数字必须改 |
| Hyung Won Chung 引语 | ⚠️ 任职纠正 | 引语真实。**口述「Meta」错**——履历是 Google Brain → OpenAI，统一写 OpenAI。逐字原话用 Lance Martin 转述版（同源） |
| The Bitter Lesson · Sutton 2019 | ✅ 已核 | 象棋 / 围棋例子已交叉核实。语音识别 / HMM 段落措辞建议 Joy 引前核一眼原文 |
| thin harness, fat skills | ✅ 锁定 | Garry Tan（YC CEO）命名推广，准确英文 fat skills |
| 工具调用变可靠时间锚 | ✅ 已补 | 2024-10 Anthropic Computer Use（官方自陈 error-prone）→ 2025 冬 Lance Martin 亲述变可靠，两个一手锚 |
| n8n / Dify、RAG 组件栈 | ✅ 常识可用 | — |

## 配图意图

不预设数量。优先 monospace 文本架构图（见 memory `feedback_text_architecture_diagrams.md`）。当前规划：

| # | 嵌入位置 | 内容 | 来源 |
| --- | --- | --- | --- |
| 头图 | 标题下 | 题图 | cover.html 导出或自选 |
| 图 1 | 01 章 | Lance Martin 复盘博客《Learning the Bitter Lesson》 | 网页截图 |
| 图 2 | 02 章 | harness 折旧时间线 | monospace 文本图 |
| 图 3 | 03 章 | 两类 harness 对照（能力脚手架 vs 治理层） | monospace 文本图 |
| 图 4 | 03 章 | LangChain《The Anatomy of an Agent Harness》（反方一派） | 网页截图 |
| 图 5 | 04 章 | browser-use《The Bitter Lesson of Agent Harnesses》（600 行 harness） | 网页截图 |
| 图 6 | 04 章 | Terminal-Bench 2.0 榜单（59.1 / 52.1 / 58.0） | 网页截图 |
| 图 7 | 05 章 | OpenAI 机械手解魔方（ADR / domain randomization） | 网页截图 |
| 图 8 | 06 章 | Rich Sutton《The Bitter Lesson》原文 | 网页截图 |

## 风格约束

- 002 voice 基准：大段散文说理 + 数字 / 事实穿插，几乎不加粗，第一人称只在真体感处用。
- 章节标题陈述句，不反问、不"X 是什么"、不每章套同一关键词。
- 反 AI 味（见 memory `feedback_writing_voice.md` / `feedback_no_lecture_voice.md`）：不用"扎心真相"标题党开头、不反问钩子（"听起来很合理对吧？"）、不自问自答（"这说明什么？"）、不"评论区告诉我"导流、不装饰性双引号、不"第 N 刀"排比、不总结句收尾、不章节间跳转语。
- 反方不少于正方：03 章是结构性的 steelman，不是装点。
- 技术专名保留英文（harness / agent / RAG / skill / tool use / Claude Code / Cursor / LangChain / LangGraph / Letta / n8n / Dify 等），其余尽量中文（见 memory `feedback_minimize_english.md`）。
- 每个事实 inline 跟可点击 markdown 链接（draft.md 是 markdown 真源）。
- 二手 / 转述数据 inline 标注诚实度（见 memory `feedback_wechat_publication_v3.md`）。
- 跟 004 划界：不重写 harness 定义、不把 RAG→工作流→agent 当新东西讲；快速重述一段即可。
- **核心论点不是新发现，不能那样写。**「harness 会折旧 / Bitter Lesson 套 harness」这个角度英文圈已经写过——browser-use《The Bitter Lesson of Agent Harnesses》、Lance Martin《Learning the Bitter Lesson》。007 的原创性在 reframe（跟 006 把 OpenAI 5 阶段重切成 3 阶段是同一手法）：①能力脚手架 vs 治理层两类的切分 ②训练 / 生产 harness 分野 ③「一小时=选项 / 一周=债务」删除性测试。draft 把价值放在这三处，引用别人的论点要大方归属，不抢原创。

## 复盘（发布后填）

- 阅读量：
- 读者反馈中反复出现的关键词：
- 哪段写得最好（被截图传播的段落）：
- 最有争议的段落：
- 下次能更好的：
