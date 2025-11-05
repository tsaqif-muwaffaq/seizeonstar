import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Product } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  if (!product) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <Image source={{ uri: product.imageUrl }} style={styles.image} />
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
          {product.description ? <Text style={styles.description}>{product.description}</Text> : null}

          <TouchableOpacity
            style={[globalStyles.button, globalStyles.buttonPrimary, styles.closeButton]}
            onPress={onClose}
          >
            <Text style={globalStyles.buttonText}>Tutup</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#2196F3',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  closeButton: {
    marginTop: 10,
  },
});
