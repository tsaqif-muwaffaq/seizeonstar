import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '../api/apiClient';
import { useNetworkAwareFetch } from './useNetInfo';

interface UseApiOptions {
  immediate?: boolean;
  timeout?: number;
}

export const useApi = <T>(url: string, options: UseApiOptions = {}) => {
  const { immediate = true, timeout = 7000 } = options;
  const { canMakeRequests } = useNetworkAwareFetch();
  
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (customUrl?: string) => {
    if (!canMakeRequests) {
      setError('No internet connection');
      return null;
    }

    setLoading(true);
    setError(null);

    let timeoutId: NodeJS.Timeout | null = null;

    try {
      const controller = new AbortController();
      timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await apiClient.get(customUrl || url, {
        signal: controller.signal,
      });

      if (timeoutId) clearTimeout(timeoutId);
      setData(response.data);
      return response.data;
    } catch (err: any) {
      if (timeoutId) clearTimeout(timeoutId);
      
      if (err.name === 'AbortError') {
        setError('Request timeout');
      } else if (err.response) {
        setError(`Server error: ${err.response.status}`);
      } else {
        setError(err.message || 'Network error');
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, canMakeRequests, timeout]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute, refetch: execute };
};