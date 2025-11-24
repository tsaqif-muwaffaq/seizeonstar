import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  Image
} from 'react-native';
import { useImagePicker } from '../hooks/useImagePicker';
import { imageService } from '../services/imageService';

export const ProfileImageScreen: React.FC = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [savedImageId, setSavedImageId] = useState<string | null>(null);
  const [savedImages, setSavedImages] = useState<any[]>([]);

  const { takePhoto, pickImage, saveImageToStorage, isLoading } = useImagePicker();

  useEffect(() => {
    loadSavedImages();
  }, []);

  const loadSavedImages = async () => {
    try {
      const images = await imageService.getImages();
      setSavedImages(images);
      
      // Set the first image as profile image if available
      if (images.length > 0) {
        setProfileImage(images[0].uri);
        setSavedImageId(images[0].id);
      }
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  };

  const handleTakePhoto = async () => {
    const result = await takePhoto({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
    });

    if (result) {
      setProfileImage(result.uri);
      const imageId = await saveImageToStorage(result);
      setSavedImageId(imageId);
      await loadSavedImages(); // Reload saved images
    }
  };

  const handlePickImage = async () => {
    const result = await pickImage({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.8,
    });

    if (result) {
      setProfileImage(result.uri);
      const imageId = await saveImageToStorage(result);
      setSavedImageId(imageId);
      await loadSavedImages(); // Reload saved images
    }
  };

  const handleSelectSavedImage = (image: any) => {
    setProfileImage(image.uri);
    setSavedImageId(image.id);
  };

  const handleDeleteImage = async (imageId: string) => {
    Alert.alert(
      'Hapus Gambar',
      'Apakah Anda yakin ingin menghapus gambar ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: async () => {
            const success = await imageService.deleteImage(imageId);
            if (success) {
              if (savedImageId === imageId) {
                setProfileImage(null);
                setSavedImageId(null);
              }
              await loadSavedImages();
              Alert.alert('Sukses', 'Gambar berhasil dihapus');
            } else {
              Alert.alert('Error', 'Gagal menghapus gambar');
            }
          },
        },
      ]
    );
  };

  const handleClearAllImages = async () => {
    Alert.alert(
      'Hapus Semua Gambar',
      'Apakah Anda yakin ingin menghapus semua gambar?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus Semua',
          style: 'destructive',
          onPress: async () => {
            const success = await imageService.clearAllImages();
            if (success) {
              setProfileImage(null);
              setSavedImageId(null);
              setSavedImages([]);
              Alert.alert('Sukses', 'Semua gambar berhasil dihapus');
            } else {
              Alert.alert('Error', 'Gagal menghapus semua gambar');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Foto Profil</Text>

        {/* Current Profile Image */}
        <View style={styles.currentImageSection}>
          <Text style={styles.sectionTitle}>Foto Profil Saat Ini</Text>
          {profileImage ? (
            <View style={styles.currentImageContainer}>
              <Image source={{ uri: profileImage }} style={styles.currentImage} />
              <Text style={styles.imageInfo}>
                {savedImageId ? 'Tersimpan di storage' : 'Belum disimpan'}
              </Text>
            </View>
          ) : (
            <View style={styles.noImageContainer}>
              <Text style={styles.noImageText}>Belum ada foto profil</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleTakePhoto}
            disabled={isLoading}
          >
            <Text style={styles.actionButtonText}>
              {isLoading ? 'Loading...' : 'Ambil Foto Baru'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.pickButton]}
            onPress={handlePickImage}
            disabled={isLoading}
          >
            <Text style={styles.actionButtonText}>
              {isLoading ? 'Loading...' : 'Pilih dari Galeri'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Saved Images */}
        {savedImages.length > 0 && (
          <View style={styles.savedImagesSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Gambar Tersimpan</Text>
              <TouchableOpacity onPress={handleClearAllImages}>
                <Text style={styles.clearAllText}>Hapus Semua</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.savedImagesContainer}>
              {savedImages.map((image) => (
                <View key={image.id} style={styles.savedImageItem}>
                  <TouchableOpacity onPress={() => handleSelectSavedImage(image)}>
                    <Image source={{ uri: image.uri }} style={styles.savedImage} />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={styles.deleteImageButton}
                    onPress={() => handleDeleteImage(image.id)}
                  >
                    <Text style={styles.deleteImageText}>×</Text>
                  </TouchableOpacity>
                  {savedImageId === image.id && (
                    <View style={styles.selectedIndicator}>
                      <Text style={styles.selectedText}>Dipilih</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
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
  currentImageSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  currentImageContainer: {
    alignItems: 'center',
  },
  currentImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  imageInfo: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
  },
  noImageContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  noImageText: {
    fontSize: 16,
    color: '#666666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  pickButton: {
    backgroundColor: '#34C759',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  savedImagesSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  clearAllText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  savedImagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  savedImageItem: {
    width: '48%',
    marginBottom: 15,
    position: 'relative',
  },
  savedImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  deleteImageButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF3B30',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedIndicator: {
    position: 'absolute',
    bottom: 5,
    left: 5,
    backgroundColor: '#007AFF',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '600',
  },
});