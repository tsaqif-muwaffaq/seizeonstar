import { Coordinates, StoreLocation, GeofencingEvent } from '../types/location';
import { calculateDistance, isWithinRadius } from '../utils/distanceCalculator';

class GeofencingService {
  private stores: StoreLocation[] = [
    {
      id: '1',
      name: 'Toko Utama SeizeonStar',
      address: 'Jl. Merdeka No. 123, Jakarta',
      coordinates: {
        latitude: -6.175392,
        longitude: 106.827153,
      },
      radius: 100, // 100 meter
    },
    {
      id: '2',
      name: 'Cabang Senayan',
      address: 'Jl. Senayan Raya No. 45, Jakarta',
      coordinates: {
        latitude: -6.2275,
        longitude: 106.8005,
      },
      radius: 150, // 150 meter
    },
  ];

  private enteredStores: Set<string> = new Set();

  // SOAL 5: Geofencing Sederhana
  checkProximity(userLocation: Coordinates): GeofencingEvent | null {
    for (const store of this.stores) {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        store.coordinates.latitude,
        store.coordinates.longitude
      );

      const isInside = distance <= store.radius;
      const wasInside = this.enteredStores.has(store.id);

      if (isInside && !wasInside) {
        // Masuk area toko
        this.enteredStores.add(store.id);
        return {
          storeId: store.id,
          storeName: store.name,
          event: 'ENTER',
          timestamp: Date.now(),
        };
      } else if (!isInside && wasInside) {
        // Keluar area toko
        this.enteredStores.delete(store.id);
        return {
          storeId: store.id,
          storeName: store.name,
          event: 'EXIT',
          timestamp: Date.now(),
        };
      }
    }

    return null;
  }

  getNearbyStores(userLocation: Coordinates, maxDistance: number = 5000): StoreLocation[] {
    return this.stores.filter(store => {
      const distance = calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        store.coordinates.latitude,
        store.coordinates.longitude
      );
      return distance <= maxDistance;
    });
  }

  getAllStores(): StoreLocation[] {
    return this.stores;
  }
}

export const geofencingService = new GeofencingService();