import { query } from '../db/connection.js';
import { encrypt, decrypt, maskToken } from './encryption-service.js';
import { logAuditEvent } from './audit-service.js';

/**
 * Credential Service
 * Handles Meta API credentials management with encryption
 */

export interface ApiCredentials {
  id: string;
  userId: string;
  wabaId: string;
  phoneNumberId: string;
  encryptedAccessToken: string;
  businessManagerId?: string;
  lastTestedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CredentialInput {
  wabaId: string;
  phoneNumberId: string;
  accessToken: string;
  businessManagerId?: string;
}

/**
 * Save or update API credentials for a user
 * Encrypts access token before storing
 * @param userId User ID
 * @param credentials Credential data
 * @param ipAddress Client IP address
 * @returns Success result
 */
export async function saveCredentials(
  userId: string,
  credentials: CredentialInput,
  ipAddress: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Encrypt access token
    const encryptedToken = encrypt(credentials.accessToken);

    // Check if credentials already exist for this user
    const existing = await getCredentialsByUserId(userId);

    if (existing) {
      // Update existing credentials
      await query(
        `UPDATE api_credentials
         SET waba_id = $1, phone_number_id = $2, encrypted_access_token = $3,
             business_manager_id = $4, updated_at = CURRENT_TIMESTAMP
         WHERE user_id = $5`,
        [
          credentials.wabaId,
          credentials.phoneNumberId,
          encryptedToken,
          credentials.businessManagerId || null,
          userId,
        ]
      );

      // Log credential update
      await logAuditEvent({
        userId,
        action: 'CREDENTIALS_UPDATED',
        resourceType: 'api_credentials',
        resourceId: existing.id,
        changes: {
          waba_id: credentials.wabaId,
          phone_number_id: credentials.phoneNumberId,
          access_token: maskToken(credentials.accessToken),
          business_manager_id: credentials.businessManagerId,
        },
        ipAddress,
      });
    } else {
      // Insert new credentials
      const result = await query(
        `INSERT INTO api_credentials (user_id, waba_id, phone_number_id, encrypted_access_token, business_manager_id)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [
          userId,
          credentials.wabaId,
          credentials.phoneNumberId,
          encryptedToken,
          credentials.businessManagerId || null,
        ]
      );

      const credentialId = result.rows[0].id;

      // Log credential creation
      await logAuditEvent({
        userId,
        action: 'CREDENTIALS_CREATED',
        resourceType: 'api_credentials',
        resourceId: credentialId,
        changes: {
          waba_id: credentials.wabaId,
          phone_number_id: credentials.phoneNumberId,
          access_token: maskToken(credentials.accessToken),
          business_manager_id: credentials.businessManagerId,
        },
        ipAddress,
      });
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error('Save credentials error:', error);
    return {
      success: false,
      error: 'Erro ao salvar credenciais. Tente novamente.',
    };
  }
}

/**
 * Get API credentials for a user (with masked token)
 * @param userId User ID
 * @returns Credentials with masked token
 */
export async function getCredentials(
  userId: string
): Promise<{
  wabaId: string;
  phoneNumberId: string;
  accessTokenMasked: string;
  businessManagerId?: string;
  lastTestedAt?: Date;
} | null> {
  try {
    const credentials = await getCredentialsByUserId(userId);

    if (!credentials) {
      return null;
    }

    // Decrypt token to mask it properly
    const decryptedToken = decrypt(credentials.encryptedAccessToken);
    const maskedToken = maskToken(decryptedToken);

    return {
      wabaId: credentials.wabaId,
      phoneNumberId: credentials.phoneNumberId,
      accessTokenMasked: maskedToken,
      businessManagerId: credentials.businessManagerId || undefined,
      lastTestedAt: credentials.lastTestedAt || undefined,
    };
  } catch (error) {
    console.error('Get credentials error:', error);
    return null;
  }
}

/**
 * Get decrypted access token for a user
 * Should only be called when explicitly requested (e.g., "Show Token" button)
 * @param userId User ID
 * @param ipAddress Client IP address
 * @returns Decrypted access token
 */
export async function getDecryptedToken(
  userId: string,
  ipAddress: string
): Promise<string | null> {
  try {
    const credentials = await getCredentialsByUserId(userId);

    if (!credentials) {
      return null;
    }

    // Decrypt token
    const decryptedToken = decrypt(credentials.encryptedAccessToken);

    // Log token access
    await logAuditEvent({
      userId,
      action: 'CREDENTIALS_VIEWED',
      resourceType: 'api_credentials',
      resourceId: credentials.id,
      changes: {
        access_token: maskToken(decryptedToken),
      },
      ipAddress,
    });

    return decryptedToken;
  } catch (error) {
    console.error('Get decrypted token error:', error);
    return null;
  }
}

/**
 * Internal helper: Get raw credentials from database
 * @param userId User ID
 * @returns Raw credentials from database
 */
async function getCredentialsByUserId(userId: string): Promise<ApiCredentials | null> {
  try {
    const result = await query<{
      id: string;
      user_id: string;
      waba_id: string;
      phone_number_id: string;
      encrypted_access_token: string;
      business_manager_id: string | null;
      last_tested_at: Date | null;
      created_at: Date;
      updated_at: Date;
    }>(
      'SELECT * FROM api_credentials WHERE user_id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return null;
    }

    const row = result.rows[0];

    return {
      id: row.id,
      userId: row.user_id,
      wabaId: row.waba_id,
      phoneNumberId: row.phone_number_id,
      encryptedAccessToken: row.encrypted_access_token,
      businessManagerId: row.business_manager_id || undefined,
      lastTestedAt: row.last_tested_at || undefined,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  } catch (error) {
    console.error('Get credentials by user ID error:', error);
    return null;
  }
}

/**
 * Test API credentials by calling Meta API
 * Updates last_tested_at timestamp if test succeeds
 * @param userId User ID
 * @param credentials Credentials to test
 * @param ipAddress Client IP address
 * @returns Test result with Meta account details or error
 */
export async function testCredentials(
  userId: string,
  credentials: CredentialInput,
  ipAddress: string
): Promise<{
  success: boolean;
  data?: {
    displayName: string;
    phoneNumber: string;
    verified: boolean;
    qualityRating: string;
  };
  error?: string;
  suggestions?: string[];
}> {
  try {
    // Import Meta API service dynamically to avoid circular dependencies
    const { testConnection } = await import('./meta-api-service.js');

    // Call Meta API to test connection
    const result = await testConnection(
      credentials.phoneNumberId,
      credentials.accessToken
    );

    if (result.success) {
      // Update last_tested_at timestamp in database
      await updateLastTestedAt(userId);

      // Log successful test
      await logAuditEvent({
        userId,
        action: 'CREDENTIALS_TESTED',
        resourceType: 'api_credentials',
        resourceId: userId,
        changes: {
          phone_number_id: credentials.phoneNumberId,
          result: 'success',
        },
        ipAddress,
      });
    } else {
      // Log failed test
      await logAuditEvent({
        userId,
        action: 'CREDENTIALS_TEST_FAILED',
        resourceType: 'api_credentials',
        resourceId: userId,
        changes: {
          phone_number_id: credentials.phoneNumberId,
          result: 'failed',
          error: result.error,
        },
        ipAddress,
      });
    }

    return result;
  } catch (error) {
    console.error('Test credentials error:', error);
    return {
      success: false,
      error: 'Erro ao testar credenciais. Tente novamente.',
    };
  }
}

/**
 * Update last_tested_at timestamp for user credentials
 * @param userId User ID
 */
async function updateLastTestedAt(userId: string): Promise<void> {
  try {
    await query(
      `UPDATE api_credentials
       SET last_tested_at = CURRENT_TIMESTAMP
       WHERE user_id = $1`,
      [userId]
    );
  } catch (error) {
    console.error('Update last_tested_at error:', error);
  }
}

export default {
  saveCredentials,
  getCredentials,
  getDecryptedToken,
  testCredentials,
};
