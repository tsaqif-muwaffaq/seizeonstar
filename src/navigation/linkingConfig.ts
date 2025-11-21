import { LinkingOptions } from '@react-navigation/native';
import { Linking } from 'react-native';
import { RootStackParamList } from '../types';

const linkingConfig: LinkingOptions<RootStackParamList> = {
  prefixes: ['ecommerceapp://', 'https://yourapp.com'],
  
  config: {
    screens: {
      AppTabs: {
        screens: {
          HomeTab: 'home',
          ProductsTab: 'products', 
          CartTab: 'keranjang',
          ProfileTab: 'profile',
        },
      },
      Product: 'produk/:id',
      Cart: 'keranjang',
      Checkout: 'checkout',
      
      // New Image Picker screens
      ProductUpload: 'upload-product',
      ProfileImage: 'profile/image',
      ProductList: 'products/list',
      
      // Auth screens
      Login: 'login',
      Splash: 'splash',
    },
  },
  
  // Custom getInitialURL for deep linking
  async getInitialURL() {
    // Handle cold start deep links
    const url = await Linking.getInitialURL();
    console.log('Initial URL:', url);
    
    if (url != null) {
      return url;
    }
    
    return null;
  },
  
  // Custom subscribe function for warm starts
  subscribe(listener: (url: string) => void) {
    const onReceiveURL = ({ url }: { url: string }) => {
      console.log('Deep link URL received:', url);
      listener(url);
    };

    // Add event listener
    const subscription = Linking.addEventListener('url', onReceiveURL);

    return () => {
      // Clean up the event listener
      subscription.remove();
    };
  },
};

export default linkingConfig;