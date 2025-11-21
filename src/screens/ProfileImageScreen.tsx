import * as React from 'react';
import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import  ImagePickerModal  from '../components/ImagePickerModal';
import LoadingIndicator from '../components/LoadingIndicator';
import PermissionHandler from '../components/PermissionHandler';
import  useImagePicker  from '../hooks/useImagePicker';
import { ImageService } from '../services/imageService';
import { ImageAsset } from '../types';

const ProfileImageScreen: React.FC = () => {
  const navigation = useNavigation();
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [base64Preview, setBase64Preview] = useState<string | null>(null);
  
  const {
    selectedImages,
    uploading,
    openCameraWithSave,
    uploadImages,
    clearImages,
  } = useImagePicker();

  // Load base64 preview dari storage saat component mount
  React.useEffect(() => {
    loadBase64Preview();
  }, []);

  const loadBase64Preview = async () => {
    try {
      const preview = await ImageService.getBase64Preview('@ecom:profilePreview');
      setBase64Preview(preview);
    } catch (error) {
      console.error('Error loading base64 preview:', error);
    }
  };

  const handleImagesSelected = async (assets: ImageAsset[]) => {
    if (assets.length > 0) {
      const asset = assets[0];
      
      // Simpan base64 preview untuk offline access
      if (asset.base64) {
        await ImageService.saveBase64Preview(asset, '@ecom:profilePreview');
        setBase64Preview(asset.base64);
      }

      // Upload ke server
      try {
        await uploadImages('https://api.example.com/upload-avatar');
        Alert.alert('Sukses', 'Foto profil berhasil diupload');
      } catch (error) {
        Alert.alert('Error', 'Gagal mengupload foto profil');
      }
    }
  };

  const handleKTPUpload = async () => {
    try {
      await openCameraWithSave({
        mediaType: 'photo',
        quality: 0.7,
        maxWidth: 1024,
        maxHeight: 1024,
      });
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil foto KTP');
    }
  };

  const handleBase64Explanation = () => {
    Alert.alert(
      'Mengapa Base64 disimpan di AsyncStorage?',
      'Base64 preview gambar disimpan di AsyncStorage karena:\n\n• Data tidak sensitif (hanya preview)\n• Ukuran kecil (300x300px)\n• Untuk akses cepat saat offline\n• Token sensitif disimpan di Keychain karena membutuhkan keamanan tinggi',
      [{ text: 'Mengerti' }]
    );
  };

  return (
    <PermissionHandler
      permissionType="both"
      onPermissionGranted={() => console.log('Permission granted')}
      onPermissionDenied={() => console.log('Permission denied')}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Foto Profil</Text>

        {/* Avatar Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Foto Profil</Text>
          
          <View style={styles.avatarContainer}>
            {base64Preview ? (
              <Image 
                source={{ uri: `data:image/jpeg;base64,${base64Preview}` }} 
                style={styles.avatarImage}
              />
            ) : selectedImages.length > 0 ? (
              <Image 
                source={{ uri: selectedImages[0].uri }} 
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarPlaceholderText}>Foto Profil</Text>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowImagePicker(true)}
          >
            <Text style={styles.buttonText}>
              {selectedImages.length > 0 ? 'Ganti Foto Profil' : 'Pilih Foto Profil'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.outlineButton]}
            onPress={handleBase64Explanation}
          >
            <Text style={styles.outlineButtonText}>Info Penyimpanan Base64</Text>
          </TouchableOpacity>
        </View>

        {/* KTP Upload Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Verifikasi KTP</Text>
          <Text style={styles.sectionDescription}>
            Foto KTP akan disimpan ke galeri sebagai backup
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.ktpButton]}
            onPress={handleKTPUpload}
            disabled={uploading}
          >
            <Text style={styles.buttonText}>
              {uploading ? 'Mengambil Foto...' : 'Ambil Foto KTP'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Quick Preview dengan Base64 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preview Cepat (Offline)</Text>
          <Text style={styles.sectionDescription}>
            Preview ini akan tampil bahkan saat offline
          </Text>

          {base64Preview && (
            <View style={styles.previewContainer}>
              <Image 
                source={{ uri: `data:image/jpeg;base64,${base64Preview}` }} 
                style={styles.previewImage}
              />
              <Text style={styles.previewText}>Preview tersimpan offline</Text>
            </View>
          )}
        </View>

        <ImagePickerModal
          visible={showImagePicker}
          onClose={() => setShowImagePicker(false)}
          onImagesSelected={handleImagesSelected}
          selectionLimit={1}
          includeBase64={true}
          maxWidth={300}
          maxHeight={300}
        />

        <LoadingIndicator visible={uploading} text="Mengupload gambar..." />
      </ScrollView>
    </PermissionHandler>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E9ECEF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholderText: {
    color: '#6C757D',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  outlineButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  ktpButton: {
    backgroundColor: '#34C759',
  },
  previewContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default ProfileImageScreen;