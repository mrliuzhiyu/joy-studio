const { chromium } = require("playwright");

const pageUrl = "file:///C:/Users/Joy/Desktop/JoySpace/joy-studio/issues/015-multi-window-production-stability/platforms/wechat.html";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });
  const page = await browser.newPage({ viewport: { width: 430, height: 900 } });
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
  await page.goto(pageUrl, { waitUntil: "networkidle" });

  const result = await page.evaluate(() => {
    const article = document.querySelector("#wx-body");
    const articleImages = [...article.querySelectorAll("img")];
    const allImages = [...document.querySelectorAll("img")];
    const forbidden = [
      "3" + "0亿",
      "3" + "0 亿",
      "33" + ".5",
      "Text" + "View",
      "text" + "view",
      "He" + "zeal",
      "何" + "枝",
    ];
    const badArticleStyles = [...article.querySelectorAll("*")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return ["flex", "grid", "inline-flex", "inline-grid"].includes(style.display)
          || ["fixed", "absolute", "sticky"].includes(style.position);
      })
      .map((element) => ({ tag: element.tagName, text: element.textContent.trim().slice(0, 40) }));

    return {
      title: document.title,
      heading: article.querySelector("h1")?.textContent.trim(),
      errors: [],
      articleImages: articleImages.length,
      allImages: allImages.length,
      unloadedImages: allImages
        .filter((image) => !image.complete || image.naturalWidth === 0)
        .map((image) => image.getAttribute("src")),
      articleLinks: article.querySelectorAll("a").length,
      articleClasses: article.querySelectorAll("[class]").length,
      styleTags: document.querySelectorAll("style").length,
      scripts: document.querySelectorAll("script").length,
      articleClientWidth: article.clientWidth,
      articleScrollWidth: article.scrollWidth,
      badArticleStyles,
      forbiddenMatches: forbidden.filter((term) => document.body.innerText.includes(term)),
      hasScaleBackground: document.body.innerText.includes("超过 10 亿 Token"),
      articleTextLength: article.innerText.length,
    };
  });
  result.errors = errors;
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
