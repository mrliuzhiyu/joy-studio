# joy-studio · 工作流

每期文章从 0 到发布的生产流水线。

---

## 这份文档是什么

**两个硬约束**——所有期都必须守的：

1. **尊重事实** —— 每个数据 / 引语 / 主张可追溯到一手源；二手转述要 inline 标注；不确定的数字 / id / 头衔挨个 verify
2. **用户能看懂** —— 为读者写，不为自己写。复杂概念用读者已有的心智模型解释，不直接抛术语；解释成本应低于读者承担成本

**其他都是每期重新判断**——章节数、章节标题格式、配图数量、加粗密度、段落节奏、字数、是否做封面、是否用文本架构图……不预设。如果某期题材让 3 章比 6 章更好、让 0 张图比 5 张图更好、让一段长散文比一句一段更顺——按题材决定，不照抄上期。

下面 13 步是**生产工序**（让搜集 / 归档 / QA / 复盘有纪律），不是**内容模板**（不规定形状）。

---

## 0. 风格校准（开新选题前）

确认本期想跟哪个过去的 voice 接近，避免 AI 默认回落到自己的套路。

不强制以哪期为基准。002 是 Joy 认可的一篇，可以参照，但每期重新评估——如果本期题材适合不同语调（比如 005 想试更对话、更轻），不必硬套上期形状。

加载相关 memory：`feedback_writing_voice.md`、`feedback_wechat_text_emphasis.md`、`feedback_wechat_publication_v3.md`、`feedback_no_lecture_voice.md`、`feedback_text_architecture_diagrams.md`、`feedback_minimize_english.md`、`feedback_long_form_writing.md`。

---

## 1. 主题输入

Joy 给一句话主题。模糊或具体都行。

---

## 2. 选题探讨（几轮）

基于主题给 3-5 个候选切入角度，每个说清楚：钩子、核心观点、独特视角。Joy 选 + 修。

**观点驱动，不是章节驱动**——先想"读者会带走什么 / 改变什么认知"，章节是这个观点自然展开的结果，不是预设容器。

用 ideas.md 自检清单核一遍：当下正在发生？有独特视角？一句话能说清核心观点？标题让自己想点开？

---

## 3. 终选题 + 建文件夹 + 轻量 notes（决策快照）

> **轻量版（Joy 2026-05-31 定）**：选题 / 提纲 / 标题在**对话里**敲定，不写长 md。md 产出收敛到「真要留痕的」两份半——
> 瘦 notes（决策快照）+ research-brief（事实底座，第 4 步）+ draft.md（内容真源，第 5 步）。拍板后**一次性**转 wechat.html，不提前进 HTML。
> 为什么 draft.md / research-brief 不能并进对话或直接写 HTML，见 memory `feedback_workflow_lightweight`。

选题定 → 编号（最大 + 1）→ slug → 建文件夹 → 落一份**瘦 notes.md**（决策快照，不再写长提纲；提纲在对话里过、直接长进 draft）：

- 一句话钩子 + 核心观点（让读者改变什么认知）
- 读者画像（在跟谁说话——已经知道什么、容易在哪偏）
- **待 verify 的事实清单**（关键数字 / id / 头衔等 AI 不能 100% 确认的）—— 这条最重要，别省
- **配图意图**（要不要图、哪种）
- 与已写划界（防撞车）

---

## 4. 深度搜索 → research-brief.md

4-8 轮 WebSearch + WebFetch，按主题归档所有素材。

- 反方观点不少于正方（避免一边倒）
- 至少 1-2 条一手源（论文、官方博客、GitHub README）
- 可疑事实标 「待 Joy verify」
- 遇到 YouTube 视频（演讲、访谈、播客）就抓转录补研究盲区：`python scripts/fetch_youtube.py --from-file issues/00X-{slug}/notes.md --output issues/00X-{slug}/experiments/youtube/`

---

## 5. 写 draft.md（开篇先校风格）

先写开篇 1-2 段给 Joy 看，校风格 → 修反馈到 notes.md → 才继续写完整 draft。

这一步的意义：写完 9000 字才发现风格全错的代价太大，开篇校准能省 80% 返工。

写正文时心里只装两件事：**尊重事实** + **用户能看懂**。

技术细节：

- 每个事实 inline 跟 markdown 链接（draft.md 是 markdown 真源，PC 端可点）
- 技术专名按必要保留英文（看读者是谁、看专名是否有公认中文译名，不一刀切）
- **文本架构图在这一步就画进正文**（`​```text` 块 + 图注），不留占位；只有截屏 / 复杂 HTML 图留到第 8 步

章节结构、标题格式、段落密度、字数、第一人称密度——按本期内容判断，不照搬模板。

---

## 6. v1 评审 + Joy 几轮迭代

1. v1 完成跑 agent 评审（用 general-purpose subagent，prompt 含本期 voice 参照 + 反 AI 味清单 + 已知问题）
2. 评审报告归档 `issues/00X-{slug}/review-v1.md`
3. Joy 看评审 + 提反馈
4. 改 v2 → v3 → Joy 拍板

待 verify 的事实挨个验证。每轮 git commit 一次（v1 / v2 / v3 都有 checkpoint）。

---

## 7. 生成 wechat.html

公号渲染有它的兼容性约束——这是**技术约束**（不是内容形状规则），每期遵守：

- **正文不带 `<a href`**（公号外部链接默认不可点）
- **参考资料用"标题 + 缩进 URL"格式**（标题用中文字体、URL 用 monospace + word-break:break-all）
- URL 全部带 https:// 前缀
- **一句一段**（手机阅读节奏的物理需要，不是为了凑段落数）
- 重要句子用 `<strong>` 加粗，金句用 `<strong style="text-decoration:underline;">`（强调密度服从内容，不为凑数）
- 「— 完 —」之后加 # tag 一行
- 不放署名块

图占位数量、参考资料条数、章节数都按本期内容决定，不预设。

详细排版规格见 [design.md](design.md) + memory `feedback_wechat_publication_v3.md`。

---

## 8. 抓素材

按 notes.md 的配图意图准备图——可能 0 张全用文本架构图，可能 8 张全是截屏，也可能混合。

**文本架构图占大多数，在第 5 步写 draft.md 时就直接画进正文（`​```text` 块 + 图注），不留占位。** 这一步只剩截屏图和复杂 HTML 图要单独准备。

三类来源：

- **文本架构图**（结构 / 数据流 / 对比 / 时序，占大多数）：写 draft 时就用 `​```text` / `<pre><code>` 等宽块直接画进正文，不依赖渲染、粘进公号无失真、不留占位。窄排照顾手机（每行 ≤ 30 等宽字符），不依赖中英混排的右边对齐。详见 memory `feedback_text_architecture_diagrams.md`
- **自制 HTML 图**（视觉效果是核心信息载体的，如色块对比、地图）：写在 `assets/diagram-N-X.html`，浏览器打开 → 截图
- **截屏图**（X 推文、官网、HN、论文）：手动截，需要 Joy verify URL 存在

每张图下方图注「图 N · 内容描述 · 数据来源」。视觉调性尽量统一。

---

## 9. 封面（如果需要）

不是每期都需要单独的 PNG 封面——看本期发布场景。头条文章通常需要，普通推送可能不需要。

如果做：复制 `cover-template.html` 到 `issues/00X-{slug}/assets/cover.html` → 改文字 → 浏览器打开 → 选合适 variant → 下载 @2x PNG。

---

## 10. iOS 微信预览

上传 wechat.html 到公号草稿 → 在 iOS / Mac 微信里预览（Windows / Android 上 Optima 字体回退后失真，看不出真实效果）。

看：字体对、加粗醒目、URL 没溢出、滑动节奏轻快、长 URL 在窄屏上正确换行。

---

## 11. 发布

公号编辑器粘贴 wechat.html → 替换图片占位 → 上传封面（如有）→ 设置标题 / 摘要 → 发布。

---

## 12. published.md 登记 + 一周后回填数据

发布后立即在 `published.md` 加一行：编号 / 标题 / 平台 / 发布日 / 链接 / 阅读 / 在看 / 转发 / 复盘。

一周后回填阅读 / 在看 / 转发数据。

---

## 13. 复盘 + memory 沉淀

在 `notes.md` 的「复盘」章节填：阅读量、读者反馈关键词、最受欢迎段、最遗憾段、下次能更好的。

把这一期发现的新风格规则 / 公号特化技巧 / 反 AI 味观察，写进 memory（feedback 类型）。下一期开新选题时这些规则自动加载。

inbox.md 加几条本期研究中冒出的延伸选题。

---

## 关键资源

- `SKILL.md` — 公号排版 skill（Claude Code 自动加载）
- `design.md` — 排版细节参考（字体 / 字号 / 颜色 / 间距）
- `template.html` — 公号 HTML 起手模板
- `cover-template.html` — 封面图模板（按需用）
- `scripts/fetch_images.py` — 配图抓取工具
- `ideas.md` — 选题池
- `inbox.md` — 灵感库
- `published.md` — 已发布作品 + 数据
- `memory/` — 风格规则 / 公号特化 / 反 AI 味的累积沉淀

---

## 工作流简明视图

```text
0. 风格校准 ──→ 1. 主题 ──→ 2. 探讨 ──→ 3. 终选题 + notes.md
                                            │
                                            ▼
                                       4. research-brief.md
                                            │
                                            ▼
                  5. draft.md（开篇先校风格）
                                            │
                                            ▼
                  6. agent 评审 + Joy 几轮迭代 ──→ draft.md 拍板
                                            │
                          ┌─────────────────┼─────────────────┐
                          ▼                 ▼                 ▼
                    7. wechat.html      8. 配图素材       9. 封面（如需）
                          │                 │                 │
                          └─────────────────┼─────────────────┘
                                            ▼
                                  10. iOS 微信预览
                                            │
                                            ▼
                                       11. 发布
                                            │
                          ┌─────────────────┴─────────────────┐
                          ▼                                   ▼
              12. published.md 登记                    13. 复盘 + memory 沉淀
                          │                                   │
                          └─────────────── 下一期 ─────────────┘
```
