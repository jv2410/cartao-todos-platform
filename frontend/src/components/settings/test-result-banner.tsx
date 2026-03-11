'use client';

import React from 'react';

/**
 * Test Result Banner Component
 * Displays success or error messages for credential testing
 */

interface TestResultBannerProps {
  type: 'success' | 'error';
  message: string;
  data?: {
    displayName: string;
    phoneNumber: string;
    verified: boolean;
    qualityRating: string;
  };
  suggestions?: string[];
  onDismiss?: () => void;
}

export function TestResultBanner({
  type,
  message,
  data,
  suggestions,
  onDismiss,
}: TestResultBannerProps) {
  if (type === 'success' && data) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-md relative" role="alert">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-green-800">Conexão bem-sucedida!</h3>
            <div className="mt-2 text-sm text-green-700 space-y-1">
              <p>
                <strong>Conta:</strong> {data.displayName}
              </p>
              <p>
                <strong>Telefone:</strong> {data.phoneNumber}
              </p>
              <p>
                <strong>Verificado:</strong> {data.verified ? 'Sim' : 'Não'}
              </p>
              <p>
                <strong>Qualidade:</strong> {data.qualityRating}
              </p>
            </div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-3 flex-shrink-0 text-green-600 hover:text-green-800"
              aria-label="Fechar"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md relative" role="alert">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-semibold text-red-800">Falha na conexão</h3>
            <p className="mt-1 text-sm text-red-700">{message}</p>
            {suggestions && suggestions.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-red-800">Sugestões para resolver:</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-sm text-red-700">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-3 flex-shrink-0 text-red-600 hover:text-red-800"
              aria-label="Fechar"
            >
              <svg
                className="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
