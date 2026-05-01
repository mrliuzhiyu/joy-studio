# joy-studio · 完整工作流

每期文章从 0 到发布的 13 步。每步都有明确输入、输出、checklist。

按编号顺序执行，每一步完成后再进下一步——少跳步会省后期返工。

---

## 0. 风格校准（开新选题前）

**做什么**：确认本期以哪一篇过去满意的文章作为风格基准。

**为什么必要**：AI 默认会回落到自己的套路（双引号包概念、最 X 排比、戏剧化形容、教师腔过渡）。每期开头明确"参照哪一篇"能省后续大量返工。

**输入**：上期发布完成 / Joy 的最新风格反馈
**输出**：明确的风格基准文章路径

**当前默认基准**：`issues/002-native-multimodal/draft.md`（Joy 明确说"是我比较满意的一篇"）

**Checklist**：
- [ ] 跟 Joy 确认本期是否仍以 002 为基准（或者有新认可的范文）
- [ ] 加载 memory 里的 `feedback_writing_voice.md` 和 `feedback_wechat_publication_v3.md`

---

## 1. 主题输入

**做什么**：Joy 给一句话主题。可以是模糊的（「写一下原生多模态」）或具体的（「DeepSeek V4-Pro 当日实测」）。

**输入**：Joy 的一句话
**输出**：主题方向（待探讨）

---

## 2. 选题探讨（几轮）

**做什么**：基于主题给出 3-5 个候选切入角度，每个有：钩子、核心观点、5-7 章拆法、独特性来源。Joy 选 + 修。

**为什么需要几轮**：第一轮通常太宽 / 套路化，需要 Joy 引导。

**输入**：主题方向
**输出**：候选选题清单（每个一段简介）

**Checklist**：
- [ ] 至少给 3 个角度（不止 1 个，避免过早收窄）
- [ ] 每个角度说清楚：现象 hook、核心观点、独特视角、5-7 章拆法
- [ ] 用 Joy 的"自检清单"（见 `ideas.md`）核一遍：当下正在发生？有独特视角？一句话能说清核心观点？标题让自己想点开？5-7 章能讲完？

---

## 3. 终选题确定 + 建 issue 文件夹 + 写 notes.md

**做什么**：选题定 → 决定编号（当前最大 + 1）和 slug（英文短语）→ 建文件夹结构 → 落档大纲。

**输入**：选定的选题方向
**输出**：
- `issues/00X-{slug}/` 文件夹（含 `assets/` `experiments/`）
- `issues/00X-{slug}/notes.md`（一句话钩子 + 核心观点 + 读者画像 + 提纲 + 风格约束 + 配图清单 + **本期待 verify 的事实标记** + 复盘模板）

**Checklist**：
- [ ] notes.md 里有「风格约束」一节（明确不用双引号、第一人称什么时候出现、技术术语保留英文等）
- [ ] notes.md 里有「待 verify 事实清单」（X status id、arXiv id、融资金额、人物头衔等 AI 不能 100% 确认的）
- [ ] notes.md 里有「配图清单」（每张图位置、内容、来源、是自制 / 截屏 / 工具抓）

---

## 4. 深度搜索 → research-brief.md

**做什么**：4-8 轮 WebSearch + WebFetch，按主题归档所有素材。

**输入**：notes.md 的提纲
**输出**：`issues/00X-{slug}/experiments/research-brief.md`，按主题分组列出所有素材（A 学术 / B 工具 / C 反方 / D 反反方 / E 国内现象 等），每条带一句话定位 + URL。

**Checklist**：
- [ ] 每个事实在 research-brief.md 里都能找到出处
- [ ] 反方观点不少于正方（避免一边倒）
- [ ] 至少有 1-2 条一手源（论文、官方博客、GitHub README）
- [ ] 标记好「待 Joy 本人 verify」的可疑事实

---

## 5. 写 draft.md（开篇示例先校风格）

**做什么**：先给 Joy 看开篇 1-2 段示例，校风格 → 修风格反馈到 notes.md → 才继续写完整 draft。

**为什么这一步关键**：003 实战教训——写完 9000 字才发现风格全错，重写 4 轮。先校开篇能省 80% 返工。

**输入**：notes.md + research-brief.md
**输出**：`issues/00X-{slug}/draft.md`（完整正文 v1）

**Checklist**：
- [ ] 开篇示例先给 Joy 看，不要等整篇写完
- [ ] 每个事实 inline 跟 markdown 链接（draft.md 是 markdown 真源，PC 端可点）
- [ ] 技术专名保留英文（Spec Kit、Kiro、Karpathy 等不翻译）
- [ ] 章节标题陈述句，可带"冒号 + 具体内容"
- [ ] 第一人称只在真实经验处用，不空喊立场
- [ ] 章节标号 01 / 02 / 03

---

## 6. v1 评审 + Joy 几轮确认修改

**做什么**：
1. v1 完成后跑一次 agent 评审（独立视角抓 AI 套路、事实漏洞、结构重复、风格偏离）
2. 评审报告落档 `issues/00X-{slug}/review-v1.md`
3. Joy 看评审 + 提反馈
4. 改 v2 → v3 → 直到 Joy 拍板

**输入**：draft.md v1
**输出**：draft.md v2/v3（Joy 认可的版本）+ review-v1.md（归档）

**Checklist**：
- [ ] 跑 agent 评审（用 general-purpose subagent，prompt 要含风格基准 + 反 AI 味清单 + 已知问题）
- [ ] 评审报告至少抓出：AI 套语清单、事实可疑点、重复段落、风格偏离段
- [ ] 待 Joy verify 的事实挨个验证（X status id、arXiv id、融资细节等）
- [ ] 每轮 commit 一次（v1 / v2 / v3 都有 git checkpoint）

---

## 7. 生成公众号 wechat.html

**做什么**：根据 `template.html` + `design.md` + memory 里的 `feedback_wechat_publication_v3.md`，生成 `issues/00X-{slug}/platforms/wechat.html`。

**输入**：draft.md（Joy 拍板版）
**输出**：`issues/00X-{slug}/platforms/wechat.html`

**Checklist**（公号特化硬约束，详见 `feedback_wechat_publication_v3.md`）：
- [ ] grep `<a href` 应得 0（正文不带链接）
- [ ] 参考资料每条「标题 + 缩进 URL」两段格式
- [ ] URL 全部带 https:// 前缀，4 个特殊站点带 www
- [ ] 「— 完 —」之后加 # tag 一行（4-5 个统一标签）
- [ ] 不放署名块（编辑/出品/内容来源那种）
- [ ] 一句一段（grep `<p ` 应得 600+ 对 8000 字文章）
- [ ] 一级 strong ≥ 15 处
- [ ] 二级 strong+underline ≥ 5 处（最多 8-10 处）
- [ ] 5 张图占位（每张明确：位置 + 内容 + 来源）
- [ ] 二手数据有 inline 转述声明
- [ ] 复制按钮 + 粘贴说明框（在 article 外）

---

## 8. 抓素材（图片 / 截图 / 自制图）

**做什么**：按 notes.md 里的配图清单准备 5 张图。

三类素材：
- **自制 HTML 图**（架构对比、流程图、决策树）：写在 `issues/00X-{slug}/assets/diagram-N-X.html`，浏览器打开 → 截图
- **截屏图**（X 推文、官网、HN 帖、论文截图）：手动截图（需要 Joy 验证 URL 真实存在）
- **工具抓图**（博客内嵌图、GitHub README）：`scripts/fetch_images.py issues/00X-{slug}/draft.md --cards --max-per-source 5`

**输出**：`issues/00X-{slug}/assets/` 下的图片素材

**Checklist**：
- [ ] 5 张图都有，没有占位框残留
- [ ] 5 张图视觉调性统一（同字体、同 accent 色、同留白比例）
- [ ] 每张图下方图注「图 N · 内容描述 · 数据来源 ...」
- [ ] 截屏图前 Joy 已 verify URL 存在（特别是 X 推文 ID）

---

## 9. 生成 HTML 封面（cover.html）

**做什么**：复制 `cover-template.html` 到 `issues/00X-{slug}/assets/cover.html`，改文字 → 浏览器打开 → 选 variant → 下载 @2x PNG。

**输入**：draft.md 的标题、副标、本期数据点 / 金句
**输出**：`issues/00X-{slug}/assets/cover.html` + 下载的 PNG（上传公号封面用）

**模板提供 3 种 variants**：
- A · 只标题版：最干净，新选题用
- B · 标题 + 两侧大数字：本期有突出数据点（如 92k star、4 小时 vs 23 分钟）
- C · 标题 + 两侧金句：本期论断鲜明

**Checklist**：
- [ ] 主标题塞进中央 1:1 裁切区（259-641 px）
- [ ] 两侧只放日期 / tag / 大数字 / 金句这种"消息列表才看得到"的补充信息
- [ ] 下载 @2x PNG（1800×766），公号自动压缩后字形仍锐利
- [ ] 文件名格式：`cover-{slug}-{variant}@2x-900x383.png`

---

## 10. iOS 微信预览

**做什么**：上传 wechat.html 内容到公号草稿 → 在 iOS / Mac 微信里预览（不要在 Windows / Android 看，Optima 字体回退后失真）。

**Checklist**：
- [ ] iOS 微信里看：字体对、加粗醒目、URL 没溢出、章节编号 01-08 显眼
- [ ] 滑动节奏轻快（一句一段是不是太碎、要不要合并几段）
- [ ] 5 张图位置合理、图注没错位
- [ ] # tag 居中
- [ ] 长 URL 在窄屏上正确换行

---

## 11. 发布

**做什么**：公号编辑器粘贴 wechat.html → 替换图片占位为实际素材 → 上传封面 → 设置标题 / 摘要 → 发布。

**输出**：公号发布的文章 URL

---

## 12. published.md 登记 + 一周后回填数据

**做什么**：
- 发布后立即在 `published.md` 加一行：编号 / 标题 / 平台 / 发布日 / 链接 / 阅读 / 在看 / 转发 / 复盘
- 一周后回填阅读 / 在看 / 转发数据

---

## 13. 复盘 + memory 沉淀

**做什么**：
- 在 `issues/00X-{slug}/notes.md` 的「复盘」章节填：阅读量、读者反馈关键词、最受欢迎段、最遗憾段、下次能更好的
- 把这一期发现的新风格规则 / 公号特化技巧 / 反 AI 味规则，写进 memory（feedback 类型）
- 下一期开新选题时这些规则自动加载

**Checklist**：
- [ ] 复盘填完
- [ ] 新规则写进 memory（如果有的话）
- [ ] inbox.md 加几条本期研究中冒出的延伸选题（避免下次重新研究）

---

## 关键资源

- `SKILL.md` — 公号排版 skill（Claude Code 自动加载）
- `design.md` — 排版规范（字体 / 字号 / 颜色 / 间距 / 一句一段 / 强调两级 / 图注 / 底部范式）
- `template.html` — 公号 HTML 起手模板
- `cover-template.html` — 封面图模板（900×383，3 个 variants）
- `scripts/fetch_images.py` — 配图抓取工具
- `ideas.md` — 选题池
- `inbox.md` — 灵感库
- `published.md` — 已发布作品 + 数据
- `memory/feedback_writing_voice.md` — 反 AI 味写作规则
- `memory/feedback_wechat_publication_v3.md` — 公号特化规则
- `memory/feedback_long_form_writing.md` — 不限制字数

---

## 工作流简明视图

```
0. 风格校准 ──→ 1. 主题 ──→ 2. 探讨 ──→ 3. 终选题 + notes.md
                                            │
                                            ▼
                                       4. research-brief.md
                                            │
                                            ▼
                  5. draft.md（开篇先校风格）
                                            │
                                            ▼
                  6. agent 评审 + Joy 几轮修改 ──→ draft.md 拍板
                                            │
                          ┌─────────────────┼─────────────────┐
                          ▼                 ▼                 ▼
                    7. wechat.html      8. 配图素材         9. cover.html
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
