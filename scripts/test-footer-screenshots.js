const { chromium } = require('playwright');
const path = require('path');

async function captureFooterScreenshots() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // 1. Mobile 320x512 Dark
  const page320Dark = await browser.newPage({ viewport: { width: 320, height: 600 }, colorScheme: 'dark' });
  await page320Dark.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page320Dark.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page320Dark.waitForTimeout(300);
  const footer320Dark = await page320Dark.$('footer');
  await footer320Dark.screenshot({ path: path.join(artifactDir, 'screenshot-footer-320-dark.png') });
  await page320Dark.close();

  // 2. Mobile 320x512 Light
  const page320Light = await browser.newPage({ viewport: { width: 320, height: 600 }, colorScheme: 'light' });
  await page320Light.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page320Light.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page320Light.waitForTimeout(300);
  const footer320Light = await page320Light.$('footer');
  await footer320Light.screenshot({ path: path.join(artifactDir, 'screenshot-footer-320-light.png') });
  await page320Light.close();

  // 3. Tablet 768x1024 Dark
  const page768Dark = await browser.newPage({ viewport: { width: 768, height: 1024 }, colorScheme: 'dark' });
  await page768Dark.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page768Dark.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page768Dark.waitForTimeout(300);
  const footer768Dark = await page768Dark.$('footer');
  await footer768Dark.screenshot({ path: path.join(artifactDir, 'screenshot-footer-768-dark.png') });
  await page768Dark.close();

  // 4. Tablet 768x1024 Light
  const page768Light = await browser.newPage({ viewport: { width: 768, height: 1024 }, colorScheme: 'light' });
  await page768Light.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page768Light.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page768Light.waitForTimeout(300);
  const footer768Light = await page768Light.$('footer');
  await footer768Light.screenshot({ path: path.join(artifactDir, 'screenshot-footer-768-light.png') });
  await page768Light.close();

  await browser.close();
  console.log('All footer screenshots successfully captured!');
}

captureFooterScreenshots().catch(console.error);

