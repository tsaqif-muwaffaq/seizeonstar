import { useState, useEffect, useCallback } from 'react';
import { Storage, STORAGE_KEYS } from '../utils/storage';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // Load auth data on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        setLoading(true);
        const [tokenData, userData] = await Storage.multiGet([
          STORAGE_KEYS.AUTH_TOKEN,
          STORAGE_KEYS.USER_DATA,
        ]);
        
        setToken(tokenData[1]);
        setUser(userData[1]);
      } catch (error) {
        console.error('Error loading auth data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAuthData();
  }, []);

  const login = useCallback(async (newToken: string, userData: any) => {
    try {
      await Storage.multiSet([
        [STORAGE_KEYS.AUTH_TOKEN, newToken],
        [STORAGE_KEYS.USER_DATA, userData],
      ]);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      console.error('Login storage error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await Storage.multiRemove([
        STORAGE_KEYS.AUTH_TOKEN,
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.CART_DATA,
      ]);
      setToken(null);
      setUser(null);
    } catch (error) {
      console.error('Logout storage error:', error);
      throw error;
    }
  }, []);

  const isAuthenticated = !!token;

  return {
    token,
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };
};