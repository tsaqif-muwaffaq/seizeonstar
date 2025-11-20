import { NavigatorScreenParams } from '@react-navigation/native';

// Root stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Product: { id: number; productName?: string };
  Cart: { productId?: number };
  Checkout: undefined;
  Profile: { userId: string };
  AppTabs: NavigatorScreenParams<AppTabParamList>;
  AddToCart: { productId: number }; // FIX: Added AddToCart route
};

// Tab navigator parameter list
export type AppTabParamList = {
  Home: undefined;
  Cart: undefined;
  Profile: undefined;
};

// Deep link types
export interface DeepLinkData {
  route: keyof RootStackParamList;
  params?: any;
  timestamp: number;
}

export interface ProductDeepLinkParams {
  id: number;
}

export interface ProfileDeepLinkParams {
  userId: string;
}

// Navigation ref type
export type NavigationRefType = {
  navigate: (name: keyof RootStackParamList, params?: any) => void;
  reset: (state: any) => void;
};

// Login redirect types
export interface LoginRedirectParams {
  redirectTo?: keyof RootStackParamList;
  redirectParams?: any;
}