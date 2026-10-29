const { chromium } = require('playwright');
const path = require('path');

async function testMobileMenu() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // 1. Mobile 320px Menu Open
  const context320 = await browser.newContext({
    viewport: { width: 320, height: 568 },
    colorScheme: 'light',
  });
  const page320 = await context320.newPage();
  await page320.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Click hamburger button
  const hamburger = await page320.$('button[aria-label*="Menü"]');
  if (hamburger) {
    await hamburger.click();
    await page320.waitForTimeout(300);
  }

  const menuImg = path.join(artifactDir, 'screenshot-mobile-320-menu-open.png');
  await page320.screenshot({ path: menuImg, fullPage: false });
  console.log('Saved 320px mobile menu screenshot to:', menuImg);

  // 2. Article page at 320x512 (exact dimension user tested)
  const page320Article = await context320.newPage();
  await page320Article.goto('http://localhost:3000/wohnungsaufloesung-nach-todesfall', { waitUntil: 'networkidle' });

  const articleImg = path.join(artifactDir, 'screenshot-article-320x512-fixed.png');
  await page320Article.screenshot({ path: articleImg, fullPage: false });
  console.log('Saved 320x512 article screenshot to:', articleImg);

  await context320.close();

  // 3. Tablet 768x1024
  const context768 = await browser.newContext({
    viewport: { width: 768, height: 1024 },
    colorScheme: 'light',
  });
  const page768 = await context768.newPage();
  await page768.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const tabletImg = path.join(artifactDir, 'screenshot-tablet-768.png');
  await page768.screenshot({ path: tabletImg, fullPage: false });
  console.log('Saved 768px tablet screenshot to:', tabletImg);

  await context768.close();
  await browser.close();
}

testMobileMenu().catch(console.error);

