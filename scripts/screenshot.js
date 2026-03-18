const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = path.resolve(__dirname, '..'); // trade-show-tools repo root

const targets = [
  {
    url: 'https://lensmorofficial.github.io/trade-show-tools/',
    name: 'tools-homepage.png'
  },
  {
    url: 'https://lensmorofficial.github.io/trade-show-tools/roi-calculator/',
    name: 'roi-calculator.png'
  },
  {
    url: 'https://lensmorofficial.github.io/trade-show-tools/icp-matcher/',
    name: 'icp-matcher.png'
  },
  {
    url: 'https://lensmorofficial.github.io/trade-show-tools/badge-qualifier/',
    name: 'badge-qualifier.png'
  }
];

const outDir = path.join(BASE, 'screenshots');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 800 });

  fs.mkdirSync(outDir, { recursive: true });

  for (const target of targets) {
    console.log(`Navigating to ${target.url}`);
    await page.goto(target.url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    const outPath = path.join(outDir, target.name);
    await page.screenshot({ path: outPath, fullPage: false });
    console.log(`  Saved: ${outPath}`);
  }

  await browser.close();
  console.log('Done.');
})();
