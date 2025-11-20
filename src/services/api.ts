import axios from 'axios';
import KeychainService from './keychainService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/storage';
import ErrorHandler, { NetworkError, AuthError } from '../utils/errorHandler';
import useRetry from '../hooks/useRetry';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Save API Key to Keychain (call this once during app initialization)
export const initializeApiKey = async () => {
  try {
    const API_KEY_SECRET = 'demo_api_key_12345_secret';
    await KeychainService.saveApiKey(API_KEY_SECRET);
    console.log('API Key saved to Keychain');
  } catch (error) {
    console.error('Failed to initialize API key:', error);
  }
};

// Exponential backoff retry configuration
const retryConfig = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffFactor: 2
};

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      // Get API Key from Keychain for every request
      const apiKey = await KeychainService.getApiKey();
      
      if (!apiKey) {
        throw new Error('API_KEY_NOT_FOUND');
      }

      // Add API Key to header
      config.headers['X-API-Key'] = apiKey;

      // Add auth token if available
      const authCredentials = await KeychainService.getAuthToken();
      if (authCredentials?.password) {
        config.headers['Authorization'] = `Bearer ${authCredentials.password}`;
      }

      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    } catch (error) {
      if (error instanceof Error && error.message === 'API_KEY_NOT_FOUND') {
        ErrorHandler.handle(new AuthError('API configuration error'));
      }
      
      console.error('API Interceptor Error:', error);
      return config;
    }
  },
  (error) => {
    ErrorHandler.handle(error, 'request interceptor');
    return Promise.reject(error);
  }
);

// Response interceptor with retry logic
apiClient.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If we already retried this request, reject it
    if (originalRequest._retry) {
      return Promise.reject(error);
    }

    // Handle network errors with retry logic
    if (!error.response) {
      console.log('Network error, will retry:', error.message);
      
      // Mark request for retry
      originalRequest._retry = true;
      
      // Implement exponential backoff
      const delay = Math.min(
        retryConfig.initialDelay * Math.pow(retryConfig.backoffFactor, originalRequest._retryCount || 0),
        retryConfig.maxDelay
      );
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(apiClient(originalRequest));
        }, delay);
      });
    }

    // Handle specific HTTP errors
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth data
      await KeychainService.resetAuthToken();
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      
      ErrorHandler.handle(new AuthError('Session expired. Please login again.'));
      
      // You can dispatch an event or use context to handle logout
      console.log('Authentication expired, logging out...');
    } else if (error.response?.status >= 500) {
      ErrorHandler.handle(new NetworkError('Server error. Please try again later.', error.response.status));
    } else if (error.response?.status === 429) {
      ErrorHandler.handle(new NetworkError('Too many requests. Please slow down.', error.response.status));
    }
    
    return Promise.reject(error);
  }
);

// Enhanced API methods with retry logic
export const api = {
  // Generic request with retry
  async request(config: any) {
    const { retry } = useRetry(retryConfig);
    
    return retry(async () => {
      const response = await apiClient(config);
      return response.data;
    }, (attempt) => {
      console.log(`Retry attempt ${attempt} for ${config.url}`);
    });
  },

  // Products
  async getProducts(limit: number = 10, skip: number = 0) {
    return this.request({
      method: 'GET',
      url: `/products?limit=${limit}&skip=${skip}`,
    });
  },

  async getProduct(id: number) {
    return this.request({
      method: 'GET',
      url: `/products/${id}`,
    });
  },

  async searchProducts(query: string) {
    return this.request({
      method: 'GET',
      url: `/products/search?q=${query}`,
    });
  },

  // Auth (using dummyjson auth endpoints)
  async login(username: string, password: string) {
    return this.request({
      method: 'POST',
      url: '/auth/login',
      data: { username, password },
    });
  },

  async getCurrentUser() {
    return this.request({
      method: 'GET',
      url: '/auth/me',
    });
  },

  // Carts
  async getCart() {
    return this.request({
      method: 'GET',
      url: '/carts/1', // Using demo cart ID
    });
  },

  async addToCart(productId: number, quantity: number = 1) {
    return this.request({
      method: 'POST',
      url: '/carts/add',
      data: {
        userId: 1,
        products: [
          {
            id: productId,
            quantity: quantity,
          },
        ],
      },
    });
  },
};

// Utility function to check network connectivity
export const checkNetworkConnectivity = async (): Promise<boolean> => {
  try {
    await apiClient.get('/products/1');
    return true;
  } catch (error) {
    return false;
  }
};

// Utility function to handle API errors consistently
export const handleApiError = (error: any, context: string = 'API call') => {
  if (error.response) {
    // Server responded with error status
    ErrorHandler.handleNetworkError(error, error.response.status);
  } else if (error.request) {
    // Network error
    ErrorHandler.handleNetworkError(error);
  } else {
    // Other errors
    ErrorHandler.handle(error, context);
  }
};

export default apiClient;