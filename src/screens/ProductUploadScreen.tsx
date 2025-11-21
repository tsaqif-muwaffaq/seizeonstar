import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  ImagePickerModal  from '../components/ImagePickerModal';
import ImagePreview from '../components/ImagePreview';
import LoadingIndicator from '../components/LoadingIndicator';
import  useImagePicker  from '../hooks/useImagePicker';
import { ImageService } from '../services/imageService';
import { ImageAsset } from '../types';

const ProductUploadScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showImagePicker, setShowImagePicker] = useState(false);
  
  const {
    selectedImages,
    uploading,
    error,
    clearImages,
    removeImage,
    setSelectedImages,
  } = useImagePicker();

  const handleImagesSelected = async (assets: ImageAsset[]) => {
    try {
      // Simpan ke AsyncStorage sesuai soal evaluasi
      await ImageService.saveProductImagesToStorage(assets);
      
      // Update state dengan assets yang dipilih
      setSelectedImages(assets);
      
      Alert.alert(
        'Sukses', 
        `${assets.length} gambar berhasil dipilih dan disimpan`,
        [{ text: 'OK' }]
      );
    } catch (err) {
      Alert.alert('Error', 'Gagal menyimpan gambar');
    }
  };

  const handleUpload = async () => {
    if (selectedImages.length === 0) {
      Alert.alert('Peringatan', 'Pilih gambar terlebih dahulu');
      return;
    }

    try {
      // Simulasi upload ke server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert('Sukses', 'Gambar berhasil diupload');
      clearImages();
    } catch (err) {
      Alert.alert('Error', 'Upload gagal');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upload Foto Produk</Text>
      <Text style={styles.subtitle}>
        Pilih maksimal 5 foto produk (600x600px)
      </Text>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ImagePreview
        images={selectedImages}
        onRemoveImage={removeImage}
        editable={true}
        maxPreview={5}
      />

      <TouchableOpacity
        style={[
          styles.addButton,
          selectedImages.length >= 5 && styles.addButtonDisabled
        ]}
        onPress={() => setShowImagePicker(true)}
        disabled={selectedImages.length >= 5}
      >
        <Text style={styles.addButtonText}>
          {selectedImages.length >= 5 ? 'Maksimal 5 Gambar' : 'Tambah Gambar'}
        </Text>
      </TouchableOpacity>

      {selectedImages.length > 0 && (
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.actionButton, styles.uploadButton]}
            onPress={handleUpload}
            disabled={uploading}
          >
            <Text style={styles.uploadButtonText}>
              {uploading ? 'Mengupload...' : `Upload (${selectedImages.length})`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.clearButton]}
            onPress={clearImages}
            disabled={uploading}
          >
            <Text style={styles.clearButtonText}>Hapus Semua</Text>
          </TouchableOpacity>
        </View>
      )}

      <ImagePickerModal
        visible={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        onImagesSelected={handleImagesSelected}
        selectionLimit={5 - selectedImages.length}
        maxWidth={600}
        maxHeight={600}
      />

      <LoadingIndicator visible={uploading} text="Mengupload gambar..." />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  errorContainer: {
    backgroundColor: '#FFE6E6',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 16,
  },
  addButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#34C759',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductUploadScreen;