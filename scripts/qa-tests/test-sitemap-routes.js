const { webkit } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://127.0.0.1:3005';
const ARTIFACT_DIR = 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/ios-safari-qa';

const ROUTES = [
  '/',
  '/entruempelung-kosten-pro-qm',
  '/wohnung-entruempeln-kosten',
  '/wohnungsaufloesung-kosten',
  '/entruempelung-steuerlich-absetzbar',
  '/haus-entruempeln-kosten',
  '/keller-entruempeln-kosten',
  '/container-entruempelung-kosten',
  '/messie-wohnung-entruempeln-kosten',
  '/wohnungsaufloesung-nach-todesfall',
  '/impressum',
  '/datenschutz',
  '/kontakt',
  '/danke',
  '/page-that-does-not-exist-404',
  '/?flaeche=65&zimmer=3&etage=2&aufzug=ja&keller=ja&zustand=normal&plz=50667',
];

const DEVICES = [
  { name: 'iPhone SE (320px)', width: 320, height: 568 },
  { name: 'iPhone 13 (390px)', width: 390, height: 844 },
  { name: 'iPhone 14 Pro Max (430px)', width: 430, height: 932 },
  { name: 'iPhone 13 Landscape (844px)', width: 844, height: 390 },
];

(async () => {
  console.log('--- STARTING ROUTE & LAYOUT AUDIT WITH PLAYWRIGHT WEBKIT ---');
  const browser = await webkit.launch();
  const report = [];

  for (const device of DEVICES) {
    for (const colorScheme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: device.width, height: device.height },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        colorScheme,
      });

      for (const route of ROUTES) {
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];

        page.on('console', msg => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', err => pageErrors.push(err.message));

        try {
          const res = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 15000 });
          const status = res ? res.status() : 0;

          // Check horizontal overflow
          const overflow = await page.evaluate(() => {
            const body = document.body;
            const doc = document.documentElement;
            const scrollW = Math.max(body.scrollWidth, doc.scrollWidth);
            const clientW = Math.min(body.clientWidth, doc.clientWidth);
            return {
              hasOverflow: scrollW > clientW + 1,
              scrollWidth: scrollW,
              clientWidth: clientW,
            };
          });

          // Check broken images
          const brokenImages = await page.evaluate(() => {
            const imgs = Array.from(document.querySelectorAll('img'));
            return imgs
              .filter(img => !img.complete || img.naturalWidth === 0)
              .map(img => img.src);
          });

          const is404Route = route.includes('404');
          const passStatus = is404Route ? status === 404 : status === 200;

          const result = {
            device: device.name,
            colorScheme,
            route,
            status,
            passStatus,
            hasOverflow: overflow.hasOverflow,
            scrollWidth: overflow.scrollWidth,
            clientWidth: overflow.clientWidth,
            consoleErrors,
            pageErrors,
            brokenImages,
          };

          report.push(result);

          if (!passStatus || overflow.hasOverflow || consoleErrors.length > 0 || pageErrors.length > 0 || brokenImages.length > 0) {
            console.log(`[FLAG] ${device.name} (${colorScheme}) on ${route}: status=${status}, overflow=${overflow.hasOverflow}, errs=${consoleErrors.length + pageErrors.length}, brokenImgs=${brokenImages.length}`);
          }
        } catch (err) {
          console.error(`[EXCEPTION] ${device.name} on ${route}:`, err.message);
          report.push({
            device: device.name,
            colorScheme,
            route,
            error: err.message,
          });
        } finally {
          await page.close();
        }
      }
      await context.close();
    }
  }

  await browser.close();

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'route-audit-results.json'),
    JSON.stringify(report, null, 2),
    'utf-8'
  );
  console.log('--- COMPLETED ROUTE & LAYOUT AUDIT. Saved results to route-audit-results.json ---');
})();

