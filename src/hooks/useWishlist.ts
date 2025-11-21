import { useState, useCallback, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { WishlistItem, WishlistMeta, Product } from '../types';

export const useWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const stored = await storageService.getItem('@ecom:wishlist');
      
      if (stored) {
        const parsedWishlist = JSON.parse(stored) as WishlistItem[];
        setWishlist(parsedWishlist);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      setError('Gagal memuat wishlist');
      console.error('Error loading wishlist:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveWishlist = useCallback(async (newWishlist: WishlistItem[]): Promise<boolean> => {
    try {
      setError(null);
      await storageService.setItem('@ecom:wishlist', JSON.stringify(newWishlist));
      
      // Update wishlist meta
      const meta: WishlistMeta = {
        count: newWishlist.length,
        lastUpdated: Date.now(),
      };
      await storageService.setItem('@ecom:wishlist_meta', JSON.stringify(meta));
      
      setWishlist(newWishlist);
      return true;
    } catch (err) {
      setError('Gagal menyimpan wishlist');
      console.error('Error saving wishlist:', err);
      return false;
    }
  }, []);

  const addToWishlist = useCallback(async (productId: string): Promise<boolean> => {
    try {
      const existingItem = wishlist.find(item => item.productId === productId);
      if (existingItem) {
        return true; // Already in wishlist
      }

      const newItem: WishlistItem = {
        productId,
        addedAt: Date.now(),
      };

      const newWishlist = [...wishlist, newItem];
      return await saveWishlist(newWishlist);
    } catch (err) {
      setError('Gagal menambahkan ke wishlist');
      console.error('Error adding to wishlist:', err);
      return false;
    }
  }, [wishlist, saveWishlist]);

  const removeFromWishlist = useCallback(async (productId: string): Promise<boolean> => {
    try {
      const newWishlist = wishlist.filter(item => item.productId !== productId);
      return await saveWishlist(newWishlist);
    } catch (err) {
      setError('Gagal menghapus dari wishlist');
      console.error('Error removing from wishlist:', err);
      return false;
    }
  }, [wishlist, saveWishlist]);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlist.some(item => item.productId === productId);
  }, [wishlist]);

  const clearWishlist = useCallback(async (): Promise<boolean> => {
    try {
      await storageService.removeItem('@ecom:wishlist');
      await storageService.removeItem('@ecom:wishlist_meta');
      setWishlist([]);
      return true;
    } catch (err) {
      setError('Gagal menghapus wishlist');
      console.error('Error clearing wishlist:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  return {
    wishlist,
    loading,
    error,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    refresh: loadWishlist,
    count: wishlist.length,
  };
};

export default useWishlist;