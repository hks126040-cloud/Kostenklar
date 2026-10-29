const { webkit } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, '../../table-audit-screenshots/after');
fs.mkdirSync(OUT_DIR, { recursive: true });

const viewports = [320, 360, 375, 390, 430];

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('--- VERIFYING RESPONSIVE TABLES AT 320, 360, 375, 390, 430px ---');
  const results = [];

  for (const width of viewports) {
    await page.setViewportSize({ width, height: 800 });

    // 1. Homepage price table & comparison table
    await page.goto('http://127.0.0.1:3005/#preistabelle', { waitUntil: 'networkidle' });

    const homePriceWrap = page.locator('#preistabelle div').filter({ has: page.locator('table') }).first();
    const homeCompWrap = page.locator('section:has-text("Selbst entrümpeln vs. Fachfirma") div').filter({ has: page.locator('table') }).first();

    const homeScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const homeClientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    await homePriceWrap.screenshot({ path: path.join(OUT_DIR, `home-price-table-${width}px.png`) });
    await homeCompWrap.screenshot({ path: path.join(OUT_DIR, `home-comparison-table-${width}px.png`) });

    // 2. Pro-qm price table
    await page.goto('http://127.0.0.1:3005/entruempelung-kosten-pro-qm', { waitUntil: 'networkidle' });
    const qmTableWrap = page.locator('div').filter({ has: page.locator('table') }).first();
    const qmScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const qmClientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    await qmTableWrap.screenshot({ path: path.join(OUT_DIR, `pro-qm-table-${width}px.png`) });

    // 3. Container price table
    await page.goto('http://127.0.0.1:3005/container-entruempelung-kosten', { waitUntil: 'networkidle' });
    const containerTableWrap = page.locator('div').filter({ has: page.locator('table') }).first();
    const containerScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const containerClientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    await containerTableWrap.screenshot({ path: path.join(OUT_DIR, `container-table-${width}px.png`) });

    // 4. Tax table
    await page.goto('http://127.0.0.1:3005/entruempelung-steuerlich-absetzbar', { waitUntil: 'networkidle' });
    const taxTableWrap = page.locator('div').filter({ has: page.locator('table') }).first();
    const taxScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const taxClientWidth = await page.evaluate(() => document.documentElement.clientWidth);

    await taxTableWrap.screenshot({ path: path.join(OUT_DIR, `tax-table-${width}px.png`) });

    results.push({
      width,
      homepage: { scrollWidth: homeScrollWidth, clientWidth: homeClientWidth, hasOverflow: homeScrollWidth > homeClientWidth },
      proQm: { scrollWidth: qmScrollWidth, clientWidth: qmClientWidth, hasOverflow: qmScrollWidth > qmClientWidth },
      container: { scrollWidth: containerScrollWidth, clientWidth: containerClientWidth, hasOverflow: containerScrollWidth > containerClientWidth },
      tax: { scrollWidth: taxScrollWidth, clientWidth: taxClientWidth, hasOverflow: taxScrollWidth > taxClientWidth },
    });

    console.log(`Viewport ${width}px - Overflow check:`, {
      home: homeScrollWidth === homeClientWidth ? 'PASS (no scroll)' : 'FAIL',
      proQm: qmScrollWidth === qmClientWidth ? 'PASS (no scroll)' : 'FAIL',
      container: containerScrollWidth === containerClientWidth ? 'PASS (no scroll)' : 'FAIL',
      tax: taxScrollWidth === taxClientWidth ? 'PASS (no scroll)' : 'FAIL',
    });
  }

  // Also test DARK MODE at 375px
  console.log('\n--- TESTING DARK MODE AT 375px ---');
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.setViewportSize({ width: 375, height: 800 });

  await page.goto('http://127.0.0.1:3005/#preistabelle', { waitUntil: 'networkidle' });
  const darkPriceWrap = page.locator('#preistabelle div').filter({ has: page.locator('table') }).first();
  await darkPriceWrap.screenshot({ path: path.join(OUT_DIR, `home-price-table-375px-dark.png`) });

  const darkCompWrap = page.locator('section:has-text("Selbst entrümpeln vs. Fachfirma") div').filter({ has: page.locator('table') }).first();
  await darkCompWrap.screenshot({ path: path.join(OUT_DIR, `home-comparison-table-375px-dark.png`) });

  // Also test DESKTOP (1024px) to confirm desktop table is untouched
  console.log('\n--- TESTING DESKTOP AT 1024px ---');
  await page.emulateMedia({ colorScheme: 'light' });
  await page.setViewportSize({ width: 1024, height: 800 });
  await page.goto('http://127.0.0.1:3005/#preistabelle', { waitUntil: 'networkidle' });
  const desktopPriceWrap = page.locator('#preistabelle div').filter({ has: page.locator('table') }).first();
  await desktopPriceWrap.screenshot({ path: path.join(OUT_DIR, `home-price-table-1024px-desktop.png`) });

  await browser.close();

  fs.writeFileSync(
    path.join(__dirname, '../../table-audit-screenshots/verification-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\nVerification complete! All results saved.');
})();

