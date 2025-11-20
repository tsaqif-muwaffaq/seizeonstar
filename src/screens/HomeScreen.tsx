// import * as React from 'react';
// import { useState, useCallback } from 'react';
// import { 
//   View, 
//   FlatList, 
//   Text, 
//   StyleSheet, 
//   Image, 
//   TouchableOpacity, 
//   useWindowDimensions,
//   Alert,
//   RefreshControl,
//   StatusBar,
//   Modal,
//   ScrollView
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LegacyProduct, AnyProduct, getProductId, getProductName, getProductImageUrl, getProductDescription, getProductPrice } from '../types/Product';
// import { initialProducts } from '../data/products';
// import { AddProductModal } from '../components/AddProductModal';
// import { ProductDetailModal } from '../components/ProductDetailModal';
// import { globalStyles } from '../styles/globalStyles';
// import { ExtendedHomeTabs } from '../components/ExtendedHomeTabs';
// import { useAuthContext } from '../context/AuthContext';

// // Data produk untuk semua kategori
// const productCategories: { [key: string]: AnyProduct[] } = {
//   'Semua': initialProducts,
//   'Populer': initialProducts.slice(0, 3),
//   'Terbaru': initialProducts.slice(3, 6),
//   'Chambre de Lavain': initialProducts
// };

// interface HomeScreenProps {
//   navigation: any;
// }

// export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
//   const [products, setProducts] = useState<AnyProduct[]>(initialProducts);
//   const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
//   const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<AnyProduct | null>(null);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
//   const { width, height } = useWindowDimensions();
//   const { user } = useAuthContext();

//   const handleAddProduct = useCallback((newProduct: LegacyProduct) => {
//     setProducts(prev => [newProduct, ...prev]);
//     productCategories['Semua'] = [newProduct, ...productCategories['Semua']];
//     setAddModalVisible(false);
//   }, []);

//   // Soal Praktik 2: Navigasi ke Stack Detail
//   const handleProductPress = useCallback((product: AnyProduct) => {
//     navigation.navigate('ProductDetail' as never, { product } as never);
//   }, [navigation]);

//   const handleDeleteProduct = useCallback((productId: string) => {
//     Alert.alert(
//       'Hapus Produk',
//       'Apakah Anda yakin ingin menghapus produk ini?',
//       [
//         {
//           text: 'Batal',
//           style: 'cancel',
//         },
//         {
//           text: 'Hapus',
//           style: 'destructive',
//           onPress: () => {
//             setProducts(prev => prev.filter(product => getProductId(product) !== productId));
//             productCategories['Semua'] = productCategories['Semua'].filter(product => getProductId(product) !== productId);
//             if (selectedProduct && getProductId(selectedProduct) === productId) {
//               setDetailModalVisible(false);
//               setSelectedProduct(null);
//             }
//           },
//         },
//       ]
//     );
//   }, [selectedProduct]);

//   const onRefresh = useCallback(() => {
//     setRefreshing(true);
//     setTimeout(() => {
//       setProducts(initialProducts);
//       productCategories['Semua'] = initialProducts;
//       setRefreshing(false);
//     }, 1000);
//   }, []);

//   const isLandscape = width > height;
//   const numColumns = isLandscape ? 3 : 2;

//   const filteredProducts = productCategories[selectedCategory] || products;

//   const renderProductItem = useCallback(({ item }: { item: AnyProduct }) => (
//     <TouchableOpacity 
//       onPress={() => handleProductPress(item)} 
//       style={[
//         styles.card, 
//         isLandscape ? { width: `${100 / numColumns - 2}%` } : { width: `${100 / numColumns - 4}%` }
//       ]}
//       activeOpacity={0.7}
//     >
//       <Image 
//         source={{ uri: getProductImageUrl(item) }} 
//         style={styles.image} 
//       />

//       <View style={styles.productInfo}>
//         <Text style={styles.name} numberOfLines={2}>{getProductName(item)}</Text>
//         <Text style={styles.price}>Rp {getProductPrice(item).toLocaleString('id-ID')}</Text>
//         {getProductDescription(item) ? (
//           <Text style={styles.desc} numberOfLines={2}>{getProductDescription(item)}</Text>
//         ) : null}
//       </View>
//     </TouchableOpacity>
//   ), [isLandscape, numColumns, handleProductPress]);

//   const getProductKey = useCallback((item: AnyProduct) => getProductId(item), []);

//   const renderCategoryChip = useCallback((category: string) => (
//     <TouchableOpacity
//       key={category}
//       style={[
//         styles.categoryChip,
//         selectedCategory === category && styles.categoryChipActive
//       ]}
//       onPress={() => setSelectedCategory(category)}
//     >
//       <Text style={[
//         styles.categoryChipText,
//         selectedCategory === category && styles.categoryChipTextActive
//       ]}>
//         {category}
//       </Text>
//       <Text style={styles.categoryCount}>
//         ({productCategories[category]?.length || 0})
//       </Text>
//     </TouchableOpacity>
//   ), [selectedCategory]);

//   return (
//     <View style={globalStyles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      
//       {/* Header dengan tombol menu */}
//       <View style={styles.header}>
//         <TouchableOpacity 
//           style={styles.menuButton}
//           onPress={() => navigation.toggleDrawer()}
//         >
//           <Text style={styles.menuButtonText}>☰</Text>
//         </TouchableOpacity>
//         <View style={styles.headerTitle}>
//           <Text style={globalStyles.title}>seizeonstar.catalog</Text>
//           <Text style={styles.productCount}>
//             {filteredProducts.length} produk di {selectedCategory}
//           </Text>
//         </View>
//       </View>

//       {/* Kategori Section */}
//       <View style={styles.categoriesSection}>
//         <Text style={styles.categoriesTitle}>Kategori Produk</Text>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesContainer}
//         >
//           {Object.keys(productCategories).map(renderCategoryChip)}
          
//           {/* Tombol Extended Tabs */}
//           <TouchableOpacity
//             style={styles.seeAllButton}
//             onPress={() => navigation.navigate('ExtendedTabs')}
//           >
//             <Text style={styles.seeAllText}>Semua Kategori →</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>

//       {/* Products List */}
//       <FlatList
//         data={filteredProducts}
//         renderItem={renderProductItem}
//         keyExtractor={getProductKey}
//         contentContainerStyle={styles.list}
//         numColumns={numColumns}
//         key={`flatlist-${numColumns}`}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={onRefresh}
//             colors={['#2196F3']}
//             tintColor={'#2196F3'}
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Text style={styles.emptyText}>Belum ada produk dalam kategori "{selectedCategory}"</Text>
//             <Text style={styles.emptySubText}>Coba pilih kategori lain</Text>
//           </View>
//         }
//       />

//       {/* Add Product Floating Button */}
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => setAddModalVisible(true)}
//         activeOpacity={0.8}
//       >
//         <Text style={styles.addButtonText}>+</Text>
//       </TouchableOpacity>

//       {/* Modals */}
//       <Modal
//         visible={addModalVisible}
//         animationType="slide"
//         transparent={true}
//         onRequestClose={() => setAddModalVisible(false)}
//       >
//         <AddProductModal
//           onAdd={handleAddProduct}
//           onClose={() => setAddModalVisible(false)}
//           visible={addModalVisible}
//         />
//       </Modal>

//       {/* <ProductDetailModal
//         product={selectedProduct}
//         onClose={() => {
//           setDetailModalVisible(false);
//           setSelectedProduct(null);
//         }}
//         visible={detailModalVisible}
//         onDelete={handleDeleteProduct}
//       /> */}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     paddingHorizontal: 10,
//   },
//   menuButton: {
//     padding: 10,
//     marginRight: 10,
//   },
//   menuButtonText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   headerTitle: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   productCount: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
//   },
//   categoriesSection: {
//     marginBottom: 16,
//   },
//   categoriesTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 12,
//     marginLeft: 8,
//     color: '#333',
//   },
//   categoriesContainer: {
//     paddingHorizontal: 8,
//     paddingBottom: 8,
//   },
//   categoryChip: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#f0f0f0',
//     marginRight: 8,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   categoryChipActive: {
//     backgroundColor: '#2196F3',
//     borderColor: '#2196F3',
//   },
//   categoryChipText: {
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500',
//   },
//   categoryChipTextActive: {
//     color: '#fff',
//   },
//   categoryCount: {
//     fontSize: 12,
//     color: '#999',
//     marginLeft: 4,
//   },
//   seeAllButton: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     backgroundColor: '#4CAF50',
//     marginRight: 8,
//   },
//   seeAllText: {
//     fontSize: 14,
//     color: '#fff',
//     fontWeight: '500',
//   },
//   list: {
//     paddingHorizontal: 8,
//     paddingBottom: 100,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     margin: 6,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   image: {
//     width: '100%',
//     height: 160,
//     resizeMode: 'cover',
//   },
//   productInfo: {
//     padding: 12,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   price: {
//     fontSize: 16,
//     color: '#2196F3',
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   desc: {
//     fontSize: 12,
//     color: '#666',
//     lineHeight: 16,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 25,
//     right: 25,
//     backgroundColor: '#2196F3',
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 24,
//     lineHeight: 28,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingVertical: 100,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#666',
//     fontWeight: '600',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;

import * as React from 'react';
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
import DeepLinkService from '../services/deepLinkService';
import { RootStackParamList } from '../types';

// Define navigation prop type
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

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
  // Use typed navigation hook
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();

  const navigateToProduct = (productId: number) => {
    console.log('Navigating to product:', productId);
    navigation.navigate('Product', { id: productId });
  };

  const navigateToCart = () => {
    navigation.navigate('Cart');
  };

  const navigateToProfile = (userId: string) => {
    navigation.navigate('Profile', { userId });
  };

  const testDeepLinks = () => {
    const testLinks = [
      { url: 'ecommerceapp://produk/123', description: 'Product 123' },
      { url: 'ecommerceapp://keranjang', description: 'Cart' },
      { url: 'ecommerceapp://profil/testuser', description: 'Profile Test' },
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

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
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
      <TouchableOpacity 
        style={styles.viewButton}
        onPress={() => navigateToProduct(item.id)}
      >
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to E-Commerce!</Text>
        <Text style={styles.subtitle}>Hello, {user?.name}!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
        <Text style={styles.sectionText}>
          Tap on any product to view details via navigation
        </Text>
      </View>

      <FlatList
        data={mockProducts}
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

      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>Debug Info:</Text>
        <Text style={styles.debugText}>• ProductScreen is in Root Stack</Text>
        <Text style={styles.debugText}>• Navigation: navigation.navigate('Product', {'{'} id: 123 {'}'})</Text>
        <Text style={styles.debugText}>• Deep Link: ecommerceapp://produk/123</Text>
        <Text style={styles.debugText}>• User ID: {user?.id}</Text>
      </View>

      <View style={styles.navigationTest}>
        <Text style={styles.sectionTitle}>Navigation Test</Text>
        <View style={styles.testButtons}>
          <TouchableOpacity
            style={styles.smallTestButton}
            onPress={() => navigateToProduct(999)}
          >
            <Text style={styles.smallTestButtonText}>Test Product 999</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallTestButton}
            onPress={navigateToCart}
          >
            <Text style={styles.smallTestButtonText}>Test Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallTestButton}
            onPress={() => navigateToProfile('test-user-123')}
          >
            <Text style={styles.smallTestButtonText}>Test Profile</Text>
          </TouchableOpacity>
        </View>
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
  debugSection: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    margin: 20,
    borderRadius: 8,
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  debugText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    fontFamily: 'monospace',
  },
  navigationTest: {
    padding: 20,
    backgroundColor: '#f0f8ff',
    margin: 20,
    borderRadius: 8,
  },
  testButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  smallTestButton: {
    backgroundColor: '#5856D6',
    padding: 10,
    borderRadius: 6,
    margin: 5,
    flex: 1,
    minWidth: 100,
    alignItems: 'center',
  },
  smallTestButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default HomeScreen;