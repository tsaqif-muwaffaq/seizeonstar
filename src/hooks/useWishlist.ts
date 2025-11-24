import { useState, useCallback, useEffect } from 'react';
import { storageService } from '../services/storageService';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadWishlist = useCallback(async (): Promise<WishlistItem[]> => {
    setIsLoading(true);
    try {
      // Simpan wishlist sebagai JSON string di credentials
      const credentials = await storageService.getCredentials();
      if (credentials && credentials.username === 'wishlist') {
        const items = JSON.parse(credentials.password);
        setWishlist(items);
        return items;
      }
      setWishlist([]);
      return [];
    } catch (error) {
      console.error('Error loading wishlist:', error);
      setWishlist([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveWishlist = useCallback(async (items: WishlistItem[]): Promise<boolean> => {
    setIsLoading(true);
    try {
      const result = await storageService.saveCredentials('wishlist', JSON.stringify(items));
      if (result) {
        setWishlist(items);
      }
      return result;
    } catch (error) {
      console.error('Error saving wishlist:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToWishlist = useCallback(async (item: WishlistItem): Promise<boolean> => {
    const currentWishlist = await loadWishlist();
    const existingItem = currentWishlist.find(wishlistItem => wishlistItem.id === item.id);
    
    if (existingItem) {
      return true; // Item sudah ada di wishlist
    }

    const newWishlist = [...currentWishlist, item];
    return await saveWishlist(newWishlist);
  }, [loadWishlist, saveWishlist]);

  const removeFromWishlist = useCallback(async (itemId: string): Promise<boolean> => {
    const currentWishlist = await loadWishlist();
    const newWishlist = currentWishlist.filter(item => item.id !== itemId);
    return await saveWishlist(newWishlist);
  }, [loadWishlist, saveWishlist]);

  const isInWishlist = useCallback((itemId: string): boolean => {
    return wishlist.some(item => item.id === itemId);
  }, [wishlist]);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return {
    wishlist,
    isLoading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loadWishlist,
    saveWishlist
  };
};