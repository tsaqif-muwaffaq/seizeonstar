import { Linking, Alert, Platform } from 'react-native';
import { DEEP_LINK_PATTERNS } from '../navigation/linkingConfig';
import { DeepLinkData, ProductDeepLinkParams, ProfileDeepLinkParams } from '../types';

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
      
      console.warn('No matching deep link pattern found for:', url);
      return null;
      
    } catch (error) {
      console.error('Error parsing deep link:', error);
      return null;
    }
  }

  // Validate user ID for profile deep links
  private validateUserId(userId: string): boolean {
    // Basic validation - can be extended based on your user ID format
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
      'ecommerceapp://profil/user123',
      'https://ecommerceapp.com/home',
      'https://ecommerceapp.com/produk/456',
    ];
    
    testLinks.forEach(link => {
      console.log(`Testing: ${link}`, this.parseDeepLink(link));
    });
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