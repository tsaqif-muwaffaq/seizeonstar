import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Coordinates, GeofencingEvent, StoreLocation } from '../types/location';
import { geofencingService } from '../services/geofencingService';
import { useLocation } from './useLocation';

export const useGeofencing = () => {
  const [geofencingEvents, setGeofencingEvents] = useState<GeofencingEvent[]>([]);
  const [nearbyStores, setNearbyStores] = useState<StoreLocation[]>([]);
  const [isMonitoring, setIsMonitoring] = useState(false);
  
  const { currentLocation, startLocationTracking, stopLocationTracking } = useLocation();

  // SOAL 5: Geofencing dengan watchPosition
  const startGeofencing = useCallback(() => {
    setIsMonitoring(true);
    
    // Gunakan watchPosition dengan distanceFilter: 50
    const watchId = startLocationTracking(50);
    
    return watchId;
  }, [startLocationTracking]);

  const stopGeofencing = useCallback(() => {
    setIsMonitoring(false);
    stopLocationTracking();
  }, [stopLocationTracking]);

  const checkGeofencing = useCallback((location: Coordinates) => {
    const event = geofencingService.checkProximity(location);
    
    if (event) {
      setGeofencingEvents(prev => [...prev, event]);
      
      // SOAL 5: Notifikasi dan stop tracking
      if (event.event === 'ENTER') {
        Alert.alert(
          'PROMO DEKAT TOKO!',
          `Anda berada di dekat ${event.storeName}. Dapatkan promo spesial!`,
          [
            {
              text: 'OK',
              onPress: () => stopGeofencing(), // Matikan tracking setelah notifikasi
            },
          ]
        );
      }
    }

    // Update daftar toko terdekat
    const stores = geofencingService.getNearbyStores(location, 5000);
    setNearbyStores(stores);
  }, [stopGeofencing]);

  useEffect(() => {
    if (currentLocation && isMonitoring) {
      checkGeofencing(currentLocation);
    }
  }, [currentLocation, isMonitoring, checkGeofencing]);

  return {
    geofencingEvents,
    nearbyStores,
    isMonitoring,
    startGeofencing,
    stopGeofencing,
    getAllStores: geofencingService.getAllStores,
  };
};