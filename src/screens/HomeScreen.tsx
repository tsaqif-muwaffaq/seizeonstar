// import * as React from 'react';
// import { useState } from 'react';
// import { View, FlatList, Text, StyleSheet, Modal, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
// import { Product } from '../types/Product';
// import { initialProducts } from '../data/products';
// import { AddProductModal } from '../components/AddProductModal';
// import { ProductDetailModal } from '../components/ProductDetailModal';
// import { globalStyles } from '../styles/globalStyles';

// export const HomeScreen: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
//   const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const {width, height} = useWindowDimensions()

//   const handleAddProduct = (newProduct: Product) => {
//     setProducts(prev => [...prev, newProduct]);
//     setAddModalVisible(false);
//   };

//   const handleProductPress = (product: Product) => {
//     setSelectedProduct(product);
//     setDetailModalVisible(true);
//   };

//   const isLandscape = width > height;
//   const numColumns = isLandscape ? 3 : 1;

//   const renderItem = ({ item }: { item: Product }) => (
//     <TouchableOpacity 
//       onPress={() => handleProductPress(item)} 
//       style={[styles.card, isLandscape ? { width: `${100 / numColumns - 2}%` } : {}]}>
//         <Image source={{ uri: item.imageUrl }} style={styles.image} />
//         <Text style={styles.name}>{item.name}</Text>
//         <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
//         {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={globalStyles.container}>
//       <Text style={globalStyles.title}>seizeonstar.catalog</Text>

//       <FlatList
//         data={products}
//         renderItem={renderItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.list}
//         numColumns={numColumns}
//         key={numColumns}
//       />

//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => setAddModalVisible(true)}
//       >
//         <Text style={styles.addButtonText}>+ Tambah Produk</Text>
//       </TouchableOpacity>

//       <Modal
//         visible={addModalVisible}
//         animationType="slide"
//         transparent
//         onRequestClose={() => setAddModalVisible(false)}
//       >
//         <AddProductModal
//           onAdd={handleAddProduct}
//           onClose={() => setAddModalVisible(false)}
//         />
//       </Modal>

//       <Modal
//         visible={detailModalVisible}
//         animationType="fade"
//         transparent
//         onRequestClose={() => setDetailModalVisible(false)}
//       >
//         <ProductDetailModal
//           product={selectedProduct}
//           onClose={() => setDetailModalVisible(false)}
//         />
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     paddingHorizontal: 5,
//     paddingBottom: 100,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 10,
//     marginVertical: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//     marginHorizontal: 5,
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//     resizeMode: 'cover',
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   price: {
//     fontSize: 16,
//     color: '#2196F3',
//     marginTop: 4,
//   },
//   desc: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 4,
//   },
//   addButton: {
//     position: 'absolute',
//     bottom: 20,
//     right: 20,
//     backgroundColor: '#2196F3',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 30,
//     elevation: 4,
//   },
//   addButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// bates awal 

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
//   Modal // TAMBAHKAN INI
// } from 'react-native';
// import { Product } from '../types/Product';
// import { initialProducts } from '../data/products';
// import { AddProductModal } from '../components/AddProductModal';
// import { ProductDetailModal } from '../components/ProductDetailModal';
// import { globalStyles } from '../styles/globalStyles';

// export const HomeScreen: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
//   const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const { width, height } = useWindowDimensions();

//   const handleAddProduct = useCallback((newProduct: Product) => {
//     setProducts(prev => [newProduct, ...prev]); // Produk baru ditambahkan di atas
//     setAddModalVisible(false);
//   }, []);

//   const handleProductPress = useCallback((product: Product) => {
//     setSelectedProduct(product);
//     setDetailModalVisible(true);
//   }, []);

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
//             setProducts(prev => prev.filter(product => product.id !== productId));
//             if (selectedProduct?.id === productId) {
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
//     // Simulate refresh data
//     setTimeout(() => {
//       setProducts(initialProducts);
//       setRefreshing(false);
//     }, 1000);
//   }, []);

//   const isLandscape = width > height;
//   const numColumns = isLandscape ? 3 : 2;

//   const renderProductItem = useCallback(({ item }: { item: Product }) => (
//     <TouchableOpacity 
//       onPress={() => handleProductPress(item)} 
//       style={[
//         styles.card, 
//         isLandscape ? { width: `${100 / numColumns - 2}%` } : { width: `${100 / numColumns - 4}%` }
//       ]}
//       activeOpacity={0.7}
//     >
//       <Image 
//         source={{ uri: item.imageUrl }} 
//         style={styles.image} 
//       />

//       <View style={styles.productInfo}>
//         <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
//         <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
//         {item.description ? (
//           <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
//         ) : null}
//       </View>
//     </TouchableOpacity>
//   ), [isLandscape, numColumns, handleProductPress]);

//   const getProductKey = useCallback((item: Product) => item.id, []);

//   return (
//     <View style={globalStyles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={globalStyles.title}>seizeonstar.catalog</Text>
//         <Text style={styles.productCount}>{products.length} produk</Text>
//       </View>

//       {/* Products List */}
//       <FlatList
//         data={products}
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
//             <Text style={styles.emptyText}>Belum ada produk</Text>
//             <Text style={styles.emptySubText}>Tambahkan produk pertama Anda</Text>
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

//       {/* Add Product Modal - HAPUS KOMENTARNYA */}
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

//       {/* Product Detail Modal - HAPUS KOMENTARNYA */}
//       <ProductDetailModal
//         product={selectedProduct}
//         onClose={() => {
//           setDetailModalVisible(false);
//           setSelectedProduct(null);
//         }}
//         visible={detailModalVisible}
//         onDelete={handleDeleteProduct}
//       />
//     </View>
//   );
// };

// // ... styles tetap sama
// const styles = StyleSheet.create({
//   header: {
//     alignItems: 'center',
//     marginBottom: 16,
//     paddingHorizontal: 10,
//   },
//   productCount: {
//     fontSize: 14,
//     color: '#666',
//     marginTop: 4,
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
//   },
//   emptySubText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//   },
// });

// export default HomeScreen;

// bates akhir

import * as React from 'react';
import { useState, useCallback } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  useWindowDimensions,
  Alert,
  RefreshControl,
  StatusBar,
  Modal
} from 'react-native';
import { Product } from '../types/Product';
import { initialProducts } from '../data/products';
import { AddProductModal } from '../components/AddProductModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { globalStyles } from '../styles/globalStyles';

export const HomeScreen: React.FC = ({ navigation }: any) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { width, height } = useWindowDimensions();

  const handleAddProduct = useCallback((newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    setAddModalVisible(false);
  }, []);

  const handleProductPress = useCallback((product: Product) => {
    setSelectedProduct(product);
    setDetailModalVisible(true);
  }, []);

  const handleDeleteProduct = useCallback((productId: string) => {
    Alert.alert(
      'Hapus Produk',
      'Apakah Anda yakin ingin menghapus produk ini?',
      [
        {
          text: 'Batal',
          style: 'cancel',
        },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setProducts(prev => prev.filter(product => product.id !== productId));
            if (selectedProduct?.id === productId) {
              setDetailModalVisible(false);
              setSelectedProduct(null);
            }
          },
        },
      ]
    );
  }, [selectedProduct]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setProducts(initialProducts);
      setRefreshing(false);
    }, 1000);
  }, []);

  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;

  const renderProductItem = useCallback(({ item }: { item: Product }) => (
    <TouchableOpacity 
      onPress={() => handleProductPress(item)} 
      style={[
        styles.card, 
        isLandscape ? { width: `${100 / numColumns - 2}%` } : { width: `${100 / numColumns - 4}%` }
      ]}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.image} 
      />

      <View style={styles.productInfo}>
        <Text style={styles.name} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
        {item.description ? (
          <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  ), [isLandscape, numColumns, handleProductPress]);

  const getProductKey = useCallback((item: Product) => item.id, []);

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      
      {/* Header dengan tombol menu - STYLE BARU DITAMBAHKAN DI SINI */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={globalStyles.title}>seizeonstar.catalog</Text>
          <Text style={styles.productCount}>{products.length} produk</Text>
        </View>
      </View>

      {/* Products List */}
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={getProductKey}
        contentContainerStyle={styles.list}
        numColumns={numColumns}
        key={`flatlist-${numColumns}`}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2196F3']}
            tintColor={'#2196F3'}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada produk</Text>
            <Text style={styles.emptySubText}>Tambahkan produk pertama Anda</Text>
          </View>
        }
      />

      {/* Add Product Floating Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modals */}
      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAddModalVisible(false)}
      >
        <AddProductModal
          onAdd={handleAddProduct}
          onClose={() => setAddModalVisible(false)}
          visible={addModalVisible}
        />
      </Modal>

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => {
          setDetailModalVisible(false);
          setSelectedProduct(null);
        }}
        visible={detailModalVisible}
        onDelete={handleDeleteProduct}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  // STYLE BARU UNTUK HEADER DENGAN TOMBOL MENU
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  menuButton: {
    padding: 10,
    marginRight: 10,
  },
  menuButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  
  // STYLE YANG SUDAH ADA SEBELUMNYA
  list: {
    paddingHorizontal: 8,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
  },
  productInfo: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 4,
  },
  desc: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#2196F3',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 28,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default HomeScreen;