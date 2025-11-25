export interface Coordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  altitude?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

export interface LocationPermissionResult {
  granted: boolean;
  status: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  radius: number; // dalam meter
}

export interface GeofencingEvent {
  storeId: string;
  storeName: string;
  event: 'ENTER' | 'EXIT';
  timestamp: number;
}