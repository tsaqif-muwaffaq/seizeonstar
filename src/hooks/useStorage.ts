import { useState, useCallback } from 'react';
import { storageService } from '../services/storageService';

export const useStorage = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Method untuk data sederhana (bukan credentials)
  const setItem = useCallback(async (key: string, value: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simpan sebagai generic password dengan key sebagai username
      const result = await storageService.saveCredentials(key, value);
      return result;
    } catch (error) {
      console.error('Error setting item:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getItem = useCallback(async (key: string): Promise<string | null> => {
    setIsLoading(true);
    try {
      const credentials = await storageService.getCredentials();
      if (credentials && credentials.username === key) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeItem = useCallback(async (key: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Hanya hapus jika key cocok dengan stored credentials
      const credentials = await storageService.getCredentials();
      if (credentials && credentials.username === key) {
        return await storageService.clearCredentials();
      }
      return true;
    } catch (error) {
      console.error('Error removing item:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    setItem,
    getItem,
    removeItem
  };
};