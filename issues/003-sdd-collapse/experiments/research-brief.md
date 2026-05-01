# 003 · 素材链接库

draft.md 里的事实都从这里出。按主题归类，每条带一句话说明这条素材在哪一章被引用。

---

## A · 学术 / 概念源头

- [Spec-Driven Development: From Code to Contract in the Age of AI Coding Assistants · arXiv:2602.00180](https://arxiv.org/abs/2602.00180) —— Deepak Babu Piskala，2026-01-30，投稿 AIWare 2026；8 页立场论文。02 章引用三层级定义。
- [Constitutional Spec-Driven Development · arXiv:2602.02584](https://arxiv.org/abs/2602.02584) —— 2026-02，把宪法约束搬进 SDD。05 章可备引。
- [Understanding Specification-Driven Code Generation with LLMs · arXiv:2601.03878v1](https://arxiv.org/html/2601.03878v1) —— SANER 2026 Stage 1 注册报告。
- [Understanding Spec-Driven-Development: Kiro, spec-kit, and Tessl · Martin Fowler 站点](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html) —— 提出三层级清晰定义；05 章 MDD 历史镜像也引这里。

## B · 工具生态

### GitHub Spec Kit

- [github/spec-kit](https://github.com/github/spec-kit) —— 92k star（2026-04），v0.8.3，6 命令 `/speckit.constitution → specify → plan → tasks → implement → clarify`，30+ agent 支持
- [GitHub 官方 blog: Spec-driven development with AI](https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/)
- [Spec Kit issue #75: SpecKit creates the illusion of work](https://github.com/github/spec-kit/issues/75) —— 05 章实战吐槽硬证据
- [Spec Kit Discussion #152: Evolving specs](https://github.com/github/spec-kit/discussions/152) —— 关于 spec 演进的社区讨论

### AWS Kiro

- [Kiro 官网](https://kiro.dev/) —— 2025 中发布
- [Introducing Kiro · Kiro blog](https://kiro.dev/blog/introducing-kiro/)
- [Amazon Kiro AWS Agentic IDE: Complete 2026 Developer Guide](https://www.digitalapplied.com/blog/amazon-kiro-aws-agentic-ide-complete-guide)
- [Kiro: the good, bad and ugly · DEV Community](https://dev.to/fikuri/kiro-the-good-bad-and-ugly-part-in-my-personal-experience-1neh) —— 第三方实测

### 阿里 Qoder

- [Qoder 负责人揭秘: 产品背后的思考与未来发展 · 阿里云博客](https://www.cnblogs.com/alisystemsoftware/p/19121515) —— 2025-08-22 发布；中国首个 Agentic Coding 平台定位
- [Quest Mode 任务模式 · Qoder 文档](https://caug.cn/docs/quest-mode) —— Quest Mode 官方文档；明确 Spec First 概念
- [基于 Qoder 的 Spec 驱动开发初探 · 何锦彬博客园](https://www.cnblogs.com/springsource/p/19231843)

### 腾讯云 CloudBase AI Toolkit

- [Spec 工作流说明 · 腾讯云开发 CloudBase 官方文档](https://docs.cloudbase.net/en/ai/cloudbase-ai-toolkit/spec-workflow) —— 复刻 Kiro 工作流；命令 `/spec`、`/no_spec`
- [TencentCloudBase/CloudBase-AI-ToolKit · GitHub](https://github.com/tencentcloudbase/cloudbase-ai-toolkit)
- [AI 编程不靠运气，Kiro Spec 工作流复刻全攻略 · 腾讯云博客](https://cloud.tencent.com/developer/article/2543991) —— 官方明说复刻 Kiro

### Tessl

- [Tessl 官网](https://tessl.io/)
- [Tessl launches spec-driven development tools](https://tessl.io/blog/tessl-launches-spec-driven-framework-and-registry/)
- [Guy Podjarny unveils Tessl's vision · Calcalist](https://www.calcalistech.com/ctechnews/article/i7ucn8teu) —— 1.25 亿美元 A 轮、Snyk 创始人背景
- [Guy Podjarny: Remaking Software Development for the AI Era · GV](https://www.gv.com/news/guy-podjarny-interview-tessl-ai-software-development)
- [Five AI Realities with Tessl's Guy Podjarny · GV](https://www.gv.com/news/five-ai-realities-with-tessl-guy-podjarny) —— Gartner 预测的引用源

### OpenSpec

- [Fission-AI/OpenSpec · GitHub](https://github.com/Fission-AI/OpenSpec)
- [OpenSpec 官网](https://openspec.dev/)
- [OpenSpec Deep Dive · redreamality](https://redreamality.com/garden/notes/openspec-guide/)

### cc-sdd

- [gotalab/cc-sdd · GitHub](https://github.com/gotalab/cc-sdd) —— 3.2k star，让 8 种 agent 跑 Kiro 风格 SDD

## C · vibe coding 与 Karpathy 范式转折

- [Karpathy 2025-02-02 vibe coding 原帖 · X](https://x.com/karpathy/status/2019137879310836075) —— shower thoughts 推文，03 章核心引证
- [Karpathy 2026-02-04 agentic engineering 帖 · X](https://x.com/karpathy/status/2026731645169185220) —— 一周年祭日，宣告 vibe coding 过时
- [Vibe coding is passé · The New Stack](https://thenewstack.io/vibe-coding-is-passe/) —— 完整解读 Karpathy 转向
- [What Andrej Karpathy Learned About AI Coding in 12 Months · WuKong AI](https://wukongai.io/article/vibe-coding-to-agentic-engineering)
- [A semantic history of vibe coding · CodeRabbit](https://www.coderabbit.ai/blog/a-semantic-history-how-the-term-vibe-coding-went-from-a-tweet-to-prod)
- [Vibe coding · arXiv:2506.23253v1](https://arxiv.org/html/2506.23253v1) —— 学术研究 vibe coding 的论文
- [Andrej Karpathy on X: It is hard to communicate how much programming has changed](https://x.com/karpathy/status/2026731645169185220) —— 同上，agentic engineering 帖

## D · 反方质疑 / SDD 是不是瀑布

- [Putting Spec Kit Through Its Paces: Radical Idea or Reinvented Waterfall? · Scott Logic](https://blog.scottlogic.com/2025/11/26/putting-spec-kit-through-its-paces-radical-idea-or-reinvented-waterfall.html) —— Colin Eberhardt 实测；4 小时 vs 23 分钟、689 行代码 + 2577 行 markdown 数据出处
- [Spec-Driven Development: The Waterfall Strikes Back · Hacker News 热帖](https://news.ycombinator.com/item?id=45935763) —— 1300 行 markdown 显示一个日期网友吐槽出处
- [Spec-Driven Development: The Waterfall Strikes Back · Marmelab](https://marmelab.com/blog/2025/11/12/spec-driven-development-waterfall-strikes-back.html)
- [Spec-Driven Development Is Waterfall in Markdown · Medium](https://medium.com/@iamalvisng/spec-driven-development-is-waterfall-in-markdown-e2921554a600)
- [Your Spec Driven Workflow Is Just Waterfall With Extra Steps · Augment Engineer](https://augmentengineer.com/your-spec-driven-workflow-is-just-waterfall-with-extra-steps/)

## E · 反反方 / 工业化指标

- [Spec Driven Development isn't Waterfall · Marc Brooker](https://brooker.co.za/blog/2026/04/09/waterfall-vs-spec.html) —— 06 章核心反驳来源
- [SDD: From vibe coding to spec-driven · Jimmy Song](https://jimmysong.io/zh/book/ai-handbook/sdd/overview/) —— ≥90% / ≥85% / ≤10% 工业化指标出处
- [Spec-Driven Development vs Waterfall · Augment Code](https://www.augmentcode.com/guides/spec-driven-development-vs-waterfall)

## F · 国内现象 / 角色塌缩

- [得物前端并入 AI 全栈部门 · gitcode csdn](https://gitcode.csdn.net/69b2699f0a2f6a37c596c871.html) —— 01 章 hook 出处
- ["前端已死"是危言耸听吗 · InfoQ](https://www.infoq.cn/article/syoqdk2chqym37kprebi) —— 国内前端讨论
- [大厂 CIO 独家分享：AI 如何重塑开发者未来十年 · InfoQ](https://www.infoq.cn/article/kjoqp8efou9wguktr26f)
- [美国码农正被 AI 大屠杀，Karpathy 惊呼 · 知乎](https://zhuanlan.zhihu.com/p/1988330207564822109)
- [SDD 大厂集体押注：阿里腾讯亚马逊都在用 · 博客园](https://www.cnblogs.com/ljbguanli/p/19352109)
- [规范驱动开发深入解析：从方法论到 AI 范式转移 · 腾讯云](https://cloud.tencent.com/developer/article/2631688)
- [规范驱动开发：用 AI 写生产级代码的完整指南 · 腾讯云](https://cloud.tencent.com/developer/article/2586438)

## G · 待手动核实

- BLS programmer -27.5% / developer -0.3% 数据：搜索结果里多处转述，但没找到 BLS 官方原文 URL；引用时标注 数据见美国劳动统计局 2023-2025 就业数据，并把转述源（gitcode.csdn 那篇）作为可点击链接给读者深入。如果后续找到 BLS 官方页面再换。
- 国内头部公司纯前端岗 -40% / 全栈 +200%：同样是中文报道转述，没有一手招聘数据 API 来源。引用时同样标注转述源。
