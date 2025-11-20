import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // FIX: Ganti Storage
import { STORAGE_KEYS } from '../utils/storage';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart items on mount
  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = useCallback(async () => {
    try {
      setLoading(true);
      // FIX: Ganti Storage dengan AsyncStorage
      const cartString = await AsyncStorage.getItem(STORAGE_KEYS.CART_ITEMS);
      if (cartString) {
        const items = JSON.parse(cartString) as CartItem[];
        setCartItems(items);
      }
    } catch (error) {
      console.error('Failed to load cart items:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCartItems = useCallback(async (items: CartItem[]) => {
    try {
      // FIX: Ganti Storage dengan AsyncStorage
      await AsyncStorage.setItem(STORAGE_KEYS.CART_ITEMS, JSON.stringify(items));
      setCartItems(items);
    } catch (error) {
      console.error('Failed to save cart items:', error);
    }
  }, []);

  const addToCart = useCallback(async (productId: number, productName: string, price: number) => {
    const existingItem = cartItems.find(item => item.id === productId);
    
    let updatedItems: CartItem[];
    if (existingItem) {
      updatedItems = cartItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      const newItem: CartItem = {
        id: productId,
        name: productName,
        price: price,
        quantity: 1
      };
      updatedItems = [...cartItems, newItem];
    }
    
    await saveCartItems(updatedItems);
  }, [cartItems, saveCartItems]);

  const removeFromCart = useCallback(async (productId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== productId);
    await saveCartItems(updatedItems);
  }, [cartItems, saveCartItems]);

  const updateQuantity = useCallback(async (productId: number, quantity: number) => {
    const updatedItems = cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ).filter(item => item.quantity > 0);
    
    await saveCartItems(updatedItems);
  }, [cartItems, saveCartItems]);

  const clearCart = useCallback(async () => {
    await saveCartItems([]);
  }, [saveCartItems]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  return {
    cartItems,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    refresh: loadCartItems
  };
};

export default useCart;