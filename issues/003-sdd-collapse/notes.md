# 003 · 前端、后端、PM 正在塌缩成一个岗位 · notes

## 一句话定位

得物在 2026 年初把前端部门并进 AI 全栈，是国内大厂第一家公开做这件事的。背后是一种 2026 年才真正成形的开发范式 SDD 在重新装配整条 PRD-前端-后端流水线。这篇文章把它讲清楚，包括它是什么、为什么大厂集体押注、是不是又一次瀑布、以及你现在该怎么做。

## 核心观点

- vibe coding 一年生命周期，Karpathy 自己 2026-02-04 亲手宣告它过时；新词叫 agentic engineering，关键差异是 acting as oversight；SDD 就是 agentic engineering 的工业化方法论
- 过去 12 个月 GitHub / AWS / 阿里 / 腾讯 / Tessl / 社区六家工作流惊人收敛到 requirements-design-tasks 三件套结构，这不是模仿是物理收敛
- SDD 是不是瀑布回潮的争论真实存在，反方实测拿到了 4 小时 vs 23 分钟的硬数据，1300 行 markdown 显示一个日期；MDD 历史失败的镜像很冷
- 反反方的核心论点一句话：区别不在写不写 spec，在冻不冻结 spec；OpenSpec 的 delta isolation 是工程化体现
- 真正的塌缩不是程序员失业，是 PRD/前端/后端的分工本身失去存在前提——它们是为人脑装不下全栈设计的；AI agent 持有全栈上下文后流水线塌缩
- 谁吃红利：能把意图准确表达为可执行规范的人；BLS 数据印证 developer 岗 -0.3% / programmer 岗 -27.5%
- 读者拿走的东西：辨别口诀（看哪些场景适合 SDD、哪些场景反而该用 vibe coding 残余）+ 实战上手路径（按读者画像分推荐工具）

## 读者画像

技术背景的城市读者，关心 AI 与软件工程范式变化的人。可以是程序员（前端/后端/全栈/架构师）、技术 PM、CTO、技术博主，也可以是有技术阅读习惯的非技术从业者。不是 AI 研究员，也不是完全零编程经验的家人群读者。

## 7 章提纲

### 01 得物把前端部门并进了 AI 全栈

- 现象切入：2026 年初得物组织调整，国内大厂第一家公开做
- 不是孤例：BLS 三年数据 programmer -27.5% / developer -0.3%；国内头部公司纯前端岗 -40% / 全栈岗 +200%
- 这条新闻真正的信号不在前端死了，在流水线塌方
- 让流水线塌的不是 AI 本身，是 2026 年才成形的范式 SDD
- 半年内这条赛道从 GitHub 实验变行业默认配置，过去 12 个月发生的事铺垫
- 文章交付承诺（4 件事）

### 02 SPEC 是什么，SDD 是什么

- SPEC 不是 PRD：可执行的结构化描述（自然语言 + 约束 + 测试条件）
- SDD 反转开发流水线：传统是代码真源、文档注解；SDD 是 SPEC 真源、代码 AI 编译产物
- 学术分三层：spec-first / spec-anchored / spec-as-source（Martin Fowler 提出，arxiv 论文确认）
- 章末插图：传统流程 vs SDD 流程对比
- **观点段：为什么这个范式 2026 年才真正成立——AI agent 能力到了那个槛；vibe coding 暴露了无监督执行的所有故障模式；行业被迫工业化**

### 03 vibe coding 一年生命周期

- Karpathy 2025-02-02 一条 shower thoughts 推文造词
- 一年内疯狂渗透：Collins Dictionary 评 2025 年度词、92% 美国开发者用过、arxiv 专门发论文研究
- 致命缺陷：forget that the code even exists、accept all changes、no oversight、不可审、不可复现、不可协作
- Karpathy 2026-02-04 亲手宣告它过时（一周年祭日）
- 完整原话引用 agentic engineering 定义；关键差异是 acting as oversight
- **观点段：vibe coding 死于自己的成功——它太好用了所以人们开始用它做不该用它做的事，然后被反噬；SDD 是 agentic engineering 时代的工业化方法论**

### 04 大厂在过去 12 个月做了什么

- GitHub Spec Kit 是行业起点：92k star、6 命令工作流、30+ agent 支持
- AWS Kiro IDE：requirements/design/tasks 三件套 + 独创 Hooks（file-save / PR-open 自动触发）
- 阿里 Qoder（2025-08-22）：Quest Mode = Spec 驱动；号称中国首个 Agentic Coding 平台
- 腾讯云 CloudBase AI Toolkit：直接复刻 Kiro 工作流；命令 /spec /no_spec
- Tessl：1.25 亿美元 A 轮（Index/Accel/GV/boldstart）；Snyk 创始人 Guy Podjarny 操盘；唯一推 spec-as-source 的极端派
- 社区适配层：OpenSpec（delta isolation）+ cc-sdd（让 Claude Code/Codex/Cursor 八种 agent 都能跑 Kiro 风格 SDD）
- 章中插图：六家工作流惊人收敛到 requirements-design-tasks 三件套对比图
- Gartner 预测：2027 年 1/4 生产缺陷将源于 AI 生成代码；SDD 被定位为防御方案
- **观点段：六家不约而同收敛到同一套结构不是模仿是物理收敛；AI agent 编码的工业化必然产生这个形态**

### 05 SDD 是不是又一次瀑布

- HN 热帖《SDD: The Waterfall Strikes Back》起手；Marmelab 同名文；Medium《SDD Is Waterfall in Markdown》
- Scott Logic Colin Eberhardt 实测：SDD 4 小时 vs 常规迭代 23 分钟（慢 10 倍）；689 行代码配 2577 行 markdown
- HN 网友实测：1300 行 markdown 显示一个日期
- Spec Kit issue #75 标题：SpecKit creates the illusion of work, generating a bunch of text
- MDD 历史镜像：Martin Fowler 站点警告——LLM 非确定性 + spec-as-source 可能继承 MDD 和 LLM 双方的缺点
- Spec 不是 law（Scott Logic 原话）：Code is law because it is formal language you can reason about... Specifications lack this formality
- **观点段：这些质疑都不是键政，全部来自实测、GitHub issue、学术论文；SDD 不是没争议的银弹，下一章必须正面回应**

### 06 区别只有一句话：spec 能不能改

- Marc Brooker《SDD isn't Waterfall》核心论点一句话：区别不在写不写 spec，在冻不冻结 spec
- Waterfall 死法：phase gate 锁死、Big Design Up Front、月级反馈
- SDD 活法：minutes 级反馈循环、spec 是可重写的活契约
- OpenSpec delta isolation 是这个思路的工程化（每次只描述本次变更，不重写整个 spec）
- Karpathy oversight 是另一层：spec 不是给 AI 的命令，是给被监督执行的 AI 的契约
- Jimmy Song 工业化硬指标：≥90% 成功率 / ≥85% 可部署率 / ≤10% 返工率
- 适用场景画线：高频重复 + 已有清晰规则 + 与核心业务解耦的任务最适合（配置清理、安全修复、API 客户端生成）
- 不适用场景：快速原型验证、探索性开发、短期脚本——这些反而该用 vibe coding 残余
- **观点段：反方对了一半（错的场景下 SDD 就是 markdown 瀑布），正方也对了一半（对的场景下它是真正的范式升级）**

### 07 写 spec 是新的写代码

- 回到第 01 章问题：得物为什么砍前端部门，现在能解释
- PRD/前端/后端流水线本质：不是技术分工是组织分工，是为人脑装不下全栈设计的产物
- AI agent 持有全栈上下文后这条流水线的存在前提消失
- 谁吃红利：能把意图准确表达为可执行规范的人（BLS developer -0.3% 印证）
- 谁被淘汰：只会按规范执行 if/else 的 programmer（BLS -27.5%，跌幅是 developer 的 90 倍）
- 技能位移：从我能不能写出来到我能不能描述清楚让 AI 写出来；沟通能力、抽象能力、边界感成为核心
- 实战上手路径按读者画像分：想轻装试水→cc-sdd（Claude Code 装个 skill 就跑）；偏 AWS→Kiro IDE；偏阿里云→Qoder Quest Mode；偏腾讯云→CloudBase AI Toolkit；想自己 hack→Spec Kit + OpenSpec 组合
- **观点段：2027 年回头看 2026，会像今天回头看 2014 年的全栈工程师——一个不可逆的角色重组；差别在这次重组的不是某个工种内部的边界，是 PRD-前端-后端这条流水线本身**
- 给读者拿走的东西：辨别口诀 + 实战上手路径

## 风格约束

- 不用中文双引号包概念
- 少形容词
- 技术专名（Spec Kit / Kiro / Qoder / CloudBase / Tessl / OpenSpec / spec-first / spec-anchored / spec-as-source / agentic engineering / vibe coding / Hooks / Quest Mode / delta isolation / oversight / Verschlimmbesserung 等）保留英文，其他用中文
- 命令名（/speckit.specify、/spec、/no_spec 等）保留原文
- 每个事实带可点击 markdown 链接
- 不刻意造钩子；开头是事实陈述
- 章节编号 01-07，章节标题陈述句 + 冒号 + 具体内容
- 第一人称在 02 章后开始出现，必须是真实经验或观察，不要凭空"我认为"
- 金句藏在叙事里，不加粗、不双引号、单句完成
- 结尾给读者拿走的东西，不用"总结"或"结论"

## 配图

| # | 嵌入位置 | 内容 | 来源 |
|---|---|---|---|
| 1 | 02 章末 | 传统 PRD-前端-后端 流水线 vs SDD 流程对比图 | 自制 HTML（diagram-1-traditional-vs-sdd.html）|
| 2 | 04 章中 | 六家工具工作流并排对比（Spec Kit / Kiro / Qoder / CloudBase / Tessl / OpenSpec）| 自制 HTML（diagram-2-six-tools-compare.html）|
| 3 | 05 章中 | Scott Logic 实测的 4 小时 vs 23 分钟对比 | 自制 HTML 或截 Scott Logic 文章原图 |
| 4 | 06 章中 | Waterfall vs SDD 反馈循环对比 | 自制 HTML（diagram-4-waterfall-vs-sdd-feedback.html）|
| 5 | 03 章中 | Karpathy 2025-02-02 vibe coding 推文截图 | 手动截图 [x.com/karpathy/status/2019137879310836075](https://x.com/karpathy/status/2019137879310836075) |
| 6 | 03 章中 | Karpathy 2026-02-04 agentic engineering 推文截图 | 手动截图 [x.com/karpathy/status/2026731645169185220](https://x.com/karpathy/status/2026731645169185220) |
| 7 | 04 章末（可选）| Spec Kit 半年 star history 曲线 | star-history.com 生成 |

## 素材来源

完整链接库见 [experiments/research-brief.md](experiments/research-brief.md)。

## 复盘（发布后填）

- 阅读量：
- 读者反馈中反复出现的关键词：
- 哪段写得最好（被截图传播的段落）：
- 最有争议的段落：
- 下次能更好的：
