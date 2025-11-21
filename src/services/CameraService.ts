import { Alert } from 'react-native';
import { launchCamera, CameraOptions, Asset } from 'react-native-image-picker';
import { ImagePickerOptions, ImageAsset } from '../types';
import PermissionService from '../utils/permissions';

// Convert our custom types to library types
const convertToCameraOptions = (options: ImagePickerOptions): CameraOptions => ({
  mediaType: options.mediaType as any || 'photo',
  quality: options.quality as any || 0.7, // Cast to any to avoid type issues
  maxWidth: options.maxWidth,
  maxHeight: options.maxHeight,
  includeBase64: options.includeBase64,
  saveToPhotos: options.saveToPhotos,
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

export class CameraService {
  static async takePhoto(options: ImagePickerOptions = {}): Promise<ImageAsset | null> {
    try {
      const hasPermission = await PermissionService.requestCameraPermission();
      if (!hasPermission) {
        PermissionService.showPermissionDeniedAlert('Izin kamera diperlukan untuk mengambil foto');
        return null;
      }

      const cameraOptions = convertToCameraOptions(options);

      return new Promise((resolve) => {
        launchCamera(cameraOptions, (response) => {
          if (response.didCancel) {
            resolve(null);
            return;
          }

          if (response.errorCode) {
            this.handleCameraError(response.errorCode, response.errorMessage);
            resolve(null);
            return;
          }

          if (response.assets && response.assets.length > 0) {
            resolve(convertAssetToImageAsset(response.assets[0]));
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('Camera service error:', error);
      Alert.alert('Error', 'Gagal membuka kamera');
      return null;
    }
  }

  private static handleCameraError(errorCode: string, errorMessage?: string) {
    switch (errorCode) {
      case 'camera_unavailable':
        Alert.alert(
          'Kamera Tidak Tersedia',
          'Kamera tidak dapat diakses. Silakan gunakan galeri atau periksa apakah kamera sedang digunakan oleh aplikasi lain.',
          [
            { text: 'OK', style: 'cancel' },
          ]
        );
        break;
      
      case 'permission':
        PermissionService.showPermissionDeniedAlert('Izin kamera ditolak');
        break;
      
      default:
        Alert.alert('Error Kamera', errorMessage || 'Terjadi kesalahan tidak diketahui');
    }
  }

  static async takePhotoWithRetry(options: ImagePickerOptions = {}, retries: number = 2): Promise<ImageAsset | null> {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const result = await this.takePhoto(options);
        if (result) return result;
        
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } catch (error) {
        console.error(`Camera attempt ${attempt + 1} failed:`, error);
        if (attempt === retries) {
          throw error;
        }
      }
    }
    return null;
  }
}

export default CameraService;