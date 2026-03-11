'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Button from '@/components/ui/button';

/**
 * Dashboard Page
 * Main application dashboard (placeholder for now)
 * Will be implemented in future stories
 */
export default function DashboardPage() {
  const router = useRouter();
  const { user, isLoading, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Cartão Todos
              </h1>
              <p className="text-sm text-gray-600">
                Plataforma de Mensagens Meta
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.username}
                </p>
                <p className="text-xs text-gray-500">
                  Administrador
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logout()}
              >
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Force Password Change Warning */}
        {user.force_password_change && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex">
              <svg
                className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-yellow-800">
                  Alteração de senha obrigatória
                </h3>
                <p className="text-sm text-yellow-700 mt-1">
                  Por favor, altere sua senha padrão antes de continuar.
                  <button
                    onClick={() => router.push('/change-password')}
                    className="ml-2 underline font-medium hover:text-yellow-900"
                  >
                    Alterar senha agora
                  </button>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Bem-vindo ao Dashboard
          </h2>
          <p className="text-gray-600">
            Este é um placeholder para o dashboard principal. As funcionalidades serão implementadas nas próximas histórias.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium text-blue-900">Credenciais API</h3>
              <p className="text-sm text-blue-700 mt-2">
                Gerencie suas credenciais do WhatsApp Business API
              </p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium text-green-900">Envio de Mensagens</h3>
              <p className="text-sm text-green-700 mt-2">
                Envie mensagens em massa via WhatsApp
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium text-purple-900">Relatórios</h3>
              <p className="text-sm text-purple-700 mt-2">
                Visualize logs e auditoria de atividades
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
