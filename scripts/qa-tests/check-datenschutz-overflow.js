const { webkit, chromium } = require('playwright');
const path = require('path');

(async () => {
  for (const bType of [webkit, chromium]) {
    const browser = await bType.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('http://127.0.0.1:3005/datenschutz', { waitUntil: 'networkidle' });

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const h1Rect = await page.locator('h1').first().evaluate(el => {
      const r = el.getBoundingClientRect();
      const s = window.getComputedStyle(el);
      return {
        text: el.innerText,
        width: Math.round(r.width),
        right: Math.round(r.right),
        fontSize: s.fontSize,
        fontFamily: s.fontFamily,
      };
    });

    console.log(`[${bType.name()}] /datenschutz at 320px:`);
    console.log(`  scrollWidth: ${scrollWidth}, clientWidth: ${clientWidth}, overflow: ${scrollWidth - clientWidth}px`);
    console.log(`  h1 text: "${h1Rect.text}", width: ${h1Rect.width}px, right: ${h1Rect.right}px`);

    await browser.close();
  }
})();

