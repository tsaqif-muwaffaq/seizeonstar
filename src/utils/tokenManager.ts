import AsyncStorage from '@react-native-async-storage/async-storage';
import KeychainService from '../services/keychainService';
import { STORAGE_KEYS } from './storage';

export interface TokenData {
  token: string;
  expiredAt: number; // timestamp
}

class TokenManager {
  private readonly TOKEN_EXPIRY_BUFFER = 5 * 60 * 1000; // 5 minutes buffer

  async saveToken(token: string, expiresIn: number = 24 * 60 * 60 * 1000): Promise<boolean> {
    try {
      const expiredAt = Date.now() + expiresIn;
      const userId = 'user_' + Date.now();

      // Save token to Keychain (secure)
      await KeychainService.saveAuthToken(userId, token);
      
      // Save expiry to AsyncStorage (non-sensitive)
      await AsyncStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRY, expiredAt.toString());
      await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify({
        id: userId,
        tokenExpiry: expiredAt
      }));

      console.log('Token saved successfully, expires at:', new Date(expiredAt));
      return true;
    } catch (error) {
      console.error('Failed to save token:', error);
      throw error;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      // Check if token is expired first
      if (await this.isTokenExpired()) {
        await this.clearToken();
        return null;
      }

      const credentials = await KeychainService.getAuthToken();
      return credentials?.password || null;
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  }

  async isTokenExpired(): Promise<boolean> {
    try {
      const expiryString = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
      
      if (!expiryString) {
        return true; // No expiry means no valid token
      }

      const expiredAt = parseInt(expiryString, 10);
      const now = Date.now();
      const isExpired = now >= (expiredAt - this.TOKEN_EXPIRY_BUFFER);

      if (isExpired) {
        console.log('Token expired at:', new Date(expiredAt), 'Current time:', new Date(now));
      }

      return isExpired;
    } catch (error) {
      console.error('Failed to check token expiry:', error);
      return true; // Assume expired on error
    }
  }

  async clearToken(): Promise<boolean> {
    try {
      await Promise.all([
        KeychainService.resetAuthToken(),
        AsyncStorage.multiRemove([
          STORAGE_KEYS.TOKEN_EXPIRY,
          STORAGE_KEYS.USER_DATA,
        ])
      ]);
      console.log('Token cleared successfully');
      return true;
    } catch (error) {
      console.error('Failed to clear token:', error);
      return false;
    }
  }

  async getTokenExpiry(): Promise<number | null> {
    try {
      const expiryString = await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRY);
      return expiryString ? parseInt(expiryString, 10) : null;
    } catch (error) {
      console.error('Failed to get token expiry:', error);
      return null;
    }
  }
}

export default new TokenManager();