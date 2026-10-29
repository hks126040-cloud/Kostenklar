import 'server-only';
import { neon, NeonQueryFunction } from '@neondatabase/serverless';

let cachedSql: NeonQueryFunction<false, false> | null = null;

/**
 * Returns a serverless Neon PostgreSQL query instance.
 * Guaranteed server-only (fails build if imported into client component).
 * Throws a clear error if DATABASE_URL is missing.
 */
export function getDb(): NeonQueryFunction<false, false> {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error('DATABASE_URL environment variable is missing. Database connection cannot be established.');
  }
  if (!cachedSql) {
    cachedSql = neon(dbUrl);
  }
  return cachedSql;
}
