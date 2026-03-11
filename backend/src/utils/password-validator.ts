/**
 * Password Validation Utilities
 * Validates password complexity requirements
 * Used for password change and other password operations
 */

export interface PasswordValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate password complexity requirements
 * @param password Plain text password to validate
 * @returns Validation result with errors array
 */
export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('A senha deve ter no mínimo 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve incluir pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve incluir pelo menos uma letra minúscula');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve incluir pelo menos um número');
  }

  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('A senha deve incluir pelo menos um caractere especial (!@#$%^&*)');
  }

  if (password === '100101') {
    errors.push('A nova senha não pode ser a senha padrão');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate password strength (weak, medium, strong)
 * @param password Plain text password
 * @returns Strength level: 'weak', 'medium', or 'strong'
 */
export function calculatePasswordStrength(password: string): 'weak' | 'medium' | 'strong' {
  let score = 0;

  // Length
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[!@#$%^&*]/.test(password)) score++;

  // Additional complexity
  if (/[^A-Za-z0-9!@#$%^&*]/.test(password)) score++; // Other special chars

  if (score <= 3) return 'weak';
  if (score <= 5) return 'medium';
  return 'strong';
}

export default {
  validatePassword,
  calculatePasswordStrength,
};
