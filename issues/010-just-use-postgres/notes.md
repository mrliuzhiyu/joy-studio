# 010 · 向量数据库火了两年,大家又搬回了 Postgres · notes

## 定位

报道 + 评判,不是"唱衰向量数据库"、不是 pgvector 安利软文。一件正在发生的、AI 工程圈台面上的事:
2023 年专用向量数据库是 AI 基建顶流(融资排队、人人先选一个),到 2025–2026,"做 RAG 直接用 Postgres 就行"
反过来成了默认答案。本文价值不在转述这个反转,在**把它放进版图 + 给读者一个能用的选型判断**——
为什么偏偏是 Postgres 接住了 AI 的检索层,以及到底什么时候才真该上专用向量库。

精神气质接 005(复杂框架退回朴素方案),但**料完全是新的**:005 讲记忆框架退回 markdown,
这期讲检索存储退回老数据库,不重复一个字。落点是选型判断(读者带走"我该怎么选"),
符合"报道 + 评判 + 给一个判断"的内核。

## 一句话钩子

2023 年做 AI 应用,第一件事是挑个向量数据库;两年后,越来越多人发现那一步根本不必要——
向量塞进你已经在跑的 Postgres 就够了。这篇讲这个反转怎么发生的、为什么是 Postgres,
以及什么时候你才真的需要一个专门的向量库。

## 标题候选(A+B 融合,draft 时拍板)

- **A(主推)**:向量数据库火了两年,大家又搬回了 Postgres ——叙事反转直白,延续 005「绕一圈回到朴素」的成功气质
- B:做 AI 应用,你多半不需要专门的向量数据库 ——最实用向,直接给判断
- C:先别急着上向量数据库 ——最短、最像劝告(注意别滑向说教)
- D:AI 没催生新数据库,反而把大家送回了 Postgres ——母题最大,略抽象

> 守 voice 五条:标题直白、少英文(Postgres 是无中文译名的专名,保留)、不靠绕弯反差。倾向 A。

## 核心观点(这篇要让读者改变的认知)

1. **做 AI 应用的默认存储选择,这两年悄悄反转了。** 2023 是"先选个向量数据库",2025–2026 是
   "先用你已经在跑的 Postgres,撞到墙再说"。这不是个人偏好,是社区共识在移动(待 research 找代表性背书源)。

2. **对绝大多数 AI 应用,Postgres + pgvector 够用,而且省一整套系统。** 关键不是 pgvector 性能多神,
   是"少运维一套独立系统 + 向量和它的源数据 / 元数据待在同一个库里",这两条对小团队、快迭代的 AI 应用价值极高。

3. **为什么偏偏是 Postgres,而不是别的。** 数据局部性(一次查询里 join 关系数据 + 向量 + 全文,不用跨系统同步)、
   扩展生态(pgvector / 全文检索 / JSONB 一个库全包)、运维成熟度(三十年的备份 / 复制 / 权限 / 监控生态直接复用)。
   AI 应用的数据形态(原文 + 元数据 + 向量绑在一起)尤其吃这一套。

4. **专用向量库不是没用,是少数人的问题。**(steelman,结构性正面回应,不是装点)真到了亿级向量、
   极致 QPS / 延迟要求、需要特定 ANN 算法或分布式分片、向量是系统唯一主负载时,专用库仍然赢。
   Postgres 也有真实天花板:HNSW 索引构建慢、向量吃内存、单机纵向扩展有上限、写放大。诚实给边界。

5. **选型判断(verdict,B 的落点)。** 默认 Postgres + pgvector;升级到专用向量库的触发条件要具体
   (规模 / 延迟 / 召回 / 负载结构的明确信号,不是"听说更专业")。先用够用的,撞到可量化的墙再迁。

6. **更深一层(收回母题,一句话,不重写 005)。** 这是基建"收敛"的又一例:AI 没有催生一整套全新数据栈,
   反而把检索层压回了一个用了三十年的通用数据库。贬值的是"专用就是先进"的直觉,不贬值的是久经考验的通用工具。

## 读者画像

做 AI 应用的工程师、独立开发者、技术负责人、CTO。正在做或将要做 RAG / 语义检索 / agent 记忆,
要给它选存储层。听过 RAG、embedding、向量数据库、Pinecone 这些词,不用从 0 解释 RAG。
可能正纠结"是不是该上个 Pinecone / Weaviate"。不是数据库专家(不必讲清 HNSW 内部原理),
也不是零基础(不解释什么是数据库)。

读者常见误解:① 以为做 RAG 必须先有个专用向量数据库;② 以为"专用 = 更专业 = 更该选";
③ 以为 Postgres 做向量只是玩具、上不了生产。

## 名词必须分清(准确性红线 · 待 research 校准)

- **Postgres / PostgreSQL**:通用开源关系数据库,1986 起,本身不带向量能力。
- **pgvector**:给 Postgres 加向量类型 + 向量索引(IVFFlat / HNSW)的开源扩展。是"Postgres 能做向量"的核心。注意区分 Postgres 本体 ≠ pgvector 扩展。
- **pgvectorscale**:Timescale(现 Tiger Data?待核名)做的 pgvector 性能增强扩展,对标专用库的性能 / 成本宣称需标"厂商自报"。
- **专用向量数据库**:Pinecone(闭源托管)/ Weaviate / Qdrant / Milvus / Chroma 等,为向量检索从头设计的独立系统。各自定位不同,别混为一谈。
- **HNSW / IVFFlat**:两类近似最近邻(ANN)索引算法,pgvector 和专用库都用。
- 别把"向量数据库"和"pgvector"对立成"专业 vs 业余"——pgvector 用的也是同一批 ANN 算法。

## 大致提纲

> 轻量版:提纲不在 notes 展开,直接长进 [draft.md](draft.md)。5 章:01 曾经是第一步 / 02 风向掉头 / 03 为什么偏偏是 Postgres / 04 何时才真需要专用库(steelman + 决策)/ 05 又一次绕回朴素(接 005 母题,结尾停观察不喊话)。细节看 draft。

## 待 verify 事实清单(research 已完成,完整带源 + 诚实度见 [experiments/research-brief.md](experiments/research-brief.md);§8 是发布前必过清单)

| 项 | 状态 | 说明 |
| --- | --- | --- |
| "just use Postgres / 不需要向量数据库"是真实共识转向 | ✅ 已确认 | Encore + 多篇 2026 对比文口径一致;**叙事红线:不能写成"向量库凉了"**,市场仍在长 |
| 专用向量库现状(是否真"凉了") | ✅ 已厘清 | 市场 2024~$1.97B→2032 预计 $10.6B,CAGR 23.4%(机构预测,口径宽)。反转的是"默认起点",不是消亡 |
| pgvector 现状:v0.8.2 / 21.5k★ / **HNSW 在 0.5.0(2023-08)加** | ✅ 已核 | PostgreSQL 官方 0.5.0 公告 + AWS 2023-10 支持公告;第一轮"0.7.0/2024-03"是错的二手,已纠正 |
| pgvector 作者 Andrew Kane / 2021 起 | ⚠️ 待核 | GitHub fetch 未确认,若正文提作者 / 年份,回 GitHub 核 |
| pgvectorscale 对 Pinecone 28x 延迟 / 75% 成本 | 🏷️ 厂商自报 | Tiger Data(原 Timescale)自家基准,**必带"据 Tiger Data 自家基准、厂商自报"**;且属 pgvectorscale 不是 pgvector |
| Timescale 已改名 Tiger Data | ✅ 已确认 | 写当前名 Tiger Data,可注"原 Timescale" |
| Supabase / Neon / AWS RDS 支持 pgvector | ✅ 已确认 | AWS RDS PG 15.2+、Supabase、Neon、Azure、GCP 均支持;Supabase 2025-04 融资 $200M/估值 $2B |
| Pinecone / Weaviate / Qdrant 融资额与时间 | ⚠️ 部分核 | **Pinecone 2023-04 B 轮 $100M/估值 $750M ✅已核**(原"24-02"是错的);Weaviate 24-03 $50M、Qdrant 24-01 $28M 仍二手待核(正文未用具体时间) |
| 迁回 Postgres 的真实案例 | ⚠️ 有立场 | JustSoftLab 省 $1,800/月、Vecstore→Neon 延迟 200→80ms,均乙方 / 托管商,只作存在性证据;补一个反向案例 |
| Just Use Postgres for Everything 母题出处 | ✅ 已确认 | Stephan Schmidt / Amazing CTO,05 章一句话点到不展开 |
| Postgres/pgvector 真实坑(steelman) | ✅ 料足 | 内存悬崖(超 RAM build 慢 10x)/ 元数据过滤弱 / 索引膨胀 2-5x;来自 Pinecone 自家文,标立场但批评成立 |
| Instacart 用 pgvector 生产 | ⚠️ 必核 | 找具名出处,找不到只留 Supabase / Neon |
| 规模门槛 1M / 5M / 10M | ⚠️ 口径不一 | 各家说法不同,**不给单一精确门槛**,用区间 + "因负载而异" |

## 配图意图(按 memory feedback_text_architecture_diagrams 最新口径:结构 / 对比 / 流程图一律真实 HTML 图渲染 PNG,不用纯文字块)

不预设数量。当前规划:

| # | 嵌入位置 | 内容 | 来源 |
| --- | --- | --- | --- |
| 头图 | 标题下 | 题图 | cover 导出或自选 |
| 1 | 01→02 章 | 叙事反转时间线:2023 淘金热 → 2026 搬回 Postgres | 真实 HTML 图 → PNG |
| 2 | 03 章 | 架构对比:两套系统(向量库 + 关系库,要同步)vs 一个库(Postgres 全包) | 真实 HTML 图 → PNG |
| 3 | 04 章 | 选型决策图:默认 Postgres → 哪几条可量化的墙 → 升级专用库 | 真实 HTML 图 → PNG |
| — | 各章 | "just use postgres"代表文 / pgvector GitHub / 某托管平台官方页 | 网页截图占位,需 Joy verify URL |

## 风格约束

- **默认按 [memory/feedback_writing_voice.md](../../memory/feedback_writing_voice.md) 五条**(标题直白 / 少英文 / 短句通俗 / 少破折号双引号 / 不说教)。下面是本期补充。
- 002 voice 基准:大段散文说理 + 数字 / 事实穿插,几乎不加粗,第一人称只在真体感处用。
- 章节标题陈述句、≤ 12 字,不反问、不"X 是什么"、不每章套同一关键词。
- 反 AI 味:不"扎心真相"标题党开头、不反问钩子、不自问自答、不导流、不装饰双引号、不排比凑势、不总结句收尾、不章节间跳转语。
- **开头(Joy 2026-05-31 反馈):不用具体年份起手("2023 年"奇怪),用"前几年"这类;单刀直入(给产品加个 AI 功能…);读者不是小白,术语点到即止,不要把"切块 / 转成一串数字叫向量"这种基础流程铺开解释。**
- **steelman 不少于批判**:04 章(专用向量库在对的场景下确实更好 + Postgres 的真实坑)必须是结构性正面回应,不是装点。体裁是评判不是安利 Postgres。
- 论点大方归属:"just use Postgres"母题、各家性能宣称都归属给原作者 / 厂商,作者增值在版图与选型判断,不抢原创。
- 技术专名保留英文(Postgres / PostgreSQL / pgvector / pgvectorscale / HNSW / IVFFlat / Pinecone / Weaviate / Qdrant / Milvus / Chroma / RAG / embedding / ANN / Supabase / Neon / Aurora / JSONB),其余尽量中文(向量数据库 / 向量 / 索引 / 检索 / 召回)。
- 每个事实 inline 跟可点击 markdown 链接(draft.md 是 markdown 真源);二手 / 厂商自报数据 inline 标诚实度。
- 公号正文不带 a 标签(见 feedback_wechat_publication_v3);markdown 真源 draft.md 带链接。
- 章节编号 01–05(可调);强调两级按 design.md;不限字数,按 feedback_long_form_writing。

## 与已写划界

- **005(记忆框架退回 markdown)**:005 是 agent 记忆这一层的"复杂退回朴素";010 是检索 / 存储这一层,料和场景完全不同。只在 05 章一句话接母题,不重写 005。
- **001(跑分 vs 实测)/ 008 / 009(测量)**:无重叠,本期是基建选型,不碰榜分 / 测量母题。
- **004 / 007(harness)**:无重叠,不碰 agent 工程层。

## 复盘(发布后填)

- 阅读量:
- 读者反馈中反复出现的关键词:
- 哪段写得最好(被截图传播的段落):
- 最有争议的段落:
- 下次能更好的:
