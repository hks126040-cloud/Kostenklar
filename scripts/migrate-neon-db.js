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

async function migrate() {
  console.log('Starting migration on Neon production branch...');

  try {
    // 1. Create Enum
    console.log('1. Creating lead_status enum...');
    await sql`
      DO $$ BEGIN
        CREATE TYPE lead_status AS ENUM ('new', 'forwarded', 'invalid', 'archived');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `;
    console.log('✓ lead_status enum ready');

    // 2. Create Leads Table
    console.log('2. Creating leads table...');
    await sql`
      CREATE TABLE IF NOT EXISTS public.leads (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        
        -- Contact Data
        full_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        postal_code VARCHAR(5) NOT NULL,
        preferred_date TEXT NOT NULL,
        notes TEXT,
        
        -- Calculator Context
        calculator_input JSONB NOT NULL,
        calculator_result JSONB NOT NULL,
        source_page TEXT NOT NULL DEFAULT 'homepage',
        
        -- DSGVO / GDPR Compliance Audit Trail
        consent_given BOOLEAN NOT NULL DEFAULT TRUE,
        consent_version TEXT NOT NULL,
        consent_text TEXT NOT NULL,
        consent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        ip_hash TEXT NOT NULL,
        user_agent TEXT,
        
        -- Lead Processing
        status lead_status NOT NULL DEFAULT 'new',
        forwarded_to TEXT[] DEFAULT '{}',
        buyer_notes TEXT
      );
    `;
    console.log('✓ leads table ready');

    // 3. Create Indexes
    console.log('3. Creating indexes...');
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_postal_code ON public.leads (postal_code);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);`;
    await sql`CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);`;
    console.log('✓ Indexes ready');

    // 4. Verify
    const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
    console.log('Migration Complete! Public Tables:', tables.map(t => t.table_name));

    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'leads'
      ORDER BY ordinal_position;
    `;
    console.log('\nColumns in leads table:');
    columns.forEach(c => console.log(`  - ${c.column_name} (${c.data_type})`));

  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
}

migrate();
