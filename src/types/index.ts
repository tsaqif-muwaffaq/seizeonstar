import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// Navigation Types
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  AppTabs: undefined;
  Home: undefined;
  Product: { productId: string };
  Cart: undefined;
  Checkout: undefined;
  Profile: undefined;
  ProductUpload: undefined;
  ProfileImage: undefined;
  ProductList: undefined;
};

export type LoginRedirectParams = {
  redirectTo?: string;
  message?: string;
};

// Deep Link Types
export interface DeepLinkData {
  route: string;
  params?: any;
}

export interface ProductDeepLinkParams {
  id: string;
  addToCart?: boolean;
}

export interface ProfileDeepLinkParams {
  tab?: string;
}

// Image Picker Types
export interface ImageAsset {
  uri: string;
  type?: string;
  fileName?: string;
  fileSize?: number;
  width?: number;
  height?: number;
  base64?: string;
}

export interface ImagePickerResponse {
  didCancel?: boolean;
  errorCode?: string;
  errorMessage?: string;
  assets?: ImageAsset[];
}

export interface ImagePickerOptions {
  mediaType?: 'photo' | 'video' | 'mixed';
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
  includeBase64?: boolean;
  selectionLimit?: number;
  saveToPhotos?: boolean;
}

export interface UploadProgress {
  loaded: number;
  total: number;
}

export interface ProductImageAssets {
  uri: string;
  fileName: string;
  timestamp: number;
}

// Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ user: User; token: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<User>;
}

// Product Types
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  stock: number;
}

// Cart Types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
}

// Wishlist Types
export interface WishlistMeta {
  count: number;
  lastUpdated: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: number;
}