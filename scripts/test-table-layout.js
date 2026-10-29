const { webkit } = require('playwright');

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 320, height: 600 });
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: sans-serif; }
        body { padding: 16px; background: #f8fafc; }
        .table-wrap { border: 1px solid #e2e8f0; border-radius: 12px; background: white; overflow: hidden; }
        table { width: 100%; border-collapse: collapse; display: block; }
        caption { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); }
        thead { display: none; }
        tbody { display: block; }
        tr {
          display: grid;
          grid-template-columns: 1fr auto;
          align-items: center;
          padding: 12px 14px;
          gap: 4px 12px;
          border-bottom: 1px solid #e2e8f0;
        }
        tr:last-child { border-bottom: none; }
        .type { grid-column: 1; grid-row: 1; font-weight: 600; font-size: 14px; color: #0f172a; }
        .size { grid-column: 1; grid-row: 2; font-size: 12px; color: #64748b; }
        .price { grid-column: 2; grid-row: 1 / span 2; font-weight: 700; font-size: 14px; color: #1e4fd8; text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .extra { display: none; }
      </style>
    </head>
    <body>
      <div class="table-wrap">
        <table>
          <caption>Preisübersicht</caption>
          <thead>
            <tr><th>Typ</th><th>Fläche</th><th>Preis</th><th>pro m²</th></tr>
          </thead>
          <tbody>
            <tr>
              <td class="type">1-Zimmer-Wohnung</td>
              <td class="size">30 – 40 m²</td>
              <td class="price">850 € – 1.600 €</td>
              <td class="extra">25 € – 40 € / m²</td>
            </tr>
            <tr>
              <td class="type">Haus mit Keller & Dachboden</td>
              <td class="size">150 – 220 m²</td>
              <td class="price">4.500 € – 8.500 €</td>
              <td class="extra">25 € – 42 € / m²</td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    </html>
  `;
  await page.setContent(html);
  await page.screenshot({ path: 'test-table-320px.png' });
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log('Scroll width:', scrollWidth, 'Client width:', clientWidth, 'Matches:', scrollWidth === clientWidth);
  await browser.close();
})();

