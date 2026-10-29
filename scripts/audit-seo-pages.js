const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const pagesToAudit = [
  { path: '/', expectedKeyword: 'entrümpelung kosten rechner' },
  { path: '/entruempelung-kosten-pro-qm', expectedKeyword: 'entrümpelung kosten pro qm' },
  { path: '/wohnung-entruempeln-kosten', expectedKeyword: 'wohnung entrümpeln kosten' },
  { path: '/wohnungsaufloesung-kosten', expectedKeyword: 'wohnungsauflösung kosten' },
  { path: '/haus-entruempeln-kosten', expectedKeyword: 'haus entrümpeln kosten' },
  { path: '/keller-entruempeln-kosten', expectedKeyword: 'keller entrümpeln kosten' },
  { path: '/container-entruempelung-kosten', expectedKeyword: 'container entrümpelung kosten' },
  { path: '/messie-wohnung-entruempeln-kosten', expectedKeyword: 'messie wohnung entrümpeln kosten' },
  { path: '/wohnungsaufloesung-nach-todesfall', expectedKeyword: 'todesfall' },
  { path: '/entruempelung-steuerlich-absetzbar', expectedKeyword: 'steuerlich absetzbar' },
  { path: '/entruempelung-koeln-kosten', expectedKeyword: 'köln' },
  { path: '/impressum', expectedKeyword: 'impressum' },
  { path: '/datenschutz', expectedKeyword: 'datenschutz' },
  { path: '/kontakt', expectedKeyword: 'kontakt' },
];

async function runAudit() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  const results = [];

  for (const pageInfo of pagesToAudit) {
    const page = await browser.newPage();
    await page.goto(`http://localhost:3000${pageInfo.path}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(150);

    const auditData = await page.evaluate((expectedKeyword) => {
      const h1Elements = Array.from(document.querySelectorAll('h1')).map(h => h.textContent.trim());
      const title = document.title || '';
      const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const lang = document.documentElement.getAttribute('lang') || '';
      const text = document.body.innerText || '';
      const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

      return {
        title,
        titleLength: title.length,
        metaDesc,
        metaDescLength: metaDesc.length,
        h1Count: h1Elements.length,
        h1Text: h1Elements[0] || 'NONE',
        canonical,
        lang,
        wordCount,
      };
    }, pageInfo.expectedKeyword);

    results.push({
      path: pageInfo.path,
      ...auditData,
    });

    await page.close();
  }

  await browser.close();

  console.log(JSON.stringify(results, null, 2));

  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';
  fs.writeFileSync(path.join(artifactDir, 'page-seo-audit.json'), JSON.stringify(results, null, 2));
}

runAudit().catch(console.error);
