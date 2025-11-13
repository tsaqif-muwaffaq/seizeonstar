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

// Untuk kompatibilitas dengan kode lama
export interface LegacyProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

// Union type untuk menerima kedua format
export type AnyProduct = Product | LegacyProduct;

// Helper functions untuk kompatibilitas
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
  return product.description || '';
};

export const getProductPrice = (product: AnyProduct): number => {
  return product.price;
};