import { 
  isSensorAvailable, 
  simplePrompt 
} from '@sbaiahmed1/react-native-biometrics';
import { 
  BiometricInfo, 
  BiometricType, 
  BiometricPromptOptions 
} from '../types/biometric';
import { handleBiometricError } from '../utils/biometricUtils';

class BiometricService {
  async checkAvailability(): Promise<BiometricInfo> {
    try {
      const result = await isSensorAvailable();
      return {
        available: result.available,
        biometryType: result.biometryType as BiometricType,
        error: result.error,
        errorCode: result.errorCode
      };
    } catch (error) {
      return {
        available: false,
        biometryType: null,
        error: handleBiometricError(error)
      };
    }
  }

  async authenticate(options: BiometricPromptOptions): Promise<{ success: boolean; error?: string }> {
    try {
      const promptOptions = {
        promptMessage: options.promptMessage,
        cancelButtonText: options.cancelButtonText || 'Batal'
      };

      const result = await simplePrompt(promptOptions);
      
      return {
        success: result.success,
        error: result.error ? handleBiometricError(result.error) : undefined
      };
    } catch (error) {
      return {
        success: false,
        error: handleBiometricError(error)
      };
    }
  }

  async authenticateWithContext(context: string, biometricType: BiometricType): Promise<boolean> {
    let promptMessage = 'Verifikasi Identitas';
    
    if (biometricType === 'FaceID') {
      promptMessage = `Pindai Wajah ${context}`;
    } else if (biometricType === 'TouchID' || biometricType === 'Biometrics') {
      promptMessage = `Tempelkan Jari ${context}`;
    }

    const result = await this.authenticate({
      promptMessage,
      cancelButtonText: 'Batal'
    });

    return result.success;
  }
}

export const biometricService = new BiometricService();