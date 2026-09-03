# 016 研究简报｜从演示到稳定服务

> 研究日期：2026-08-18
> 用途：为文章建立事实边界，不在正文中堆砌术语和来源。

## 一、结论摘要

1. 生产级没有统一组件清单。更可靠的判断方式，是先定义服务对用户的承诺，再为这些承诺设计最小实现。
2. 一次公开服务至少涉及访问入口、应用进程、配置与密钥、持久化数据、身份与权限、发布、日志监控、备份恢复等责任。
3. 托管平台可以代为承担 TLS、容器调度、数据库备份、日志收集等工作，但责任只是被转移，并没有消失。
4. Docker 解决运行环境的一致性与隔离问题；Nginx 常用于反向代理、TLS 终止和流量分发。两者都有价值，但都不是所有项目上线的前置条件。
5. 系统复杂度本身会制造风险。每加入一个组件，都要同时回答谁部署、谁升级、谁监控、谁备份、坏了如何恢复。

## 二、证据地图

### 1. 一次请求经过什么

MDN 对 Web 工作方式的说明覆盖了浏览器、DNS、HTTP、服务器和响应的基本链路。正文可以据此画出最小请求旅程，但不展开网络协议细节。

- 来源：[MDN｜How the web works](https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works)
- 可支持的表述：用户打开一个网址时，请求会先找到服务器，再由服务器处理并返回资源或数据。
- 写作限制：实际生产链路可能还包含 CDN、负载均衡、网关和多个内部服务，图中应明确是最小模型。

### 2. 为什么配置、状态与日志要离开代码

The Twelve-Factor App 分别讨论了配置、无状态进程、开发与生产的一致性、日志事件流和可快速启停。它适合支撑最小工程边界，但不能被写成唯一的现代架构标准。

- [Config](https://www.12factor.net/config)：部署之间会变化的配置不应硬编码进代码。
- [Processes](https://www.12factor.net/processes)：应用进程应尽量无状态，持久数据交给数据库等后端服务。
- [Dev/prod parity](https://12factor.net/dev-prod-parity)：缩小开发与生产环境差异，可以减少只在线上出现的问题。
- [Logs](https://12factor.net/logs)：日志首先是连续事件流，部署环境负责收集、存储和检索。
- [Disposability](https://12factor.net/disposability)：快速启动和优雅停止有助于发布、扩缩容和故障恢复。

### 3. Docker 解决什么，不解决什么

Docker 官方将容器描述为隔离、可独立运行的进程，并强调自包含和可移植性。正文应将其定位为交付运行环境的方法，而不是稳定性的同义词。

- 来源：[Docker｜What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/)
- 来源：[Docker overview](https://docs.docker.com/get-started/docker-overview/)
- 来源：[Use Compose in production](https://docs.docker.com/compose/how-tos/production/)
- 可支持的表述：容器能减少环境差异，也便于重复部署；单机 Compose 可以是小型服务的合理起点。
- 写作限制：容器不会自动提供备份、高可用、权限控制、监控或零停机发布。

### 4. Nginx 解决什么，不解决什么

NGINX 官方文档说明了反向代理的核心行为：接收客户端请求，把请求转给上游服务，再将响应返回客户端，并可进行负载分发。

- 来源：[NGINX｜Reverse Proxy](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy)
- 可支持的表述：当需要统一入口、转发多个服务、细化连接与流量控制时，Nginx 很有价值。
- 写作限制：如果部署平台已经提供域名、TLS、路由和负载均衡，再自建 Nginx 可能只是重复一层运维责任。

### 5. 为什么最小实现更可靠

Google Cloud 和 Azure 的架构指南都把简化设计、减少关键路径组件、使用托管服务和避免过度设计列为可靠性原则。

- 来源：[Google Cloud Well-Architected Framework](https://docs.cloud.google.com/architecture/framework?hl=en)
- 来源：[Azure Well-Architected｜Simplify](https://learn.microsoft.com/en-us/azure/well-architected/reliability/simplify)
- 来源：[Azure Well-Architected｜Reliability principles](https://learn.microsoft.com/en-us/azure/well-architected/reliability/principles)
- 可支持的表述：组件越多，交互和管理面越多；除非需求能证明其价值，否则应保持关键路径简单。
- 写作限制：简单不是省略安全、备份和恢复，而是用更少的自管部件承担必要责任。

### 6. 安全的最低边界

OWASP 2025 把访问控制、软件与数据完整性等继续列为关键风险。密钥管理指南强调不应将密钥硬编码在代码中，并需要访问控制、审计和轮换能力。

- 来源：[OWASP Top 10:2025](https://devguide.owasp.org/en/07-training-education/05-top-ten/)
- 来源：[A01:2025 Broken Access Control](https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/)
- 来源：[A08:2025 Software or Data Integrity Failures](https://owasp.org/Top10/2025/A08_2025-Software_or_Data_Integrity_Failures/)
- 来源：[OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- 可支持的表述：权限必须在服务端执行；密钥不应进入源码；发布链路和依赖来源也属于安全边界。
- 写作限制：正文只讲普通项目的底线，不扩展成完整安全合规手册。

### 7. 为什么上线后必须看得见

OpenTelemetry 将日志、指标和链路追踪视为主要遥测信号，并强调可观测性用于理解系统为什么处于当前状态。Google SRE 也把监控、事件响应和根因分析列为运行服务的基本实践。

- 来源：[OpenTelemetry｜Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/)
- 来源：[OpenTelemetry｜Signals](https://opentelemetry.io/docs/concepts/signals/)
- 来源：[Google SRE Book｜Practices](https://sre.google/sre-book/part-III-practices/)
- 可支持的表述：服务是否可靠，不能只看进程是否在线，还要看用户请求是否成功、延迟是否异常、数据任务是否完成。
- 写作限制：小型单体应用不必一开始建设完整的分布式追踪；结构化日志、错误告警和少量核心指标通常已经能覆盖早期需求。

### 8. 为什么发布也属于产品能力

GitHub 的部署环境支持审批、分支限制、环境密钥和部署历史，可作为发布需要边界与记录的事实依据。

- 来源：[GitHub Docs｜Deployment environments](https://docs.github.com/en/actions/concepts/workflows-and-actions/deployment-environments)
- 可支持的表述：可重复发布、环境隔离、失败回退和变更记录，决定了更新能否安全到达用户。
- 写作限制：这不意味着个人项目必须搭建复杂流水线；一条可重复执行、结果可验证的发布流程已经是起点。

## 三、反例与边界

- 只用于验证需求的短期演示，不必承担公共服务的全部成本。
- 生产级应按影响范围定义。一个匿名网页和一个保存用户付费数据的服务，责任等级不同。
- 托管平台优先并不等于永远不自建。当出现合规、成本、性能或控制力需求时，自建组件可能更合适。
- 单机不是天然不可靠。只要用户承诺、恢复时间和数据风险允许，单机加可靠备份可以是诚实而有效的实现。
- 多副本也不是天然可靠。如果状态、发布和故障切换没有设计清楚，只会增加新的故障组合。

## 四、正文表达约束

- 不使用生产级等于 Docker 加 Nginx 加 Redis之类的公式。
- 不用组件数量展示专业感。
- 所有组件均按问题、触发信号、引入成本三个角度解释。
- 图示区分最小路径和增长后的路径，不把后者暗示为终局答案。
- 不承诺绝对稳定，统一使用降低故障概率、缩小影响范围、加快发现与恢复等可验证表述。
