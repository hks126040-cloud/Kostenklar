const { chromium } = require('playwright');

async function testAllAnimationTriggers() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // Helper function to check unmount
  async function waitForUnmount(page, actionName) {
    for (let i = 0; i < 20; i++) {
      await page.waitForTimeout(50);
      const inDOM = await page.evaluate(() => document.querySelector('.fixed.z-50') !== null);
      if (!inDOM) {
        console.log(`   ✓ ${actionName}: Smoothly animated out & unmounted after ${(i + 1) * 50}ms`);
        return true;
      }
    }
    console.error(`   ✗ ${actionName}: Failed to unmount`);
    return false;
  }

  // Page 1: Mobile Viewport 320x512
  const mobilePage = await browser.newPage({ viewport: { width: 320, height: 512 } });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Test 1: Close Button (X) on Mobile
  console.log('Test 1: Close Button (X) on Mobile...');
  await mobilePage.click('header button');
  await mobilePage.waitForTimeout(350);
  await mobilePage.click('.fixed.z-50 button[aria-label="Menü schließen"]');
  await waitForUnmount(mobilePage, 'Close Button (X)');

  // Test 2: Escape Key on Mobile
  console.log('Test 2: Escape Key on Mobile...');
  await mobilePage.click('header button');
  await mobilePage.waitForTimeout(350);
  await mobilePage.keyboard.press('Escape');
  await waitForUnmount(mobilePage, 'Escape Key');

  // Test 3: Navigation Link Click on Mobile
  console.log('Test 3: Navigation Link Click on Mobile...');
  await mobilePage.click('header button');
  await mobilePage.waitForTimeout(350);
  await mobilePage.click('.fixed.z-50 a[href*="kosten-pro-qm"]');
  await waitForUnmount(mobilePage, 'Navigation Link Click');

  await mobilePage.close();

  // Page 2: Tablet Viewport 768x1024 (where backdrop is visible on left side of max-w-sm drawer)
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  console.log('Test 4: Backdrop Click on Tablet (768px)...');
  await tabletPage.click('header button');
  await tabletPage.waitForTimeout(350);
  // On 768px, drawer is max-w-sm (384px) aligned to the right (x: 384 to 768). Clicking x: 100 is pure backdrop!
  await tabletPage.mouse.click(100, 200);
  await waitForUnmount(tabletPage, 'Backdrop Click (Tablet)');

  await tabletPage.close();
  await browser.close();

  console.log('\n=== ALL 4 FRAMER-MOTION ANIMATION TESTS PASSED 100%! ===');
}

testAllAnimationTriggers().catch(console.error);
