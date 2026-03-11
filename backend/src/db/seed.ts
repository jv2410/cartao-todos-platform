import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pool } from './connection.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Seed Data Runner
 * Executes SQL seed files to populate database with initial data
 * Safe to run multiple times (uses INSERT ... ON CONFLICT DO NOTHING)
 */

interface SeedFile {
  filename: string;
  sql: string;
}

/**
 * Load all seed files from seeds directory
 * @returns Array of seed file objects sorted by filename
 */
function loadSeedFiles(): SeedFile[] {
  const seedsDir = join(__dirname, 'seeds');
  const files = readdirSync(seedsDir).filter(f => f.endsWith('.sql'));

  return files
    .sort() // Sort alphanumerically (001, 002, 003, etc.)
    .map(filename => {
      const sql = readFileSync(join(seedsDir, filename), 'utf8');
      return { filename, sql };
    });
}

/**
 * Execute a single seed file
 * @param seedFile Seed file object to execute
 */
async function executeSeedFile(seedFile: SeedFile): Promise<void> {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    console.log(`→ Running seed: ${seedFile.filename}`);

    // Execute the seed SQL
    await client.query(seedFile.sql);

    await client.query('COMMIT');

    console.log(`✓ Seed completed: ${seedFile.filename}`);
  } catch (error) {
    await client.query('ROLLBACK');
    console.error(`✗ Seed failed: ${seedFile.filename}`);
    throw error;
  } finally {
    client.release();
  }
}

/**
 * Run all seed files
 * Creates default admin user and any other initial data
 */
async function runSeeds(): Promise<void> {
  console.log('Starting database seeding...\n');

  try {
    const seedFiles = loadSeedFiles();

    if (seedFiles.length === 0) {
      console.log('✓ No seed files found.\n');
      return;
    }

    console.log(`Found ${seedFiles.length} seed file(s):\n`);

    for (const seedFile of seedFiles) {
      await executeSeedFile(seedFile);
    }

    console.log(`\n✓ All seeds completed successfully!`);
    console.log(`  Total seeds executed: ${seedFiles.length}\n`);

  } catch (error) {
    console.error('\n✗ Seeding failed:', (error as Error).message);
    throw error;
  }
}

/**
 * Main execution
 */
async function main(): Promise<void> {
  try {
    await runSeeds();
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await pool.end();
    process.exit(1);
  }
}

// Run seeds if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { runSeeds };
