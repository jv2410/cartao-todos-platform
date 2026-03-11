import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../utils/jwt.js';
import { validateSession } from '../services/auth-service.js';

/**
 * Authentication Middleware
 * Verifies JWT token and attaches user data to request
 * Used to protect routes that require authentication
 */

// Extend Express Request type to include user data
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        username: string;
      };
    }
  }
}

/**
 * Extract JWT token from Authorization header or cookies
 * @param req Express request object
 * @returns JWT token string or null if not found
 */
function extractToken(req: Request): string | null {
  // Check Authorization header (Bearer token)
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }

  // Check cookies (httpOnly cookie)
  if (req.cookies && req.cookies.token) {
    return req.cookies.token;
  }

  return null;
}

/**
 * Authentication middleware
 * Verifies JWT token and validates session
 * Returns 401 if token is invalid or session is expired
 */
export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);

    if (!token) {
      res.status(401).json({
        error: 'Não autenticado',
        message: 'Token de autenticação não fornecido',
      });
      return;
    }

    // Verify JWT token signature and expiration
    let payload: TokenPayload;
    try {
      payload = verifyToken(token);
    } catch (error) {
      res.status(401).json({
        error: 'Não autenticado',
        message: (error as Error).message,
      });
      return;
    }

    // Validate session in database (check if session exists and not expired)
    const user = await validateSession(token);

    if (!user) {
      res.status(401).json({
        error: 'Não autenticado',
        message: 'Sessão inválida ou expirada',
      });
      return;
    }

    // Attach user data to request object
    req.user = {
      userId: payload.userId,
      username: payload.username,
    };

    next();
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao verificar autenticação',
    });
  }
}

/**
 * Optional authentication middleware
 * Attempts to authenticate but doesn't return 401 if token is missing
 * Useful for routes that have different behavior for authenticated users
 */
export async function optionalAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = extractToken(req);

    if (!token) {
      next();
      return;
    }

    try {
      const payload = verifyToken(token);
      const user = await validateSession(token);

      if (user) {
        req.user = {
          userId: payload.userId,
          username: payload.username,
        };
      }
    } catch (error) {
      // Silently ignore authentication errors for optional auth
      console.log('Optional authentication failed:', (error as Error).message);
    }

    next();
  } catch (error) {
    console.error('Optional authentication middleware error:', error);
    next();
  }
}

export default {
  authenticate,
  optionalAuthenticate,
};
