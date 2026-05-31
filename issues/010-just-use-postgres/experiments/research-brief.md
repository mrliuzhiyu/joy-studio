# 010 · research-brief:向量数据库 → Postgres 的反转

> 深搜归档(2026-05-31)。诚实度标注:✅ 一手确认 / ⚠️ 二手需溯源 / 🏷️ 厂商自报(有立场)。
> 反方料(主张专用向量库)与正方(主张 Postgres)同等收集,见 §4。

---

## 一句话结论

做 AI 应用的默认存储选择两年内反转了:2023 是"先选个专用向量数据库",2026 是"先用你已经在跑的 Postgres + pgvector,撞到可量化的墙再升级"。
但**专用向量库没有消亡**——市场仍在高速增长,反转的是"默认起点",不是"谁淘汰谁"。这条 nuance 是全文诚实度的红线。

---

## §1 反转叙事 + 市场数字(01–02 章用)

**2023 淘金热侧:** 专用向量库是 AI 基建顶流,融资排队。

- 向量数据库市场:2024 年 ~$1.97B,预计 2032 年 $10.6B,CAGR 23.38%。⚠️ 二手(SNS Insider 报告,机构预测,口径宽,用"据某市场报告"且只用来说明"仍在增长")。来源:https://www.globenewswire.com/news-release/2025/03/07/3039040/0/en/Vector-Database-Market-to-Reach-USD-10-6-Billion-by-2032-SNS-Insider.html
- Pinecone:**2023-04** Series B $100M,估值 $750M。✅ 已核(TechCrunch 2023-04-27、a16z 领投、Pinecone 官方 blog)。**注意:第一轮搜的"2024-02"是错的二手,已纠正。** 正文未写年份,行文不受影响,只是料库日期改对。
- Weaviate:2024-03 Series B $50M。⚠️ 二手。
- Qdrant:2024-01 $28M。⚠️ 二手。
- Milvus GitHub 35,000+ stars(开源向量库里最高)。⚠️ 二手,数字会变,用"超过三万"模糊表述。

**2026 反转侧:** pgvector 成了新 RAG 项目的默认推荐。

- "pgvector is now the default recommendation for new RAG projects unless there's a specific reason to choose otherwise."(2026 多篇对比文的共识口径)⚠️ 二手综述,但跨多个独立来源一致,可作"共识在移动"的佐证,不引为单一权威。
- 2026 年的对比文章口径已从"要不要用 pgvector"变成"什么时候才升级到专用库"——这个**提问方式的变化本身**就是反转完成的信号(作者观察,非引用)。
- Supabase / Neon / Instacart 等被多篇列为 pgvector 生产用户。⚠️ Instacart 待溯源具名出处,不确定就只说 Supabase/Neon(它们本身就是 Postgres 托管商,确凿)。

**Supabase = 这场反转的最强代言人(02 章重点案例,关联很大):**

- Supabase 整个公司就押在"AI 应用就用 Postgres"上:开箱自带 pgvector,产品线直接叫 [Supabase Vector — The Postgres Vector database and AI Toolkit](https://supabase.com/modules/vector),还做了 automatic embeddings、语义缓存等一整套围绕 pgvector 的 AI 工具。文档:https://supabase.com/docs/guides/ai
- 它还**亲自下场写对比文打 Pinecone**:[pgvector vs Pinecone: cost and performance](https://supabase.com/blog/pgvector-vs-pinecone)——主张同等场景 pgvector 更省更够用。
- 体量背书:2025-04 融资 $200M、估值 $2B(✅ 多源,回新闻核确切措辞)。一个纯 Postgres 路线的公司能长到这个量级,本身就是"反转"的市场证据。
- 🏷️ **立场标注:Supabase 卖的就是 Postgres 托管,它说 pgvector 够用是有商业立场的**(和 Tiger Data 一样)。写法:用它当"风向"的代表性信号(连卖 Postgres 的都把 AI 当主战场了),引它的对比数字时标"Supabase 自家口径";不把它的结论当中立裁决。
- 与专用库的镜像:Pinecone 写文说 pgvector 不够(§4),Supabase 写文说 pgvector 够——02 章可以把这对"厂商互打"摆出来,让读者看到双方都有立场,判断留给读者。

> **叙事红线:** 不能写成"向量数据库凉了 / 死了"。市场数据明摆着仍在长。准确表述:专用库从"默认第一步"退回"撞到墙之后的选择";pgvector 把它们的入门市场吃掉了一大块。

---

## §2 为什么是 Postgres(03 章 · 全文最硬的"为什么")

一手正方:Encore《You probably don't need a vector database》。来源:https://encore.dev/blog/you-probably-dont-need-a-vector-database

三条工程原因(✅ 一手论点):

1. **数据局部性 / 事务一致性。** 原文 + 向量待在同一张表、同一个事务里。专用库方案要把"源数据库"和"向量库"两套保持同步,得靠仔细的错误处理或后台对账任务(background reconciliation job)。Postgres 方案没有这个同步问题。
2. **少一套系统。** 专用库方案 = 3 个服务(应用数据库 + 向量库 + embedding API);pgvector 方案 = 2 个(Postgres + embedding API)。少一个独立部署、一套凭据、一块监控面板、一个会独立宕掉的东西。
3. **查询即 SQL。** 向量检索就是普通 SQL,join + 过滤 + 向量相似度在一条查询里自然组合,不用跨系统拼装。

补充(✅ pgvector GitHub):Postgres 自带 ACID、PITR(时间点恢复)、JOIN、三十年的备份 / 复制 / 权限 / 监控生态,pgvector 直接复用;再加 JSONB + 全文检索,一个库覆盖关系 + 向量 + 全文 + 文档。来源:https://github.com/pgvector/pgvector

**为什么 AI 应用尤其吃这套:** RAG 的数据形态天然是"原文 + 元数据 + 向量"绑在一起,需要按 tenant / 用户 / 分类过滤后再做相似度——这正好是关系数据库 + 向量扩展的主场,而不是纯向量系统的主场。

---

## §3 性能与成本数字(分场景,标诚实度)

**pgvector 在中小规模够用(✅ 多源一致):**

- HNSW 索引下,100 万向量查询 <20ms、recall >95%。⚠️ 二手(Encore + 多篇综述口径一致),用时说"据多家实测口径"。
- 覆盖"文档检索、工单分类、推荐、内部知识库"等绝大多数实际用例。
- pgvector v0.8.2,21.5k stars;**HNSW 是 0.5.0(2023-08-28)加入的**——这是它能上生产的最后一块拼图。✅ 已核:[PostgreSQL 官方 0.5.0 发布公告](https://www.postgresql.org/about/news/pgvector-050-released-2700/)、[AWS RDS 2023-10 支持 pgvector 0.5.0 with HNSW](https://aws.amazon.com/about-aws/whats-new/2023/10/amazon-rds-postgresql-pgvector-hnsw-indexing/)。**注意:第一轮搜的"0.7.0 / 2024-03 added HNSW"是错的二手(0.7.0 是 2024-04 加 halfvec/sparse 等,不是 HNSW),已纠正。** 来源:https://github.com/pgvector/pgvector

**门槛数字各家口径不一(必须诚实呈现):**

- "1M 以下完美"/"5M 以下全生产"/"10M 并发以上才评估专用库"——三个数字都在流传,因负载结构(并发、过滤、更新频率)而异。**不给单一精确门槛**,表述为"百万级以内基本够,千万级 + 高并发 + 强过滤时开始要认真评估"。

**大规模(50M)pgvectorscale vs Pinecone(🏷️ 厂商自报 · Tiger Data):**

- vs Pinecone s1(存储优化):28x 更低 p95 延迟、16x 更高吞吐 @99% recall。
- vs Pinecone p2(性能优化):1.4x 更低 p95 延迟、1.5x 更高吞吐 @90% recall。
- 成本:自托管 PG ~$835/月(AWS EC2)vs Pinecone s1 $3,241/月 / p2 $3,889/月,省 75–79%。
- 数据集:5000 万条 Cohere embedding(768 维)。
- 🏷️ **强标注:这是 Tiger Data(原 Timescale,卖 Postgres 服务)自家基准,有商业立场。** 给数字必须带"据 Tiger Data 自家基准",并紧跟一句"厂商自报、口径自选"。发布 2024-06-11(更新至 2025-12-09)。来源:https://www.tigerdata.com/blog/pgvector-is-now-as-fast-as-pinecone-at-75-less-cost
- 对照中立基准(⚠️ 二手):50M 向量下 Qdrant 41.47 QPS @99% recall vs pgvectorscale 471 QPS(口径不同,不与上面 Tiger 数字混用,仅说明"裸 pgvector 在 50M 会吃力,要靠 pgvectorscale 这类扩展续命")。来源:dev.to / vecstore 综述,需回 ANN-Benchmarks 原始口径才可引为权威。

---

## §4 反方 / steelman(04 章 · 专用向量库赢的场景 + Postgres 真实坑)

**专用库厂商的反击(取硬料,结构性正面回应):**

Pinecone《For vector search, easy isn't so easy》(🏷️ Pinecone 自家,有立场,但技术批评具体、可成立)。来源:https://www.pinecone.io/blog/pinecone-vs-pgvector/

- **内存悬崖:** pgvector 建 HNSW 索引需要 ~1.2x 数据集大小的 RAM;一旦索引超过可用 RAM,build 吞吐"骤降 10x 以上"(磁盘换页)。表现为一个不可预测的悬崖——数据没到阈值时一切正常,过了阈值延迟突然 10x。
- **索引体积难估:** 索引相对原始数据膨胀 2x–5x,跨数据集差异大,容量规划基本靠猜。
- **元数据过滤弱:** pgvector 的 HNSW 没有内置元数据过滤。后过滤(post-filter)不保证返回条数;前过滤(pre-filter)要么每个元数据值单独建索引、要么全表扫描。Pinecone 称其测试中 pgvector 一半查询都达不到"80% recall @200ms",而 Pinecone 开箱即得。
- **数据漂移:** IVFFlat(pgvector 低内存方案)在初始建索引后数据变化会显著掉 recall,不适合频繁更新的真实负载。
- **持续调优负担:** 需要不断调库和索引,query planner 行为不总可预测。

> 这些批评里**内存悬崖、元数据过滤、索引体积难估**三条是真实工程痛点,不是营销话术——04 章必须正面收下,不能只当稻草人。但也要点明立场(Pinecone 卖的就是"零调优托管")。

**专用库真正赢的场景(✅ 多源 + 反方一致):**

- 亿级(billions)以上向量;海量写入吞吐。
- 极致 QPS / 延迟要求(Qdrant 在 1M 工作负载 ~1840 QPS,四家最快,Rust 实现)。⚠️ 二手。
- 需要强元数据过滤 + 多租户(Weaviate 在 hybrid + multi-tenant 场景被多篇推荐)。
- 完全不用 Postgres 的团队(没有现成 PG 时,pgvector 的"复用现有库"优势归零,这时 Qdrant 等是更自然的起点)。

**Postgres / pgvector 自身的真实天花板(✅ 跨源一致):**

- HNSW 索引要装进内存才有好性能;50M × 768 维 ≈ 150GB+ RAM。⚠️ 二手估算,用"百 GB 级"模糊表述。
- 裸 pgvector 在 5–10M 向量以上明显变慢,要靠 pgvectorscale(StreamingDiskANN,部分索引落盘 + 流式过滤)续命——而 pgvectorscale 是另一个扩展,和 pgvector 不是一回事(§7)。
- "The Case Against pgvector"(Alex Jacobs):多数 pgvector 教程是"本地塞 1 万条向量就收工",漏掉生产里 80% 真正要操心的;按 user/tenant/category 做选择性过滤时 pgvector 开销大。⚠️ 个人博客观点,引为"批评声音之一",不当权威数据。来源:https://alex-jacobs.com/posts/the-case-against-pgvector/
- Qdrant《Start with pgvector: Why You'll Outgrow It Faster Than You Think》(🏷️ Qdrant 自家,WebFetch 被拦,只用标题立场,不引未读到的具体数字)。来源:https://qdrant.tech/blog/pgvector-tradeoffs/

---

## §5 迁移案例(02 / 04 章佐证,均需标来源 + 诚实度)

- **JustSoftLab 某客户:** 从 Pinecone 迁 pgvector,3 天工程量,省 $1,800/月。⚠️ 二手(乙方博客,有立场),用时说"据 X 的复盘"。来源:https://justsoftlab.com/insights/postgres-pgvector-vs-pinecone-production-benchmark
- **Vecstore → Neon:** 用单个 Neon 项目替掉 Pinecone + RDS 两套,延迟 200ms → 80ms。⚠️ 二手(Neon case study,Neon 是 PG 托管商,有立场)。
- ⚠️ 这类案例都来自有立场方(乙方 / PG 托管商 / 向量库厂商),没有完全中立的。用法:**只作"确有团队这么迁、省了钱"的存在性证据,不堆砌数字当普适结论。** 反向案例(从 pgvector 迁去专用库)也应找一个平衡,待补。

---

## §6 母题:Just Use Postgres for Everything(05 章收口 + 03 章底色)

- 原始出处:Stephan Schmidt《Just Use Postgres for Everything》,Amazing CTO 网站。✅ 出处确认。来源:https://www.amazingcto.com/postgres-for-everything/
- 核心:简化技术栈、减少活动部件,用 Postgres 替代 Kafka / RabbitMQ / Mongo / Redis 等,到百万用户级别够用;"technical credit——投资于简单,后期收红利"。
- 衍生站点 postgresforeverything.com 收录各方背书。
- 用法:05 章收口接这个更大的母题(向量只是"Postgres 吃掉一切"的最新一块),**一句话点到,不展开**,避免主题发散。

---

## §7 名词校准(准确性红线 · 写前必对)

| 名词 | 准确说法 | 易错点 |
| --- | --- | --- |
| Postgres / PostgreSQL | 通用开源关系数据库,本体不带向量能力 | 别把"Postgres 能做向量"说成 Postgres 原生功能,是扩展给的 |
| pgvector | 开源扩展,给 PG 加向量类型 + IVFFlat / HNSW 索引;v0.8.2,21.5k★ | 作者 Andrew Kane / 2021 起 ⚠️ 待回 GitHub 核;HNSW 在 0.7.0(2024-03)加 ⚠️ 二手待核 |
| pgvectorscale | Tiger Data 的另一个扩展,Rust 写,StreamingDiskANN + SBQ,补 pgvector 大规模性能 | **和 pgvector 不是一回事**,§3 的 28x/75% 数字属于 pgvectorscale,别记到 pgvector 头上 |
| Tiger Data | 原 TimescaleDB,已改名 | ✅ 确认改名;写当前名 Tiger Data,可注"原 Timescale" |
| HNSW / IVFFlat | 两类 ANN 索引算法,pgvector 与专用库都用 | HNSW 性能好建得慢吃内存;IVFFlat 建得快、数据漂移掉 recall |
| 专用向量库 | Pinecone(闭源托管)/ Weaviate / Qdrant / Milvus / Chroma,定位各异 | 别混为一谈;Pinecone=托管零运维、Qdrant=性能、Weaviate=hybrid/多租户、Milvus=超大规模 |

---

## §8 待 Joy verify 的高风险项(发布前过)

1. Pinecone / Weaviate / Qdrant 融资额与时间(§1)——回各自新闻原文。
2. pgvector HNSW 加入版本 0.7.0 / 时间 2024-03(§3)——回 pgvector releases。
3. pgvector 作者 Andrew Kane / 2021(§7)——回 GitHub。
4. Tiger Data 那组 28x / 75% 数字(§3)——发布时确认仍标"厂商自报",措辞回原博客。
5. Instacart 用 pgvector 生产(§1)——找具名出处,找不到就删,只留 Supabase / Neon。
6. 各"门槛"数字(1M / 5M / 10M)——不给单一精确值,用区间 + "因负载而异"。
7. 反向迁移案例(从 pgvector 迁去专用库)——补一个,保持 §5 平衡。

---

## §9 与已写划界(防撞车)

- **005(记忆框架退回 markdown):** 005 = agent 记忆层"复杂退回朴素";010 = 检索 / 存储层,料与场景全不同。仅 05 章一句话接同源母题,不重写 005。
- **001 / 008 / 009(测量母题):** 无重叠,本期是基建选型,不碰榜分 / 测量。
- **004 / 007(harness):** 无重叠,不碰 agent 工程层。

---

## 主要来源清单

正方 / 中立:
- Encore《You probably don't need a vector database》https://encore.dev/blog/you-probably-dont-need-a-vector-database
- pgvector GitHub https://github.com/pgvector/pgvector
- Stephan Schmidt《Just Use Postgres for Everything》https://www.amazingcto.com/postgres-for-everything/
- Supabase AI/Vector 文档 https://supabase.com/docs/guides/ai

厂商自报(有立场,需标):
- Tiger Data《Pgvector is now faster than Pinecone at 75% less cost》https://www.tigerdata.com/blog/pgvector-is-now-as-fast-as-pinecone-at-75-less-cost
- Supabase《pgvector vs Pinecone: cost and performance》https://supabase.com/blog/pgvector-vs-pinecone

反方(主张专用库,steelman 用):
- Pinecone《For vector search, easy isn't so easy》https://www.pinecone.io/blog/pinecone-vs-pgvector/
- Qdrant《Start with pgvector: Why You'll Outgrow It Faster Than You Think》https://qdrant.tech/blog/pgvector-tradeoffs/
- Alex Jacobs《The Case Against pgvector》https://alex-jacobs.com/posts/the-case-against-pgvector/

迁移案例(有立场,存在性证据):
- JustSoftLab https://justsoftlab.com/insights/postgres-pgvector-vs-pinecone-production-benchmark

市场数据(机构预测,口径宽):
- SNS Insider via GlobeNewswire https://www.globenewswire.com/news-release/2025/03/07/3039040/0/en/Vector-Database-Market-to-Reach-USD-10-6-Billion-by-2032-SNS-Insider.html
