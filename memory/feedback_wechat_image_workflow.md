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

## 样式（守零彩色）

- 下载区**不要底色块**（黄底 / 灰底都不行，违反 design.md 零彩色）。只用一条 `border-top:1px solid #e6e6e6` 细线分隔。
- 区块用 `system-ui` 字体（是工具区不是正文，不必套 Optima）。
- 顶部一句说明：「点复制图片 → 公众号编辑器 Ctrl+V；或下载存本地。这一区在正文之外，不会被复制正文带走。」

## copyImg 函数（放 `</script>` 里，与 copyWxArticle 并列）

```js
function copyImg(imgId, btn){
  var img=document.getElementById(imgId), label=btn.textContent;
  function done(ok){ btn.textContent=ok?'已复制 ✓':'失败，请用「下载」'; btn.style.background=ok?'#10b981':'#dc2626';
    setTimeout(function(){btn.textContent=label;btn.style.background='#111';},2200); }
  try{ var c=document.createElement('canvas'); c.width=img.naturalWidth; c.height=img.naturalHeight;
    c.getContext('2d').drawImage(img,0,0);
    c.toBlob(function(b){ if(b&&window.ClipboardItem&&navigator.clipboard&&navigator.clipboard.write){
      navigator.clipboard.write([new ClipboardItem({'image/png':b})]).then(function(){done(true);}).catch(function(){done(false);});
    } else { done(false); } },'image/png');
  }catch(e){ done(false); }
}
```

## 关联

[[feedback_text_architecture_diagrams]]（图怎么来）· [[feedback_writing_voice]]（零彩色/不说教）。
真实网页截图的获取方式见 feedback_text_architecture_diagrams.md（WebFetch 扒官方图直链 / chrome-devtools 进页面截图）。
