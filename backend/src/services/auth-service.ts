import { query } from '../db/connection.js';
import { comparePassword, hashPassword } from '../utils/bcrypt.js';
import { generateToken, getTokenExpirationSeconds } from '../utils/jwt.js';
import {
  incrementLoginAttempts,
  resetLoginAttempts,
  lockAccount,
  isAccountLocked,
  getLockoutTimeRemaining,
} from '../config/redis.js';
import crypto from 'crypto';
import { validatePassword } from '../utils/password-validator.js';
import { logAuditEvent } from './audit-service.js';

/**
 * Authentication Service
 * Business logic for user authentication and session management
 */

export interface User {
  id: string;
  username: string;
  password_hash: string;
  force_password_change: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface LoginResult {
  success: boolean;
  token?: string;
  expiresIn?: number;
  user?: {
    id: string;
    username: string;
    forcePasswordChange: boolean;
  };
  error?: string;
  lockoutTimeRemaining?: number;
}

/**
 * Authenticate user with username and password
 * Implements rate limiting (5 attempts = 15-minute lockout)
 * @param username User's username
 * @param password User's plain text password
 * @param ipAddress Client IP address for rate limiting
 * @param rememberMe Whether to extend session to 30 days
 * @returns Login result with token or error
 */
export async function login(
  username: string,
  password: string,
  ipAddress: string,
  rememberMe: boolean = false
): Promise<LoginResult> {
  try {
    // Check if account is locked due to too many failed attempts
    const locked = await isAccountLocked(ipAddress);
    if (locked) {
      const timeRemaining = await getLockoutTimeRemaining(ipAddress);
      return {
        success: false,
        error: 'Muitas tentativas falhadas. Tente novamente em alguns minutos.',
        lockoutTimeRemaining: timeRemaining,
      };
    }

    // Find user by username
    const result = await query<User>(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      // User not found - increment failed attempts
      await handleFailedLogin(ipAddress);
      return {
        success: false,
        error: 'Usuário ou senha inválidos',
      };
    }

    const user = result.rows[0];

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      // Invalid password - increment failed attempts
      await handleFailedLogin(ipAddress);
      return {
        success: false,
        error: 'Usuário ou senha inválidos',
      };
    }

    // Authentication successful - reset failed attempts
    await resetLoginAttempts(ipAddress);

    // Generate JWT token
    const token = generateToken(
      {
        userId: user.id,
        username: user.username,
      },
      rememberMe
    );

    const expiresIn = getTokenExpirationSeconds(rememberMe);

    // Create session in database
    await createSession(user.id, token, expiresIn);

    // Log successful login in audit log
    await logAuditEvent({
      userId: user.id,
      action: 'LOGIN',
      resourceType: 'user',
      resourceId: user.id,
      ipAddress,
    });

    return {
      success: true,
      token,
      expiresIn,
      user: {
        id: user.id,
        username: user.username,
        forcePasswordChange: user.force_password_change,
      },
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      error: 'Erro ao processar login. Tente novamente.',
    };
  }
}

/**
 * Handle failed login attempt
 * Increments counter and locks account after 5 attempts
 * @param ipAddress Client IP address
 */
async function handleFailedLogin(ipAddress: string): Promise<void> {
  const attempts = await incrementLoginAttempts(ipAddress);

  if (attempts >= 5) {
    await lockAccount(ipAddress);
    console.log(`Account locked for IP: ${ipAddress} (${attempts} failed attempts)`);
  }
}

/**
 * Create session record in database
 * @param userId User ID
 * @param token JWT token
 * @param expiresInSeconds Expiration time in seconds
 */
async function createSession(
  userId: string,
  token: string,
  expiresInSeconds: number
): Promise<void> {
  const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

  // Hash the token before storing (don't store raw JWT in database)
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  await query(
    `INSERT INTO sessions (user_id, token, expires_at, device_type)
     VALUES ($1, $2, $3, $4)`,
    [userId, tokenHash.substring(0, 500), expiresAt, 'web']
  );
}

/**
 * Get user by ID
 * @param userId User ID
 * @returns User object or null if not found
 */
export async function getUserById(userId: string): Promise<User | null> {
  try {
    const result = await query<User>(
      'SELECT * FROM users WHERE id = $1',
      [userId]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Get user by ID error:', error);
    return null;
  }
}

/**
 * Get user by username
 * @param username Username
 * @returns User object or null if not found
 */
export async function getUserByUsername(username: string): Promise<User | null> {
  try {
    const result = await query<User>(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );

    return result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error('Get user by username error:', error);
    return null;
  }
}

/**
 * Validate session token
 * @param token JWT token
 * @returns User object if session is valid, null otherwise
 */
export async function validateSession(token: string): Promise<User | null> {
  try {
    // Hash the token to match database storage
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    const result = await query<{ user_id: string; expires_at: Date }>(
      `SELECT user_id, expires_at FROM sessions
       WHERE token = $1 AND expires_at > NOW()`,
      [tokenHash.substring(0, 500)]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const session = result.rows[0];
    const user = await getUserById(session.user_id);

    return user;
  } catch (error) {
    console.error('Validate session error:', error);
    return null;
  }
}

/**
 * Logout user by invalidating session
 * @param token JWT token to invalidate
 */
export async function logout(token: string): Promise<void> {
  try {
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

    await query(
      'DELETE FROM sessions WHERE token = $1',
      [tokenHash.substring(0, 500)]
    );
  } catch (error) {
    console.error('Logout error:', error);
  }
}

/**
 * Change user password
 * Validates current password and updates to new password
 * @param userId User ID
 * @param currentPassword Current password (plain text)
 * @param newPassword New password (plain text)
 * @param ipAddress Client IP address
 * @returns Success result or error
 */
export async function changePassword(
  userId: string,
  currentPassword: string,
  newPassword: string,
  ipAddress: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Get user
    const user = await getUserById(userId);

    if (!user) {
      return {
        success: false,
        error: 'Usuário não encontrado',
      };
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password_hash);

    if (!isCurrentPasswordValid) {
      await logAuditEvent({
        userId,
        action: 'PASSWORD_CHANGE_FAILED',
        resourceType: 'user',
        resourceId: userId,
        changes: { reason: 'invalid_current_password' },
        ipAddress,
      });

      return {
        success: false,
        error: 'Senha atual incorreta',
      };
    }

    // Validate new password complexity
    const validation = validatePassword(newPassword);

    if (!validation.valid) {
      return {
        success: false,
        error: validation.errors.join(', '),
      };
    }

    // Check if new password is same as current password
    const isSameAsCurrentPassword = await comparePassword(newPassword, user.password_hash);

    if (isSameAsCurrentPassword) {
      return {
        success: false,
        error: 'A nova senha deve ser diferente da senha atual',
      };
    }

    // Hash new password
    const newPasswordHash = await hashPassword(newPassword);

    // Update password and set force_password_change to false
    await query(
      `UPDATE users
       SET password_hash = $1, force_password_change = FALSE, updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [newPasswordHash, userId]
    );

    // Log successful password change
    await logAuditEvent({
      userId,
      action: 'PASSWORD_CHANGED',
      resourceType: 'user',
      resourceId: userId,
      ipAddress,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error('Change password error:', error);
    return {
      success: false,
      error: 'Erro ao alterar senha. Tente novamente.',
    };
  }
}

export default {
  login,
  getUserById,
  getUserByUsername,
  validateSession,
  logout,
  changePassword,
};
