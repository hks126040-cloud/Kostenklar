const { chromium } = require('playwright');
const path = require('path');

const widths = [320, 375, 430];
const targetUrl = 'http://localhost:3000/entruempelung-kosten-pro-qm';
const artifactDir = 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  
  for (const width of widths) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto(targetUrl, { waitUntil: 'networkidle' });

    // Scroll to the InternalLinks section
    const section = page.locator('section:has-text("Weiterführende Preis-Ratgeber")');
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const screenshotPath = path.join(artifactDir, `related-links-before-${width}px.png`);
    await section.screenshot({ path: screenshotPath });
    console.log(`Saved before screenshot at ${width}px: ${screenshotPath}`);
    await context.close();
  }

  await browser.close();
  console.log('All before screenshots captured successfully.');
})();
