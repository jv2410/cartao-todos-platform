'use client';

import React from 'react';
import { calculatePasswordStrength } from '../lib/password-validation';

/**
 * Password Strength Indicator Component
 * Visual bar showing password strength (weak/medium/strong)
 */

interface PasswordStrengthIndicatorProps {
  password: string;
}

export function PasswordStrengthIndicator({ password }: PasswordStrengthIndicatorProps) {
  if (!password) {
    return null;
  }

  const strength = calculatePasswordStrength(password);

  const strengthConfig = {
    weak: {
      label: 'Fraca',
      color: 'bg-red-500',
      width: 'w-1/3',
      textColor: 'text-red-700',
    },
    medium: {
      label: 'Média',
      color: 'bg-yellow-500',
      width: 'w-2/3',
      textColor: 'text-yellow-700',
    },
    strong: {
      label: 'Forte',
      color: 'bg-green-500',
      width: 'w-full',
      textColor: 'text-green-700',
    },
  };

  const config = strengthConfig[strength];

  return (
    <div className="mt-2" aria-live="polite">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">Força da senha:</span>
        <span className={`text-sm font-semibold ${config.textColor}`}>
          {config.label}
        </span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${config.color} ${config.width} transition-all duration-300`}
          role="progressbar"
          aria-valuenow={strength === 'weak' ? 33 : strength === 'medium' ? 66 : 100}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Força da senha: ${config.label}`}
        />
      </div>
    </div>
  );
}

export default PasswordStrengthIndicator;
