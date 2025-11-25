import { useState, useEffect, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import { Coordinates, LocationPermissionResult } from '../types/location';
import { requestLocationPermission, getCurrentLocation } from '../utils/locationUtils';
import { locationService } from '../services/locationService';

export const useLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<Coordinates | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permission, setPermission] = useState<LocationPermissionResult | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  const checkAndRequestPermission = useCallback(async (): Promise<boolean> => {
    try {
      const result = await requestLocationPermission();
      setPermission(result);
      return result.granted;
    } catch (error) {
      console.error('Permission error:', error);
      setError('Gagal meminta izin lokasi');
      return false;
    }
  }, []);

  const fetchCurrentLocation = useCallback(async (showAlert: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const hasPermission = await checkAndRequestPermission();
      if (!hasPermission) {
        setError('Izin lokasi ditolak');
        return;
      }

      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      if (showAlert) {
        Alert.alert('Lokasi Berhasil', `Lat: ${location.latitude.toFixed(6)}\nLng: ${location.longitude.toFixed(6)}`);
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Gagal mengambil lokasi';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [checkAndRequestPermission]);

  const startLocationTracking = useCallback((distanceFilter: number = 20) => {
    const id = locationService.startLocationTracking(setCurrentLocation, distanceFilter);
    setWatchId(id);
    return id;
  }, []);

  const stopLocationTracking = useCallback(() => {
    if (watchId !== null) {
      locationService.stopLocationTracking();
      setWatchId(null);
    }
  }, [watchId]);

  const sendLocationToServer = useCallback(async () => {
    if (!currentLocation) {
      Alert.alert('Error', 'Tidak ada lokasi yang tersedia');
      return;
    }

    try {
      await locationService.sendLocationToServer(currentLocation);
      Alert.alert('Sukses', 'Lokasi berhasil dikirim ke server');
    } catch (error) {
      Alert.alert('Error', 'Gagal mengirim lokasi ke server');
    }
  }, [currentLocation]);

  const getLocationForAnalytics = useCallback(async () => {
    try {
      const location = await locationService.getLocationForAnalytics();
      setCurrentLocation(location);
      Alert.alert('Sukses', 'Lokasi untuk analitik berhasil diambil');
      return location;
    } catch (error) {
      Alert.alert('Error', 'Gagal mengambil lokasi untuk analitik');
      throw error;
    }
  }, []);

  // SOAL 3: Cleanup effect
  useEffect(() => {
    return () => {
      stopLocationTracking();
    };
  }, [stopLocationTracking]);

  return {
    currentLocation,
    isLoading,
    error,
    permission,
    watchId,
    fetchCurrentLocation,
    startLocationTracking,
    stopLocationTracking,
    sendLocationToServer,
    getLocationForAnalytics,
    checkAndRequestPermission,
  };
};