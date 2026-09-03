const { chromium } = require("playwright");

const issueRoot = "C:/Users/Joy/Desktop/JoySpace/joy-studio/issues/015-multi-window-production-stability";

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  });

  const figures = [
    ["figure-01-prd-vs-boundary", 1200, 790],
    ["figure-02-worktree-contract", 1200, 840],
    ["figure-03-evidence-gates", 1200, 790],
    ["figure-04-incident-to-invariant", 1200, 820],
  ];

  for (const [name, width, height] of figures) {
    const figure = await browser.newPage({
      viewport: { width, height },
      deviceScaleFactor: 1,
    });
    await figure.goto(`file:///${issueRoot}/assets/${name}-layout.html`, {
      waitUntil: "networkidle",
    });
    await figure.screenshot({ path: `${issueRoot}/assets/${name}.png` });
    await figure.close();
  }

  const cover = await browser.newPage({
    viewport: { width: 900, height: 383 },
    deviceScaleFactor: 1,
  });
  await cover.goto(`file:///${issueRoot}/assets/cover-015-layout.html`, {
    waitUntil: "networkidle",
  });
  await cover.screenshot({ path: `${issueRoot}/assets/cover-015.png` });

  const preview = await browser.newPage({
    viewport: { width: 430, height: 900 },
    deviceScaleFactor: 1,
  });
  await preview.goto(`file:///${issueRoot}/platforms/wechat.html`, {
    waitUntil: "networkidle",
  });
  await preview.screenshot({
    path: `${issueRoot}/assets/wechat-preview.png`,
    fullPage: true,
  });

  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
