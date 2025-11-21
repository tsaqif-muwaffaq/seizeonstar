import { useState, useEffect, useCallback } from 'react';
import { storageService } from '../services/storageService';

export const useStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const stored = await storageService.getItem(key);
      
      if (stored !== null) {
        const parsedData = JSON.parse(stored) as T;
        setData(parsedData);
      }
    } catch (err) {
      setError('Gagal memuat data dari storage');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  }, [key]);

  const saveData = useCallback(async (newData: T): Promise<boolean> => {
    try {
      setError(null);
      await storageService.setItem(key, JSON.stringify(newData));
      setData(newData);
      return true;
    } catch (err) {
      setError('Gagal menyimpan data ke storage');
      console.error('Error saving data:', err);
      return false;
    }
  }, [key]);

  const removeData = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      await storageService.removeItem(key);
      setData(initialValue);
      return true;
    } catch (err) {
      setError('Gagal menghapus data dari storage');
      console.error('Error removing data:', err);
      return false;
    }
  }, [key, initialValue]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    saveData,
    removeData,
    refresh: loadData,
  };
};

export default useStorage;