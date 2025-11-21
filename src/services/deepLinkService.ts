import { Linking, Alert } from 'react-native';
import { DeepLinkData } from '../types';

// Define deep link patterns locally since we can't import from linkingConfig
const DEEP_LINK_PATTERNS = {
  PRODUCT: /ecommerceapp:\/\/produk\/(.+)/,
  CART: /ecommerceapp:\/\/keranjang/,
  ADD_TO_CART: /ecommerceapp:\/\/add-to-cart\/(.+)/,
  PROFILE: /ecommerceapp:\/\/profile/,
  HOME: /ecommerceapp:\/\/home/,
  UPLOAD_PRODUCT: /ecommerceapp:\/\/upload-product/,
  PROFILE_IMAGE: /ecommerceapp:\/\/profile\/image/,
  PRODUCT_LIST: /ecommerceapp:\/\/products\/list/,
};

class DeepLinkService {
  /**
   * Handle cold start deep links (app was closed)
   */
  static async handleColdStart(url: string, navigation: any): Promise<void> {
    console.log('Handling cold start deep link:', url);
    await this.processDeepLink(url, navigation);
  }

  /**
   * Handle warm start deep links (app was in background)
   */
  static async handleWarmStart(url: string, navigation: any): Promise<void> {
    console.log('Handling warm start deep link:', url);
    await this.processDeepLink(url, navigation);
  }

  /**
   * Process deep link URL and navigate accordingly
   */
  private static async processDeepLink(url: string, navigation: any): Promise<void> {
    try {
      const deepLinkData = this.parseDeepLink(url);
      
      if (!deepLinkData) {
        console.log('No deep link data found for URL:', url);
        return;
      }

      await this.navigateToScreen(deepLinkData, navigation);
    } catch (error) {
      console.error('Error processing deep link:', error);
      Alert.alert('Error', 'Gagal memproses deep link');
    }
  }

  /**
   * Parse deep link URL and extract route and parameters
   */
  static parseDeepLink(url: string): DeepLinkData | null {
    console.log('Parsing deep link URL:', url);

    // Product detail deep link
    const productMatch = url.match(DEEP_LINK_PATTERNS.PRODUCT);
    if (productMatch) {
      return {
        route: 'Product',
        params: { productId: productMatch[1] },
      };
    }

    // Add to cart deep link
    const addToCartMatch = url.match(DEEP_LINK_PATTERNS.ADD_TO_CART);
    if (addToCartMatch) {
      return {
        route: 'Product',
        params: { productId: addToCartMatch[1], addToCart: true },
      };
    }

    // Cart deep link
    if (DEEP_LINK_PATTERNS.CART.test(url)) {
      return {
        route: 'Cart',
        params: {},
      };
    }

    // Profile deep link
    if (DEEP_LINK_PATTERNS.PROFILE.test(url)) {
      return {
        route: 'Profile',
        params: {},
      };
    }

    // Home deep link
    if (DEEP_LINK_PATTERNS.HOME.test(url)) {
      return {
        route: 'Home',
        params: {},
      };
    }

    // Upload product deep link
    if (DEEP_LINK_PATTERNS.UPLOAD_PRODUCT.test(url)) {
      return {
        route: 'ProductUpload',
        params: {},
      };
    }

    // Profile image deep link
    if (DEEP_LINK_PATTERNS.PROFILE_IMAGE.test(url)) {
      return {
        route: 'ProfileImage',
        params: {},
      };
    }

    // Product list deep link
    if (DEEP_LINK_PATTERNS.PRODUCT_LIST.test(url)) {
      return {
        route: 'ProductList',
        params: {},
      };
    }

    return null;
  }

  /**
   * Navigate to the appropriate screen based on deep link data
   */
  private static async navigateToScreen(deepLinkData: DeepLinkData, navigation: any): Promise<void> {
    const { route, params } = deepLinkData;

    // Wait a bit for navigation to be ready
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      switch (route) {
        case 'Product':
          navigation.navigate('Product', params);
          break;
        
        case 'Cart':
          navigation.navigate('Cart');
          break;
        
        case 'Profile':
          navigation.navigate('Profile');
          break;
        
        case 'Home':
          navigation.navigate('AppTabs', { screen: 'HomeTab' });
          break;
        
        case 'ProductUpload':
          navigation.navigate('ProductUpload');
          break;
        
        case 'ProfileImage':
          navigation.navigate('ProfileImage');
          break;
        
        case 'ProductList':
          navigation.navigate('ProductList');
          break;
        
        default:
          console.warn('Unknown deep link route:', route);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      Alert.alert('Error', `Gagal navigasi ke ${route}`);
    }
  }

  /**
   * Test deep links (for development)
   */
  static testDeepLinks(): void {
    if (!__DEV__) return;

    const testUrls = [
      'ecommerceapp://produk/123',
      'ecommerceapp://keranjang',
      'ecommerceapp://add-to-cart/55',
      'ecommerceapp://profile',
      'ecommerceapp://home',
      'ecommerceapp://upload-product',
      'ecommerceapp://profile/image',
      'ecommerceapp://products/list',
    ];

    console.log('=== DEEP LINK TESTING ===');
    testUrls.forEach(url => {
      const result = this.parseDeepLink(url);
      console.log(`URL: ${url} ->`, result);
    });
    console.log('=== END DEEP LINK TESTING ===');
  }

  /**
   * Open URL with error handling
   */
  static async openURL(url: string): Promise<void> {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Tidak dapat membuka URL: ' + url);
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Gagal membuka URL');
    }
  }
}

export default DeepLinkService;