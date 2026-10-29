# Database Documentation: Neon Postgres (Frankfurt / `eu-central-1`)

This project uses **Neon Serverless PostgreSQL** hosted in Frankfurt, Germany (`aws-eu-central-1`) for DSGVO/GDPR compliance.

## Environment Variables

In `.env.local` (local) and Vercel Project Settings (production):

```bash
DATABASE_URL="postgresql://neondb_owner:***@ep-***-pooler.c-8.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

> **Security Notice:** Never prefix `DATABASE_URL` with `NEXT_PUBLIC_`. It is strictly server-only.

## Schema Deployment

Apply the schema using the migration script:

```bash
node scripts/migrate-neon-db.js
```

Or apply `db/schema.sql` directly in the Neon SQL Editor console.

## DSGVO / GDPR Compliance Operations

### 1. Delete Single Lead by Email (Right to Erasure / Art. 17 DSGVO)
```bash
node scripts/dsgvo-delete-lead.js customer@example.com
```

### 2. Automated Retention (180-Day Scrubber)
Run the built-in function to anonymize expired leads older than 180 days:
```sql
SELECT public.scrub_expired_leads();
```
