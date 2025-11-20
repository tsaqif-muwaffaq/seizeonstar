import * as React from 'react';
import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  FlatList 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import useWishlist from '../hooks/useWishlist';
import DeepLinkService from '../services/deepLinkService';
import { RootStackParamList } from '../types';

// FIX: Define proper navigation prop type
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock products data
const mockProducts = [
  { id: 1, name: 'Smartphone X', price: 299.99, category: 'Electronics' },
  { id: 2, name: 'Laptop Pro', price: 999.99, category: 'Electronics' },
  { id: 3, name: 'Running Shoes', price: 89.99, category: 'Fashion' },
  { id: 4, name: 'Coffee Maker', price: 49.99, category: 'Home' },
  { id: 5, name: 'Book Collection', price: 29.99, category: 'Books' },
  { id: 6, name: 'Headphones', price: 79.99, category: 'Electronics' },
];

const HomeScreen = () => {
  // FIX: Use the proper navigation type without specifying screen
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();
  const { wishlist, toggleWishlistItem, isInWishlist, meta } = useWishlist();
  
  const [products, setProducts] = useState(mockProducts);

  // FIX: Properly typed navigation functions
  const navigateToProduct = (productId: number) => {
    console.log('Navigating to product:', productId);
    navigation.navigate('Product', { id: productId });
  };

 const navigateToCart = () => {
  navigation.navigate('Cart' as never);
};

  const navigateToProfile = (userId: string) => {
    navigation.navigate('Profile', { userId });
  };

  const handleWishlistToggle = async (productId: number) => {
    const added = await toggleWishlistItem(productId);
    if (added) {
      Alert.alert('Added to Wishlist', 'Product added to your wishlist!');
    } else {
      Alert.alert('Removed from Wishlist', 'Product removed from your wishlist.');
    }
  };

  const testDeepLinks = () => {
    const testLinks = [
      { url: 'ecommerceapp://produk/123', description: 'Product 123' },
      { url: 'ecommerceapp://keranjang', description: 'Cart' },
      { url: 'ecommerceapp://add-to-cart/55', description: 'Add to Cart 55' },
      { url: 'ecommerceapp://profil/testuser', description: 'Profile Test' },
      { url: 'ecommerceapp://checkout', description: 'Checkout' },
    ];

    Alert.alert(
      'Test Deep Links',
      'Choose a deep link to test:',
      [
        ...testLinks.map(link => ({
          text: link.description,
          onPress: () => DeepLinkService.openExternalURL(link.url),
        })),
        {
          text: 'Cancel',
          style: 'cancel',
        }
      ]
    );
  };

  const renderProductItem = ({ item }: { item: any }) => {
    const inWishlist = isInWishlist(item.id);
    
    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          style={styles.productContent}
          onPress={() => navigateToProduct(item.id)}
        >
          <View style={styles.productImage}>
            <Text style={styles.productEmoji}>
              {item.category === 'Electronics' ? '📱' : 
               item.category === 'Fashion' ? '👟' : 
               item.category === 'Home' ? '🏠' : '📚'}
            </Text>
          </View>
          
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productCategory}>{item.category}</Text>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
        
        <View style={styles.productActions}>
          <TouchableOpacity 
            style={styles.viewButton}
            onPress={() => navigateToProduct(item.id)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.wishlistButton, inWishlist && styles.wishlistButtonActive]}
            onPress={() => handleWishlistToggle(item.id)}
          >
            <Text style={[styles.wishlistButtonText, inWishlist && styles.wishlistButtonTextActive]}>
              {inWishlist ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to E-Commerce!</Text>
        <Text style={styles.subtitle}>Hello, {user?.name}!</Text>
        
        {meta && (
          <View style={styles.wishlistSummary}>
            <Text style={styles.wishlistText}>
              {meta.count} items in wishlist • Updated {new Date(meta.updatedAt).toLocaleDateString()}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <Text style={styles.sectionText}>
          Tap on any product to view details via navigation
        </Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id.toString()}
        scrollEnabled={false}
        contentContainerStyle={styles.productsGrid}
      />

      <View style={styles.quickActions}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={navigateToCart}
          >
            <Text style={styles.actionButtonText}>View Cart</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigateToProfile(user?.id || 'unknown')}
          >
            <Text style={styles.actionButtonText}>My Profile</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.testButton} onPress={testDeepLinks}>
        <Text style={styles.testButtonText}>Test Deep Links</Text>
      </TouchableOpacity>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Active Features:</Text>
        <Text style={styles.featureItem}>• Protected Routes with Authentication</Text>
        <Text style={styles.featureItem}>• Secure Token Management (Keychain)</Text>
        <Text style={styles.featureItem}>• Wishlist with AsyncStorage</Text>
        <Text style={styles.featureItem}>• Deep Link Handling (Cold/Warm Start)</Text>
        <Text style={styles.featureItem}>• Add to Cart via Deep Links</Text>
        <Text style={styles.featureItem}>• Automatic Token Expiry Check</Text>
      </View>

      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text style={styles.debugText}>• User: {user?.id}</Text>
        <Text style={styles.debugText}>• Wishlist Items: {wishlist.length}</Text>
        <Text style={styles.debugText}>• Protected Routes: Cart, Checkout, Profile</Text>
        <Text style={styles.debugText}>• Token Expiry: {user?.tokenExpiry ? new Date(user.tokenExpiry).toLocaleString() : 'N/A'}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  wishlistSummary: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#e7f3ff',
    borderRadius: 6,
  },
  wishlistText: {
    fontSize: 12,
    color: '#007AFF',
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  sectionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  productsGrid: {
    padding: 10,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  productEmoji: {
    fontSize: 24,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
    marginTop: 4,
  },
  productActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  viewButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  wishlistButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  wishlistButtonActive: {
    backgroundColor: '#dc3545',
    borderColor: '#dc3545',
  },
  wishlistButtonText: {
    fontSize: 14,
    color: '#6c757d',
  },
  wishlistButtonTextActive: {
    color: '#fff',
  },
  quickActions: {
    padding: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  testButton: {
    backgroundColor: '#FF9500',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  features: {
    padding: 20,
    margin: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  debugSection: {
    padding: 15,
    margin: 20,
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007AFF',
  },
  debugText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 3,
    fontFamily: 'monospace',
  },
});

export default HomeScreen;