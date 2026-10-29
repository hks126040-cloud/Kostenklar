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

const targetEmail = process.argv[2]?.trim().toLowerCase();

if (!targetEmail || !targetEmail.includes('@')) {
  console.error('Usage: node scripts/dsgvo-delete-lead.js <email>');
  console.error('Example: node scripts/dsgvo-delete-lead.js kunde@example.de');
  process.exit(1);
}

const dbUrl = getDatabaseUrl();
const sql = neon(dbUrl);

async function deleteLeadByEmail() {
  console.log(`Processing DSGVO erasure request for email: [REDACTED]@${targetEmail.split('@')[1]}`);

  try {
    const result = await sql`
      DELETE FROM public.leads 
      WHERE email = ${targetEmail}
      RETURNING id, created_at;
    `;

    if (result.length === 0) {
      console.log('No matching lead found with this email address.');
    } else {
      console.log(`✓ Successfully deleted ${result.length} lead record(s) under Art. 17 DSGVO.`);
      result.forEach(r => console.log(`  - Deleted Lead ID: ${r.id} (Created: ${r.created_at})`));
    }
  } catch (err) {
    console.error('Error executing DSGVO erasure:', err.message);
    process.exit(1);
  }
}

deleteLeadByEmail();

