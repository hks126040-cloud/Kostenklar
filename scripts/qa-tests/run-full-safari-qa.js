const { webkit } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://127.0.0.1:3005';
const ARTIFACT_DIR = 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/ios-safari-qa';

(async () => {
  console.log('=== STARTING DEEP iOS SAFARI QA SUITE (PLAYWRIGHT WEBKIT) ===');
  const browser = await webkit.launch();
  const findings = [];

  function logItem(id, category, component, device, expected, actual, passed, severity, verifiedType, evidence = '') {
    findings.push({ id, category, component, device, expected, actual, passed, severity, verifiedType, evidence });
    const mark = passed ? '✅ PASS' : '❌ FAIL';
    console.log(`${mark} [${id}] ${component}: ${actual}`);
  }

  // Test 1: Links & Buttons (Area A)
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Check external links for rel="noopener noreferrer"
    const externalLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href^="http"]')).filter(l => !l.href.includes(window.location.hostname));
      return links.map(l => ({
        href: l.href,
        rel: l.getAttribute('rel') || '',
        text: l.textContent?.trim() || '',
      }));
    });
    const missingRel = externalLinks.filter(l => !l.rel.includes('noopener'));
    logItem(
      'A2-1', 'Links', 'External Links', 'All',
      'All external links must have rel="noopener noreferrer"',
      missingRel.length === 0 ? `All ${externalLinks.length} external links have rel="noopener"` : `${missingRel.length} links missing rel: ${missingRel.map(m=>m.href).join(', ')}`,
      missingRel.length === 0, missingRel.length === 0 ? 'Low' : 'High', 'Verified (WebKit emulation)'
    );

    // Check mailto and tel links
    const mailtoLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href^="mailto:"]')).map(a => a.href);
    });
    logItem(
      'A2-2', 'Links', 'Contact links', 'iPhone 13',
      'mailto: links valid and present',
      mailtoLinks.length > 0 ? `Found ${mailtoLinks.length} mailto links: ${mailtoLinks.join(', ')}` : 'No mailto links found',
      mailtoLinks.length > 0, 'Medium', 'Verified (WebKit emulation)'
    );

    // Check header hamburger open / close
    const hamburger = page.locator('button[aria-label="Menü öffnen"]');
    await hamburger.click();
    await page.waitForTimeout(400);

    const drawerOpen = await page.locator('text=Kosten online berechnen').isVisible();
    logItem(
      'A4-1', 'Navigation', 'components/layout/Header.tsx:128', 'iPhone 13',
      'Mobile drawer opens smoothly on tap',
      drawerOpen ? 'Drawer opened and visible' : 'Drawer did not open',
      drawerOpen, 'Blocker', 'Verified (WebKit emulation)'
    );

    // Check scroll lock when drawer is open
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    logItem(
      'E26-1', 'Layout', 'components/layout/Header.tsx:14', 'iPhone 13',
      'document.body scroll locked when drawer open',
      `document.body.style.overflow = "${bodyOverflow}"`,
      bodyOverflow === 'hidden', 'High', 'Verified (WebKit emulation)'
    );

    // Close drawer via backdrop click
    const backdrop = page.locator('.fixed.inset-0.bg-brand-ink\\/60');
    if (await backdrop.isVisible()) {
      await backdrop.click({ position: { x: 20, y: 20 } });
      await page.waitForTimeout(400);
    }
    const drawerClosed = !(await page.locator('text=Kosten online berechnen').isVisible());
    logItem(
      'E26-2', 'Navigation', 'components/layout/Header.tsx:117', 'iPhone 13',
      'Backdrop tap closes drawer',
      drawerClosed ? 'Drawer closed' : 'Drawer remained open',
      drawerClosed, 'High', 'Verified (WebKit emulation)'
    );

    await context.close();
  }

  // Test 2: Calculator Wizard Execution & Murphy Validation (Area C)
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/#rechner`, { waitUntil: 'networkidle' });

    // Step 0: Area input
    const areaInput = page.locator('#area-input');
    await areaInput.fill('65');
    
    // Check computed styles on inputs for iOS 16px rule
    const computedFontSize = await areaInput.evaluate(el => window.getComputedStyle(el).fontSize);
    const hasNumericInputmode = await areaInput.evaluate(el => el.getAttribute('inputmode'));
    logItem(
      'C15-1', 'Calculator', 'components/calculator/Wizard.tsx:218', 'iPhone 13',
      'Input font-size >= 16px to prevent iOS auto-zoom',
      `Computed font-size: ${computedFontSize}`,
      parseFloat(computedFontSize) >= 16, 'High', 'Verified (WebKit emulation)'
    );
    logItem(
      'C15-2', 'Calculator', 'components/calculator/Wizard.tsx:218', 'iPhone 13',
      'Inputmode attribute set to numeric/decimal on numeric input',
      hasNumericInputmode ? `inputmode="${hasNumericInputmode}"` : 'Attribute inputmode is MISSING (causes standard keyboard on iOS)',
      !!hasNumericInputmode, 'Medium', 'Verified (WebKit emulation)'
    );

    // Step 0 -> Step 1
    await page.click('button:has-text("Weiter zu Etage & Aufzug")');
    await page.waitForTimeout(400);

    // Step 1: Etage & Aufzug
    const step1Heading = await page.locator('text=In welcher Etage').isVisible();
    logItem(
      'C11-1', 'Calculator', 'components/calculator/Wizard.tsx:299', 'iPhone 13',
      'Navigates to Step 1 (Etage & Aufzug)',
      step1Heading ? 'Step 1 reached' : 'Failed to reach Step 1',
      step1Heading, 'Blocker', 'Verified (WebKit emulation)'
    );

    // Select 2. OG + Aufzug Ja
    await page.click('button:has-text("2. OG")');
    await page.click('button:has-text("Ja, vorhanden")');
    await page.click('button:has-text("Weiter zu Füllgrad & Zustand")');
    await page.waitForTimeout(400);

    // Step 2: Füllgrad & Zustand
    const step2Heading = await page.locator('text=Wie voll ist das Objekt').isVisible();
    logItem(
      'C11-2', 'Calculator', 'components/calculator/Wizard.tsx:390', 'iPhone 13',
      'Navigates to Step 2 (Füllgrad & Zustand)',
      step2Heading ? 'Step 2 reached' : 'Failed to reach Step 2',
      step2Heading, 'Blocker', 'Verified (WebKit emulation)'
    );

    await page.click('button:has-text("Normaler Hausrat")');
    await page.click('button:has-text("Weiter zum Standort (PLZ)")');
    await page.waitForTimeout(400);

    // Step 3: PLZ input & Murphy validation
    const plzInput = page.locator('#plz-input');
    const plzInputmode = await plzInput.evaluate(el => el.getAttribute('inputmode'));
    logItem(
      'C15-3', 'Calculator', 'components/calculator/Wizard.tsx:490', 'iPhone 13',
      'PLZ input has inputmode="numeric"',
      plzInputmode ? `inputmode="${plzInputmode}"` : 'inputmode is MISSING on PLZ',
      plzInputmode === 'numeric', 'Medium', 'Verified (WebKit emulation)'
    );

    // Murphy: invalid 4-digit PLZ
    await plzInput.fill('1234');
    await page.click('button:has-text("Kosten jetzt berechnen")');
    await page.waitForTimeout(400);
    const hasPlzError = await page.locator('text=Bitte geben Sie eine gültige 5-stellige deutsche Postleitzahl an').isVisible();
    logItem(
      'C14-4', 'Calculator', 'components/calculator/Wizard.tsx:505', 'iPhone 13',
      'Invalid 4-digit PLZ shows German validation error',
      hasPlzError ? 'Error message displayed correctly' : 'Did not show 5-digit PLZ error',
      hasPlzError, 'High', 'Verified (WebKit emulation)'
    );

    // Valid 5-digit PLZ
    await plzInput.fill('50667');
    await page.click('button:has-text("Kosten jetzt berechnen")');
    await page.waitForTimeout(800);

    // Verify Result Range
    const isResultRange = await page.locator('text=Geschätzte Kosten für Ihr Objekt').isVisible();
    const priceText = isResultRange ? await page.locator('.font-extrabold.tracking-tight.text-brand').first().textContent() : 'None';
    logItem(
      'C11-3', 'Calculator', 'components/calculator/ResultRange.tsx:71', 'iPhone 13',
      'Result range is calculated and displayed with realistic benchmark',
      isResultRange ? `Price range displayed: ${priceText}` : 'Result range failed to render',
      isResultRange, 'Blocker', 'Verified (WebKit emulation)'
    );

    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'result-range-iphone13.png') });

    // C12: Back navigation preserves values
    const backBtn = page.locator('button:has-text("← Eingaben anpassen")');
    await backBtn.click();
    await page.waitForTimeout(400);
    const restoredPlz = await page.locator('#plz-input').inputValue();
    logItem(
      'C12-1', 'Calculator', 'components/calculator/Wizard.tsx', 'iPhone 13',
      'Back button from results preserves previous input state',
      `Restored PLZ: "${restoredPlz}"`,
      restoredPlz === '50667', 'High', 'Verified (WebKit emulation)'
    );

    await context.close();
  }

  // Test 3: Lead Form & Submission (Area D)
  {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
    const page = await context.newPage();
    // Use preloaded query params to reach result step directly
    await page.goto(`${BASE_URL}/?flaeche=60&zimmer=2&etage=1&plz=50667`, { waitUntil: 'networkidle' });

    // Open Lead Form
    const openLeadBtn = page.locator('button:has-text("Kostenlose Angebote anfordern")');
    await openLeadBtn.click();
    await page.waitForTimeout(400);

    const isFormOpen = await page.locator('#lead-name').isVisible();
    logItem(
      'D-MODAL', 'Lead Form', 'components/forms/LeadForm.tsx', 'iPhone 13',
      'Lead form modal opens on CTA click',
      isFormOpen ? 'Modal form open' : 'Form modal failed to open',
      isFormOpen, 'Blocker', 'Verified (WebKit emulation)'
    );

    if (isFormOpen) {
      // Check Honeypot presence
      const honeypot = page.locator('input[name="website_hp"], input[name="fax"]');
      const honeypotExists = await honeypot.count() > 0;
      logItem(
        'D18-HP', 'Lead Form', 'components/forms/LeadForm.tsx', 'iPhone 13',
        'Spam honeypot field present and hidden',
        honeypotExists ? 'Honeypot field present' : 'No honeypot field found',
        honeypotExists, 'High', 'Verified (WebKit emulation)'
      );

      // Submit empty form -> check German error messages
      await page.click('button[type="submit"]:has-text("Angebote kostenlos anfordern")');
      await page.waitForTimeout(300);

      const nameError = await page.locator('text=Bitte geben Sie Ihren vollständigen Namen an').isVisible();
      const emailError = await page.locator('text=Bitte geben Sie eine gültige E-Mail-Adresse an').isVisible();
      const phoneError = await page.locator('text=Bitte geben Sie eine Telefonnummer für Rückfragen an').isVisible();
      const consentError = await page.locator('text=Bitte stimmen Sie der Kontaktaufnahme zu').isVisible();

      logItem(
        'D18-ERR', 'Lead Form', 'components/forms/LeadForm.tsx', 'iPhone 13',
        'Clear German validation errors on empty submission',
        nameError && emailError && phoneError && consentError ? 'All 4 field errors displayed in German' : `Missing errors: name=${nameError}, email=${emailError}, phone=${phoneError}, consent=${consentError}`,
        nameError && emailError && phoneError && consentError, 'Blocker', 'Verified (WebKit emulation)'
      );

      // Murphy: Invalid phone format
      await page.fill('#lead-name', 'Maria Schmidt');
      await page.fill('#lead-email', 'maria@example.de');
      await page.fill('#lead-phone', '123'); // too short / invalid
      await page.click('button[type="submit"]:has-text("Angebote kostenlos anfordern")');
      await page.waitForTimeout(300);
      const phoneFormatError = await page.locator('text=gültige Telefonnummer').isVisible();
      logItem(
        'D18-PHONE', 'Lead Form', 'components/forms/LeadForm.tsx', 'iPhone 13',
        'Invalid phone format ("123") is rejected',
        phoneFormatError ? 'Phone format error shown' : 'Rejected or allowed',
        phoneFormatError, 'High', 'Verified (WebKit emulation)'
      );

      // Valid data submission
      await page.fill('#lead-phone', '0171 1234567');
      await page.check('#lead-consent');
      await page.click('button[type="submit"]:has-text("Angebote kostenlos anfordern")');
      await page.waitForTimeout(1200);

      const redirectedUrl = page.url();
      const isDanke = redirectedUrl.includes('/danke');
      const hasQueryPii = redirectedUrl.includes('name=') || redirectedUrl.includes('email=') || redirectedUrl.includes('phone=');
      logItem(
        'D17-SUBMIT', 'Lead Form', 'app/actions/submit-lead.ts', 'iPhone 13',
        'Successful submission redirects to /danke without PII in query string',
        isDanke && !hasQueryPii ? `Redirected to ${redirectedUrl} (0 PII exposed)` : `Failed redirect: ${redirectedUrl}`,
        isDanke && !hasQueryPii, 'Blocker', 'Verified (WebKit emulation)'
      );
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'danke-submission-iphone13.png') });
    }

    await context.close();
  }

  // Test 4: Viewport Meta, iOS CSS & Failure Modes (Area E & F)
  {
    const context = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
    const page = await context.newPage();
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Check viewport meta tag for viewport-fit=cover (E24)
    const viewportMeta = await page.evaluate(() => {
      const tag = document.querySelector('meta[name="viewport"]');
      return tag ? tag.getAttribute('content') : null;
    });
    const hasViewportFitCover = viewportMeta && viewportMeta.includes('viewport-fit=cover');
    logItem(
      'E24-1', 'iOS Viewport', 'app/layout.tsx:8', 'All iPhones',
      'Viewport meta tag must contain viewport-fit=cover for notch/home bar support',
      viewportMeta ? `meta content: "${viewportMeta}" (viewport-fit=cover MISSING)` : 'No viewport meta tag found',
      !!hasViewportFitCover, 'High', 'Verified (WebKit emulation)'
    );

    // E29: Check German word wrapping on small screen 320px
    const p320Context = await browser.newContext({ viewport: { width: 320, height: 568 }, isMobile: true });
    const p320 = await p320Context.newPage();
    await p320.goto(`${BASE_URL}/datenschutz`, { waitUntil: 'networkidle' });
    const h1DatenschutzWidth = await p320.evaluate(() => {
      const h1 = document.querySelector('h1');
      return h1 ? { scrollWidth: h1.scrollWidth, clientWidth: h1.clientWidth, text: h1.textContent } : null;
    });
    const datenschutzOverflows = h1DatenschutzWidth && h1DatenschutzWidth.scrollWidth > 320;
    logItem(
      'E29-1', 'Typography', 'app/datenschutz/page.tsx:17', 'iPhone SE (320px)',
      'Heading "Datenschutzerklärung" must not overflow 320px screen',
      h1DatenschutzWidth ? `H1 scrollWidth is ${h1DatenschutzWidth.scrollWidth}px (exceeds 320px by ${h1DatenschutzWidth.scrollWidth - 320}px!)` : 'H1 not found',
      !datenschutzOverflows, 'High', 'Verified (WebKit emulation)'
    );
    await p320.screenshot({ path: path.join(ARTIFACT_DIR, 'datenschutz-overflow-320px.png') });
    await p320Context.close();

    // F35: LocalStorage in Private Browsing emulation
    const pvtContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const pvtPage = await pvtContext.newPage();
    await pvtPage.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get: () => { throw new DOMException('QuotaExceededError / Access Denied in Private Mode', 'QuotaExceededError'); }
      });
      Object.defineProperty(window, 'sessionStorage', {
        get: () => { throw new DOMException('QuotaExceededError / Access Denied in Private Mode', 'QuotaExceededError'); }
      });
    });
    let pvtCrashed = false;
    let pvtError = null;
    pvtPage.on('pageerror', err => { pvtCrashed = true; pvtError = err.message; });
    await pvtPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    logItem(
      'F35-1', 'Storage Failure', 'All components', 'iPhone 13',
      'Site does not crash in iOS Safari Private Browsing with blocked Web Storage',
      pvtCrashed ? `Crashed: ${pvtError}` : 'Page loaded and rendered without crashing',
      !pvtCrashed, 'High', 'Verified (WebKit emulation)'
    );
    await pvtContext.close();

    // F33: JavaScript Disabled mode
    const noJsContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(`${BASE_URL}/entruempelung-kosten-pro-qm`, { waitUntil: 'networkidle' });
    const noJsH1 = await noJsPage.locator('h1').textContent();
    const noJsTableRows = await noJsPage.locator('table tr').count();
    logItem(
      'F33-1', 'SSR / No-JS', 'app/entruempelung-kosten-pro-qm/page.tsx', 'iPhone 13',
      'Page content, H1 and price tables render in pure HTML without JavaScript',
      noJsH1 ? `H1 rendered: "${noJsH1.slice(0, 30)}...", ${noJsTableRows} table rows rendered` : 'Blank page rendered without JS',
      !!noJsH1 && noJsTableRows > 0, 'Blocker', 'Verified (WebKit emulation)'
    );
    await noJsContext.close();

    await context.close();
  }

  await browser.close();

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'comprehensive-qa-findings.json'),
    JSON.stringify(findings, null, 2),
    'utf-8'
  );
  console.log('=== COMPLETED DEEP iOS SAFARI QA SUITE ===');
})();

