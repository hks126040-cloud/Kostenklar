const fs = require('fs');
const path = require('path');

const RAW_FILE = path.join(__dirname, '../../overflow-audit-results/overflow-findings-raw.json');

function analyze() {
  if (!fs.existsSync(RAW_FILE)) {
    console.error('Raw findings file does not exist yet.');
    return;
  }

  const rawData = JSON.parse(fs.readFileSync(RAW_FILE, 'utf-8'));
  console.log(`Analyzing ${rawData.length} recorded state evaluations with potential issues...`);

  // Group by Route, Width, State
  const tableRows = [];

  rawData.forEach(item => {
    // If doc actually had overflow (scrollWidth > clientWidth) or canScrollX
    if (item.hasDocOverflow || item.canScrollX) {
      tableRows.push({
        browser: item.browser,
        route: item.route,
        width: item.width,
        scheme: item.scheme,
        state: item.state,
        overflowPx: item.overflowPx,
        scrolledAmount: item.scrolledAmount,
        topOffenders: item.overflowingElements,
      });
    }
  });

  console.log(`Total confirmed horizontal page scroll issues: ${tableRows.length}`);
  console.log(JSON.stringify(tableRows.slice(0, 10), null, 2));
}

analyze();

