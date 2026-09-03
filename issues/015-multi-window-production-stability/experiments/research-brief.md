# 015 · 事实底稿

> 本期为个人工程方法复盘。项目事实来自本地仓库、Git 历史和问题记录；外部资料只用于建立“AI 时代是否需要详细 PRD”的行业背景，不替代个人项目证据。

## 外部资料与使用边界

### GitHub Spec Kit

- 来源：https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/
- 2025-09-02 发布。流程为 Specify → Plan → Tasks → Implement，并在每个阶段设置复核点。
- GitHub 将规格定义为持续演进、能够驱动计划、任务、测试和实现的活文档，而不是写完后搁置的静态 PRD。
- 使用边界：用于支持“AI 时代规格更重要”，不能写成 Spec Kit 已经证明所有项目都因此提效。

### METR 真实任务随机对照研究

- 来源：https://metr.org/Early_2025_AI_Experienced_OS_Devs_Study-paper.pdf
- 16 位经验丰富的开源开发者，在熟悉的成熟仓库中完成 246 个真实任务；仓库平均熟悉时间约五年。
- 开发者事前预计 AI 能缩短 24% 时间，事后仍估计缩短 20%；测量结果为完成时间增加 19%。
- 使用边界：研究使用的是 2025 年初的工具，结论与特定人群和场景有关；它不能证明 AI 普遍降低效率，也没有证明减速由 PRD 导致。文章只用它说明“感知速度不等于真实交付速度”。

### Kiro 从 Requirements-first 扩展到 Design-first / Bugfix Spec

- 来源：https://kiro.dev/blog/specs-bugfix-and-design-first/
- 2026-02-18 发布。Kiro 表示，既有项目用户并不总从需求开始，刚性的单一路径不适合技术边界已经明确或需要外科式修复的任务。
- Bugfix Spec 明确区分 Current Behavior、Expected Behavior、Unchanged Behavior，并用属性测试检查修复和回归。
- 使用边界：这是厂商对用户反馈和产品演进的公开描述，不是独立效果研究；用于支持“规格应随工作类型变化，不能假装在开发前完美描述软件”。

## Token 使用边界

- 用户给出的本期背景是：同一个项目同时开多个开发窗口，繁忙时单日消耗超过 10 亿 Token。
- 015 不复用已经发布内容中的面板数据和截图。
- Token 只用来交代并发规模，不讨论输入输出比例、认知重建或 Token 与代码量的关系。

## 仓库规模快照

核验日期：2026-08-08。

```text
git ls-files                         2,931 个跟踪文件
*.ts / *.tsx                          982 个
*.py                                  713 个
测试路径/命名命中的文件                571 个
issues/done/*.md                      505 个
scripts/migrations/*.sql              116 个
.github/workflows/*                     9 个
docker-compose.yml 基础服务              13 个
```

文章使用时写“接近三千个文件”“十多个服务”即可。精确数字只用于首屏建立规模感，不铺成数据炫耀。

## 开发吞吐样本

2026-08-04：16 个提交，新增 8,074 行、删除 2,714 行、触及 165 个去重文件。

使用边界：这是一个可复核的开发日，不能与单日 Token 规模绑定，也不能全部归因于某一个模型或某一个窗口。

## 事故一：并行 migration 撞号

来源：项目 `scripts/migrations/README.md` 与 `tests/test_migration_naming.py`。

- 旧规则使用递增序号。
- 两个并行会话同日各自创建了 `095_*` migration。
- 后续改为 `YYYYMMDDHHMMSS_slug.sql` 秒级时间戳。
- CI 增加命名格式、合法时刻、重复前缀、回滚脚本目录等静态守护。

能够支持的判断：单人时代靠“下一个编号”维持的约定，在多窗口并行下会立刻成为共享写入热点。修复方式不是提醒 AI 小心，而是消灭共享取号点。

## 事故二：进程初始化漂移

来源：`issues/done/20260609-worker-longtask-execution-gaps.md` 与 `tests/test_process_init_parity.py`。

- Agent 主执行从 API 进程搬到 worker 后，worker 没有同步原入口的完整初始化。
- 漏项形成五处簇状漂移：网络、HTTP 连接池、技能加载、长期记忆、密钥刷新。
- 修复把进程级状态收敛进统一 `bootstrap.py`，两个入口各调用一次。
- CI 静态测试禁止两个入口继续手写初始化。

能够支持的判断：同一事实写两份，再详细的 PRD 和注释也只能靠人肉同步。物理单源比书面一致更可靠。

## 事故三：旧 worker 镜像进入生产

来源：`issues/done/20260608-deploy-drift-hardening.md` 与 `tests/test_compose_invariants.py`。

- 部署脚本手工列出要构建的服务，漏掉 worker。
- worker 被重新创建，却继续使用旧镜像。
- server `/health` 正常，真实 Agent 任务全部卡住。
- 修复后由 Compose 决定构建集合；镜像写入 Git SHA；部署后逐容器核验；smoke test 增加 worker 活性。

能够支持的判断：代码测试通过不等于生产正在运行这份代码。生产级验收必须观察版本、跨进程链路与真实运行结果。

## 工作方法证据

项目根规则已形成长期不变量：

- 前端 TypeScript，后端 Python/FastAPI，数据库 PostgreSQL。
- 数据库改动同时包含增量 migration 和全量 schema 快照。
- 生产唯一部署路径是 GitHub Actions。
- Auth、模型路由、服务网络、进程初始化、响应信封均有单一修改入口与测试守护。
- 非小改动使用“问题发现 → 验收标准 → 实现 → 验收”四轮 issue；每条 AC 尽量带检查命令。

## 文章结论的诚实边界

- worktree 只隔离文件，不自动解除语义耦合。
- 两个功能若共同修改一个状态所有者，应该先建立共享契约，或者改为串行。
- 完整 PRD 对外部承诺、合规、招投标、跨团队职责仍有价值；文章反对的是把它当成能提前枚举所有实现交互的终局预测。
- 生产级不等于零事故。本文展示的是事故怎样转化成不会重复依赖记忆的工程规则。
