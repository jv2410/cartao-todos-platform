'use client';

import { useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout, getCurrentUser, LoginCredentials, UserProfile } from '../lib/api-client';

/**
 * Authentication Hook
 * Manages authentication state and provides login/logout functions
 * Handles token storage and user session management
 */

interface UseAuthReturn {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Check if user is authenticated on mount
   * Fetches user profile if token exists
   */
  useEffect(() => {
    checkAuth();
  }, []);

  /**
   * Check authentication status (BYPASS MODE)
   */
  async function checkAuth() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      // BYPASS: If it's a mock token, create mock user profile
      if (token.startsWith('mock-token-')) {
        const mockProfile: UserProfile = {
          id: '1',
          username: 'demo-user',
          force_password_change: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        setUser(mockProfile);
        setIsLoading(false);
        return;
      }

      // For real tokens, try to fetch current user profile
      const profile = await getCurrentUser();
      setUser(profile);
    } catch (err) {
      console.error('Auth check failed:', err);
      // Clear invalid token
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Login user (BYPASS MODE - accepts any credentials)
   * @param credentials Username and password
   */
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      setError(null);
      setIsLoading(true);

      // BYPASS: Accept any credentials without backend validation
      // Create a mock token and user profile
      const mockToken = 'mock-token-' + Date.now();
      const mockProfile: UserProfile = {
        id: '1',
        username: credentials.username || 'user',
        force_password_change: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Store mock token in localStorage
      localStorage.setItem('token', mockToken);

      // Also store token in cookie for middleware authentication
      document.cookie = `token=${mockToken}; path=/; max-age=2592000`; // 30 days

      // Set mock user profile
      setUser(mockProfile);

      // Always redirect to dashboard (skip password change)
      window.location.href = '/dashboard';
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Erro ao fazer login. Tente novamente.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Logout user
   */
  async function logout(): Promise<void> {
    try {
      setIsLoading(true);

      await apiLogout();

      // Clear token and user state
      localStorage.removeItem('token');
      setUser(null);

      // Redirect to login page
      window.location.href = '/login';
    } catch (err) {
      console.error('Logout failed:', err);

      // Even if API call fails, clear local state
      localStorage.removeItem('token');
      setUser(null);
      window.location.href = '/login';
    } finally {
      setIsLoading(false);
    }
  }

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    error,
  };
}

export default useAuth;
