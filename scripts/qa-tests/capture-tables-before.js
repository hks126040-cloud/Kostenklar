const { webkit } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '../../table-audit-screenshots/before');
fs.mkdirSync(OUT_DIR, { recursive: true });

const viewports = [320, 360, 375, 390, 430];

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Capturing BEFORE screenshots on http://127.0.0.1:3005 ...');

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 800 });

    // 1. Homepage price table
    await page.goto('http://127.0.0.1:3005/#preistabelle', { waitUntil: 'networkidle' });
    const priceTableWrap = page.locator('#preistabelle div.overflow-x-auto').first();
    if (await priceTableWrap.count() > 0) {
      await priceTableWrap.screenshot({ path: path.join(OUT_DIR, `home-price-table-${width}px.png`) });
    }

    // 2. Homepage comparison table
    const compTableWrap = page.locator('section:has(table):has-text("Selbst entrümpeln vs. Fachfirma") div.overflow-x-auto').first();
    if (await compTableWrap.count() > 0) {
      await compTableWrap.screenshot({ path: path.join(OUT_DIR, `home-comparison-table-${width}px.png`) });
    }

    // 3. Pro-qm price table
    await page.goto('http://127.0.0.1:3005/entruempelung-kosten-pro-qm', { waitUntil: 'networkidle' });
    const qmTableWrap = page.locator('div.overflow-x-auto:has(table)').first();
    if (await qmTableWrap.count() > 0) {
      await qmTableWrap.screenshot({ path: path.join(OUT_DIR, `pro-qm-table-${width}px.png`) });
    }

    // 4. Steuerlich absetzbar table
    await page.goto('http://127.0.0.1:3005/entruempelung-steuerlich-absetzbar', { waitUntil: 'networkidle' });
    const taxTableWrap = page.locator('div.overflow-x-auto:has(table)').first();
    if (await taxTableWrap.count() > 0) {
      await taxTableWrap.screenshot({ path: path.join(OUT_DIR, `tax-table-${width}px.png`) });
    }

    console.log(`Captured BEFORE for ${width}px`);
  }

  await browser.close();
  console.log('All BEFORE screenshots saved to:', OUT_DIR);
})();

