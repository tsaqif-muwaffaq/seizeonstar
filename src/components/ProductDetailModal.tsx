import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Modal } from 'react-native';
// Asumsikan Product sudah didefinisikan di '../types/Product'
import { Product } from '../types/Product'; 
// Asumsikan globalStyles sudah didefinisikan di '../styles/globalStyles'
import { globalStyles } from '../styles/globalStyles'; 

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  visible: boolean;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  onClose, 
  visible 
}) => {
  if (!product) {
    return null;
  }

  return (
    <Modal
      animationType="fade" // Menggunakan animasi fade lebih elegan
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Image 
              source={{ uri: product.imageUrl }} 
              style={styles.image} 
              defaultSource={{ uri: 'https://via.placeholder.com/300x300?text=Produk' }}
            />
            
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.productId}>ID Produk: **{product.id}**</Text>
            <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>

            {product.description ? (
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionLabel}>Deskripsi Produk:</Text>
                <Text style={styles.description}>{product.description}</Text>
              </View>
            ) : (
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>Tidak ada deskripsi tersedia untuk produk ini.</Text>
              </View>
            )}

            <TouchableOpacity
              // Menggunakan globalStyles.buttonPrimary dan styles.closeButton
              style={[globalStyles.button, globalStyles.buttonPrimary, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={globalStyles.buttonText}>Tutup Detail</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // Mengubah opacity menjadi sedikit lebih gelap
    backgroundColor: 'rgba(0,0,0,0.6)', 
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 450, // Sedikit diperbesar
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24, // Padding lebih besar
    maxHeight: '90%', // Batasan tinggi yang lebih fleksibel
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4, // Shadow lebih dalam
    },
    shadowOpacity: 0.2, // Sedikit lebih transparan
    shadowRadius: 10, // Shadow lebih blur
    elevation: 8,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 250, // Tinggi gambar sedikit disesuaikan
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
    backgroundColor: '#f0f0f0', // Warna background saat loading
  },
  name: {
    fontSize: 26, // Ukuran font lebih besar
    fontWeight: '700', // Lebih tebal
    marginBottom: 6,
    color: '#1a1a1a', // Warna teks lebih gelap
    textAlign: 'left', // Mengubah rata kiri
  },
  price: {
    fontSize: 24, // Ukuran font lebih besar
    color: '#007AFF', // Warna biru iOS yang profesional
    marginBottom: 20,
    fontWeight: '700', // Lebih tebal
    textAlign: 'left', // Mengubah rata kiri
  },
  descriptionContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f7f7f7', // Background deskripsi lebih terang
    borderRadius: 10, // Sudut sedikit melengkung
    borderLeftWidth: 4, // Tambahkan garis kiri
    borderLeftColor: '#007AFF',
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24, // Line height lebih nyaman dibaca
  },
  productId: {
    fontSize: 14,
    color: '#999',
    textAlign: 'left',
    marginBottom: 8, // Sedikit dirapatkan
    fontStyle: 'normal', // Menghapus italic
  },
  closeButton: {
    marginTop: 20, // Jarak lebih besar dari deskripsi
    marginHorizontal: 0, // Hapus margin horizontal
    backgroundColor: '#007AFF', // Ubah warna tombol
  },
});

export default ProductDetailModal;