# 011 · 代码生成文档 · research brief

> 研究日期：2026-07-18
>
> 研究目标：验证“描述系统现状的文档正在变成代码的生成物”是不是当下真实趋势，找出它与传统代码文档生成的区别，并划清代码无法生成的文档边界。

## 一、研究结论

这个选题成立，而且时效比最初预想的更强。

2026 年 7 月 9 日，GitHub 上线仓库概览：Copilot 可以从仓库生成项目目的、技术栈和贡献信息；仓库没有 README 时，可以直接生成一份。五天后，Martin Fowler 网站发表 Unmesh Joshi 的新文章，反对把提示词当长期真源，认为真正能长期承载意图的可能是代码中的领域模型和 DSL。

两件事放在一起，构成了一条清楚的变化：AI 编程并没有简单地把文档推到代码前面。代码本身也正在变成 AI 理解系统、生成说明和服务下一轮开发的主要入口。

但“文档由代码生成”必须限定范围：

- 当前架构、接口、依赖、入口、数据流、变更摘要等实现事实，适合从代码、测试和运行结果生成。
- 产品目的、业务约束、历史取舍、未来方向、安全政策等意图事实，无法从代码可靠恢复，仍需人维护。

文章的新意不是“代码也是文档”。这个观点至少在 2005 年已经被 Martin Fowler 系统讨论。新意是：AI 第一次能把整个代码库实时翻译成面向不同读者、不同任务的自然语言视图，生成范围从类、函数和 API 扩展到了项目级理解。

## 二、当下正在发生什么

### 1. GitHub 已经直接从仓库生成 README

GitHub 2026-07-09 的官方更新写得非常明确：当用户第一次进入一个陌生仓库，可以让 Copilot 生成高层概览；如果仓库没有 README，Copilot 可以生成一份，帮助用户理解项目用途和技术栈。

一手源：[Ask Copilot for a repository overview](https://github.blog/changelog/2026-07-09-ask-copilot-for-a-repository-overview/)

这可以作为全文的新闻钩子。它把“代码生成文档”从第三方小工具变成 GitHub 仓库首页的默认能力。

### 2. DeepWiki 把整个仓库变成自动生成的 wiki

Devin 的 DeepWiki 会在连接仓库时自动索引代码，生成架构图、文档摘要和源码链接。公开仓库还可以直接提交 GitHub URL 生成 wiki。生成结果不是完全无引导：仓库可以通过 `.devin/wiki.json` 提供人工 notes 和期望页面，说明自动生成仍需要意图层校准。

一手源：[DeepWiki 官方文档](https://docs.devin.ai/work-with-devin/deepwiki)

### 3. GitHub 正在把代码库变成可直接提问的知识源

GitHub Copilot 已支持直接以仓库为上下文，回答架构、入口、数据流、设计模式和具体符号等问题。GitHub 还会为仓库建立语义索引，让回答落到实际文件和符号。

一手源：[Using GitHub Copilot to explore a codebase](https://docs.github.com/en/copilot/tutorials/explore-a-codebase)、[Indexing repositories for GitHub Copilot](https://docs.github.com/en/copilot/concepts/context/repository-indexing)

静态文档的一个功能正在被“对当前代码直接提问”取代。读者不必先找到一篇提前写好的通用说明，可以在需要时生成适合自己问题的解释。

### 4. GitHub 自己已经要求 AI 优先相信代码

GitHub 的 Copilot CLI 教程专门提醒：过期 Markdown 会让 AI 给出自信但错误的答案。官方建议明确告诉 Copilot，以代码而不是 README 或 `docs/` 为准；如果代码无法确认，就承认不确定，不要补猜。

一手源：[Using Copilot CLI as your AI SME](https://docs.github.com/en/copilot/tutorials/use-an-ai-sme)

这是本期最强的一条判断依据。它不是作者对文档腐烂的感想，而是 GitHub 官方已经把“代码优先于文档”写进使用指南。

### 5. AI 的仓库记忆也开始以代码校验和过期

GitHub Copilot 的 repository memory 会保存仓库级认识，但官方强调这些记忆在使用前要与当前代码库验证，并在 28 天后自动过期，以防旧认识长期残留。

一手源：[Agentic memory for GitHub Copilot](https://github.blog/changelog/2026-01-15-agentic-memory-for-github-copilot-is-in-public-preview/)

这透露了一种新的文档观：对系统现状的描述不一定是永久资产，可以是带有效期、可从当前代码重新生成的缓存。

## 三、这件事哪里新，哪里不新

### 不新的部分

Martin Fowler 2005 年已经写过 Code As Documentation：代码之所以是主要技术文档，是因为它足够精确和详细。但他同时强调，代码不是唯一文档，糟糕代码也不会自动成为好文档。

一手源：[Code As Documentation](https://martinfowler.com/bliki/CodeAsDocumentation.html)

Doxygen 长期以来能从源码注释生成类、函数和变量文档；Swagger/OpenAPI 也能从 API 定义或 Java 代码生成接口文档。这说明“从代码自动产文档”不是 AI 发明的。

一手源：[Doxygen](https://www.doxygen.nl/)、[Swagger API Documentation](https://swagger.io/solutions/api-documentation/)、[OpenAPI Generator](https://openapi-generator.tech/docs/generators/openapi/)

### 新的部分

传统生成器依赖结构化输入：注释、类型、OpenAPI 描述、模板。它们能稳定生成固定格式的参考资料，但很难跨整个仓库解释“这个产品做什么”“模块怎样协作”“新人应该从哪里读”。

大模型把生成范围扩展到了非结构化代码库，并且允许按读者的问题临时改变输出。README、架构概览、入职说明和一次 PR 的变更解释，可以来自同一份代码，却面向不同对象生成不同视图。

所以准确表达不是“AI 第一次让代码生成文档”，而是：

> AI 第一次让整个代码库变成可以随时编译成自然语言文档的源文件。

## 四、规格生成代码与代码生成文档并不矛盾

003 和 008 已经分别写过 SDD 与 SPDD。表面上，它们主张规格或结构化提示词是源，代码是生成物；本期却主张代码是源，文档是生成物。

实际工作流已经是双向的。

Thoughtworks 的 SPDD 对行为变化要求先更新结构化提示词再生成代码，但对不改变行为的重构，明确要求先改代码，再运行 `/spdd-sync` 把新结构同步回提示词。它已经承认单向生成无法覆盖全部开发活动。

一手源：[Structured-Prompt-Driven Development](https://martinfowler.com/articles/structured-prompt-driven/)

Unmesh Joshi 2026-07-14 在 Martin Fowler 网站的新文章进一步提出：大型系统的大量设计决定无法提前全部写进高层规格；真正的约束和边界在实现过程中才会被发现。一个可读、可验证的 DSL 或语义模型，可能比原始提示词更适合作为长期资产。

一手源：[DSLs Enable Reliable Use of LLMs](https://martinfowler.com/articles/llm-and-dsls.html)、[Conversation: LLMs and Building Abstractions](https://martinfowler.com/articles/convo-llm-abstractions.html)

本期可以给出的新模型是：

```text
人维护：产品意图 / 业务规则 / 约束 / 取舍
                    │
                    ▼
               AI 修改代码
                    │
                    ▼
代码 + 测试 + 运行结果（实现真源）
                    │
                    ▼
      AI 按需生成 README / API / 架构 / 入职说明
```

这不是二选一。上游文档表达应该发生什么，下游文档描述现在发生了什么。

## 五、反方与真实边界

### 1. 生成说明可能错误或不完整

GitHub 的 responsible use 文档明确说，Copilot 生成的代码解释可能不准确或不完整，必须人工核验。复杂结构、冷门语言和不充分的上下文都会降低质量。

一手源：[Responsible use of GitHub Copilot Chat](https://docs.github.com/en/copilot/responsible-use/chat)

因此不能把“从代码生成”写成“生成后直接发布”。更合理的形态是：生成内容必须挂源码证据，行为主张还要经测试或运行结果验证。

### 2. 代码无法恢复意图

同一段实现可能来自多种业务原因。代码能告诉读者存在五次触发门槛，却无法说明为什么是五次、谁决定的、是否准备改成三次。它能显示订阅字段，却无法判断商业模式已经上线还是仍是设想。

GitHub 自己要求项目的人工 instructions 写清项目目的、结构、贡献规则和关键技术原则，恰好证明这些上下文不能完全依赖代码推断。

一手源：[Using GitHub Copilot cloud agent to improve a project](https://docs.github.com/en/copilot/tutorials/cloud-agent/improve-a-project)

### 3. 代码不等于完整运行事实

动态配置、外部服务、数据库里的开关、生产流量、部署状态和人工操作流程可能不在代码库里。仅凭仓库生成的文档容易把“代码里存在”误写成“生产正在使用”。

### 4. 代码也可能表达得很差

Fowler 2005 年就提醒：说代码是文档，不代表任何代码库天然是好文档。命名混乱、动态拼接、反射、跨仓库依赖和遗留逻辑都会让生成说明失真。

### 5. 安全与访问边界

从私有仓库生成说明时，输出可能把内部结构、接口、安全策略或敏感上下文带到不该出现的文档中。生成系统必须继承源仓库的访问控制，并在发布前进行敏感信息审查。

## 六、Relio 实验

实验材料：

- [仅从代码生成的说明](relio-generated-from-code.md)
- [与人工文档逐项对照](relio-comparison.md)

最有价值的发现：

1. 人工架构文档只比代码早三天，关键事实已经大面积过期。
2. 人工文档写四个旧模型，代码实际使用六个不同模型；仲裁模型、保存流程、认证和目录结构也已改变。
3. 代码生成说明准确恢复了当前实现，却完全无法恢复付费方、商业模式、竞品差异、成功指标和设计心法。
4. 同一个仓库同时证明了两件事：描述实现的文档应该从代码生成；表达意图的文档仍需人工维护。

这个实验适合成为全文中段的主要证据，而不只是结尾彩蛋。

## 七、可写进正文的判断

- 文档腐烂不是因为团队不重视文档，而是因为同一事实被维护了两遍。
- AI 编程让代码变化更快，人工同步说明文档的窗口从几个月缩短到几天。
- 描述代码的文档正在从资产变成缓存：随时可生成，可以过期，也可以按读者重建。
- 人真正要维护的不是代码已经表达过的事实，而是代码没有能力保存的意图、约束和取舍。
- 未来的 README 可能不是作者提前写给所有人的一篇文章，而是读者打开仓库时，由 AI 根据当前代码临时生成的一张地图。

## 八、发布前待继续核实

| 项 | 状态 | 说明 |
|---|---|---|
| GitHub 仓库概览上线日期与能力 | ✅ | 2026-07-09 官方 changelog |
| 无 README 时可由 Copilot 生成 | ✅ | 官方原文明确写出 |
| DeepWiki 自动生成能力 | ✅ | Devin 官方文档 |
| GitHub 建议代码优先于旧 Markdown | ✅ | Copilot CLI 官方教程 |
| Copilot 输出可能不准确或不完整 | ✅ | GitHub responsible use |
| repository memory 28 天过期 | ✅ | GitHub 官方 changelog |
| Fowler/Unmesh DSL 文章时间与主张 | ✅ | 2026-07-14 一手文章 |
| SPDD code-to-spec 同步机制 | ✅ | 2026-04-28 一手文章 |
| Relio 人工文档与代码差异 | ✅ | 固定 commit 的本地逐项核对 |
| 大规模团队是否已采用生成式文档为正式流程 | ⚠️ | 当前有产品能力和案例，缺独立采用数据；正文不要写成行业已全面迁移 |
| AI 生成文档节省多少时间 | ⚠️ | 暂无可信统一数据，不给百分比 |
