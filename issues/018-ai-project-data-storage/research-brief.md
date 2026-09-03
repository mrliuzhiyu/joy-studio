# 018 · Research brief

核对时间：2026-08-26

## 已确认事实

### 传统数据工程的稳定原则

- PostgreSQL 将事务定义为多个步骤组成的全有或全无操作；未提交的中间状态对其他并发事务不可见。
- OWASP 数据库安全建议应用最小权限，避免使用管理员账号运行普通业务，并让开发、测试和生产使用独立数据库与账号。
- `pg_restore` 支持在单个事务内执行恢复，使恢复命令要么全部完成，要么不应用任何变化。
- 来源：https://www.postgresql.org/docs/current/tutorial-transactions.html
- 来源：https://cheatsheetseries.owasp.org/cheatsheets/Database_Security_Cheat_Sheet.html
- 来源：https://www.postgresql.org/docs/current/app-pgrestore.html

### SQLite 与客户端服务器数据库的边界

- SQLite 官方将自己定位为本地应用数据存储，强调简单、独立和低维护；客户端服务器数据库强调并发、集中管理和控制。
- SQLite 允许多个并发读取者，但同一时刻只有一个写入者。大量并发写入、数据与应用跨网络分离、多个服务器共享数据时，更适合客户端服务器数据库。
- 官方没有给出按用户人数切换数据库的固定门槛，正文避免使用几百人或几千人的伪精确判断。
- 来源：https://www.sqlite.org/whentouse.html

### 容器数据生命周期

- Docker 默认将容器内的写入放在可写层中；容器删除后，这一层不会继续保留。
- Docker volume 的生命周期独立于容器，可用于需要跨容器生命周期保留的数据。但 volume 仍需要备份，不等同于托管数据库或完整容灾。
- 来源：https://docs.docker.com/engine/storage/
- 来源：https://docs.docker.com/engine/storage/volumes/

### 对象存储

- Amazon S3 以存储桶和对象组织数据；对象由键、内容、元数据与可选版本标识等组成，资源默认私有，需要显式授予访问权限。
- 正文使用 S3 作为对象存储范式示例，不要求读者必须选择 AWS。
- 来源：https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingObjects.html

### AI 时代的仓库事实源与环境边界

- OpenAI 的 agent-first 工程实践把仓库知识作为系统事实源，让短说明充当地图，并用检查工具机械维持规则与文档的一致性。
- GitHub 部署环境支持分支限制、人工批准和环境密钥保护；密钥在保护规则通过前不会进入部署任务。
- 文章把这两点缩小到普通项目：数据结构、迁移和验收进入仓库；生产迁移凭据留在受保护流程中。
- 来源：https://openai.com/index/harness-engineering/
- 来源：https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments

## 关键推论

- AI 没有改变事务、约束、备份和最小权限的必要性；它改变的是变更频率，因此传统依赖人工记忆和审批的规则，需要转为版本化迁移、可执行检查和权限隔离。
- 数据库选型首先由部署拓扑、并发写入、数据关系与维护能力决定，用户总数只能作为容量背景，不能直接决定 SQLite 或 PostgreSQL。
- 缓存、搜索索引和向量属于派生数据时，必须保留可重建它们的原始事实与版本信息。

## 需要克制的表述

- 不说 SQLite 不能用于生产，也不说 PostgreSQL 是所有在线项目的唯一答案。
- 不把 Docker volume 描述成自动备份或高可用。
- 不承诺托管数据库代替所有运维；仍需验证备份、恢复、权限和费用边界。
- 不把向量数据库写成 AI 项目的默认组件；出现可测量的检索需求后再选择。
- 不把反向迁移等同于可靠回滚。已经发生破坏性数据变化时，向前修复、恢复备份或分阶段迁移可能更安全。
