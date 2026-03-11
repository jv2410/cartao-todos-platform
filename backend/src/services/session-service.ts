import { query } from '../db/connection.js';
import crypto from 'crypto';
import { getTokenExpirationSeconds } from '../utils/jwt.js';

/**
 * Session Service
 * Handles session management, extension, and status checks
 */

export interface SessionStatus {
  active: boolean;
  expiresAt?: Date;
  expiresInSeconds?: number;
}

/**
 * Get session status for a given token
 * @param token JWT token
 * @returns Session status with expiration details
 */
export async function getSessionStatus(token: string): Promise<SessionStatus> {
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const result = await query<{ expires_at: Date }>(
      `SELECT expires_at FROM sessions
       WHERE token = $1 AND expires_at > NOW()`,
      [tokenHash.substring(0, 500)]
    );

    if (result.rows.length === 0) {
      return {
        active: false,
      };
    }

    const session = result.rows[0];
    const expiresAt = new Date(session.expires_at);
    const now = new Date();
    const expiresInSeconds = Math.floor((expiresAt.getTime() - now.getTime()) / 1000);

    return {
      active: true,
      expiresAt,
      expiresInSeconds,
    };
  } catch (error) {
    console.error('Get session status error:', error);
    return {
      active: false,
    };
  }
}

/**
 * Extend session expiration by 8 hours
 * @param token JWT token
 * @returns New expiration date or null if session not found
 */
export async function extendSession(token: string): Promise<Date | null> {
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    // Extend session by 8 hours (28800 seconds)
    const extensionSeconds = getTokenExpirationSeconds(false); // 8 hours
    const newExpiresAt = new Date(Date.now() + extensionSeconds * 1000);

    const result = await query<{ expires_at: Date }>(
      `UPDATE sessions
       SET expires_at = $1, updated_at = CURRENT_TIMESTAMP
       WHERE token = $2 AND expires_at > NOW()
       RETURNING expires_at`,
      [newExpiresAt, tokenHash.substring(0, 500)]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return new Date(result.rows[0].expires_at);
  } catch (error) {
    console.error('Extend session error:', error);
    return null;
  }
}

/**
 * Destroy session (used for logout)
 * @param token JWT token
 */
export async function destroySession(token: string): Promise<void> {
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    await query(
      'DELETE FROM sessions WHERE token = $1',
      [tokenHash.substring(0, 500)]
    );
  } catch (error) {
    console.error('Destroy session error:', error);
  }
}

/**
 * Cleanup expired sessions
 * Should be called periodically (e.g., via cron job)
 * @returns Number of sessions deleted
 */
export async function cleanupExpiredSessions(): Promise<number> {
  try {
    const result = await query(
      'DELETE FROM sessions WHERE expires_at <= NOW()'
    );

    return result.rowCount || 0;
  } catch (error) {
    console.error('Cleanup expired sessions error:', error);
    return 0;
  }
}

export default {
  getSessionStatus,
  extendSession,
  destroySession,
  cleanupExpiredSessions,
};
