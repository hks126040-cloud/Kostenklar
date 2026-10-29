const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/entruempelung-kosten-pro-qm', { waitUntil: 'networkidle' });
  const section = page.locator('section:has-text("Weiterführende Preis-Ratgeber")');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  const screenshotPath = path.join('C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923', 'related-links-desktop-1280px.png');
  await section.screenshot({ path: screenshotPath });
  console.log('Saved desktop screenshot:', screenshotPath);
  await browser.close();
})();
