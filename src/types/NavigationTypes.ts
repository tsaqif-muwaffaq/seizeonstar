import { LegacyProduct } from './Product';

export type RootStackParamList = {
  Login: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  MainApp: undefined;
  ProductDetail: { product: LegacyProduct };
  Checkout: { product: LegacyProduct };
  ExtendedTabs: undefined;
  Analytics: undefined;
  ProductList: undefined;
  Cart: undefined;
};

export type DrawerParamList = {
  Home: undefined;
  ProductList: undefined;
  Cart: undefined;
  Settings: undefined;
  Analytics: undefined;
};

export type BottomTabParamList = {
  HomeTab: undefined;
  ProductListTab: undefined;
  CartTab: undefined;
  AnalyticsTab: undefined;
  ProfileTab: undefined;
};