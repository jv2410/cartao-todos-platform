'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import FormField from '@/components/ui/form-field';
import Button from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import clsx from 'clsx';

/**
 * Login Page
 * User authentication page with username/password form
 * Supports "remember me" option for extended sessions
 * Text in Brazilian Portuguese (pt-BR)
 */

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    remember_me: false,
  });

  const [validationErrors, setValidationErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const [showPassword, setShowPassword] = useState(false);

  /**
   * Validate form inputs
   * @returns True if form is valid, false otherwise
   */
  function validateForm(): boolean {
    const errors: typeof validationErrors = {};

    if (!formData.username.trim()) {
      errors.username = 'Usuário é obrigatório';
    } else if (formData.username.length < 3) {
      errors.username = 'Usuário deve ter no mínimo 3 caracteres';
    }

    if (!formData.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      errors.password = 'Senha deve ter no mínimo 6 caracteres';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  /**
   * Handle form submission
   */
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      // Router navigation is handled in useAuth hook after successful login
    } catch (err) {
      // Error is handled in useAuth hook and displayed via error state
      console.error('Login error:', err);
    }
  }

  /**
   * Handle input change
   */
  function handleChange(field: string, value: string | boolean) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field
    if (validationErrors[field as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Cartão Todos
            </h1>
            <p className="text-gray-600">
              Plataforma de Mensagens Meta
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
            >
              <div className="flex">
                <svg
                  className="h-5 w-5 text-red-600 mr-2 flex-shrink-0"
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
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <FormField
              label="Usuário"
              type="text"
              value={formData.username}
              onChange={(e) => handleChange('username', e.target.value)}
              errorMessage={validationErrors.username}
              placeholder="Digite seu usuário"
              required
              autoComplete="username"
              autoFocus
            />

            {/* Password Field with Visibility Toggle */}
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Digite sua senha"
                  required
                  autoComplete="current-password"
                  className={clsx(
                    'w-full px-4 py-2 pr-12 border rounded-lg',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
                    'transition-colors',
                    validationErrors.password
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-300 bg-white'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" />
                      <path d="M15.171 13.576l1.414 1.414a2 2 0 01-2.828 2.828l-1.414-1.414m2.828-5.656l2.83-2.829a2 2 0 00-2.83-2.83l-2.83 2.83m2.83 9.314l-14-14" />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {validationErrors.password && (
                <p className="mt-2 text-sm text-red-600">{validationErrors.password}</p>
              )}
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-6">
              <input
                id="remember-me"
                type="checkbox"
                checked={formData.remember_me}
                onChange={(e) => handleChange('remember_me', e.target.checked)}
                className={clsx(
                  'h-4 w-4 text-blue-600 border-gray-300 rounded',
                  'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  'cursor-pointer'
                )}
              />
              <label
                htmlFor="remember-me"
                className="ml-2 text-sm text-gray-700 cursor-pointer"
              >
                Lembrar de mim (30 dias)
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Footer Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Primeira vez? Use a senha padrão:{' '}
              <code className="px-2 py-1 bg-gray-100 rounded text-blue-600 font-mono">
                100101
              </code>
            </p>
          </div>
        </div>

        {/* Version Info */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Cartão Todos v0.1.0
          </p>
        </div>
      </div>
    </div>
  );
}
