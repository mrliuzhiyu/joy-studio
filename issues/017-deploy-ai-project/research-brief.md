# 017 · Research brief

核对时间：2026-08-25

## 已确认事实

### AI 工程环境与仓库事实源

- OpenAI 的 agent-first 工程实践把人的工作概括为设计环境、表达意图和建立反馈回路；其仓库使用短 `AGENTS.md` 作为地图，把详细知识放在版本化文档与可执行检查中，而不是让单份长说明承担全部上下文。
- 同一实践让 AI 可以直接读取页面状态、日志、指标和调用链，使性能与可靠性目标能够被机器查询和验证。
- 来源：https://openai.com/index/harness-engineering/

### 外部验收与长任务连续性

- Anthropic 对长时间应用开发环境的研究指出，由独立检查者按照明确标准评估结果，比要求生成者自行保持怀疑更可靠；结构化进度记录和可测试的功能清单也能降低跨会话漂移。
- 来源：https://www.anthropic.com/engineering/harness-design-long-running-apps

### 部署环境与权限边界

- GitHub 部署环境支持限制可部署的分支、保护环境密钥并要求审批。密钥只在保护规则通过后进入部署任务，可用于把预发布自动化与生产权限分开。
- 来源：https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments

### 可观测信号

- OpenTelemetry 将日志、指标和调用链列为理解系统内部状态的重要观测信号。文章把它们进一步用于 AI 的部署反馈，但不要求小项目第一天安装完整观测平台。
- 来源：https://opentelemetry.io/docs/concepts/observability-primer/

### localhost

- RFC 6761 将 `localhost.` 及其下级名称定义为特殊用途名称；地址查询应返回 IPv4/IPv6 回环地址。访问 localhost 指向发起访问的本机，而不是开发者的电脑。
- 来源：https://www.rfc-editor.org/info/rfc6761/

### 浏览器、DNS 与服务器

- MDN 对网页访问过程的简化说明：浏览器先通过 DNS 找到服务器地址，再向服务器发出 HTTP 请求，服务器返回响应。
- 来源：https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works

### 端口

- Twelve-Factor App 的端口绑定章节说明：应用通过绑定端口监听请求；本地通常访问 `localhost:端口`，线上由路由层把公共域名的请求转发给相应进程。
- IANA 登记 HTTP 常用端口为 80，HTTPS 常用端口为 443。
- 来源：https://12factor.net/port-binding
- 来源：https://www.iana.org/assignments/service-names-port-numbers

### HTTPS

- Let's Encrypt 的 ACME 流程先验证申请者控制域名，再签发浏览器信任的证书；证书与 TLS 共同用于建立 HTTPS 连接。
- 来源：https://letsencrypt.org/how-it-works/

### Nginx

- Nginx 官方文档说明反向代理会把请求发送到指定的上游服务，取得响应后再返回客户端；上游地址可以包含端口。
- 来源：https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy

### Docker

- Docker 官方文档将容器描述为镜像的可运行实例；镜像是包含程序运行所需文件、二进制、库和配置的标准化包。
- Docker 解决的是运行环境一致性和可重复构建，不负责域名、DNS、证书或业务数据持久化。
- 来源：https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-an-image/
- 来源：https://docs.docker.com/reference/glossary/

### 配置、密钥与持久数据

- Twelve-Factor App 建议把不同部署之间会变化的配置与代码分开，典型内容包括数据库地址和外部服务凭据；持久数据不应依赖应用进程的内存或临时文件系统。
- OWASP 将 API 密钥、数据库凭据、SSH 密钥和证书等归为 secrets，强调最小权限、轮换、审计，以及避免把明文凭据散落在源代码中。
- 来源：https://12factor.net/config
- 来源：https://12factor.net/processes
- 来源：https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html

### 境内部署与备案

- 工信部门办事指南说明：在我国境内提供非经营性互联网信息服务实行备案制度，经营性服务实行许可制度；具体业务还可能涉及前置审批。
- 文章只陈述适用范围，不把海外部署描述为规避合规的方式，也不展开不同业务资质判断。
- 来源：https://hunca.miit.gov.cn/bsfw/bszn/art/2024/art_7ef0d8bd3b0d433ba4b9b277f883f74d.html

## 需要克制的表述

- 不说所有项目都必须自建服务器、安装 Nginx 或使用 Docker。托管平台可能已经代管入口、证书、进程和构建。
- 不把域名简单等同于单个固定 IP。DNS 可以返回多个地址；正文只用足以建立心智模型的简化描述。
- 不承诺某种用户规模对应固定架构，本篇不讨论扩容。
- 不把备案写成法律意见；提示读者根据部署地区和业务性质核对接入商及主管部门要求。
- 不把 OpenAI 或 Anthropic 的内部工程规模直接套到个人项目，只提炼可缩小落地的原则：仓库事实源、权限隔离、外部验收和反馈回路。
- “运行合同”是本文为帮助理解使用的概念，不声称它是一项新的行业标准；其内容由版本文件、依赖锁、环境变量示例、迁移脚本、健康检查和回滚规则共同组成。
