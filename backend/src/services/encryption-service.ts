import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Encryption Service
 * Handles AES-256-GCM encryption/decryption for sensitive data
 * Used for encrypting Meta API access tokens
 */

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; // 16 bytes for AES
const AUTH_TAG_LENGTH = 16; // 16 bytes for GCM auth tag
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

/**
 * Validate that encryption key is properly configured
 * @throws Error if encryption key is missing or invalid
 */
function validateEncryptionKey(): void {
  if (!ENCRYPTION_KEY) {
    throw new Error(
      'ENCRYPTION_KEY is not configured in environment variables. ' +
      'Generate one with: openssl rand -hex 32'
    );
  }

  // Key should be 64 hex characters (32 bytes)
  if (ENCRYPTION_KEY.length !== 64) {
    throw new Error(
      'ENCRYPTION_KEY must be 64 hex characters (32 bytes). ' +
      'Generate one with: openssl rand -hex 32'
    );
  }

  if (!/^[0-9a-f]+$/i.test(ENCRYPTION_KEY)) {
    throw new Error('ENCRYPTION_KEY must contain only hexadecimal characters');
  }
}

/**
 * Encrypt a string using AES-256-GCM
 * @param plainText Plain text string to encrypt
 * @returns Encrypted string in format: iv:authTag:cipherText (all hex encoded)
 * @throws Error if encryption fails
 */
export function encrypt(plainText: string): string {
  try {
    validateEncryptionKey();

    // Generate random IV (initialization vector)
    const iv = crypto.randomBytes(IV_LENGTH);

    // Create cipher with key and IV
    const key = Buffer.from(ENCRYPTION_KEY!, 'hex');
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    // Encrypt the data
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // Get authentication tag (GCM provides authenticated encryption)
    const authTag = cipher.getAuthTag();

    // Return IV + authTag + cipherText (all hex encoded, separated by colons)
    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error(`Falha ao criptografar dados: ${(error as Error).message}`);
  }
}

/**
 * Decrypt a string using AES-256-GCM
 * @param encryptedData Encrypted string in format: iv:authTag:cipherText
 * @returns Decrypted plain text string
 * @throws Error if decryption fails
 */
export function decrypt(encryptedData: string): string {
  try {
    validateEncryptionKey();

    // Split the encrypted data into components
    const parts = encryptedData.split(':');
    if (parts.length !== 3) {
      throw new Error('Formato de dados criptografados inválido');
    }

    const [ivHex, authTagHex, encryptedHex] = parts;

    // Convert from hex to buffers
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');

    // Create decipher with key and IV
    const key = Buffer.from(ENCRYPTION_KEY!, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);

    // Set authentication tag
    decipher.setAuthTag(authTag);

    // Decrypt the data
    let decrypted = decipher.update(encrypted);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString('utf8');
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error(`Falha ao descriptografar dados: ${(error as Error).message}`);
  }
}

/**
 * Mask a token to show only the last 4 characters
 * @param token Token string to mask
 * @returns Masked token (e.g., "••••••••1234")
 */
export function maskToken(token: string): string {
  if (!token || token.length <= 4) {
    return '••••';
  }

  const visibleChars = token.slice(-4);
  const maskedChars = '•'.repeat(Math.min(token.length - 4, 8));

  return maskedChars + visibleChars;
}

export default {
  encrypt,
  decrypt,
  maskToken,
};
