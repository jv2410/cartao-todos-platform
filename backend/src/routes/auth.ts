import { Router, Request, Response } from 'express';
import { login, logout, getUserById, changePassword } from '../services/auth-service.js';
import { getSessionStatus, extendSession } from '../services/session-service.js';
import { logAuditEvent } from '../services/audit-service.js';
import { authenticate } from '../middleware/auth.js';
import Joi from 'joi';

/**
 * Authentication Routes
 * Handles login, logout, and user profile endpoints
 */

const router = Router();

/**
 * Input validation schemas
 */
const loginSchema = Joi.object({
  username: Joi.string().min(3).max(255).required().messages({
    'string.empty': 'Usuário é obrigatório',
    'string.min': 'Usuário deve ter no mínimo 3 caracteres',
    'any.required': 'Usuário é obrigatório',
  }),
  password: Joi.string().min(6).max(255).required().messages({
    'string.empty': 'Senha é obrigatória',
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'any.required': 'Senha é obrigatória',
  }),
  remember_me: Joi.boolean().optional().default(false),
});

/**
 * POST /api/auth/login
 * Authenticate user and return JWT token
 *
 * Request body:
 * {
 *   "username": "admin",
 *   "password": "100101",
 *   "remember_me": false (optional)
 * }
 *
 * Success response (200):
 * {
 *   "token": "eyJhbGciOiJIUzI1...",
 *   "expires_in": 28800,
 *   "user": {
 *     "id": "uuid",
 *     "username": "admin",
 *     "force_password_change": true
 *   }
 * }
 *
 * Error responses:
 * - 400: Invalid input
 * - 401: Invalid credentials
 * - 423: Account locked (too many failed attempts)
 * - 500: Internal server error
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    // Validate input
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        error: 'Dados inválidos',
        message: error.details[0].message,
      });
      return;
    }

    const { username, password, remember_me } = value;

    // Get client IP address (handle proxy headers)
    const ipAddress = (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();

    // Attempt login
    const result = await login(username, password, ipAddress, remember_me);

    if (!result.success) {
      // Check if account is locked
      if (result.lockoutTimeRemaining) {
        const minutes = Math.ceil(result.lockoutTimeRemaining / 60);
        res.status(423).json({
          error: 'Conta bloqueada',
          message: `Muitas tentativas falhadas. Tente novamente em ${minutes} minuto${minutes > 1 ? 's' : ''}.`,
          lockout_time_remaining: result.lockoutTimeRemaining,
        });
        return;
      }

      res.status(401).json({
        error: 'Autenticação falhou',
        message: result.error,
      });
      return;
    }

    // Set JWT token as httpOnly cookie for security
    res.cookie('token', result.token, {
      httpOnly: true, // Prevents JavaScript access (XSS protection)
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict', // CSRF protection
      maxAge: result.expiresIn! * 1000, // Convert to milliseconds
    });

    res.status(200).json({
      token: result.token,
      expires_in: result.expiresIn,
      user: result.user,
    });
  } catch (error) {
    console.error('Login route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao processar login',
    });
  }
});

/**
 * GET /api/auth/me
 * Get current authenticated user's profile
 * Requires authentication (JWT token in Authorization header or cookie)
 *
 * Success response (200):
 * {
 *   "id": "uuid",
 *   "username": "admin",
 *   "force_password_change": true,
 *   "created_at": "2024-03-11T00:00:00.000Z",
 *   "updated_at": "2024-03-11T00:00:00.000Z"
 * }
 *
 * Error responses:
 * - 401: Not authenticated
 * - 404: User not found
 * - 500: Internal server error
 */
router.get('/me', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const user = await getUserById(userId);

    if (!user) {
      res.status(404).json({
        error: 'Usuário não encontrado',
        message: 'O usuário autenticado não existe mais',
      });
      return;
    }

    // Return user profile (exclude password_hash)
    res.status(200).json({
      id: user.id,
      username: user.username,
      force_password_change: user.force_password_change,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao buscar perfil do usuário',
    });
  }
});

/**
 * POST /api/auth/logout
 * Logout user and invalidate session
 * Requires authentication (JWT token in Authorization header or cookie)
 *
 * Success response (200):
 * {
 *   "message": "Logout realizado com sucesso"
 * }
 *
 * Error responses:
 * - 401: Not authenticated
 * - 500: Internal server error
 */
router.post('/logout', authenticate, async (req: Request, res: Response) => {
  try {
    // Extract token from request
    const token = req.headers.authorization?.substring(7) || req.cookies?.token;

    if (token) {
      await logout(token);
    }

    // Clear cookie
    res.clearCookie('token');

    res.status(200).json({
      message: 'Logout realizado com sucesso',
    });
  } catch (error) {
    console.error('Logout route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao processar logout',
    });
  }
});

/**
 * Input validation schema for password change
 */
const changePasswordSchema = Joi.object({
  current_password: Joi.string().required().messages({
    'string.empty': 'Senha atual é obrigatória',
    'any.required': 'Senha atual é obrigatória',
  }),
  new_password: Joi.string().min(8).required().messages({
    'string.empty': 'Nova senha é obrigatória',
    'string.min': 'Nova senha deve ter no mínimo 8 caracteres',
    'any.required': 'Nova senha é obrigatória',
  }),
});

/**
 * POST /api/auth/change-password
 * Change user password
 * Requires authentication
 *
 * Request body:
 * {
 *   "current_password": "100101",
 *   "new_password": "NewSecure123!"
 * }
 *
 * Success response (200):
 * {
 *   "success": true,
 *   "message": "Senha alterada com sucesso"
 * }
 *
 * Error responses:
 * - 400: Invalid input or validation error
 * - 401: Not authenticated or invalid current password
 * - 500: Internal server error
 */
router.post('/change-password', authenticate, async (req: Request, res: Response) => {
  try {
    // Validate input
    const { error, value } = changePasswordSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        error: 'Dados inválidos',
        message: error.details[0].message,
      });
      return;
    }

    const { current_password, new_password } = value;
    const userId = req.user!.userId;

    // Get client IP address
    const ipAddress = (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();

    // Attempt password change
    const result = await changePassword(userId, current_password, new_password, ipAddress);

    if (!result.success) {
      res.status(401).json({
        error: 'Falha ao alterar senha',
        message: result.error,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Senha alterada com sucesso',
    });
  } catch (error) {
    console.error('Change password route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao processar alteração de senha',
    });
  }
});

/**
 * GET /api/auth/session-status
 * Get current session status and expiration time
 * Requires authentication
 *
 * Success response (200):
 * {
 *   "active": true,
 *   "expires_at": "2024-03-11T08:00:00.000Z",
 *   "expires_in_seconds": 28800
 * }
 *
 * Error responses:
 * - 401: Not authenticated or session expired
 * - 500: Internal server error
 */
router.get('/session-status', authenticate, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.substring(7) || req.cookies?.token;

    if (!token) {
      res.status(401).json({
        error: 'Não autenticado',
        message: 'Token não fornecido',
      });
      return;
    }

    const status = await getSessionStatus(token);

    if (!status.active) {
      res.status(401).json({
        error: 'Sessão expirada',
        message: 'Sua sessão expirou. Por favor, faça login novamente.',
      });
      return;
    }

    res.status(200).json({
      active: status.active,
      expires_at: status.expiresAt,
      expires_in_seconds: status.expiresInSeconds,
    });
  } catch (error) {
    console.error('Session status route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao verificar status da sessão',
    });
  }
});

/**
 * POST /api/auth/extend-session
 * Extend current session expiration by 8 hours
 * Requires authentication
 *
 * Success response (200):
 * {
 *   "success": true,
 *   "new_expires_at": "2024-03-11T16:00:00.000Z"
 * }
 *
 * Error responses:
 * - 401: Not authenticated or session expired
 * - 500: Internal server error
 */
router.post('/extend-session', authenticate, async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.substring(7) || req.cookies?.token;
    const userId = req.user!.userId;

    if (!token) {
      res.status(401).json({
        error: 'Não autenticado',
        message: 'Token não fornecido',
      });
      return;
    }

    const newExpiresAt = await extendSession(token);

    if (!newExpiresAt) {
      res.status(401).json({
        error: 'Sessão expirada',
        message: 'Não foi possível estender a sessão. Por favor, faça login novamente.',
      });
      return;
    }

    // Get client IP address
    const ipAddress = (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();

    // Log session extension
    await logAuditEvent({
      userId,
      action: 'SESSION_EXTENDED',
      resourceType: 'session',
      resourceId: userId,
      ipAddress,
    });

    res.status(200).json({
      success: true,
      new_expires_at: newExpiresAt,
    });
  } catch (error) {
    console.error('Extend session route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao estender sessão',
    });
  }
});

export default router;
