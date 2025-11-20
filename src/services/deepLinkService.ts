import { Linking, Alert, Platform } from 'react-native';
import { DEEP_LINK_PATTERNS } from '../navigation/linkingConfig';
import { DeepLinkData, ProductDeepLinkParams, ProfileDeepLinkParams } from '../types';
import TokenManager from '../utils/tokenManager';

class DeepLinkService {
  // Validate and parse deep link URL
  parseDeepLink(url: string): DeepLinkData | null {
    try {
      console.log('Parsing deep link:', url);
      
      // Remove any query parameters for pattern matching
      const cleanUrl = url.split('?')[0];
      
      // Check for home pattern
      if (DEEP_LINK_PATTERNS.HOME.test(cleanUrl)) {
        return {
          route: 'Home',
          timestamp: Date.now(),
        };
      }
      
      // Check for product pattern
      const productMatch = cleanUrl.match(DEEP_LINK_PATTERNS.PRODUCT);
      if (productMatch) {
        const productId = parseInt(productMatch[2], 10);
        if (!isNaN(productId)) {
          return {
            route: 'Product',
            params: { id: productId } as ProductDeepLinkParams,
            timestamp: Date.now(),
          };
        }
      }
      
      // Check for cart pattern
      if (DEEP_LINK_PATTERNS.CART.test(cleanUrl)) {
        return {
          route: 'Cart',
          timestamp: Date.now(),
        };
      }

      // Check for add-to-cart pattern
      const addToCartMatch = cleanUrl.match(DEEP_LINK_PATTERNS.ADD_TO_CART);
      if (addToCartMatch) {
        const productId = parseInt(addToCartMatch[2], 10);
        if (!isNaN(productId)) {
          return {
            route: 'Cart',
            params: { productId } as { productId: number },
            timestamp: Date.now(),
          };
        }
      }
      
      // Check for profile pattern
      const profileMatch = cleanUrl.match(DEEP_LINK_PATTERNS.PROFILE);
      if (profileMatch) {
        const userId = profileMatch[2];
        if (userId && this.validateUserId(userId)) {
          return {
            route: 'Profile',
            params: { userId } as ProfileDeepLinkParams,
            timestamp: Date.now(),
          };
        }
      }

      // Check for checkout pattern
      if (DEEP_LINK_PATTERNS.CHECKOUT.test(cleanUrl)) {
        return {
          route: 'Checkout',
          timestamp: Date.now(),
        };
      }
      
      console.warn('No matching deep link pattern found for:', url);
      return null;
      
    } catch (error) {
      console.error('Error parsing deep link:', error);
      return null;
    }
  }

  // Validate user ID for profile deep links
  private validateUserId(userId: string): boolean {
    return userId.length > 0 && /^[a-zA-Z0-9_-]+$/.test(userId);
  }

  // Handle warm start - app already running
  async handleWarmStart(url: string, navigation: any): Promise<boolean> {
    try {
      const deepLinkData = this.parseDeepLink(url);
      
      if (!deepLinkData) {
        console.log('No valid deep link data found');
        return false;
      }

      // Check authentication for protected routes
      if (this.isProtectedRoute(deepLinkData.route)) {
        const isAuthenticated = !(await TokenManager.isTokenExpired());
        if (!isAuthenticated) {
          Alert.alert(
            'Authentication Required',
            'Please login to access this feature',
            [
              { 
                text: 'Login', 
                onPress: () => {
                  navigation.navigate('Login', {
                    redirectTo: deepLinkData.route,
                    redirectParams: deepLinkData.params
                  });
                }
              },
              { text: 'Cancel' }
            ]
          );
          return false;
        }
      }

      console.log('Navigating via warm start to:', deepLinkData.route);
      
      // Navigate to the appropriate screen
      if (deepLinkData.params) {
        navigation.navigate(deepLinkData.route, deepLinkData.params);
      } else {
        navigation.navigate(deepLinkData.route);
      }
      
      return true;
    } catch (error) {
      console.error('Error handling warm start:', error);
      Alert.alert('Error', 'Failed to process the link');
      return false;
    }
  }

  // Check if route requires authentication
  private isProtectedRoute(route: string): boolean {
    const protectedRoutes = ['Cart', 'Checkout', 'Profile'];
    return protectedRoutes.includes(route);
  }

  // Validate deep link parameters
  validateParams(route: string, params: any): boolean {
    switch (route) {
      case 'Product':
        return params?.id && Number.isInteger(params.id) && params.id > 0;
      
      case 'Profile':
        return params?.userId && typeof params.userId === 'string';
      
      case 'Cart':
        return true; // Cart doesn't require specific params
      
      default:
        return true;
    }
  }

  // Open external URL
  async openExternalURL(url: string): Promise<boolean> {
    try {
      const supported = await Linking.canOpenURL(url);
      
      if (supported) {
        await Linking.openURL(url);
        return true;
      } else {
        console.warn(`Cannot open URL: ${url}`);
        Alert.alert('Error', `Cannot open the link: ${url}`);
        return false;
      }
    } catch (error) {
      console.error('Error opening URL:', error);
      Alert.alert('Error', 'Failed to open the link');
      return false;
    }
  }

  // Test deep links (for development)
  testDeepLinks() {
    const testLinks = [
      'ecommerceapp://home',
      'ecommerceapp://produk/123',
      'ecommerceapp://keranjang',
      'ecommerceapp://add-to-cart/55',
      'ecommerceapp://profil/user123',
      'ecommerceapp://checkout',
      'https://ecommerceapp.com/home',
      'https://ecommerceapp.com/produk/456',
    ];
    
    console.log('=== Testing Deep Links ===');
    testLinks.forEach(link => {
      const result = this.parseDeepLink(link);
      console.log(`Testing: ${link}`, result);
    });
    console.log('=== End Testing ===');
  }

  // Get platform-specific deep link issues
  getPlatformIssues(): string {
    if (Platform.OS === 'android') {
      return 'Android: Ensure intent filters are properly configured in AndroidManifest.xml';
    } else if (Platform.OS === 'ios') {
      return 'iOS: Ensure URL types are configured in Info.plist and Associated Domains for Universal Links';
    }
    return 'Unknown platform';
  }
}

export default new DeepLinkService();