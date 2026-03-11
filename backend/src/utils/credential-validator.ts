/**
 * Credential Validator
 * Validates Meta WhatsApp Business Account API credentials format
 */

export interface CredentialValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate WABA ID format
 * Must be 15-17 numeric digits
 * @param wabaId WABA ID to validate
 * @returns true if valid, false otherwise
 */
export function validateWabaId(wabaId: string): boolean {
  const wabaIdRegex = /^\d{15,17}$/;
  return wabaIdRegex.test(wabaId);
}

/**
 * Validate Phone Number ID format
 * Must be 15-17 numeric digits
 * @param phoneNumberId Phone Number ID to validate
 * @returns true if valid, false otherwise
 */
export function validatePhoneNumberId(phoneNumberId: string): boolean {
  const phoneNumberIdRegex = /^\d{15,17}$/;
  return phoneNumberIdRegex.test(phoneNumberId);
}

/**
 * Validate Access Token format
 * Must be at least 50 characters (typical Meta access tokens are much longer)
 * @param accessToken Access token to validate
 * @returns true if valid, false otherwise
 */
export function validateAccessToken(accessToken: string): boolean {
  return accessToken.length >= 50;
}

/**
 * Validate Business Manager ID format (optional)
 * Must be 15-17 numeric digits if provided
 * @param businessManagerId Business Manager ID to validate
 * @returns true if valid or not provided, false otherwise
 */
export function validateBusinessManagerId(
  businessManagerId?: string
): boolean {
  if (!businessManagerId || businessManagerId.trim() === '') {
    return true; // Optional field
  }
  const businessManagerIdRegex = /^\d{15,17}$/;
  return businessManagerIdRegex.test(businessManagerId);
}

/**
 * Validate all credentials
 * @param credentials Credential object to validate
 * @returns Validation result with error details
 */
export function validateCredentials(credentials: {
  waba_id: string;
  phone_number_id: string;
  access_token: string;
  business_manager_id?: string;
}): CredentialValidationResult {
  const errors: Record<string, string> = {};

  if (!credentials.waba_id) {
    errors.waba_id = 'WABA ID é obrigatório';
  } else if (!validateWabaId(credentials.waba_id)) {
    errors.waba_id = 'WABA ID deve ser um número de 15-17 dígitos';
  }

  if (!credentials.phone_number_id) {
    errors.phone_number_id = 'Phone Number ID é obrigatório';
  } else if (!validatePhoneNumberId(credentials.phone_number_id)) {
    errors.phone_number_id =
      'Phone Number ID deve ser um número de 15-17 dígitos';
  }

  if (!credentials.access_token) {
    errors.access_token = 'Access Token é obrigatório';
  } else if (!validateAccessToken(credentials.access_token)) {
    errors.access_token = 'Access Token deve ter no mínimo 50 caracteres';
  }

  if (
    credentials.business_manager_id &&
    !validateBusinessManagerId(credentials.business_manager_id)
  ) {
    errors.business_manager_id =
      'Business Manager ID deve ser um número de 15-17 dígitos';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export default {
  validateWabaId,
  validatePhoneNumberId,
  validateAccessToken,
  validateBusinessManagerId,
  validateCredentials,
};
