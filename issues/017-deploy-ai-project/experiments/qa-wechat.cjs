const fs = require("fs");
const path = require("path");

const issueRoot = path.resolve(__dirname, "..");
const htmlPath = path.join(issueRoot, "platforms", "wechat.html");
const html = fs.readFileSync(htmlPath, "utf8");
const expectedTitle = "AI 写的项目，怎么部署到网上给别人用？";
const failures = [];

const articleMatch = html.match(/<article id="wx-body"[\s\S]*?<\/article>/);
if (!articleMatch) failures.push("缺少 wx-body 正文");
const article = articleMatch?.[0] || "";

const heading = article.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1]?.replace(/<[^>]+>/g, "").trim();
if (heading !== expectedTitle) failures.push("正文标题不等于最终标题");

const sectionNumbers = [...article.matchAll(/font-size:36px[^>]*>(\d{2})<\/span>/g)].map((match) => match[1]);
if (sectionNumbers.join(",") !== "01,02,03,04,05,06,07") failures.push("章节编号不是连续的 01—07");

const articleImages = [...article.matchAll(/<img\s+[^>]*src="([^"]+)"[^>]*>/g)].map((match) => match[0]);
if (articleImages.length !== 3) failures.push("正文图片数量不是 3");
if (articleImages.some((tag) => !/width="\d+"/.test(tag) || !/height="\d+"/.test(tag))) failures.push("正文图片缺少明确尺寸");
if (/<a\b/i.test(article)) failures.push("正文内仍有链接标签");
if (/\[[^\]]+\]\(https:\/\//.test(article)) failures.push("正文残留 Markdown 链接");
if (/\*\*|`/.test(article)) failures.push("正文残留 Markdown 强调符号");
if (/\bclass=/.test(article)) failures.push("正文包含 class");
if (/<style\b/i.test(html)) failures.push("页面包含 style 标签");
if (/textview/i.test(html)) failures.push("页面出现不应公开的项目名");

const underlineCount = (article.match(/transparent 64%/g) || []).length;
if (underlineCount !== 5) failures.push(`灰色标记线数量应为 5，实际为 ${underlineCount}`);

const assetNames = [
  "cover-017.png",
  "cover-017-square.png",
  "figure-01-deployment-contract.png",
  "figure-02-public-request-route.png",
  "figure-03-ai-deployment-loop.png",
];
for (const assetName of assetNames) {
  const assetPath = path.join(issueRoot, "assets", assetName);
  if (!fs.existsSync(assetPath)) failures.push(`缺少图片 ${assetName}`);
}

const bodyText = article
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<[^>]+>/g, "")
  .replace(/&amp;/g, "&")
  .replace(/&lt;/g, "<")
  .replace(/&gt;/g, ">")
  .replace(/\s+/g, "")
  .trim();
if (bodyText.length < 5600) failures.push("正文长度不足 5600 字符");

const result = {
  heading,
  sectionNumbers,
  articleImages: articleImages.length,
  underlineCount,
  articleLinks: (article.match(/<a\b/gi) || []).length,
  articleTextLength: bodyText.length,
  downloadableImages: (html.match(/data-label="复制图片"/g) || []).length,
  failures,
};

if (result.downloadableImages !== 5) failures.push(`可下载图片数量应为 5，实际为 ${result.downloadableImages}`);

console.log(JSON.stringify(result, null, 2));
if (failures.length) process.exit(1);
