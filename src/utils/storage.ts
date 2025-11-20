export const STORAGE_KEYS = {
  // Auth
  AUTH_TOKEN: '@app:auth_token',
  TOKEN_EXPIRY: '@app:token_expiry',
  USER_DATA: '@app:user_data',
  
  // Cart & Wishlist
  CART_ITEMS: '@app:cart_items',
  CART_DATA: '@app:cart_data',
  WISHLIST_ITEMS: '@app:wishlist_items',
  WISHLIST_META: '@app:wishlist_meta',
  
  // Cache
  CATEGORIES_CACHE: '@app:categories_cache',
  THEME_PREFERENCE: '@app:theme_preference',
  NOTIFICATION_STATUS: '@app:notification_status',
  
  // Product Cache (dynamic)
  PRODUCT_CACHE_PREFIX: '@product_detail:',
} as const;

// Helper to create product cache key
export const getProductCacheKey = (productId: number): string => {
  return `${STORAGE_KEYS.PRODUCT_CACHE_PREFIX}${productId}`;
};

// Helper to extract product ID from cache key
export const getProductIdFromCacheKey = (key: string): number | null => {
  const prefix = STORAGE_KEYS.PRODUCT_CACHE_PREFIX;
  if (key.startsWith(prefix)) {
    const id = key.slice(prefix.length);
    const parsedId = parseInt(id, 10);
    return isNaN(parsedId) ? null : parsedId;
  }
  return null;
};