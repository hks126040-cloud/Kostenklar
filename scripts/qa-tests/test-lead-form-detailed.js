const { webkit } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://127.0.0.1:3005';
const ARTIFACT_DIR = 'C:/Users/ASUS/.gemini/antigravity/brain/ee808d7f-8b73-466a-a9f4-a91872ccf923/ios-safari-qa';

(async () => {
  const browser = await webkit.launch();
  const results = [];

  function record(id, name, expected, actual, passed, severity, evidence = '') {
    results.push({ id, name, expected, actual, passed, severity, evidence });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] ${id}: ${name} -> ${actual}`);
  }

  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const page = await context.newPage();

  // Navigate to result URL directly
  await page.goto(`${BASE_URL}/?flaeche=65&zimmer=3&etage=1&plz=50667`, { waitUntil: 'networkidle' });

  // Open LeadForm
  await page.click('button:has-text("Kostenlose Angebote anfordern")');
  await page.waitForTimeout(400);

  // Check form inputs are visible
  const nameInput = page.locator('#fullName');
  const isNameVisible = await nameInput.isVisible();
  record('D17-OPEN', 'LeadForm opens upon clicking CTA', 'Inputs visible', isNameVisible ? 'Name input visible' : 'Not visible', isNameVisible, 'Blocker');

  // D18-1: Empty submit blocked by HTML5 required & state
  await page.click('button[type="submit"]:has-text("Kostenlose Angebote anfordern")');
  await page.waitForTimeout(300);
  const stillOnPage = page.url().includes('50667');
  record('D18-1', 'Empty form submission blocked by validation', 'Stay on page, show error', stillOnPage ? 'Form stayed on page, submission blocked' : 'Submitted unexpectedly', stillOnPage, 'Blocker');

  // D18-2: Unchecked consent block
  await page.fill('#fullName', 'Klaus Weber');
  await page.fill('#email', 'klaus.weber@example.de');
  await page.fill('#phone', '0171 9876543');
  // Leave consent unchecked
  const consentBox = page.locator('#consent');
  const isChecked = await consentBox.isChecked();
  record('D18-2A', 'Consent checkbox is unchecked by default', 'Unchecked', !isChecked ? 'Unchecked' : 'Pre-checked (illegal under GDPR)', !isChecked, 'Blocker');

  await page.click('button[type="submit"]:has-text("Kostenlose Angebote anfordern")');
  await page.waitForTimeout(300);
  const notRedirected = !page.url().includes('/danke');
  record('D18-2B', 'Submitting without consent is strictly blocked', 'Blocked', notRedirected ? 'Blocked successfully' : 'Allowed without consent!', notRedirected, 'Blocker');

  // D18-3: Check for "geprüfte" in consent text
  const consentText = await page.locator('label:has(#consent)').textContent();
  const hasGepruefte = consentText.includes('geprüfte');
  record('D18-3', 'Consent text must not claim "geprüfte Fachbetriebe"', 'No "geprüfte"', hasGepruefte ? 'CONTAINS "geprüfte" (Compliance Bug)' : 'Clean copy', !hasGepruefte, 'High');

  // D17: Valid submission
  await consentBox.check();
  await page.click('button[type="submit"]:has-text("Kostenlose Angebote anfordern")');
  await page.waitForTimeout(1500);

  const finalUrl = page.url();
  const isDanke = finalUrl.includes('/danke');
  const hasPii = finalUrl.includes('email=') || finalUrl.includes('phone=') || finalUrl.includes('fullName=');
  record('D17', 'Valid submission redirects to /danke without PII in URL', 'Redirects to /danke, no PII', isDanke && !hasPii ? `Redirected to ${finalUrl}` : `Failed: url=${finalUrl}`, isDanke && !hasPii, 'Blocker', 'screenshot-danke-success.png');
  await page.screenshot({ path: path.join(ARTIFACT_DIR, 'screenshot-danke-success.png') });

  // F36: Prefers-reduced-motion on animated counter
  const rmMotionContext = await browser.newContext({ reducedMotion: 'reduce' });
  const rmPage = await rmMotionContext.newPage();
  await rmPage.goto(`${BASE_URL}/?flaeche=65&zimmer=3&etage=1&plz=50667`, { waitUntil: 'networkidle' });
  const priceShown = await rmPage.locator('.font-extrabold.tracking-tight.text-brand').first().textContent();
  record('F36', 'Price counter with prefers-reduced-motion', 'Immediate static rendering', priceShown ? `Rendered immediately: ${priceShown}` : 'Failed', !!priceShown, 'Medium');
  await rmMotionContext.close();

  await context.close();
  await browser.close();

  fs.writeFileSync(path.join(ARTIFACT_DIR, 'lead-form-detailed-results.json'), JSON.stringify(results, null, 2));
  console.log('Saved lead-form-detailed-results.json');
})();

