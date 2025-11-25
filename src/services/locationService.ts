import { getCurrentLocation, watchLocation, clearLocationWatch, getLocationForServer } from '../utils/locationUtils';
import { Coordinates } from '../types/location';

class LocationService {
  private currentWatchId: number | null = null;

  async getShippingLocation(): Promise<Coordinates> {
    try {
      return await getCurrentLocation();
    } catch (error) {
      throw error;
    }
  }

  // SOAL 3: Live Tracking dengan Cleanup
  startLocationTracking(
    onLocationUpdate: (coords: Coordinates) => void,
    distanceFilter: number = 20
  ): number {
    if (this.currentWatchId !== null) {
      this.stopLocationTracking();
    }

    this.currentWatchId = watchLocation(
      onLocationUpdate,
      (error) => console.error('Location tracking error:', error),
      distanceFilter
    );

    return this.currentWatchId;
  }

  stopLocationTracking(): void {
    if (this.currentWatchId !== null) {
      clearLocationWatch(this.currentWatchId);
      this.currentWatchId = null;
    }
  }

  // SOAL 4: Integrasi Networking Hemat Data
  async sendLocationToServer(coords: Coordinates): Promise<void> {
    // Simulasi pengiriman data ke server
    console.log('Mengirim lokasi ke server:', coords);
    
    // Dalam implementasi nyata, ini akan memanggil API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Lokasi berhasil dikirim ke server');
  }

  async getLocationForAnalytics(): Promise<Coordinates> {
    return await getLocationForServer();
  }
}

export const locationService = new LocationService();