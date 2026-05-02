# 书摘公号风 · 排版规范

基于对「参考答案阅览室」公众号实际导出 HTML 的精确提取（2026.04 版），所有数值都是从真实源码里抠出来的，不是估算。

---

## 1. 字体栈（双层结构）

这是灵魂。公众号编辑器允许外层 p 和内层 span 分别指定字体，参考号就是用这个技巧：

**外层 p / table / 其他块级**（兜底栈，保证任何设备都能渲染）：
```
system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue',
'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI',
'Microsoft YaHei', Arial, sans-serif
```

**内层 span**（精致字体栈，iOS/macOS 上才有效果，其他平台优雅降级）：
```
Optima-Regular, PingFangTC-light,
'PingFang SC', 'Hiragino Sans GB', sans-serif
```

**章节编号用**：
```
Futura-Medium, Futura, 'Helvetica Neue', Arial, sans-serif
```

**为什么这么设计**：`Optima-Regular` 是苹果人文主义无衬线字体（Hermann Zapf 设计），`PingFangTC-light` 是苹果繁体细体——搭配后字重偏细、笔画有微末端展宽，这是苹果系美学调性。外层兜底栈保证 Android / Windows 上也能降级到干净的 PingFang SC / YaHei。

**不要用的字体**：
- 衬线体（Times / 宋体）—— 偏古板
- 等宽字体（Consolas / SF Mono）—— 除非是代码块
- Impact / 装饰性字体

---

## 2. 字号层级

| 元素 | 字号 | 粗细 |
|---|---|---|
| **文章主标题 H1** | 24px | 700 |
| **章节编号**（01/02/03） | 36px | 700（用 Futura-Medium） |
| **章节中文小标题** | 24px | 700 |
| **正文段落** | **16px** | normal（400） |
| **表格内文字** | 15px | normal / 700（表头） |
| **要点速览 bullet** | 15px | normal |
| **图片下 Claude/V4-Pro 小标签** | 14px | 700 |
| **日期 / 副信息** | 13px | normal |
| **页脚 — 完 —** | 12px | normal |

**绝对不要**：
- 正文用 15px 或 17px——真实参考号 98% 都是 16px
- 章节编号小于 32px 或大于 40px
- 中文小标题大于 26px

---

## 3. 行高 & 字间距

**行高（line-height）**：统一 `1.75em`（参考号实测 119 处都是这个值）

**字间距（letter-spacing）**：双层
- 外层 p：`0.578px`（精确小数，参考号编辑器导出的默认值）
- 内层 span：`0.5px`（覆盖外层）

**为什么有这种奇怪的 0.578px**：公众号编辑器"字间距"按钮默认生成的数值。不是随便写的数。**直接抄**。

---

## 4. 颜色

| 语义 | 值 | 用途 |
|---|---|---|
| **正文** | `rgb(34, 34, 34)` = `#222` | 99% 段落文字 |
| **次要 / 辅助信息** | `rgb(85, 85, 85)` = `#555` | 图注、表格次要列、要点速览 |
| **标题 / 强调** | `rgb(0, 0, 0)` = `#000` | 章节标题、`<strong>`、H1 |
| **极浅（日期、页脚）** | `rgb(170, 170, 170)` = `#aaa` | 日期、— 完 — 字样 |

**绝对不要**：
- 用 `#333`（参考号是 `#222`，略深，这个差异肉眼可见）
- 用任何彩色（除了 accent——但参考号整篇几乎零彩色）
- 用 `rgba(...)` 半透明——公众号某些场景会渲染失常

---

## 5. 段落间距

**核心规则**：每段 `margin: 0 8px 32px 8px`

- **上下**：`margin-top: 0`, `margin-bottom: 32px`（段间距统一 32px，大而规整）
- **左右**：`margin-left: 8px`, `margin-right: 8px`（左右缩进 8px，避免贴到公众号内容区的边缘）

**章节间特殊间距**：章节 section 前的 `margin-top: 40px`（比段间距略大）

**不要**：
- 用 `padding` 代替 `margin`（公众号某些编辑器会重置 padding）
- 首段缩进两字符——公众号不用印刷体首行缩进

---

## 5.5 断句规则（手机阅读优先）

**核心规则**：**一个完整句子 = 一个 `<p>` 段落**。不要把 2-3 个独立的句子塞进同一段。

**为什么**：公众号 90% 的阅读发生在手机上。手机屏窄、字号小、行距紧——一段挤 3-4 句话视觉上是一坨黑色文字墙，读者会跳过。每句单独成段后：
- 段间留白让眼睛有呼吸点
- 重要句子可以靠位置（独占一段）自然被强调，不依赖加粗
- 一句一段更接近"口语节奏"，亲和感更强（这是参考号、晚点 LatePost 等头部书摘号共同的排版基因）

**断句操作规则**：
- 中文句号「。」 / 问号「？」 / 感叹号「！」之后，原则上换段
- 例外：紧密相关的两句（"X。具体什么意思？"）可以保留在同一段
- 长句内的逗号、分号不算断点
- 如果一段超过 3 行（手机宽度下大约 60-70 个汉字），强烈建议拆段

**反面例子**（一段塞 3 句）：
> 错误是结构性的，不是模型参数堆得不够大就能解决的。LLM 永远卡在那段描述本身的精度上。描述里没写的细节，无论参数多大它都补不回来。

**正面例子**（一句一段，三段）：
> 错误是结构性的，不是模型参数堆得不够大就能解决的。
>
> LLM 永远卡在那段描述本身的精度上。
>
> 描述里没写的细节，无论参数多大它都补不回来。

（实际写作中第二、三句关系紧密时也可以保留为一段，靠作者节奏感判断——核心是不要让任何一段超过 3 行）

---

---

## 6. 章节分隔符（灵魂设计）

这是参考号视觉标志最强的元素。HTML 结构：

```html
<section style="
  padding: 3px;
  display: inline-block;
  border-top: 6px solid rgb(0, 0, 0);
  margin: 40px 8px 8px;
">
  <p style="margin:0;">
    <strong style="color: rgb(0, 0, 0);">
      <span style="
        font-size: 36px;
        font-family: Futura-Medium, Futura, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.1;
      ">
        01
      </span>
    </strong>
  </p>
</section>
<!-- 紧接着中文小标题 -->
<p style="margin:0 8px 32px; line-height:1.5; letter-spacing:0.578px;">
  <strong>
    <span style="
      font-family: Optima-Regular, PingFangTC-light, sans-serif;
      font-size: 24px;
      letter-spacing: 0.5px;
      color: rgb(0, 0, 0);
    ">
      章节中文标题
    </span>
  </strong>
</p>
```

**关键**：
- `display: inline-block` —— 让 6px 粗黑线**只覆盖数字那一小截**，不是全宽
- `padding: 3px` —— 给数字与黑线之间一点呼吸
- `border-top: 6px solid rgb(0, 0, 0)` —— 是 **6px 粗**，不是 1-2px 细线（这个是"书的扉页"气质的来源）
- 数字用 **Futura-Medium**（参考号精心挑的字体，数字字形有几何美）
- 中文小标题紧跟在下一行，24px 粗体

---

## 7. 正文段落标准结构

每一段都是这个模板（复制即用）：

```html
<p style="margin:0 8px 32px; line-height:1.75em; letter-spacing:0.578px;">
  <span style="
    font-family: Optima-Regular, PingFangTC-light, 'PingFang SC', sans-serif;
    font-size: 16px;
    letter-spacing: 0.5px;
    color: rgb(34, 34, 34);
  ">
    正文内容放这里。
  </span>
</p>
```

内层 span 是**精致字体**载体。写新段落时，外层 p 结构保持不变，只改 span 里的文字。

### 强调分两级（核心）

公众号文章的强调要克制——不是"重要的就加粗"，而是"分梯度"。两级制：

**第一级 · 粗体 `<strong>`**：用于关键句、转折句、定义句。一篇文章用 5-15 处。

```html
<span style="...">最早的解法是在 LLM 前面接一个图像识别模型，<strong>把图片描述成一段文字，再把文字交给 LLM。</strong></span>
```

**第二级 · 粗体 + 下划线**：用于**金句**（全文最想让读者带走的那 3-6 句）。一篇文章只用 3-6 处。

```html
<span style="...">压缩成三十字的描述，<strong style="text-decoration:underline;">绝大部分信息都在这一步被丢掉。</strong>LLM 接到的不是图像。</span>
```

**整段都是金句**（不是句中加粗）：

```html
<p style="margin:0 8px 32px;line-height:1.75em;letter-spacing:0.578px;">
  <strong>
    <span style="font-family:Optima-Regular,PingFangTC-light,'PingFang SC',sans-serif;font-size:16px;letter-spacing:0.5px;color:rgb(34,34,34);">
      所以从 ChatGPT 火的那天起，整个行业就在解同一个问题。
    </span>
  </strong>
</p>
```

**两级制的判断标准**：

- 写完一段问自己：「这句话如果读者只记住一句，是不是它？」是 → 二级（粗体+下划线）；不是但很重要 → 一级（粗体）；只是事实陈述 → 不强调。
- 全文二级强调超过 8 处就是滥用——读者会麻木，金句失去力量。

**反面**：
- 整段加粗 / 半段加粗（除非真的整段都是金句）
- 用颜色（红、橙）做强调——参考号几乎零彩色，色彩破坏书摘调性
- 斜体 `<em>` —— 中文斜体在公众号渲染丑且没意义

---

## 8. 要点速览 / bullet 列表

参考号里没有 `<ul>`，用 **p 段落 + "·" 前缀 + 左竖灰线包块** 的方式：

```html
<p style="margin:0 8px 8px;">
  <strong>
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;font-size:16px;color:#000;">
      要点速览：
    </span>
  </strong>
</p>

<section style="border-left:2px solid rgb(220,220,220); padding:4px 0 4px 14px; margin:0 8px 32px;">
  <p style="margin:0 0 8px; line-height:1.75em; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;font-size:15px;letter-spacing:0.5px;color:rgb(85,85,85);">
      · 第一条要点……
    </span>
  </p>
  <!-- 更多 p ... -->
</section>
```

**不用 `<ul><li>`**，因为公众号会重置 li 的 margin。

---

## 9. 表格

保留极简、无填充色：

```html
<table style="width:calc(100% - 16px); border-collapse:collapse; margin:0 8px 32px;
              font-family:Optima-Regular,PingFangTC-light,sans-serif;
              font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
  <tr>
    <th style="text-align:left; padding:10px 8px;
               border-bottom:2px solid rgb(0,0,0); font-weight:700;">标题</th>
  </tr>
  <tr>
    <td style="padding:10px 8px; border-bottom:1px solid rgb(236,236,236);">数据</td>
  </tr>
  <tr>
    <td style="padding:12px 8px; font-weight:700;">合计</td>
  </tr>
</table>
```

**要点**：
- 表头 `border-bottom: 2px solid black` 做双线感
- 行分隔 `border-bottom: 1px solid #ececec`
- 合计行用 `font-weight: 700` 不加背景色

---

## 10. 图片

如果有截图要嵌入（不是占位）：

```html
<figure style="margin:0 8px 32px; text-align:center;">
  <img src="..." width="600" height="400" alt="..."
       style="max-width:100%; height:auto; display:block; margin:0 auto;" />
</figure>
```

**必须**：
- 显式 `width="X" height="Y"` 属性（不是 style）——iOS 微信否则不渲染
- `max-width: 100%` 保持响应式

**占位灰色块**（还没上传真实截图时）：
```html
<div style="background:#f5f5f5; padding:72px 20px; text-align:center;
            color:#aaa; font-size:13px; margin:0 8px 8px; letter-spacing:0.5px;">
  [ 此处插入截图 · 文件名 ]
</div>
```

**图注 · 数据来源（紧跟图片下方一行小灰字）**：

```html
<p style="margin:0 8px 32px; line-height:1.75em; letter-spacing:0.578px; text-align:center;">
  <span style="font-family:Optima-Regular,PingFangTC-light,'PingFang SC',sans-serif;
               font-size:12px; letter-spacing:0.5px; color:rgb(150,150,150);">
    数据来源 · Chameleon / Gemini / GPT-4o 论文与官方博客
  </span>
</p>
```

**关键数值**：
- 图片本体的下 margin 改 `8px`（不是 32px），让图注紧贴
- 图注 `text-align:center`、`font-size:12px`、`color:rgb(150,150,150)`
- 图注本身保持 `margin-bottom:32px`，跟正文分隔
- 起手用 `数据来源 · ` 前缀（也可换成 `图源 · ` / `示意图 · ` 等），让读者一眼知道是图注而不是正文

### 10.1 网页截图占位（含可点击源 URL）

**何时用**：正文引用了某个具体网页（官方博客、GitHub 仓库、推文、官方产品页），希望在文中嵌一张那个网页的截图作为视觉证据。

**为什么这个格式好**：
- 作者在浏览器预览 wechat.html 时，**直接点击占位里的可点 URL** 跳到原网页 → 浏览器截屏 → 回公号编辑器替换占位。比"另开浏览器手动输入 URL"工作流快 10 倍。
- 占位灰框里同时包含图编号 + 描述 + URL + 操作提示，是自带说明的"待办标签"。
- 章节子编号（图 4.1 / 图 4.2）让读者一眼知道是哪一章的第几张图，提升阅读结构感。

**HTML 模板**：

```html
<div style="background:#f5f5f5;padding:40px 20px;text-align:center;margin:0 8px 8px;letter-spacing:0.5px;">
<p style="margin:0 0 10px;color:#888;font-size:13px;font-weight:600;">[ 图 X.Y · 描述 ]</p>
<a href="https://full-url" target="_blank" style="color:#666;font-size:11px;text-decoration:underline;font-family:'SF Mono','Menlo',monospace;word-break:break-all;display:inline-block;max-width:90%;">https://full-url</a>
<p style="margin:8px 0 0;color:#bbb;font-size:11px;">↑ 点开网页 → 截屏 → 替换本占位</p>
</div>
<p style="margin:0 8px 32px;line-height:1.75em;letter-spacing:0.578px;text-align:center;">
  <span style="font-family:Optima-Regular,PingFangTC-light,'PingFang SC','Hiragino Sans GB',sans-serif;font-size:12px;letter-spacing:0.5px;color:rgb(150,150,150);">
    图 X.Y · 数据来源 · 简短描述
  </span>
</p>
```

**关键数值**：
- 灰框 `padding: 40px 20px`（比纯占位框小，因为里面要放 3 行文字）
- 描述行：13px、`color:#888`、`font-weight:600`（最重要的视觉元素）
- URL 行：`'SF Mono'` 等宽字体、11px、`color:#666`、`text-decoration:underline`、`word-break:break-all`（防长 URL 溢出窄屏）
- 操作提示行："↑ 点开网页 → 截屏 → 替换本占位"，11px、`color:#bbb`、用 ↑ 和 → 箭头（不要破折号）
- 图注还在灰框**外面**——这样作者替换图后图注仍在原位

**章节子编号约定**：
- 图编号格式 `图 X.Y`（X 是章节号，Y 是该章第几张图）
- 例：图 1.1 / 图 1.2 / 图 4.1 / 图 4.2
- 概念图（自制 HTML 图）用单数 `图 1` / `图 2` / `图 3` 区分

**链接策略**：
- 网页截图占位里的 a 链接**只在 wechat.html 预览阶段生效**（作者点 → 跳浏览器 → 截图）。最终发布时占位会整体被截图替换，a 链接不进公号正文。
- URL 必须含 `https://` 前缀，跟参考资料区一致。

**典型用法**（一篇文章的图配置）：
- 5 张概念图（自制 HTML 截图）：每章 1-2 张关键概念用
- 10-15 张网页截图（用此格式）：每章 1-3 张关键引用源用
- 总计 15-20 张图 / 8000+ 字

---

## 11. 文章底部

底部没有"必须长什么样"的硬约束。常见两种结构，按文章性质和气口自由组合。

**A · 精简版**：`— 完 —` + 一句灰色注释 + 参考资料分组。适合个人号、推断式分析、需要轻盈结尾的文章（002 文章用了这个版本）。

**B · 署名版**：精简版基础上插入"编辑/出品/内容来源"三行署名块。适合机构号、合作稿、需要明确来源归属的文章。

也可以混合（只保留"编辑 | XXX"一行，省掉出品/内容来源），或加二维码、相关阅读、往期推荐等模块。下面给两个版本的标准 HTML，按需取用。

### 11.A · 精简版

**完整 HTML 模板**：

```html
<!-- — 完 — 居中小灰字 -->
<p style="margin:48px 8px 24px; text-align:center; line-height:1.5;">
  <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
               font-size:12px; color:rgb(170,170,170); letter-spacing:2px;">
    — 完 —
  </span>
</p>

<!-- 贯穿式灰色细线 -->
<hr style="border:0; border-top:1px solid rgb(220,220,220);
           margin:48px 8px 24px;" />

<!-- 灰色一行注释（无"作者提示："前缀，直接陈述事实）-->
<p style="margin:0 8px 0; line-height:1.75em; letter-spacing:0.578px;">
  <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
               font-size:13.5px; letter-spacing:0.5px; color:rgb(150,150,150);">
    文中所有事实都附了可点击来源链接（论文、官方博客、GitHub 仓库），文末有完整参考资料分组列表。数据时间戳：2026-04-26。
  </span>
</p>

<!-- 第二根贯穿灰线，分隔注释与参考资料 -->
<hr style="border:0; border-top:1px solid rgb(220,220,220);
           margin:48px 8px 24px;" />

<!-- 参考资料 标题 -->
<p style="margin:0 8px 24px; line-height:1.5; letter-spacing:0.578px;">
  <strong>
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
                 font-size:18px; letter-spacing:0.5px; color:rgb(0,0,0);">
      参考资料
    </span>
  </strong>
</p>

<!-- 分组小标题（建议 4 组：官方资料 / 学术论文 / GitHub / 第三方分析） -->
<p style="margin:24px 8px 8px; line-height:1.5; letter-spacing:0.578px;">
  <strong>
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
                 font-size:14px; letter-spacing:1px; color:rgb(0,0,0);">
      官方资料
    </span>
  </strong>
</p>
<p style="margin:0 8px 4px; line-height:1.7; letter-spacing:0.578px;">
  <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
               font-size:13px; letter-spacing:0.5px; color:rgb(85,85,85);">
    · <a href="..." style="color:rgb(85,85,85); border-bottom:1px solid rgb(200,200,200); text-decoration:none;">条目标题 · 来源</a>
  </span>
</p>
<!-- 多个 p 重复，每条一行，· 开头 -->
```

**关键数值**：
- hr 边框 `1px solid rgb(220,220,220)`——比章节线的 6px 细得多
- 灰色注释 `font-size:13.5px`、`color:rgb(150,150,150)`、不加粗、不带前缀
- 参考资料标题 `font-size:18px` `<strong>` `rgb(0,0,0)`
- 分组小标题 `font-size:14px` `<strong>`、`letter-spacing:1px`（拉宽一点更像小标签）
- 条目 `font-size:13px`、`color:rgb(85,85,85)`、`line-height:1.7`、用 `· ` 前缀

**分组建议**（按引用类型，不超过 4 组）：

- **官方资料**：厂商博客、官网文档、官方公告
- **学术论文**：arXiv / OpenReview / 期刊 PDF
- **GitHub**：开源仓库
- **第三方分析**：行业分析师、媒体报道

---

### 11.B · 署名版

在精简版基础上，于 `— 完 —` 之后、灰色注释之前插入"编辑/出品/内容来源"三行署名块：

```html
<hr style="border:0; border-top:1px solid rgb(220,220,220); margin:48px 8px 24px;" />

<section style="border-left:2px solid rgb(200,200,200); padding:4px 0 4px 18px; margin:0 8px 18px;">
  <p style="margin:0 0 6px; line-height:1.9; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif; font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
      <strong>编辑</strong>
      <span style="color:rgb(180,180,180); margin:0 10px;">|</span>
      作者名
    </span>
  </p>
  <p style="margin:0 0 6px; line-height:1.9; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif; font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
      <strong>出品</strong>
      <span style="color:rgb(180,180,180); margin:0 10px;">|</span>
      账号或团队名
    </span>
  </p>
  <p style="margin:0; line-height:1.9; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif; font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
      <strong>内容来源</strong>
      <span style="color:rgb(180,180,180); margin:0 10px;">|</span>
      原创
    </span>
  </p>
</section>

<!-- 之后再接灰色注释段、参考资料分组 -->
```

**关键数值**：
- 左竖线 `2px solid rgb(200,200,200)`
- 分隔符 `|` 灰色 `rgb(180,180,180)`，前后 `margin: 0 10px`
- 标签 `<strong>`、值常规字重
- 三行 `line-height: 1.9`（比正文 1.75 略松）

### 11.C · 自由组合

底部不是定式。还可以：

- 只留"编辑 | XXX"一行，省掉出品/内容来源
- 加二维码、相关阅读、往期推荐等模块（公众号编辑器内插入）
- 把灰色注释段挪到署名块上方，或不要灰色注释
- 不要参考资料分组（如果文中链接已经够用）

按文章性质和气口判断。**唯一的硬约束**：保留 `— 完 —` 居中小灰字作为正文结束信号。其它都灵活。

---

## 12. 复制按钮（关键！）

**为什么要**：用户 Ctrl+A 会选到 body 外层，把 `body { background: #f2f2f2 }` 或 article 的 `padding:40px 24px` 带进公众号，导致左右空白错位。

**解决方案**：提供一个按钮，调用 JS 精确选中 `article` 的内容（`selectNodeContents` 选择节点内部，不包括节点本身）：

```html
<!-- 按钮放在 body 里但 article 外 -->
<button id="copy-btn" onclick="copyWxArticle()"
        style="position:fixed; top:20px; right:20px;
               padding:10px 20px; background:#111; color:white;
               border:0; border-radius:999px; cursor:pointer;
               font-family:system-ui,sans-serif; font-size:13px;
               font-weight:600; box-shadow:0 2px 12px rgba(0,0,0,0.15);
               z-index:999; transition:all .2s;">
  复制正文（无白边）
</button>

<!-- ... article 主体 ... -->

<script>
function copyWxArticle() {
  var target = document.getElementById('wx-body');
  if (!target) return;
  var range = document.createRange();
  range.selectNodeContents(target);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
  var ok = false;
  try { ok = document.execCommand('copy'); } catch (e) {}
  sel.removeAllRanges();
  var btn = document.getElementById('copy-btn');
  btn.textContent = ok ? '已复制 ✓' : '复制失败';
  btn.style.background = ok ? '#10b981' : '#dc2626';
  setTimeout(function(){
    btn.textContent = '复制正文（无白边）';
    btn.style.background = '#111';
  }, 2200);
}
</script>
```

**`selectNodeContents(target)` 行为**：选中 `target` 的**所有子节点**（段落、章节等），但**不包括 `target` 本身**——所以不会把 article 的 padding 和 background 带进剪贴板。这是本 skill 的核心技术点。

---

## 12. 微信 HTML 兼容性清单（基于 doocs/md 调研）

### 必被剥掉
- `<style>` / `<script>` / `<link>` / `<iframe>` / `<form>` / `<input>` / `<object>` / `<embed>`
- 所有元素的 `id` / `on*` 事件处理器
- CSS 变量 `var(--x)` / `:root` / `@media` / `@keyframes`
- `class` 的对应样式（class 属性留着但不起作用）

### inline style 白名单（保留）
- `font-size` / `color` / `font-weight` / `font-style` / `line-height` / `text-align`
- `background` / `background-color`
- `padding` / `margin` / `border` / `border-radius`
- `max-width` / `width` / `height`
- `letter-spacing`
- `font-family`

### 实际失效 / 不稳
- `position: absolute / fixed / relative`（正文里）
- `display: flex` / `display: grid`（手机端常塌成 block）
- `float`（在折叠内容里逃逸）
- `transform`（当前部分生效，不可依赖）

### 最稳外层结构
- **只用一层 `<section>` 或 `<article>` 包全文**（不要 `<html>` / `<body>` / `<head>` 在粘贴内容里）
- 内部嵌套 2-3 层内可信，4 层以上偶尔被合并

---

## 13. 生成 checklist

每次按这份 skill 写完一篇文章，上线前过一遍这个清单：

- [ ] 外层只有一层 `<article id="wx-body">` 包全文（或 `<section>`）
- [ ] 右上角有"复制正文（无白边）"按钮 + JS
- [ ] 所有字体在内层 span 上用 `Optima-Regular, PingFangTC-light`
- [ ] 所有段落 `margin: 0 8px 32px`、`line-height: 1.75em`、`letter-spacing: 0.578px`
- [ ] 正文字号统一 16px、正文色 `rgb(34,34,34)`
- [ ] **断句**：每个完整句子单独成段，没有任何一段超过 3 行（手机宽 ~60 汉字）
- [ ] **强调分两级**：粗体不超过 15 处，粗体+下划线不超过 6 处，没有滥用
- [ ] 所有章节用 `<section inline-block border-top:6px>` + Futura-Medium 36px 编号
- [ ] 没有用 `<style>` / `<script>`（除了复制按钮那段）/ `class` / CSS 变量
- [ ] 没有 `display:flex` / `position:absolute`
- [ ] 图片如果有，写了 `width` / `height` 属性，**下方紧跟一行"数据来源 · ..."灰色 12px 居中图注**
- [ ] 表格用 `border-collapse:collapse`，表头 2px 下边线，行 1px 下边线
- [ ] **底部**：保留 `— 完 —` 作为结束信号；其它模块（灰色注释、署名块、参考资料、二维码…）按文章需要自由组合
- [ ] 真实效果在 iOS 微信里验证了

---

## 14. 速查表（压成一屏）

```
字体栈：外层 system-ui 兜底；内层 span 用 Optima-Regular, PingFangTC-light；编号用 Futura-Medium
字号：正文 16px / 章节中文 24px / 章节数字 36px / H1 24-26px / 图注 12px / 底部注释 13.5px
颜色：正文 rgb(34,34,34) / 次要 rgb(85,85,85) / 图注&底注 rgb(150,150,150) / 标题 rgb(0,0,0)
行高：1.75em（全文统一）
字间距：外层 p 用 0.578px，内层 span 用 0.5px
段落 margin：0 8px 32px 8px
章节前 margin：40px 8px 8px
章节分隔：section inline-block + border-top:6px solid #000（覆盖数字同宽）
断句：一句一段；任何段不超过 3 行手机宽
强调：两级 —— <strong> 关键句（≤15 处）、<strong style="text-decoration:underline;"> 金句（≤6 处）
图片：占位下 margin 8px，紧跟一行 12px 灰色居中"数据来源 · ..."图注，再 margin 32px
底部：唯一硬约束是 — 完 — 居中小灰字；其它（灰注释 / 署名块 / 参考资料 / 二维码）自由组合
外层容器：单一 <article id="wx-body" style="max-width:677px; margin:0 auto; background:white; padding:40px 24px 60px;">
复制按钮：position:fixed 右上角，调用 selectNodeContents(wx-body) + execCommand('copy')
```
