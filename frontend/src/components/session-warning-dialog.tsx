'use client';

import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

/**
 * Session Warning Dialog
 * Warns user about session expiration and provides options to extend or logout
 */

interface SessionWarningDialogProps {
  isOpen: boolean;
  expiresInSeconds: number;
  onExtend: () => Promise<boolean>;
  onLogout: () => void;
}

export function SessionWarningDialog({
  isOpen,
  expiresInSeconds,
  onExtend,
  onLogout,
}: SessionWarningDialogProps) {
  const [timeRemaining, setTimeRemaining] = useState(expiresInSeconds);
  const [isExtending, setIsExtending] = useState(false);

  useEffect(() => {
    setTimeRemaining(expiresInSeconds);
  }, [expiresInSeconds]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    // Countdown timer
    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Session expired - auto logout
          clearInterval(intervalId);
          onLogout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isOpen, onLogout]);

  const handleExtend = async () => {
    setIsExtending(true);
    const success = await onExtend();
    setIsExtending(false);

    if (!success) {
      // If extension failed, logout
      onLogout();
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="session-warning-title"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-yellow-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3
              id="session-warning-title"
              className="text-lg font-semibold text-gray-900 mb-2"
            >
              Sua sessão está expirando
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Sua sessão irá expirar em{' '}
              <strong className="text-red-600 text-lg">{formatTime(timeRemaining)}</strong>.
              Deseja estender sua sessão?
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleExtend}
            disabled={isExtending}
            className="flex-1"
          >
            {isExtending ? 'Estendendo...' : 'Estender Sessão'}
          </Button>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex-1"
          >
            Sair
          </Button>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Se não fizer nada, você será desconectado automaticamente quando o tempo expirar.
        </p>
      </div>
    </div>
  );
}
