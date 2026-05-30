# 009 · 榜单失信:发布会那个分数,跟你仓库里的 bug 没关系 · notes

## 定位

报道 + 评判,不是"唱衰 benchmark"、不是翻译。一件具体的、台面上正在发生的事:2026 上半年,
最有名的 AI 编程榜 **SWE-bench Verified** 被**亲手做出它的 OpenAI** 公开弃用。本文的价值不在转述这条新闻,
在**把它放进版图 + 给读者一个能用的判断**——榜分是怎么和"agent 能不能修好你仓库里的 bug"系统性脱钩的,
以及最懂这件事的 Anthropic,为什么一边把 69.2% 摆上发布会头条、一边在自家工程博客把这种数字拆得最透。

接 008(测量母题)与 004/007(harness 母题),但不撞车——见末尾「与已写划界」。

## 一句话钩子

你按发布会跑分选 AI 工具,但 2026 上半年,做出最有名那个编程榜 Verified 子集的 OpenAI,自己把它弃用了——
理由是榜被训练数据污染、刷分不再等于会修 bug。这篇讲榜分怎么和你的真实代码脱了钩,以及该信什么。

## 标题候选(已定方向,draft 时拍板)

- **A(主推)**:发明这个榜的人,自己把它弃用了 ——「发明者抛弃发明」反差,延续 005 成功句式;准确(OpenAI 确是 Verified 子集的作者)
- B:最有名的 AI 编程榜,今年被它最大的用户亲手弃用了
- C(最实用向):AI 又把榜屠了,可它到你仓库还是修不好 bug
- D(最夸张):你按跑分选的 AI,可能正在骗你

> 标题可稍夸张(Joy 定向),但正文必须硬。倾向 A 或 C。

## 核心观点(这篇要让读者改变的认知)

1. **一个榜分已经几乎不能告诉你 agent 能不能修好你的代码——这不是猜测,是 OpenAI 官方审计后宣布的。** 审计 27.6% 子集,发现 ≥59.4% 题目测试用例有缺陷(把功能正确的答案判错);所有受测前沿模型都能复现人写的 ground-truth 修复 = 训练污染。结论原话:提升"不再反映真实能力,越来越只反映训练时见过多少这个榜"。

2. **榜分 = 模型 × scaffold × 运气,三者纠缠,所以跨厂商比分本就不可比。** 同一基座裸跑 vs 激进 scaffold 能差十几分;同模型换框架在同一批题上结果差一截。你看到的"A 模型 87% > B 模型 85%",大半可能是脚手架和测试设置的差,不是模型的差。

3. **榜单失信不是阴谋论,是行业自己在台面上承认的事。** OpenAI 弃 Verified、改荐更难更抗污染的 SWE-bench Pro;连最懂的 Anthropic 都在自家工程博客系统性拆榜:模型能察觉自己在被考(eval awareness)、基础设施抖动会污染榜分(infra noise)、题目会被模型做穿要专门设计抗 AI 的评测。

4. **Anthropic 的"双面"恰恰是诚实的样子,不是虚伪。** 发布 Opus 4.8 时它主打的是更难、抗污染的 SWE-bench **Pro**(不是已饱和到 ~90% 的 Verified),还自己标注"部分涨幅来自 harness 改进、不是模型本身"。最懂榜的人,最不迷信单一数字。这一章是 steelman,不是打脸。

5. **榜分和你的仓库之间隔着一条真实的沟。** 题目是"修好被封装好的孤立 bug",你的活是"在祖传屎山里、带着约束/合规/集成/上下游"。实测 lab-vs-prod 有明显差距、同等准确率成本能差很多倍。Demo 好看 ≠ 你交付得了。

6. **读者带走的判断(verdict)。** 别用单一综合榜分选模型/工具;在你自己的真实活上跑 3–4 周、按"你实际交付了什么"评;**自建 eval 正在变成新的工程能力**(Anthropic 手把手写过、还开源了 Bloom);读分要连 scaffold、榜的版本、你的语言/框架/规模一起读。

7. **更深一层(收回自己的线)。** 榜一旦失信,护城河就从"模型考了多少分"挪到"你能不能为自己的场景造出可信的 eval 和 harness"——接 004/007 harness、008 测量。贬值的是榜分,不贬值的是你自己测量的能力。

## 读者画像

工程师、技术负责人、CTO、独立开发者。每天用 AI 编程工具(Cursor / Claude Code / Copilot / Codex),
会看发布会跑分、被 "SWE-bench 87%" 这种数字影响选型。听过 SWE-bench、benchmark、scaffold 这些词,不用从 0 解释。
不是 AI 研究员(他们早清楚),也不是零基础读者。

读者最常见的误解:① 拿发布会综合榜分当选型依据;② 以为"屠榜" = 在自己项目里也一样好用;
③ 以为"A 比 B 高两分"就是 A 模型更强。

## 名词必须分清(准确性红线)

- **SWE-bench**:Princeton 等 2024 提出的原始榜(真实 GitHub issue 修复)。
- **SWE-bench Verified**:**OpenAI 2024-08 做的人工校验子集**(500 题)——所以"弃用它的正是它的作者 OpenAI",标题 A 成立。
- **SWE-bench Pro**:更难、含私有/商业库、结构上抗污染的新版(注意:也有人质疑 Pro 同样有问题,见 LessWrong《SWE-Bench Pro is even worse》,04 章 steelman 带一句,不偏袒)。
- 别把三者混写成"SWE-bench"一个词。

## 大致提纲(6 章,章节数可调)

### 01 最有名的榜,被弃用了

- 事实开篇,不用钩子腔。OpenAI 官方发文弃用 SWE-bench Verified、改荐 Pro。
- 确切理由:审计 27.6% 子集 → ≥59.4% 题目测试用例有缺陷;所有前沿模型都能复现 ground-truth = 训练污染。
- 点透反差:你还在拿来选工具的那个分,做出它的人已经说"别再用了"。
- 收口(单句金句,不预告章节):一个跑了一年半、人人引用的数字,作者自己宣布它不再衡量它声称衡量的东西。

### 02 一个分数是怎么刷出来的

- 榜分 = 模型 × scaffold × 运气。拆"同基座裸跑 vs 激进 scaffold 差十几分""同模型换框架差一截"。
- 饱和本身是信号:从 ~20%(2024)冲到 ~90%(2026),逼近天花板时,涨的越来越多是脚手架和过拟合,不是能力。
- 公允反差:Anthropic 自己 2025-01 也写过《Raising the bar on SWE-bench Verified》教怎么搭 scaffold 上分——不是黑它,是说明"刷榜"是公开的工程活,人人都在做。
- 收口:你看到的模型间几分之差,大半在脚手架和测试设置里,不在模型里。

### 03 最懂榜的公司,自己在拆榜

- Anthropic 双面。一边:Opus 4.8 发布主打 SWE-bench **Pro** 69.2%(避开已饱和的 Verified),还自标"部分 OSWorld 涨幅是 harness 改进、不是模型";重测过 4.7 旧分(让 delta 看着更小、但透明标注)。
- 另一边,自家工程博客系统拆榜(这一组是全文最硬的料):
  - **eval awareness**(Opus 4.6 BrowseComp):模型能察觉自己在被考、于是表现不一样——最反直觉、中文圈几乎没人讲,重点写。
  - **infra noise**:连基础设施抖动都会污染 agentic 榜分。
  - **AI-resistant evals**:题目会被模型做穿,评测得专门设计成抗 AI。
- 论断:这不是虚伪,是诚实——最懂榜的人最不迷信单一数字。(steelman,不打脸)
- 收口:厂商把数字摆上头条是营销需要;同一家公司在博客里把这种数字拆得最透,这两件事不矛盾。

### 04 榜分和你的仓库,隔着什么

- benchmark vs production gap。题目 = 修好被封装好的孤立 bug;你的活 = 屎山 + 约束 + 合规 + 集成 + 上下游。
- 数据:lab-vs-prod 明显落差、同等准确率成本差很多倍(标二手/回一手)。
- arXiv 在补这个洞:ProdCodeBench(生产代码建榜)、SWE-ABS(对抗加固揭穿虚高)——但榜永远滞后于你的真实场景。
- steelman:不是说 benchmark 没用。它在"相对、同口径、看趋势"时有意义;坏在被当成"绝对能力分 + 选型依据"。
- 收口:Demo 屠榜和你按时交付,是两件被一个数字假装连起来的事。

### 05 那该信什么

- verdict + 落地(给"读完要行动"的读者):
  - 别用单一综合榜分选工具;看"在你的语言 / 框架 / 仓库规模"上的细分表现。
  - 在自己真实活上跑 3–4 周,按"你实际交付/合并了什么"评,不是按 demo。
  - **自建 eval 是新工程能力**:Anthropic《Demystifying evals for AI agents》手把手 + 开源 Bloom 可起步。
  - 读任何榜分,连 scaffold、榜版本(Verified/Pro)、测试设置一起读;跨厂商分数默认不可比。
- 收口:把"它考了多少分"换成"这个分在我的场景里还剩多少"。

### 06 榜失信之后,护城河挪去哪了

- 收回自己的线。榜分会贬值(接 007 折旧);能为自己场景造可信 eval / harness 的能力在升值(接 004/008)。
- 行业信号:OpenAI 自建"未污染评测"、Anthropic 开源 Bloom、各家从 Verified 迁 Pro——大家都在重建测量,而不是接着刷旧榜。
- 结尾金句(给读者带走,不用"总结"):下次看到发布会屠榜,别问它考了多少分,问这个分到了你的仓库里还剩多少。

## 待 verify 事实清单

完整带源见 [experiments/research-brief.md](experiments/research-brief.md)。关键项——

| 项 | 状态 | 说明 |
| --- | --- | --- |
| OpenAI 弃 Verified + 27.6% 审计 / ≥59.4% 缺陷 / 全模型复现 ground-truth(污染) | ✅ 已确认 | 一律引 [openai.com 原文](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/),draft 定稿时回读取确切措辞 |
| SWE-bench Verified 是 OpenAI 2024-08 做的子集(标题 A 的依据) | ⚠️ 必核 | 写前回 OpenAI 2024-08 原公告确认"Verified 由 OpenAI 推出",别说成 OpenAI 发明了整个 SWE-bench |
| scaffold 同模型差十几分 / 跨框架差一截 | ⚠️ 二手 | 回一手:哪篇实测、确切数字与口径(裸跑 69% vs scaffold 81%、三框架 731 题差 17 题来自二手,需溯源) |
| 饱和 ~20%(2024)→ ~90%(2026) | ⚠️ 二手 | 用 Epoch AI / swebench.com 榜单核区间,别给假精确 |
| Opus 4.8 SWE-bench Pro 64.3%→69.2%、领先 GPT-5.5 ~10 分 | ⚠️ 必核 | 回 [anthropic.com/news/claude-opus-4-8](https://www.anthropic.com/news/claude-opus-4-8)(WebFetch 曾 403,Joy 直接开页核) |
| Opus 4.8 自标"部分涨幅是 harness、重测 4.7 旧分" | ⚠️ 必核 | 回原文 / system card 取确切措辞,别凭二手 |
| eval awareness(Opus 4.6 BrowseComp) | ✅ 标题日期确认 | 引具体论断要读正文 [engineering/eval-awareness-browsecomp](https://www.anthropic.com/engineering/eval-awareness-browsecomp) 取原话 |
| infra noise / AI-resistant evals / Demystifying evals / Bloom | ✅ 标题日期确认 | 同上,引论断读正文 |
| Anthropic 2025-01 Raising the bar on SWE-bench Verified | ✅ 确认 | [engineering/swe-bench-sonnet](https://www.anthropic.com/engineering/swe-bench-sonnet),02 章公允反差用 |
| lab-vs-prod 37% gap / 50x 成本差 | ⚠️ 二手 | 来自 aiagentsquare,标二手或回一手;给数字必须带"据 X" |
| ProdCodeBench / SWE-ABS / SWE-bench Pro "even worse" | ⚠️ 二手 | arXiv/LessWrong,04 章带一句即可,引前看原文 |
| Codex 同任务省 4.2× token(若用) | ⚠️ 二手 | 008 用过,本篇非必需,用则标二手 |

## 配图意图

不预设数量,优先 monospace 文本图(见 memory `feedback_text_architecture_diagrams`)。当前规划:

| # | 嵌入位置 | 内容 | 来源 |
| --- | --- | --- | --- |
| 头图 | 标题下 | 题图 | cover 导出或自选 |
| 1 | 01 章 | SWE-bench Verified 饱和曲线 + 弃用时间点(~20%→~90%) | monospace 文本图 |
| 2 | 02 章 | 榜分 = 模型 × scaffold × 运气(同模型不同 scaffold / 跨框架差) | monospace 文本图 |
| 3 | 03 章 | Anthropic 双面对照:发布会头条数字 vs 自家拆榜博客清单 | monospace 文本图 |
| 4 | 04 章 | benchmark vs 你的仓库:孤立 bug vs 屎山+约束+集成(gap / 成本) | monospace 文本图 |
| — | 各章 | OpenAI 弃榜原文、Anthropic eval-awareness 博客 | 网页截图占位 |

## 风格约束

- **本期及以后默认按 [memory/feedback_writing_voice.md](../../memory/feedback_writing_voice.md) 五条**(标题直白 / 少英文 / 短句通俗 / 少破折号双引号 / 不说教);下面是本期具体补充。
- 002 voice 基准:大段散文说理 + 数字/事实穿插,几乎不加粗,第一人称只在真体感处用。
- 章节标题陈述句、≤ 12 字,不反问、不"X 是什么"、不每章套同一关键词。
- 反 AI 味(见 memory `feedback_writing_voice` / `feedback_no_lecture_voice`):不"扎心真相"标题党开头、不反问钩子、不自问自答、不"评论区告诉我"导流、不装饰双引号、不"第 N 刀"排比、不总结句收尾、不章节间跳转语。
- **steelman 不少于批判**:03 章(Anthropic 双面=诚实)、04 章(benchmark 在对的用法下有意义)必须是结构性的正面回应,不是装点。体裁是评判不是唱衰。
- 论点大方归属:OpenAI / Anthropic 的话归属给它们,作者增值在版图与判断,不抢原创(本角度英文圈 latent.space / tessl 等已写过,中文深度评判是增量)。
- 技术专名保留英文(SWE-bench / SWE-bench Verified / SWE-bench Pro / scaffold / harness / eval / benchmark / Terminal-Bench / OSWorld / GDPval / ground-truth / contamination / eval awareness / Codex / Claude Code 等),其余尽量中文(见 `feedback_minimize_english`)。
- 每个事实 inline 跟可点击 markdown 链接(draft.md 是 markdown 真源);二手数据 inline 标诚实度(见 `feedback_wechat_publication_v3`)。
- 链接策略遵循 `feedback_wechat_publication_v3`(公号正文不带 a 标签,markdown 真源 draft.md 带)。
- 章节编号 01-06;强调两级按 [design.md](../../design.md);不限字数,按 `feedback_long_form_writing`。

## 与已写划界

- **001(跑分 vs 实测)**:001 是单次一手实测的体感差异;009 是榜单机制级的失信(为什么榜分系统性脱钩)。
- **008(METR/DORA/Faros)**:008 是"个人快 vs 团队没快"的交付吞吐;009 是"榜分 vs 你的真实代码"的测量信任。母题同源(测量),切口不同。
- **004/007(harness)**:009 只在 06 章收口接 harness/eval 线,不重写 harness 定义。

## 复盘(发布后填)

- 阅读量:
- 读者反馈中反复出现的关键词:
- 哪段写得最好(被截图传播的段落):
- 最有争议的段落:
- 下次能更好的:
