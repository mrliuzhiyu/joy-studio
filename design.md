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

**强调 `<strong>`**：包在 span 里即可，会自然变粗：
```html
<span style="...">普通文字，<strong>加粗部分</strong>，继续普通。</span>
```

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
            color:#aaa; font-size:13px; margin:0 8px 12px; letter-spacing:0.5px;">
  [ 此处插入截图 · 文件名 ]
</div>
```

---

## 11. 文章底部署名区（参考号标配）

文章 `— 完 —` 之后要有一个标准署名块。实测参考号图片结构：

**组成**（从上到下）：
1. 一根**贯穿式灰色细线**（hr），分隔正文与署名
2. 左侧一根**短竖线**（border-left 2px 灰色）的小块
3. 三行"**粗体标签 + 竖线分隔 + 常规值**"：
   - `编辑 | XXX`
   - `出品 | XXX`
   - `内容来源 | 原创`（或"摘编"/"外部投稿"等）
4. 下方再一段**作者提示**：灰色小字，放数据来源 / 时间背景 / 引用规则

**完整 HTML 模板**：

```html
<!-- 上方贯穿灰色细线 -->
<hr style="border:0; border-top:1px solid rgb(220,220,220);
           margin:48px 8px 24px;" />

<!-- 三行署名块 · 左竖线 + 标签 | 值 结构 -->
<section style="border-left:2px solid rgb(200,200,200);
                padding:4px 0 4px 18px;
                margin:0 8px 18px;">
  <p style="margin:0 0 6px; line-height:1.9; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
                 font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
      <strong>编辑</strong>
      <span style="color:rgb(180,180,180); margin:0 10px;">|</span>
      作者名
    </span>
  </p>
  <p style="margin:0 0 6px; line-height:1.9; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
                 font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
      <strong>出品</strong>
      <span style="color:rgb(180,180,180); margin:0 10px;">|</span>
      账号或团队名
    </span>
  </p>
  <p style="margin:0; line-height:1.9; letter-spacing:0.578px;">
    <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
                 font-size:15px; letter-spacing:0.5px; color:rgb(34,34,34);">
      <strong>内容来源</strong>
      <span style="color:rgb(180,180,180); margin:0 10px;">|</span>
      原创
    </span>
  </p>
</section>

<!-- 作者提示段 · 灰色小字 -->
<p style="margin:20px 8px 0; line-height:1.75em; letter-spacing:0.578px;">
  <span style="font-family:Optima-Regular,PingFangTC-light,sans-serif;
               font-size:13.5px; letter-spacing:0.5px; color:rgb(150,150,150);">
    作者提示：数据来源 / 时间背景 / 引用规则等一句话说明
  </span>
</p>
```

**关键数值**：
- hr 边框 `1px solid rgb(220,220,220)`——**比章节线的 6px 细得多**，视觉对比清晰
- 左竖线 `2px solid rgb(200,200,200)`——比 hr 略深
- 分隔符 `|` 灰色 `rgb(180,180,180)`，前后 `margin: 0 10px`
- `编辑 / 出品 / 内容来源` 必须 `<strong>`，值保持常规字重
- 三行 `line-height: 1.9`（比正文 1.75 略松）
- 作者提示 `font-size: 13.5px`，color `rgb(150,150,150)`，不加粗

**什么内容放进去**：
- **编辑**：作者自称或笔名
- **出品**：账号 / 团队名
- **内容来源**：原创 / 摘编自 XXX / 外部投稿
- **作者提示**：数据时间戳、引用规则、版权声明、参考链接——给读者一个"这篇的来源是什么"的交代

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
- [ ] 所有章节用 `<section inline-block border-top:6px>` + Futura-Medium 36px 编号
- [ ] 没有用 `<style>` / `<script>`（除了复制按钮那段）/ `class` / CSS 变量
- [ ] 没有 `display:flex` / `position:absolute`
- [ ] 图片如果有，写了 `width` / `height` 属性
- [ ] 表格用 `border-collapse:collapse`，表头 2px 下边线，行 1px 下边线
- [ ] 真实效果在 iOS 微信里验证了

---

## 14. 速查表（压成一屏）

```
字体栈：外层 system-ui 兜底；内层 span 用 Optima-Regular, PingFangTC-light；编号用 Futura-Medium
字号：正文 16px / 章节中文 24px / 章节数字 36px / H1 24-26px
颜色：正文 rgb(34,34,34) / 次要 rgb(85,85,85) / 标题 rgb(0,0,0)
行高：1.75em（全文统一）
字间距：外层 p 用 0.578px，内层 span 用 0.5px
段落 margin：0 8px 32px 8px
章节前 margin：40px 8px 8px
章节分隔：section inline-block + border-top:6px solid #000（覆盖数字同宽）
外层容器：单一 <article id="wx-body" style="max-width:677px; margin:0 auto; background:white; padding:40px 24px 60px;">
复制按钮：position:fixed 右上角，调用 selectNodeContents(wx-body) + execCommand('copy')
```
