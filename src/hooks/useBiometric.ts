import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { biometricService } from '../services/biometricService';
import { BiometricInfo, BiometricType } from '../types/biometric';
import { handleBiometricError, showBiometricSetupAlert } from '../utils/biometricUtils';

export const useBiometric = () => {
  const [biometricInfo, setBiometricInfo] = useState<BiometricInfo>({
    available: false,
    biometryType: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkBiometricAvailability = useCallback(async () => {
    try {
      setIsLoading(true);
      const info = await biometricService.checkAvailability();
      setBiometricInfo(info);
      return info;
    } catch (error) {
      const errorInfo: BiometricInfo = {
        available: false,
        biometryType: null,
        error: handleBiometricError(error)
      };
      setBiometricInfo(errorInfo);
      return errorInfo;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const authenticate = useCallback(async (
    context?: string
  ): Promise<boolean> => {
    try {
      const promptMessage = context 
        ? `Verifikasi ${context}`
        : 'Verifikasi Identitas';

      const result = await biometricService.authenticate({
        promptMessage,
        cancelButtonText: 'Batal'
      });

      if (result.error === 'NOT_ENROLLED') {
        showBiometricSetupAlert();
        return false;
      }

      if (result.error === 'LOCKED_OUT') {
        Alert.alert(
          'Sensor Terkunci',
          'Terlalu banyak percobaan gagal. Sensor biometric terkunci sementara. Silakan gunakan metode login alternatif.'
        );
        return false;
      }

      return result.success;
    } catch (error) {
      console.error('Authentication error:', error);
      return false;
    }
  }, []);

  const authenticateWithDynamicMessage = useCallback(async (
    action: string,
    amount?: string
  ): Promise<boolean> => {
    let context = action;
    
    if (amount) {
      context = `untuk ${action} Rp ${amount}`;
    }

    let promptMessage = `Verifikasi ${context}`;
    
    if (biometricInfo.biometryType === 'FaceID') {
      promptMessage = `Pindai Wajah ${context}`;
    } else if (biometricInfo.biometryType === 'TouchID' || biometricInfo.biometryType === 'Biometrics') {
      promptMessage = `Tempelkan Jari ${context}`;
    }

    return await authenticate(context);
  }, [authenticate, biometricInfo.biometryType]);

  useEffect(() => {
    checkBiometricAvailability();
  }, [checkBiometricAvailability]);

  return {
    biometricInfo,
    isLoading,
    checkBiometricAvailability,
    authenticate,
    authenticateWithDynamicMessage,
    isAvailable: biometricInfo.available
  };
};