import { ImageAsset, UploadProgress } from '../types';
import { storageService } from './storageService';

export class ImageService {
  static async uploadImages(
    assets: ImageAsset[], 
    endpoint: string,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<any> {
    const formData = new FormData();
    
    assets.forEach((asset, index) => {
      formData.append('images', {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
      } as any);
    });

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  static async saveProductImagesToStorage(assets: ImageAsset[]): Promise<void> {
    const productAssets = assets.map(asset => ({
      uri: asset.uri,
      fileName: asset.fileName || `image_${Date.now()}.jpg`,
      timestamp: Date.now(),
    }));

    await storageService.setItem('@ecom:newProductAssets', JSON.stringify(productAssets));
  }

  static async getProductImagesFromStorage(): Promise<any[]> {
    try {
      const stored = await storageService.getItem('@ecom:newProductAssets');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error getting product images from storage:', error);
      return [];
    }
  }

  static async saveBase64Preview(asset: ImageAsset, key: string): Promise<void> {
    if (asset.base64) {
      await storageService.setItem(key, asset.base64);
    }
  }

  static async getBase64Preview(key: string): Promise<string | null> {
    return await storageService.getItem(key);
  }
}

export default ImageService;