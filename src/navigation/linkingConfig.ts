import { LinkingOptions } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Linking } from 'react-native';

// Deep linking configuration
export const linkingConfig: LinkingOptions<RootStackParamList> = {
  // Prefixes that our app accepts
  prefixes: [
    'ecommerceapp://', 
    'https://ecommerceapp.com',
    'https://*.ecommerceapp.com'
  ],
  
  // Config for mapping URLs to routes
  config: {
    screens: {
      // Basic routes
      Splash: 'splash',
      Login: 'login',
      Home: 'home',
      
      // Product routes with parameters
      Product: {
        path: 'produk/:id',
        parse: {
          id: (id: string) => {
            const parsedId = parseInt(id, 10);
            return isNaN(parsedId) ? 0 : parsedId;
          },
        },
      },
      
      // Cart route
      Cart: 'keranjang',
      
      // Profile route with user validation
      Profile: {
        path: 'profil/:userId',
        parse: {
          userId: (userId: string) => userId || 'unknown',
        },
      },
      
      // Tab navigator configuration
      AppTabs: {
        screens: {
          Home: 'home',
          Cart: 'cart',
          Profile: 'profile',
        },
      },
    },
  },
  
  // Custom function to handle dynamic links
  async getInitialURL() {
    // Handle cold start - app launched from closed state
    const url = await Linking.getInitialURL();
    
    if (url) {
      console.log('App opened with URL:', url);
      return url;
    }
    
    return null;
  },
  
  // Subscribe to URL changes for warm start
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log('URL received while app running:', url);
      listener(url);
    };

    // Add event listener for warm start
    const subscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      subscription.remove();
    };
  },
};

// Deep link patterns for validation
export const DEEP_LINK_PATTERNS = {
  HOME: /^(ecommerceapp:\/\/|https:\/\/ecommerceapp\.com\/)home\/?$/,
  PRODUCT: /^(ecommerceapp:\/\/|https:\/\/ecommerceapp\.com\/)produk\/(\d+)\/?$/,
  CART: /^(ecommerceapp:\/\/|https:\/\/ecommerceapp\.com\/)keranjang\/?$/,
  PROFILE: /^(ecommerceapp:\/\/|https:\/\/ecommerceapp\.com\/)profil\/([a-zA-Z0-9_-]+)\/?$/,
} as const;

export default linkingConfig;