# 2026 上半年 AI 大盘快照(4–5 月为主)

时效性背景库。要"当下正发生的事"、要对比数字、要找选题切口时翻这里。

> 建库 2026-05-30。本页大量条目来自联网搜索 + 二手媒体交叉(标 ⚠️),**引用前一律回一手核**,
> 尤其跑分/估值/自治时长这类数字。可信度见 [README](README.md)。
> 榜单失信线已抽进 [topic-map.md](topic-map.md) 选题 A,这里只留事实。

---

## 一、模型发布(2026-04 ~ 05)

### 国外前沿

| 模型 | 厂商 | 日期 | 关键变化 | 可信度 |
|---|---|---|---|---|
| GPT-5.5 / Pro | OpenAI | 04-23(API 4-24) | 主打 "super app / 端到端跑完任务",非纯跑分升级 | ⚠️ |
| GPT-5.5 Instant | OpenAI | 05-05 | 取代 5.3 成 ChatGPT 默认(含免费层) | ⚠️ |
| Claude Opus 4.7 | Anthropic | 04-16 | 视觉分辨率 ~3.75MP(~3×);社区吐槽"拒答过多" | ⚠️ |
| Claude Opus 4.8 | Anthropic | 05-28 | **距 4.7 仅 41 天**;SWE-bench Pro 64.3→69.2、领先 GPT-5.5 ~10 分;effort control;Claude Code dynamic workflows(数百 subagent、十万行迁移);fast mode 2.5× 快/3× 便宜 | ⚠️ 数字回 anthropic.com 核 |
| Claude Mythos(Preview) | Anthropic | 04-08 | Opus 之上新档、网络安全漏洞发现;仅约 11–48 家机构、不进日常产品 | ⚠️ |
| Gemini 3.5 Flash | Google | 05-19(I/O) | 3.5 家族打头;定位 "agents 不是 chatbot";Pro 6 月跟进 | ⚠️ |
| Gemini Omni / Antigravity 2.0 / Spark | Google | 05-19 | 多模态生成视频;agent 编排平台取代旧 Gemini CLI;24/7 主动 agent | ⚠️ |
| Gemma 4(开源) | Google | 04-02 | "byte-for-byte 最强开放模型" | ⚠️ |
| Muse Spark | Meta | 04-08 | **Superintelligence Labs 首个闭源旗舰、不放权重**——三年开源 Llama 战略转向 | ⚠️ |
| Grok 4.3 / Grok Build 0.1 | xAI | 04-17 / 05-28 | 4.3 新预训练 1M 上下文;Build 0.1 = 最快编码模型、API beta | ⚠️ |

### 国内

| 模型 | 厂商 | 日期 | 关键变化 | 可信度 |
|---|---|---|---|---|
| DeepSeek V4(Pro/Flash) | DeepSeek | 04-24 | **V4-Pro 1.6T(49B 激活)= 最大开源权重**;1M 上下文、新 DSA 稀疏注意力;对接华为/寒武纪;preview;R2 未发 | ✅ 多源(MIT TR/Bloomberg/CNN)|
| Kimi K2.6 | 月之暗面 | 04-20 | 1T MoE(32B 激活);Agent Swarm 300 子 agent×4000 步;SWE-bench Pro 平 GPT-5.5、token 成本 ~1/5 | ⚠️ |
| GLM-5.1 | 智谱 | 04-07 | 754B MoE;SWE-Bench Pro 58.4 称超 GPT-5.4/Opus 4.6 | ⚠️ |
| Qwen3.7-Max | 阿里 | 05-20 | 称自治运行最长 35h、1000+ 连续工具调用 | ⚠️ |
| 文心 5.1 | 百度 | 05-09 | 称预训练成本仅业界同规模 ~6% | ⚠️ |
| Doubao Seed-2.0-lite 升级 | 字节 | 05-06 | 首款"全模态"统一理解(视频/图/音/文原生统一);称音频理解超 Gemini-3.1-Pro | ⚠️ |

> 写作切口:① **自治时长/步数成新 KPI 但口径不一、不可比**(Opus 4.8 vs Kimi vs Qwen)→ 并入选题 A/C。② **西方收口(Muse Spark 闭源)vs 东方开源狂飙**(DeepSeek/Kimi/GLM/Qwen)。③ **开源逼平闭源有了真数据**(但多为厂商自报)。

---

## 二、行业大事 / 争议(4–5 月)

### 资本 / 格局
- **Anthropic 估值反超 OpenAI**:05-28 约 $965B post-money、超 OpenAI(~$730B);称 Q2 史上首次季度运营盈利。⚠️(CNBC/Bloomberg 交叉)
- **AI = Q1 全球创投 80%**($2420B/$3000B);五大单轮四笔在 AI。⚠️
- AI 编程估值:Cursor 谈判 $500 亿+、ARR ~$20 亿;Cognition(Devin)估值翻倍 $25–26B。⚠️
- Cerebras 上市首日 +68%(~$950 亿);SpaceX/xAI、Anthropic、OpenAI 排队 IPO。⚠️
- Nvidia $200 亿"非收购式"拿下 Groq,引反垄断质询。⚠️

### 商业模式转折(订阅经济学——最硬的一条线)
- **Anthropic 封杀第三方 agent 框架(OpenClaw)**:04-04 禁 Pro/Max 跑 OpenClaw、逼转按量;重度用户成本最高涨 50×;一周后有条件恢复。⚠️
- **Claude Code 限流危机**:官方承认用户撞限额远超预期;05-13 周限额临时上调 50%;Codex 称同任务省 4.2× token。⚠️
- **Cursor 计费改版**致账单暴涨(重度用户日 $20–30)。⚠️
- **GitHub Copilot 转 AI Credits 计费**(06-01 起)。⚠️
- 国内"免费时代"终结:豆包转付费、智谱/阿里云/腾讯云涨价。⚠️

### 监管 / 诉讼 / 安全
- **EU AI Act "Digital Omnibus" 大松绑**:高风险规则推迟到 2027。⚠️
- Reddit v. Anthropic 发回州法院(合同诉由不被版权 preempt)。⚠️
- AI 版权诉讼累计 114 起;NYT v. OpenAI 命交 2000 万条聊天记录。⚠️
- **Claude Mythos "太危险不敢公开发布"**:称 7 周自主发现 2000+ 零日、Glasswing 一月 10000+。⚠️(营销 vs 真威胁有争议)

### 岗位 / 取代信号
- 2026 科技裁员破 14.2 万;"AI 裁员洗白"成热词(Deutsche Bank)。⚠️
- **初级工程师岗真实塌缩**:Stanford HAI 称 22–25 岁开发者就业自 2024 降 ~20%;起薪 -8~15%、资深 +12~18%。⚠️(AI 取代岗位里少数有硬数据的)
- 中国封杀 Meta 收购 Manus($20 亿)。⚠️

### "打脸 / 反转"(hype 退潮——接 008 的判断风格)
- **Klarna 反转**:曾称 AI 干 700 人活、悄悄回招人;重复联系率 +25%。⚠️
- **METR 无法复现** 2025 生产力实验(开发者不愿不用 AI);CodeRabbit 称 AI 代码问题 1.7×;Uber 4 个月烧光 AI 预算无可测提升。⚠️
- **MIT "95% AI 试点零回报" 报告被反咬**:方法论(52 次访谈、成功定义过窄)遭质疑。⚠️
- AI 泡沫警报:Microsoft-OpenAI-Nvidia 循环交易;英国央行/IMF/WEF 警告。⚠️

---

## 三、榜单失信线(选题 A 的事实底料)

- **OpenAI 官方弃用 SWE-bench Verified**(✅ 已确认):审计 27.6% 子集、**≥59.4% 题目测试用例有缺陷**(把功能正确答案判错);**所有受测前沿模型都能复现人写的 ground-truth 修复 = 训练污染**;"提升不再反映真实开发能力、越来越只反映训练时见过多少这个榜";官方改荐 SWE-bench Pro。[openai.com 原文](https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/) · [当事人播客](https://www.latent.space/p/swe-bench-dead)
- scaffold 通胀:同基座裸跑 69% vs 激进 scaffold 81%(差 12 分);三框架跑同模型 731 题差 17 题。⚠️
- 实测落差:lab vs prod 差 37%、同等准确率成本差 50×。⚠️
- 学术打假:[SWE-ABS](https://arxiv.org/pdf/2603.00520)(对抗加固揭穿虚高)、[ProdCodeBench](https://arxiv.org/pdf/2604.01527)(生产代码建榜)、[What's in a Benchmark](https://arxiv.org/pdf/2602.04449)。⚠️
- 迁移方向:Verified(已饱和~90%)→ SWE-bench Pro(私有库、抗污染)。各家口径不一仍不可比。⚠️
- Anthropic 自家拆榜:eval awareness(模型知道在被考)/ infra noise / AI-resistant evals —— 见 [sources-official.md](sources-official.md) §一①。✅(标题日期确认)

---

## 已确认的一手强源(可直接引)

- OpenAI 弃 SWE-bench Verified 文(读原文取措辞)· Anthropic 评测组工程博客 5 篇(标题日期已确认)· DeepSeek V4(MIT TR/Bloomberg/CNN 多源)· Anthropic/OpenAI/Google 各 agent 与长 context 官方文档([sources-official.md](sources-official.md))。
- 其余 ⚠️ 条目:写进 draft 前按 `feedback_research_method` 回一手核,二手数字 inline 标诚实度(`feedback_wechat_publication_v3`)。
