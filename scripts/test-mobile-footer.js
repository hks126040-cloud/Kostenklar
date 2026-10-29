const { chromium } = require('playwright');
const path = require('path');

async function testMobileFooter() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const page = await browser.newPage({ viewport: { width: 375, height: 812 }, colorScheme: 'dark' });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  // Scroll directly so footer is completely in view below header
  await page.evaluate(() => {
    const footer = document.querySelector('footer');
    footer.scrollIntoView({ behavior: 'instant', block: 'start' });
    // Offset by header height
    window.scrollBy(0, -60);
  });
  await page.waitForTimeout(300);

  const cleanMobileImg = path.join(artifactDir, 'screenshot-footer-mobile-clean.png');
  await page.screenshot({ path: cleanMobileImg });
  console.log('Clean mobile footer screenshot saved to:', cleanMobileImg);

  await browser.close();
}

testMobileFooter().catch(console.error);

