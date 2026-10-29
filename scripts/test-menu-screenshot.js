const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge' });
  
  // Light mode
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const hamburger = page.locator('button[aria-label="Menü öffnen"]');
    await hamburger.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/current-mobile-menu.png' });
  }

  // Dark mode
  {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
      colorScheme: 'dark'
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    const hamburger = page.locator('button[aria-label="Menü öffnen"]');
    await hamburger.click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/current-mobile-menu-dark.png' });
  }

  console.log('Screenshots saved successfully!');
  await browser.close();
})();
