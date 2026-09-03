const fs = require("fs");
const path = require("path");

const issueRoot = path.resolve(__dirname, "..");
const sourcePath = path.join(issueRoot, "draft.md");
const outputPath = path.join(issueRoot, "platforms", "wechat.html");

const bodyFont = "Optima-Regular,PingFangTC-light,'PingFang SC','Hiragino Sans GB',sans-serif";
const bodyStyle = `font-family:${bodyFont};font-size:16px;letter-spacing:0.5px;color:rgb(34,34,34);`;
const paragraphStyle = "margin:0 8px 32px;line-height:1.75em;letter-spacing:0.578px;";

const underlineLines = new Set([
  "应用每向外走一步，就会失去一部分原本由开发者手工提供的保护，因此需要补上一层新的工程能力。",
  "Docker 让应用更容易重建，但用户数据必须能够在应用重建以后继续存在。",
  "从单服务器走向多服务器，真正的变化不是机器数量，而是任何一台应用服务器都能够被替换。",
  "第一次架构升级，不是从一台服务器变成两台，而是从只能靠开发者照看的电脑，变成一套可以被重建的线上环境。",
  "好的架构不是组件最多，而是当前这套系统足够简单，也足够可靠，并且知道下一步为什么要变。",
]);

const imageSizes = {
  "figure-01-hidden-manual-support.png": [1536, 1024],
  "figure-02-production-cutaway.png": [1536, 1024],
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function inlineMarkdown(value) {
  const escaped = escapeHtml(value);
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
  return `  <p style="margin:0 8px 8px;line-height:1.7;letter-spacing:0.578px;"><span style="font-family:${bodyFont};font-size:13px;letter-spacing:0.5px;color:rgb(85,85,85);">· <a href="${escapeHtml(url)}" target="_blank" style="color:rgb(85,85,85);border-bottom:1px solid rgb(200,200,200);text-decoration:none;">${escapeHtml(label)}</a></span></p>`;
}

const lines = fs.readFileSync(sourcePath, "utf8").replaceAll("\r\n", "\n").split("\n");
const title = lines.find((line) => line.startsWith("# ")).slice(2).trim();
const content = [];
let ended = false;

for (let index = 1; index < lines.length; index += 1) {
  const line = lines[index].trim();
  if (!line) continue;

  if (line === "---") {
    content.push(`  <p style="margin:52px 8px 28px;text-align:center;line-height:1.5;"><span style="font-family:${bodyFont};font-size:12px;color:rgb(170,170,170);letter-spacing:2px;">— 完 —</span></p>`);
    content.push(`  <p style="margin:0 8px 0;line-height:1.75em;letter-spacing:0.578px;"><span style="font-family:${bodyFont};font-size:13.5px;letter-spacing:0.5px;color:rgb(150,150,150);">本文讨论的是普通应用从个人演示走向公共服务时的架构演进，不把任何单一组件视为生产级的必选项。资料核对时间：2026-08-19。</span></p>`);
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
    <source media="(max-width:600px)" srcset="../assets/cover-016-square.png">
    <img src="../assets/cover-016.png" alt="AI 写的项目：从自己能用，到别人敢用" width="900" height="383" style="display:block;width:100%;height:auto;margin:0;border:0;background:white;">
  </picture>
  <p style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin:10px 2px 0;font-size:13px;line-height:1.6;color:rgb(120,120,120);"><span>头图 · 自动预览合适比例</span><span><a href="../assets/cover-016.png" download="cover-016.png" style="color:rgb(55,65,81);text-decoration:none;border-bottom:1px solid rgb(180,180,180);margin-right:12px;">下载横版</a><a href="../assets/cover-016-square.png" download="cover-016-square.png" style="color:rgb(55,65,81);text-decoration:none;border-bottom:1px solid rgb(180,180,180);">下载方形</a></span></p>
</section>

<article id="wx-body" style="box-sizing:border-box;width:100%;max-width:677px;margin:0 auto;background:white;padding:40px 24px 60px;">
  <h1 style="margin:0 8px 14px;font-family:${bodyFont};font-size:25px;line-height:1.48;letter-spacing:0.2px;color:rgb(0,0,0);font-weight:700;">${escapeHtml(title)}</h1>
  <p style="margin:0 8px 42px;font-size:13px;line-height:1.75;letter-spacing:0.578px;color:rgb(170,170,170);"><span style="font-family:${bodyFont};letter-spacing:0.5px;">2026 年 8 月 19 日 · AI 时代的基建 · 刘志宇 Joy</span></p>

${content.join("\n")}
</article>

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
</script>
</body>
</html>
`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, html, "utf8");
console.log(`Built ${outputPath}`);
