import { Router, Request, Response } from 'express';
import { authenticate } from '../middleware/auth.js';
import { saveCredentials, getCredentials, getDecryptedToken, testCredentials } from '../services/credential-service.js';
import { validateCredentials } from '../utils/credential-validator.js';
import Joi from 'joi';

/**
 * Settings Routes
 * Handles API credentials management and settings
 */

const router = Router();

/**
 * Input validation schema for credentials
 */
const credentialsSchema = Joi.object({
  waba_id: Joi.string()
    .pattern(/^\d{15,17}$/)
    .required()
    .messages({
      'string.empty': 'WABA ID é obrigatório',
      'string.pattern.base': 'WABA ID deve ser um número de 15-17 dígitos',
      'any.required': 'WABA ID é obrigatório',
    }),
  phone_number_id: Joi.string()
    .pattern(/^\d{15,17}$/)
    .required()
    .messages({
      'string.empty': 'Phone Number ID é obrigatório',
      'string.pattern.base': 'Phone Number ID deve ser um número de 15-17 dígitos',
      'any.required': 'Phone Number ID é obrigatório',
    }),
  access_token: Joi.string()
    .min(50)
    .required()
    .messages({
      'string.empty': 'Access Token é obrigatório',
      'string.min': 'Access Token deve ter no mínimo 50 caracteres',
      'any.required': 'Access Token é obrigatório',
    }),
  business_manager_id: Joi.string()
    .pattern(/^\d{15,17}$/)
    .optional()
    .allow('')
    .messages({
      'string.pattern.base': 'Business Manager ID deve ser um número de 15-17 dígitos',
    }),
});

/**
 * GET /api/settings/credentials
 * Get API credentials for the authenticated user
 * Returns masked access token (only last 4 characters visible)
 *
 * Success response (200):
 * {
 *   "waba_id": "123456789012345",
 *   "phone_number_id": "987654321098765",
 *   "access_token_masked": "••••••••1234",
 *   "business_manager_id": "555555555555555",
 *   "last_tested_at": "2024-03-11T00:00:00.000Z"
 * }
 *
 * Error responses:
 * - 401: Not authenticated
 * - 404: No credentials found
 * - 500: Internal server error
 */
router.get('/credentials', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    const credentials = await getCredentials(userId);

    if (!credentials) {
      res.status(404).json({
        error: 'Credenciais não encontradas',
        message: 'Nenhuma credencial configurada para este usuário',
      });
      return;
    }

    res.status(200).json({
      waba_id: credentials.wabaId,
      phone_number_id: credentials.phoneNumberId,
      access_token_masked: credentials.accessTokenMasked,
      business_manager_id: credentials.businessManagerId,
      last_tested_at: credentials.lastTestedAt,
    });
  } catch (error) {
    console.error('Get credentials route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao buscar credenciais',
    });
  }
});

/**
 * PUT /api/settings/credentials
 * Save or update API credentials
 * Encrypts access token before storing
 *
 * Request body:
 * {
 *   "waba_id": "123456789012345",
 *   "phone_number_id": "987654321098765",
 *   "access_token": "EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *   "business_manager_id": "555555555555555" (optional)
 * }
 *
 * Success response (200):
 * {
 *   "success": true,
 *   "message": "Credenciais salvas com sucesso"
 * }
 *
 * Error responses:
 * - 400: Invalid input or validation error
 * - 401: Not authenticated
 * - 500: Internal server error
 */
router.put('/credentials', authenticate, async (req: Request, res: Response) => {
  try {
    // Validate input using custom validator
    const validationResult = validateCredentials(req.body);

    if (!validationResult.isValid) {
      const firstError = Object.values(validationResult.errors)[0];
      res.status(400).json({
        error: 'Dados inválidos',
        message: firstError,
      });
      return;
    }

    // Also validate with Joi schema for consistency
    const { error, value } = credentialsSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        error: 'Dados inválidos',
        message: error.details[0].message,
      });
      return;
    }

    const userId = req.user!.userId;

    // Get client IP address
    const ipAddress = (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();

    // Save credentials
    const result = await saveCredentials(
      userId,
      {
        wabaId: value.waba_id,
        phoneNumberId: value.phone_number_id,
        accessToken: value.access_token,
        businessManagerId: value.business_manager_id || undefined,
      },
      ipAddress
    );

    if (!result.success) {
      res.status(500).json({
        error: 'Falha ao salvar credenciais',
        message: result.error,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Credenciais salvas com sucesso',
    });
  } catch (error) {
    console.error('Save credentials route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao salvar credenciais',
    });
  }
});

/**
 * POST /api/settings/credentials/decrypt-token
 * Get decrypted access token
 * Only called when user explicitly requests to view full token
 *
 * Success response (200):
 * {
 *   "access_token": "EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 * }
 *
 * Error responses:
 * - 401: Not authenticated
 * - 404: No credentials found
 * - 500: Internal server error
 */
router.post('/credentials/decrypt-token', authenticate, async (req: Request, res: Response) => {
  try {
    const userId = req.user!.userId;

    // Get client IP address
    const ipAddress = (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();

    const token = await getDecryptedToken(userId, ipAddress);

    if (!token) {
      res.status(404).json({
        error: 'Credenciais não encontradas',
        message: 'Nenhuma credencial configurada para este usuário',
      });
      return;
    }

    res.status(200).json({
      access_token: token,
    });
  } catch (error) {
    console.error('Decrypt token route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao descriptografar token',
    });
  }
});

/**
 * POST /api/settings/credentials/test
 * Test API credentials by connecting to Meta API
 * Returns success with account details or error with troubleshooting suggestions
 *
 * Request body:
 * {
 *   "waba_id": "123456789012345",
 *   "phone_number_id": "987654321098765",
 *   "access_token": "EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 * }
 *
 * Success response (200):
 * {
 *   "success": true,
 *   "data": {
 *     "displayName": "Cartão de Todos",
 *     "phoneNumber": "+55 11 3000-0000",
 *     "verified": true,
 *     "qualityRating": "GREEN"
 *   }
 * }
 *
 * Error response (200 with success: false):
 * {
 *   "success": false,
 *   "error": "Falha na autenticação...",
 *   "suggestions": ["...", "..."]
 * }
 *
 * Error responses:
 * - 400: Invalid input or validation error
 * - 401: Not authenticated
 * - 500: Internal server error
 */
router.post('/credentials/test', authenticate, async (req: Request, res: Response) => {
  try {
    // Validate input using custom validator
    const validationResult = validateCredentials(req.body);

    if (!validationResult.isValid) {
      const firstError = Object.values(validationResult.errors)[0];
      res.status(400).json({
        error: 'Dados inválidos',
        message: firstError,
      });
      return;
    }

    // Also validate with Joi schema for consistency
    const { error, value } = credentialsSchema.validate(req.body);

    if (error) {
      res.status(400).json({
        error: 'Dados inválidos',
        message: error.details[0].message,
      });
      return;
    }

    const userId = req.user!.userId;

    // Get client IP address
    const ipAddress = (
      req.headers['x-forwarded-for'] as string ||
      req.headers['x-real-ip'] as string ||
      req.socket.remoteAddress ||
      'unknown'
    ).split(',')[0].trim();

    // Test credentials
    const result = await testCredentials(
      userId,
      {
        wabaId: value.waba_id,
        phoneNumberId: value.phone_number_id,
        accessToken: value.access_token,
        businessManagerId: value.business_manager_id || undefined,
      },
      ipAddress
    );

    // Return result (success or error)
    res.status(200).json(result);
  } catch (error) {
    console.error('Test credentials route error:', error);
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: 'Erro ao testar credenciais',
    });
  }
});

export default router;
