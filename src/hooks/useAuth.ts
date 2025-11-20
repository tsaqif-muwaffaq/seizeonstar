import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeychainService from '../services/keychainService';
import TokenManager from '../utils/tokenManager';
import ErrorHandler from '../utils/errorHandler';
import { STORAGE_KEYS } from '../utils/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  tokenExpiry?: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const loadAuthData = useCallback(async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Check token expiry first
      const isExpired = await TokenManager.isTokenExpired();
      if (isExpired) {
        await TokenManager.clearToken();
        setAuthState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        });
        return { user: null, token: null };
      }

      // Get token from Keychain
      const token = await TokenManager.getToken();
      
      // Get user data from AsyncStorage
      const userDataString = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
      const user = userDataString ? JSON.parse(userDataString) : null;

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: !!token,
      });

      return { user, token };
    } catch (error) {
      ErrorHandler.handle(error, 'loading auth data');
      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
      return { user: null, token: null };
    }
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // Simulate API call to dummyjson.com
      const mockUser: User = {
        id: 'user_' + Date.now(),
        name: 'John Doe',
        email: email,
      };
      
      // Mock token from dummyjson (valid for 24 hours)
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + 
        'eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjI0MTYyMzkwMjJ9.' +
        'dummy_signature';

      // Save token with 24 hour expiry
      await TokenManager.saveToken(mockToken, 24 * 60 * 60 * 1000);

      // Save user data
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
        ...mockUser,
        tokenExpiry: Date.now() + (24 * 60 * 60 * 1000)
      }));

      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      ErrorHandler.handle(error, 'login');
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<boolean> => {
    try {
      // Clear all storage data
      await TokenManager.clearToken();
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.USER_DATA,
        STORAGE_KEYS.CART_ITEMS,
        STORAGE_KEYS.WISHLIST_ITEMS,
        STORAGE_KEYS.WISHLIST_META,
      ]);

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });

      console.log('Logout successful - all data cleared');
      return true;
    } catch (error) {
      ErrorHandler.handle(error, 'logout');
      return false;
    }
  }, []);

  const checkTokenExpiry = useCallback(async (): Promise<boolean> => {
    const isExpired = await TokenManager.isTokenExpired();
    if (isExpired) {
      await logout();
      Alert.alert('Session Expired', 'Your session has expired. Please login again.');
    }
    return isExpired;
  }, [logout]);

  // Check token expiry periodically
  useEffect(() => {
    if (authState.isAuthenticated) {
      const interval = setInterval(() => {
        checkTokenExpiry();
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [authState.isAuthenticated, checkTokenExpiry]);

  // Initialize auth data on mount
  useEffect(() => {
    loadAuthData();
  }, [loadAuthData]);

  return {
    ...authState,
    login,
    logout,
    loadAuthData,
    checkTokenExpiry,
  };
};

export default useAuth;