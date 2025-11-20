// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useNetInfo } from '../hooks/useNetInfo';
// import { NetworkStatus } from '../components/NetworkStatus';
// import { LoadingIndicator } from '../components/LoadingIndicator';
// import { globalStyles } from '../styles/globalStyles';

// interface CartItem {
//   id: number;
//   title: string;
//   price: number;
//   quantity: number;
//   total: number;
// }

// interface CartData {
//   id: number;
//   products: CartItem[];
//   total: number;
//   discountedTotal: number;
//   userId: number;
//   totalProducts: number;
//   totalQuantity: number;
// }

// export const CartScreen: React.FC = () => {
//   const { isConnected, isInternetReachable, type } = useNetInfo();
//   const [cartData, setCartData] = useState<CartData | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [pollingCount, setPollingCount] = useState(0);

//   const isOnline = isConnected && isInternetReachable;
//   const isCellular = type === 'cellular';

//   // Simulate cart data fetch
//   const fetchCartData = async () => {
//     if (!isOnline || isCellular) {
//       setLoading(false);
//       return;
//     }

//     try {
//       // Simulate API call - in real app, this would be actual API call
//       const mockCartData: CartData = {
//         id: 1,
//         products: [
//           { id: 1, title: 'iPhone 9', price: 549, quantity: 2, total: 1098 },
//           { id: 2, title: 'iPhone X', price: 899, quantity: 1, total: 899 },
//         ],
//         total: 1997,
//         discountedTotal: 1897,
//         userId: 1,
//         totalProducts: 2,
//         totalQuantity: 3,
//       };

//       setCartData(mockCartData);
//       setPollingCount(prev => prev + 1);
//     } catch (error) {
//       console.error('Error fetching cart data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Polling implementation
//   useEffect(() => {
//     if (isCellular) {
//       console.log('📵 Polling disabled: Cellular network detected');
//       return;
//     }

//     if (!isOnline) {
//       setLoading(false);
//       return;
//     }

//     // Initial fetch
//     fetchCartData();

//     // Set up polling interval (15 seconds)
//     const intervalId = setInterval(() => {
//       console.log('🔄 Polling cart data...');
//       fetchCartData();
//     }, 15000); // 15 seconds

//     // Cleanup interval on unmount or when dependencies change
//     return () => {
//       console.log('🧹 Cleaning up polling interval');
//       clearInterval(intervalId);
//     };
//   }, [isOnline, isCellular]);

//   if (loading && isOnline && !isCellular) {
//     return (
//       <View style={globalStyles.container}>
//         <NetworkStatus />
//         <LoadingIndicator text="Memuat keranjang..." />
//       </View>
//     );
//   }

//   const renderProductItem = (product: CartItem) => (
//     <View style={styles.productItem} key={product.id}>
//       <Text style={styles.productName}>{product.title}</Text>
//       <View style={styles.productDetails}>
//         <Text>${product.price} x {product.quantity}</Text>
//         <Text style={styles.productTotal}>${product.total}</Text>
//       </View>
//     </View>
//   );

//   return (
//     <View style={globalStyles.container}>
//       <NetworkStatus />
      
//       <View style={styles.header}>
//         <Text style={styles.title}>🛒 Keranjang Belanja</Text>
//         <Text style={styles.subtitle}>
//           {isCellular ? 'Polling dimatikan (jaringan seluler)' : `Polling count: ${pollingCount}`}
//         </Text>
//       </View>

//       {isCellular && (
//         <View style={styles.cellularWarning}>
//           <Text style={styles.warningText}>
//             📵 Polling dimatikan untuk menghemat kuota data seluler
//           </Text>
//         </View>
//       )}

//       {!isOnline ? (
//         <View style={styles.offlineContainer}>
//           <Text style={styles.offlineText}>
//             Tidak dapat memuat keranjang - Periksa koneksi internet Anda
//           </Text>
//         </View>
//       ) : cartData ? (
//         <ScrollView style={styles.content}>
//           <View style={styles.summaryCard}>
//             <Text style={styles.summaryTitle}>Ringkasan Belanja</Text>
//             <View style={styles.summaryRow}>
//               <Text>Total Produk:</Text>
//               <Text style={styles.summaryValue}>{cartData.totalProducts}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text>Total Quantity:</Text>
//               <Text style={styles.summaryValue}>{cartData.totalQuantity}</Text>
//             </View>
//             <View style={styles.summaryRow}>
//               <Text>Subtotal:</Text>
//               <Text style={styles.summaryValue}>${cartData.total}</Text>
//             </View>
//             <View style={[styles.summaryRow, styles.totalRow]}>
//               <Text style={styles.totalLabel}>Total:</Text>
//               <Text style={styles.totalValue}>${cartData.discountedTotal}</Text>
//             </View>
//           </View>

//           <View style={styles.productsSection}>
//             <Text style={styles.sectionTitle}>Produk dalam Keranjang</Text>
//             {cartData.products.map(renderProductItem)}
//           </View>

//           <TouchableOpacity style={[globalStyles.button, globalStyles.buttonPrimary, styles.checkoutButton]}>
//             <Text style={globalStyles.buttonText}>Lanjut ke Checkout</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       ) : (
//         <View style={styles.emptyContainer}>
//           <Text style={styles.emptyText}>Keranjang kosong</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     padding: 16,
//     backgroundColor: '#fff',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     textAlign: 'center',
//     marginTop: 4,
//   },
//   cellularWarning: {
//     backgroundColor: '#FFF3CD',
//     padding: 12,
//     margin: 16,
//     borderRadius: 8,
//     borderLeftWidth: 4,
//     borderLeftColor: '#FFC107',
//   },
//   warningText: {
//     color: '#856404',
//     fontSize: 14,
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//     padding: 16,
//   },
//   summaryCard: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   summaryTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   summaryValue: {
//     fontWeight: '600',
//     color: '#333',
//   },
//   totalRow: {
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
//     paddingTop: 8,
//     marginTop: 8,
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#2196F3',
//   },
//   productsSection: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     color: '#333',
//   },
//   productItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   productName: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginBottom: 4,
//     color: '#333',
//   },
//   productDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   productTotal: {
//     fontWeight: 'bold',
//     color: '#2196F3',
//   },
//   checkoutButton: {
//     marginTop: 16,
//   },
//   offlineContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   offlineText: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     textAlign: 'center',
//   },
// });

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const CartScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Mock cart data
  useEffect(() => {
    const mockCartItems: CartItem[] = [
      { id: 1, name: 'Product 1', price: 29.99, quantity: 2 },
      { id: 2, name: 'Product 2', price: 49.99, quantity: 1 },
      { id: 3, name: 'Product 3', price: 19.99, quantity: 3 },
    ];
    
    setCartItems(mockCartItems);
    calculateTotal(mockCartItems);
  }, []);

  const calculateTotal = (items: CartItem[]) => {
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalPrice(total);
  };

  const updateQuantity = (id: number, change: number) => {
    const updatedItems = cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total: $${totalPrice.toFixed(2)}\nProceed with checkout?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Checkout', 
          onPress: () => {
            Alert.alert('Success', 'Order placed successfully!');
            setCartItems([]);
            setTotalPrice(0);
          }
        },
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)} each</Text>
      </View>
      <View style={styles.quantityControls}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, -1)}
        >
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{item.quantity}</Text>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => updateQuantity(item.id, 1)}
        >
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.itemTotal}>
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Shopping Cart</Text>
        <Text style={styles.subtitle}>
          Opened via deep link: ecommerceapp://keranjang
        </Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.infoText}>
            This screen demonstrates warm start deep linking functionality.
          </Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home' as never)}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            style={styles.cartList}
          />
          
          <View style={styles.footer}>
            <View style={styles.totalSection}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <View style={styles.deepLinkInfo}>
        <Text style={styles.infoTitle}>Deep Link Testing</Text>
        <Text style={styles.infoText}>
          • Cold Start: App closed → Open ecommerceapp://keranjang{"\n"}
          • Warm Start: App in background → Open ecommerceapp://keranjang{"\n"}
          • Universal Link: https://ecommerceapp.com/keranjang
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#999',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  shopButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  cartList: {
    flex: 1,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 15,
    fontSize: 16,
    fontWeight: '600',
    minWidth: 20,
    textAlign: 'center',
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    minWidth: 60,
    textAlign: 'right',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  checkoutButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  deepLinkInfo: {
    padding: 20,
    margin: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
});

export default CartScreen;