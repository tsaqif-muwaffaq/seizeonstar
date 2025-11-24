import { useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchCamera, launchImageLibrary, ImageLibraryOptions, CameraOptions, Asset } from 'react-native-image-picker';
import { imageService } from '../services/imageService';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface ImagePickerOptions {
  mediaType?: 'photo' | 'video' | 'mixed';
  includeBase64?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

interface ImageResult {
  uri: string;
  base64?: string;
  fileName?: string;
  fileSize?: number;
  type?: string;
}

export const useImagePicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        ]);

        return (
          granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED &&
          granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED
        );
      } catch (error) {
        console.error('Permission error:', error);
        return false;
      }
    } else {
      const cameraPermission = await check(PERMISSIONS.IOS.CAMERA);
      const photoPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

      if (cameraPermission !== RESULTS.GRANTED) {
        await request(PERMISSIONS.IOS.CAMERA);
      }
      if (photoPermission !== RESULTS.GRANTED) {
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }

      return true;
    }
  };

  const takePhoto = async (options: ImagePickerOptions = {}): Promise<ImageResult | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert('Error', 'Izin kamera dan penyimpanan diperlukan');
        return null;
      }

      return new Promise((resolve) => {
        const cameraOptions: CameraOptions = {
          mediaType: 'photo' as any,
          includeBase64: options.includeBase64 || false,
          maxWidth: options.maxWidth || 1024,
          maxHeight: options.maxHeight || 1024,
          quality: options.quality as any || 0.8,
          saveToPhotos: true,
        };

        launchCamera(cameraOptions, (response) => {
          if (response.didCancel) {
            console.log('User cancelled camera');
            resolve(null);
          } else if (response.errorCode) {
            Alert.alert('Error', `Camera error: ${response.errorMessage}`);
            resolve(null);
          } else if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            const result: ImageResult = {
              uri: asset.uri!,
              base64: asset.base64,
              fileName: asset.fileName,
              fileSize: asset.fileSize,
              type: asset.type,
            };
            resolve(result);
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('Take photo error:', error);
      Alert.alert('Error', 'Gagal mengambil foto');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async (options: ImagePickerOptions = {}): Promise<ImageResult | null> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert('Error', 'Izin mengakses galeri diperlukan');
        return null;
      }

      return new Promise((resolve) => {
        const libraryOptions: ImageLibraryOptions = {
          mediaType: 'photo' as any,
          includeBase64: options.includeBase64 || false,
          maxWidth: options.maxWidth || 1024,
          maxHeight: options.maxHeight || 1024,
          quality: options.quality as any || 0.8,
        };

        launchImageLibrary(libraryOptions, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
            resolve(null);
          } else if (response.errorCode) {
            Alert.alert('Error', `Image picker error: ${response.errorMessage}`);
            resolve(null);
          } else if (response.assets && response.assets.length > 0) {
            const asset = response.assets[0];
            const result: ImageResult = {
              uri: asset.uri!,
              base64: asset.base64,
              fileName: asset.fileName,
              fileSize: asset.fileSize,
              type: asset.type,
            };
            resolve(result);
          } else {
            resolve(null);
          }
        });
      });
    } catch (error) {
      console.error('Pick image error:', error);
      Alert.alert('Error', 'Gagal memilih gambar');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const saveImageToStorage = async (imageData: ImageResult): Promise<string | null> => {
    try {
      const imageToSave = {
        id: Date.now().toString(),
        uri: imageData.uri,
        base64: imageData.base64,
        timestamp: Date.now(),
      };

      const success = await imageService.saveImage(imageToSave);
      return success ? imageToSave.id : null;
    } catch (error) {
      console.error('Save image error:', error);
      return null;
    }
  };

  return {
    isLoading,
    takePhoto,
    pickImage,
    saveImageToStorage,
  };
};