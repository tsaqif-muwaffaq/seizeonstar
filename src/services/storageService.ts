import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error saving to storage:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from storage:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing from storage:', error);
      throw error;
    }
  }

  async multiSet(keyValuePairs: [string, string][]): Promise<void> {
    try {
      await AsyncStorage.multiSet(keyValuePairs);
    } catch (error) {
      console.error('Error multi-setting to storage:', error);
      throw error;
    }
  }

  async multiGet(keys: string[]): Promise<readonly [string, string | null][]> {
    try {
      return await AsyncStorage.multiGet(keys);
    } catch (error) {
      console.error('Error multi-getting from storage:', error);
      return [];
    }
  }

  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  }

  // Wishlist specific methods
  async loadWishlist(): Promise<string | null> {
    return this.getItem('@ecom:wishlist');
  }

  async saveWishlist(wishlistData: string): Promise<void> {
    await this.setItem('@ecom:wishlist', wishlistData);
  }

  async loadWishlistMeta(): Promise<string | null> {
    return this.getItem('@ecom:wishlist_meta');
  }

  async saveWishlistMeta(metaData: string): Promise<void> {
    await this.setItem('@ecom:wishlist_meta', metaData);
  }
}

export const storageService = new StorageService();
export default storageService;