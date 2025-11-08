import * as React from 'react';
import { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView, // TAMBAHKAN INI
  Platform // TAMBAHKAN INI
} from 'react-native';
import { Product } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

interface AddProductModalProps {
  onAdd: (product: Product) => void;
  onClose: () => void;
  visible: boolean;
}

export const AddProductModal: React.FC<AddProductModalProps> = ({ onAdd, onClose, visible }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const validateImageUrl = (url: string) => {
    const pattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/i;
    return pattern.test(url);
  };

  const handleSubmit = () => {
    if (!name.trim() || !price.trim() || !imageUrl.trim()) {
      Alert.alert('Error', 'Nama, harga, dan URL gambar wajib diisi!');
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Harga harus berupa angka yang valid!');
      return;
    }

    if (!validateImageUrl(imageUrl)) {
      Alert.alert('Error', 'URL gambar tidak valid. Harus diawali http/https dan berekstensi .jpg/.png/.jpeg/.gif/.webp');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      name: name.trim(),
      price: priceValue,
      imageUrl: imageUrl.trim(),
      description: description.trim(),
    };

    onAdd(newProduct);
    Alert.alert('Sukses', 'Produk berhasil ditambahkan!');
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setImageUrl('');
    setDescription('');
  };

  const handleOverlayPress = () => {
    onClose();
  };

  const handleModalPress = (event: any) => {
    event.stopPropagation();
  };

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={handleModalPress}>
            <KeyboardAvoidingView 
              style={styles.modalContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
              <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
              >
                <Text style={styles.title}>Tambah Produk</Text>

                <TextInput
                  placeholder="Nama Produk"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoFocus={true} // TAMBAHKAN INI
                  returnKeyType="next"
                />

                <TextInput
                  placeholder="Harga (contoh: 100000)"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  returnKeyType="next"
                />

                <TextInput
                  placeholder="URL Gambar (https://...)"
                  placeholderTextColor="#888"
                  style={styles.input}
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="next"
                />

                <TextInput
                  placeholder="Deskripsi (opsional)"
                  placeholderTextColor="#888"
                  style={[styles.input, styles.textArea]}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  returnKeyType="done"
                />

                <View style={styles.buttonContainer}>
                  <TouchableOpacity 
                    style={[styles.button, styles.submitButton]} 
                    onPress={handleSubmit}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>Tambah Produk</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={[styles.button, styles.cancelButton]} 
                    onPress={onClose}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonText}>Batal</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
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
    maxHeight: '80%',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 20,
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: '#2196F3',
  },
  cancelButton: {
    backgroundColor: '#E53935',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddProductModal;