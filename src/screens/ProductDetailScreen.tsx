import * as React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity,
  Alert 
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { Product } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

type RootStackParamList = {
  ProductDetail: { product: Product };
};

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<ProductDetailRouteProp>();
  const { product } = route.params;

  // Soal Praktik 3: Reset Stack dan Tutup Drawer
  const handleResetStackAndCloseDrawer = () => {
    // Reset stack ke root
    navigation.dispatch(StackActions.popToTop());
    
    // Untuk menutup drawer, kita bisa navigate ke screen yang sama dengan Drawer
    // atau menggunakan approach yang lebih sederhana
    Alert.alert('Sukses', 'Stack telah direset ke halaman utama');
  };

  // Soal Praktik 4: Kembali ke Drawer Home
  const handleBackToDrawerHome = () => {
    // Navigate ke Home screen yang ada di Drawer
    navigation.navigate('Home' as never);
  };

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      
      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
        
        {product.description && (
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Deskripsi</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>
        )}

        <View style={styles.productInfo}>
          <Text style={styles.sectionTitle}>Informasi Produk</Text>
          <Text style={styles.infoText}>ID: {product.id}</Text>
          <Text style={styles.infoText}>Kategori: Fashion</Text>
          <Text style={styles.infoText}>Stok: Tersedia</Text>
        </View>

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
    height: 300,
  },
  content: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
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
    fontSize: 16,
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
  resetButton: {
    backgroundColor: '#FF9800',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#4CAF50',
    marginBottom: 10,
  },
});