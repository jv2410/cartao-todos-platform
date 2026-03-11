import Redis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Redis Client Configuration
 * Used for rate limiting, session caching, and temporary data storage
 * Supports both local development and Railway production environment
 */

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

/**
 * Redis client instance
 * Reused across all Redis operations
 */
export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
  lazyConnect: false, // Connect immediately
  retryStrategy(times) {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
});

// Event handlers for connection monitoring
redis.on('connect', () => {
  console.log('✓ Redis connection established');
});

redis.on('error', (error) => {
  console.error('✗ Redis connection error:', error.message);
});

redis.on('reconnecting', () => {
  console.log('→ Reconnecting to Redis...');
});

/**
 * Test Redis connection
 * @returns Promise that resolves when connection is successful
 * @throws Error if connection fails
 */
export async function testRedisConnection(): Promise<void> {
  try {
    await redis.ping();
    console.log('✓ Redis ping successful');
  } catch (error) {
    console.error('✗ Redis ping failed:', error);
    throw new Error(`Redis connection failed: ${(error as Error).message}`);
  }
}

/**
 * Close Redis connection
 * Should be called when application shuts down
 */
export async function closeRedisConnection(): Promise<void> {
  await redis.quit();
  console.log('✓ Redis connection closed');
}

/**
 * Rate limiting utilities
 */

/**
 * Increment login attempt counter for an IP address
 * @param ipAddress IP address to track
 * @returns Current attempt count
 */
export async function incrementLoginAttempts(ipAddress: string): Promise<number> {
  const key = `login_attempts:${ipAddress}`;
  const attempts = await redis.incr(key);

  // Set TTL of 15 minutes on first attempt
  if (attempts === 1) {
    await redis.expire(key, 15 * 60); // 15 minutes
  }

  return attempts;
}

/**
 * Get current login attempt count for an IP address
 * @param ipAddress IP address to check
 * @returns Current attempt count
 */
export async function getLoginAttempts(ipAddress: string): Promise<number> {
  const key = `login_attempts:${ipAddress}`;
  const attempts = await redis.get(key);
  return attempts ? parseInt(attempts, 10) : 0;
}

/**
 * Reset login attempt counter for an IP address
 * @param ipAddress IP address to reset
 */
export async function resetLoginAttempts(ipAddress: string): Promise<void> {
  const key = `login_attempts:${ipAddress}`;
  await redis.del(key);
}

/**
 * Lock an account (IP address) after too many failed attempts
 * @param ipAddress IP address to lock
 */
export async function lockAccount(ipAddress: string): Promise<void> {
  const key = `account_lockout:${ipAddress}`;
  await redis.setex(key, 15 * 60, 'locked'); // Lock for 15 minutes
}

/**
 * Check if an account (IP address) is locked
 * @param ipAddress IP address to check
 * @returns True if account is locked, false otherwise
 */
export async function isAccountLocked(ipAddress: string): Promise<boolean> {
  const key = `account_lockout:${ipAddress}`;
  const locked = await redis.get(key);
  return locked === 'locked';
}

/**
 * Get time remaining on account lockout (in seconds)
 * @param ipAddress IP address to check
 * @returns Seconds remaining on lockout, or 0 if not locked
 */
export async function getLockoutTimeRemaining(ipAddress: string): Promise<number> {
  const key = `account_lockout:${ipAddress}`;
  const ttl = await redis.ttl(key);
  return ttl > 0 ? ttl : 0;
}

/**
 * Session caching utilities
 */

/**
 * Store session data in Redis
 * @param tokenHash Hash of the JWT token (used as key)
 * @param sessionData Session data to store
 * @param expirationSeconds Expiration time in seconds
 */
export async function storeSession(
  tokenHash: string,
  sessionData: Record<string, any>,
  expirationSeconds: number
): Promise<void> {
  const key = `session:${tokenHash}`;
  await redis.setex(key, expirationSeconds, JSON.stringify(sessionData));
}

/**
 * Get session data from Redis
 * @param tokenHash Hash of the JWT token
 * @returns Session data or null if not found
 */
export async function getSession(tokenHash: string): Promise<Record<string, any> | null> {
  const key = `session:${tokenHash}`;
  const data = await redis.get(key);
  return data ? JSON.parse(data) : null;
}

/**
 * Delete session from Redis
 * @param tokenHash Hash of the JWT token
 */
export async function deleteSession(tokenHash: string): Promise<void> {
  const key = `session:${tokenHash}`;
  await redis.del(key);
}

export default redis;
