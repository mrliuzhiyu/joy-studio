const fs = require("fs");
const path = require("path");

const issueRoot = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(issueRoot, "platforms", "wechat.html"), "utf8");
const expectedTitle = "AI 能帮你扩展边界，但不能替你守住边界";
const failures = [];
const article = html.match(/<article id="wx-body"[\s\S]*?<\/article>/)?.[0] || "";
const heading = article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
const sections = [...article.matchAll(/font-size:36px[^>]*>(\d{2})<\/span>/g)].map((match) => match[1]);
const images = [...article.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/g)].map((match) => match[0]);
const underlineCount = (article.match(/transparent 64%/g) || []).length;
const bodyText = article.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/\s+/g, "").trim();

if (!article) failures.push("缺少 wx-body 正文");
if (heading !== expectedTitle) failures.push("正文标题不等于最终标题");
if (sections.join(",") !== "01,02,03,04,05,06") failures.push("章节编号不是连续的 01—06");
if (images.length !== 3) failures.push("正文图片数量不是 3");
if (images.some((tag) => !/width="\d+"/.test(tag) || !/height="\d+"/.test(tag))) failures.push("正文图片缺少明确尺寸");
if (/<a\b/i.test(article)) failures.push("正文内仍有链接标签");
if (/\[[^\]]+\]\(https:\/\//.test(article)) failures.push("正文残留 Markdown 链接");
if (/\*\*|`/.test(article)) failures.push("正文残留 Markdown 标记");
if (/\bclass=/.test(article)) failures.push("正文包含 class");
if (/<style\b/i.test(html)) failures.push("页面包含 style 标签");
if (/Fable 5|fable-architecture/i.test(html)) failures.push("页面残留旧主题名");
if (underlineCount !== 4) failures.push(`灰色标记线数量应为 4，实际为 ${underlineCount}`);
if (bodyText.length < 5200) failures.push("正文长度不足 5200 字符");
if ((html.match(/data-label="复制图片"/g) || []).length !== 4) failures.push("下载区图片数量不是 4");

for (const asset of ["cover-013.png", "figure-01-engineering-volume.png", "figure-02-local-complete-user-broken.png", "figure-03-architecture-filter.png"]) {
  if (!fs.existsSync(path.join(issueRoot, "assets", asset))) failures.push(`缺少图片 ${asset}`);
}

console.log(JSON.stringify({ heading, sections, images: images.length, underlineCount, articleTextLength: bodyText.length, failures }, null, 2));
if (failures.length) process.exit(1);
