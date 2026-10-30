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

async function inspectColumns() {
  const cols = await sql`
    SELECT column_name, data_type, udt_name, is_nullable, column_default
    FROM information_schema.columns 
    WHERE table_name = 'leads' 
    ORDER BY ordinal_position;
  `;
  console.log('CURRENT NEON COLUMNS IN leads TABLE:');
  console.table(cols);
}

inspectColumns();
