import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 * JWT Utilities
 * Token generation and verification for authentication
 * Uses HS256 algorithm with configurable expiration times
 */

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}
const JWT_ALGORITHM = 'HS256';

// Token expiration times
export const TOKEN_EXPIRATION = {
  DEFAULT: '8h', // 8 hours (28800 seconds)
  REMEMBER_ME: '30d', // 30 days for "remember me" option
} as const;

export interface TokenPayload {
  userId: string;
  username: string;
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

/**
 * Generate a JWT token for authenticated user
 * @param payload Token payload (userId, username)
 * @param rememberMe Whether to extend token expiration to 30 days
 * @returns Signed JWT token string
 */
export function generateToken(
  payload: Omit<TokenPayload, 'iat' | 'exp'>,
  rememberMe: boolean = false
): string {
  try {
    const expiresIn = rememberMe ? TOKEN_EXPIRATION.REMEMBER_ME : TOKEN_EXPIRATION.DEFAULT;

    const token = jwt.sign(
      {
        userId: payload.userId,
        username: payload.username,
      },
      JWT_SECRET,
      {
        algorithm: JWT_ALGORITHM,
        expiresIn,
      }
    );

    return token;
  } catch (error) {
    console.error('Token generation error:', error);
    throw new Error('Failed to generate authentication token');
  }
}

/**
 * Verify and decode a JWT token
 * @param token JWT token string to verify
 * @returns Decoded token payload if valid
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string): TokenPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
    }) as TokenPayload;

    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    } else {
      console.error('Token verification error:', error);
      throw new Error('Token verification failed');
    }
  }
}

/**
 * Decode a JWT token without verifying signature
 * Useful for checking token expiration before verification
 * @param token JWT token string
 * @returns Decoded token payload or null if invalid format
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const decoded = jwt.decode(token) as TokenPayload;
    return decoded;
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

/**
 * Get token expiration time in seconds
 * @param rememberMe Whether "remember me" option is enabled
 * @returns Expiration time in seconds
 */
export function getTokenExpirationSeconds(rememberMe: boolean = false): number {
  if (rememberMe) {
    return 30 * 24 * 60 * 60; // 30 days in seconds (2592000)
  }
  return 8 * 60 * 60; // 8 hours in seconds (28800)
}

export default {
  generateToken,
  verifyToken,
  decodeToken,
  getTokenExpirationSeconds,
  TOKEN_EXPIRATION,
};
