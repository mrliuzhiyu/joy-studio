# Relio · 仅从代码生成的项目说明

> 实验阶段 A：只读取代码、配置、数据库迁移和测试，不读取仓库 `docs/` 下的任何文件。
>
> 代码版本：`703f137a9bb7eb395d5e61746d29cefa45c349be`（2026-04-20）
>
> 目的：模拟“仓库没有 README，AI 直接从代码生成项目概览”的场景。本文不是 Relio 的正式说明。

## 项目概览

Relio 是一款面向小学学习场景的 AI 错题助手，界面名称为“易纠错”，主张“错了不再错”。用户拍摄题目后，系统让多个视觉语言模型并行识别题目、学生答案和知识点，再由一个仲裁模型汇总结果。错题会按知识点积累；同一知识点达到五道错题后，系统异步生成深度归因报告、家长建议和十道变式训练题。

从现有代码可以确认的主要能力：

- 拍照上传数学、语文、英语或科学题目。
- 六个视觉模型并行解题，结果通过 SSE 流式返回前端。
- 仲裁模型统一答案、错因分类、知识点和置信度。
- 保存错题、模型原始结果、仲裁结果和题目图片。
- 按知识点累计错误次数，在第五道时生成深度报告。
- 从错题或指定知识点生成练习卷。
- 提交训练答案，达到 80 分后把相关错题标记为已掌握。
- 生成家长分享链接，展示学科分布、薄弱知识点和深度报告。

## 系统结构

```text
React 19 + Vite 前端
        │
        │ HTTP / SSE + Supabase JWT
        ▼
FastAPI 后端
   ├── OpenRouter：六模型解题 + 仲裁 + 报告/出题
   ├── Supabase Postgres：错题、报告、训练与知识点统计
   ├── Supabase Storage：原始题目图片
   └── WebSocket：深度报告完成通知
```

前端只使用 Supabase 完成匿名身份认证，所有业务数据均通过 FastAPI 访问。FastAPI 从请求头验证 Supabase JWT，并在数据库查询中使用 `user_id` 隔离用户数据。

## 核心数据流

### 拍题分析

```text
拍照/上传图片
    ↓
POST /analyze
    ↓
六个视觉模型并行分析
    ↓ SSE 逐个返回结果
仲裁模型统一答案与错因
    ↓
图片上传 Storage + 结果写入 Postgres
    ↓
更新知识点累计次数
    ↓
返回 mistake_id
```

当前代码中的六个解题模型为 Qwen3 VL 三个规格、Llama 4 Maverick、Pixtral Large 和 Grok 4 Fast；仲裁使用 Qwen3 VL 235B Thinking。模型通过 OpenRouter 调用。

### 深度归因与训练

同一用户、学科和知识点的错题累计到五道时，后端创建报告任务。报告模型读取这五道错题，生成：

- 认知根源分析
- 给家长的辅导建议
- 十道训练题，覆盖基础替换、条件迁移和模型重构

用户提交训练后，系统按标准答案计算得分。分数达到 80 时，报告关联的错题被标记为已掌握。

## 技术栈

| 层 | 实现 |
|---|---|
| 前端 | React 19、TypeScript、Vite、React Router、Zustand、Tailwind CSS |
| 后端 | Python 3.11+、FastAPI、Uvicorn、HTTPX |
| 身份与数据 | Supabase Auth、Postgres、Storage |
| AI | OpenRouter 多模型调用 |
| 实时通信 | SSE（拍题分析）、WebSocket（报告完成通知） |
| 本地运行 | npm、uv、Docker Compose、Supabase 本地环境 |

## 主要前端页面

| 路由 | 用途 |
|---|---|
| `/` | 首页、最近错题与知识点进度 |
| `/camera` | 拍题或上传图片 |
| `/analyzing` | 流式显示多模型分析进度 |
| `/mistake-list` | 错题列表 |
| `/mistake-detail/:mistakeId` | 错题详情与错因 |
| `/deep-report/:reportId` | 深度归因报告 |
| `/training/:reportId` | 报告对应的变式训练 |
| `/quiz-builder` | 从错题或知识点组卷 |
| `/parent-report` | 家长分享报告 |

## 后端接口概览

| 方法 | 路径 | 用途 |
|---|---|---|
| `POST` | `/analyze` | 上传题图并流式返回多模型分析 |
| `GET/PATCH` | `/mistakes/*` | 查询错题、知识点进度和修改状态 |
| `GET` | `/reports/*` | 查询深度报告 |
| `POST` | `/training/sessions` | 提交训练结果 |
| `POST` | `/quiz/compile` | 从已有错题组卷 |
| `POST` | `/quiz/generate` | 按知识点生成练习题 |
| `POST/GET` | `/parent/*` | 创建和读取家长分享报告 |
| `WS` | `/ws/reports` | 接收报告完成通知 |
| `GET` | `/health` | 服务健康检查 |

## 从代码推断的本地运行方式

前端：

```bash
npm install
npm run dev
```

后端：

```bash
cd backend
uv sync
uv run uvicorn main:app --reload
```

仓库的 `docker-compose.yml` 只启动 FastAPI，并假设本机已有名为 `supabase_network_Relio` 的外部 Docker 网络。因此完整启动前还需要单独准备 Supabase 本地环境。

代码显示至少需要以下配置，但仓库没有可供后端直接复制的 `.env.example`：

- 前端：`VITE_SUPABASE_URL`、`VITE_SUPABASE_ANON_KEY`、可选的 `VITE_API_BASE`
- 后端：`SUPABASE_URL`、`SUPABASE_SERVICE_KEY`、`OPENROUTER_API_KEY`，部分认证模式还会读取 `SUPABASE_JWT_SECRET`

## 代码无法可靠回答的问题

下面这些内容无法仅凭当前代码确认：

- 产品为什么选择小学错题场景，目标用户究竟是学生、家长还是老师。
- 为什么采用六模型并行仲裁，以及成本、准确率与延迟之间的实测取舍。
- 为什么把五道错题设为生成深度报告的门槛。
- 产品当前处于原型、内测还是正式发布阶段。
- 生产环境如何部署、监控、备份和处理模型供应商故障。
- 用户图片、儿童数据和家长分享链接的隐私政策与保留期限。
- 免费与付费功能如何划分，代码中的订阅字段是否已经启用。
- 哪些页面和接口是当前正式功能，哪些只是尚未完成的规划。

这些问题不是再读更多代码就一定能解决。它们涉及产品意图、历史决策、运营状态和未来计划，需要由项目作者提供。
