import { useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService'; // Pastikan nama file konsisten
import { storageService } from '../services/storageService';
import { User } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStoredCredentials, setHasStoredCredentials] = useState(false);

  const checkStoredCredentials = useCallback(async () => {
    const hasCredentials = await storageService.hasStoredCredentials();
    setHasStoredCredentials(hasCredentials);
    return hasCredentials;
  }, []);

  const loginManual = useCallback(async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const result = await authService.loginManual(username, password);
      if (result.success && result.user) {
        setUser(result.user);
        setHasStoredCredentials(true);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithBiometric = useCallback(async () => {
    setIsLoading(true);
    try {
      const result = await authService.loginWithBiometric();
      if (result.success && result.user) {
        setUser(result.user);
      }
      return result;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setHasStoredCredentials(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const forceLogout = useCallback(() => {
    authService.forceLogout();
    setUser(null);
    setHasStoredCredentials(false);
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      await checkStoredCredentials();
      setIsLoading(false);
    };

    initAuth();
  }, [checkStoredCredentials]);

  return {
    user,
    isLoading,
    hasStoredCredentials,
    loginManual,
    loginWithBiometric,
    logout,
    forceLogout,
    checkStoredCredentials,
    isAuthenticated: !!user
  };
};