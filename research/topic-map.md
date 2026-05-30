# 主题地图:已写(001–008)+ 延伸选题候选

把已发的八期连成一条线,再从这条线长出延伸选题。方向:**8 成往技术干货走**(memory `feedback_topic_direction`)。
延伸优先于另起炉灶——同一拨读者、可复用的 voice 和上下文,复利最高。

> 建库 2026-05-30。每个延伸候选标:接哪期 · 一句话钩子 · 官方支撑源 · 与已写的区别(不撞车)。
> 官方源详见 [sources-official.md](sources-official.md);时效背景见 [landscape-2026H1.md](landscape-2026H1.md)。

---

## 一、已写的八期(我们的线)

| # | 标题(短） | 一句话内核 | 体裁 | 复用资产 |
|---|---|---|---|---|
| 001 | DeepSeek V4-Pro vs Claude | 跑分追平,但**审美/真实使用**两回事;一手三道题实测 | 实测对比 | 跑分 vs 实测 的母题 |
| 002 | 原生多模态到底是什么 | "原生多模态"是营销词、但对应真架构(token 级融合);辨别口诀 | 架构科普+评判 | 三层分类法、辨别口诀套路 |
| 003 | 前端/后端/PM 塌缩成一个岗位 | SDD 重装流水线;塌的不是岗位是分工前提;reframe | 范式报道+评判 | 范式收敛、岗位数据(BLS) |
| 004 | 让 AI 干活的是 harness | 模型是无状态函数,做事的是外面那层壳;Agent = Model + Harness | 概念奠基 | **harness 母题**、马具隐喻 |
| 005 | AI 记忆框架被发明者抛弃 | MemGPT/Letta/Mem0 退回 markdown+grep;长 context 反扑、RAG 退潮 | 行业级现象+评判 | **记忆/context 母题**、RAG 之死 |
| 006 | 你跟 AI 的关系分三阶段 | 问答/执行/托付;能力是 AI 的、用法是你的;reframe OpenAI 5 阶段 | 用户视角 reframe | 大众盘、阶段轴 |
| 007 | 你写的 harness 正在变技术债 | 能力脚手架会折旧(半衰期≈一个模型周期);治理层不贬值;thin harness/fat skills | 工程判断 | harness 折旧、训练/生产分野 |
| 008 | 效率翻倍团队交付没动(SPDD) | 个人快团队没快(METR/DORA/Faros);瓶颈移到 review/集成;prompt 当代码管 | 报道+评判 | **榜分/测量母题**、二手标注规范 |

### 反复出现的母题(延伸都从这几条长)

- **跑分 / 测量 vs 真实**(001、008)→ 榜单失信
- **harness / agent 工程**(004、007)→ 多 agent、skills、MCP、治理层
- **记忆 / context**(005)→ context engineering、长 context vs RAG
- **范式 / 角色 reframe**(003、006)→ 把别人的框架重切一刀
- **判断风格**:报道+评判、反方不少于正方、大方归属、不抢原创、给读者带走一个判断/口诀

---

## 二、延伸选题候选(高优先 · 偏干货)

### A. 榜单失信:发布会那个分数,跟你仓库里的 bug 没关系 ★已锁(下一期方向)
- **接**:001(跑分 vs 实测)+ 008(METR/Faros 测量)。
- **钩子**:2026 上半年最有名的编程榜(SWE-bench Verified)被它最大的用户**亲手弃用**了。
- **干货核**:OpenAI 官方弃用 Verified;scaffold 让同模型差 12 分、跨框架差 17 题、59% 题目测试有缺陷;实测 lab-vs-prod 差 37%、成本差 50×;Anthropic 主打 Pro 69.2% 同时自家博客系统性拆榜(eval awareness 模型知道在被考 / infra noise / AI-resistant evals)。
- **官方源**:OpenAI [弃用 Verified] + Anthropic 评测组五篇 + Gemini 技术报告口径([sources-official.md](sources-official.md) §一①、§二①)。
- **不撞车**:008 = 团队吞吐;A = 榜分 vs 你的真实代码 + 自建 eval。
- **verdict 落点**:别用单一榜分选模型;自建 eval 是新工程能力;读分要连 scaffold 一起读。

### B. context engineering 上位 / RAG 之死的下半场
- **接**:005(记忆框架退潮)。
- **钩子**:prompt engineering 退场,context engineering 接棒;长 context 把 RAG 吃到什么程度了。
- **干货核**:Anthropic "context 是工程问题不是模型问题";Google 官方教 1M–2M 长 context + caching 成本;什么场景长 context 赢、什么还得 RAG。
- **官方源**:Anthropic [Effective context engineering] + Google [long-context]/[caching] + 005 已有 Letta/Mem0 料。
- **不撞车**:005 讲"记忆框架被抛弃"的现象;B 讲"那之后该怎么做"的工程方法。

### C. 多 agent 什么时候反而坏事
- **接**:007(Lance Martin 删多 agent 架构那段)。
- **钩子**:人人在卷"几百个子 agent 并行",但删掉多 agent 反而更好的案例越来越多。
- **干货核**:Anthropic [Scaling Managed Agents: 大脑与手分离];Opus 4.8 dynamic workflows 数百 subagent vs Kimi 300 agent×4000 步 vs Qwen 35h×1000 调用——**自治时长/步数成了新 KPI 但口径不一、不可比**(这点也能并进 A)。
- **官方源**:Anthropic [managed-agents] + OpenAI Agents SDK + landscape 的自治时长数字。
- **不撞车**:007 讲 harness 折旧;C 专攻"单 vs 多 agent"的工程判断。

### D. 版本号通胀:几周一个小版本,在改变什么(一手可即时验证)
- **接**:全线(harness/选型)。
- **钩子**:Opus 4.6→4.7→4.8 共约几十天;高频小迭代对选型、回归测试、prompt/eval 维护的真实冲击。
- **干货核**:迭代节奏数据(4.7→4.8 仅 41 天);你能一手体感;"追新成本 vs 收益"。搜索依赖最低、翻车风险最小。
- **官方源**:三家发布节奏(Anthropic news / OpenAI / Google)。
- **不撞车**:无重叠;偏轻、适合穿插在重稿之间。

---

## 三、延伸候选(中优先)

| 选题 | 接 | 钩子 / 干货核 | 官方源 |
|---|---|---|---|
| **Skills 是不是新的 harness 层** | 004/007 | thin harness/fat skills 的官方落地;skills 抽象会不会重蹈 framework 覆辙 | Anthropic [news/skills] |
| **MCP 的下一步是 code execution** | 004 | 海量工具调用 → 用代码执行收敛;顺带 MCP 权限/供应链安全 | Anthropic [code-execution-with-mcp]、[writing-tools-for-agents] |
| **三家 agent 方法论对照** | 004 | 同一件"怎么搭 agent",三家主张差在哪 = 观点 | Anthropic vs OpenAI vs Google 三份指南 |
| **test-time compute 的边际递减 / 何时关 thinking** | 新 | reasoning 不是越想越对;overthinking、成本/延迟代价、effort control | OpenAI reasoning best practices + Gemini thinking + Opus 4.8 effort control |
| **前沿能力分层供给** | 新 | Mythos 太强不公开、只给少数机构;最强模型不再对公众开放 | Anthropic [Mythos preview] |
| **prompt caching:token 经济学基本功** | 008 | 三家都在推 caching;命中率怎么决定你的账单 | 三家 caching 文档 |

## 四、延伸候选(低优先 / 偏行业,不那么干货)

- **闭源转向**:Meta Muse Spark(首个闭源旗舰)vs 国内开源狂飙——"西方收口、东方开源"的反转。
- **订阅经济学反噬**:OpenClaw 封禁 + Claude Code 限流 + Cursor 账单暴涨 + 国内"免费时代"终结——固定月费 vs agent 无底洞 token。
- **初级工程师入场券被收走**:Stanford HAI 22–25 岁开发者就业 -20%(AI 取代岗位里少数有硬数据的)。
- **开源逼平闭源有了真数据**:Kimi K2.6 / GLM-5.1 在 SWE-bench Pro 平/超 GPT-5.5、成本 1/5(注意厂商自报、需第三方复测)。

---

## 选题自检(沿用 ideas.md)

写之前过一遍:① 当下正发生?② 我有别人没有的视角/一手数据?③ 一句话说清核心观点?④ 标题我自己想点开?⑤ 5–7 章讲得完?
**干货向额外加一条:⑥ 读者读完,认知/做法有具体改变吗(不是只知道了一条新闻)?**
