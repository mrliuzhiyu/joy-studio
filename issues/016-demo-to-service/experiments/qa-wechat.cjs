const { chromium } = require("playwright");

const pageUrl = "file:///C:/Users/Joy/Desktop/JoySpace/joy-studio/issues/016-demo-to-service/platforms/wechat.html";
const expectedTitle = "AI 写的项目：从自己能用，到别人敢用";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
  const runtimeErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") runtimeErrors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => runtimeErrors.push(`page: ${error.message}`));
  await page.goto(pageUrl, { waitUntil: "networkidle" });

  const result = await page.evaluate((expectedTitle) => {
    const article = document.querySelector("#wx-body");
    const articleImages = [...article.querySelectorAll("img")];
    const badArticleStyles = [...article.querySelectorAll("*")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return ["flex", "grid", "inline-flex", "inline-grid"].includes(style.display)
          || ["fixed", "absolute", "sticky"].includes(style.position);
      })
      .map((element) => ({ tag: element.tagName, text: element.textContent.trim().slice(0, 40) }));
    const longParagraphs = [...article.querySelectorAll("p")]
      .map((element) => element.textContent.trim())
      .filter((text) => text.length > 125);

    return {
      documentTitle: document.title,
      heading: article.querySelector("h1")?.textContent.trim(),
      headingExact: article.querySelector("h1")?.textContent.trim() === expectedTitle,
      articleImages: articleImages.length,
      unloadedImages: articleImages
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute("src")),
      imagesMissingDimensions: articleImages
        .filter((image) => !image.getAttribute("width") || !image.getAttribute("height"))
        .map((image) => image.getAttribute("src")),
      articleLinks: article.querySelectorAll("a").length,
      articleClasses: article.querySelectorAll("[class]").length,
      styleTags: document.querySelectorAll("style").length,
      scripts: document.querySelectorAll("script").length,
      articleClientWidth: article.clientWidth,
      articleScrollWidth: article.scrollWidth,
      badArticleStyles,
      longParagraphs,
      articleTextLength: article.innerText.length,
      sectionNumbers: [...article.querySelectorAll("section span")]
        .map((element) => element.textContent.trim())
        .filter((text) => /^\d{2}$/.test(text)),
    };
  }, expectedTitle);

  result.runtimeErrors = runtimeErrors;
  const failures = [];
  if (!result.headingExact) failures.push("标题不等于最终标题");
  if (result.articleImages !== 2) failures.push("正文图片数量不是 2");
  if (result.unloadedImages.length) failures.push("存在未加载图片");
  if (result.imagesMissingDimensions.length) failures.push("存在缺少尺寸的图片");
  if (result.articleClasses !== 0) failures.push("正文包含 class");
  if (result.styleTags !== 0) failures.push("页面包含 style 标签");
  if (result.badArticleStyles.length) failures.push("正文使用了不稳定布局属性");
  if (result.articleScrollWidth > result.articleClientWidth) failures.push("正文横向溢出");
  if (result.runtimeErrors.length) failures.push("页面存在运行错误");
  const expectedSections = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
  if (result.sectionNumbers.join(",") !== expectedSections.join(",")) failures.push("章节编号不是连续的 01—09");

  result.failures = failures;
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
  if (failures.length) process.exit(1);
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
