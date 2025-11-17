import { useState, useEffect, useCallback } from 'react';
import { Storage, STORAGE_KEYS } from '../utils/storage';

export const useCart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart on app start
  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const cartData = await Storage.getItem<any[]>(STORAGE_KEYS.CART_DATA);
        setCart(cartData || []);
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const updateCart = useCallback(async (newCart: any[]) => {
    try {
      // Use mergeItem for small updates to avoid quota exceeded
      await Storage.mergeItem(STORAGE_KEYS.CART_DATA, newCart);
      setCart(newCart);
    } catch (error: any) {
      if (error?.message?.includes('quota') || error?.message?.includes('exceeded')) {
        console.warn('Storage quota exceeded, clearing cart cache');
        // Handle quota exceeded by clearing some data
        await Storage.removeItem(STORAGE_KEYS.CART_DATA);
        setCart([]);
      } else {
        console.error('Error updating cart:', error);
        throw error;
      }
    }
  }, []);

  const addToCart = useCallback(async (product: any) => {
    const newCart = [...cart, product];
    await updateCart(newCart);
  }, [cart, updateCart]);

  const removeFromCart = useCallback(async (productId: string) => {
    const newCart = cart.filter(item => item.id !== productId);
    await updateCart(newCart);
  }, [cart, updateCart]);

  const clearCart = useCallback(async () => {
    await Storage.removeItem(STORAGE_KEYS.CART_DATA);
    setCart([]);
  }, []);

  return {
    cart,
    loading,
    updateCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
};