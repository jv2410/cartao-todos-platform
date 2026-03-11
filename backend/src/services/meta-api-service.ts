import axios, { AxiosError } from 'axios';

/**
 * Meta API Service
 * Handles communication with Meta Graph API for WhatsApp Business
 */

const META_API_BASE_URL = 'https://graph.facebook.com';
const META_API_VERSION = 'v18.0';
const REQUEST_TIMEOUT = 10000; // 10 seconds

export interface MetaApiTestResult {
  success: boolean;
  data?: {
    displayName: string;
    phoneNumber: string;
    verified: boolean;
    qualityRating: string;
  };
  error?: string;
  suggestions?: string[];
}

/**
 * Test connection to Meta API with provided credentials
 * Makes a GET request to Meta API to verify phone number ID and access token
 * @param phoneNumberId Phone Number ID (15-17 digits)
 * @param accessToken Meta API access token
 * @returns Test result with account details or error
 */
export async function testConnection(
  phoneNumberId: string,
  accessToken: string
): Promise<MetaApiTestResult> {
  try {
    const url = `${META_API_BASE_URL}/${META_API_VERSION}/${phoneNumberId}`;

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      timeout: REQUEST_TIMEOUT,
    });

    // Parse successful response
    const data = response.data;

    return {
      success: true,
      data: {
        displayName: data.verified_name || data.display_phone_number || 'N/A',
        phoneNumber: data.display_phone_number || phoneNumberId,
        verified: data.code_verification_status === 'VERIFIED',
        qualityRating: data.quality_rating || 'UNKNOWN',
      },
    };
  } catch (error) {
    // Handle various error scenarios
    if (axios.isAxiosError(error)) {
      return handleMetaApiError(error);
    }

    // Generic network error
    return {
      success: false,
      error: 'Erro de conexão com Meta API',
      suggestions: [
        'Verifique sua conexão com a internet',
        'Tente novamente em alguns minutos',
      ],
    };
  }
}

/**
 * Handle Meta API errors and return appropriate error messages
 * @param error Axios error object
 * @returns Formatted error result with troubleshooting suggestions
 */
function handleMetaApiError(error: AxiosError): MetaApiTestResult {
  if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
    // Timeout error
    return {
      success: false,
      error: 'Timeout ao conectar com Meta API',
      suggestions: [
        'A requisição excedeu o tempo limite de 10 segundos',
        'Verifique sua conexão com a internet',
        'Tente novamente em alguns minutos',
      ],
    };
  }

  if (!error.response) {
    // Network error (no response received)
    return {
      success: false,
      error: 'Não foi possível conectar à Meta API',
      suggestions: [
        'Verifique sua conexão com a internet',
        'Verifique se a Meta API não está fora do ar (status.facebook.com)',
        'Tente novamente em alguns minutos',
      ],
    };
  }

  const status = error.response.status;
  const errorData = error.response.data as any;

  switch (status) {
    case 401:
      // Unauthorized - Invalid or expired access token
      return {
        success: false,
        error: 'Falha na autenticação. Token de acesso inválido ou sem permissões suficientes.',
        suggestions: [
          'Verifique se o token de acesso está ativo e não expirou',
          'Certifique-se de que o token tem as permissões "business_management" e "whatsapp_business_messaging"',
          'Verifique se o token está associado à conta Business Manager correta',
        ],
      };

    case 403:
      // Forbidden - Insufficient permissions
      return {
        success: false,
        error: 'Permissões insuficientes',
        suggestions: [
          'Seu token de acesso não possui as permissões necessárias',
          'Permissões obrigatórias: business_management, whatsapp_business_messaging',
          'Regenere o token do System User com as permissões corretas no Meta Business Manager',
        ],
      };

    case 404:
      // Not Found - Phone Number ID not found
      return {
        success: false,
        error: 'Phone Number ID não encontrado',
        suggestions: [
          'Verifique se o Phone Number ID está correto (15-17 dígitos)',
          'Certifique-se de que o número está registrado na sua WhatsApp Business Account',
          'Verifique se o token de acesso tem permissão para acessar este número',
        ],
      };

    case 429:
      // Rate limit exceeded
      return {
        success: false,
        error: 'Limite de requisições excedido. Tente novamente em alguns minutos.',
        suggestions: [
          'A Meta API tem limite de 5000 requisições por hora',
          'Aguarde 5-10 minutos antes de testar novamente',
        ],
      };

    case 500:
    case 502:
    case 503:
    case 504:
      // Meta API internal error
      return {
        success: false,
        error: 'Erro interno da Meta API',
        suggestions: [
          'A Meta API está enfrentando problemas temporários',
          'Verifique o status em status.facebook.com',
          'Tente novamente em alguns minutos',
        ],
      };

    default:
      // Unknown error
      const errorMessage =
        errorData?.error?.message || 'Erro desconhecido ao conectar com Meta API';
      return {
        success: false,
        error: errorMessage,
        suggestions: [
          'Verifique se todos os campos estão preenchidos corretamente',
          'Entre em contato com o suporte se o problema persistir',
        ],
      };
  }
}

export default {
  testConnection,
};
