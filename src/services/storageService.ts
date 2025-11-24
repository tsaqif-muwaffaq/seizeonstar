import * as Keychain from 'react-native-keychain';

export interface Credentials {
  username: string;
  password: string;
}

class StorageService {
  async saveCredentials(username: string, password: string): Promise<boolean> {
    try {
      await Keychain.setGenericPassword(username, password, {
        accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY
      });
      return true;
    } catch (error) {
      console.error('Error saving credentials:', error);
      return false;
    }
  }

  async getCredentials(): Promise<Credentials | null> {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        return {
          username: credentials.username,
          password: credentials.password
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting credentials:', error);
      return null;
    }
  }

  async clearCredentials(): Promise<boolean> {
    try {
      await Keychain.resetGenericPassword();
      return true;
    } catch (error) {
      console.error('Error clearing credentials:', error);
      return false;
    }
  }

  async hasStoredCredentials(): Promise<boolean> {
    const credentials = await this.getCredentials();
    return !!credentials;
  }
}

export const storageService = new StorageService();