const fs = require('fs');
const { neon } = require('@neondatabase/serverless');

function getDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  if (fs.existsSync('.env.local')) {
    const text = fs.readFileSync('.env.local', 'utf8');
    const match = text.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
    if (match) return match[1];
  }
  throw new Error('DATABASE_URL is not set in environment or .env.local');
}

const dbUrl = getDatabaseUrl();
const sql = neon(dbUrl);

async function runRealTest() {
  console.log('--- TEST 1: SUBMIT REAL LEAD TO NEON POSTGRES ---');
  
  const testEmail = 'lead-verification-2026@kostenklar-test.invalid';
  const testLead = {
    name: 'Sabine Testmann',
    email: testEmail,
    phone: '+49 30 98765432',
    plz: '10117',
    preferred_date: 'schnellstmoeglich',
    message: 'Testanfrage: 3 Zimmer Wohnung 75qm mit Keller im 2. OG ohne Aufzug',
    calculator_input: {
      area: 75,
      rooms: 3,
      floor: 2,
      hasElevator: false,
      fillLevel: 'normal',
      besenrein: true,
      hazardousWaste: []
    },
    calculator_result: {
      min: 1650,
      realistic: 2200,
      max: 2950
    },
    price_min: 1650,
    price_realistic: 2200,
    price_max: 2950,
    source_page: 'homepage',
    consent_text_version: 'v1.0_2026_03',
    consent_text: 'Ich willige ein...',
    ip_hash: 'c8e1a7b63f28d84a9190deaf123456789abcdef0123456789abcdef012345678'
  };

  // 1. Insert row
  const rows = await sql`
    INSERT INTO public.leads (
      name, full_name, email, phone, plz, postal_code, preferred_date, message, notes,
      calculator_input, calculator_result, price_min, price_realistic, price_max,
      source_page, consent_given, consent_text_version, consent_version, consent_text, consent_at,
      ip_hash, user_agent, status
    ) VALUES (
      ${testLead.name}, ${testLead.name}, ${testLead.email}, ${testLead.phone}, ${testLead.plz}, ${testLead.plz},
      ${testLead.preferred_date}, ${testLead.message}, ${testLead.message},
      ${JSON.stringify(testLead.calculator_input)}, ${JSON.stringify(testLead.calculator_result)},
      ${testLead.price_min}, ${testLead.price_realistic}, ${testLead.price_max},
      ${testLead.source_page}, true, ${testLead.consent_text_version}, ${testLead.consent_text_version},
      ${testLead.consent_text}, NOW(), ${testLead.ip_hash}, 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)', 'new'
    )
    RETURNING id;
  `;

  const leadId = rows[0].id;
  console.log('✓ Successfully inserted lead! Generated ID:', leadId);

  // 2. Query row back
  console.log('\n--- TEST 2: QUERY NEON FOR INSERTED ROW & VERIFY SCHEMA ---');
  const fetched = await sql`
    SELECT 
      id, created_at, name, email, phone, plz, preferred_date, message,
      calculator_input, price_min, price_realistic, price_max,
      source_page, consent_text_version, consent_at, ip_hash, status
    FROM public.leads 
    WHERE id = ${leadId}
  `;

  const record = fetched[0];
  console.log('Row fetched from Neon (Frankfurt / eu-central-1):');
  console.log(JSON.stringify(record, null, 2));

  // Assertions
  if (!record.consent_text_version) throw new Error('Missing consent_text_version');
  if (!record.consent_at) throw new Error('Missing consent_at');
  if (!record.ip_hash) throw new Error('Missing ip_hash');
  if (typeof record.calculator_input !== 'object') throw new Error('calculator_input is not JSON object');
  console.log('\n✓ ALL ASSERTIONS PASSED: consent_text_version, consent_at, ip_hash, calculator_input verified.');

  // 3. Delete row
  console.log('\n--- TEST 3: CLEAN UP TEST RECORD ---');
  await sql`DELETE FROM public.leads WHERE id = ${leadId}`;
  console.log('✓ Successfully deleted test row (ID:', leadId, ')');
}

runRealTest().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});

