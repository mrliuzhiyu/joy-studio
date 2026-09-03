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

screenshot("assets/figure-01-deployment-contract-layout.html", "assets/figure-01-deployment-contract.png", 1200, 750);
screenshot("assets/figure-02-public-request-route-layout.html", "assets/figure-02-public-request-route.png", 1200, 750);
screenshot("assets/figure-03-ai-deployment-loop-layout.html", "assets/figure-03-ai-deployment-loop.png", 1200, 780);
screenshot("assets/cover-017-layout.html", "assets/cover-017.png", 900, 383);
screenshot("assets/cover-017-layout.html", "assets/cover-017-square.png", 383, 383, "#square");
screenshot("platforms/wechat.html", "assets/wechat-preview.png", 500, 900);

console.log("Rendered 017 assets and preview");
