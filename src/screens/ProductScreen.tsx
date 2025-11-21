import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

type ProductScreenRouteProp = RouteProp<{ Product: { productId: string } }, 'Product'>;

const ProductScreen: React.FC = () => {
  const route = useRoute<ProductScreenRouteProp>();
  const { productId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/300' }}
        style={styles.productImage}
      />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Produk {productId}</Text>
        <Text style={styles.productPrice}>Rp 1.299.000</Text>
        <Text style={styles.productDescription}>
          Deskripsi produk yang menarik dan informatif. Produk ini memiliki kualitas terbaik dengan bahan premium.
        </Text>
        
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Tambah ke Keranjang</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  productImage: {
    width: '100%',
    height: 300,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 24,
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductScreen;