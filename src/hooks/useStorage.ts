import { useState, useCallback, useEffect } from 'react';
import StorageService from '../services/storageService';
import ErrorHandler from '../utils/errorHandler';

export const useStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [key]);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const stored = await StorageService.getItem<T>(key);
      if (stored !== null) {
        setData(stored);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      ErrorHandler.handle(err, `loading data for key: ${key}`);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const saveData = useCallback(async (newData: T) => {
    try {
      setError(null);
      await StorageService.setItem(key, newData);
      setData(newData);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save data';
      setError(errorMessage);
      ErrorHandler.handle(err, `saving data for key: ${key}`);
      return false;
    }
  }, [key]);

  const removeData = useCallback(async () => {
    try {
      setError(null);
      await StorageService.removeItem(key);
      setData(initialValue);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove data';
      setError(errorMessage);
      ErrorHandler.handle(err, `removing data for key: ${key}`);
      return false;
    }
  }, [key, initialValue]);

  return {
    data,
    loading,
    error,
    saveData,
    removeData,
    refresh: loadData
  };
};

export default useStorage;