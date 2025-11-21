import { PermissionsAndroid, Platform, Alert } from 'react-native';

export class PermissionService {
  static async checkCameraPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        return result;
      } catch (err) {
        console.warn('Error checking camera permission:', err);
        return false;
      }
    } else {
      // iOS - always return true for demo (in real app, use react-native-permissions)
      return true;
    }
  }

  static async requestCameraPermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Izin Kamera',
            message: 'Aplikasi membutuhkan akses kamera untuk mengambil foto',
            buttonPositive: 'Izinkan',
            buttonNegative: 'Tolak',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error requesting camera permission:', err);
        return false;
      }
    } else {
      // iOS - always return true for demo
      return true;
    }
  }

  static async checkStoragePermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        let result = false;
        if (Platform.Version >= 33) {
          result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
        } else {
          result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        }
        return result;
      } catch (err) {
        console.warn('Error checking storage permission:', err);
        return false;
      }
    } else {
      // iOS - always return true for demo
      return true;
    }
  }

  static async requestStoragePermission(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        let granted;
        
        if (Platform.Version >= 33) {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
            {
              title: 'Izin Penyimpanan',
              message: 'Aplikasi membutuhkan akses galeri untuk memilih gambar',
              buttonPositive: 'Izinkan',
              buttonNegative: 'Tolak',
            }
          );
        } else {
          granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'Izin Penyimpanan',
              message: 'Aplikasi membutuhkan akses penyimpanan untuk memilih gambar',
              buttonPositive: 'Izinkan',
              buttonNegative: 'Tolak',
            }
          );
        }
        
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error requesting storage permission:', err);
        return false;
      }
    } else {
      // iOS - always return true for demo
      return true;
    }
  }

  // Alias methods for photo library permissions
  static async checkPhotoLibraryPermission(): Promise<boolean> {
    return this.checkStoragePermission();
  }

  static async requestPhotoLibraryPermission(): Promise<boolean> {
    return this.requestStoragePermission();
  }

  static async requestAllMediaPermissions(): Promise<boolean> {
    const cameraGranted = await this.requestCameraPermission();
    const storageGranted = await this.requestStoragePermission();
    return cameraGranted && storageGranted;
  }

  static async requestStoragePermissionAndSave(): Promise<boolean> {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Izin Penyimpanan Eksternal',
            message: 'Aplikasi ingin menyimpan foto ke galeri untuk backup',
            buttonPositive: 'Izinkan',
            buttonNegative: 'Tolak',
            buttonNeutral: 'Nanti',
          }
        );
        
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Error requesting storage permission:', err);
        return false;
      }
    }
    return true; // iOS selalu return true karena tidak perlu WRITE_EXTERNAL_STORAGE
  }

  static showPermissionDeniedAlert(message: string) {
    Alert.alert(
      'Izin Diperlukan',
      message,
      [{ text: 'OK' }]
    );
  }
}

export default PermissionService;