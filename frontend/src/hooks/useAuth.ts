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
   * Check authentication status
   */
  async function checkAuth() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsLoading(false);
        return;
      }

      // Fetch current user profile
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
   * Login user
   * @param credentials Username and password
   */
  async function login(credentials: LoginCredentials): Promise<void> {
    try {
      setError(null);
      setIsLoading(true);

      const response = await apiLogin(credentials);

      // Store token in localStorage
      localStorage.setItem('token', response.token);

      // Fetch user profile
      const profile = await getCurrentUser();
      setUser(profile);

      // Redirect to dashboard or password change page
      if (profile.force_password_change) {
        window.location.href = '/change-password';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      console.error('Login failed:', err);

      // Extract error message from API response
      const errorMessage = err.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
      setError(errorMessage);

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
