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
  Modal,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types/Product';
import { initialProducts } from '../data/products';
import { AddProductModal } from '../components/AddProductModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { globalStyles } from '../styles/globalStyles';
import { ExtendedHomeTabs } from '../components/ExtendedHomeTabs';

// Data produk untuk semua kategori
const productCategories: { [key: string]: Product[] } = {
  'Semua': initialProducts,
  'Populer': initialProducts.slice(0, 3),
  'Terbaru': initialProducts.slice(3, 6),
  'Chambre de Lavain': initialProducts
};

interface HomeScreenProps {
  navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const { width, height } = useWindowDimensions();

  const handleAddProduct = useCallback((newProduct: Product) => {
    setProducts(prev => [newProduct, ...prev]);
    productCategories['Semua'] = [newProduct, ...productCategories['Semua']];
    setAddModalVisible(false);
  }, []);

  // Soal Praktik 2: Navigasi ke Stack Detail
 // Di dalam HomeScreen, perbarui function handleProductPress:
const handleProductPress = useCallback((product: Product) => {
  navigation.navigate('ProductDetail' as never, { product } as never);
}, [navigation]);

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
            productCategories['Semua'] = productCategories['Semua'].filter(product => product.id !== productId);
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
      productCategories['Semua'] = initialProducts;
      setRefreshing(false);
    }, 1000);
  }, []);

  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 2;

  const filteredProducts = productCategories[selectedCategory] || products;

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

  const renderCategoryChip = useCallback((category: string) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryChip,
        selectedCategory === category && styles.categoryChipActive
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text style={[
        styles.categoryChipText,
        selectedCategory === category && styles.categoryChipTextActive
      ]}>
        {category}
      </Text>
      <Text style={styles.categoryCount}>
        ({productCategories[category]?.length || 0})
      </Text>
    </TouchableOpacity>
  ), [selectedCategory]);

  return (
    <View style={globalStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      
      {/* Header dengan tombol menu */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          <Text style={styles.menuButtonText}>☰</Text>
        </TouchableOpacity>
        <View style={styles.headerTitle}>
          <Text style={globalStyles.title}>seizeonstar.catalog</Text>
          <Text style={styles.productCount}>
            {filteredProducts.length} produk di {selectedCategory}
          </Text>
        </View>
      </View>

      {/* Kategori Section */}
      <View style={styles.categoriesSection}>
        <Text style={styles.categoriesTitle}>Kategori Produk</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {Object.keys(productCategories).map(renderCategoryChip)}
          
          {/* Tombol Extended Tabs */}
          <TouchableOpacity
            style={styles.seeAllButton}
            onPress={() => navigation.navigate('ExtendedTabs')}
          >
            <Text style={styles.seeAllText}>Semua Kategori →</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Products List */}
      <FlatList
        data={filteredProducts}
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
            <Text style={styles.emptyText}>Belum ada produk dalam kategori "{selectedCategory}"</Text>
            <Text style={styles.emptySubText}>Coba pilih kategori lain</Text>
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
  categoriesSection: {
    marginBottom: 16,
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    marginLeft: 8,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#2196F3',
    borderColor: '#2196F3',
  },
  categoryChipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryChipTextActive: {
    color: '#fff',
  },
  categoryCount: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    marginRight: 8,
  },
  seeAllText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
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
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default HomeScreen;