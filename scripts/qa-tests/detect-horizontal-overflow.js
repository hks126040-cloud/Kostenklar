const { webkit, chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://127.0.0.1:3005';

const ROUTES = [
  '/',
  '/?area=75&type=wohnung&floor=2&distance=10&waste=normal&urgency=normal',
  '/container-entruempelung-kosten',
  '/entruempelung-kosten-pro-qm',
  '/entruempelung-steuerlich-absetzbar',
  '/haus-entruempeln-kosten',
  '/keller-entruempeln-kosten',
  '/messie-wohnung-entruempeln-kosten',
  '/wohnung-entruempeln-kosten',
  '/wohnungsaufloesung-kosten',
  '/wohnungsaufloesung-nach-todesfall',
  '/impressum',
  '/datenschutz',
  '/kontakt',
  '/danke',
  '/this-page-does-not-exist',
  '/entruempelung-berlin-kosten',
  '/entruempelung-frankfurt-kosten',
  '/entruempelung-hamburg-kosten',
  '/entruempelung-koeln-kosten',
  '/entruempelung-muenchen-kosten',
];

const WIDTHS = [320, 360, 375, 390, 430];
const SCHEMES = ['light', 'dark'];

const OUT_DIR = path.join(__dirname, '../../overflow-audit-results');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function measurePageState(page, route, width, scheme, stateName, browserName) {
  // Check horizontal scrolling by attempting window.scrollTo(100, 0)
  const measurements = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;
    const initialScrollX = window.scrollX || window.pageXOffset || doc.scrollLeft || 0;

    window.scrollTo(100, 0);
    const scrolledX = window.scrollX || window.pageXOffset || doc.scrollLeft || 0;
    window.scrollTo(0, 0);

    const docScrollWidth = doc.scrollWidth;
    const docClientWidth = doc.clientWidth;
    const bodyScrollWidth = body ? body.scrollWidth : 0;
    const bodyClientWidth = body ? body.clientWidth : 0;
    const innerWidth = window.innerWidth;

    // Scan for overflowing elements
    const overflowingElements = [];
    const all = document.querySelectorAll('*');

    for (const el of all) {
      // Skip svg inner elements (paths, rects inside svg)
      if (el instanceof SVGElement && el.tagName.toLowerCase() !== 'svg') continue;

      const style = window.getComputedStyle(el);
      if (style.display === 'none' || style.visibility === 'hidden') continue;

      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) continue;

      const overflowRight = Math.round(rect.right - innerWidth);
      const overflowLeft = Math.round(-rect.left);

      if (overflowRight > 1 || overflowLeft > 1) {
        // Collect identifying info
        const classStr = typeof el.className === 'string' ? el.className : (el.className?.baseVal || '');
        overflowingElements.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || undefined,
          className: classStr.slice(0, 120),
          textSnippet: (el.innerText || el.textContent || '').replace(/\s+/g, ' ').slice(0, 60).trim(),
          computedWidth: style.width,
          position: style.position,
          transform: style.transform !== 'none' ? style.transform : undefined,
          rect: {
            left: Math.round(rect.left),
            right: Math.round(rect.right),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          },
          overflowPx: Math.max(overflowRight, overflowLeft),
        });
      }
    }

    return {
      docScrollWidth,
      docClientWidth,
      bodyScrollWidth,
      bodyClientWidth,
      innerWidth,
      canScrollX: scrolledX > initialScrollX,
      scrolledAmount: scrolledX - initialScrollX,
      hasDocOverflow: docScrollWidth > docClientWidth,
      overflowPx: Math.max(0, docScrollWidth - docClientWidth),
      overflowingElements: overflowingElements.slice(0, 10), // top 10 elements
    };
  });

  return measurements;
}

async function runAudit() {
  console.log('=== STARTING DEEP HORIZONTAL OVERFLOW AUDIT ===');
  console.log(`Routes: ${ROUTES.length} | Widths: ${WIDTHS.join(', ')} | Schemes: ${SCHEMES.join(', ')}`);

  const allFindings = [];

  for (const browserType of [webkit, chromium]) {
    const browserName = browserType.name();
    console.log(`\n>>> Testing with Engine: ${browserName.toUpperCase()} <<<`);
    const browser = await browserType.launch();

    for (const scheme of SCHEMES) {
      console.log(`\n  Color Scheme: ${scheme.toUpperCase()}`);

      for (const width of WIDTHS) {
        process.stdout.write(`    Viewport ${width}px: `);
        const context = await browser.newContext({
          viewport: { width, height: 800 },
          colorScheme: scheme,
        });
        const page = await context.newPage();

        for (const route of ROUTES) {
          process.stdout.write('.');
          const url = `${BASE_URL}${route}`;

          try {
            await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
          } catch (e) {
            // Retry once
            try {
              await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });
            } catch (err) {
              console.error(`\nFailed loading ${url}:`, err.message);
              continue;
            }
          }

          // 1. DEFAULT STATE
          const defaultMeasurements = await measurePageState(page, route, width, scheme, 'default', browserName);
          if (defaultMeasurements.hasDocOverflow || defaultMeasurements.canScrollX || defaultMeasurements.overflowingElements.length > 0) {
            allFindings.push({
              browser: browserName,
              route,
              width,
              scheme,
              state: 'default',
              ...defaultMeasurements,
            });
          }

          // 2. DRAWER OPEN STATE
          const menuBtn = page.locator('button[aria-label*="Menü"], button[aria-expanded]').first();
          let drawerOpened = false;

          if (await menuBtn.isVisible()) {
            try {
              await menuBtn.click();
              await page.waitForTimeout(450); // wait for spring animation
              drawerOpened = true;

              const openMeasurements = await measurePageState(page, route, width, scheme, 'drawer open', browserName);
              if (openMeasurements.hasDocOverflow || openMeasurements.canScrollX || openMeasurements.overflowingElements.length > 0) {
                allFindings.push({
                  browser: browserName,
                  route,
                  width,
                  scheme,
                  state: 'drawer open',
                  ...openMeasurements,
                });
              }
            } catch (err) {
              // ignore click failures on non-standard pages
            }
          }

          // 3. DRAWER CLOSED STATE
          if (drawerOpened) {
            try {
              await page.keyboard.press('Escape');
              await page.waitForTimeout(450); // wait for exit animation

              const closedMeasurements = await measurePageState(page, route, width, scheme, 'drawer closed', browserName);
              if (closedMeasurements.hasDocOverflow || closedMeasurements.canScrollX || closedMeasurements.overflowingElements.length > 0) {
                allFindings.push({
                  browser: browserName,
                  route,
                  width,
                  scheme,
                  state: 'drawer closed',
                  ...closedMeasurements,
                });
              }
            } catch (err) {
              // ignore
            }
          }
        }

        await context.close();
        console.log(' Done');
      }
    }

    await browser.close();
  }

  // Save raw findings
  const outPath = path.join(OUT_DIR, 'overflow-findings-raw.json');
  fs.writeFileSync(outPath, JSON.stringify(allFindings, null, 2));
  console.log(`\nAudit completed! Total overflow occurrences detected: ${allFindings.length}`);
  console.log(`Findings saved to: ${outPath}`);
}

runAudit().catch(console.error);

