import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

/**
 * API Client
 * Centralized HTTP client for backend API calls
 * Handles authentication, error handling, and request/response interceptors
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * Create axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Send cookies with requests (for httpOnly cookies)
});

/**
 * Request interceptor
 * Attach JWT token to requests if available
 */
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage (fallback if cookie is not available)
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle common error responses (401, 403, 500)
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      // Handle 401 Unauthorized (redirect to login)
      if (status === 401) {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
          window.location.href = '/login';
        }
      }

      // Handle 403 Forbidden
      if (status === 403) {
        console.error('Forbidden: You do not have permission to access this resource');
      }

      // Handle 500 Internal Server Error
      if (status === 500) {
        console.error('Internal Server Error: Something went wrong on the server');
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error: No response from server');
    } else {
      // Something else happened
      console.error('Request Error:', error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * Generic API request wrapper
 */
export async function apiRequest<T = any>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> {
  return apiClient.request<T>(config);
}

/**
 * Authentication API calls
 */

export interface LoginCredentials {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface LoginResponse {
  token: string;
  expires_in: number;
  user: {
    id: string;
    username: string;
    forcePasswordChange: boolean;
  };
}

export interface UserProfile {
  id: string;
  username: string;
  force_password_change: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Login user
 * @param credentials Username and password
 * @returns Login response with token and user data
 */
export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>('/api/auth/login', credentials);
  return response.data;
}

/**
 * Get current user profile
 * @returns User profile data
 */
export async function getCurrentUser(): Promise<UserProfile> {
  const response = await apiClient.get<UserProfile>('/api/auth/me');
  return response.data;
}

/**
 * Logout user
 * @returns Success message
 */
export async function logout(): Promise<{ message: string }> {
  const response = await apiClient.post<{ message: string }>('/api/auth/logout');
  return response.data;
}

export default apiClient;
