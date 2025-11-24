import { storageService } from './storageService';

export interface ImageData {
  id: string;
  uri: string;
  base64?: string;
  timestamp: number;
}

class ImageService {
  private readonly IMAGE_STORAGE_KEY = 'user_images';

  async saveImage(imageData: ImageData): Promise<boolean> {
    try {
      const existingImages = await this.getImages();
      const updatedImages = [...existingImages, imageData];
      
      // Simpan sebagai JSON string
      const result = await storageService.saveCredentials(
        this.IMAGE_STORAGE_KEY, 
        JSON.stringify(updatedImages)
      );
      return result;
    } catch (error) {
      console.error('Error saving image:', error);
      return false;
    }
  }

  async getImages(): Promise<ImageData[]> {
    try {
      const credentials = await storageService.getCredentials();
      if (credentials && credentials.username === this.IMAGE_STORAGE_KEY) {
        return JSON.parse(credentials.password);
      }
      return [];
    } catch (error) {
      console.error('Error getting images:', error);
      return [];
    }
  }

  async deleteImage(imageId: string): Promise<boolean> {
    try {
      const existingImages = await this.getImages();
      const updatedImages = existingImages.filter(img => img.id !== imageId);
      
      const result = await storageService.saveCredentials(
        this.IMAGE_STORAGE_KEY,
        JSON.stringify(updatedImages)
      );
      return result;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  }

  async clearAllImages(): Promise<boolean> {
    try {
      // Hanya hapus jika key adalah IMAGE_STORAGE_KEY
      const credentials = await storageService.getCredentials();
      if (credentials && credentials.username === this.IMAGE_STORAGE_KEY) {
        return await storageService.clearCredentials();
      }
      return true;
    } catch (error) {
      console.error('Error clearing images:', error);
      return false;
    }
  }
}

export const imageService = new ImageService();