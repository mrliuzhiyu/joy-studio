const fs = require("fs");
const path = require("path");

const issueRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(issueRoot, "draft.md");
const outputPath = path.join(issueRoot, "platforms", "wechat.html");

const bodyFont = "Optima-Regular,PingFangTC-light,'PingFang SC','Hiragino Sans GB',sans-serif";
const bodyStyle = `font-family:${bodyFont};font-size:16px;letter-spacing:0.5px;color:rgb(34,34,34);`;
const paragraphStyle = "margin:0 8px 32px;line-height:1.75em;letter-spacing:0.578px;";

const underlineLines = new Set([
  "AI 时代的部署，不是让 AI 多生成几份配置，而是把运行条件、权限边界和成功证据，变成它能够读取、执行和验证的系统。",
  "AI 可以负责实现部署，人仍然要拥有运行边界和成功标准。",
  "真正的运行合同，不是描述系统应该怎样工作，而是让缺少任何条件时，构建或验收能够直接失败。",
  "权限边界的作用不是提醒 AI 别做错，而是让错误发生时也到不了边界之外。",
  "AI 时代的完成，不是一段可信的解释，而是一组别人可以重复执行、也可以推翻的证据。",
]);

const imageSizes = {
  "figure-01-deployment-contract.png": [1200, 750],
  "figure-02-public-request-route.png": [1200, 750],
  "figure-03-ai-deployment-loop.png": [1200, 780],
};

const downloadableImages = [
  ["头图 · 横版", "cover-017.png"],
  ["头图 · 方形", "cover-017-square.png"],
  ["图 1 · 运行合同", "figure-01-deployment-contract.png"],
  ["图 2 · 公网请求路径", "figure-02-public-request-route.png"],
  ["图 3 · AI 部署反馈闭环", "figure-03-ai-deployment-loop.png"],
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  const withoutLinks = value.replace(/\[([^\]]+?)\]\(https:\/\/[^)]+?\)/g, "$1");
  let escaped = escapeHtml(withoutLinks);
  escaped = escaped.replace(/`([^`]+?)`/g, '<span style="font-family:SFMono-Regular,Consolas,\'Liberation Mono\',monospace;font-size:0.92em;color:rgb(55,65,81);">$1</span>');
  return escaped.replace(/\*\*(.+?)\*\*/g, (_, text) => {
    const underline = underlineLines.has(text)
      ? " style=\"text-decoration:none;background-image:linear-gradient(to bottom,transparent 64%,rgb(229,231,235) 64%);background-repeat:repeat-x;padding:0 2px;box-decoration-break:clone;-webkit-box-decoration-break:clone;\""
      : "";
    return `<strong${underline}>${text}</strong>`;
  });
}

function paragraph(value) {
  return `  <p style="${paragraphStyle}"><span style="${bodyStyle}">${inlineMarkdown(value)}</span></p>`;
}

function sectionHeading(number, title) {
  return [
    `  <section style="padding:3px;display:inline-block;border-top:6px solid rgb(0,0,0);margin:40px 8px 8px;"><p style="margin:0;"><strong style="color:rgb(0,0,0);"><span style="font-size:36px;font-family:Futura-Medium,Futura,'Helvetica Neue',Arial,sans-serif;line-height:1.1;">${number}</span></strong></p></section>`,
    `  <p style="margin:0 8px 32px;line-height:1.5;letter-spacing:0.578px;"><strong><span style="font-family:${bodyFont};font-size:24px;letter-spacing:0.5px;color:rgb(0,0,0);">${escapeHtml(title)}</span></strong></p>`,
  ].join("\n");
}

function figure(caption, source) {
  const filename = path.basename(source);
  const [width, height] = imageSizes[filename];
  return [
    `  <section style="margin:42px 0 44px;">`,
    `    <img src="../assets/${filename}" alt="${escapeHtml(caption)}" width="${width}" height="${height}" style="display:block;width:100%;height:auto;margin:0;border:0;background:rgb(255,255,255);">`,
    `    <p style="margin:10px 8px 0;text-align:center;line-height:1.6;letter-spacing:0.578px;"><span style="font-family:${bodyFont};font-size:12px;letter-spacing:0.5px;color:rgb(150,150,150);">${escapeHtml(caption)}</span></p>`,
    `  </section>`,
  ].join("\n");
}

function referenceItem(line) {
  const match = line.match(/^- \[(.+?)\]\((https:\/\/.+?)\)$/);
  if (!match) return "";
  const [, label, url] = match;
  return [
    `  <p style="margin:0 8px 3px;line-height:1.7;letter-spacing:0.578px;"><span style="font-family:${bodyFont};font-size:13px;letter-spacing:0.5px;color:rgb(85,85,85);">· ${escapeHtml(label)}</span></p>`,
    `  <p style="margin:0 8px 13px;padding-left:12px;line-height:1.55;word-break:break-all;"><span style="font-family:SFMono-Regular,Consolas,'Liberation Mono',monospace;font-size:11px;color:rgb(145,145,145);">${escapeHtml(url)}</span></p>`,
  ].join("\n");
}

function downloadCard(label, filename, index) {
  return `
  <section style="margin:0 0 28px;">
    <img id="download-image-${index}" src="../assets/${filename}" alt="${escapeHtml(label)}" style="display:block;width:100%;height:auto;margin:0 0 10px;border:1px solid rgb(235,235,235);">
    <p style="margin:0 0 10px;font-size:13px;color:rgb(85,85,85);">${escapeHtml(label)} · ${escapeHtml(filename)}</p>
    <button data-label="复制图片" onclick="copyImg('download-image-${index}',this)" style="padding:8px 16px;margin:0 8px 0 0;background:rgb(17,24,39);color:white;border:0;border-radius:5px;cursor:pointer;font-size:13px;">复制图片</button>
    <a href="../assets/${filename}" download="${filename}" style="display:inline-block;padding:7px 15px;color:rgb(17,24,39);background:white;border:1px solid rgb(180,180,180);border-radius:5px;text-decoration:none;font-size:13px;">下载</a>
  </section>`;
}

const lines = fs.readFileSync(sourcePath, "utf8").replaceAll("\r\n", "\n").split("\n");
const title = lines.find((line) => line.startsWith("# ")).slice(2).trim();
const renderedTitle = escapeHtml(title).replace("，", "，<br>");
const content = [];
let ended = false;

for (let index = 1; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (!line) continue;

  if (line === "---") {
    content.push(`  <p style="margin:52px 8px 24px;text-align:center;line-height:1.5;"><span style="font-family:${bodyFont};font-size:12px;color:rgb(170,170,170);letter-spacing:2px;">— 完 —</span></p>`);
    content.push(`  <p style="margin:0 8px 22px;text-align:center;line-height:1.75em;letter-spacing:0.578px;"><span style="font-family:${bodyFont};font-size:13px;letter-spacing:0.5px;color:rgb(150,150,150);">#AI开发　#项目部署　#AI时代的基建</span></p>`);
    content.push(`  <p style="margin:0 8px 0;line-height:1.75em;letter-spacing:0.578px;"><span style="font-family:${bodyFont};font-size:13.5px;letter-spacing:0.5px;color:rgb(150,150,150);">本文讨论普通 AI 项目第一次公开部署时，怎样建立运行合同、权限边界、反馈闭环与验收证据；不把 Docker、Nginx 或自建服务器视为所有项目的必选项。资料核对时间：2026-08-25。</span></p>`);
    content.push(`  <hr style="border:0;border-top:1px solid rgb(220,220,220);margin:48px 8px 24px;">`);
    ended = true;
    continue;
  }

  const sectionMatch = line.match(/^## (\d{2}) (.+)$/);
  if (sectionMatch) {
    content.push(sectionHeading(sectionMatch[1], sectionMatch[2]));
    continue;
  }

  if (line === "## 参考资料") {
    content.push(`  <p style="margin:0 8px 24px;line-height:1.5;letter-spacing:0.578px;"><strong><span style="font-family:${bodyFont};font-size:18px;letter-spacing:0.5px;color:rgb(0,0,0);">参考资料</span></strong></p>`);
    continue;
  }

  const imageMatch = line.match(/^!\[(.+?)\]\((.+?)\)$/);
  if (imageMatch) {
    content.push(figure(imageMatch[1], imageMatch[2]));
    continue;
  }

  if (ended && line.startsWith("- [")) {
    content.push(referenceItem(line));
    continue;
  }

  content.push(paragraph(line));
}

const downloadCards = downloadableImages.map(([label, filename], index) => downloadCard(label, filename, index)).join("\n");

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)} · 公众号版</title>
</head>
<body style="margin:0;background:rgb(244,245,247);font-family:system-ui,-apple-system,BlinkMacSystemFont,'Helvetica Neue','PingFang SC','Hiragino Sans GB','Microsoft YaHei UI','Microsoft YaHei',Arial,sans-serif;">

<button id="copy-btn" onclick="copyWxArticle()" style="position:fixed;top:20px;right:20px;padding:10px 20px;background:rgb(17,24,39);color:white;border:0;border-radius:999px;cursor:pointer;font-size:13px;font-weight:600;box-shadow:0 2px 12px rgba(0,0,0,0.15);z-index:999;">复制正文（无白边）</button>

<section style="box-sizing:border-box;width:100%;max-width:900px;margin:72px auto 18px;background:white;padding:12px;">
  <picture style="display:block;text-align:center;">
    <source media="(max-width:600px)" srcset="../assets/cover-017-square.png">
    <img src="../assets/cover-017.png" alt="${escapeHtml(title)}" width="900" height="383" style="display:block;width:100%;height:auto;margin:0;border:0;background:white;">
  </picture>
  <p style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin:10px 2px 0;font-size:13px;line-height:1.6;color:rgb(120,120,120);"><span>头图 · 自动预览合适比例</span><span><a href="../assets/cover-017.png" download="cover-017.png" style="color:rgb(55,65,81);text-decoration:none;border-bottom:1px solid rgb(180,180,180);margin-right:12px;">下载横版</a><a href="../assets/cover-017-square.png" download="cover-017-square.png" style="color:rgb(55,65,81);text-decoration:none;border-bottom:1px solid rgb(180,180,180);">下载方形</a></span></p>
</section>

<article id="wx-body" style="box-sizing:border-box;width:100%;max-width:677px;margin:0 auto;background:white;padding:40px 24px 60px;">
  <h1 style="margin:0 8px 14px;font-family:${bodyFont};font-size:25px;line-height:1.48;letter-spacing:0.2px;color:rgb(0,0,0);font-weight:700;">${renderedTitle}</h1>
  <p style="margin:0 8px 42px;font-size:13px;line-height:1.75;letter-spacing:0.578px;color:rgb(170,170,170);"><span style="font-family:${bodyFont};letter-spacing:0.5px;">2026 年 8 月 25 日 · AI 时代的基建 · 刘志宇 Joy</span></p>

${content.join("\n")}
</article>

<section style="box-sizing:border-box;width:100%;max-width:677px;margin:28px auto 80px;padding:30px 24px 20px;background:white;border-top:1px solid rgb(230,230,230);">
  <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:rgb(17,24,39);">本文配图</p>
  <p style="margin:0 0 24px;font-size:13px;line-height:1.7;color:rgb(120,120,120);">点复制图片后到公众号编辑器粘贴；本地打开时请直接下载。这一区在正文之外，不会被“复制正文”带走。</p>
${downloadCards}
</section>

<script>
function copyWxArticle() {
  var target = document.getElementById('wx-body');
  if (!target) return;
  var range = document.createRange();
  range.selectNodeContents(target);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
  var ok = false;
  try { ok = document.execCommand('copy'); } catch (error) {}
  selection.removeAllRanges();
  var button = document.getElementById('copy-btn');
  button.textContent = ok ? '已复制 ✓' : '复制失败';
  button.style.background = ok ? 'rgb(45,117,110)' : 'rgb(190,60,60)';
  setTimeout(function () {
    button.textContent = '复制正文（无白边）';
    button.style.background = 'rgb(17,24,39)';
  }, 2200);
}
function flash(btn, ok, failText) {
  var label = btn.getAttribute('data-label') || btn.textContent;
  btn.setAttribute('data-label', label);
  btn.textContent = ok ? '已复制 ✓' : (failText || '失败，请用「下载」');
  btn.style.background = ok ? 'rgb(45,117,110)' : 'rgb(190,60,60)';
  setTimeout(function () { btn.textContent = label; btn.style.background = 'rgb(17,24,39)'; }, 2400);
}
function copyImg(imgId, btn) {
  var img = document.getElementById(imgId);
  if (!window.isSecureContext || !navigator.clipboard || !navigator.clipboard.write || !window.ClipboardItem) {
    flash(btn, false, '本地打开请用「下载」'); return;
  }
  try {
    var canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth; canvas.height = img.naturalHeight;
    canvas.getContext('2d').drawImage(img, 0, 0);
    canvas.toBlob(function (blob) {
      if (!blob) { flash(btn, false); return; }
      navigator.clipboard.write([new ClipboardItem({'image/png': blob})])
        .then(function () { flash(btn, true); })
        .catch(function () { flash(btn, false); });
    }, 'image/png');
  } catch (error) { flash(btn, false); }
}
</script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");
console.log(`Built ${outputPath}`);
