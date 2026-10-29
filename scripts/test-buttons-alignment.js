const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function testButtonsAndAlignment() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const viewports = [
    { name: '320x512', width: 320, height: 512 },
    { name: '375x667', width: 375, height: 667 },
    { name: '768x1024', width: 768, height: 1024 },
  ];

  const results = {};

  for (const vp of viewports) {
    console.log(`Checking viewport ${vp.name}...`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'light',
    });
    const page = await context.newPage();

    // 1. Check Article Page (/wohnungsaufloesung-nach-todesfall)
    await page.goto('http://localhost:3000/wohnungsaufloesung-nach-todesfall', { waitUntil: 'networkidle' });

    const articleInspection = await page.evaluate(() => {
      const header = document.querySelector('header');
      const headerLogo = document.querySelector('header img:not(.hidden)');
      const headerCta = document.querySelector('header a[href*="rechner"]');
      const headerMenuBtn = document.querySelector('header button[aria-label*="Menü"]');

      const cardCta = document.querySelector('main a[href*="rechner"]');

      const getDetails = (el) => {
        if (!el) return null;
        const s = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          text: el.innerText.trim(),
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          paddingTop: s.paddingTop,
          paddingBottom: s.paddingBottom,
          paddingLeft: s.paddingLeft,
          paddingRight: s.paddingRight,
          marginTop: s.marginTop,
          marginBottom: s.marginBottom,
          renderedWidth: Math.round(rect.width),
          renderedHeight: Math.round(rect.height),
          rectTop: Math.round(rect.top),
          rectLeft: Math.round(rect.left),
        };
      };

      return {
        headerHeight: header ? header.clientHeight : 0,
        headerLogo: getDetails(headerLogo),
        headerCta: getDetails(headerCta),
        headerMenuBtn: getDetails(headerMenuBtn),
        cardCtaButton: getDetails(cardCta),
      };
    });

    const articleScreenshot = path.join(artifactDir, `verify-btn-${vp.name}-article.png`);
    await page.screenshot({ path: articleScreenshot, fullPage: false });

    // 2. Check Homepage Wizard
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

    const wizardInspection = await page.evaluate(() => {
      const step0NextBtn = document.querySelector('#rechner button.bg-cta');
      const buttons = Array.from(document.querySelectorAll('#rechner button'));
      const presetChip = buttons.find(b => b.textContent.includes('45 m²'));
      const roomBtn = buttons.find(b => b.textContent.includes('2 Zi.'));

      const getDetails = (el) => {
        if (!el) return null;
        const s = window.getComputedStyle(el);
        const rect = el.getBoundingClientRect();
        return {
          text: el.innerText.trim(),
          fontSize: s.fontSize,
          fontWeight: s.fontWeight,
          renderedWidth: Math.round(rect.width),
          renderedHeight: Math.round(rect.height),
          padding: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
        };
      };

      return {
        step0NextBtn: getDetails(step0NextBtn),
        presetChip: getDetails(presetChip),
        roomBtn: getDetails(roomBtn),
      };
    });

    const homeScreenshot = path.join(artifactDir, `verify-btn-${vp.name}-home.png`);
    await page.screenshot({ path: homeScreenshot, fullPage: false });

    results[vp.name] = {
      article: articleInspection,
      wizard: wizardInspection,
    };

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(artifactDir, 'button-verification-audit.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=== BUTTON & ALIGNMENT AUDIT COMPLETE ===');
  console.log(JSON.stringify(results, null, 2));
}

testButtonsAndAlignment().catch(console.error);
