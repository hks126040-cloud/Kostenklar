const { chromium } = require('playwright');

async function debugDrawer() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 320, height: 512 } });
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Open drawer
  console.log('1. Clicking hamburger button...');
  await page.click('header button');
  await page.waitForTimeout(400);

  const isOpenBefore = await page.evaluate(() => document.querySelector('.fixed.z-50') !== null);
  console.log('   Drawer in DOM after opening:', isOpenBefore);

  // Click close button inside drawer
  console.log('2. Clicking close button inside drawer...');
  const closeBtn = await page.$('.fixed.z-50 button');
  await closeBtn.click();

  // Poll for unmount over 1 second
  let unmounted = false;
  for (let i = 0; i < 10; i++) {
    await page.waitForTimeout(100);
    const inDOM = await page.evaluate(() => document.querySelector('.fixed.z-50') !== null);
    if (!inDOM) {
      unmounted = true;
      console.log(`   Drawer successfully unmounted after ${(i + 1) * 100}ms!`);
      break;
    }
  }

  if (!unmounted) {
    console.log('   Drawer did not unmount after 1000ms.');
    const html = await page.evaluate(() => document.querySelector('.fixed.z-50')?.outerHTML);
    console.log('   Current drawer element:', html?.slice(0, 200));
  }

  await browser.close();
}

debugDrawer().catch(console.error);
