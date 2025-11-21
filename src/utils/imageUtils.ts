import { ImageAsset } from '../types';

export class ImageUtils {
  static validateImageSize(asset: ImageAsset, maxSizeMB: number = 10): boolean {
    if (!asset.fileSize) return true;
    
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    return asset.fileSize <= maxSizeBytes;
  }

  static compressImageOptions(quality: number = 0.7, maxWidth: number = 1024, maxHeight: number = 1024) {
    return {
      quality,
      maxWidth,
      maxHeight,
    };
  }

  static createFormData(assets: ImageAsset[], fieldName: string = 'images'): FormData {
    const formData = new FormData();
    
    assets.forEach((asset, index) => {
      formData.append(fieldName, {
        uri: asset.uri,
        type: asset.type || 'image/jpeg',
        name: asset.fileName || `image_${Date.now()}_${index}.jpg`,
      } as any);
    });
    
    return formData;
  }

  static extractImageInfo(assets: ImageAsset[]): Array<{uri: string; fileName: string}> {
    return assets.map(asset => ({
      uri: asset.uri,
      fileName: asset.fileName || `image_${Date.now()}.jpg`,
    }));
  }
}

export default ImageUtils;