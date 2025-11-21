import { useState, useEffect, useCallback } from 'react';
import { AuthState, User } from '../types';
import { storageService } from '../services/storageService';

const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  });

  // Check authentication status on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await storageService.getItem('@ecom:authToken');
      const userData = await storageService.getItem('@ecom:userData');

      if (token && userData) {
        const user: User = JSON.parse(userData);
        setAuthState({
          user,
          token,
          isLoading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          isAuthenticated: false,
        }));
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: false,
      }));
    }
  };

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo user data
      const user: User = {
        id: '1',
        email: email,
        name: 'John Doe',
        avatar: 'https://via.placeholder.com/100',
      };

      const token = 'demo-jwt-token-' + Date.now();

      // Save to storage
      await storageService.setItem('@ecom:authToken', token);
      await storageService.setItem('@ecom:userData', JSON.stringify(user));

      setAuthState({
        user,
        token,
        isLoading: false,
        isAuthenticated: true,
      });

      return { user, token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      // Remove from storage
      await storageService.removeItem('@ecom:authToken');
      await storageService.removeItem('@ecom:userData');

      setAuthState({
        user: null,
        token: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }, []);

  const updateUser = useCallback(async (userData: Partial<User>) => {
    try {
      const updatedUser = { ...authState.user, ...userData } as User;
      
      await storageService.setItem('@ecom:userData', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));

      return updatedUser;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  }, [authState.user]);

  return {
    ...authState,
    login,
    logout,
    updateUser,
  };
};

export default useAuth;