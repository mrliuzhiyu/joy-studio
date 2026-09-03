const fs = require("fs");
const path = require("path");

const issueRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(issueRoot, "draft.md");
const outputPath = path.join(issueRoot, "platforms", "wechat.html");
const font = "Optima-Regular,PingFangTC-light,'PingFang SC','Hiragino Sans GB',sans-serif";
const paragraphStyle = "margin:0 8px 32px;line-height:1.75em;letter-spacing:0.578px;";
const bodyStyle = `font-family:${font};font-size:16px;letter-spacing:0.5px;color:rgb(34,34,34);`;

const underlineLines = new Set([
  "AI 擅长把可能变成实现，却不会自动决定哪些可能性根本不该进入产品。",
  "安全不是控件越多，可靠也不是分支越多。",
  "写出一个功能越来越便宜，拥有一个功能仍然很贵。",
  "AI 能守住一条已经写清的边界，却不能替承担后果的人发明这条边界。",
]);

const imageSizes = {
  "figure-01-engineering-volume.png": [1200, 800],
  "figure-02-local-complete-user-broken.png": [1200, 800],
  "figure-03-architecture-filter.png": [1200, 800],
};

const downloadableImages = [
  ["头图", "cover-013.png"],
  ["图 1 · 实现范围与判断边界", "figure-01-engineering-volume.png"],
  ["图 2 · 局部完整与用户路径", "figure-02-local-complete-user-broken.png"],
  ["图 3 · 产品停止条件", "figure-03-architecture-filter.png"],
];

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  const withoutLinks = value.replace(/\[([^\]]+?)\]\(https:\/\/[^)]+?\)/g, "$1");
  let escaped = escapeHtml(withoutLinks);
  escaped = escaped.replace(/`([^`]+?)`/g, '<span style="font-family:SFMono-Regular,Consolas,monospace;font-size:0.92em;color:rgb(55,65,81);">$1</span>');
  return escaped.replace(/\*\*(.+?)\*\*/g, (_, text) => {
    const marker = underlineLines.has(text)
      ? ' style="text-decoration:none;background-image:linear-gradient(to bottom,transparent 64%,rgb(229,231,235) 64%);background-repeat:repeat-x;padding:0 2px;box-decoration-break:clone;-webkit-box-decoration-break:clone;"'
      : "";
    return `<strong${marker}>${text}</strong>`;
  });
}

function paragraph(value) {
  return `  <p style="${paragraphStyle}"><span style="${bodyStyle}">${inlineMarkdown(value)}</span></p>`;
}

function sectionHeading(number, title) {
  return [
    `  <section style="padding:3px;display:inline-block;border-top:6px solid rgb(0,0,0);margin:40px 8px 8px;"><p style="margin:0;"><strong style="color:rgb(0,0,0);"><span style="font-size:36px;font-family:Futura-Medium,Futura,'Helvetica Neue',Arial,sans-serif;line-height:1.1;">${number}</span></strong></p></section>`,
    `  <p style="margin:0 8px 32px;line-height:1.5;letter-spacing:0.578px;"><strong><span style="font-family:${font};font-size:24px;letter-spacing:0.5px;color:rgb(0,0,0);">${escapeHtml(title)}</span></strong></p>`,
  ].join("\n");
}

function figure(caption, source) {
  const filename = path.basename(source);
  const [width, height] = imageSizes[filename];
  return [
    '  <section style="margin:42px 0 44px;">',
    `    <img src="../assets/${filename}" alt="${escapeHtml(caption)}" width="${width}" height="${height}" style="display:block;width:100%;height:auto;margin:0;border:0;background:rgb(255,255,255);">`,
    `    <p style="margin:10px 8px 0;text-align:center;line-height:1.6;letter-spacing:0.578px;"><span style="font-family:${font};font-size:12px;letter-spacing:0.5px;color:rgb(150,150,150);">${escapeHtml(caption)}</span></p>`,
    "  </section>",
  ].join("\n");
}

function referenceItem(line) {
  const match = line.match(/^- \[(.+?)\]\((https:\/\/.+?)\)$/);
  if (!match) return "";
  const [, label, url] = match;
  return [
    `  <p style="margin:0 8px 3px;line-height:1.7;"><span style="font-family:${font};font-size:13px;color:rgb(85,85,85);">· ${escapeHtml(label)}</span></p>`,
    `  <p style="margin:0 8px 13px;padding-left:12px;line-height:1.55;word-break:break-all;"><span style="font-family:SFMono-Regular,Consolas,monospace;font-size:11px;color:rgb(145,145,145);">${escapeHtml(url)}</span></p>`,
  ].join("\n");
}

function downloadCard(label, filename, index) {
  return `  <section style="margin:0 0 28px;">
    <img id="download-image-${index}" src="../assets/${filename}" alt="${escapeHtml(label)}" style="display:block;width:100%;height:auto;margin:0 0 10px;border:1px solid rgb(235,235,235);">
    <p style="margin:0 0 10px;font-size:13px;color:rgb(85,85,85);">${escapeHtml(label)} · ${escapeHtml(filename)}</p>
    <button data-label="复制图片" onclick="copyImg('download-image-${index}',this)" style="padding:8px 16px;margin:0 8px 0 0;background:rgb(17,24,39);color:white;border:0;border-radius:5px;cursor:pointer;font-size:13px;">复制图片</button>
    <a href="../assets/${filename}" download="${filename}" style="display:inline-block;padding:7px 15px;color:rgb(17,24,39);background:white;border:1px solid rgb(180,180,180);border-radius:5px;text-decoration:none;font-size:13px;">下载</a>
  </section>`;
}

const lines = fs.readFileSync(sourcePath, "utf8").replaceAll("\r\n", "\n").split("\n");
const title = lines.find((line) => line.startsWith("# ")).slice(2).trim();
const content = [];
let references = false;

for (const rawLine of lines.slice(1)) {
  const line = rawLine.trim();
  if (!line) continue;
  if (line === "---") {
    content.push(`  <p style="margin:52px 8px 24px;text-align:center;"><span style="font-family:${font};font-size:12px;color:rgb(170,170,170);letter-spacing:2px;">— 完 —</span></p>`);
    content.push(`  <p style="margin:0 8px 22px;text-align:center;"><span style="font-family:${font};font-size:13px;color:rgb(150,150,150);">#AI开发　#产品边界　#软件工程</span></p>`);
    content.push(`  <p style="margin:0 8px 0;line-height:1.75em;"><span style="font-family:${font};font-size:13.5px;color:rgb(150,150,150);">本文讨论 AI 编程如何放大没有停止条件的工程投入。安全、权限、数据与恢复底线仍需严格保留；批评对象是脱离真实风险、业务结果和用户路径的防御堆叠。资料核对时间：2026-09-03。</span></p>`);
    content.push('  <hr style="border:0;border-top:1px solid rgb(220,220,220);margin:48px 8px 24px;">');
    references = true;
    continue;
  }
  if (line === "## 参考资料") {
    content.push(`  <p style="margin:0 8px 24px;line-height:1.5;"><strong><span style="font-family:${font};font-size:18px;color:rgb(0,0,0);">参考资料</span></strong></p>`);
    continue;
  }
  const section = line.match(/^## (\d{2}) (.+)$/);
  if (section) {
    content.push(sectionHeading(section[1], section[2]));
    continue;
  }
  const image = line.match(/^!\[(.+?)\]\((.+?)\)$/);
  if (image) {
    content.push(figure(image[1], image[2]));
    continue;
  }
  if (references && line.startsWith("- [")) {
    content.push(referenceItem(line));
    continue;
  }
  content.push(paragraph(line));
}

const cards = downloadableImages.map(([label, file], index) => downloadCard(label, file, index)).join("\n");
const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · 公众号版</title></head>
<body style="margin:0;background:rgb(244,245,247);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Helvetica Neue','PingFang SC','Microsoft YaHei',Arial,sans-serif;">
<button id="copy-btn" onclick="copyWxArticle()" style="position:fixed;top:20px;right:20px;padding:10px 20px;background:rgb(17,24,39);color:white;border:0;border-radius:999px;cursor:pointer;font-size:13px;font-weight:600;z-index:999;">复制正文（无白边）</button>
<section style="box-sizing:border-box;width:100%;max-width:900px;margin:72px auto 18px;background:white;padding:12px;">
  <img src="../assets/cover-013.png" alt="${escapeHtml(title)}" width="1200" height="626" style="display:block;width:100%;height:auto;margin:0;border:0;background:white;">
  <p style="margin:10px 2px 0;font-size:13px;color:rgb(120,120,120);">头图<span style="float:right;"><a href="../assets/cover-013.png" download="cover-013.png" style="color:rgb(55,65,81);text-decoration:none;border-bottom:1px solid rgb(180,180,180);">下载</a></span></p>
</section>
<article id="wx-body" style="box-sizing:border-box;width:100%;max-width:677px;margin:0 auto;background:white;padding:40px 24px 60px;">
  <h1 style="margin:0 8px 14px;font-family:${font};font-size:24px;line-height:1.48;color:rgb(0,0,0);font-weight:700;">${escapeHtml(title).replace("，", "，<br>")}</h1>
  <p style="margin:0 8px 42px;font-size:13px;line-height:1.75;color:rgb(170,170,170);"><span style="font-family:${font};">2026 年 9 月 3 日 · AI 工程 · 刘志宇 Joy</span></p>
${content.join("\n")}
</article>
<section style="box-sizing:border-box;width:100%;max-width:677px;margin:28px auto 80px;padding:30px 24px 20px;background:white;border-top:1px solid rgb(230,230,230);">
  <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:rgb(17,24,39);">本文配图</p>
  <p style="margin:0 0 24px;font-size:13px;line-height:1.7;color:rgb(120,120,120);">点复制图片后到公众号编辑器粘贴；本地打开时请直接下载。这一区在正文之外，不会被“复制正文”带走。</p>
${cards}
</section>
<script>
function copyWxArticle(){var t=document.getElementById('wx-body'),r=document.createRange(),s=window.getSelection();r.selectNodeContents(t);s.removeAllRanges();s.addRange(r);var ok=false;try{ok=document.execCommand('copy')}catch(e){}s.removeAllRanges();var b=document.getElementById('copy-btn');b.textContent=ok?'已复制 ✓':'复制失败';setTimeout(function(){b.textContent='复制正文（无白边）'},2200)}
function flash(b,ok,msg){var l=b.getAttribute('data-label')||b.textContent;b.setAttribute('data-label',l);b.textContent=ok?'已复制 ✓':(msg||'失败，请用「下载」');b.style.background=ok?'rgb(45,117,110)':'rgb(190,60,60)';setTimeout(function(){b.textContent=l;b.style.background='rgb(17,24,39)'},2400)}
function copyImg(id,b){var i=document.getElementById(id);if(!window.isSecureContext||!navigator.clipboard||!window.ClipboardItem){flash(b,false,'本地打开请用「下载」');return}try{var c=document.createElement('canvas');c.width=i.naturalWidth;c.height=i.naturalHeight;c.getContext('2d').drawImage(i,0,0);c.toBlob(function(blob){if(!blob){flash(b,false);return}navigator.clipboard.write([new ClipboardItem({'image/png':blob})]).then(function(){flash(b,true)}).catch(function(){flash(b,false)})},'image/png')}catch(e){flash(b,false)}}
</script>
</body></html>`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");
console.log(`Built ${outputPath}`);
