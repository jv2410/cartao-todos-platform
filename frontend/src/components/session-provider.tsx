'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { sessionMonitor } from '../lib/session-monitor';
import { activityTracker } from '../lib/activity-tracker';
import { SessionWarningDialog } from './session-warning-dialog';

/**
 * Session Provider Component
 * Manages session monitoring, activity tracking, and warning dialog
 */

interface SessionProviderProps {
  children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [showWarning, setShowWarning] = useState(false);
  const [expiresInSeconds, setExpiresInSeconds] = useState(0);

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/'];

  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {
    // Don't monitor session on public routes
    if (isPublicRoute) {
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    // Start activity tracking
    activityTracker.start();

    // Start session monitoring
    sessionMonitor.start(
      (expiresIn) => {
        // Session status callback
        const warningThreshold = sessionMonitor.getWarningThreshold();

        if (expiresIn <= warningThreshold && expiresIn > 0) {
          // Show warning dialog
          setExpiresInSeconds(expiresIn);
          setShowWarning(true);
        } else {
          // Hide warning dialog if session was extended
          setShowWarning(false);
        }
      },
      () => {
        // Session expired callback
        handleLogout('Sua sessão expirou. Por favor, faça login novamente.');
      }
    );

    // Multi-tab synchronization via localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'session_logout' && e.newValue === 'true') {
        // Another tab logged out - logout this tab too
        handleLogout('Você foi desconectado em outra aba.');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      activityTracker.stop();
      sessionMonitor.stop();
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isPublicRoute, pathname]);

  const handleExtendSession = async (): Promise<boolean> => {
    const success = await activityTracker.extendSessionManually();
    if (success) {
      setShowWarning(false);
    }
    return success;
  };

  const handleLogout = (message?: string) => {
    // Clear token
    localStorage.removeItem('token');

    // Broadcast logout to other tabs
    localStorage.setItem('session_logout', 'true');
    setTimeout(() => {
      localStorage.removeItem('session_logout');
    }, 100);

    // Stop monitoring
    activityTracker.stop();
    sessionMonitor.stop();

    // Redirect to login with message
    if (message) {
      router.push(`/login?message=${encodeURIComponent(message)}`);
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      {children}
      <SessionWarningDialog
        isOpen={showWarning}
        expiresInSeconds={expiresInSeconds}
        onExtend={handleExtendSession}
        onLogout={() => handleLogout()}
      />
    </>
  );
}
