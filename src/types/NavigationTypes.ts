import { Product } from './Product';

export type RootDrawerParamList = {
  Home: { userID?: string };
  Settings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: undefined;
  ProductDetail: { product: Product };
  ExtendedTabs: undefined;
  Checkout: { product: Product };
  Analytics: undefined;
  Login: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ProfileTab: undefined;
  AnalyticsTab: undefined;
};

export type TopTabParamList = {
  Populer: undefined;
  Terbaru: undefined;
  Elektronik: undefined;
  Pakaian: undefined;
  Makanan: undefined;
  Otomotif: undefined;
  Hiburan: undefined;
  Bayi: undefined;
};