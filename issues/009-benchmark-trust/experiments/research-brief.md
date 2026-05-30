# 009 · research-brief · 榜单失信 带源料库

draft.md 里所有事实都从这里出。可信度:✅ 一手/多源确认 · ⚠️ 二手需回核 · 🔗 URL 确认正文未逐篇读。
跨期官方源总目录见 [research/sources-official.md](../../../research/sources-official.md)。

---

## 00 名词分清(准确性红线)

- **SWE-bench** = Princeton 等原始榜(真实 GitHub issue 修复)。原站 [swebench.com](https://www.swebench.com/)。
- **SWE-bench Verified** = OpenAI 2024-08 人工校验的 500 题子集。⚠️ 写前回 OpenAI 2024-08 原公告确认"由 OpenAI 推出",标题 A「作者自己弃用」才站得住。
- **SWE-bench Pro** = 更难、含私有/商业库、结构抗污染的新版。⚠️ 也有质疑(见 §04 LessWrong)。
- 三者不可混称。跨版本、跨厂商分数默认不可比。

---

## 01 最有名的榜被弃用(✅ 本篇最硬的锚)

| 事实 | 源 | 可信度 |
|---|---|---|
| OpenAI 官方弃用 SWE-bench Verified、改荐 SWE-bench Pro | [openai.com/index/why-we-no-longer-evaluate-swe-bench-verified](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) | ✅ 关键发现已确认,定稿回原文取措辞 |
| 审计 27.6% 子集 → **≥59.4%** 题目测试用例有缺陷(把功能正确答案判错) | 同上 | ✅ |
| 所有受测前沿模型都能复现人写的 ground-truth 修复 = 训练污染 | 同上 | ✅ |
| 结论原话(意译):提升"不再反映真实开发能力,越来越只反映训练时见过多少这个榜" | 同上 | ✅ 回原文取逐字 |
| 弃榜决策当事人访谈(OpenAI Frontier Evals 负责人 Mia Glaese / Olivia Watkins) | [latent.space/p/swe-bench-dead](https://www.latent.space/p/swe-bench-dead) | ✅ 人物/动机料 |
| OpenAI Devs 官推:改荐报告 SWE-bench Pro | [x.com/OpenAIDevs/status/2026002219909427270](https://x.com/OpenAIDevs/status/2026002219909427270) | 🔗 |
| 行业转述/背景 | [tessl.io blog](https://tessl.io/blog/openai-moves-beyond-swe-bench-verified-as-coding-benchmarks-saturate/) · [Epoch AI: SWE-bench Verified](https://epoch.ai/benchmarks/swe-bench-verified) | ⚠️ 背景用 |

---

## 02 一个分数怎么刷出来的(scaffold × 污染 × 饱和)

| 事实 | 源 | 可信度 |
|---|---|---|
| 同基座裸跑 ~69% vs 激进 scaffold ~81%(差 ~12 分) | [agentmarketcap 饱和分析](https://agentmarketcap.ai/blog/2026/04/10/swe-bench-saturation-90-percent-coding-benchmarks) | ⚠️ 二手,回一手溯源确切口径 |
| 三框架跑同模型、731 题差 17 题(2026-02) | [tianpan.co agentic coding production gap](https://tianpan.co/blog/2026-04-09-agentic-coding-production-swebench-gap) | ⚠️ 二手 |
| 顶分跨 harness 可差 ~12 分;"最常引用的编程榜可能不再衡量我们以为的东西" | [codeant SWE-bench scores](https://www.codeant.ai/blogs/swe-bench-scores) | ⚠️ 二手 |
| 饱和:~20%(2024-08)→ >80~90%(2026 初) | [Epoch AI](https://epoch.ai/benchmarks/swe-bench-verified) · [swebench.com](https://www.swebench.com/) | ⚠️ 用区间不给假精确 |
| 学术:scaffold 对成功率影响巨大 / 题目缺陷 | [arXiv What's in a Benchmark 2602.04449](https://arxiv.org/pdf/2602.04449) | 🔗 |
| **公允反差**:Anthropic 自己 2025-01 教怎么搭 scaffold 上 SWE-bench Verified | [anthropic.com/engineering/swe-bench-sonnet](https://www.anthropic.com/engineering/swe-bench-sonnet) | ✅ |

> 论点:刷榜是公开的工程活,人人都做。所以"A 模型比 B 高几分"大半在脚手架和测试设置里,不在模型里。

---

## 03 最懂榜的公司自己在拆榜(Anthropic 双面 · 全文最硬)

### 一边:发布会主打数字

| 事实 | 源 | 可信度 |
|---|---|---|
| Opus 4.8 主打 SWE-bench **Pro** 64.3%→69.2%、领先 GPT-5.5 ~10 分 | [anthropic.com/news/claude-opus-4-8](https://www.anthropic.com/news/claude-opus-4-8)(WebFetch 曾 403,Joy 开页核)· [the-decoder](https://the-decoder.com/anthropic-ships-claude-opus-4-8-as-a-modest-but-tangible-improvement-that-tops-gpt-5-5-in-most-benchmarks/) | ⚠️ 必核 |
| 自标"部分 OSWorld 涨幅是 harness 改进、非模型";重测 4.7 旧分(透明标注、但使 delta 看着更小) | [venturebeat](https://venturebeat.com/technology/anthropics-claude-opus-4-8-is-here-with-3x-cheaper-fast-mode-and-near-mythos-level-alignment) | ⚠️ 必核原文措辞 |
| 唯一输的榜是 Terminal-Bench(GPT-5.5 在终端流仍占优) | [the-decoder](https://the-decoder.com/anthropic-ships-claude-opus-4-8-as-a-modest-but-tangible-improvement-that-tops-gpt-5-5-in-most-benchmarks/) | ⚠️ |

### 另一边:自家工程博客系统拆榜

| 博客 | 日期 | 论断(引前读正文取原话) | 链接 | 可信度 |
|---|---|---|---|---|
| **Eval awareness in Opus 4.6's BrowseComp** | 2026-03-06 | 模型能察觉自己在被考、于是表现不同——重点写、中文圈几乎没人讲 | [engineering/eval-awareness-browsecomp](https://www.anthropic.com/engineering/eval-awareness-browsecomp) | ✅ 标题日期确认 |
| Quantifying infrastructure noise in agentic coding evals | 2026-02-05 | 基础设施抖动会污染 agentic 榜分 | [engineering/infrastructure-noise](https://www.anthropic.com/engineering/infrastructure-noise) | ✅ |
| Designing AI-resistant technical evaluations | 2026-01-21 | 题目会被模型做穿,评测要专门抗 AI | [engineering/AI-resistant-technical-evaluations](https://www.anthropic.com/engineering/AI-resistant-technical-evaluations) | ✅ |
| Demystifying evals for AI agents | 2026-01-09 | "让 agent 有用的能力正好让它最难评测";教自建 eval | [engineering/demystifying-evals-for-ai-agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | ✅ |
| An update on recent Claude Code quality reports | 2026-04-23 | 真实质量回归、榜分没体现(体感 vs 跑分) | [engineering/april-23-postmortem](https://www.anthropic.com/engineering/april-23-postmortem) | ✅ |

> 论断:这不是虚伪,是诚实——最懂榜的人最不迷信单一数字。steelman,不打脸。

---

## 04 榜分和你的仓库隔着什么(production gap)

| 事实 | 源 | 可信度 |
|---|---|---|
| lab-vs-prod 约 37% 落差、同等准确率成本差约 50× | [aiagentsquare AI agent benchmarks 2026](https://aiagentsquare.com/blog/ai-agent-benchmarks-2026.html) | ⚠️ 二手,给数字带"据 X"或回一手 |
| 架构比模型名更决定分数:同模型三框架差 17 题(731) | [tianpan.co](https://tianpan.co/blog/2026-04-09-agentic-coding-production-swebench-gap) | ⚠️ 二手 |
| 生产派建榜补洞 | [arXiv ProdCodeBench 2604.01527](https://arxiv.org/pdf/2604.01527) | 🔗 |
| 对抗加固揭穿虚高通过率 | [arXiv SWE-ABS 2603.00520](https://arxiv.org/pdf/2603.00520) | 🔗 |
| **steelman 反方**:Pro 也未必干净 | [LessWrong: SWE-Bench Pro is even worse](https://www.lesswrong.com/posts/nAMhbz5sfpcynjPP5/swe-bench-pro-is-even-worse) | ⚠️ 04 章带一句,不偏袒 |
| benchmark 的正当用法(相对/同口径/看趋势) | [kili: AI benchmarks 2026 limits](https://kili-technology.com/blog/ai-benchmarks-guide-the-top-evaluations-in-2026-and-why-theyre-not-enough) | ⚠️ steelman 支撑 |

---

## 05 那该信什么(verdict + 落地)

| 落地点 | 源 | 可信度 |
|---|---|---|
| 在自己真实活上跑 3–4 周、按"实际交付"评(而非 demo) | [tianpan.co](https://tianpan.co/blog/2026-04-09-agentic-coding-production-swebench-gap) 收尾建议 | ⚠️ 论点常识,可不引 |
| 自建 eval 手把手 | [Anthropic Demystifying evals](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | ✅ |
| 开源行为评测工具起步 | [Anthropic Bloom](https://www.anthropic.com/research/bloom)(四阶段:ideation→并行 rollout→judge 打分) | ✅ 机制确认 |
| OpenAI 在自建未污染评测 | [弃榜原文](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) | ✅ |
| 读分连 scaffold/版本/设置一起读;跨厂商默认不可比 | §02 §03 综合 | — |

---

## 06 护城河挪去哪了(收口接自己的线)

- 榜分折旧 → 接 007《harness 技术债》折旧逻辑(贬值的是代码/分数,不贬值的是判断/测量能力)。
- 自建 eval / harness 成新工程能力 → 接 004《harness》、008《测量》。
- 行业都在重建测量而非接着刷旧榜:OpenAI 自建未污染评测 + Anthropic Bloom + 各家 Verified→Pro 迁移。
- 结尾金句素材:别问"它考了多少分",问"这个分到了你的仓库里还剩多少"。

---

## 待 Joy 一手补强(可选,提含金量)

- 🔑 你自己用 Cursor/Claude Code/Codex 时,有没有"发布会屠榜、到自己项目却拉胯"的具体一手体感?放 04 或 05 章一段(真体感才写,不编)。
- 🔑 anthropic.com/news/claude-opus-4-8 与 OpenAI 弃榜原文,定稿前你亲自开页核一遍确切数字与措辞(WebFetch 对 anthropic.com 被 403)。
