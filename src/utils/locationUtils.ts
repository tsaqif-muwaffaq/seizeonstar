import { Platform, PermissionsAndroid, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { Coordinates, LocationPermissionResult } from '../types/location';

// SOAL 1: Izin Lokasi dengan Penjelasan (Rationale)
export const requestLocationPermission = async (): Promise<LocationPermissionResult> => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Izin Lokasi',
          message: 'Kami butuh lokasi Anda untuk menampilkan toko terdekat secara akurat',
          buttonPositive: 'OK',
          buttonNegative: 'Batal',
        }
      );
      return {
        granted: granted === PermissionsAndroid.RESULTS.GRANTED,
        status: granted,
      };
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return { granted: false, status: 'error' };
    }
  }
  
  // iOS permission diatur via Info.plist
  return { granted: true, status: 'granted' };
};

// SOAL 2: Optimasi Baterai (One-Time Fetch)
export const getCurrentLocation = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        // Handle timeout error (Code 3)
        if (error.code === 3) {
          Alert.alert('GPS Timeout', 'Periksa koneksi GPS Anda');
        }
        reject(error);
      },
      {
        enableHighAccuracy: true, // Agar akurat
        timeout: 10000, // 10 detik batas waktu
        maximumAge: 60000, // Gunakan cache jika umur lokasi < 1 menit
      }
    );
  });
};

// SOAL 3: Live Tracking & Cleanup
export const watchLocation = (
  onSuccess: (coords: Coordinates) => void,
  onError: (error: any) => void,
  distanceFilter: number = 10
): number => {
  return Geolocation.watchPosition(
    (position) => {
      onSuccess(position.coords);
    },
    (error) => {
      onError(error);
    },
    {
      enableHighAccuracy: true,
      distanceFilter: distanceFilter,
      interval: 5000, // Android only
    }
  );
};

export const clearLocationWatch = (watchId: number) => {
  Geolocation.clearWatch(watchId);
};

// SOAL 4: Integrasi Networking Hemat Data
export const getLocationForServer = (): Promise<Coordinates> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 120000, // 2 menit - hemat baterai & data
        // maximumAge membantu mengurangi beban server dan baterai 
        // dengan tidak mengambil data GPS baru jika data lama masih segar (di bawah 2 menit)
        // Ini mencegah spam request ke server dan mengurangi penggunaan GPS hardware
      }
    );
  });
};