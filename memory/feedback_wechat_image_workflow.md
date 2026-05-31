# 公众号配图：文末加「下载区 + 复制按钮」

Joy 2026-05-30 定的标配。每期 wechat.html 里所有正文配图（头图 / 结构图 / 网页截图），
在文末额外放一个「本文配图」下载区，方便 Joy 一键把图弄进公众号编辑器。

## 三条硬规则

1. **下载区放在 `</article>` 外面**（不是里面）。顶部「复制正文（无白边）」按钮选的是 `#wx-body`（article）内部，
   放外面 → 复制正文时不会把这堆图和按钮带进公众号，正文保持干净。
2. **每张图配两个按钮**：
   - **「复制图片」**（黑底主按钮）：canvas 画图 → `toBlob` → `ClipboardItem({'image/png': blob})` → `navigator.clipboard.write`。
     点一下图进剪贴板，公众号编辑器直接 Ctrl+V。成功变「已复制 ✓」绿，失败变红提示用下载。
   - **「下载」**（白底次按钮）：`<a download="文件名.png">` 兜底，存本地再传素材库。
3. **本地图不要加 `crossorigin="anonymous"`**。`file://` 下加它会让 canvas 被「污染」、`toBlob` 抛错、复制失败。同源本地图不需要它。

## 截图位占位：用「可编辑提示行」，绝不用灰底框（Joy 2026-05-31）

正文里"待 Joy 自己进网址截图"的位置，**不能用带样式的灰底 div 占位块**（`background:#f5f5f5` 那种）。
原因：Joy 的工作流是把整个 wechat.html 复制进微信编辑器，灰底框进了编辑器后**改不动、也没法在原位替换成截图**，等于死块。

正确做法：占位写成**和正文同款的普通 `<p>` 段落**（纯文本、灰色小字、居中），内容是一行提示：

```html
<p style="margin:0 8px 32px; line-height:1.75em; letter-spacing:0.578px; text-align:center;"><span style="font-family:Optima-Regular,PingFangTC-light,sans-serif; font-size:14px; letter-spacing:0.5px; color:rgb(150,150,150);">〖 此处插一张截图：<说明> <br>截图来源 <裸网址不带 https://> ·  上传图片后删掉本行 〗</span></p>
```

要点：① 是可编辑文本段，贴进微信后光标点这行就能在原位上传图、再删提示；② 网址写成裸域名（`github.com/...`），不要 `<a>` 链接也不要 `https://`，省得微信变蓝/可点；③ 三要素齐全——做什么截图、来源网址、"上传后删本行"。

## 样式（守零彩色）

- 下载区**不要底色块**（黄底 / 灰底都不行，违反 design.md 零彩色）。只用一条 `border-top:1px solid #e6e6e6` 细线分隔。
- 区块用 `system-ui` 字体（是工具区不是正文，不必套 Optima）。
- 顶部一句说明：「点复制图片 → 公众号编辑器 Ctrl+V；或下载存本地。这一区在正文之外，不会被复制正文带走。」

## copyImg 函数（放 `</script>` 里，与 copyWxArticle 并列）

复制图片到剪贴板**只在安全上下文（https / localhost）可用**。Joy 双击本地文件是 `file://`，
`navigator.clipboard.write` 在那里一定不可用——这是浏览器策略，不是 bug。所以先检测 `isSecureContext`，
本地打开时直接提示「本地打开请用下载」，不假装失败。要真用复制，让 Joy 用 `python -m http.server` 起 localhost 打开。

```js
function flash(btn, ok, failText){
  var label = btn.getAttribute('data-label') || btn.textContent;
  btn.setAttribute('data-label', label);
  btn.textContent = ok ? '已复制 ✓' : (failText || '失败，请用「下载」');
  btn.style.background = ok ? '#10b981' : '#dc2626';
  setTimeout(function(){ btn.textContent = label; btn.style.background = '#111'; }, 2400);
}
function copyImg(imgId, btn){
  var img = document.getElementById(imgId);
  if (!window.isSecureContext || !navigator.clipboard || !navigator.clipboard.write || !window.ClipboardItem) {
    flash(btn, false, '本地打开请用「下载」'); return;
  }
  try {
    var c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
    c.getContext('2d').drawImage(img,0,0);
    c.toBlob(function(b){ if(!b){flash(btn,false);return;}
      navigator.clipboard.write([new ClipboardItem({'image/png':b})]).then(function(){flash(btn,true);}).catch(function(){flash(btn,false);});
    },'image/png');
  } catch(e){ flash(btn,false); }
}
```

## 关联

[[feedback_text_architecture_diagrams]]（图怎么来）· [[feedback_writing_voice]]（零彩色/不说教）。
真实网页截图的获取方式见 feedback_text_architecture_diagrams.md（WebFetch 扒官方图直链 / chrome-devtools 进页面截图）。
