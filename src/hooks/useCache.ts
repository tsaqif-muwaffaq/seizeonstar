import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, getProductCacheKey } from '../utils/storage';

const TTL = {
  MEDIUM: 30 * 60 * 1000, // 30 minutes
} as const;

export const useCache = <T>(
  key: string, 
  fetchFn: () => Promise<T>
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFromCache = useCallback(async (): Promise<boolean> => {
    try {
      // FIX: Ganti Storage dengan AsyncStorage
      const cachedString = await AsyncStorage.getItem(key);
      if (cachedString) {
        const cached = JSON.parse(cachedString) as {value: T; timestamp: number};
        if (cached && (Date.now() - cached.timestamp < TTL.MEDIUM)) {
          setData(cached.value);
          return true;
        }
      }
      return false;
    } catch (err) {
      console.error(`Cache load error for ${key}:`, err);
      return false;
    }
  }, [key]);

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const freshData = await fetchFn();
      
      // Save to cache with timestamp
      // FIX: Ganti Storage dengan AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify({
        value: freshData,
        timestamp: Date.now()
      }));
      
      setData(freshData);
      return freshData;
    } catch (err) {
      const errorMsg = `Failed to fetch data for ${key}`;
      setError(errorMsg);
      console.error(errorMsg, err);
      throw err;
    }
  }, [key, fetchFn]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await fetchData();
    } finally {
      setLoading(false);
    }
  }, [fetchData]);

  // Cache-first strategy
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      
      // Try cache first
      const cacheHit = await loadFromCache();
      
      // If cache miss, fetch from network
      if (!cacheHit) {
        try {
          await fetchData();
        } catch (err) {
          // Error already handled in fetchData
        }
      }
      
      setLoading(false);
    };

    loadData();
  }, [loadFromCache, fetchData]);

  const invalidate = useCallback(async () => {
    // FIX: Ganti Storage dengan AsyncStorage
    await AsyncStorage.removeItem(key);
    setData(null);
  }, [key]);

  return {
    data,
    loading,
    error,
    refresh,
    invalidate,
  };
};

// Specific cache for categories
export const useCategoriesCache = (fetchFn: () => Promise<any>) => {
  return useCache(STORAGE_KEYS.CATEGORIES_CACHE, fetchFn);
};

// Product cache hook
export const useProductCache = (productId: number, fetchFn: () => Promise<any>) => {
  const cacheKey = getProductCacheKey(productId);
  return useCache(cacheKey, fetchFn);
};