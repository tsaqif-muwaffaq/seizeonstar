// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// import { Product } from '../types/Product';
// import { globalStyles } from '../styles/globalStyles';

// interface ProductDetailModalProps {
//   product: Product | null;
//   onClose: () => void;
// }

// export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
//   if (!product) {
//     return null;
//   }

//   return (
//     <View style={styles.overlay}>
//       <View style={styles.modalContainer}>
//         <ScrollView>
//           <Image source={{ uri: product.imageUrl }} style={styles.image} />
//           <Text style={styles.name}>{product.name}</Text>
//           <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
//           {product.description ? <Text style={styles.description}>{product.description}</Text> : null}

//           <TouchableOpacity
//             style={[globalStyles.button, globalStyles.buttonPrimary, styles.closeButton]}
//             onPress={onClose}
//           >
//             <Text style={globalStyles.buttonText}>Tutup</Text>
//           </TouchableOpacity>
//         </ScrollView>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.4)',
//   },
//   modalContainer: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     maxHeight: '80%',
//   },
//   image: {
//     width: '100%',
//     height: 250,
//     borderRadius: 10,
//     marginBottom: 15,
//     resizeMode: 'cover',
//   },
//   name: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   price: {
//     fontSize: 20,
//     color: '#2196F3',
//     marginBottom: 12,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 20,
//   },
//   closeButton: {
//     marginTop: 10,
//   },
// });

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
import { Product } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  visible: boolean;
  onDelete?: (productId: string) => void; // Tambahkan ini
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
    // Mencegah event bubbling ke overlay
    event.stopPropagation();
  };

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
                  source={{ uri: product.imageUrl }} 
                  style={styles.image} 
                 
                />
                
                {/* Product Name */}
                <Text style={styles.name}>{product.name}</Text>
                
                {/* Product Price */}
                <Text style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</Text>
                
                {/* Product Description */}
                {product.description ? (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionLabel}>Deskripsi:</Text>
                    <Text style={styles.description}>{product.description}</Text>
                  </View>
                ) : null}

                {/* Product ID (optional) */}
                <Text style={styles.productId}>ID: {product.id}</Text>

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