const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testProDrawer() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const results = {
    light320: null,
    dark320: null,
    keyboardEscWorks: false,
  };

  // 1. Light Mode on 320x512
  console.log('Testing Pro Drawer in Light Mode (320x512)...');
  const contextLight = await browser.newContext({
    viewport: { width: 320, height: 512 },
    colorScheme: 'light',
  });
  const pageLight = await contextLight.newPage();
  await pageLight.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Click hamburger
  const hamburger = await pageLight.$('header button[aria-label*="Menü"]');
  await hamburger.click();
  await pageLight.waitForTimeout(300);

  // Inspect drawer DOM
  results.light320 = await pageLight.evaluate(() => {
    const drawer = document.querySelector('.fixed.z-50');
    const heroCard = drawer ? drawer.querySelector('.rounded-2xl') : null;
    const items = drawer ? Array.from(drawer.querySelectorAll('a')).map(a => a.innerText.trim().replace(/\n+/g, ' ')) : [];
    const closeBtn = drawer ? drawer.querySelector('button[aria-label*="schließen"]') : null;

    return {
      drawerExists: !!drawer,
      heroCardFound: !!heroCard,
      itemsCount: items.length,
      sampleItems: items.slice(0, 5),
      closeBtnFound: !!closeBtn,
    };
  });

  const lightImg = path.join(artifactDir, 'screenshot-drawer-320-light.png');
  await pageLight.screenshot({ path: lightImg, fullPage: false });
  console.log('Saved Light Drawer screenshot to:', lightImg);

  // Test ESC key
  await pageLight.keyboard.press('Escape');
  await pageLight.waitForTimeout(300);
  results.keyboardEscWorks = await pageLight.evaluate(() => {
    return !document.querySelector('.fixed.z-50.flex.justify-end');
  });

  await contextLight.close();

  // 2. Dark Mode on 320x512
  console.log('Testing Pro Drawer in Dark Mode (320x512)...');
  const contextDark = await browser.newContext({
    viewport: { width: 320, height: 512 },
    colorScheme: 'dark',
  });
  const pageDark = await contextDark.newPage();
  await pageDark.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const hamburgerDark = await pageDark.$('header button[aria-label*="Menü"]');
  await hamburgerDark.click();
  await pageDark.waitForTimeout(300);

  const darkImg = path.join(artifactDir, 'screenshot-drawer-320-dark.png');
  await pageDark.screenshot({ path: darkImg, fullPage: false });
  console.log('Saved Dark Drawer screenshot to:', darkImg);

  // 3. Standard iPhone 375x667
  console.log('Testing Pro Drawer on 375x667...');
  const context375 = await browser.newContext({
    viewport: { width: 375, height: 667 },
    colorScheme: 'light',
  });
  const page375 = await context375.newPage();
  await page375.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const hamburger375 = await page375.$('header button[aria-label*="Menü"]');
  await hamburger375.click();
  await page375.waitForTimeout(300);

  const img375 = path.join(artifactDir, 'screenshot-drawer-375-light.png');
  await page375.screenshot({ path: img375, fullPage: false });
  console.log('Saved 375px Drawer screenshot to:', img375);

  await context375.close();
  await contextDark.close();
  await browser.close();

  console.log('\n=== DRAWER AUDIT COMPLETE ===');
  console.log(JSON.stringify(results, null, 2));
}

testProDrawer().catch(console.error);

