import * as React from 'react';
import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth';
import { User } from '../services/authService';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasStoredCredentials: boolean;
  loginManual: (username: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
  loginWithBiometric: () => Promise<{ success: boolean; user?: User; error?: string }>;
  logout: () => Promise<void>;
  forceLogout: () => void;
  checkStoredCredentials: () => Promise<boolean>;
  isAuthenticated: boolean;
  login?: (username: string, password: string) => Promise<void>; // Opsional jika tidak digunakan
  updateUser?: (user: User) => void; // Opsional jika tidak digunakan
  token?: string; // Opsional jika tidak digunakan
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  const value: AuthContextType = {
    user: auth.user,
    isLoading: auth.isLoading,
    hasStoredCredentials: auth.hasStoredCredentials,
    loginManual: auth.loginManual,
    loginWithBiometric: auth.loginWithBiometric,
    logout: auth.logout,
    forceLogout: auth.forceLogout,
    checkStoredCredentials: auth.checkStoredCredentials,
    isAuthenticated: auth.isAuthenticated,
    // Tambahkan properti opsional jika diperlukan
    login: async (username: string, password: string) => {
      const result = await auth.loginManual(username, password);
      if (!result.success) {
        throw new Error(result.error);
      }
    },
    updateUser: (user: User) => {
      // Implementasi jika diperlukan
    },
    token: auth.user?.token
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};