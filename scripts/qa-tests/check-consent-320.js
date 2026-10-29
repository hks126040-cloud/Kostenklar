const { webkit } = require('playwright');
const path = require('path');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage({ viewport: { width: 320, height: 568 } });
  await page.goto('http://127.0.0.1:3005/?flaeche=60&zimmer=2&etage=1&plz=50667', { waitUntil: 'networkidle' });
  await page.click('button:has-text("Kostenlose Angebote anfordern")');
  await page.waitForTimeout(400);

  const consentMetrics = await page.evaluate(() => {
    const label = document.querySelector('label:has(#lead-consent)') || document.querySelector('#lead-consent')?.parentElement;
    if (!label) return null;
    const style = window.getComputedStyle(label);
    const rect = label.getBoundingClientRect();
    const docW = document.documentElement.clientWidth;
    return {
      fontSize: style.fontSize,
      width: Math.round(rect.width),
      right: Math.round(rect.right),
      docW,
      overflows: rect.right > docW,
    };
  });
  // Scroll down to the form inputs
  const formHeading = page.locator('text=Vergleichsangebote anfordern');
  if (await formHeading.isVisible()) {
    await formHeading.scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/ios-safari-qa/lead-form-scrolled-320px.png' });
  console.log('Saved lead-form-scrolled-320px.png');
  await browser.close();
})();
