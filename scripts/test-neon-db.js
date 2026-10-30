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

async function testFullLeadCycle() {
  console.log('Testing full Lead Insert & Select cycle on Neon Postgres...');

  try {
    // 1. Insert test lead
    const inserted = await sql`
      INSERT INTO public.leads (
        full_name, email, phone, postal_code, preferred_date,
        calculator_input, calculator_result, source_page,
        consent_given, consent_version, consent_text, ip_hash
      ) VALUES (
        'Max Mustermann (Test)',
        'test@example.com',
        '+49 151 12345678',
        '10115',
        'flexibel',
        ${JSON.stringify({ area: 75, rooms: 3, floor: 2 })},
        ${JSON.stringify({ min: 1400, realistic: 1950, max: 2600 })},
        'homepage',
        true,
        'v1.0_2026_03',
        'Einwilligung erteilt',
        'test_ip_hash_abc123'
      )
      RETURNING id, full_name, email, created_at;
    `;
    console.log('✓ Successfully inserted lead:', inserted[0]);

    // 2. Query lead
    const queried = await sql`SELECT id, full_name, email, postal_code, status FROM public.leads WHERE id = ${inserted[0].id}`;
    console.log('✓ Successfully queried lead back:', queried[0]);

    // 3. Delete test lead
    await sql`DELETE FROM public.leads WHERE id = ${inserted[0].id}`;
    console.log('✓ Successfully cleaned up test lead record.');

    console.log('\n🌟 ALL DATABASE OPERATIONS ARE 100% OPERATIONAL!');
  } catch (err) {
    console.error('Test failed:', err);
    process.exit(1);
  }
}

testFullLeadCycle();
