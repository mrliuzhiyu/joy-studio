# 012 · AI 时代的软件，到底是给人用，还是给 AI 用？ · research brief

> 研究日期：2026-07-19
>
> 用途：事实底座 + 参考架构。正文不能写成协议名单；每个协议只承担它能证明的那部分。

## 0. 研究结论

“给人用还是给 AI 用”是一个有用的入口，但不是最终答案。

公开产品与协议正在同时补齐五种能力：

1. AI 发现并调用软件能力（MCP）。
2. 不同 Agent 发现彼此、委托长任务并交换产物（A2A）。
3. 跨商家维持一致的交易过程（UCP）。
4. 为 AI 交易留下明确授权、限额和审计证据（AP2）。
5. 在对话内返回表单、仪表盘、地图、编辑器与审批界面（OpenAI Apps SDK / MCP Apps）。

这组事实支持的不是“未来只剩 API”，而是：

> **软件正在把领域能力从固定页面中拆出来，交给 AI 编排；同时把比较、确认、精细操作和审计重新做成人类控制面。**

本文提出的落地形态是“一个能力核心、两种表面、一条安全控制面”：

- 一个确定性的领域能力核心，保存真实状态并执行操作。
- 面向 AI 的机器契约表面，负责发现、结构、任务和错误。
- 面向人的控制表面，包含固定工作台与按任务生成的临时界面。
- 身份、权限、审批、限额、审计、幂等和回滚横贯所有层，不能交给模型自觉。

## 1. 为什么固定页面正在失去唯一入口地位

### OpenAI Apps SDK

OpenAI 于 2025-10-06 发布 ChatGPT Apps / Apps SDK。官方描述中，应用可以在对话中被自然语言触发，也可以返回可直接操作的交互界面；SDK 建立在 MCP 上。

可支持的正文事实：

- 第三方应用可以同时提供自然语言入口和聊天内交互界面。
- Booking.com、Canva、Coursera、Figma、Expedia、Spotify、Zillow 等首批伙伴证明场景不只限于文本问答。
- 这是一种“能力与界面一起进入 Agent 宿主”的产品形态。

来源：

- [Introducing apps in ChatGPT and the new Apps SDK · OpenAI](https://openai.com/index/introducing-apps-in-chatgpt/)

诚实边界：Apps SDK 是 OpenAI 产品与开发生态，不能独自证明所有软件都会迁移到聊天入口。

### MCP Apps

MCP Apps 于 2026-01-26 成为首个正式 MCP 扩展。工具描述可以声明一个 `ui://` 资源，宿主获取 HTML/JavaScript 后在沙箱 iframe 中渲染；界面与宿主通过 JSON-RPC / `postMessage` 双向通信。

它证明的不是“AI 可以生成任意网页”，而是一种更受控的形态：

- 工具提供者预先声明交互资源。
- 宿主负责隔离渲染与能力审批。
- 模型、界面和工具可以共享任务上下文。
- 表单、仪表盘、文档审阅、持续监控、多步骤审批等场景不必退化成多轮文本问答。

来源：

- [MCP Apps overview · Model Context Protocol](https://modelcontextprotocol.io/extensions/apps/overview)
- [MCP Apps - Bringing UI Capabilities To MCP Clients · MCP Blog](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
- [SEP-1865: MCP Apps](https://modelcontextprotocol.io/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp)

诚实边界：MCP Apps 是可选扩展，宿主支持范围仍在变化；它标准化的是“工具附带交互 UI”，不是完整的下一代应用架构。

## 2. 给 AI 的不只是普通 API

### MCP：工具与数据连接

MCP 让服务声明工具，客户端发现并调用。工具定义包含名称、描述、输入 JSON Schema、可选输出 Schema、行为标注与任务支持信息。

面向 AI 的接口比普通内部 API 多了一层“可发现语义”：模型需要仅凭名称、描述、结构和当前上下文判断何时调用。

来源：

- [Tools · MCP specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [Authorization · MCP specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)

正文应强调：旧 REST API 外包一层 MCP 只是连接完成；要真正适合 Agent，还需要明确副作用、错误语义、任务状态、幂等与权限。

### A2A：Agent 与 Agent 之间的任务协议

Google 于 2025-04 发布 A2A，随后项目进入 Linux Foundation。A2A 的核心不是把远端 Agent 降格成一个函数，而是：

- 用 Agent Card 声明身份、能力、端点与认证要求。
- 用 Task 表达可能持续较长时间的工作。
- 用 Message 交换过程信息。
- 用 Artifact 交付结构化产物。

来源：

- [Announcing the Agent2Agent Protocol · Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A Protocol · GitHub / Linux Foundation project](https://github.com/a2aproject/A2A)

正文用途：证明未来软件除了“函数 API”，还需要可发现的任务语义、长任务状态和产物交付。

### UCP / AP2：交易与授权分开

Google 2026-03 的协议指南把两件事拆开：

- UCP 统一商品发现、购物车、结账等交易过程，并要求结构化请求/响应。
- AP2 通过 Intent Mandate / Payment Mandate / Receipt 记录谁授权了什么、限额多少、何时过期以及最终发生了什么。

示例明确使用 `Idempotency-Key` 和 `Request-Id`，说明 AI 发起的交易需要防重复与可追踪性。

来源：

- [Developer’s Guide to AI Agent Protocols · Google Developers Blog](https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/)
- [Under the Hood: Universal Commerce Protocol · Google Developers Blog](https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/)

诚实边界：这些协议能证明设计问题已经被行业认真对待，不能直接写成“所有商家已经采用”。

## 3. 本文提出的参考架构

### 3.1 双入口

未来软件应把“人类入口”和“AI 入口”视为同等正式的产品表面。

```text
                 人
        ┌────────┴────────┐
        │                 │
  固定控制台        任务型临时界面
        │                 │
        └────────┬────────┘
                 │ 目标 / 选择 / 确认
                 ▼
              AI 编排层
                 │ 发现 / 计划 / 委托
                 ▼
      MCP / A2A / 领域机器契约
                 │
                 ▼
      确定性领域服务与真实状态
```

固定控制台负责高频、精细、可学习的操作，以及历史、权限和审计。

任务型临时界面负责本次任务特有的比较、配置、预览和批准。它不应由模型任意生成裸 HTML，优先由服务提供受信 UI 资源或由宿主从可信组件库组合。

### 3.2 四个实现层

#### 领域能力层

保存唯一业务真相：订单、库存、文档版本、日历事件、支付状态。模型输出不是事实源。

要求：

- 操作小而稳定。
- 状态可查询。
- 失败可区分。
- 写操作可审计。
- 重要操作支持撤销、补偿或明确的不可逆标记。

#### 机器契约层

让 AI 能发现和理解能力。

最低要求：

- 名称与描述说明什么时候用、什么时候不要用。
- 输入输出结构化。
- 查询与修改分开。
- 预览与提交分开。
- 长任务返回 task id、进度与最终 artifact。
- 错误告诉 Agent 缺什么信息、能否重试、是否必须找人。
- 版本与能力可以协商。

#### AI 编排层

负责把自然语言目标拆成任务，选择工具或远端 Agent，合并结果，并在不确定时请求人类选择。

不负责：

- 保存业务真相。
- 持有永久高权限凭据。
- 自己决定不可逆交易是否获批。
- 用自然语言记忆代替审计日志。

#### 人类控制面

由两种 UI 组成：

- 稳定 UI：工作台、编辑器、权限、账单、审计、历史、批量管理。
- 任务 UI：比较表、地图、审批卡、差异视图、配置向导、实时进度。

任务 UI 的存在说明未来不是“只有聊天”。MCP Apps 官方列出的复杂数据探索、多选项配置、富媒体、实时监控和多步骤审批，都是文本对话不擅长的地方。

### 3.3 一条安全控制面

身份、权限、审批、限额、审计与回滚必须由确定性系统执行，而不是写进系统提示后期待模型遵守。

Anthropic 2026-05 公开数据：Claude Code 用户批准约 93% 的权限提示；高频确认产生批准疲劳。官方结论转向约束 Agent 能做什么，而不是仅监督它想做什么，使用沙箱、虚拟机、文件边界和网络出口控制限制爆炸半径。

来源：

- [How we contain Claude across products · Anthropic](https://www.anthropic.com/engineering/how-we-contain-claude)

设计要求：

- 人和 Agent 使用不同身份或可区分的代理身份。
- 令牌范围最小、时效有限，可单独吊销。
- 读取与写入权限分开。
- 高风险操作先产生预览或意图凭证，再提交。
- 所有写操作带 request id / idempotency key。
- 日志记录用户目标、AI 计划、真实调用、授权者与最终状态。
- 能硬隔离的用沙箱和网络策略，不依赖模型自律。

## 4. 现有 SaaS 的渐进式落地路线

本文不能要求团队推倒重写。建议用一个真实高频任务逐步改造：

### 第一步：把页面背后的业务动作显式化

挑一个跨多个页面、但规则清楚的任务，例如“创建采购申请并送审”。列出查询、预览、提交、取消、查询状态五类动作。

不要从“做一个万能聊天框”开始。

### 第二步：把动作改造成稳定机器契约

- 结构化输入输出。
- 查询与写入分离。
- 写入支持预览。
- 返回稳定错误码与补充信息要求。
- 加入幂等键与任务状态。

### 第三步：增加 Agent 入口

用 MCP 暴露工具，或使用产品已有 API + Agent 适配层。让 AI 完成信息收集、选项比较和草稿生成；首次不开放不可逆权限。

### 第四步：增加任务型 UI

对多选项、比较、审批和持续状态，用 MCP Apps / Apps SDK 或自有可信组件渲染。不要把所有交互退化成逐句追问。

### 第五步：建立安全控制面

为 Agent 建独立身份、最小权限和操作限额；写操作先预览；高风险动作要求签名/审批；保留完整审计和补偿路径。

### 第六步：评测真实任务

不只测回答质量。至少记录：

- 任务一次完成率。
- 错误工具/接口选择率。
- 需要人工接管的位置。
- 重复或越权操作数。
- 失败恢复率。
- 用户确认次数与拒绝率。
- 从意图到完成的总时间。

## 5. 贯穿案例：一次公司差旅

用户说：“下周三去上海见客户，周四晚上回来，按公司标准订，别安排早于七点的航班。”

### 传统形态

用户分别打开日历、差旅、航班、酒店和报销系统；在页面之间搬运日期、城市、成本中心与审批信息。

### 参考形态

1. AI 从日历和 CRM 读取会议约束。
2. 调用差旅政策能力，得到预算、舱位、酒店标准与审批人。
3. 查询交通与酒店能力，生成三套可解释的组合方案。
4. 人在任务型 UI 中比较时间、价格和风险，选择其中一套。
5. 系统生成可审计的预订单与支付/审批意图。
6. 在限额内自动提交，超限则固定审批界面出现。
7. 领域服务完成预订，返回订单与取消规则。
8. AI 更新日历并生成报销草稿；所有动作写入审计记录。

此例能展示四种责任：

- 人：给目标、偏好与最终授权。
- AI：跨系统理解和编排。
- API / 服务：保存状态并可靠执行。
- UI：比较、确认、处理例外与追责。

## 6. 反方与风险

### “浏览器操作已经够了，不需要重做 API”

Steelman：浏览器让 Agent 立即使用现有软件，零集成成本，适合低频、长尾和迁移期任务。

问题：页面结构不稳定、语义依赖视觉、批量操作低效、权限粒度粗、失败恢复与幂等困难。浏览器应是兼容层，不是高频关键任务的最终接口。

### “既然 AI 会操作，产品只做机器接口就够了”

Steelman：减少前端开发，界面更贴合当下任务。

问题：高频操作无法形成肌肉记忆；精细编辑、复杂数据浏览、可访问性、品牌表达和高风险确认需要稳定交互。更可靠的是可信组件/预声明 UI，不是任意生成页面。

### “每次危险操作弹窗确认就够了”

反证：Anthropic 数据显示约 93% 的提示被批准，高频弹窗导致批准疲劳。确认应该集中在目标、预算、范围和不可逆提交点，其他风险由硬边界处理。

### “给 AI 一套管理员 API 最省事”

这是把模型误判直接放大成业务事故。Agent 身份应默认比人更窄，并根据任务临时获得范围有限、可撤销的能力。

### 平台入口风险

如果 AI 成为统一入口，软件厂商可能失去品牌、分发和用户关系。机器契约应保持开放和可迁移，关键状态与用户授权不能只存在于单一 Agent 平台。

## 7. 正文建议结构

不在 notes 里锁死章节，当前自然结构如下：

1. 人为什么必须学会操作软件。
2. 当 AI 成为操作者，页面开始变成阻力。
3. 未来不是只剩 API：一个能力核心、两种表面。
4. 面向 AI 的接口为什么不是普通 API。
5. 人类控制面应该保留什么、生成什么。
6. 现有 SaaS 六步改造路线 + 差旅案例。
7. 平台、权限与商业关系的新问题，结尾停在软件不再要求人必须进入它。

## 8. 发布前核验清单

- [ ] MCP Apps “首个正式扩展 / ready for production”使用 2026-01-26 官方博客原文，不扩大成所有客户端均已支持。
- [ ] ChatGPT Apps 的可用范围与用户数字容易变化，正文尽量不依赖数字；若使用需发布前重查。
- [ ] A2A 当前版本、项目归属与 Agent Card 字段发布前重查。
- [ ] UCP / AP2 用作设计信号，明确其采用成熟度，不写“行业统一”。
- [ ] 93% 权限批准率来自 Anthropic 自家匿名遥测，明确适用范围是 Claude Code 用户，不外推所有用户。
- [ ] 所有架构图标注“本文提出的参考形态”，不伪装成官方标准。
- [ ] 反方篇幅不少于正方，浏览器兼容层与固定 UI 的价值要完整呈现。

## 9. 一手来源索引

### 交互界面

- [Introducing apps in ChatGPT and the new Apps SDK · OpenAI](https://openai.com/index/introducing-apps-in-chatgpt/)
- [MCP Apps overview · Model Context Protocol](https://modelcontextprotocol.io/extensions/apps/overview)
- [MCP Apps - Bringing UI Capabilities To MCP Clients · MCP Blog](https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/)
- [SEP-1865 · Model Context Protocol](https://modelcontextprotocol.io/seps/1865-mcp-apps-interactive-user-interfaces-for-mcp)

### 能力与 Agent 协作

- [Tools · MCP specification](https://modelcontextprotocol.io/specification/2025-11-25/server/tools)
- [Authorization · MCP specification](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization)
- [Announcing A2A · Google Developers Blog](https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/)
- [A2A Protocol · GitHub](https://github.com/a2aproject/A2A)

### 交易与授权

- [Developer’s Guide to AI Agent Protocols · Google Developers Blog](https://developers.googleblog.com/developers-guide-to-ai-agent-protocols/)
- [Under the Hood: UCP · Google Developers Blog](https://developers.googleblog.com/under-the-hood-universal-commerce-protocol-ucp/)

### 运行与安全

- [How we contain Claude across products · Anthropic](https://www.anthropic.com/engineering/how-we-contain-claude)
- [Introducing OpenAI Frontier · OpenAI](https://openai.com/index/introducing-openai-frontier/)
