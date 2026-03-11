import bcrypt from 'bcrypt';

/**
 * Bcrypt Utilities
 * Password hashing and comparison functions for secure authentication
 * Uses cost factor 12 for strong security (recommended for 2024+)
 */

const SALT_ROUNDS = 10; // Cost factor for bcrypt (higher = more secure but slower)

/**
 * Hash a plain text password using bcrypt
 * @param password Plain text password to hash
 * @returns Promise resolving to bcrypt hash string
 * @throws Error if hashing fails
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  } catch (error) {
    console.error('Password hashing error:', error);
    throw new Error('Failed to hash password');
  }
}

/**
 * Compare a plain text password with a bcrypt hash
 * @param password Plain text password to verify
 * @param hash Bcrypt hash to compare against
 * @returns Promise resolving to true if password matches, false otherwise
 */
export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
}

/**
 * Verify if a string is a valid bcrypt hash
 * @param hash String to check
 * @returns True if string is a valid bcrypt hash
 */
export function isBcryptHash(hash: string): boolean {
  // Bcrypt hashes start with $2a$, $2b$, or $2y$ and are 60 characters long
  const bcryptRegex = /^\$2[aby]\$\d{2}\$.{53}$/;
  return bcryptRegex.test(hash);
}

export default {
  hashPassword,
  comparePassword,
  isBcryptHash,
};
