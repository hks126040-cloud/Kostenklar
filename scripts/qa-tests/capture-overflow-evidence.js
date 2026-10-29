const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '../../overflow-audit-results/evidence');
fs.mkdirSync(OUT_DIR, { recursive: true });

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // 1. Evidence 1: /datenschutz at 320px (H1 overflow)
  await page.setViewportSize({ width: 320, height: 600 });
  await page.goto('http://127.0.0.1:3005/datenschutz', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT_DIR, 'evidence-1-datenschutz-h1-320px.png'), fullPage: false });

  // 2. Evidence 2: Footer link overflow at 320px
  await page.goto('http://127.0.0.1:3005/', { waitUntil: 'networkidle' });
  const footer = page.locator('footer').first();
  await footer.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(OUT_DIR, 'evidence-2-footer-links-320px.png'), fullPage: false });

  // 3. Evidence 3: Drawer panel at 320px
  await page.goto('http://127.0.0.1:3005/', { waitUntil: 'networkidle' });
  const menuBtn = page.locator('button[aria-label*="Menü"], button[aria-expanded]').first();
  await menuBtn.click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(OUT_DIR, 'evidence-3-drawer-open-320px.png'), fullPage: false });

  await browser.close();
  console.log('Saved overflow visual evidence to:', OUT_DIR);
})();

