# Joy Studio

> 刘志宇 Joy 的 AI 技术内容创作工作台。

Joy Studio 是一套真实使用中的多平台内容生产系统：从选题、调研、写作、事实核查，到配图、评审和公众号排版，所有过程都沉淀在同一个仓库里。

它不是一套空白模板，而是一个持续更新的内容档案。截至目前，仓库已经完成 10 期长文，主题集中在 AI 编程、Agent 工程、软件开发方式和技术基础设施。

## 这个仓库有什么

- 完整源稿：每篇文章都保留平台无关的 Markdown 真源
- 调研过程：官方资料、实验记录、事实核查和研究简报
- 写作过程：选题动机、提纲、评审反馈与修改记录
- 视觉资产：封面、架构图、网页截图和可复用的 HTML 图稿
- 公众号成品：可以直接预览和复制的微信排版版本
- 内容方法：长期积累的写作 voice、工作流与排版规范

## 最新一期

### 010 · 为什么 AI 时代的数据库都选 Postgres？

前几年，做 AI 应用的第一步往往是挑一个专门的向量数据库。现在默认答案正在反过来：先用已有的 Postgres 加 pgvector，直到真正撞上可量化的性能边界。

这篇文章讨论这个转向为什么发生、为什么偏偏是 Postgres，以及什么情况下才真的需要 Pinecone、Weaviate、Qdrant 这类专用向量数据库。

[阅读 Markdown 源稿](issues/010-just-use-postgres/draft.md) · [查看公众号排版](issues/010-just-use-postgres/platforms/wechat.html) · [查看研究笔记](issues/010-just-use-postgres/notes.md)

## 文章目录

| # | 标题 | 状态 |
|---:|---|---|
| 001 | [刚发布的 DeepSeek V4-Pro，已经长出了自己的审美](issues/001-v4pro-vs-claude/draft.md) | 已发布 |
| 002 | [原生多模态大模型到底是什么](issues/002-native-multimodal/draft.md) | 已发布 |
| 003 | [前端、后端、PM 正在塌缩成一个岗位](issues/003-sdd-collapse/draft.md) | 已发布 |
| 004 | [让 AI 真正能干活的不是模型，是 harness](issues/004-harness/draft.md) | 已发布 |
| 005 | [折腾了两年的 AI 记忆系统，最后是一个 markdown 文件](issues/005-agent-memory/draft.md) | 已发布 |
| 006 | [同一个 AI，有人聊天，有人派活，有人合上电脑让它自己跑](issues/006-three-stages/draft.md) | 已发布 |
| 007 | [你写的 Agent Harness，正在变成你的技术债](issues/007-harness-tech-debt/draft.md) | 已发布 |
| 008 | [AI 让你效率翻倍，团队交付却一动没动](issues/008-spdd/draft.md) | 待发布 |
| 009 | [OpenAI 把自己做的 AI 编程榜，停用了](issues/009-benchmark-trust/draft.md) | 待发布 |
| 010 | [为什么 AI 时代的数据库都选 Postgres？](issues/010-just-use-postgres/draft.md) | 待发布 |

正式推送链接与发布数据见 [published.md](published.md)。

## 工作流

一篇文章通常经过六步：

1. **选题**：在 `inbox.md` 收集灵感，在 `ideas.md` 沉淀可以正式写的选题
2. **研究**：查官方资料、论文、报告与真实案例，产出 research brief
3. **写作**：在 `draft.md` 完成平台无关的 Markdown 源稿
4. **评审**：检查事实、结构、观点、语言和公众号阅读体验
5. **适配**：从源稿派生公众号 HTML，按需扩展到知乎、小红书等平台
6. **复盘**：发布后登记链接和数据，把有效经验沉淀到 `memory/`

核心原则只有一个：**Markdown 是真源，平台版本是衍生产物。** 观点和事实只在源稿中修改，再统一生成各平台版本。

## 目录结构

```text
joy-studio/
├── issues/          # 每期文章：源稿、笔记、研究、图片与平台版本
├── research/        # 跨期共享的 AI 行业资料与主题地图
├── refs/            # 排版样本、引用原件与写作参考
├── memory/          # 从实际写作中沉淀的长期经验
├── scripts/         # 素材抓取等辅助脚本
├── ideas.md         # 已经成熟、可以继续写的选题
├── inbox.md         # 早期灵感与素材入口
├── published.md     # 发布链接、数据与复盘索引
├── design.md        # 微信公众号视觉和排版规范
├── WORKFLOW.md      # 完整内容生产流程
└── SKILL.md         # 公众号排版自动化说明
```

每一期文章内部保持相同结构：

```text
issues/00X-topic/
├── draft.md         # Markdown 真源
├── notes.md         # 选题、提纲与复盘
├── experiments/     # 调研、实验与原始资料
├── assets/          # 封面、配图与图稿
└── platforms/
    └── wechat.html  # 微信公众号版本
```

## 如何使用

如果你也在做技术内容，可以直接参考这里的目录和工作流，不必照搬全部工具。最小可用版本只需要：

1. 为每篇内容建立独立文件夹
2. 用 `notes.md` 管选题，用 `draft.md` 保存唯一源稿
3. 把调查材料和发布成品与源稿放在一起
4. 发布后记录数据和真实反馈

公众号排版规范见 [design.md](design.md)，完整流程见 [WORKFLOW.md](WORKFLOW.md)。

## 关于 Joy

我是刘志宇 Joy，一名独立开发者。我关注 AI 产品、Agent 工程、软件开发方式，以及一个人如何借助 AI 做出真正能用的产品。

如果你想交流 AI、独立开发或内容创作，可以添加我的微信；如果这个仓库或其中的文章对你有帮助，也可以请我喝杯咖啡。

<table>
  <tr>
    <td align="center">
      <img src="assets/readme/wechat-contact.jpg" width="280" alt="刘志宇 Joy 的个人微信二维码"><br>
      <strong>添加微信</strong>
    </td>
    <td align="center">
      <img src="assets/readme/wechat-coffee.jpg" width="280" alt="微信赞赏码，请 Joy 喝杯咖啡"><br>
      <strong>请我喝杯咖啡</strong>
    </td>
  </tr>
</table>

## 开放说明

这个仓库公开展示 Joy Studio 的真实内容生产过程，欢迎学习和参考。文章版权归刘志宇 Joy 所有；转载或商用前请联系作者，并保留原文署名与出处。
