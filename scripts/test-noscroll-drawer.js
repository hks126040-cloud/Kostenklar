const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testNoScroll() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // Test 1: Dark Mode on 320x512 (Exact screen from user screenshot)
  console.log('Testing 320x512 Dark Mode No-Scroll Drawer...');
  const contextDark = await browser.newContext({
    viewport: { width: 320, height: 512 },
    colorScheme: 'dark',
  });
  const pageDark = await contextDark.newPage();
  await pageDark.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Open drawer
  const hamburgerDark = await pageDark.$('header button[aria-label*="Menü"]');
  await hamburgerDark.click();
  await pageDark.waitForTimeout(300);

  const metricsDark = await pageDark.evaluate(() => {
    const drawerPanel = document.querySelector('.fixed.z-50 .relative.z-10');
    const footer = drawerPanel ? drawerPanel.querySelector('.shrink-0.border-t') : null;
    const footerRect = footer ? footer.getBoundingClientRect() : null;

    return {
      panelClientHeight: drawerPanel ? drawerPanel.clientHeight : 0,
      panelScrollHeight: drawerPanel ? drawerPanel.scrollHeight : 0,
      hasVerticalScroll: drawerPanel ? drawerPanel.scrollHeight > drawerPanel.clientHeight : false,
      footerFullyVisible: footerRect ? (footerRect.bottom <= 512 && footerRect.top >= 0) : false,
      footerRect,
    };
  });

  const darkImg = path.join(artifactDir, 'screenshot-noscroll-drawer-320x512-dark.png');
  await pageDark.screenshot({ path: darkImg, fullPage: false });
  console.log('Saved Dark No-Scroll Drawer screenshot to:', darkImg);
  await contextDark.close();

  // Test 2: Light Mode on 320x512
  console.log('Testing 320x512 Light Mode No-Scroll Drawer...');
  const contextLight = await browser.newContext({
    viewport: { width: 320, height: 512 },
    colorScheme: 'light',
  });
  const pageLight = await contextLight.newPage();
  await pageLight.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  const hamburgerLight = await pageLight.$('header button[aria-label*="Menü"]');
  await hamburgerLight.click();
  await pageLight.waitForTimeout(300);

  const lightImg = path.join(artifactDir, 'screenshot-noscroll-drawer-320x512-light.png');
  await pageLight.screenshot({ path: lightImg, fullPage: false });
  console.log('Saved Light No-Scroll Drawer screenshot to:', lightImg);
  await contextLight.close();

  await browser.close();

  console.log('\n=== NO-SCROLL METRICS ===');
  console.log(JSON.stringify(metricsDark, null, 2));

  fs.writeFileSync(
    path.join(artifactDir, 'noscroll-drawer-audit.json'),
    JSON.stringify(metricsDark, null, 2)
  );
}

testNoScroll().catch(console.error);

