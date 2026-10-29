const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('http://127.0.0.1:3005/', { waitUntil: 'networkidle' });

  const menuBtn = page.locator('button[aria-label*="Menü"], button[aria-expanded]').first();
  await menuBtn.click();
  await page.waitForTimeout(400);

  // Now trigger close
  await page.keyboard.press('Escape');
  for (const t of [50, 150, 300, 500, 800]) {
    await page.waitForTimeout(t);
    const pos = await page.evaluate(() => {
      const panel = document.querySelector('[class*="max-w-[310px]"], [class*="relative z-10"]');
      if (!panel) return { mounted: false };
      const r = panel.getBoundingClientRect();
      const style = window.getComputedStyle(panel);
      return {
        mounted: true,
        left: Math.round(r.left),
        right: Math.round(r.right),
        transform: style.transform,
        docScrollWidth: document.documentElement.scrollWidth,
      };
    });
    console.log(`After +${t}ms:`, pos);
  }
  await browser.close();
})();

