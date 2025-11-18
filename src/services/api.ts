import axios from 'axios';
import KeychainService from './keychainService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../utils/storage';

// Create axios instance
const apiClient = axios.create({
  baseURL: 'https://your-api-domain.com/api',
  timeout: 10000,
});

// Save API Key to Keychain (call this once during app initialization)
export const initializeApiKey = async () => {
  try {
    const API_KEY_SECRET = 'API_KEY_SECRET_XYZ_12345';
    await KeychainService.saveApiKey(API_KEY_SECRET);
    console.log('API Key saved to Keychain');
  } catch (error) {
    console.error('Failed to initialize API key:', error);
  }
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

      return config;
    } catch (error) {
      if (error instanceof Error && error.message === 'API_KEY_NOT_FOUND') {
        // Simulate 401 Unauthorized
        return Promise.reject({
          response: {
            status: 401,
            data: { message: 'API Key not found' },
          },
        });
      }
      
      console.error('API Interceptor Error:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - clear auth data
      await KeychainService.resetAuthToken();
      await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
      
      // You can dispatch an event or use context to handle logout
      console.log('Authentication expired, logging out...');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;