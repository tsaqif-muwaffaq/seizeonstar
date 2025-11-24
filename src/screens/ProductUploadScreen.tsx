import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { useImagePicker } from '../hooks/useImagePicker';
import { imageService } from '../services/imageService';

export const ProductUploadScreen: React.FC = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [savedImageId, setSavedImageId] = useState<string | null>(null);

  const { takePhoto, pickImage, saveImageToStorage, isLoading } = useImagePicker();

  const handleTakePhoto = async () => {
    const result = await takePhoto({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
    });

    if (result) {
      setSelectedImage(result.uri);
      // Save to storage
      const imageId = await saveImageToStorage(result);
      setSavedImageId(imageId);
    }
  };

  const handlePickImage = async () => {
    const result = await pickImage({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
    });

    if (result) {
      setSelectedImage(result.uri);
      // Save to storage
      const imageId = await saveImageToStorage(result);
      setSavedImageId(imageId);
    }
  };

  const handleUploadProduct = async () => {
    if (!productName || !productPrice || !selectedImage) {
      Alert.alert('Error', 'Harap isi semua field dan pilih gambar');
      return;
    }

    // Simpan data produk
    const productData = {
      id: Date.now().toString(),
      name: productName,
      price: parseFloat(productPrice),
      description: productDescription,
      imageId: savedImageId,
      timestamp: Date.now(),
    };

    // Simpan produk (dalam implementasi nyata, ini akan ke API)
    Alert.alert('Sukses', 'Produk berhasil diupload!');
    
    // Reset form
    setProductName('');
    setProductPrice('');
    setProductDescription('');
    setSelectedImage(null);
    setSavedImageId(null);
  };

  const handleClearImage = () => {
    setSelectedImage(null);
    setSavedImageId(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Upload Produk</Text>

        {/* Product Form */}
        <TextInput
          style={styles.input}
          placeholder="Nama Produk"
          value={productName}
          onChangeText={setProductName}
          placeholderTextColor="#999"
        />

        <TextInput
          style={styles.input}
          placeholder="Harga Produk"
          value={productPrice}
          onChangeText={setProductPrice}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Deskripsi Produk"
          value={productDescription}
          onChangeText={setProductDescription}
          multiline
          numberOfLines={4}
          placeholderTextColor="#999"
        />

        {/* Image Selection */}
        <View style={styles.imageSection}>
          <Text style={styles.sectionTitle}>Gambar Produk</Text>
          
          {selectedImage ? (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={handleClearImage}
              >
                <Text style={styles.removeImageText}>Hapus Gambar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.imageButtonsContainer}>
              <TouchableOpacity 
                style={styles.imageButton}
                onPress={handleTakePhoto}
                disabled={isLoading}
              >
                <Text style={styles.imageButtonText}>
                  {isLoading ? 'Loading...' : 'Ambil Foto'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.imageButton, styles.pickImageButton]}
                onPress={handlePickImage}
                disabled={isLoading}
              >
                <Text style={styles.imageButtonText}>
                  {isLoading ? 'Loading...' : 'Pilih dari Galeri'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Upload Button */}
        <TouchableOpacity 
          style={[
            styles.uploadButton, 
            (!productName || !productPrice || !selectedImage) && styles.buttonDisabled
          ]}
          onPress={handleUploadProduct}
          disabled={!productName || !productPrice || !selectedImage || isLoading}
        >
          <Text style={styles.uploadButtonText}>
            {isLoading ? 'Mengupload...' : 'Upload Produk'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  imageButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pickImageButton: {
    backgroundColor: '#34C759',
  },
  imageButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    alignItems: 'center',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  removeImageButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 6,
  },
  removeImageText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});