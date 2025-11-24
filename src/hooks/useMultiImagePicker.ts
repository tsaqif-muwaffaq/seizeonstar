import { useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';
import { imageService } from '../services/imageService';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

interface ImagePickerOptions {
  mediaType?: 'photo' | 'video' | 'mixed';
  includeBase64?: boolean;
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  selectionLimit?: number;
}

interface ImageResult {
  uri: string;
  base64?: string;
  fileName?: string;
  fileSize?: number;
  type?: string;
}

export const useMultiImagePicker = () => {
  const [isLoading, setIsLoading] = useState(false);

  const requestPermissions = async (): Promise<boolean> => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.error('Permission error:', error);
        return false;
      }
    } else {
      const photoPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

      if (photoPermission !== RESULTS.GRANTED) {
        const result = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        return result === RESULTS.GRANTED;
      }

      return true;
    }
  };

  const pickMultipleImages = async (options: ImagePickerOptions = {}): Promise<ImageResult[]> => {
    setIsLoading(true);
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) {
        Alert.alert('Error', 'Izin mengakses galeri diperlukan');
        return [];
      }

      return new Promise((resolve) => {
        const libraryOptions: ImageLibraryOptions = {
          mediaType: 'photo' as any,
          includeBase64: options.includeBase64 || false,
          maxWidth: options.maxWidth || 1024,
          maxHeight: options.maxHeight || 1024,
          quality: options.quality as any || 0.8,
          selectionLimit: options.selectionLimit || 10,
        };

        launchImageLibrary(libraryOptions, (response) => {
          if (response.didCancel) {
            console.log('User cancelled multi image picker');
            resolve([]);
          } else if (response.errorCode) {
            Alert.alert('Error', `Multi image picker error: ${response.errorMessage}`);
            resolve([]);
          } else if (response.assets && response.assets.length > 0) {
            const results: ImageResult[] = response.assets.map((asset) => ({
              uri: asset.uri!,
              base64: asset.base64,
              fileName: asset.fileName,
              fileSize: asset.fileSize,
              type: asset.type,
            }));
            resolve(results);
          } else {
            resolve([]);
          }
        });
      });
    } catch (error) {
      console.error('Pick multiple images error:', error);
      Alert.alert('Error', 'Gagal memilih beberapa gambar');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const saveMultipleImagesToStorage = async (images: ImageResult[]): Promise<string[]> => {
    try {
      const savedImageIds: string[] = [];

      for (const image of images) {
        const imageToSave = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          uri: image.uri,
          base64: image.base64,
          timestamp: Date.now(),
        };

        const success = await imageService.saveImage(imageToSave);
        if (success) {
          savedImageIds.push(imageToSave.id);
        }
      }

      return savedImageIds;
    } catch (error) {
      console.error('Save multiple images error:', error);
      return [];
    }
  };

  const getSavedImages = async (): Promise<any[]> => {
    try {
      return await imageService.getImages();
    } catch (error) {
      console.error('Get saved images error:', error);
      return [];
    }
  };

  const deleteSavedImage = async (imageId: string): Promise<boolean> => {
    try {
      return await imageService.deleteImage(imageId);
    } catch (error) {
      console.error('Delete saved image error:', error);
      return false;
    }
  };

  return {
    isLoading,
    pickMultipleImages,
    saveMultipleImagesToStorage,
    getSavedImages,
    deleteSavedImage,
  };
};