import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pool } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Migration Runner
 * Executes SQL migration files in order and tracks executed migrations
 * Supports idempotent migrations (safe to run multiple times)
 */

interface Migration {
  version: string;
  filename: string;
  sql: string;
}

/**
 * Load all migration files from migrations directory
 * @returns Array of migration objects sorted by version
 */
function loadMigrations(): Migration[] {
  const migrationsDir = join(__dirname, 'migrations');
  const files = readdirSync(migrationsDir).filter(f => f.endsWith('.sql'));

  return files
    .sort() // Sort alphanumerically (001, 002, 003, etc.)
    .map(filename => {
      const sql = readFileSync(join(migrationsDir, filename), 'utf8');
      const version = filename.replace('.sql', '');
      return { version, filename, sql };
    });
}

/**
 * Check which migrations have already been executed
 * @returns Array of executed migration versions
 */
async function getExecutedMigrations(): Promise<string[]> {
  try {
    const result = await pool.query(
      'SELECT version FROM schema_migrations ORDER BY version'
    );
    return result.rows.map(row => row.version);
  } catch (error) {
    // If schema_migrations table doesn't exist, no migrations have been executed
    return [];
  }
}

/**
 * Execute a single migration within a transaction
 * @param migration Migration object to execute
 */
async function executeMigration(migration: Migration): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    console.log(`→ Running migration: ${migration.filename}`);

    // Execute the migration SQL
    await client.query(migration.sql);

    await client.query('COMMIT');

    console.log(`✓ Migration completed: ${migration.filename}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`✗ Migration failed: ${migration.filename}`);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Run all pending migrations
 * Skips migrations that have already been executed
 */
async function runMigrations(): Promise<void> {
  console.log('Starting database migrations...\n');

  try {
    const allMigrations = loadMigrations();
    const executedMigrations = await getExecutedMigrations();

    const pendingMigrations = allMigrations.filter(
      m => !executedMigrations.includes(m.version)
    );

    if (pendingMigrations.length === 0) {
      console.log('✓ No pending migrations. Database is up to date.\n');
      return;
    }

    console.log(`Found ${pendingMigrations.length} pending migration(s):\n`);

    for (const migration of pendingMigrations) {
      await executeMigration(migration);
    }

    console.log(`\n✓ All migrations completed successfully!`);
    console.log(`  Total migrations executed: ${pendingMigrations.length}`);
    console.log(`  Total migrations in database: ${executedMigrations.length + pendingMigrations.length}\n`);

  } catch (error) {
    console.error('\n✗ Migration failed:', (error as Error).message);
    throw error;
  }
}

/**
 * Rollback the last migration
 * Drops all tables in reverse order
 */
async function rollbackMigration(): Promise<void> {
  console.log('Rolling back database...\n');

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    console.log('→ Dropping tables in reverse order...');

    // Drop tables in reverse order to respect foreign key constraints
    await client.query('DROP TABLE IF EXISTS audit_logs CASCADE');
    console.log('  ✓ Dropped: audit_logs');

    await client.query('DROP TABLE IF EXISTS api_credentials CASCADE');
    console.log('  ✓ Dropped: api_credentials');

    await client.query('DROP TABLE IF EXISTS sessions CASCADE');
    console.log('  ✓ Dropped: sessions');

    await client.query('DROP TABLE IF EXISTS users CASCADE');
    console.log('  ✓ Dropped: users');

    await client.query('DROP TABLE IF EXISTS schema_migrations CASCADE');
    console.log('  ✓ Dropped: schema_migrations');

    await client.query('COMMIT');

    console.log('\n✓ Rollback completed successfully!\n');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('\n✗ Rollback failed:', (error as Error).message);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Main execution
 * Command line arguments:
 * - migrate.ts (default: run migrations)
 * - migrate.ts rollback (rollback all migrations)
 */
async function main(): Promise<void> {
  const command = process.argv[2];

  try {
    if (command === 'rollback') {
      await rollbackMigration();
    } else {
      await runMigrations();
    }

    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run migrations if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runMigrations, rollbackMigration };
