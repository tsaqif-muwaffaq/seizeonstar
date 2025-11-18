import * as Keychain from 'react-native-keychain';

// Service namespaces
export const KEYCHAIN_SERVICES = {
  AUTH_TOKEN: 'com.ecom:userToken',
  API_KEY: 'com.ecom:apiKey',
} as const;

export interface KeychainCredentials {
  username: string;
  password: string;
  service: string;
}

class KeychainService {
  // Save authentication token
  async saveAuthToken(userId: string, token: string): Promise<boolean> {
    try {
      const result = await Keychain.setGenericPassword(userId, token, {
        service: KEYCHAIN_SERVICES.AUTH_TOKEN,
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
      return !!result;
    } catch (error) {
      console.error('Keychain: Failed to save auth token', error);
      throw error;
    }
  }

  // Get authentication token
  async getAuthToken(): Promise<KeychainCredentials | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICES.AUTH_TOKEN,
      });
      return credentials as KeychainCredentials | null;
    } catch (error) {
      console.error('Keychain: Failed to get auth token', error);
      
      // Handle access denied specifically
      if (error instanceof Error && error.message.includes('access denied')) {
        await this.resetAuthToken();
        throw new Error('ACCESS_DENIED: Device security changed, please login again');
      }
      
      throw error;
    }
  }

  // Reset authentication token
  async resetAuthToken(): Promise<boolean> {
    try {
      const result = await Keychain.resetGenericPassword({
        service: KEYCHAIN_SERVICES.AUTH_TOKEN,
      });
      return result;
    } catch (error) {
      console.error('Keychain: Failed to reset auth token', error);
      return false;
    }
  }

  // Save API Key
  async saveApiKey(apiKey: string): Promise<boolean> {
    try {
      const result = await Keychain.setGenericPassword('api_client', apiKey, {
        service: KEYCHAIN_SERVICES.API_KEY,
        accessible: Keychain.ACCESSIBLE.AFTER_FIRST_UNLOCK,
      });
      return !!result;
    } catch (error) {
      console.error('Keychain: Failed to save API key', error);
      throw error;
    }
  }

  // Get API Key
  async getApiKey(): Promise<string | null> {
    try {
      const credentials = await Keychain.getGenericPassword({
        service: KEYCHAIN_SERVICES.API_KEY,
      });
      
      if (credentials) {
        return credentials.password;
      }
      return null;
    } catch (error) {
      console.error('Keychain: Failed to get API key', error);
      return null;
    }
  }

  // Reset API Key
  async resetApiKey(): Promise<boolean> {
    try {
      const result = await Keychain.resetGenericPassword({
        service: KEYCHAIN_SERVICES.API_KEY,
      });
      return result;
    } catch (error) {
      console.error('Keychain: Failed to reset API key', error);
      return false;
    }
  }

  // Clear all keychain data (for logout)
  async clearAllKeychainData(): Promise<boolean> {
    try {
      const results = await Promise.all([
        this.resetAuthToken(),
        this.resetApiKey(),
      ]);
      
      return results.every(result => result === true);
    } catch (error) {
      console.error('Keychain: Failed to clear all data', error);
      return false;
    }
  }
}

export default new KeychainService();