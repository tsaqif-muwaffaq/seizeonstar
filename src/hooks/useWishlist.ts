import { useState, useCallback, useEffect } from 'react';
import StorageService, { WishlistMeta } from '../services/storageService';
import ErrorHandler from '../utils/errorHandler';

const useWishlist = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [meta, setMeta] = useState<WishlistMeta | null>(null);
  const [loading, setLoading] = useState(true);

  // Load wishlist on mount
  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);
      const { items, meta } = await StorageService.loadWishlist();
      setWishlist(items);
      setMeta(meta);
    } catch (error) {
      ErrorHandler.handle(error, 'loading wishlist');
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleWishlistItem = useCallback(async (productId: number) => {
    try {
      const newWishlist = wishlist.includes(productId)
        ? wishlist.filter(id => id !== productId)
        : [...wishlist, productId];

      const newMeta: WishlistMeta = {
        count: newWishlist.length,
        updatedAt: Date.now(),
        lastSync: Date.now()
      };

      await StorageService.saveWishlist(newWishlist, newMeta);
      
      setWishlist(newWishlist);
      setMeta(newMeta);

      return !wishlist.includes(productId); // Return new state (true = added, false = removed)
    } catch (error) {
      ErrorHandler.handle(error, 'toggling wishlist item');
      return wishlist.includes(productId); // Return current state on error
    }
  }, [wishlist]);

  const isInWishlist = useCallback((productId: number): boolean => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const clearWishlist = useCallback(async () => {
    try {
      const emptyMeta: WishlistMeta = {
        count: 0,
        updatedAt: Date.now()
      };
      
      await StorageService.saveWishlist([], emptyMeta);
      setWishlist([]);
      setMeta(emptyMeta);
    } catch (error) {
      ErrorHandler.handle(error, 'clearing wishlist');
    }
  }, []);

  return {
    wishlist,
    meta,
    loading,
    toggleWishlistItem,
    isInWishlist,
    clearWishlist,
    refresh: loadWishlist
  };
};

export default useWishlist;