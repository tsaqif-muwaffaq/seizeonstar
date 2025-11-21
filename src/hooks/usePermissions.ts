import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import PermissionService from '../utils/permissions';

export const usePermissions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const granted = await PermissionService.requestCameraPermission();
      return granted;
    } catch (err) {
      const errorMessage = 'Gagal meminta izin kamera';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestStoragePermission = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const granted = await PermissionService.requestStoragePermission();
      return granted;
    } catch (err) {
      const errorMessage = 'Gagal meminta izin penyimpanan';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestPhotoLibraryPermission = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const granted = await PermissionService.requestPhotoLibraryPermission();
      return granted;
    } catch (err) {
      const errorMessage = 'Gagal meminta izin galeri foto';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const requestAllMediaPermissions = useCallback(async (): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const granted = await PermissionService.requestAllMediaPermissions();
      return granted;
    } catch (err) {
      const errorMessage = 'Gagal meminta izin media';
      setError(errorMessage);
      Alert.alert('Error', errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      return await PermissionService.checkCameraPermission();
    } catch (err) {
      console.error('Error checking camera permission:', err);
      return false;
    }
  }, []);

  const checkStoragePermission = useCallback(async (): Promise<boolean> => {
    try {
      return await PermissionService.checkStoragePermission();
    } catch (err) {
      console.error('Error checking storage permission:', err);
      return false;
    }
  }, []);

  const checkPhotoLibraryPermission = useCallback(async (): Promise<boolean> => {
    try {
      return await PermissionService.checkPhotoLibraryPermission();
    } catch (err) {
      console.error('Error checking photo library permission:', err);
      return false;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    loading,
    error,
    requestCameraPermission,
    requestStoragePermission,
    requestPhotoLibraryPermission,
    requestAllMediaPermissions,
    checkCameraPermission,
    checkStoragePermission,
    checkPhotoLibraryPermission,
    clearError,
  };
};

export default usePermissions;