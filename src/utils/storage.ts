import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@app:auth_token',
  USER_DATA: '@app:user_data', 
  CART_DATA: '@app:cart_data',
  CATEGORIES_CACHE: '@app:categories_cache',
  THEME_PREFERENCE: '@app:theme_preference',
  NOTIFICATION_STATUS: '@app:notification_status',
} as const;

export const Storage = {
  setItem: async (key: string, value: any): Promise<void> => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, stringValue);
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
      throw error;
    }
  },

  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error reading ${key}:`, error);
      return null;
    }
  },

  removeItem: async (key: string): Promise<void> => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
      throw error;
    }
  },

  multiGet: async (keys: string[]): Promise<[string, any][]> => {
    try {
      const keyValuePairs = await AsyncStorage.multiGet(keys);
      return keyValuePairs.map(([key, value]) => {
        return [key, value ? JSON.parse(value) : null];
      });
    } catch (error) {
      console.error('Error in multiGet:', error);
      throw error;
    }
  },

  multiSet: async (keyValuePairs: [string, any][]): Promise<void> => {
    try {
      const stringPairs = keyValuePairs.map(([key, value]) => [
        key,
        JSON.stringify(value)
      ]) as [string, string][];
      await AsyncStorage.multiSet(stringPairs);
    } catch (error) {
      console.error('Error in multiSet:', error);
      throw error;
    }
  },

  multiRemove: async (keys: string[]): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Error in multiRemove:', error);
      throw error;
    }
  },

  mergeItem: async (key: string, value: any): Promise<void> => {
    try {
      const stringValue = JSON.stringify(value);
      await AsyncStorage.mergeItem(key, stringValue);
    } catch (error) {
      console.error(`Error merging ${key}:`, error);
      throw error;
    }
  },

  clear: async (): Promise<void> => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};