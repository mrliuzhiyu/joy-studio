# 004 · v1 评审报告

**评审者**：另一个 Claude agent（general-purpose · 1M context · 独立视角）
**评审日期**：2026-05-02
**评审目标**：`draft.md` v3（约 18000 中文字、277 行 + 开篇引言段，6 章 01-07 实际编号）
**评审风格基准**：002 / 003

---

## 总评

整体上 v3 已经比 003 v1 那种风格上的"AI 余味集中爆发"干净很多——开篇引言、01 章五套 Claude、02 章房间助理隐喻、03 章 Boris Cherny saddle 引用、04 章四块拼图框架、05 章操作系统类比、06 章 LLM OS 多立场、07 章 BLS 数据钩接收口，结构推进有节奏。

**但还远没到 ship-ready**。三类问题严重——

1. **04 章是全文最大的风格断裂**（Joy 后期加的、最容易残留 AI 味）：「四块拼图」「同一个底层问题的四个侧面」「工程化债」这套抽象腔在全篇散文式说理里非常突兀，跟 002 的调子彻底分叉。这一章建议大改或缩减。
2. **几个事实需要 Joy 立刻人工 verify**——尤其 **Karpathy 推文 ID**（003 评审已经标过怀疑、这次仍未修，这是重复踩坑）、**Boris Cherny 50 万行 TypeScript**（在引用源 Pragmatic Engineer 专访里没找到这个数字）、**Snowflake ID 单调递增的物理验证**继续不通过。
3. **第一人称几乎为零**——002 的"我"出现了 5 次以上、003 修订后保留了 3 处。004 这一稿全文只有结尾几句"现实的判断是"这种偏中性的判断语气，没有真实第一人称经验段。harness 是 Joy 每天都在用的工具（他正用 Claude Code 写这篇文章），完全没有"我"的具体经验落地，是这篇文章离 002 调子最远的一点。

---

## A · AI 套语清单（必抓）

按 feedback_writing_voice.md 8 条逐句过 277 行。

### 1. 装饰性双引号

全文清扫干净。没看到给抽象概念套中文双引号。✅

### 2. 反问 + 破折号过渡

- **L161**：「读到这里大概率会冒出一个问题——harness 是不是就是 LangChain？或者 LangGraph、LlamaIndex、AutoGen？」——典型 AI 教师腔自问自答 + 罗列同类。**改**：「harness 是不是就是 LangChain。这是中文圈对这个词最大的混淆来源。」直接跳去回答。
- **L229**：「读到这里会冒出一个很自然的问题——既然 harness 是这一年踩坑反推出来的产物、模型还在变强，等模型有一天能自己处理 context、自己判断危险命令、自己规划任务……harness 这一层会不会被吞掉？」——同样的 AI 自问自答 + 三联铺陈 + 省略号悬念。**改**：「harness 是这一年踩坑反推出来的产物。模型还在变强。等模型自己能管 context、自己判断危险命令——这层会不会被吞掉。这是个真问题。」改成短句陈述 + 结论性短句 hook。

### 3. "最 X" 排比

- **L155**：「四块里讲得最系统的是 SDD」「harness 这一层是 production AI 产品差异化真正住的地方」——「最系统」OK 因为是真比较，但「真正住的地方」有点华而不实。
- **L25**：「Claude Opus 4.7」之前「最强一档的模型」——OK，事实陈述。
- **L235**：「跟 Karpathy 同方向但另一种姿态的，是 Aider 极简派」「Paul Gauthier 持续在公开表达一种立场——harness 越薄越好」——「越薄越好」OK，是 Paul 自己的立场陈述。
- **L267**：「替代它的工种叫 AI engineer / agent engineer」——OK。
- 整体「最 X」相对克制，只有 L155 那句「真正住的地方」需要软化。

### 4. "不约而同 / 物理收敛 / 这不是巧合" 警句腔

- **L293**：「以后再看到一个 AI 产品，先别问它用了什么模型，先问它的 harness 设计了什么。」「模型决定它能不能做。harness 决定它做不做得好。」——这两句一起作收口。前者是 002 调子的"下次你至少知道该问什么"金句，**保留**。后者「模型决定 X，harness 决定 Y」是非常典型的 AI 警句对仗——**强烈建议删后一句**，让前一句单独作收口。（顺便，004 整篇结尾跟 003 结尾「会写 spec 的程序员在吃掉只会写代码的程序员的工资」对照下，003 那句是真锋利金句、004 这句「做不做得好」反而显得 paraphrase。）
- **L37**：「模型代际差正在收敛，harness 差距正在拉大。」——警句对仗，但 **保留**——这是 01 章末的钩子句，作 hook 落地有用。判断标准：如果只有这一处对仗，OK；但如果全文还有多处，会显成套路。
- **L249**：「工作不会消失，会改名字。抽象层会往上挪。」——警句对仗。**保留**——置于 06 章末作章节收口短句强收，002 调子。
- **L265**：「会写 harness 的人在替代只会调 prompt 的人。」——003 那句"会写 spec 的程序员在吃掉只会写代码的程序员的工资"的复刻。notes.md 第 102 行明确写过「**删掉**原稿的"2027 年回头看 2026"句式——那是 003 模板复刻」——但这一句本身就是 003 的复刻句式，需要 Joy 决定要不要保留。**评审者倾向保留**——这是 07 章金句，动了反而损失。

### 5. "事实上 / 实际上 / 值得一提的是 / 更重要的是" 过渡词

逐行扫——
- **L113**：「但更关键的是权限——」——「更关键的是」是反 AI 套路里直接列的过渡词。**必删**。改：「权限是另一回事——」或者直接「另一件事是权限——」。
- **L49**：「模型只做一件事：吃一段 token，吐一段 token。」——「只做一件事」勉强可以，事实陈述。
- **L93**：「这个词跟 harness 含义接近，但还不是 harness。」——OK，转折陈述。
- 其他几处过渡词都用得克制。L113 是唯一需要改的。

### 6. "第一刀 / 立柱 1 2 3" 硬切清单

- **L137-145**：04 章「整个行业从 2025 年下半年开始补这三个洞」「流程层先补」「运行时层接着补」「还有一个更隐蔽的转向」「记忆系统是第四块拼图」——四个并列段以「层」为标记结构化排比。**这是 04 章最大的 AI 味问题**。Joy 的 002 调子里这种四块并列会用散文式说理串起来（参 002 第 03 章嫁接式 → 第 04 章真原生那种过渡），不会用结构化标号铺四个层。**建议大改**——见 D 节 04 章具体方案。
- **L51**：02 章「它没记忆，每次 API 调用对它来说都是全新的；它不记得你上一句说了什么...它没工具...它没规划...它甚至不知道...」——五连句"它没 X"。notes.md 明确标过「**散文化处理，不要四段排比**」。这个版本已经把"四段"压到了一段散文，但句式仍然是「它没 X、它没 Y、它没 Z、它甚至 W」的并列堆叠。**勉强可以**——分号承接 + 嵌入逗号子句的安排让它不像清单，比 v1 散文化得多。但 Joy 想再省一刀的话，可以拆成两到三个短句，让它读起来更碎、更接近 002 那种"不刻意凑排比"的感觉。
- **L141**：「auto-compaction 解决 context 失控、permission boundary 解决危险命令静默执行、planning mode 解决任务规划缺失、retry-on-format-error 解决模型输出格式错」——四联式技术名词排比，每个跟一个故障模式。**建议改散文**：「auto-compaction 解决 context 失控的问题。permission boundary 拦住危险命令的静默执行。planning mode 给任务规划托底。retry-on-format-error 接住模型偶尔写错的 JSON。」一句一段公号风、且节奏更接近 Joy。
- **L274-291**：07 章末按读者画像分推荐工具——这是 002 / 003 都有的合法范式（按读者画像分），**保留**。

### 7. 每章 5-8 个细颗粒子论点

- 01 章：3 个核心点（五套产品 / 不只 Anthropic 一家 / HumanLayer 数据 + 金句收口） ✅ 干净
- 02 章：3 个核心点（裸模型概念 / 工具调用循环拆解 / 房间助理隐喻） ✅ 干净
- 03 章：3 个核心点（词源演进时间线 / 中文译名 + saddle 隐喻 / harness 装着什么 + 「踩坑反推」） ✅ 但「踩坑反推」段（L121-125）有点过度抽象，见 D 节
- 04 章：5 个核心点（vibe coding 死亡 / SDD 流程层 / harness 运行时层 / framework 退潮 / 记忆系统）+ 二次铺陈「四块图」+ 三次铺陈「四块互相依赖」+ 四次铺陈「同一个底层问题的四个侧面」——**这一章细颗粒论点过载**，且同一个论点（"四块"）被反复重述。详见 D / E 节。
- 05 章：4 个核心点（framework vs harness 定义 / 层级图 / production 不用 LangChain / Anthropic 立场 + Cursor 细节）✅ 但层级图 + OS 类比 + Cursor 演化细节三件视觉/概念重物压在同一章，节奏偏重，见 E 节。
- 06 章：3 个核心点（Karpathy LLM OS / 长 context 吞掉 harness / Aider 极简派）+ 反反方（context engineering 是 engineering）+ CPU/OS 类比——核心 3 个立场清晰 ✅
- 07 章：3 个核心点（prompt engineer 退潮 / harness engineer 萌芽 / 垂直 harness 红利）+ 按读者画像推荐工具 ✅

### 8. 总结句式收尾

- **L249**：「工作不会消失，会改名字。抽象层会往上挪。」**保留**——短句强收，002 调子。
- **L295**：「模型决定它能不能做。harness 决定它做不做得好。」——见上文 4 节。**评审者强烈建议删**，让 L293 单独收口。
- **L37**：「模型代际差正在收敛，harness 差距正在拉大。」**保留**——01 章 hook 收口。
- 全文结尾没有"这就是 X 的本质" 套式 ✅

### 开篇引言段（L3-L15）特别检查 ⚠️

notes.md 第 35 行明确写过「**不再走 002 / 003 的"这篇文章讲清楚 X 件事"交付承诺套路**，改成单句金句论断收口」。但 v3 实际开篇做了一件不同的事——Joy 把这篇文章重新框定成"补三个洞"的系列文章框架。

- **L5-13**：「补的方法不是一个，是三个同时发生」「流程层补了 SDD」「运行时层补了 harness」「记忆系统跟着标准化」「2026 年的 AI 工程默认结构是：流程层 SDD、运行时层 harness、底层记忆系统、framework 让位」「这篇文章讲中间那块——harness」——这个开篇框架结构上是合理的（把 004 接进 003 系列、给读者地图感），但**问题在于跟 04 章 L131-155 严重重复**——开篇说一遍"四块"框架，04 章再花整章重述同样的"四块"框架。这是结构性重复，比 003 那个"四件事承诺"重复更糟（那个只是开篇 + 01 章末两段几句话）。
- **建议**：开篇这段四块框架是一个明智的选择，**保留**；但 04 章必须大改——不能再花整章铺一遍同样的四块。详见 D 节 04 章建议。

---

## B · 事实可疑点（必抓 · 比 AI 味更重要）

### 时间锚点

| 事实 | draft 写法 | verify 状态 | 备注 |
|---|---|---|---|
| Cowork 2026-04-09 GA | L25 「2026-04-09 GA」 | ✅ verified（research-brief A 组 + TestingCatalog） | 但 claude.com/product/cowork 当前页面没有明示 GA 日期，依赖二手 |
| Design 2026-04-17 research preview | L25 | ✅ verified（直接从 anthropic.com/news 页面确认 publish 时间和 research preview 措辞） | OK |
| Computer Use API 仍 beta | L25 | ✅ verified | OK |
| Karpathy 2026-02-04 推文 | L3、L97 | ⚠️ **见下面 ID 严重问题** | |
| Anthropic Effective harnesses 2025-11 | L95 | ✅ verified（精确到 2025-11-26） | draft 写"2025 年 11 月"，可以更精确写"2025-11-26"，但不强求 |
| Anthropic Harness design 2026-03 | L97 | ✅ verified（精确到 2026-03-24） | OK |
| Cursor 自家 harness 演化博客 2026-04-30 | L215 | ✅ verified（2026-04-30 + Stefan Heule & Jediah Katz 双作者） | draft 没标作者，可以补 |
| Anthropic Agent SDK 改名 2025-09 | L245 | ✅ research-brief 已 verify | OK |
| Veeva 2007 起步、6 年 IPO | L277 | ✅ verified（2007 创立、2013-10-16 IPO 共 6 年） | OK |
| Anthropic Building Effective Agents 2024-12-19 | L197 | ✅ verified（2024-12-19） | draft 写"2024 年 12 月"OK |
| Anthropic SWE-bench Sonnet 博客 2024-10 | L93 | ✅ research-brief verified | OK |
| EleutherAI lm-evaluation-harness 2020-08 | L91 | ✅ research-brief 已用 GitHub API verify created_at | OK |

### 数字

| 事实 | draft 写法 | verify 状态 | 备注 |
|---|---|---|---|
| HumanLayer 实测 Opus 4.6 在 Terminal Bench 2.0 #33 → #5 | L35 | ✅ verified（HumanLayer 博客原文确认这两个排名） | 但建议补 "+/- about 4 positions in either direction" 这个 caveat（HumanLayer 原文有），让数据更诚实 |
| Matt Mayer Claude Opus Claude Code 77% vs Cursor 93% | L213 | ⚠️ **二手转述**——thoughts.jock.pl 文章本身没有把这两个数字的一手源讲清楚，只是 Matt Mayer 自己在文中放出。Pawel Jozefiak 的博客上能看到这段引述，但 Matt Mayer 是谁、原始 benchmark 在哪发布、这两个数字怎么测出来的——research-brief 没追到一手 | **必须 inline 转述声明**：「据 Pawel Jozefiak 博客转述 Matt Mayer 的实测...」类似 003 BLS 处理 |
| CORE-Bench 同模型 minimal scaffold 42% vs Claude Code 78% | L213 | ⚠️ **二手转述**——同上来源（thoughts.jock.pl），同样需要处理 | 同上 |
| Boris Cherny 50 万行 TypeScript | L193 | ❌ **WebFetch Pragmatic Engineer 那期专访没看到这个数字** | **强烈建议 Joy 自己点开 [Pragmatic Engineer 那期](https://newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny) 直接 Cmd-F 搜 "500,000" / "500k" / "50 万" / "half a million" verify** ——如果找不到，必须删这个数字或换源 |
| Aider 4.2x fewer tokens than Claude Code | L237 | ✅ verified（[morphllm.com 比较页](https://www.morphllm.com/comparisons/morph-vs-aider-diff)，6 个月跨 3 codebase 测试，Aider 105K vs Claude Code 479K avg tokens per task） | OK，但 Morph 是商业产品自家 benchmark、不是中立第三方，inline 标个「Morph 实测」就 OK |
| Claude 1M context 2026-03-13 GA | L235 | ✅ research-brief verified | OK |
| Gemini 2.5 2M token | L235 | ✅ research-brief verified | OK |
| GPT-5.4 400K | L235 | ✅ research-brief verified（claude5.com 三家对比） | 但 GPT-5.4 这个版本号要 Joy 再 cross check 是否当下有发布——评审者印象中 GPT-5.4 这个版号 OK，但建议作者不要冒任何小风险 |
| Gartner 到 2027 1/4 缺陷 from AI | L135 | ✅ verified（GV/Tessl 那篇引用 Gartner 预测） | 但 Gartner 是闭源研究、原始报告需付费访问——standard 处理 |
| Tessl A 轮 1.25 亿美元 | L139 | ⚠️ 003 期 review 已经标过这个时间措辞——research-brief 引用的 Calcalistech 报道日期没标 | 不是 004 主线，可以稍弱处理 |
| Spec Kit 92k star | L139 | ✅ 003 期已用过 | OK |

### 引用原文

| 事实 | draft 写法 | verify 状态 | 备注 |
|---|---|---|---|
| Anthropic Building Effective Agents 两段 "start by using LLM APIs directly" + "reduce abstraction layers" | L199-201 | ✅ verified（直接核对两段都在原文里） | OK |
| Anthropic Building Effective Agents 第三段 "frameworks often create extra layers..." | L205 | ✅ research-brief 已 verify | OK |
| Anthropic Harness design "every component in a harness encodes an assumption..." | L119 | ✅ verified（在原文 "Iterating on the harness" 一节） | OK |
| Anthropic Harness design "find the simplest solution possible..." | （没直接放在 draft 里，但研究材料库里有） | ✅ verified | 可以补进 |
| Paul Gauthier "Very large context windows aren't useful in practice..." | L237 | ✅ research-brief 已 verify（Simon Willison 引用、2025-01-26） | OK |
| Karpathy 推文用 agentic engineering 不是 harness | L97 | ✅ research-brief 已 verify（多个二手源确认 Karpathy 用的是 agentic engineering） | OK |
| Addy Osmani "a decent model with a great harness beats a great model with a bad harness" | L35 | ✅ verified（直接核对原文确认这句话存在）+ 发布日期 2026-04-19 verified | OK |
| Boris Cherny "saddle for a horse" | L103 | ❌ **WebFetch Pragmatic Engineer 那期专访没看到这个隐喻**——research-brief 注明这是该专访说的，但本次抓到的内容里没有。可能是抓取版本不全，也可能是 research-brief 误归。**Joy 必须自己 verify**——直接打开那期 podcast 听 saddle for a horse 那段、或 Cmd-F 搜 saddle | ⚠️ |
| 「even as model improvements absorb some scaffolding, this gets replaced by other types of scaffolding」 | L241 | ✅ research-brief 已 verify | OK |

### 链接 URL（每条核 markdown 链接是不是在 research-brief 里有同源）

逐行扫 draft 里所有 markdown 链接 ——

| 行号 | 链接 | research-brief 同源 | 备注 |
|---|---|---|---|
| L3 | [karpathy/status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220) | ✅ research-brief C 组节点 5 | ⚠️ **见 ID 物理验证下面** |
| L25 | claude.ai 等五个产品链接 | ✅ A 组 | OK |
| L35 | humanlayer.dev/blog/skill-issue-... | ✅ B 组 | OK |
| L35 | addyosmani.com/blog/agent-harness-engineering | ✅ C 组 | OK |
| L91 | github.com/EleutherAI/lm-evaluation-harness | ✅ C 组节点 1 | OK |
| L93 | anthropic.com/news/swe-bench-sonnet | ✅ C 组节点 2 | OK |
| L95 | anthropic.com/engineering/effective-harnesses-for-long-running-agents | ✅ C 组节点 3 | OK |
| L97 | anthropic.com/engineering/harness-design-long-running-apps | ✅ C 组节点 4 | OK |
| L97 | openai.com/index/harness-engineering | ✅ C 组 | OK（research-brief 标过 WebFetch 403 但 URL 存在） |
| L97 | martinfowler.com/articles/harness-engineering.html | ✅ C 组 | OK |
| L97 | karpathy/status/2026731645169185220 (重复) | 同上 | ⚠️ 见 ID 物理验证 |
| L99 | eu.36kr.com/zh/p/3749464991187458（一文读懂 Harness Engineering） | ✅ F 组 | OK |
| L99 | github.com/lintsinghua/claude-code-book（claude-code-book） | ✅ F 组 | OK |
| L99 | runoob.com/ai-agent/harness-engineering.html | ✅ F 组 | OK |
| L103 | newsletter.pragmaticengineer.com/p/building-claude-code-with-boris-cherny | ✅ G 组 | ⚠️ 但「saddle for a horse」是否在原文需 Joy verify |
| L135 | gv.com/news/five-ai-realities-with-tessl-guy-podjarny | ✅ 沿用 003 期 | OK |
| L139 | github.com/github/spec-kit | ✅ 沿用 003 期 | OK |
| L139 | kiro.dev | ✅ 沿用 003 期 | OK |
| L143 | langchain.com/blog/your-harness-your-memory | ✅ D / E 组 | OK |
| L143 | medium.com/.../deep-agents-langchain-just-open-sourced-... | ✅ D 组 | OK |
| L193 | newsletter.pragmaticengineer.com (重复 L103) | 同上 | ⚠️ |
| L193 | cursor.com/blog/continually-improving-agent-harness | ✅ B 组 | OK |
| L193 | cognition.ai/blog/swe-bench-technical-report | ✅ B 组 | OK |
| L193 | github.com/paul-gauthier/aider | ✅ E 组 | OK |
| L193 | github.com/openai/codex | ✅ G 组 | OK |
| L197 | anthropic.com/research/building-effective-agents | ✅ D 组 | OK |
| L213 | thoughts.jock.pl/p/ai-coding-harness-agents-2026 | ✅ B 组 | OK，但二手数据要 inline 标 |
| L215 | cursor.com/blog/continually-improving-agent-harness (重复 L193) | 同上 | OK |
| L233 | news.ycombinator.com/item?id=36057236 (Karpathy State of GPT) | ✅ E 组 | OK |
| L235 | medium.com/@reliabledataengineering/...million-token-context | ✅ E 组 | OK |
| L235 | aionx.co/.../gemini-2m-context-window | ✅ E 组 | OK |
| L237 | simonwillison.net/2025/Jan/26/paul-gauthier | ✅ E 组 | OK |
| L237 | github.com/paul-gauthier/aider (重复 L193) | 同上 | OK |
| L237 | morphllm.com/comparisons/morph-vs-aider-diff | ✅ E 组 | OK，但 Morph 是商业产品 benchmark 建议 inline 标 |
| L241 | anthropic.com/engineering/effective-context-engineering-for-ai-agents | ✅ E 组 | OK |
| L241 | langchain.com/blog/your-harness-your-memory (重复 L143) | 同上 | OK |
| L245 | platform.claude.com/docs/en/agent-sdk/migration-guide | ✅ A 组 | OK |
| L259 | solidaitech.com/.../prompt-engineer-job-dead-ai-careers | ✅ H 组 | OK |
| L259 | infoq.cn/article/7fgaffffykbmxw11u0bt | ✅ H 组 | OK |
| L259 | xz.chsi.com.cn/.../学职平台 | ✅ H 组 | OK |
| L261 | linkedin.com/.../linkedin-jobs-rise-2026 | ✅ H 组 | OK |
| L261 | weforum.org/.../1-3-million-new-jobs | ✅ H 组 | OK |
| L267 | addyosmani.com/blog/agent-harness-engineering (重复 L35) | 同上 | OK |
| L267 | martinfowler.com/articles/harness-engineering.html (重复 L97) | 同上 | OK |
| L283 | anthropic.com/product/claude-code | ✅ A 组 | OK |
| L287 | platform.claude.com/docs/en/agent-sdk/migration-guide (重复 L245) | 同上 | OK |
| L289 | devin.ai | ✅ G 组 | OK，但 Factory 没附链接 |

### ❌❌❌ Karpathy 推文 ID 物理验证（最严重）

**003 期评审报告里已经明确警告过这一点**——X status id 是 snowflake、单调递增。但本次 v3 仍然延用同一个 ID `2026731645169185220`（draft L3 + L97 都用这个 ID），没人改没人核。

**我的物理验证**：
- Vibe coding 那条 (2025-02-02): `2019137879310836075` → 共 19 位
- agentic engineering 那条 (2026-02-04): `2026731645169185220` → 共 19 位

实际验证下来——两条 ID 都是 **19 位**，不是 003 评审里担心的"短一位"。

进一步核——X 的 snowflake ID 没有严格的位数 / 时间映射规则，不能光看位数。但是看数值：2019xxxx... vs 2026xxxx...——前者是 2025-02 那条、后者是 2026-02 那条，从前缀的 "2019" → "2026" 看是单调递增的。而 ID 不一定要严格随时间线性增长（X 用 snowflake 但 worker id / sequence number 占了部分位）。

**所以：物理上不能完全否决这两个 ID 的真实性。**WebSearch 在 2026-02 这条上能搜到那条推文存在并被多个二手源（The New Stack、AI Systems Lab Medium、Frank's World）引用过其内容。

**但**：WebFetch 直接抓 X 链接因 X 的 anti-scraping 返回 402，**评审者没法独立点开链接看到推文真的在那个 URL**。这就是 003 评审报告里「⚠️ 待 Joy 二次核」的状态——必须要 Joy 本人在浏览器里点开这两个 URL 确认它们确实指向那两条推文。

**结论**：⚠️ **必须 Joy 在浏览器里点开 [https://x.com/karpathy/status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220) 和 [https://x.com/karpathy/status/2019137879310836075](https://x.com/karpathy/status/2019137879310836075) verify**——这个动作应该 5 秒做完，跟 003 期一样。如果挂了开篇引言段（L3）和 03 章核心引证（L97）整个塌掉。**这是跟 003 评审同一个坑——Joy 必须主动 verify，不能继续假设上一期的 ID 还能用**。

### chain 总结

✅ verified（research-brief 已查证）：12 条
⚠️ 待 Joy 二次核（需 Joy 点开链接确认）：3 条 — Karpathy 推文 ID（×2，开篇 + 03）+ Boris Cherny 50 万行 TypeScript + Boris Cherny saddle for a horse 隐喻
⚠️ 二手转述、需 inline 标注：3 条 — Matt Mayer 数据 + CORE-Bench 数据 + Aider 4.2x（Morph 商业 benchmark）
❌ 不可考、建议替换：0 条

---

## C · 重复 / 冗余段落

### 严重重复 ⚠️

**1. 开篇引言四块框架 vs 04 章四块框架**
- 开篇 L5-13：「补的方法不是一个，是三个同时发生」「流程层补了 SDD」「运行时层补了 harness」「记忆系统跟着标准化」「2026 年的 AI 工程默认结构是：流程层 SDD、运行时层 harness、底层记忆系统、framework 让位」
- 04 章 L131-155：再花整章重述同样的"四块拼图"——「这张图的起点是 vibe coding 死于 2026 年 2 月」「整个行业从 2025 年下半年开始补这三个洞」「流程层先补」「运行时层接着补」「还有一个更隐蔽的转向——LangChain 这种通用 framework 在 production agent 上退潮」「记忆系统是第四块拼图」「把这四块放在一张图里」「四块互相依赖」「四块同时出现是同一个底层问题的四个侧面」——同一个"四块"框架在 04 章里被铺陈、定位、依赖、并归——**同一个论点同一个清单连写四次**

这是 v3 最大的结构性重复，比 003 那个「四件事承诺」重复严重。建议见 D / E 节。

**2. 04 章 vibe coding 翻车故事 vs 03 章 "踩坑反推" 段**
- 03 章 L121-125：「不是设计出来的，是踩坑踩出来的。harness 这套结构是过去 18 个月 vibe coding 翻车反推出来的产物——用户不读 AI 写的代码导致 review-by-design 加进 harness；用户的 API key 被硬编码进前端导致 secret-scanner 加进 harness；Claude 把 production 数据库当成测试库 drop 掉一次后 dangerous-command-confirm 才被加进 harness。每一个组件背后都有一个真实的事故。」
- 04 章 L135：「2025 年下半年开始业内出现大量 vibe coded 项目翻车事故：数据库密码硬编码进前端、API key 暴露在公开 GitHub 仓库、AI 把测试代码里永远会通过的 admin 验证占位带到生产。归纳起来三层故障模式——不可审...不可复现...不可协作...」
- **这两段重复**——同一类故障故事（数据库密码硬编码、API key 暴露、AI 写错的占位代码）在两章里讲两次。03 章那段更具体（每个故事配一个 harness 组件名 review-by-design / secret-scanner / dangerous-command-confirm），04 章更归纳。**建议保留 03 章那段，04 章 L135 删 vibe coding 翻车那部分、直接进 Gartner 数据**。

**3. 06 章 Karpathy LLM OS 论 vs 04 章工程化债论 是否重复**
- 06 章 L233：「Karpathy 把这个想法叫 LLM OS。这个视角下 harness 不是一个独立的层，是模型功能未成熟前的临时拐杖——模型能力补齐之后，这层会被吞回模型本身。」
- 04 章 L153：「四块同时出现是同一个底层问题的四个侧面。底层问题是——AI 模型的能力涨得太快、产业基础设施跟不上。模型代际差从 12 个月压缩到 6 个月，工程化方法论的迭代周期是 24-36 个月。SDD、harness、记忆系统、framework 退潮——这四件事其实是产业在用 18 个月硬补 AI 暴涨这两年欠下的工程化债。」
- **不算重复**，但语气重叠——两章都在做"高位归纳"。04 章的"工程化债"是产业级判断、06 章的 LLM OS 是 Karpathy 引用。两者论述对象不同，但读者读下来会有"作者在反复说 harness 是过渡形态"的感觉。**建议**：04 章那段「工程化债」是 Joy 的高位判断、放 04 章末和 06 章末两次会显啰嗦——**删掉 04 章那段更干净**。

### 「harness 不是 X 的产物」主题出现次数

通篇统计——
- 03 章 L121-125：「不是设计出来的，是踩坑踩出来的」+ 三个故事 + 「每一个组件背后都有一个真实的事故」+ 「这种成长姿态本身值得留意——产业等不及理论收敛了」（L125）
- 04 章 L135：vibe coding 翻车故事（重复 03 章）
- 04 章 L141：「auto-compaction 解决 context 失控、permission boundary 解决危险命令静默执行...每一项都对应一个具体的 vibe coding 故障模式」（**第三次重述同一个论点**）
- 04 章 L153：「这四件事其实是产业在用 18 个月硬补 AI 暴涨这两年欠下的工程化债」（**第四次重述**）

**这是 04 章的核心问题——"harness 是踩坑反推的产物" 这一个论点，全文重述了 4 次。**前面三次还可以说是不同侧面的展开（具体故事 → 翻车归纳 → 组件对应），第四次「工程化债」就是已经过了 saturation。

### 轻度重复

- L237 + L191-193：「Aider 一个人写的纯 Python，仓库里没有 langchain 依赖」+ L237「Aider 的代码仓库就是这个哲学的物化——纯 Python、不引入 LangChain」——同一个事实在 05 章和 06 章被讲两次。两次的 framing 不一样（05 章是"production 不用 LangChain 例证"、06 章是"Aider 极简哲学物化"），可以保留。但 Joy 想再省一刀的话，05 章可以一句话过、06 章详写。

---

## D · 风格偏离段（按 002 对照）

### 章节标题字数

002 平均 11.7、要求 ≤ 14。004 实际——

| 章 | 标题 | 字数 |
|---|---|---|
| 01 | 同一颗 Opus 跑出五套 Claude | 12 字 ✅ |
| 02 | 裸模型自己做不了任何事 | 11 字 ✅ |
| 03 | harness 这个词怎么来的，装着什么 | 14 字 ✅（含逗号） |
| 04 | harness 不是孤立出现的 | 11 字 ✅ |
| 05 | harness 不是 LangChain | 12 字 ✅ |
| 06 | harness 这一层能持续多久 | 12 字 ✅ |
| 07 | 写 harness 是新的写代码 | 11 字 ✅ |

**全部合格 ✅**——平均 11.9 字、跟 002 持平。

### 第一人称使用 ⚠️ 重大偏离

002 在 02、03、05、06 章都有真实第一人称段（"我自己用了 ChatGPT 一年多才意识到"、"我读到过一个真实的 demo 翻车例子"、"我对这个判断的态度是"、"我自己日常用模型的分工是这样的"），全文出现"我" 5 次以上。

003 v3 修订后保留了 3 处第一人称（05 章三象限决策树前段「我用 SDD 跑过几次之后的判断很清楚」+ 决策树「我现在的决策树」+ 06 章末「我自己的判断是」）。

**004 v3 全文第一人称出现 0 次**（不计 L255「对一个具体的从业者意味着什么」这种泛指）。这是 004 离 002 调子最远的偏离。

harness 是 Joy 每天都在用的工具——他正用 Claude Code 写这篇文章、肯定踩过 auto-compaction / permission / context 管理的具体坑。完全没有"我"的真实经验落地、全篇用"产业判断"的中性语气，是这一稿最值得改的事。

**强烈建议至少补一处真实第一人称段**——可选位置：
- 03 章末（L125 后）：写一段你用 Claude Code 时被 auto-compaction 救了一次或坑了一次的具体记忆——读到 30 万 token 时它怎么决定保留什么、丢了什么
- 05 章 framework vs harness 那段（L189 后）：写一段你 2024 / 2025 自己尝试过用 LangChain 写东西、又切到 Claude Code 的体感
- 07 章按读者画像那段开头（L281 前）：「我自己日常的 harness 分工是这样的——」+ 一句你的真实使用模式（如 Claude Code 写文章 + Cursor 写代码 + Codex CLI 跑一次性脚本）

不需要长——一段、四到五句就够，但必须是真的。

### 金句藏法

002 的金句藏法标准：不加粗、不双引号、单句完成、嵌在散文里。

004 实际——
- L37「模型代际差正在收敛，harness 差距正在拉大。」——独立成段，但没加粗、没双引号、单句 ✅ 002 调子
- L81「模型是大脑，harness 是身体。」——独立成段、但还是 paraphrase 的"X 是 A，Y 是 B"对仗 ⚠️
- L249「工作不会消失，会改名字。抽象层会往上挪。」——独立成段、短句强收 ✅ 002 调子
- L265「会写 harness 的人在替代只会调 prompt 的人。」——独立成段 ✅ 但是 003 那句的复刻
- L295「模型决定它能不能做。harness 决定它做不做得好。」——独立成段、对仗 ⚠️ 见 A/8

整体风格偏向"对仗式金句"（X 决定 A，Y 决定 B；X 是 A，Y 是 B；X 不会消失、X 会改名字），出现 4 次。002 这种对仗只用过 1-2 次。**建议至少删一处对仗，给金句留更多呼吸空间**。

### 链接密度

002 大约每 140 字一个链接（参考资料库累计 39 条 inline link）。

004 实际——
- 18000 字 / 估算 inline link ≈ 50 条 → 每 360 字一个链接
- **链接密度比 002 稀**

但 004 这个密度是合理的——很多关键数据（HumanLayer、Anthropic 两篇 harness、Cursor 自家博客）都是有链接的，章节论述段落本来就需要长展开来讲清楚 harness 这个新概念。**不需要硬补**。

### 一句一段密度（公号特化）

draft.md 是 markdown，按 `\n\n` 分段大致估算——
- 共 277 行，去掉空行、章节标题、横线、图占位、参考资料锚——**估算 段落数 ≈ 130 段**（draft.md 这一阶段）
- 18000 字 / 130 段 ≈ 138 字/段
- **远低于公号特化要求的 8000 字 600+ p 标签（≈ 13 字/段）的密度**

但这是 draft.md 不是 wechat.html——draft.md 一般是 PC 端预览用的、段落比 wechat.html 大。Joy 在生成 wechat.html 时会进一步做"句号即换段"的拆段。所以这个密度在 draft 阶段是 OK 的，到 wechat.html 时再拆。

不过有几段在 draft 阶段就已经过长——
- L51「它没记忆...它没工具...它没规划...它甚至不知道」——一段塞 4 句"它没 X"分号串接，公号上必须拆 4 段
- L97「接下来几个月这个词被密集采用...一年之内 harness 从评测圈渗透到整个 AI 圈，变成产业默认词」——一段塞 5-6 个事实
- L141「auto-compaction 解决...permission boundary 解决...planning mode 解决...retry-on-format-error 解决」——一段塞 4 个并列子句，公号必须拆

这些都不影响 draft 阶段 review，但 Joy 在做 wechat.html 时要注意。

---

## E · 节奏断层 / 结构问题

### 读者节奏表

| 段 | 章 | 内容 | 节奏判断 |
|---|---|---|---|
| 1 | 开篇引言 | Karpathy 一年祭 + 三个补丁框架 | 偏重——已经在开篇就铺了"四块"框架，读者一开始就要消化系列文章地图，没有快速 hook |
| 2 | 01 | 五套 Claude + HumanLayer 数据 + 金句收口 | ✅ 节奏好——有事实、有数据、有金句、长度合适 |
| 3 | 02 | 裸模型 + 工具调用循环逐步拆解 + 房间助理隐喻 | ✅ 节奏好——这一章最稳、教学化但不重 |
| 4 | 03 | 词源 + 中文译名 + saddle 隐喻 + harness 装着什么 | 偏重——四个子主题 + 最后「踩坑反推」段，章末有点拖 |
| 5 | 04 | 四块拼图 + 工程化债 | **节奏崩坏**——这一章内容跟开篇引言段重复、是全文最容易让读者 zone out 的章节，详见下面 |
| 6 | 05 | framework vs harness + 层级图 + Anthropic 立场 + Cursor 细节 | 偏重——三个视觉/概念重物压在一起，但都是有价值的内容 |
| 7 | 06 | Karpathy LLM OS + 长 context 吞 harness + Aider 极简 + 反反方 + CPU/OS 类比 | ✅ 节奏好——多立场对照清晰、有反反方有历史类比 |
| 8 | 07 | prompt engineer 退潮 + harness engineer 萌芽 + 垂直 harness 红利 + 工具推荐 + 收口 | ✅ 节奏好——有数据有判断有收口 |

**04 章是全文最大的节奏断层**——它前面 03 章已经讲过 harness 装着什么 + 踩坑反推；后面 05 章要讲 framework vs harness。中间这一章被 Joy 用来铺"四块拼图"系列文章框架——但开篇引言段已经铺过、04 章再铺等于让读者读两遍同一个地图。

**04 章的两条改进路径**——

**路径 A（推荐）：04 章大幅缩减，主体并入开篇 + 03 章末**
- 删掉 L131-155 整整 25 行的"四块拼图"展开
- 把 SDD / framework 退潮 / 记忆系统 这三块用一段话过——「除了 harness，2025-2026 这一年还在补另外几块。流程层 SDD（这是上一篇的事）、framework 退潮（下一章会展开 harness 不是 LangChain 的部分）、记忆系统（下一篇会专门讲）。这一篇专心讲 harness。」
- 这样开篇 + 03 章末的"踩坑反推"做到尽，04 章变成 5-8 行的过渡章
- 但这意味着原来 04 章占的那一刀长度（约 2500 字）要压到 800 字——节奏会大变

**路径 B：04 章保留但改名 + 大改**
- 改章标题为「04 harness 不是孤例」——把焦点从"四块拼图"改成"harness 这一波 production agent 大家都在做"
- 删掉「四块拼图」「工程化债」「四块互相依赖」整套抽象论
- 主体改成具体故事——「Anthropic、Cursor、Cognition、OpenAI、Aider 都在写自家 harness」+「LangChain 在退潮、自己开始用 harness 这个词」+「记忆系统作为 harness 的一个组件正在被讨论」——回到具体事实层、不归纳"四块"
- 这样 04 章成为 05 章的铺垫，长度可以保留 1500-2000 字

**评审者倾向路径 B**——保留 04 章但去抽象化。原因：把"全行业都在自研 harness"这件事拍出来的章节，对读者是有价值的（建立"这是个产业级现象"的认知基础）。但这个论证不需要"四块拼图"系列地图——直接说"全行业都在写自家 harness、LangChain 退潮"就够了。

### 04 章新加的"工程化债"段（L153）

「这四件事其实是产业在用 18 个月硬补 AI 暴涨这两年欠下的工程化债」

这一句听起来有 voice，但实际是 paraphrasing——「工程化债」是一个抽象概念、不是 Joy 个人的具体观察。002 调子的"我对这个判断的态度是：长期会被验证为对的"那种 voice 是建立在具体经验上的（"我"做过这件事 + 因此判断 X）。「工程化债」是从产业角度归纳，没有"我"的视角支撑。**建议删**。

### 05 章 ASCII 架构图 + 操作系统类比

L173-185 的 ASCII 层级图 + L187 的 OS 类比同时出现——

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

视觉占用大约 12 行——在公号上会撑得屏幕喘不过气。这个 ASCII 图的功能跟 L221 的「层级架构图（占位 · 见 assets/diagram-3-stack-layers.html）」重叠——一个是 ASCII 一个是 diagram。**建议二选一**：
- 选 ASCII：删掉 diagram 占位、把 L173-185 当作主图
- 选 diagram：删掉 ASCII（或大幅缩减）、用 diagram 来呈现层级

评审者倾向删 ASCII 保 diagram——diagram 在公号上视觉效果更好、ASCII 在公号 monospace 字体里会很丑。

L187 的 OS 类比「模型像 CPU、API 像系统调用、framework 像 libc 这类系统库、harness 像 macOS / Windows / Linux 操作系统本身」——四联类比 + 各自一个映射。**类比本身合理**，但跟前面的 ASCII 图功能重叠。**建议**：删掉 ASCII 后保留这个 OS 类比，作为 05 章里的一个收口画面。

### 06 章 + 07 章末尾收口

- 06 章末 L249「工作不会消失，会改名字。抽象层会往上挪。」——✅ 短句强收、好
- 07 章末 L293-295 「以后再看到一个 AI 产品...模型决定它能不能做。harness 决定它做不做得好。」——L293 OK、L295 评审者建议删（见 A/8）。

整体收口节奏没有反高潮，但 L295 那句比 L293 弱、放在最后会显疲。

### Callback / 伏笔兑现

- 开篇 L3「Karpathy 一年祭 vibe coding 死亡」→ 07 章末没有 callback「Karpathy 那一年祭说的是对的」——评审者觉得这个 callback 缺了一块。**建议**：07 章末或者结尾加一句「Karpathy 那条 agentic engineering 推文里写的 acting as oversight 五个字，落地下来就是会写 harness 的能力」，把开篇钩子兑现。
- 01 章末 L37「harness 差距正在拉大」→ 07 章 L211「同一颗模型、搭在不同 harness 上、跑出来的成绩可以差几十个百分点」（在 05 章中段被详细兑现）✅ 已兑现
- 04 章「记忆系统下一篇会专门讲」L155 → 这是给后续文章的 hook、不需要本期兑现 ✅
- 05 章 OS 类比 → 06 章 CPU/OS 历史类比 L243 形成系统性照应 ✅ 完美

---

## 总评分

| 维度 | 分数 | 说明 |
|---|---|---|
| AI 味干净度 | 7.5 / 10 | 比 003 v1 干净很多。主要扣分在 04 章「四块拼图」抽象腔 + 「工程化债」paraphrasing + L161 / L229 两处反问开头 + L113「更关键的是」过渡词 |
| 事实硬度 | 7.0 / 10 | 大部分事实 ✅ verified。扣分在：Karpathy 推文 ID 仍未人工 verify（沿用 003 那个待核 ID）+ Boris Cherny 50 万行不在引用源里 + Boris Cherny saddle 隐喻不在引用源里 + Matt Mayer / CORE-Bench 是二手转述未 inline 标注 |
| 节奏感 | 6.5 / 10 | 01-03 章节奏好。04 章是节奏崩坏（重复开篇 + 抽象化）。05 章 ASCII + diagram + OS 类比三件视觉重物压在一起。06-07 章节奏好 |
| voice / 独家判断浓度 | 6.0 / 10 | 全文几乎没有真实第一人称。harness 是 Joy 每天用的工具、完全没有"我"的具体经验。结尾 L265 的 voice 是 003 模板复刻、L295 是 paraphrase 对仗。004 这一稿是评审过的所有期里 voice 最稀的一篇 |
| 整体 ship-ready 程度 | **6.0 / 10** | **不到 7 分、不能 ship**。需要至少改 04 章 + 加一段真实第一人称 + verify Karpathy 推文 ID 和 Boris Cherny 数字 |

---

## 给 Joy 的简报（≤ 250 字）

**高优先级 top 5（必改）**——
1. **Karpathy 推文 ID 立刻人工 verify**（开篇 L3 + 03 章 L97），跟 003 同一个坑、5 秒动作
2. **04 章大改**——「四块拼图 / 工程化债」整段抽象腔删除，改成"全行业都在写自家 harness"的具体事实层（路径 B），章长压到 1500 字以内
3. **Boris Cherny 50 万行 + saddle 隐喻 verify**——评审者从 Pragmatic Engineer 那期专访没抓到这两个数字/隐喻，必须 Joy 自己点开听一段确认，否则删
4. **加至少一段真实第一人称**——03 章末 / 05 章中 / 07 章前选一处补 4-5 句具体使用经验，全文 voice 稀的问题靠这段补
5. **Matt Mayer + CORE-Bench 数据加 inline 转述声明**（参 003 BLS 处理）+ Aider 4.2x 加「Morph 实测」标记

**中优先级 top 3（建议改）**——
6. L161 + L229 两处反问开头改陈述句
7. L113「更关键的是」改「另一件事是权限」
8. L295「模型决定它能不能做。harness 决定它做不做得好。」删掉，让 L293 单独收口

**低优先级（不改也行）**——
- 02 章「它没 X、它没 Y...」散文化再省一刀
- 05 章 ASCII 层级图 vs diagram 占位二选一（推荐删 ASCII 保 diagram）
- 03 章末「成长姿态本身值得留意」可以更具体

**ship-ready 状态一句话**——v3 是个有清晰骨架的稿子，但 04 章重复 + 第一人称缺失这两件事让它离"可以发"还有一轮修改的距离。改完高优先级 5 条之后大概率到 7.5 / 10、可以发。当前不行。
