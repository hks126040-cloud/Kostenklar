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

const retentionDays = parseInt(process.argv[2] || '180', 10);

const dbUrl = getDatabaseUrl();
const sql = neon(dbUrl);

async function scrubExpiredLeads() {
  console.log(`Running automated DSGVO data retention scrubber (Older than ${retentionDays} days)...`);

  try {
    const result = await sql`
      UPDATE public.leads
      SET 
        name = 'GELÖSCHT_DSGVO',
        full_name = 'GELÖSCHT_DSGVO',
        email = 'anonymized@geloescht.invalid',
        phone = '00000000',
        message = NULL,
        notes = NULL,
        status = 'archived'
      WHERE 
        created_at < NOW() - (${retentionDays} || ' days')::INTERVAL
        AND status != 'archived'
      RETURNING id;
    `;

    console.log(`✓ Anonymized ${result.length} expired lead(s) under Art. 5(1)(e) DSGVO storage limitation.`);
  } catch (err) {
    console.error('Error executing retention scrubber:', err.message);
    process.exit(1);
  }
}

scrubExpiredLeads();

