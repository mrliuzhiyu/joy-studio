# 007 期 · wechat.html 公众号排版质检 v1

质检对象：`issues/007-harness-tech-debt/platforms/wechat.html`（538 行）
对照基准：`design.md` / `draft.md` / `SKILL.md`
质检日期：2026-05-16

---

## ① 致命问题

**没有致命问题。** 粘进公众号不会错乱，没有发现事实错误。

逐项核验结果：

- 公众号兼容性全部通过：`<script>` 仅 1 处（复制按钮 JS），`<style>` / `<link>` / `class` / `var(--)` / `display:flex` / `display:grid` / `position:absolute` 均为 0。
- 外层结构干净：仅单层 `<article id="wx-body">` 包全文；`<section>` 共 6 处（5 个章节号 + 1 个无关），无多余外层包裹。
- `id` 共 2 处（`copy-btn` + `wx-body`），都在兼容性允许范围内（公众号会剥 id，但剥掉不影响渲染，复制按钮本就只在预览阶段用）。
- 正文区 `<a href>` 标签 **0 个**，参考资料 23 条 URL 全部用「标题行 + 缩进 monospace URL 行」纯文本两行格式，符合「正文零链接」要求。
- `rgba()` 1 处，在 `<article>` 外的复制按钮 `box-shadow` 上，不进公众号正文，不算问题。

---

## ② 排版偏离 design.md 清单

逐项核对，**未发现偏离**。下面是核对明细：

| 项 | design.md 规定 | wechat.html 现状 | 结论 |
|---|---|---|---|
| 正文段落 margin | `0 8px 32px` | `margin:0 8px 32px` | ✅ |
| 正文行高 | `1.75em` | `line-height:1.75em` | ✅ |
| 外层 p 字间距 | `0.578px` | `letter-spacing:0.578px` | ✅ |
| 内层 span 字间距 | `0.5px` | `letter-spacing:0.5px` | ✅ |
| 正文字号 | 16px | `font-size:16px` | ✅ |
| 正文颜色 | `rgb(34,34,34)` | `rgb(34,34,34)`（188 处），无 `#333` | ✅ |
| 章节号 | 36px Futura-Medium | `font-size:36px` + `Futura-Medium,Futura,...` | ✅ |
| 章节号黑线 | `border-top:6px solid rgb(0,0,0)` + `display:inline-block` + `padding:3px` | 完全一致 | ✅ |
| 章节中文小标题 | 24px 粗体 `rgb(0,0,0)` | `font-size:24px` + `<strong>` + `rgb(0,0,0)` | ✅ |
| 内层 span 字体栈 | `Optima-Regular,PingFangTC-light,'PingFang SC','Hiragino Sans GB',sans-serif` | 完全一致 | ✅ |
| H1 | 24px / 700 | `font-size:24px;font-weight:700` | ✅ |
| 图注 | 12px `rgb(150,150,150)` 居中 | `font-size:12px;color:rgb(150,150,150);text-align:center` | ✅ |
| 底部灰注释 | 13.5px `rgb(150,150,150)` 不加粗无前缀 | `font-size:13.5px;color:rgb(150,150,150)`，无前缀 | ✅ |
| 参考资料标题 | 18px `<strong>` `rgb(0,0,0)` | 一致 | ✅ |
| 分组小标题 | 14px `<strong>` `letter-spacing:1px` | 一致（4 组） | ✅ |
| `— 完 —` | 12px `rgb(170,170,170)` `letter-spacing:2px` 居中 | 一致 | ✅ |

补充说明（非偏离，是 design.md 未硬性规定的合理选择）：

- 副标题行「写给正在做 AI agent 的人」用 13px `rgb(136,136,136)`，design.md 日期/副信息建议 13px，颜色用了 `#888`（介于 `#555` 次要色和 `#aaa` 极浅色之间），属合理范围。
- 参考资料条目 URL 行颜色用 `rgb(170,170,170)`，design.md 11.A 文字模板里条目是 `rgb(85,85,85)`，但 10.1 网页截图占位的 URL 是 `#666`、往期推荐卡片 URL 是 `rgb(140,140,140)` —— design.md 对「缩进 URL 行」本身没有统一定值，`rgb(170,170,170)` 让 URL 弱于标题行，视觉合理，不算偏离。
- 两张 `<pre>` 文本图用 `background:rgb(247,247,247)` + 12px `'SF Mono'` 等宽，`<pre>` 在公众号可用（项目 memory 确认）。pre 下 margin 用 `8px`、紧跟图注，符合 design.md「图本体下 margin 改 8px 让图注紧贴」的规则。

---

## ③ 正文搬运保真核对（draft.md → wechat.html）

**整体高度忠实。** 6 章正文逐句比对，关键数字、人名、机构名全部一致。仅发现以下措辞改动，均不涉及事实，但属于对 draft 原文的偏离，列出供决定是否回改：

### 偏离 1 · 「worker」被统一改写成「子模型」（2 处）

- draft 第 01 章原文（draft L9）：「把流程拆成固定的章节、固定的并行 **worker**」
  → wechat 行 33：「把流程拆成固定的章节、固定的并行**子模型**」
- draft 第 01 章原文（draft L13）：「并行写章节的 **worker** 互相不通气」
  → wechat 行 45：「并行写章节的**子模型**互相不通气」

说明：draft 原文在不同位置用词不统一 —— L7 / L17 用「子模型」，L9 / L13 用「worker」。wechat.html 把 4 处全部统一成「子模型」。这是一处有意的术语统一，指代对象不变，**不是事实错误**。但严格按「忠实搬运 draft」的标准，这是 2 处改字。
判断：统一成「子模型」其实读起来更顺（中文正文里混入「worker」略突兀），建议**保留 wechat 的改写**，但若 draft 是真源、要求逐字一致，则需回改这 2 处，或反过来把 draft 的 L7/L17 也统一。属于编辑决定，非错误。

### 偏离 2 · 第 06 章「为删除而建」改成「让 harness 好删」（1 处）

- draft 第 06 章原文（draft L159）：「所以**为删除而建**不是口号，是几个具体的习惯。」
  → wechat 行 414：「所以**让 harness 好删**，不是口号，是几个具体的习惯。」

说明：「为删除而建」是 draft 里这一段的概念性短语。wechat 改成了更口语的「让 harness 好删」。语义等价，不涉及事实。
判断：「为删除而建」在 draft 里是个有点像术语/口号的提法，改成「让 harness 好删」反而更贴 Joy 的口语 voice、避开口号腔（符合项目 memory「避免说教语气」）。建议**保留改写**。同样属编辑决定。

### 数字 / 人名 / 机构核对（全部一致 ✅）

- 评测数字：59.1% / 52.1% / 58.0% —— 三个都在，wechat 行 286 与 draft L117 完全一致。
- 行数：十三行 run.py / 一百九十多行 helpers.py / 两百二十行 daemon.py / 核心约六百行 / harness 约两百行 —— wechat 行 250、264 与 draft L107、L109 一致。
- 年份：七十年（AI 研究）、1997（深蓝）、2017（domain randomization 论文）、2019（Sutton《The Bitter Lesson》/ 解魔方项目）—— 全部一致。
- 人名：Lance Martin、Walden Yan、Hyung Won Chung、Garry Tan、Gregor Zunic、Tian Pan、Rich Sutton —— 拼写、身份描述与 draft 一致。
- 机构 / 产品名：LangChain、Open Deep Research、browser-use、Cognition、Deep Agents、Letta / MemGPT / Letta Code、Terminal-Bench 2.0、Claude Opus 4.5 / 4.6、n8n、Dify、Anthropic Computer Use、OpenAI ADR、GenTool —— 全部一致。
- 术语：orchestrator-worker、disjoint、domain randomization、sim-to-real gap、curriculum learning、ADR —— 全部保留，与 draft 一致。

### 两张 pre 文本图核对

- 图 1（行 98-108）：2023 RAG / 2024 可视化工作流 n8n·Dify / 2025 多 agent 并行编排，三段「洞 / 脚手架 / 报废」结构。内容与 draft 第 02 章 pre 图（draft L35-46）一致。draft 原图是「年份/洞/脚手架/废铁」四列横排，wechat 改成纵向三行式 —— 这是为手机窄屏做的合理重排，信息无增删。
- 图 2（行 176-186）：能力脚手架 / 治理层，各四行「解决 / 例子 / 规律 / 建法」。与 draft 第 03 章对照表（draft L70-85）一致。
- 对齐：两张图文字本身缩进整齐，没有错位。
- 窄屏溢出风险：12px monospace，图 1 最长行约 24 个等宽字符、图 2 最长行约 26 字符，在 350px 手机宽下 `<pre>` 配了 `overflow-x:auto` 兜底。`overflow-x` 在公众号不一定生效，但这两张图行宽不算长（不像贴满 60+ 字符的代码），实际大概率不溢出。**建议发布前在 iOS 微信里实测这两张图**，这是唯一需要真机确认的点。

正文段落断句（一句一段）抽查：全文正文 `<p>` 均为单句成段，未发现某段塞 2-3 句以上的情况，符合 design.md 第 5.5 节。

---

## ④ 强调密度判断

实际计数（已剔除章节号、章节中文标题、参考资料标题与分组小标题等结构性 `<strong>`）：

- **一级强调**（`<strong>` 不带下划线）：**23 处**
- **二级强调**（`<strong style="text-decoration:underline;">`）：**7 处**

对照 design.md 建议（一级 5-15、二级 ≤6）：

- **二级 7 处，超 1 处。** design.md 硬上限是 6，速查表也写「≤6」。7 处里有 2 处是第 06 章结尾连用的对仗句（行 396「你手里有的是一个选项」/ 行 398「你手里有的是一笔债」）—— 这对句子靠对仗本身已经很有力量，下划线是锦上添花。建议**从这 7 处里降 1 处为一级**，最适合降级的就是行 396「你手里有的是一个选项」（让行 398「一笔债」单独保留二级下划线，落点更重、收尾更狠）。降完二级 = 6 处，正好卡线。
- **一级 23 处，明显偏多。** design.md 建议 5-15，速查表写「≤15」，23 处超出约 8 处。逐条看下来，文章本身金句密度高、每章都有强转折，23 处不至于「吵」到读不下去 —— 因为是一句一段排版，加粗句多数独占一段，黑色不会挤成团。但确实有「哪句都重要 = 哪句都不重要」的稀释感。建议降级为不加粗的候选（这些是承上启下/陈述性的句子，去掉加粗不损力量）：
  - 行 119「而洞会被补上。」—— 是过渡句，靠独占一段已经够突出
  - 行 133「错的是默认它会一直有用。」—— 紧接行 131，整段语义已明确
  - 行 256「下一代模型出来，你不用重写 harness。」—— 后面行 258 紧跟解释，可让解释句承重
  - 行 278「薄不是省事，是把劲使对地方。」—— 与行 280 连读，留一句加粗即可
  - 行 363「所以宽不是起点，是过程和终点。」—— 小结句，独占一段已够

  降掉这 5 处，一级 = 18 处，仍略高于 15 但已进入可接受区间；若想严格卡 15，可再从中性陈述里降 3 处。**这是松紧度偏好问题，不是错误**，不影响发布，属于「能发，但建议优化」。

判断结论：强调用量偏多，二级超硬上限 1 处。**建议至少把二级降到 6 处**（这是 design.md 写死的上限）；一级 23 处是「噪音偏高」而非「致命」，可降可不降，降到 18 以内体验更好。

---

## ⑤ 底部模块核对 + 能否直接发

### 底部模块

顺序与样式核对（行 446-512）：

1. `— 完 —`（行 446）—— 12px `rgb(170,170,170)` `letter-spacing:2px` 居中 ✅
2. `# tag` 一行（行 448）—— `#harness #AI agent #技术债 #agentic engineering #模型迭代`，13px `rgb(150,150,150)` 居中 ✅
3. 灰色注释（行 452）—— 13.5px `rgb(150,150,150)`，「文中事实均附一手来源……数据截至 2026 年 5 月」，无前缀 ✅
4. 参考资料（行 456 起）—— 18px 标题 + 4 组（学术论文 / 官方与产品 / 工程师复盘与方法论 / 强化学习与思想背景），23 条，每条「标题行 13px 灰 + 缩进 URL 行 11px monospace」 ✅

顺序与 design.md 第 11 节及项目 memory（003 沉淀的底部模块习惯）一致。没有用署名版 / 往期推荐卡片 —— 个人号推断式分析用精简版合理。

### 参考资料格式细节

- 23 条 URL 分 4 组，每组 4-7 条，分组合理。
- URL 全部带 `https://`，**唯一一条 `http://` 是 Sutton《The Bitter Lesson》**（行 508 `http://www.incompleteideas.net/...`）—— 原站就是 http，**正确，不算错**。
- URL 行用 `word-break:break-all`，长 URL（如 tianpan.co 那条、garrytan/gbrain 那条）窄屏不会溢出。
- 标题行 13px `rgb(85,85,85)`、URL 行 11px monospace `rgb(170,170,170)`，两行结构清晰。

### 粘贴说明框

放在 `</article>` 之外（行 514-520），不参与复制，符合 SKILL.md 要求。复制按钮 JS（行 522-538）用 `selectNodeContents(wx-body)`，正确。

### 能不能直接发

**可以发，但建议先做 2 处微调 + 1 次真机确认：**

1.（建议）二级强调从 7 处降到 6 处 —— 把行 396「你手里有的是一个选项」的下划线去掉，保留行 398。这是 design.md 写死的上限，唯一一处「轻度超标」。
2.（可选）一级强调 23 处偏多，降 5 处到 18 以内，阅读更清爽。不降也能发。
3.（发布前必做）在 iOS / Mac 微信里实测两张 `<pre>` 文本图 —— 确认 monospace 没掉、窄屏不横向溢出。这是 Windows 上看不出来的，也是粘贴说明框第 ③ 条提醒的点。

除此之外，排版零偏离、正文零事实错误、兼容性全过，是一份完成度很高的稿子。
