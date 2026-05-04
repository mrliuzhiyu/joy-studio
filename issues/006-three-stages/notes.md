# 006 · 你跟 AI 的关系，正在分裂成三个阶段 · notes

## 一句话定位

OpenAI 那张 5 阶段路线图是站在 AI 能力角度看的，告诉你 AI 能做什么。这篇文章换一个轴——站在用户角度看，你跟 AI 的关系可以分成三个阶段：问答、执行、托付。同一颗 L3 模型，绝大多数人还当 L1 在用。AI 走了两代，你的用法没动。

## 核心观点

- 业内常用的 chat 和 agent 不在同一个维度——chat 是 UI 形态、agent 是 capability 能力，并排放在"阶段"里逻辑上是混的
- 真正有意义的分阶段轴是：你跟 AI 之间是什么关系。这个轴上能立住的是问答 / 执行 / 托付三段
- 问答（2022-）：你问它答，AI 是工具，代表 ChatGPT / Kimi / 文心 / 豆包
- 执行（2024 末-）：你派它干，AI 是下属，代表 Claude Code / Cursor / Devin / Sierra / Harvey / Cowork
- 托付（2026-）：它自己来，AI 是合伙人，代表 background agents / Anthropic Memory features / Lindy always-on / Kimi K2.6 5 天连续运行
- AI 能力在加速：L1 → L2 用了 652 天（ChatGPT 2022-11-30 → o1-preview 2024-09-12），L2 → L3 只用了 40 天（→ Computer Use 2024-10-22），普及节奏 5 个月（→ Claude Code research preview 2025-02）
- 但用户用法没跟上：同一颗 L3 模型，绝大多数人还当 L1 用
- 三段不是顺序排他的，重心在哪段决定了 AI 对你生活的真实意义——这条分布线是 AI 用法上正在拉开的代差

## 读者画像

广泛——不是只给程序员看。所有用过 ChatGPT / Kimi 的人都是潜在读者。

- **大众 AI 用户**（重心在问答）：让他们意识到自己已经落后两个版本
- **中度采用者**（在执行）：让他们看见下一波正在发生
- **早期 adopter**（在托付）：验证他们看见的是真的

## 5 章提纲

不预设字数。每章核心 3-4 个点 + 一段收口观察。02 voice 基准——大段散文、几乎不加粗、第一人称频繁、没有 ### 切 subsection、金句藏在叙事里。

### 引言

- OpenAI 5 阶段路线图（L1 chatbots / L2 reasoners / L3 agents / L4 innovators / L5 organizations）
- 三组时间冲击：L1→L2 652 天 vs L2→L3 40 天 vs 普及节奏 5 个月
- 加速时间线 monospace 图
- 翻转视角：能力是 AI 的、用法是你的——你自己在哪一阶段？
- 引出三个动词：问答、执行、托付

### 01 三个动词：问答、执行、托付

- chat 和 agent 不在同一维度——一个是 UI 形态、一个是 capability 能力，并排做阶段是混的
- 真正的轴：你跟 AI 之间是什么关系
- 三段散文式串讲（不切 subsection）：问答（你问它答 / 用户 / 工具 / ChatGPT）/ 执行（你派它干 / 派活方 / 下属 / Claude Code）/ 托付（它自己来 / 监督者 / 合伙人 / background agents）
- 三段不是顺序排他的，是重心问题
- 收口：这条分布线是 AI 用法上正在拉开的代差

### 02 阶段一 · 问答的天花板

- 大多数人对 AI 的全部体感来自这一段
- 问答的优点：门槛低、即问即答、上手快——是 AI 走进 10 亿人最重要的入口
- 问答的天花板：
  - 一次一回合，长任务需要你来协调
  - 答案出来后，整个执行（修改代码、发邮件、做 PPT）还是你的事
  - 信息搬运（复制粘贴）的时间反而更多
  - 上下文丢失，每次都要重新铺背景
- 问答时代的代表产品：ChatGPT、Kimi、文心一言、豆包、通义、Perplexity、Claude.ai 聊天端
- 数据：ChatGPT 周活 / API 调用占比 vs chat 占比变化（待 verify）
- 收口：问答不会消失、它会变成 AI 用法的"基础层"——但只停在这一层的人会发现自己越来越不省事

### 03 阶段二 · 执行正在大规模成立

- 派活：你说要什么，AI 去做（不只是回答）
- 关键技术变化：harness（004 写过、一笔带过不展开）+ tool use + agent loop + 长程稳定
- 横扫几个行业：
  - 编程 — Claude Code / Cursor / Devin / Cognition
  - 客服 — Sierra / Decagon
  - 法律 — Harvey
  - 企业搜索 — Glean
  - 销售 — 11x / Artisan / Decagon
  - 医疗 — Hippocratic AI / Abridge
- 用户角色变化：从用户 → 派活方 / 验收方
- 这一段已经有真实收入和用户：Claude Code 11 月 ARR $1B、Cursor 估值、Sierra / Harvey 客户名单
- 这一段的难点：你得会写 brief、会拆任务、会 review
- 收口：执行不是 chat 的升级、是你跟 AI 关系的根本改变——你从用工具变成派下属

### 04 阶段三 · 托付正在悄悄发生

- 不用派、AI 自己来
- 关键差别：触发是 AI 自己判断的（不是你启动）
- 严格定义：AI 自己识别情境、自己决定何时介入——这把"长 agent"和"真托付"分开
- 信号产品：
  - Claude Code / Cursor 的 background agents
  - cron / scheduled AI tasks
  - Anthropic Memory features 跨 session 主动 outreach
  - Lindy 的 always-on workflow
  - Kimi K2.6 13 小时连续编码 + 5 天自主运行 + 300 子 agent 集群
- 第一人称体感（关键）：cron + skills + background tasks 的具体工作流（待写真体感、不能编）
- 用户角色变化：从派活方 → 监督者 / 边界制定者
- production 程度还低、但信号明确
- 收口：托付的难点不在 AI 这边、在人这边——你得学会信任、学会校准边界

### 05 你处在哪一阶段、怎么升级

- 自检：你最近一次跟 AI 互动是什么动作？
- 三个阶段的信号识别清单
- 按身份的升级路径：
  - 普通用户（写文档、找信息）：问答 → 嵌入式（Notion AI / Figma AI）
  - 写代码：问答 → 执行（Claude Code / Cursor）→ 托付（background agents / cron）
  - 写文案 / 内容：问答 → 嵌入式（Notion AI / Cursor for writing）→ 托付（scheduled content workflow）
  - 销售 / 客服 / 运营：问答 → vertical agent（Sierra / Decagon）
  - 决策者 / 管理者：问答 → 派活流程化 → 长期托付（个人 AI 助理 / 项目监督 agent）
- 收口：以后看 AI 产品先别问它能做什么、问它要把你拉到哪一阶段

## 风格约束

- 002 voice 基准：大段散文、几乎不加粗、第一人称频繁、没有 ### 切 subsection、金句藏在叙事里
- 章节标题陈述句 + 冒号 + 具体内容（"01 三个动词：问答、执行、托付"）
- 避免：警句腔（"裂开的一道缝"）/ 对仗排比开头（"你问它答 / 你派它干"）/ 金句加粗 / 一句一段过密
- 第一人称用真体感，不要凭空"我认为"
- 技术专名保留英文（agent / harness / chat / capability / background agent / cron / Memory features / scheduled / context）
- 中文圈读者优先，少用英文整句
- 加速时间线 monospace 图放引言、其他图按本期内容判断（不预设数量）

## 待 verify 事实清单

| 项 | 状态 | 说明 |
| --- | --- | --- |
| OpenAI 5 levels 内部公布 + Bloomberg 泄出 | ✅ 已查 | 2024-07，多个二手报道一致 |
| ChatGPT 公开日期 2022-11-30 | ✅ 已查 | 公认 |
| o1-preview 发布 2024-09-12 | ✅ 已查 | OpenAI 官方 + TechCrunch |
| Anthropic Computer Use beta 2024-10-22 | ✅ 已查 | Anthropic 官方 + Simon Willison |
| Claude Code research preview 2025-02 | ✅ 已查 | Wikipedia + Medium |
| Claude Code GA 2025-05 | ✅ 已查 | 同上 |
| Claude Code ARR $1B (2025-11) | ⚠️ 二手 | Medium 转述、需要 verify 一手源 |
| Kimi K2.6 13 小时 + 5 天 + 300 子 agent | ✅ 已查 | 多个中文报道一致、2026-04-22 |
| Sierra / Harvey 客户 logo 公开数据 | ⚠️ 待补 | 写到 03 章前要 verify 公开 case study |
| Lindy / Anthropic Memory features 当下状态 | ⚠️ 待 verify | 写到 04 章前要查产品现状 |
| Cursor background agents 公开案例 | ⚠️ 待 verify | 同上 |
| ChatGPT 周活 / API vs chat 调用占比 | ⚠️ 待 verify | 02 章数据来源 |

## 配图意图

不预设数量。当前规划：

| # | 嵌入位置 | 内容 | 来源 |
| --- | --- | --- | --- |
| 1 | 引言 | 加速时间线（L1 → L2 → L3 节点 + 天数） | monospace 文本图 |
| 2 | 03 章 | 执行时代横扫行业图（编程 / 客服 / 法律 / 销售 / 医疗） | 待定 |
| 3 | 04 章 | 托付的几种触发模式（时间触发 / 事件触发 / memory 触发） | 待定 |

按 feedback_text_architecture_diagrams.md 优先用 monospace。

## 复盘（发布后填）

- 阅读量：
- 读者反馈中反复出现的关键词：
- 哪段写得最好（被截图传播的段落）：
- 最有争议的段落：
- 下次能更好的：
