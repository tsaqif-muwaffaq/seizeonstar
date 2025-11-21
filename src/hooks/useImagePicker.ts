import { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { launchCamera, launchImageLibrary, CameraOptions, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import { ImageAsset, ImagePickerOptions } from '../types';
import PermissionService from '../utils/permissions';
import { ImageUtils } from '../utils/imageUtils';
import { ImageService } from '../services/imageService';

// Convert our custom types to library types
const convertToCameraOptions = (options: ImagePickerOptions): CameraOptions => ({
  mediaType: options.mediaType as any || 'photo',
  quality: options.quality as any || 0.7, // Cast to any to avoid type issues
  maxWidth: options.maxWidth,
  maxHeight: options.maxHeight,
  includeBase64: options.includeBase64,
  saveToPhotos: options.saveToPhotos,
});

const convertToLibraryOptions = (options: ImagePickerOptions): ImageLibraryOptions => ({
  mediaType: options.mediaType as any || 'photo',
  quality: options.quality as any || 0.7, // Cast to any to avoid type issues
  maxWidth: options.maxWidth,
  maxHeight: options.maxHeight,
  includeBase64: options.includeBase64,
  selectionLimit: options.selectionLimit,
});

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

const useImagePicker = () => {
  const [selectedImages, setSelectedImages] = useState<ImageAsset[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageResponse = useCallback((response: any) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
      return null;
    }

    if (response.errorCode) {
      let errorMessage = 'Terjadi kesalahan saat memilih gambar';
      
      switch (response.errorCode) {
        case 'camera_unavailable':
          errorMessage = 'Kamera tidak tersedia. Silakan gunakan galeri.';
          Alert.alert(
            'Kamera Tidak Tersedia',
            errorMessage,
            [
              { text: 'Batal', style: 'cancel' },
              { 
                text: 'Buka Galeri', 
                onPress: () => {} // Will be handled by caller
              }
            ]
          );
          break;
        case 'permission':
          errorMessage = 'Izin akses kamera/galeri ditolak';
          PermissionService.showPermissionDeniedAlert('Aplikasi membutuhkan izin untuk mengakses kamera dan galeri');
          break;
        default:
          errorMessage = response.errorMessage || 'Terjadi kesalahan tidak diketahui';
      }
      
      setError(errorMessage);
      return null;
    }

    if (response.assets && response.assets.length > 0) {
      const validAssets = response.assets
        .map(convertAssetToImageAsset)
        .filter(asset => ImageUtils.validateImageSize(asset, 10));

      if (validAssets.length !== response.assets.length) {
        Alert.alert('Peringatan', 'Beberapa gambar terlalu besar dan tidak dipilih');
      }

      return validAssets;
    }

    return null;
  }, []);

  const openCamera = useCallback(async (options: ImagePickerOptions = {}) => {
    try {
      setError(null);
      
      const hasPermission = await PermissionService.requestCameraPermission();
      if (!hasPermission) {
        PermissionService.showPermissionDeniedAlert('Izin kamera diperlukan untuk mengambil foto');
        return;
      }

      const cameraOptions = convertToCameraOptions(options);

      launchCamera(cameraOptions, (response) => {
        const assets = handleImageResponse(response);
        if (assets) {
          setSelectedImages(prev => [...prev, ...assets]);
        }
      });
    } catch (err) {
      setError('Gagal membuka kamera');
      console.error('Camera error:', err);
    }
  }, [handleImageResponse]);

  const openImageLibrary = useCallback(async (options: ImagePickerOptions = {}) => {
    try {
      setError(null);
      
      const hasPermission = await PermissionService.requestStoragePermission();
      if (!hasPermission) {
        PermissionService.showPermissionDeniedAlert('Izin galeri diperlukan untuk memilih gambar');
        return;
      }

      const libraryOptions = convertToLibraryOptions(options);

      launchImageLibrary(libraryOptions, (response) => {
        const assets = handleImageResponse(response);
        if (assets) {
          if (options.selectionLimit === 1) {
            setSelectedImages(assets);
          } else {
            setSelectedImages(prev => [...prev, ...assets]);
          }
        }
      });
    } catch (err) {
      setError('Gagal membuka galeri');
      console.error('Image library error:', err);
    }
  }, [handleImageResponse]);

  const openCameraWithSave = useCallback(async (options: ImagePickerOptions = {}) => {
    try {
      if (Platform.OS === 'android') {
        const hasStoragePermission = await PermissionService.requestStoragePermissionAndSave();
        
        const cameraOptions: ImagePickerOptions = {
          ...options,
          saveToPhotos: hasStoragePermission,
        };

        if (!hasStoragePermission) {
          Alert.alert(
            'Peringatan',
            'Foto tidak akan disimpan ke galeri publik karena izin penyimpanan ditolak',
            [{ text: 'OK' }]
          );
        }

        await openCamera(cameraOptions);
      } else {
        await openCamera({ ...options, saveToPhotos: true });
      }
    } catch (err) {
      setError('Gagal membuka kamera dengan penyimpanan');
      console.error('Camera with save error:', err);
    }
  }, [openCamera]);

  const uploadImages = useCallback(async (endpoint: string): Promise<any> => {
    if (selectedImages.length === 0) {
      throw new Error('Tidak ada gambar yang dipilih');
    }

    setUploading(true);
    setError(null);

    try {
      const result = await ImageService.uploadImages(selectedImages, endpoint);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload gagal';
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  }, [selectedImages]);

  const clearImages = useCallback(() => {
    setSelectedImages([]);
    setError(null);
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  return {
    selectedImages,
    uploading,
    error,
    openCamera,
    openImageLibrary,
    openCameraWithSave,
    uploadImages,
    clearImages,
    removeImage,
    setSelectedImages,
  };
};

export default useImagePicker;