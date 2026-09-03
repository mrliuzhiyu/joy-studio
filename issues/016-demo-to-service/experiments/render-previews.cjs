const { chromium } = require("playwright");

const issueRoot = "C:/Users/Joy/Desktop/JoySpace/joy-studio/issues/016-demo-to-service";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const figures = [];

  for (const [name, width, height] of figures) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto(`file:///${issueRoot}/assets/${name}-layout.html`, { waitUntil: "networkidle" });
    await page.screenshot({ path: `${issueRoot}/assets/${name}.png` });
    await page.close();
  }

  const cover = await browser.newPage({ viewport: { width: 900, height: 383 }, deviceScaleFactor: 1 });
  await cover.goto(`file:///${issueRoot}/assets/cover-016-layout.html`, { waitUntil: "networkidle" });
  await cover.screenshot({ path: `${issueRoot}/assets/cover-016.png` });
  await cover.screenshot({
    path: `${issueRoot}/assets/cover-016-square.png`,
    clip: { x: 258, y: 0, width: 383, height: 383 },
  });
  await cover.close();

  const preview = await browser.newPage({ viewport: { width: 430, height: 900 }, deviceScaleFactor: 1 });
  await preview.goto(`file:///${issueRoot}/platforms/wechat.html`, { waitUntil: "networkidle" });
  await preview.screenshot({ path: `${issueRoot}/assets/wechat-preview.png`, fullPage: true });
  await preview.close();

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
