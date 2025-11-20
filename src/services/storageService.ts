import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, getProductCacheKey } from '../utils/storage';
import ErrorHandler, { StorageError } from '../utils/errorHandler';

export interface CacheData<T> {
  value: T;
  timestamp: number;
  ttl?: number; // Time to live in milliseconds
}

export interface WishlistMeta {
  count: number;
  updatedAt: number;
  lastSync?: number;
}

class StorageService {
  // Generic storage methods with error handling
  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      ErrorHandler.handleStorageError(error, key);
      throw error;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue === null) return null;

      return JSON.parse(jsonValue);
    } catch (error) {
      // Handle corrupted data
      if (error instanceof SyntaxError) {
        console.warn(`Corrupted data found for key: ${key}, removing...`);
        await this.removeItem(key);
        ErrorHandler.handleStorageError(new Error('Corrupted data removed'), key);
        return null;
      }
      
      ErrorHandler.handleStorageError(error, key);
      throw error;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      ErrorHandler.handleStorageError(error, key);
      throw error;
    }
  }

  async multiSet(items: [string, any][]): Promise<void> {
    try {
      const stringifiedItems = items.map(([key, value]) => [
        key,
        JSON.stringify(value)
      ]) as [string, string][];
      
      await AsyncStorage.multiSet(stringifiedItems);
    } catch (error) {
      ErrorHandler.handleStorageError(error);
      throw error;
    }
  }

  async multiGet(keys: string[]): Promise<[string, any][]> {
    try {
      const results = await AsyncStorage.multiGet(keys);
      return results.map(([key, value]) => {
        if (value === null) return [key, null];
        
        try {
          return [key, JSON.parse(value)];
        } catch (parseError) {
          console.warn(`Corrupted data found for key: ${key}, returning null`);
          return [key, null];
        }
      });
    } catch (error) {
      ErrorHandler.handleStorageError(error);
      throw error;
    }
  }

  async multiRemove(keys: string[]): Promise<void> {
    try {
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      ErrorHandler.handleStorageError(error);
      throw error;
    }
  }

  // Product cache methods
  async cacheProduct<T>(productId: number, data: T, ttl: number = 15 * 60 * 1000): Promise<void> {
    const key = getProductCacheKey(productId);
    const cacheData: CacheData<T> = {
      value: data,
      timestamp: Date.now(),
      ttl: ttl
    };
    
    await this.setItem(key, cacheData);
  }

  async getCachedProduct<T>(productId: number): Promise<T | null> {
    const key = getProductCacheKey(productId);
    const cacheData = await this.getItem<CacheData<T>>(key);
    
    if (!cacheData) return null;
    
    // Check if cache is still valid
    const now = Date.now();
    const cacheAge = now - cacheData.timestamp;
    const isExpired = cacheData.ttl ? cacheAge > cacheData.ttl : false;
    
    if (isExpired) {
      await this.removeItem(key);
      return null;
    }
    
    return cacheData.value;
  }

  async clearExpiredProductCaches(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const productCacheKeys = allKeys.filter(key => 
        key.startsWith(STORAGE_KEYS.PRODUCT_CACHE_PREFIX)
      );

      const now = Date.now();
      const keysToRemove: string[] = [];

      for (const key of productCacheKeys) {
        const cacheData = await this.getItem<CacheData<any>>(key);
        if (cacheData && cacheData.ttl) {
          const cacheAge = now - cacheData.timestamp;
          if (cacheAge > cacheData.ttl) {
            keysToRemove.push(key);
          }
        }
      }

      if (keysToRemove.length > 0) {
        await this.multiRemove(keysToRemove);
        console.log(`Cleared ${keysToRemove.length} expired product caches`);
      }
    } catch (error) {
      ErrorHandler.handleStorageError(error);
    }
  }

  // Wishlist methods
  async saveWishlist(items: number[], meta: WishlistMeta): Promise<void> {
    await this.multiSet([
      [STORAGE_KEYS.WISHLIST_ITEMS, items],
      [STORAGE_KEYS.WISHLIST_META, {
        ...meta,
        updatedAt: Date.now()
      }]
    ]);
  }

  async loadWishlist(): Promise<{ items: number[]; meta: WishlistMeta | null }> {
    const results = await this.multiGet([
      STORAGE_KEYS.WISHLIST_ITEMS,
      STORAGE_KEYS.WISHLIST_META
    ]);

    const items = results[0][1] as number[] || [];
    const meta = results[1][1] as WishlistMeta | null;

    return { items, meta };
  }

  // Clear all app data (logout)
  async clearAllData(): Promise<void> {
    try {
      const allKeys = await AsyncStorage.getAllKeys();
      const appKeys = allKeys.filter(key => 
        key.startsWith('@app:') || key.startsWith(STORAGE_KEYS.PRODUCT_CACHE_PREFIX)
      );
      
      await this.multiRemove(appKeys);
      console.log('All app data cleared successfully');
    } catch (error) {
      ErrorHandler.handleStorageError(error);
      throw error;
    }
  }
}

export default new StorageService();