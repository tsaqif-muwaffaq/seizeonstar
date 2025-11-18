// import { useState, useEffect, useCallback } from 'react';
// import { Storage, STORAGE_KEYS } from '../utils/storage';

// export const useAuth = () => {
//   const [token, setToken] = useState<string | null>(null);
//   const [user, setUser] = useState<any | null>(null);
//   const [loading, setLoading] = useState(true);

//   // Load auth data on app start
//   useEffect(() => {
//     const loadAuthData = async () => {
//       try {
//         setLoading(true);
//         const [tokenData, userData] = await Storage.multiGet([
//           STORAGE_KEYS.AUTH_TOKEN,
//           STORAGE_KEYS.USER_DATA,
//         ]);
        
//         setToken(tokenData[1]);
//         setUser(userData[1]);
//       } catch (error) {
//         console.error('Error loading auth data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAuthData();
//   }, []);

//   const login = useCallback(async (newToken: string, userData: any) => {
//     try {
//       await Storage.multiSet([
//         [STORAGE_KEYS.AUTH_TOKEN, newToken],
//         [STORAGE_KEYS.USER_DATA, userData],
//       ]);
//       setToken(newToken);
//       setUser(userData);
//     } catch (error) {
//       console.error('Login storage error:', error);
//       throw error;
//     }
//   }, []);

//   const logout = useCallback(async () => {
//     try {
//       await Storage.multiRemove([
//         STORAGE_KEYS.AUTH_TOKEN,
//         STORAGE_KEYS.USER_DATA,
//         STORAGE_KEYS.CART_DATA,
//       ]);
//       setToken(null);
//       setUser(null);
//     } catch (error) {
//       console.error('Logout storage error:', error);
//       throw error;
//     }
//   }, []);

//   const isAuthenticated = !!token;

//   return {
//     token,
//     user,
//     isAuthenticated,
//     loading,
//     login,
//     logout,
//   };
// };

import { useState, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import KeychainService from '../services/keychainService';
import { STORAGE_KEYS } from '../utils/storage';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Export the return type for AuthContext
export type UseAuthReturnType = AuthState & {
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  loadAuthData: () => Promise<{ user: User | null; token: string | null; }>;
};

const useAuth = (): UseAuthReturnType => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  const loadAuthData = useCallback(async (): Promise<{ user: User | null; token: string | null; }> => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));

      // Load data from both storage systems in parallel
      const [keychainResult, asyncStorageResult] = await Promise.allSettled([
        KeychainService.getAuthToken(),
        AsyncStorage.multiGet([
          STORAGE_KEYS.USER_DATA,
          STORAGE_KEYS.THEME_PREFERENCE,
        ]),
      ]);

      let token: string | null = null;
      let user: User | null = null;

      // Process Keychain result (token)
      if (keychainResult.status === 'fulfilled' && keychainResult.value) {
        token = keychainResult.value.password;
        
        // Try to get user data from AsyncStorage
        const userDataEntry = asyncStorageResult.status === 'fulfilled' 
          ? asyncStorageResult.value.find(([key]) => key === STORAGE_KEYS.USER_DATA)
          : null;
          
        if (userDataEntry && userDataEntry[1]) {
          user = JSON.parse(userDataEntry[1]);
        }
      } else if (keychainResult.status === 'rejected') {
        const error = keychainResult.reason;
        if (error.message.includes('ACCESS_DENIED')) {
          Alert.alert(
            'Security Changed',
            'Device security was modified. Please login again.',
            [{ text: 'OK' }]
          );
          await logout();
        }
      }

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: !!token,
      });

      return { user, token };
    } catch (error) {
      console.error('Auth: Failed to load auth data', error);
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
      // Simulate API call
      const mockUser: User = {
        id: 'user_123',
        name: 'John Doe',
        email: email,
      };
      
      const mockToken = 'jwt_token_' + Date.now();

      // Save to Keychain (secure) and AsyncStorage (non-sensitive)
      await Promise.all([
        KeychainService.saveAuthToken(mockUser.id, mockToken),
        AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(mockUser)),
      ]);

      setAuthState({
        user: mockUser,
        token: mockToken,
        isLoading: false,
        isAuthenticated: true,
      });

      return true;
    } catch (error) {
      console.error('Auth: Login failed', error);
      Alert.alert('Login Error', 'Failed to save authentication data');
      return false;
    }
  }, []);

  const logout = useCallback(async (): Promise<boolean> => {
    try {
      // Clear both storage systems
      await Promise.all([
        KeychainService.clearAllKeychainData(),
        AsyncStorage.multiRemove([
          STORAGE_KEYS.USER_DATA,
          STORAGE_KEYS.CART_ITEMS,
          STORAGE_KEYS.CART_DATA,
          STORAGE_KEYS.THEME_PREFERENCE,
        ]),
      ]);

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });

      return true;
    } catch (error) {
      console.error('Auth: Logout failed', error);
      return false;
    }
  }, []);

  // Initialize auth data on mount
  useEffect(() => {
    loadAuthData();
  }, [loadAuthData]);

  return {
    ...authState, // This includes user, token, isLoading, isAuthenticated
    login,
    logout,
    loadAuthData,
  };
};

export default useAuth;