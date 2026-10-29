const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve('C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/mobile-spacing-audit');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const ROUTES = [
  '/',
  '/entruempelung-kosten-pro-qm',
  '/wohnung-entruempeln-kosten',
  '/wohnungsaufloesung-kosten',
  '/haus-entruempeln-kosten',
  '/keller-entruempeln-kosten',
  '/container-entruempelung-kosten',
  '/messie-wohnung-entruempeln-kosten',
  '/wohnungsaufloesung-nach-todesfall',
  '/entruempelung-steuerlich-absetzbar',
  '/entruempelung-koeln-kosten',
  '/entruempelung-muenchen-kosten',
  '/entruempelung-berlin-kosten',
  '/impressum',
  '/datenschutz',
  '/kontakt',
  '/danke',
];

const VIEWPORTS = [
  { width: 320, height: 800, label: '320px' },
  { width: 360, height: 800, label: '360px' },
  { width: 375, height: 800, label: '375px' },
  { width: 390, height: 800, label: '390px' },
  { width: 430, height: 800, label: '430px' },
];

const THEMES = ['light', 'dark'];

async function runAudit() {
  console.log('Starting Playwright Mobile Spacing Audit on http://localhost:3000...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });
  const allFindings = [];

  for (const vp of VIEWPORTS) {
    for (const theme of THEMES) {
      console.log(`\nTesting Viewport ${vp.label} | Theme: ${theme}`);
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme,
      });
      const page = await context.newPage();

      for (const route of ROUTES) {
        const url = `http://localhost:3000${route}`;
        try {
          await page.goto(url, { waitUntil: 'domcontentloaded' });
          await page.waitForTimeout(100);

          // If dark theme, ensure html has dark class
          if (theme === 'dark') {
            await page.evaluate(() => document.documentElement.classList.add('dark'));
          } else {
            await page.evaluate(() => document.documentElement.classList.remove('dark'));
          }

          // Filename for screenshot
          const safeRoute = route === '/' ? 'home' : route.replace(/\//g, '-').replace(/^-/, '');
          const screenshotName = `screenshot-${safeRoute}-${vp.label}-${theme}.png`;
          const screenshotPath = path.join(OUTPUT_DIR, screenshotName);

          // Take full-page screenshot
          await page.screenshot({ path: screenshotPath, fullPage: true });

          // Run DOM measurement audit
          const pageIssues = await page.evaluate((currentVp) => {
            const issues = [];
            const root = document.documentElement;
            const clientWidth = root.clientWidth;

            // 1. Check for horizontal overflow
            const scrollWidth = root.scrollWidth;
            if (scrollWidth > clientWidth + 1) {
              const all = Array.from(document.querySelectorAll('*'));
              for (const el of all) {
                const rect = el.getBoundingClientRect();
                if (rect.right > clientWidth + 2) {
                  issues.push({
                    type: 'horizontal-scroll',
                    element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').slice(0, 3).join('.') : ''),
                    measured: `Element right edge (${Math.round(rect.right)}px) > viewport width (${clientWidth}px)`,
                    severity: 'High',
                  });
                  break;
                }
              }
            }

            // 2. Measure parent paddings and child gaps
            const allElements = Array.from(document.querySelectorAll('main, section, article, div, form, ul, table'));
            for (const el of allElements) {
              const style = window.getComputedStyle(el);
              const pTop = parseFloat(style.paddingTop);
              const pBottom = parseFloat(style.paddingBottom);
              const pLeft = parseFloat(style.paddingLeft);
              const pRight = parseFloat(style.paddingRight);

              const isCard =
                style.borderRadius &&
                parseFloat(style.borderRadius) > 0 &&
                (parseFloat(style.borderWidth) > 0 ||
                  (style.boxShadow && style.boxShadow !== 'none') ||
                  (style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)'));

              // Card padding > 20px on mobile
              if (isCard && (pTop > 20 || pLeft > 20 || pRight > 20 || pBottom > 20)) {
                if (el.tagName !== 'BODY' && el.tagName !== 'HTML') {
                  issues.push({
                    type: 'card-padding-excessive',
                    element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').slice(0, 3).join('.') : ''),
                    measured: `Padding Top: ${pTop}px, Right: ${pRight}px, Bottom: ${pBottom}px, Left: ${pLeft}px`,
                    severity: pTop >= 24 || pLeft >= 24 ? 'High' : 'Medium',
                  });
                }
              }

              // Distance between consecutive children
              const children = Array.from(el.children).filter((c) => {
                const cStyle = window.getComputedStyle(c);
                return (
                  cStyle.display !== 'none' &&
                  cStyle.position !== 'absolute' &&
                  cStyle.position !== 'fixed' &&
                  c.offsetHeight > 0
                );
              });

              for (let i = 0; i < children.length - 1; i++) {
                const c1 = children[i];
                const c2 = children[i + 1];
                const r1 = c1.getBoundingClientRect();
                const r2 = c2.getBoundingClientRect();

                const vDistance = r2.top - r1.bottom;
                if (vDistance > 24) {
                  const isIntentionalSection = el.tagName === 'MAIN' || c1.tagName === 'SECTION' || c2.tagName === 'SECTION';
                  // Flag if not a deliberate section break or if it's excessively large (> 48px)
                  if (!isIntentionalSection || vDistance > 48) {
                    issues.push({
                      type: 'child-gap-excessive',
                      element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''),
                      child1: c1.tagName.toLowerCase() + (c1.className ? '.' + c1.className.split(' ').slice(0, 2).join('.') : ''),
                      child2: c2.tagName.toLowerCase() + (c2.className ? '.' + c2.className.split(' ').slice(0, 2).join('.') : ''),
                      measured: `Vertical gap between siblings: ${Math.round(vDistance)}px`,
                      severity: vDistance >= 40 ? 'High' : 'Medium',
                    });
                  }
                }
              }

              // Detect double spacing (parent padding + child margin)
              if (children.length > 0) {
                const firstChild = children[0];
                const fcStyle = window.getComputedStyle(firstChild);
                const fcMarginTop = parseFloat(fcStyle.marginTop);
                if (pTop > 0 && fcMarginTop > 8) {
                  issues.push({
                    type: 'double-spacing-top',
                    element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''),
                    child: firstChild.tagName.toLowerCase() + (firstChild.className ? '.' + firstChild.className.split(' ').slice(0, 2).join('.') : ''),
                    measured: `Parent paddingTop ${pTop}px + Child marginTop ${fcMarginTop}px = ${pTop + fcMarginTop}px`,
                    severity: 'High',
                  });
                }
              }

              // Detect zero-height wrappers taking space
              if (el.offsetHeight === 0 && (parseFloat(style.marginTop) > 0 || parseFloat(style.marginBottom) > 0)) {
                issues.push({
                  type: 'zero-height-spacer',
                  element: el.tagName.toLowerCase() + (el.className ? '.' + el.className.split(' ').slice(0, 2).join('.') : ''),
                  measured: `0px height with margin: ${style.marginTop} top / ${style.marginBottom} bottom`,
                  severity: 'Medium',
                });
              }
            }

            return issues;
          }, vp);

          if (pageIssues.length > 0) {
            allFindings.push({
              route,
              viewport: vp.label,
              theme,
              screenshot: screenshotName,
              issues: pageIssues,
            });
          }
        } catch (e) {
          console.error(`Error on ${route} [${vp.label}, ${theme}]:`, e.message);
        }
      }

      // Also specifically test the Calculator Wizard Result View & LeadForm
      try {
        const wizardUrl = 'http://localhost:3000/?flaeche=60&zimmer=2&etage=1&aufzug=false&fuellgrad=normal&plz=10115#rechner';
        await page.goto(wizardUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(300);

        // Click to open LeadForm
        const anfordernBtn = await page.$('button:has-text("Kostenlose Angebote anfordern")');
        if (anfordernBtn) {
          await anfordernBtn.click();
          await page.waitForTimeout(200);
        }

        const calcScreenshot = `screenshot-calculator-result-${vp.label}-${theme}.png`;
        await page.screenshot({ path: path.join(OUTPUT_DIR, calcScreenshot), fullPage: true });

        const calcIssues = await page.evaluate(() => {
          const issues = [];
          const cards = Array.from(document.querySelectorAll('.rounded-2xl, .rounded-xl, .rounded-3xl'));
          for (const card of cards) {
            const style = window.getComputedStyle(card);
            const pTop = parseFloat(style.paddingTop);
            const pLeft = parseFloat(style.paddingLeft);
            if (pTop > 20 || pLeft > 20) {
              issues.push({
                type: 'card-padding-excessive',
                element: card.tagName.toLowerCase() + (card.className ? '.' + card.className.split(' ').slice(0, 3).join('.') : ''),
                measured: `Padding Top: ${pTop}px, Left: ${pLeft}px`,
                severity: 'High',
              });
            }
          }
          return issues;
        });

        if (calcIssues.length > 0) {
          allFindings.push({
            route: '/#rechner-result',
            viewport: vp.label,
            theme,
            screenshot: calcScreenshot,
            issues: calcIssues,
          });
        }
      } catch (e) {
        console.error(`Error on calculator result [${vp.label}, ${theme}]:`, e.message);
      }

      await context.close();
    }
  }

  await browser.close();

  // Save JSON report
  const reportPath = path.join(OUTPUT_DIR, 'mobile-spacing-findings.json');
  fs.writeFileSync(reportPath, JSON.stringify(allFindings, null, 2));
  console.log(`\nAudit complete! Findings saved to ${reportPath}`);
  console.log(`Total inspection snapshots captured: ${allFindings.length}`);
}

runAudit().catch(console.error);
