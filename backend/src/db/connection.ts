import { Pool, PoolConfig } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * PostgreSQL Connection Pool Configuration
 * Uses environment variable DATABASE_URL for connection string
 * Connection pool settings optimized for production use on Railway
 */
const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of connections in pool
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 10000, // Timeout after 10 seconds if connection cannot be established
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
};

/**
 * Global PostgreSQL connection pool
 * Reused across all database operations for performance
 */
export const pool = new Pool(poolConfig);

/**
 * Test database connection
 * @returns Promise that resolves when connection is successful
 * @throws Error if connection fails
 */
export async function testConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    console.log('✓ PostgreSQL connection established successfully');
  } catch (error) {
    console.error('✗ PostgreSQL connection failed:', error);
    throw new Error(`Database connection failed: ${(error as Error).message}`);
  }
}

/**
 * Close database connection pool
 * Should be called when application shuts down
 */
export async function closeConnection(): Promise<void> {
  await pool.end();
  console.log('✓ PostgreSQL connection pool closed');
}

/**
 * Execute a query with parameterized values (prevents SQL injection)
 * @param query SQL query string with $1, $2, etc. placeholders
 * @param params Array of parameter values
 * @returns Query result
 */
export async function query<T = any>(
  query: string,
  params?: any[]
): Promise<{ rows: T[]; rowCount: number }> {
  const client = await pool.connect();
  try {
    const result = await client.query(query, params);
    return {
      rows: result.rows,
      rowCount: result.rowCount || 0,
    };
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  } finally {
    client.release();
  }
}

export default pool;
