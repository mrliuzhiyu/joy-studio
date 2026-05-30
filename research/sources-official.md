# 三家官方干货源目录

ChatGPT(OpenAI)/ Claude(Anthropic)/ Gemini(Google)的**官方一手**写作素材,按主题分组。
只收官方域(各家 blog / engineering / research / docs / cookbook / model card / 官方 GitHub),不收二手解读站。

> 建库 2026-05-30。可信度见 [README](README.md):✅ 读到原文·多源确认 / ⚠️ 二手未核 / 🔗 URL 确认正文未逐篇读。
> 引用进 draft 前,⚠️ 和 🔗 一律回一手核(尤其跑分数字)。

---

## 一、Anthropic(最值得深挖——它一边发榜一边拆榜,工程博客极硬)

### ① 评测 / 可靠性(这一组是「榜单失信」选题的金矿)

| 标题 | 日期 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|---|
| Demystifying evals for AI agents | 2026-01-09 | [engineering/demystifying-evals-for-ai-agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | "让 agent 有用的能力正好让它最难评测";手把手教自建 eval → 选题:**自建 eval 是新工程能力** | ✅ 标题日期确认 |
| Designing AI-resistant technical evaluations | 2026-01-21 | [engineering/AI-resistant-technical-evaluations](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations) | 题目会被模型做穿,评测要专门设计成抗 AI → 选题:**为什么你的面试题/考题被 AI 秒了** | ✅ |
| Quantifying infrastructure noise in agentic coding evals | 2026-02-05 | [engineering/infrastructure-noise](https://www.anthropic.com/engineering/infrastructure-noise) | 连基础设施抖动都会污染 agentic 榜分 → 选题:榜分里有多少是噪声 | ✅ |
| Eval awareness in Claude Opus 4.6's BrowseComp | 2026-03-06 | [engineering/eval-awareness-browsecomp](https://www.anthropic.com/engineering/eval-awareness-browsecomp) | **模型能察觉自己在被考、于是表现不一样**——极硬、中文圈几乎没人讲 → 可独立成篇 | ✅ |
| An update on recent Claude Code quality reports | 2026-04-23 | [engineering/april-23-postmortem](https://www.anthropic.com/engineering/april-23-postmortem) | 真实质量回归,榜分没体现;官方 postmortem → 选题:体感变差 vs 跑分没动 | ✅ |
| Raising the bar on SWE-bench Verified (Claude 3.5 Sonnet) | 2025-01-06 | [engineering/swe-bench-sonnet](https://www.anthropic.com/engineering/swe-bench-sonnet) | Anthropic 自己当年怎么搭 scaffold 刷 SWE-bench → 对照"现在又说榜不可信"的反差 | ✅ |
| Bloom:开源行为评测工具 | 2026(近) | [research/bloom](https://www.anthropic.com/research/bloom) | 自动化行为评测开源工具 → 自建 eval 选题的工具锚 | 🔗 |

### ② Agent 工程 / harness(接 004 / 007 线)

| 标题 | 日期 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|---|
| Building effective agents | 2024-12-19 | [research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents) | "先直接用 API、少抽象层";agent 模式分类奠基文(004 已引) | ✅ |
| Effective harnesses for long-running agents | 2025-11-26 | [engineering/effective-harnesses-for-long-running-agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents) | harness 一词在 Anthropic 标题首现(004 已引) | ✅ |
| Harness design for long-running apps | 2026-03-24 | [engineering/harness-design-long-running-apps](https://www.anthropic.com/engineering/harness-design-long-running-apps) | "每个组件都编码了一个模型做不到的假设"(004 金句源) | ✅ |
| Scaling Managed Agents: Decoupling the brain from the hands | 2026-04-08 | [engineering/managed-agents](https://www.anthropic.com/engineering/managed-agents) | 大脑与手分离的多 agent 编排 → 选题:**多 agent 什么时候反而坏事**(接 007) | ✅ |
| How we built Claude Code auto mode | 2026-03-25 | [engineering/claude-code-auto-mode](https://www.anthropic.com/engineering/claude-code-auto-mode) | 跳过权限的安全设计 → 选题:自治度 vs 安全的工程取舍 | ✅ |
| How we contain Claude across products | 2026(featured) | [engineering/how-we-contain-claude](https://www.anthropic.com/engineering/how-we-contain-claude) | 同一模型跨产品的约束/治理(接 004 五套产品) | ✅ 标题确认 |
| Writing effective tools for AI agents | 2025 | [engineering/writing-tools-for-agents](https://www.anthropic.com/engineering/writing-tools-for-agents) | 给 agent 写工具的设计原则 → 干货:工具描述就是 prompt | 🔗 |
| Code execution with MCP: Building more efficient agents | 2025 | [engineering/code-execution-with-mcp](https://www.anthropic.com/engineering/code-execution-with-mcp) | 用代码执行替代海量工具调用 → 选题:**MCP 的下一步是 code execution** | 🔗 |
| A new approach to agent skills | 2025 | [news/skills](https://www.anthropic.com/news/skills) | Skills 抽象 → 选题:**skills 是不是新的 harness 层**(接 007 fat skills) | 🔗 |
| Trustworthy agents in practice | 2026 | [research/trustworthy-agents](https://www.anthropic.com/research/trustworthy-agents) | 可信 agent 实践 → 治理层选题(接 007 治理 vs 能力脚手架) | 🔗 |

### ③ 上下文 / 记忆(接 005 线)

| 标题 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|
| Effective context engineering for AI agents | [engineering/effective-context-engineering-for-ai-agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) | "context 管理是工程问题不是模型问题"(005 已引)→ 选题:**context engineering 取代 prompt engineering** | ✅ |
| Claude Code memory 文档 | [code.claude.com/docs/en/memory](https://code.claude.com/docs/en/memory) | MEMORY.md 前 200 行/25KB 启动加载、纯 markdown 无 vector(005 已引) | ✅ |

### ④ 模型发布 / 能力口径

| 模型 | 日期 | 链接 | 口径 / 注意 | 可信度 |
|---|---|---|---|---|
| Claude Opus 4.8 | 2026-05-28 | [news/claude-opus-4-8](https://www.anthropic.com/news/claude-opus-4-8) | SWE-bench **Pro** 64.3%→69.2%、领先 GPT-5.5 ~10 分;effort control(high/extra/max);Claude Code dynamic workflows(数百并行 subagent、十万行级迁移);fast mode 约 2.5× 快/3× 便宜;定价不变。**部分 OSWorld 涨幅是 harness 改进,官方自己标注** | ⚠️ 数字来自国外媒体交叉,anthropic.com 正文 WebFetch 被 403,引用前回原文核 |
| Claude Opus 4.7 | 2026-04-16 | [news/claude-opus-4-7](https://www.anthropic.com/news/claude-opus-4-7) | 视觉分辨率约 3.75MP(~3×);社区反馈"拒答过多" | ⚠️ |
| Claude Mythos(Preview) | 2026-04-08 | [red.anthropic.com/2026/mythos-preview](https://red.anthropic.com/2026/mythos-preview/) | Opus 之上新档位、网络安全漏洞发现(Project Glasswing);仅约 11–48 家机构、不进日常产品 → 选题:**前沿能力分层供给,最强模型不对公众开放** | ⚠️ |

### ⑤ 安全 / 对齐 / 可解释性

- [alignment.anthropic.com](https://alignment.anthropic.com/) — Alignment Science 博客(可解释性、对齐实验,干货密度高) 🔗
- [anthropic.com/research](https://www.anthropic.com/research) — 研究总入口 🔗

### ⑥ 开发文档

- [docs.anthropic.com](https://docs.anthropic.com) — prompt engineering / tool use / extended thinking / **prompt caching** / Agent SDK 🔗

---

## 二、OpenAI(ChatGPT)

### ① 评测 / 榜单口径 ★(榜单失信选题的头号锚)

| 标题 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|
| **Why we no longer evaluate SWE-bench Verified** | [index/why-we-no-longer-evaluate-swe-bench-verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) | 官方弃用最有名的编程榜——**榜单失信的官方实锤**。确切发现:审计 27.6% 子集、**≥59.4% 题目测试用例有缺陷**(把功能正确的答案判错);**所有受测前沿模型都能复现人写的 ground-truth 修复 = 训练污染**;"提升不再反映真实能力、越来越只反映训练时见过多少这个榜";官方改荐 SWE-bench Pro | ✅ 关键数字+措辞已确认(回原文最终定稿) |
| 播客:The End of SWE-bench Verified(OpenAI Frontier Evals 负责人 Mia Glaese / Olivia Watkins) | [latent.space/p/swe-bench-dead](https://www.latent.space/p/swe-bench-dead) | 弃榜决策的一手当事人访谈 → 选题 A 的人物/动机料 | ✅ |

### ② reasoning 推理模型(干货:反 overthinking)

| 标题 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|
| Reasoning models 指南 | [platform.openai.com/docs/guides/reasoning](https://platform.openai.com/docs/guides/reasoning) | reasoning 模型工作方式、reasoning tokens | 🔗 |
| Reasoning best practices | [platform.openai.com/docs/guides/reasoning-best-practices](https://platform.openai.com/docs/guides/reasoning-best-practices) | 何时用/不用 reasoning → 选题:**test-time compute 的边际递减、何时该关 thinking** | 🔗 |
| GPT-5.1 Prompting Guide(cookbook) | [cookbook.openai.com/examples/gpt-5-1_prompting_guide](https://cookbook.openai.com/examples/gpt-5-1_prompting_guide) | 新代模型的提示范式变化 | 🔗 |

### ③ Agent / Codex 工程

| 标题 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|
| New tools for building agents | [index/new-tools-for-building-agents](https://openai.com/index/new-tools-for-building-agents/) | Responses API + Agents SDK + 内置工具 | 🔗 |
| A practical guide to building agents(PDF) | [openai.com/business/.../a-practical-guide-to-building-agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-agents/) | OpenAI 版"怎么搭 agent"——可与 Anthropic Building effective agents **对照写两家方法论差异** | 🔗 |
| Building reliable agents(cookbook) | [cookbook.openai.com/examples/building-reliable-agents](https://cookbook.openai.com/examples/building-reliable-agents) | 可靠性工程实操 | 🔗 |
| Agents SDK(Python) | [openai.github.io/openai-agents-python](https://openai.github.io/openai-agents-python/) | 官方 agent 框架 | 🔗 |
| Codex / changelog / CLI tips | [openai.com/codex](https://openai.com/codex/) · [changelog](https://developers.openai.com/codex/changelog/) · [cookbook codex_cli](https://cookbook.openai.com/examples/codex_cli) | Codex 路线、和 Claude Code 对打(008 提过 Codex 省 4.2× token) | 🔗 |
| Harness Engineering | [index/harness-engineering](https://openai.com/index/harness-engineering/) | OpenAI 也用 harness 这个词(004 已引) | ✅ |

### ④ 模型发布 / 安全

| 项 | 日期 | 链接 | 可信度 |
|---|---|---|---|
| GPT-5.5 | 2026-04-23 | [index/introducing-gpt-5-5](https://openai.com/index/introducing-gpt-5-5/) · [system card](https://openai.com/index/gpt-5-5-system-card/) | ⚠️ |
| Research / News 总入口 | — | [research/index](https://openai.com/research/index/) · [news](https://openai.com/news/) | 🔗 |
| Prompt caching 文档 | — | [platform.openai.com/docs/guides/prompt-caching](https://platform.openai.com/docs/guides/prompt-caching) | 🔗 |

---

## 三、Google / DeepMind(Gemini)

### ① 长上下文 / 缓存 ★(接 005,干货密度高)

| 标题 | 链接 | 硬货 / 可延伸 | 可信度 |
|---|---|---|---|
| Long context 指南 | [ai.google.dev/gemini-api/docs/long-context](https://ai.google.dev/gemini-api/docs/long-context) | 官方怎么教用 1M–2M 上下文 → 选题:**长 context 到底吃掉了多少 RAG**(接 005) | 🔗 |
| Context caching | [ai.google.dev/gemini-api/docs/caching](https://ai.google.dev/gemini-api/docs/caching) | 长上下文的成本工程——缓存怎么省钱 | 🔗 |
| Gemini v3 技术报告(PDF) | [deepmind-media/gemini/gemini_v3_report.pdf](https://storage.googleapis.com/deepmind-media/gemini/gemini_v3_report.pdf) | 一手技术报告、评测口径 → verify 跑分时用 | 🔗 |

### ② Agent / Antigravity

| 标题 | 链接 | 硬货 | 可信度 |
|---|---|---|---|
| Building agents with Gemini | [ai.google.dev/gemini-api/docs/agents](https://ai.google.dev/gemini-api/docs/agents) | 第三家 agent 方法论(可凑齐三家对照) | 🔗 |
| Gemini Agent / agentic capabilities | [blog.google/products/gemini/gemini-agent](https://blog.google/products/gemini/gemini-agent/) | 产品侧 agent | 🔗 |

### ③ reasoning / thinking

| 标题 | 链接 | 硬货 | 可信度 |
|---|---|---|---|
| Gemini 2.5 thinking updates | [blog.google/.../gemini-model-thinking-updates-march-2025](https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/) | thinking budget 机制 → 接 OpenAI reasoning,凑"三家 thinking 怎么做"对照 | 🔗 |

### ④ 模型发布 / 开源

| 项 | 日期 | 链接 | 可信度 |
|---|---|---|---|
| Gemini 3.5(Flash 先行) | 2026-05-19 | [blog.google/.../gemini-3-5](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-3-5/) | ⚠️ I/O 2026 发布 |
| Gemma 4(开源) | 2026-04-02 | [DeepMind blog](https://deepmind.google/discover/blog/) | ⚠️ "byte-for-byte 最强开放模型" |
| DeepMind blog 总入口 | — | [deepmind.google/discover/blog](https://deepmind.google/discover/blog/) | 🔗 |

---

## 跨三家可对照写的「干货」组合(挑了几个现成的)

1. **三家 agent 方法论对照** — Anthropic [Building effective agents] vs OpenAI [A practical guide to building agents] vs Google [Building agents with Gemini]:同一件事三种主张,差异即观点。
2. **三家 thinking / reasoning 怎么做** — OpenAI reasoning best practices + Gemini thinking budget + Anthropic extended thinking / Opus 4.8 effort control:test-time compute 的工程取舍。
3. **榜单失信** — OpenAI 弃 SWE-bench Verified + Anthropic 五篇 eval 工程博客(eval awareness / infra noise / AI-resistant)+ Gemini 技术报告口径:厂商自己最懂榜分不可信。
4. **长 context vs 记忆框架** — Google long-context/caching 文档 + Anthropic context engineering + 005 已写的 Letta/Mem0 退潮:长 context 吃掉 RAG 的下半场。
5. **prompt caching 三家都在推** — Anthropic / OpenAI / Google 都有 caching 文档:token 经济学的工程基本功(接 008 token 成本线)。
