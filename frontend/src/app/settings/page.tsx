'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '../../lib/api-client';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Button } from '../../components/ui/button';
import { ConfirmDialog } from '../../components/ui/confirm-dialog';
import { TestResultBanner } from '../../components/settings/test-result-banner';

/**
 * Settings Page
 * Manages Meta API credentials configuration
 */

interface CredentialsData {
  waba_id: string;
  phone_number_id: string;
  access_token_masked: string;
  business_manager_id?: string;
  last_tested_at?: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    wabaId: '',
    phoneNumberId: '',
    accessToken: '',
    businessManagerId: '',
  });
  const [existingCredentials, setExistingCredentials] = useState<CredentialsData | null>(null);
  const [showToken, setShowToken] = useState(false);
  const [decryptedToken, setDecryptedToken] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingToken, setIsLoadingToken] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    type: 'success' | 'error';
    message: string;
    data?: any;
    suggestions?: string[];
  } | null>(null);

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      const response = await apiClient.get<CredentialsData>('/api/settings/credentials');
      setExistingCredentials(response.data);
      setFormData({
        wabaId: response.data.waba_id,
        phoneNumberId: response.data.phone_number_id,
        accessToken: '', // Don't pre-fill token for security
        businessManagerId: response.data.business_manager_id || '',
      });
    } catch (err: any) {
      if (err.response?.status !== 404) {
        console.error('Load credentials error:', err);
      }
      // 404 means no credentials yet, which is fine
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(null);
    setTestResult(null); // Reset test result when credentials change
  };

  const handleShowToken = async () => {
    if (showToken && decryptedToken) {
      // Hide token
      setShowToken(false);
      setDecryptedToken(null);
      return;
    }

    // Fetch decrypted token
    setIsLoadingToken(true);
    try {
      const response = await apiClient.post<{ access_token: string }>(
        '/api/settings/credentials/decrypt-token'
      );
      setDecryptedToken(response.data.access_token);
      setShowToken(true);
    } catch (err: any) {
      console.error('Decrypt token error:', err);
      const errorMessage =
        err.response?.data?.message || 'Erro ao carregar token. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoadingToken(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmDialog(true);
  };

  const handleConfirmSave = async () => {
    setShowConfirmDialog(false);
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    try {
      await apiClient.put('/api/settings/credentials', {
        waba_id: formData.wabaId,
        phone_number_id: formData.phoneNumberId,
        access_token: formData.accessToken,
        business_manager_id: formData.businessManagerId || undefined,
      });

      setSuccess('Credenciais salvas com sucesso!');
      setFormData((prev) => ({ ...prev, accessToken: '' })); // Clear token field
      await loadCredentials(); // Reload to get masked token
    } catch (err: any) {
      console.error('Save credentials error:', err);
      const errorMessage =
        err.response?.data?.message || 'Erro ao salvar credenciais. Tente novamente.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelSave = () => {
    setShowConfirmDialog(false);
  };

  const handleTestConnection = async () => {
    setError(null);
    setSuccess(null);
    setTestResult(null);
    setIsTesting(true);

    try {
      const response = await apiClient.post('/api/settings/credentials/test', {
        waba_id: formData.wabaId,
        phone_number_id: formData.phoneNumberId,
        access_token: formData.accessToken,
        business_manager_id: formData.businessManagerId || undefined,
      });

      if (response.data.success) {
        setTestResult({
          type: 'success',
          message: 'Conexão bem-sucedida!',
          data: response.data.data,
        });
        // Reload credentials to get updated last_tested_at
        await loadCredentials();
      } else {
        setTestResult({
          type: 'error',
          message: response.data.error || 'Erro ao testar conexão',
          suggestions: response.data.suggestions,
        });
      }
    } catch (err: any) {
      console.error('Test connection error:', err);
      const errorMessage =
        err.response?.data?.message || 'Erro ao testar conexão. Tente novamente.';
      setTestResult({
        type: 'error',
        message: errorMessage,
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const isFormValid =
    formData.wabaId &&
    formData.phoneNumberId &&
    formData.accessToken &&
    /^\d{15,17}$/.test(formData.wabaId) &&
    /^\d{15,17}$/.test(formData.phoneNumberId) &&
    formData.accessToken.length >= 50 &&
    (!formData.businessManagerId || /^\d{15,17}$/.test(formData.businessManagerId));

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Configurações
              </h1>
              <p className="text-sm text-gray-600">
                Configure as credenciais da Meta API para conectar ao WhatsApp Business
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Sair
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Meta API Configuration
              </h2>

              {/* WABA ID */}
              <div className="mb-4">
                <Label htmlFor="wabaId">WABA ID *</Label>
                <Input
                  id="wabaId"
                  name="wabaId"
                  type="text"
                  value={formData.wabaId}
                  onChange={handleChange}
                  placeholder="123456789012345"
                  required
                  pattern="\d{15,17}"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-gray-500">
                  WhatsApp Business Account ID (15-17 dígitos)
                </p>
              </div>

              {/* Phone Number ID */}
              <div className="mb-4">
                <Label htmlFor="phoneNumberId">Phone Number ID *</Label>
                <Input
                  id="phoneNumberId"
                  name="phoneNumberId"
                  type="text"
                  value={formData.phoneNumberId}
                  onChange={handleChange}
                  placeholder="987654321098765"
                  required
                  pattern="\d{15,17}"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-gray-500">
                  ID do número de telefone (15-17 dígitos)
                </p>
              </div>

              {/* Access Token */}
              <div className="mb-4">
                <Label htmlFor="accessToken">Access Token *</Label>
                {existingCredentials && !formData.accessToken ? (
                  <div className="mt-1">
                    <div className="flex items-center gap-2">
                      <Input
                        type="text"
                        value={
                          showToken && decryptedToken
                            ? decryptedToken
                            : existingCredentials.access_token_masked
                        }
                        disabled
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={handleShowToken}
                        variant="outline"
                        disabled={isLoadingToken}
                      >
                        {isLoadingToken
                          ? 'Carregando...'
                          : showToken
                          ? 'Ocultar'
                          : 'Mostrar'}
                      </Button>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      Token existente (clique em Mostrar para ver o token completo)
                    </p>
                    <Button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, accessToken: ' ' }))}
                      variant="outline"
                      className="mt-2 text-sm"
                    >
                      Atualizar Token
                    </Button>
                  </div>
                ) : (
                  <>
                    <Input
                      id="accessToken"
                      name="accessToken"
                      type="password"
                      value={formData.accessToken}
                      onChange={handleChange}
                      placeholder="EAAxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                      required
                      minLength={50}
                      className="mt-1"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Token de acesso da Meta API (mínimo 50 caracteres)
                    </p>
                  </>
                )}
              </div>

              {/* Business Manager ID (Optional) */}
              <div className="mb-4">
                <Label htmlFor="businessManagerId">Business Manager ID (Opcional)</Label>
                <Input
                  id="businessManagerId"
                  name="businessManagerId"
                  type="text"
                  value={formData.businessManagerId}
                  onChange={handleChange}
                  placeholder="555555555555555"
                  pattern="\d{15,17}"
                  className="mt-1"
                />
                <p className="mt-1 text-xs text-gray-500">
                  ID do Business Manager (15-17 dígitos, opcional)
                </p>
              </div>

              {/* Test Connection Button */}
              <div className="mt-6">
                <Button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={!isFormValid || isTesting}
                  variant="outline"
                  className="w-full"
                >
                  {isTesting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Testando...
                    </span>
                  ) : (
                    'Testar Conexão'
                  )}
                </Button>
              </div>

              {/* Test Result Banner */}
              {testResult && (
                <div className="mt-4">
                  <TestResultBanner
                    type={testResult.type}
                    message={testResult.message}
                    data={testResult.data}
                    suggestions={testResult.suggestions}
                    onDismiss={() => setTestResult(null)}
                  />
                </div>
              )}

              {existingCredentials?.last_tested_at && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className="text-sm text-blue-800 flex items-center">
                    <svg
                      className="h-4 w-4 mr-2 text-green-600"
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
                    Última conexão testada:{' '}
                    {new Date(existingCredentials.last_tested_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md" role="alert">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md" role="alert">
                <p className="text-sm text-green-800">{success}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full"
            >
              {isLoading ? 'Salvando...' : 'Salvar Credenciais'}
            </Button>
          </form>
        </div>

        {/* Navigation */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-sm text-gray-600 hover:text-gray-900 underline"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Confirmar Salvamento"
        message={
          existingCredentials
            ? 'Você tem certeza que deseja atualizar as credenciais? As credenciais existentes serão sobrescritas.'
            : 'Você tem certeza que deseja salvar essas credenciais?'
        }
        confirmLabel="Salvar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmSave}
        onCancel={handleCancelSave}
      />
    </div>
  );
}
