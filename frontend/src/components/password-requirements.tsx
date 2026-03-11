'use client';

import React from 'react';
import { PASSWORD_REQUIREMENTS } from '../lib/password-validation';

/**
 * Password Requirements Component
 * Displays password requirements checklist with real-time validation feedback
 */

interface PasswordRequirementsProps {
  password: string;
}

export function PasswordRequirements({ password }: PasswordRequirementsProps) {
  return (
    <div className="mt-3 space-y-2" role="list" aria-label="Requisitos de senha">
      <p className="text-sm font-medium text-gray-700">A senha deve conter:</p>
      <ul className="space-y-1.5">
        {PASSWORD_REQUIREMENTS.map((requirement) => {
          const isMet = requirement.test(password);
          return (
            <li
              key={requirement.id}
              className="flex items-center gap-2 text-sm"
              role="listitem"
            >
              <span
                className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                  isMet ? 'bg-green-500' : 'bg-gray-300'
                }`}
                aria-label={isMet ? 'Requisito atendido' : 'Requisito não atendido'}
              >
                {isMet && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className={isMet ? 'text-gray-900' : 'text-gray-500'}>
                {requirement.label}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PasswordRequirements;
