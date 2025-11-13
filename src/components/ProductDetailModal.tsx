import * as React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Modal,
  TouchableWithoutFeedback 
} from 'react-native';
import { Product, AnyProduct, getProductId, getProductName, getProductImageUrl, getProductDescription, getProductPrice } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

interface ProductDetailModalProps {
  product: AnyProduct | null;
  onClose: () => void;
  visible: boolean;
  onDelete?: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  product, 
  onClose, 
  visible 
}) => {
  if (!product || !visible) {
    return null;
  }

  const handleOverlayPress = () => {
    onClose();
  };

  const handleModalPress = (event: any) => {
    event.stopPropagation();
  };

  // Gunakan helper functions untuk kompatibilitas
  const productId = getProductId(product);
  const productName = getProductName(product);
  const productImageUrl = getProductImageUrl(product);
  const productDescription = getProductDescription(product);
  const productPrice = getProductPrice(product);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <View style={styles.modalContainer}>
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                {/* Product Image */}
                <Image 
                  source={{ uri: productImageUrl }} 
                  style={styles.image} 
                />
                
                {/* Product Name */}
                <Text style={styles.name}>{productName}</Text>
                
                {/* Product Price */}
                <Text style={styles.price}>Rp {productPrice.toLocaleString('id-ID')}</Text>
                
                {/* Product Description */}
                {productDescription ? (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Deskripsi:</Text>
                    <Text style={styles.description}>{productDescription}</Text>
                  </View>
                ) : null}

                {/* Product ID */}
                <Text style={styles.productId}>ID: {productId}</Text>

                {/* Close Button */}
                <TouchableOpacity
                  style={[globalStyles.button, globalStyles.buttonPrimary, styles.closeButton]}
                  onPress={onClose}
                  activeOpacity={0.7}
                >
                  <Text style={globalStyles.buttonText}>Tutup</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollContent: {
    flexGrow: 1,
  },
  image: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 22,
    color: '#2196F3',
    marginBottom: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  descriptionContainer: {
    marginBottom: 20,
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  productId: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  closeButton: {
    marginTop: 10,
    marginHorizontal: 10,
  },
});

export default ProductDetailModal;