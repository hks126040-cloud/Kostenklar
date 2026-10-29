const { chromium } = require('playwright');
const path = require('path');

async function captureAnimationFrames() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 320, height: 512 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // 1. Click hamburger
  await page.click('header button');
  // Capture mid-slide entrance
  await page.waitForTimeout(90);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-drawer-animating-in.png') });

  // Capture fully settled open
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-drawer-animated-open.png') });

  // 2. Click close button
  await page.click('.fixed.z-50 button[aria-label="Menü schließen"]');
  // Capture mid-slide exit
  await page.waitForTimeout(70);
  await page.screenshot({ path: path.join(artifactDir, 'screenshot-drawer-animating-out.png') });

  await browser.close();
  console.log('Animation frames captured successfully!');
}

captureAnimationFrames().catch(console.error);
