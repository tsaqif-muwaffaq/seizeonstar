import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './useAuth';

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

export const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const apiCall = useCallback(async (url: string, options: ApiOptions = {}) => {
    setIsLoading(true);
    setError(null);

    try {
      const config: RequestInit = {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(user?.token && { Authorization: `Bearer ${user.token}` }),
          ...options.headers,
        },
      };

      if (options.body && (options.method === 'POST' || options.method === 'PUT')) {
        config.body = JSON.stringify(options.body);
      }

      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user?.token]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isLoading,
    error,
    apiCall,
    clearError,
  };
};