import { useState, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

type PermissionType = 'camera' | 'photo' | 'biometric';

export const usePermissions = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getPermission = useCallback((type: PermissionType) => {
    if (Platform.OS === 'ios') {
      switch (type) {
        case 'camera':
          return PERMISSIONS.IOS.CAMERA;
        case 'photo':
          return PERMISSIONS.IOS.PHOTO_LIBRARY;
        case 'biometric':
          return null; // Biometric handled separately
        default:
          return null;
      }
    } else {
      switch (type) {
        case 'camera':
          return PERMISSIONS.ANDROID.CAMERA;
        case 'photo':
          return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
        case 'biometric':
          return null; // Biometric handled separately
        default:
          return null;
      }
    }
  }, []);

  const checkPermission = useCallback(async (type: PermissionType): Promise<boolean> => {
    const permission = getPermission(type);
    if (!permission) return true; // For unsupported permissions, return true

    try {
      const result = await check(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error checking permission:', error);
      return false;
    }
  }, [getPermission]);

  const requestPermission = useCallback(async (type: PermissionType): Promise<boolean> => {
    const permission = getPermission(type);
    if (!permission) return true;

    setIsLoading(true);
    try {
      const result = await request(permission);
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Error', `Gagal meminta izin ${type}`);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [getPermission]);

  const checkAndRequestPermission = useCallback(async (type: PermissionType): Promise<boolean> => {
    const hasPermission = await checkPermission(type);
    if (hasPermission) {
      return true;
    }
    return await requestPermission(type);
  }, [checkPermission, requestPermission]);

  return {
    isLoading,
    checkPermission,
    requestPermission,
    checkAndRequestPermission,
  };
};