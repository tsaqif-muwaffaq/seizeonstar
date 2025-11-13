export const API_ENDPOINTS = {
  // Products
  PRODUCTS: '/products',
  PRODUCT_BY_ID: (id: string) => `/products/${id}`,
  PRODUCTS_SEARCH: (query: string) => `/products/search?q=${query}`,
  PRODUCTS_CATEGORIES: '/products/categories',
  PRODUCTS_BY_CATEGORY: (category: string) => `/products/category/${category}`,
  
  // Auth
  LOGIN: '/auth/login',
  
  // Cart
  CARTS: '/carts',
  CART_BY_ID: (id: string) => `/carts/${id}`,
  USER_CARTS: (userId: string) => `/carts/user/${userId}`,
};