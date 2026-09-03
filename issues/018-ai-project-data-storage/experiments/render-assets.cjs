const { execFileSync } = require("child_process");
const path = require("path");

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const issueRoot = path.resolve(__dirname, "..").replaceAll("\\", "/");

function screenshot(source, output, width, height, hash = "") {
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${width},${height}`,
    `--screenshot=${issueRoot}/${output}`,
    `file:///${issueRoot}/${source}${hash}`,
  ], { stdio: "inherit" });
}

screenshot("assets/figure-01-runtime-vs-data-layout.html", "assets/figure-01-runtime-vs-data.png", 1200, 760);
screenshot("assets/figure-02-database-decision-layout.html", "assets/figure-02-database-decision.png", 1200, 760);
screenshot("assets/figure-03-ai-data-change-loop-layout.html", "assets/figure-03-ai-data-change-loop.png", 1200, 800);
screenshot("assets/cover-018-layout.html", "assets/cover-018.png", 900, 383);
screenshot("assets/cover-018-layout.html", "assets/cover-018-square.png", 383, 383, "#square");
screenshot("platforms/wechat.html", "assets/wechat-preview.png", 500, 900);

console.log("Rendered 018 assets and preview");
