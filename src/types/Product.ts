export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface LegacyProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

export type AnyProduct = Product | LegacyProduct;

export const getProductId = (product: AnyProduct): string => {
  return typeof product.id === 'number' ? product.id.toString() : product.id;
};

export const getProductName = (product: AnyProduct): string => {
  return 'name' in product ? product.name : product.title;
};

export const getProductImageUrl = (product: AnyProduct): string => {
  return 'imageUrl' in product ? product.imageUrl : product.thumbnail;
};

export const getProductDescription = (product: AnyProduct): string => {
  if ('description' in product && product.description) {
    return product.description;
  }
  return 'description' in product ? product.description || '' : '';
};

export const getProductPrice = (product: AnyProduct): number => {
  return product.price;
};

export const isLegacyProduct = (product: AnyProduct): product is LegacyProduct => {
  return 'name' in product && 'imageUrl' in product;
};

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  fieldErrors?: Record<string, string>;
}

export interface NetworkState {
  isConnected: boolean;
  isInternetReachable: boolean;
}