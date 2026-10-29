const { webkit, chromium } = require('playwright');

(async () => {
  for (const bType of [webkit, chromium]) {
    const browser = await bType.launch();
    const page = await browser.newPage();
    await page.setViewportSize({ width: 320, height: 800 });
    await page.goto('http://127.0.0.1:3005/', { waitUntil: 'networkidle' });

    console.log(`\n=== Testing Drawer on [${bType.name()}] at 320px ===`);

    // 1. Initial
    const initial = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    console.log('Initial state:', initial);

    // 2. Open drawer
    const menuBtn = page.locator('button[aria-label*="Menü"], button[aria-expanded]').first();
    await menuBtn.click();
    await page.waitForTimeout(450); // spring animation

    const drawerOpen = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const drawerRoot = document.querySelector('[class*="fixed inset-0 z-50"]');
      const drawerPanel = drawerRoot ? drawerRoot.querySelector('[class*="max-w-[310px]"], [class*="relative z-10"]') : null;
      const rect = drawerPanel ? drawerPanel.getBoundingClientRect() : null;

      // test horizontal scrolling
      window.scrollTo(100, 0);
      const scrolledX = window.scrollX || doc.scrollLeft || 0;
      window.scrollTo(0, 0);

      return {
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        bodyOverflow: body.style.overflow,
        panelRect: rect ? { left: Math.round(rect.left), right: Math.round(rect.right), width: Math.round(rect.width) } : null,
        scrolledX,
      };
    });
    console.log('Drawer OPEN state:', drawerOpen);

    // 3. Close drawer
    await page.keyboard.press('Escape');
    await page.waitForTimeout(450); // exit animation

    const drawerClosed = await page.evaluate(() => {
      const doc = document.documentElement;
      const body = document.body;
      const drawerRoot = document.querySelector('[class*="fixed inset-0 z-50"]');

      window.scrollTo(100, 0);
      const scrolledX = window.scrollX || doc.scrollLeft || 0;
      window.scrollTo(0, 0);

      return {
        docScrollWidth: doc.scrollWidth,
        docClientWidth: doc.clientWidth,
        bodyScrollWidth: body.scrollWidth,
        bodyClientWidth: body.clientWidth,
        bodyOverflow: body.style.overflow,
        drawerStillInDOM: Boolean(drawerRoot),
        scrolledX,
      };
    });
    console.log('Drawer CLOSED state:', drawerClosed);

    await browser.close();
  }
})();

