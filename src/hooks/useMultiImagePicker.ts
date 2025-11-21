import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import { ImageAsset } from '../types';
import { PermissionService } from '../utils/permissions';
import { ImageService } from '../services/imageService';

// Convert library Asset to our ImageAsset
const convertAssetToImageAsset = (asset: Asset): ImageAsset => ({
  uri: asset.uri || '',
  type: asset.type,
  fileName: asset.fileName,
  fileSize: asset.fileSize,
  width: asset.width,
  height: asset.height,
  base64: asset.base64,
});

export const useMultiImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<ImageAsset[]>([]);
  const [loading, setLoading] = useState(false);

  const pickMultipleImages = useCallback(async (maxSelection: number = 5) => {
    try {
      setLoading(true);

      const hasPermission = await PermissionService.requestStoragePermission();
      if (!hasPermission) {
        PermissionService.showPermissionDeniedAlert('Izin galeri diperlukan untuk memilih gambar');
        return;
      }

      const libraryOptions: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: maxSelection,
        quality: 0.7,
        maxWidth: 600,
        maxHeight: 600,
        includeBase64: false,
      };

      launchImageLibrary(libraryOptions, async (response) => {
        setLoading(false);

        if (response.didCancel) {
          return;
        }

        if (response.errorCode) {
          Alert.alert('Error', response.errorMessage || 'Terjadi kesalahan');
          return;
        }

        if (response.assets && response.assets.length > 0) {
          // Convert and filter assets
          const validAssets = response.assets
            .map(convertAssetToImageAsset)
            .filter(asset => asset.uri && asset.fileName);

          if (validAssets.length > 0) {
            // Simpan ke AsyncStorage sesuai soal evaluasi
            try {
              await ImageService.saveProductImagesToStorage(validAssets);
              setSelectedImages(prev => {
                const newImages = [...prev, ...validAssets];
                return newImages.slice(0, maxSelection);
              });
              
              Alert.alert(
                'Sukses', 
                `${validAssets.length} gambar berhasil dipilih`,
                [{ text: 'OK' }]
              );
            } catch (error) {
              Alert.alert('Error', 'Gagal menyimpan gambar ke storage');
            }
          }
        }
      });
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Gagal memilih gambar');
    }
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearImages = useCallback(() => {
    setSelectedImages([]);
  }, []);

  return {
    selectedImages,
    loading,
    pickMultipleImages,
    removeImage,
    clearImages,
    setSelectedImages,
  };
};

export default useMultiImagePicker;