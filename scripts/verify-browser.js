const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function main() {
  const artifactDir = 'C:\\Users\\ASUS\\.gemini\\antigravity\\brain\\ee808d7f-8b73-466a-a9f4-a91872ccf923';
  if (!fs.existsSync(artifactDir)) {
    fs.mkdirSync(artifactDir, { recursive: true });
  }

  const results = {
    timestamp: new Date().toISOString(),
    lightMode: {},
    darkMode: {},
    calculatorFlow: {},
    consoleErrors: [],
  };

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true,
  });

  // --- 1. LIGHT MODE TEST ---
  console.log('>>> [1/3] Testing Light Mode at http://localhost:3000 ...');
  const lightContext = await browser.newContext({
    viewport: { width: 1280, height: 960 },
    colorScheme: 'light',
  });
  const lightPage = await lightContext.newPage();

  lightPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ mode: 'light', text: msg.text() });
      console.error('[Browser Error - Light]:', msg.text());
    }
  });

  await lightPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  results.lightMode = await lightPage.evaluate(() => {
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    const header = document.querySelector('header');
    const headerStyle = window.getComputedStyle(header);
    const h1 = document.querySelector('h1');
    const h1Style = window.getComputedStyle(h1);

    const lightLogo = document.querySelector('header img[src*="logo-light"]');
    const darkLogo = document.querySelector('header img[src*="logo-dark"]');
    const lightLogoStyle = lightLogo ? window.getComputedStyle(lightLogo) : null;
    const darkLogoStyle = darkLogo ? window.getComputedStyle(darkLogo) : null;

    const navLinks = Array.from(document.querySelectorAll('header nav a')).map((a) => {
      const s = window.getComputedStyle(a);
      return {
        text: a.textContent.trim(),
        href: a.getAttribute('href'),
        color: s.color,
        fontSize: s.fontSize,
      };
    });

    const cta = document.querySelector('header a[href*="rechner"]');
    const ctaStyle = cta ? window.getComputedStyle(cta) : null;

    const wizardCard = document.querySelector('#rechner > div');
    const wizardCardStyle = wizardCard ? window.getComputedStyle(wizardCard) : null;

    const priceTable = document.querySelector('table');
    const priceTableStyle = priceTable ? window.getComputedStyle(priceTable) : null;

    return {
      bodyBg: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      fontFamily: bodyStyle.fontFamily,
      headerBg: headerStyle.backgroundColor,
      headerBorder: headerStyle.borderColor,
      h1: {
        text: h1 ? h1.textContent.trim() : null,
        color: h1 ? h1Style.color : null,
        fontSize: h1 ? h1Style.fontSize : null,
        fontWeight: h1 ? h1Style.fontWeight : null,
      },
      lightLogo: lightLogo
        ? {
            display: lightLogoStyle.display,
            renderedWidth: lightLogo.getBoundingClientRect().width,
            renderedHeight: lightLogo.getBoundingClientRect().height,
          }
        : null,
      darkLogo: darkLogo
        ? {
            display: darkLogoStyle.display,
            renderedWidth: darkLogo.getBoundingClientRect().width,
            renderedHeight: darkLogo.getBoundingClientRect().height,
          }
        : null,
      navLinks,
      headerCta: {
        bg: ctaStyle ? ctaStyle.backgroundColor : null,
        color: ctaStyle ? ctaStyle.color : null,
        borderRadius: ctaStyle ? ctaStyle.borderRadius : null,
      },
      wizardCard: {
        bg: wizardCardStyle ? wizardCardStyle.backgroundColor : null,
        borderRadius: wizardCardStyle ? wizardCardStyle.borderRadius : null,
        boxShadow: wizardCardStyle ? wizardCardStyle.boxShadow : null,
      },
      priceTablePresent: !!priceTable,
      priceTableBg: priceTableStyle ? priceTableStyle.backgroundColor : null,
    };
  });

  const lightImgPath = path.join(artifactDir, 'screenshot-light.png');
  await lightPage.screenshot({ path: lightImgPath, fullPage: false });
  console.log('Saved Light Mode screenshot to:', lightImgPath);

  // --- 2. DARK MODE TEST ---
  console.log('>>> [2/3] Testing Dark Mode at http://localhost:3000 ...');
  const darkContext = await browser.newContext({
    viewport: { width: 1280, height: 960 },
    colorScheme: 'dark',
  });
  const darkPage = await darkContext.newPage();

  darkPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      results.consoleErrors.push({ mode: 'dark', text: msg.text() });
      console.error('[Browser Error - Dark]:', msg.text());
    }
  });

  await darkPage.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  results.darkMode = await darkPage.evaluate(() => {
    const body = document.body;
    const bodyStyle = window.getComputedStyle(body);
    const header = document.querySelector('header');
    const headerStyle = window.getComputedStyle(header);
    const h1 = document.querySelector('h1');
    const h1Style = window.getComputedStyle(h1);

    const lightLogo = document.querySelector('header img[src*="logo-light"]');
    const darkLogo = document.querySelector('header img[src*="logo-dark"]');
    const lightLogoStyle = lightLogo ? window.getComputedStyle(lightLogo) : null;
    const darkLogoStyle = darkLogo ? window.getComputedStyle(darkLogo) : null;

    const wizardCard = document.querySelector('#rechner > div');
    const wizardCardStyle = wizardCard ? window.getComputedStyle(wizardCard) : null;

    return {
      bodyBg: bodyStyle.backgroundColor,
      bodyColor: bodyStyle.color,
      headerBg: headerStyle.backgroundColor,
      headerBorder: headerStyle.borderColor,
      h1Color: h1 ? h1Style.color : null,
      lightLogo: lightLogo
        ? {
            display: lightLogoStyle.display,
            renderedWidth: lightLogo.getBoundingClientRect().width,
            renderedHeight: lightLogo.getBoundingClientRect().height,
          }
        : null,
      darkLogo: darkLogo
        ? {
            display: darkLogoStyle.display,
            renderedWidth: darkLogo.getBoundingClientRect().width,
            renderedHeight: darkLogo.getBoundingClientRect().height,
          }
        : null,
      wizardCard: {
        bg: wizardCardStyle ? wizardCardStyle.backgroundColor : null,
        border: wizardCardStyle ? wizardCardStyle.borderColor : null,
      },
    };
  });

  const darkImgPath = path.join(artifactDir, 'screenshot-dark.png');
  await darkPage.screenshot({ path: darkImgPath, fullPage: false });
  console.log('Saved Dark Mode screenshot to:', darkImgPath);

  // --- 3. INTERACTIVE CALCULATOR FLOW TEST ---
  console.log('>>> [3/3] Testing Interactive Calculator Flow (Steps 1 to 5 + Result) ...');
  try {
    // Step 1: Area (Default 60 m², click Next)
    await lightPage.waitForSelector('#rechner');
    const step1Title = await lightPage.$eval('#rechner h2', (el) => el.textContent.trim());
    results.calculatorFlow.step1 = step1Title;

    // Click "Weiter" on Step 1
    const next1 = await lightPage.$('#rechner button:has-text("Weiter")');
    await next1.click();
    await lightPage.waitForTimeout(300);

    // Step 2: Floor & Elevator (select 2. OG, without elevator)
    const step2Title = await lightPage.$eval('#rechner h2', (el) => el.textContent.trim());
    results.calculatorFlow.step2 = step2Title;
    const next2 = await lightPage.$('#rechner button:has-text("Weiter")');
    await next2.click();
    await lightPage.waitForTimeout(300);

    // Step 3: Access
    const step3Title = await lightPage.$eval('#rechner h2', (el) => el.textContent.trim());
    results.calculatorFlow.step3 = step3Title;
    const next3 = await lightPage.$('#rechner button:has-text("Weiter")');
    await next3.click();
    await lightPage.waitForTimeout(300);

    // Step 4: Fill Level (click "Normal")
    const step4Title = await lightPage.$eval('#rechner h2', (el) => el.textContent.trim());
    results.calculatorFlow.step4 = step4Title;
    const next4 = await lightPage.$('#rechner button:has-text("Weiter")');
    await next4.click();
    await lightPage.waitForTimeout(300);

    // Step 5: Location & Extras
    const step5Title = await lightPage.$eval('#rechner h2', (el) => el.textContent.trim());
    results.calculatorFlow.step5 = step5Title;

    // Enter valid PLZ 50667 (Köln)
    const plzInput = await lightPage.$('#rechner input[placeholder*="10115"], #rechner input[type="text"]');
    if (plzInput) {
      await plzInput.fill('50667');
    }

    // Submit calculation
    const calcBtn = await lightPage.$('#rechner button:has-text("Ergebnis"), #rechner button:has-text("berechnen")');
    await calcBtn.click();
    await lightPage.waitForTimeout(700);

    // Verify Result Range
    const resultBox = await lightPage.$('#rechner');
    const resultText = await resultBox.innerText();
    results.calculatorFlow.calculatedText = resultText;
    results.calculatorFlow.hasEuroPrice = resultText.includes('€');
    results.calculatorFlow.hasRealisticEstimate = resultText.includes('Geschätzte Gesamtkosten') || resultText.includes('Geschätzte Kosten');

    // Screenshot of Result
    const calcResultImg = path.join(artifactDir, 'screenshot-calculator-result.png');
    await lightPage.screenshot({ path: calcResultImg, fullPage: false });
    console.log('Saved Calculator Result screenshot to:', calcResultImg);

    // Open Lead Form inside Result
    const openLeadBtn = await lightPage.$('#rechner button:has-text("Kostenlose Angebote anfordern"), #rechner button:has-text("Angebote")');
    if (openLeadBtn) {
      await openLeadBtn.click();
      await lightPage.waitForTimeout(400);

      const hasNameInput = await lightPage.$('#rechner input[name="fullName"], #rechner input[id="fullName"]');
      const hasPhoneInput = await lightPage.$('#rechner input[name="phone"], #rechner input[placeholder*="Telefon"]');
      const hasEmailInput = await lightPage.$('#rechner input[name="email"], #rechner input[placeholder*="E-Mail"]');
      const hasConsent = await lightPage.$('#rechner input[type="checkbox"]');

      results.calculatorFlow.leadForm = {
        opened: true,
        hasNameInput: !!hasNameInput,
        hasPhoneInput: !!hasPhoneInput,
        hasEmailInput: !!hasEmailInput,
        hasConsentCheckbox: !!hasConsent,
      };

      const leadFormImg = path.join(artifactDir, 'screenshot-lead-form.png');
      await lightPage.screenshot({ path: leadFormImg, fullPage: false });
      console.log('Saved Lead Form screenshot to:', leadFormImg);
    }
  } catch (err) {
    results.calculatorFlow.error = err.message;
    console.error('Calculator test error:', err);
  }

  await lightContext.close();
  await darkContext.close();
  await browser.close();

  fs.writeFileSync(
    path.join(artifactDir, 'verification-report.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=== VERIFICATION COMPLETE ===');
  console.log('Report saved to verification-report.json');
}

main().catch((e) => {
  console.error('Execution failed:', e);
  process.exit(1);
});
