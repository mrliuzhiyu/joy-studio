const { execFileSync } = require("child_process");
const path = require("path");

const chrome = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const issueRoot = path.resolve(__dirname, "..").replaceAll("\\", "/");

function screenshot(source, output, width, height) {
  execFileSync(chrome, [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    `--window-size=${width},${height}`,
    `--screenshot=${issueRoot}/${output}`,
    `file:///${issueRoot}/${source}`,
  ], { stdio: "inherit" });
}

screenshot("assets/figure-01-layout.html", "assets/figure-01-engineering-volume.png", 1200, 800);
screenshot("assets/figure-02-layout.html", "assets/figure-02-local-complete-user-broken.png", 1200, 800);
screenshot("assets/figure-03-layout.html", "assets/figure-03-architecture-filter.png", 1200, 800);
screenshot("assets/cover-013-layout.html", "assets/cover-013.png", 1200, 626);
screenshot("platforms/wechat.html", "assets/wechat-preview.png", 500, 900);

console.log("Rendered 013 assets and preview");
