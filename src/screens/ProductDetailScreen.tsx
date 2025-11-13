import * as React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Alert,
  useWindowDimensions 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { LegacyProduct, getProductName, getProductImageUrl, getProductPrice, getProductDescription } from '../types/Product';
import { RootStackParamList } from '../types/NavigationTypes';
import { globalStyles } from '../styles/globalStyles';

type ProductDetailScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<ProductDetailScreenRouteProp>();
  const { product } = route.params;
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  // Gunakan helper functions
  const productName = getProductName(product);
  const productImageUrl = getProductImageUrl(product);
  const productPrice = getProductPrice(product);
  const productDescription = getProductDescription(product);

  // Soal Praktik 3: Reset Stack dan Tutup Drawer
  const handleResetStackAndCloseDrawer = () => {
    // Reset stack ke root
    navigation.dispatch(StackActions.popToTop());
    Alert.alert('Sukses', 'Stack telah direset ke halaman utama');
  };

  // Soal Praktik 4: Kembali ke Drawer Home
  const handleBackToDrawerHome = () => {
    // Navigate ke Home screen yang ada di Drawer
    navigation.navigate('Home');
  };

  // Soal: Implementasi Modal untuk Checkout
  const handleCheckout = () => {
    navigation.navigate('Checkout', { product });
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: productImageUrl }} 
        style={[styles.image, { height: isLandscape ? 200 : 300 }]}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={[styles.name, { fontSize: isLandscape ? 20 : 24 }]}>{productName}</Text>
        <Text style={[styles.price, { fontSize: isLandscape ? 18 : 20 }]}>
          Rp {productPrice.toLocaleString('id-ID')}
        </Text>
        
        {productDescription && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={[styles.description, { fontSize: isLandscape ? 14 : 16 }]}>
              {productDescription}
            </Text>
          </View>
        )}

        <View style={styles.productInfo}>
          <Text style={styles.sectionTitle}>Informasi Produk</Text>
          <Text style={styles.infoText}>ID: {product.id}</Text>
          <Text style={styles.infoText}>Kategori: Fashion</Text>
          <Text style={styles.infoText}>Stok: Tersedia</Text>
        </View>

        {/* Tombol Checkout */}
        <TouchableOpacity
          style={[globalStyles.button, styles.checkoutButton]}
          onPress={handleCheckout}
        >
          <Text style={globalStyles.buttonText}>🛒 Checkout Sekarang</Text>
        </TouchableOpacity>

        {/* Soal Praktik 3: Tombol Reset Stack */}
        <TouchableOpacity
          style={[globalStyles.button, styles.resetButton]}
          onPress={handleResetStackAndCloseDrawer}
        >
          <Text style={globalStyles.buttonText}>Reset Stack</Text>
        </TouchableOpacity>

        {/* Soal Praktik 4: Tombol Kembali ke Drawer Home */}
        <TouchableOpacity
          style={[globalStyles.button, styles.backButton]}
          onPress={handleBackToDrawerHome}
        >
          <Text style={globalStyles.buttonText}>Kembali ke Home</Text>
        </TouchableOpacity>

        {/* Tombol kembali normal */}
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.buttonPrimary]}
          onPress={() => navigation.goBack()}
        >
          <Text style={globalStyles.buttonText}>Kembali ke Produk</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
  },
  content: {
    padding: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 20,
  },
  descriptionSection: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    color: '#666',
    lineHeight: 22,
  },
  productInfo: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
  resetButton: {
    backgroundColor: '#FF9800',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#2196F3',
    marginBottom: 10,
  },
});