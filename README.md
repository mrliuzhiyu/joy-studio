# joy-studio · 刘志宇 Joy 的内容创作工作台

多平台文章工作台。一份源稿 → 各平台适配 → 发布。

当前覆盖平台：
- ✅ **微信公众号**（已上线，排版自动化）
- 🔜 知乎 / 小红书 / 即刻 / B 站专栏（按需开通）

---

## 文件夹一览

```
joy-studio/
├── SKILL.md          # Claude Code 自动调用的公众号排版 skill
├── design.md         # 「书摘公号风」排版规范（字体/字号/颜色/间距）
├── template.html     # 公众号 HTML 起手模板
├── README.md         # 本文件
├── ideas.md          # 选题池（已成熟到能写的候选）
├── inbox.md          # 灵感库（比选题更早一层的原料）
├── published.md      # 已发布作品 + 数据复盘
├── refs/             # 跨期共享的参考素材
│   ├── README.md
│   ├── cankao-style/         # 「书摘公号风」排版样本（design.md 抠样式的源）
│   ├── inspiration/          # 别人写得好的 AI 文章（学结构 / 切入 / 金句）
│   └── citations/            # 引用源原件（论文 PDF / 报告 / 截图，防链接失效）
├── issues/           # 每期一个文件夹
│   └── 001-v4pro-vs-claude/
│       ├── draft.md          # markdown 源稿（平台无关，真源）
│       ├── notes.md          # 选题动机 / 提纲 / 复盘
│       ├── assets/           # 截图、配图、生成器
│       ├── experiments/      # 原始实验数据、API 回包等
│       └── platforms/        # 各平台适配产物
│           ├── wechat.html   # 公众号版（SKILL 生成）
│           ├── zhihu.md      # 知乎版（按需）
│           └── xhs.md        # 小红书版（按需）
└── .tmp/             # 真·临时（用完即删，不保留）
```

---

## 每期工作流（5 步）

1. **选题** —— 从 `ideas.md` 挑一个；原料还不够格的先丢 `inbox.md` 攒着
2. **建文件夹** —— `issues/00X-{slug}/`，X 取当前最大编号 + 1，slug 用英文短句（如 `v4pro-vs-claude`）
3. **写笔记** —— `notes.md` 写：一句话钩子、5-7 章提纲、想表达的核心观点、可能的素材来源
4. **写源稿** —— `draft.md` 用 markdown 写完整文章。这是真源，未来所有平台版本都从它派生
5. **平台适配** —— 跟 Claude Code 说"按 SKILL 写公众号"，自动生成 `platforms/wechat.html`，浏览器打开 → 点"复制正文（无白边）" → 粘到公众号编辑器 → 替换图片 → 发布
6. **登记** —— 发布后到 `published.md` 加一行（标题 / 平台 / 链接），每周日补阅读数据

> 实验/原始数据走 `experiments/`，截图/配图走 `assets/`，纯临时文件走 `.tmp/`（用完自己删）。

---

## 已发布

详见 [published.md](published.md)。最新一期：

| # | 标题 | 平台 | 日期 |
|---|---|---|---|
| 006 | 同一个 AI，有人聊天，有人派活，有人合上电脑让它自己跑 | 微信公众号 | _待补_ |

---

## 设计原则

- **markdown 是真源**，HTML/各平台格式是衍生产物。绝不在 HTML 里改观点
- **`refs/` 跨期共享**，单期专属的范文/数据放各自 `experiments/`
- **临时文件不进版本**，`.tmp/` 不保留任何内容
- **命名一致**：`issues/00X-{英文短 slug}/`，方便排序、git friendly
