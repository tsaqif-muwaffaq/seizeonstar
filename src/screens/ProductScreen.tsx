// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ActivityIndicator,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
// import { RootStackParamList } from '../types';

// type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;

// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   description: string;
//   image: string;
//   category: string;
//   inStock: boolean;
// }

// const ProductScreen = () => {
//   const route = useRoute<ProductScreenRouteProp>();
//   const navigation = useNavigation();
//   const { id } = route.params;
  
//   const [product, setProduct] = useState<Product | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);

//   useEffect(() => {
//     loadProduct();
//   }, [id]);

//   const loadProduct = async () => {
//     try {
//       setLoading(true);
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // Mock product data based on ID
//       const mockProduct: Product = {
//         id: id,
//         name: `Premium Product ${id}`,
//         price: Math.floor(Math.random() * 100) + 20,
//         description: `This is an amazing product ${id} with premium features. It offers excellent value and comes with a satisfaction guarantee. Perfect for everyday use with durable materials and innovative design.`,
//         image: `https://picsum.photos/300/200?random=${id}`,
//         category: ['Electronics', 'Home', 'Fashion'][id % 3],
//         inStock: Math.random() > 0.2, // 80% chance in stock
//       };
      
//       setProduct(mockProduct);
      
//       // Update navigation title
//       navigation.setOptions({ title: mockProduct.name });
      
//     } catch (error) {
//       console.error('Error loading product:', error);
//       Alert.alert('Error', 'Failed to load product details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addToCart = () => {
//     if (product) {
//       Alert.alert(
//         'Add to Cart',
//         `Add ${quantity} ${product.name} to cart?`,
//         [
//           { text: 'Cancel', style: 'cancel' },
//           { 
//             text: 'Add to Cart', 
//             onPress: () => {
//               Alert.alert('Success', 'Product added to cart!');
//               // Here you would typically dispatch to cart store/context
//             }
//           },
//         ]
//       );
//     }
//   };

//   const updateQuantity = (change: number) => {
//     setQuantity(prev => Math.max(1, prev + change));
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={styles.loadingText}>Loading Product Details...</Text>
//       </View>
//     );
//   }

//   if (!product) {
//     return (
//       <View style={styles.center}>
//         <Text style={styles.errorText}>Product not found</Text>
//         <TouchableOpacity 
//           style={styles.retryButton}
//           onPress={loadProduct}
//         >
//           <Text style={styles.retryButtonText}>Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.imageContainer}>
//         <View style={styles.imagePlaceholder}>
//           <Text style={styles.imageText}>Product Image</Text>
//           <Text style={styles.imageSubtext}>ID: {product.id}</Text>
//         </View>
//         {!product.inStock && (
//           <View style={styles.outOfStockBadge}>
//             <Text style={styles.outOfStockText}>Out of Stock</Text>
//           </View>
//         )}
//       </View>
      
//       <View style={styles.header}>
//         <Text style={styles.productName}>{product.name}</Text>
//         <View style={styles.metaInfo}>
//           <Text style={styles.category}>Category: {product.category}</Text>
//           <Text style={styles.productId}>ID: {product.id}</Text>
//         </View>
//       </View>
      
//       <View style={styles.priceSection}>
//         <Text style={styles.price}>${product.price.toFixed(2)}</Text>
//         <View style={styles.stockStatus}>
//           <View 
//             style={[
//               styles.statusDot,
//               { backgroundColor: product.inStock ? '#34C759' : '#FF3B30' }
//             ]} 
//           />
//           <Text style={styles.stockText}>
//             {product.inStock ? 'In Stock' : 'Out of Stock'}
//           </Text>
//         </View>
//       </View>
      
//       <View style={styles.quantitySection}>
//         <Text style={styles.quantityLabel}>Quantity:</Text>
//         <View style={styles.quantityControls}>
//           <TouchableOpacity 
//             style={styles.quantityButton}
//             onPress={() => updateQuantity(-1)}
//           >
//             <Text style={styles.quantityButtonText}>-</Text>
//           </TouchableOpacity>
//           <Text style={styles.quantityText}>{quantity}</Text>
//           <TouchableOpacity 
//             style={styles.quantityButton}
//             onPress={() => updateQuantity(1)}
//           >
//             <Text style={styles.quantityButtonText}>+</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
      
//       <TouchableOpacity 
//         style={[
//           styles.addToCartButton,
//           !product.inStock && styles.disabledButton
//         ]}
//         onPress={addToCart}
//         disabled={!product.inStock}
//       >
//         <Text style={styles.addToCartButtonText}>
//           {product.inStock ? 'Add to Cart' : 'Out of Stock'}
//         </Text>
//       </TouchableOpacity>
      
//       <View style={styles.descriptionSection}>
//         <Text style={styles.sectionTitle}>Description</Text>
//         <Text style={styles.description}>{product.description}</Text>
//       </View>
      
//       <View style={styles.deepLinkInfo}>
//         <Text style={styles.infoTitle}>Deep Link Information</Text>
//         <Text style={styles.infoText}>
//           This screen was opened via deep link: 
//         </Text>
//         <Text style={styles.deepLinkUrl}>
//           ecommerceapp://produk/{id}
//         </Text>
//         <Text style={styles.infoText}>
//           or universal link:
//         </Text>
//         <Text style={styles.deepLinkUrl}>
//           https://ecommerceapp.com/produk/{id}
//         </Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   center: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 20,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#666',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#FF3B30',
//     marginBottom: 15,
//   },
//   retryButton: {
//     backgroundColor: '#007AFF',
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   imageContainer: {
//     position: 'relative',
//   },
//   imagePlaceholder: {
//     height: 250,
//     backgroundColor: '#f8f9fa',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageText: {
//     fontSize: 18,
//     color: '#666',
//     fontWeight: '600',
//   },
//   imageSubtext: {
//     fontSize: 14,
//     color: '#999',
//     marginTop: 8,
//   },
//   outOfStockBadge: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     backgroundColor: '#FF3B30',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 4,
//   },
//   outOfStockText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   header: {
//     padding: 20,
//   },
//   productName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   metaInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   category: {
//     fontSize: 14,
//     color: '#666',
//   },
//   productId: {
//     fontSize: 14,
//     color: '#999',
//   },
//   priceSection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     backgroundColor: '#f8f9fa',
//   },
//   price: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   stockStatus: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statusDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     marginRight: 6,
//   },
//   stockText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   quantitySection: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   quantityLabel: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   quantityControls: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   quantityButton: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   quantityButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   quantityText: {
//     marginHorizontal: 20,
//     fontSize: 18,
//     fontWeight: '600',
//     minWidth: 30,
//     textAlign: 'center',
//   },
//   addToCartButton: {
//     backgroundColor: '#34C759',
//     margin: 20,
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   disabledButton: {
//     backgroundColor: '#C7C7CC',
//   },
//   addToCartButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   descriptionSection: {
//     padding: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   description: {
//     fontSize: 16,
//     lineHeight: 24,
//     color: '#666',
//   },
//   deepLinkInfo: {
//     padding: 20,
//     margin: 20,
//     backgroundColor: '#f0f8ff',
//     borderRadius: 8,
//     borderLeftWidth: 4,
//     borderLeftColor: '#007AFF',
//   },
//   infoTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: '#007AFF',
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 4,
//   },
//   deepLinkUrl: {
//     fontSize: 14,
//     color: '#007AFF',
//     fontWeight: '600',
//     backgroundColor: '#e6f2ff',
//     padding: 8,
//     borderRadius: 4,
//     marginVertical: 4,
//     fontFamily: 'monospace',
//   },
// });

// export default ProductScreen;

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types';

type ProductScreenRouteProp = RouteProp<RootStackParamList, 'Product'>;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  inStock: boolean;
}

const ProductScreen = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const navigation = useNavigation();
  const { id } = route.params;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Debug: Log ketika component mount dan params berubah
  useEffect(() => {
    console.log('ProductScreen mounted with params:', route.params);
    console.log('Product ID:', id);
  }, [route.params, id]);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      console.log('Loading product with ID:', id);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock product data based on ID
      const mockProduct: Product = {
        id: id,
        name: `Premium Product ${id}`,
        price: Math.floor(Math.random() * 100) + 20,
        description: `This is an amazing product ${id} with premium features. It offers excellent value and comes with a satisfaction guarantee. Perfect for everyday use with durable materials and innovative design.`,
        image: `https://picsum.photos/300/200?random=${id}`,
        category: ['Electronics', 'Home', 'Fashion'][id % 3],
        inStock: Math.random() > 0.2, // 80% chance in stock
      };
      
      setProduct(mockProduct);
      
      // Update navigation title
      navigation.setOptions({ 
        title: `Product ${id}`,
        headerBackTitle: 'Back to Home'
      });
      
      console.log('Product loaded successfully:', mockProduct);
      
    } catch (error) {
      console.error('Error loading product:', error);
      Alert.alert('Error', 'Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (product) {
      Alert.alert(
        'Add to Cart',
        `Add ${quantity} ${product.name} to cart?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { 
            text: 'Add to Cart', 
            onPress: () => {
              Alert.alert('Success', 'Product added to cart!');
              console.log(`Added ${quantity} of product ${product.id} to cart`);
            }
          },
        ]
      );
    }
  };

  const updateQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading Product {id}...</Text>
        <Text style={styles.debugText}>Please wait while we fetch product details</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Product {id} not found</Text>
        <Text style={styles.debugText}>Check if the product ID is valid</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={loadProduct}
        >
          <Text style={styles.retryButtonText}>Retry Loading</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Debug Info Banner */}
      <View style={styles.debugBanner}>
        <Text style={styles.debugBannerText}>
          Product ID: {id} | Screen: ProductScreen
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>Product Image</Text>
          <Text style={styles.imageSubtext}>ID: {product.id}</Text>
        </View>
        {!product.inStock && (
          <View style={styles.outOfStockBadge}>
            <Text style={styles.outOfStockText}>Out of Stock</Text>
          </View>
        )}
      </View>
      
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.category}>Category: {product.category}</Text>
          <Text style={styles.productId}>ID: {product.id}</Text>
        </View>
      </View>
      
      <View style={styles.priceSection}>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <View style={styles.stockStatus}>
          <View 
            style={[
              styles.statusDot,
              { backgroundColor: product.inStock ? '#34C759' : '#FF3B30' }
            ]} 
          />
          <Text style={styles.stockText}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      </View>
      
      <View style={styles.quantitySection}>
        <Text style={styles.quantityLabel}>Quantity:</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(-1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[
          styles.addToCartButton,
          !product.inStock && styles.disabledButton
        ]}
        onPress={addToCart}
        disabled={!product.inStock}
      >
        <Text style={styles.addToCartButtonText}>
          {product.inStock ? `Add ${quantity} to Cart - $${(product.price * quantity).toFixed(2)}` : 'Out of Stock'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
      
      <View style={styles.deepLinkInfo}>
        <Text style={styles.infoTitle}>Deep Link Information</Text>
        <Text style={styles.infoText}>
          This screen was opened via:{'\n'}
          <Text style={styles.codeText}>ecommerceapp://produk/{id}</Text>
          {'\n'}or{'\n'}
          <Text style={styles.codeText}>https://ecommerceapp.com/produk/{id}</Text>
        </Text>
      </View>

      {/* Navigation Debug */}
      <View style={styles.navigationDebug}>
        <Text style={styles.debugTitle}>Navigation Debug</Text>
        <Text style={styles.debugItem}>• Current Route: Product</Text>
        <Text style={styles.debugItem}>• Product ID: {id}</Text>
        <Text style={styles.debugItem}>• Params: {JSON.stringify(route.params)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingBottom: 30,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  debugText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  errorText: {
    fontSize: 18,
    color: '#FF3B30',
    marginBottom: 10,
  },
  retryButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  debugBanner: {
    backgroundColor: '#007AFF',
    padding: 10,
    alignItems: 'center',
  },
  debugBannerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
  },
  imagePlaceholder: {
    height: 200,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
  },
  imageSubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  outOfStockBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF3B30',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  outOfStockText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  header: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  productId: {
    fontSize: 14,
    color: '#999',
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#f8f9fa',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  stockStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  stockText: {
    fontSize: 14,
    color: '#666',
  },
  quantitySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  addToCartButton: {
    backgroundColor: '#34C759',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#C7C7CC',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  descriptionSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
  },
  deepLinkInfo: {
    padding: 20,
    margin: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  codeText: {
    fontFamily: 'monospace',
    backgroundColor: '#e6f2ff',
    padding: 4,
    borderRadius: 4,
  },
  navigationDebug: {
    padding: 15,
    margin: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  debugItem: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontFamily: 'monospace',
  },
});

export default ProductScreen;