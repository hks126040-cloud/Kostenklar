const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testDimensions() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';
  
  const viewports = [
    { name: 'small-mobile-320', width: 320, height: 512 },
    { name: 'iphone-se-375', width: 375, height: 667 },
    { name: 'iphone-14-390', width: 390, height: 844 },
    { name: 'tablet-portrait-768', width: 768, height: 1024 },
    { name: 'tablet-landscape-1024', width: 1024, height: 768 },
  ];

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const report = {};

  for (const vp of viewports) {
    console.log(`Testing viewport: ${vp.name} (${vp.width}x${vp.height})...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'light',
    });
    const page = await context.newPage();

    // Test Homepage
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const homeMetrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const header = document.querySelector('header');
      const logo = document.querySelector('header img:not(.hidden)');
      const cta = document.querySelector('header a[href*="rechner"]');
      const h1 = document.querySelector('h1');
      const wizard = document.querySelector('#rechner');

      return {
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        header: {
          height: header ? header.clientHeight : 0,
          logoWidth: logo ? logo.clientWidth : 0,
          logoHeight: logo ? logo.clientHeight : 0,
          ctaWidth: cta ? cta.clientWidth : 0,
          ctaHeight: cta ? cta.clientHeight : 0,
          ctaLines: cta ? cta.getClientRects().length : 0,
        },
        h1: {
          fontSize: h1 ? window.getComputedStyle(h1).fontSize : 0,
          text: h1 ? h1.textContent.trim().substring(0, 30) + '...' : null,
        },
      };
    });

    const homeScreenshot = path.join(artifactDir, `vp-${vp.name}-home.png`);
    await page.screenshot({ path: homeScreenshot, fullPage: false });

    // Test the specific subpage from the user's screenshot: /wohnungsaufloesung-nach-todesfall
    await page.goto('http://localhost:3000/wohnungsaufloesung-nach-todesfall', { waitUntil: 'networkidle' });

    const articleMetrics = await page.evaluate(() => {
      const doc = document.documentElement;
      const ctaButton = document.querySelector('a[href*="rechner"].bg-cta, a[href*="rechner"]');
      const table = document.querySelector('table');

      return {
        hasHorizontalOverflow: doc.scrollWidth > doc.clientWidth,
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        compactCtaButton: ctaButton ? {
          width: ctaButton.clientWidth,
          height: ctaButton.clientHeight,
          text: ctaButton.innerText.trim(),
        } : null,
        tableWidth: table ? table.clientWidth : 0,
      };
    });

    const articleScreenshot = path.join(artifactDir, `vp-${vp.name}-article.png`);
    await page.screenshot({ path: articleScreenshot, fullPage: false });

    report[vp.name] = {
      viewport: vp,
      homepage: homeMetrics,
      article: articleMetrics,
    };

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(artifactDir, 'dimensions-audit.json'),
    JSON.stringify(report, null, 2)
  );

  console.log('\n=== AUDIT RESULTS ===');
  console.log(JSON.stringify(report, null, 2));
}

testDimensions().catch(console.error);

