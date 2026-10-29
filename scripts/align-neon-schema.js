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

async function alignColumns() {
  console.log('Aligning Neon table columns with target schema...');

  // Ensure all columns exist
  await sql`
    ALTER TABLE public.leads
      ADD COLUMN IF NOT EXISTS name TEXT,
      ADD COLUMN IF NOT EXISTS plz VARCHAR(5),
      ADD COLUMN IF NOT EXISTS message TEXT,
      ADD COLUMN IF NOT EXISTS price_min INTEGER,
      ADD COLUMN IF NOT EXISTS price_realistic INTEGER,
      ADD COLUMN IF NOT EXISTS price_max INTEGER,
      ADD COLUMN IF NOT EXISTS consent_text_version TEXT;
  `;

  // Make sure existing null columns get populated if name/plz were null
  await sql`
    UPDATE public.leads 
    SET 
      name = COALESCE(name, full_name),
      plz = COALESCE(plz, postal_code),
      message = COALESCE(message, notes),
      consent_text_version = COALESCE(consent_text_version, consent_version)
    WHERE name IS NULL OR plz IS NULL;
  `;

  // Add indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_plz ON public.leads (plz);`;
  await sql`CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads (email);`;

  console.log('✓ Columns aligned successfully!');

  const cols = await sql`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'leads' 
    ORDER BY ordinal_position;
  `;
  console.log('Current leads table schema:');
  console.table(cols);
}

alignColumns().catch(console.error);

