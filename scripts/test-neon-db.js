const fs = require('fs');
const { neon } = require('@neondatabase/serverless');

const envContent = fs.readFileSync('.env.local', 'utf8');
const match = envContent.match(/DATABASE_URL=["']?([^"'\r\n]+)["']?/);
if (!match) {
  console.error('DATABASE_URL not found in .env.local');
  process.exit(1);
}

const dbUrl = match[1];
console.log('Testing connection to Neon DB host...');
const sql = neon(dbUrl);

async function test() {
  try {
    const result = await sql`SELECT NOW() as current_time, current_database() as db_name, version() as pg_version`;
    console.log('Connection SUCCESS!');
    console.log('Database:', result[0].db_name);
    console.log('Server Time:', result[0].current_time);
    
    // Check leads table
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Public Tables:', tables.map(t => t.table_name));
  } catch (err) {
    console.error('Neon test failed:', err);
  }
}

test();
