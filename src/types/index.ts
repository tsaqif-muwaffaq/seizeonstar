import { NavigatorScreenParams } from '@react-navigation/native';

// Root stack parameter list
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Product: { id: number; productName?: string };
  Cart: undefined;
  Profile: { userId: string };
  AppTabs: NavigatorScreenParams<AppTabParamList>;
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