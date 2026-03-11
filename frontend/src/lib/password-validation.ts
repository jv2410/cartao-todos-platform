/**
 * Password Validation Utilities (Frontend)
 * Validates password complexity requirements on the client side
 * Matches backend validation for consistent UX
 */

export interface PasswordRequirement {
  id: string;
  label: string;
  test: (password: string) => boolean;
}

/**
 * Password requirements checklist
 */
export const PASSWORD_REQUIREMENTS: PasswordRequirement[] = [
  {
    id: 'minLength',
    label: 'Mínimo de 8 caracteres',
    test: (password: string) => password.length >= 8,
  },
  {
    id: 'uppercase',
    label: 'Pelo menos uma letra maiúscula',
    test: (password: string) => /[A-Z]/.test(password),
  },
  {
    id: 'lowercase',
    label: 'Pelo menos uma letra minúscula',
    test: (password: string) => /[a-z]/.test(password),
  },
  {
    id: 'number',
    label: 'Pelo menos um número',
    test: (password: string) => /[0-9]/.test(password),
  },
  {
    id: 'specialChar',
    label: 'Pelo menos um caractere especial (!@#$%^&*)',
    test: (password: string) => /[!@#$%^&*]/.test(password),
  },
];

/**
 * Additional validation for default password
 */
export function isDefaultPassword(password: string): boolean {
  return password === '100101';
}

/**
 * Check if password meets all requirements
 */
export function isPasswordValid(password: string): boolean {
  return PASSWORD_REQUIREMENTS.every((req) => req.test(password)) && !isDefaultPassword(password);
}

/**
 * Calculate password strength
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
  if (/[^A-Za-z0-9!@#$%^&*]/.test(password)) score++;

  if (score <= 3) return 'weak';
  if (score <= 5) return 'medium';
  return 'strong';
}
