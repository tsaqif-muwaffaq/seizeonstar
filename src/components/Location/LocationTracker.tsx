import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocation } from '../../hooks/useLocation';

export const LocationTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const { currentLocation, startLocationTracking, stopLocationTracking, isLoading, watchId } = useLocation();

  const startTracking = () => {
    // SOAL 3: Start tracking dengan distanceFilter: 20
    startLocationTracking(20);
    setIsTracking(true);
    Alert.alert('Tracking Dimulai', 'Lokasi akan diupdate setiap 20 meter');
  };

  const stopTracking = () => {
    stopLocationTracking();
    setIsTracking(false);
    Alert.alert('Tracking Dihentikan', 'Pelacakan lokasi telah dihentikan');
  };

  // SOAL 3: Cleanup effect
  useEffect(() => {
    return () => {
      if (watchId) {
        stopLocationTracking();
      }
    };
  }, [watchId, stopLocationTracking]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Live Location Tracking</Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isTracking ? styles.stopButton : styles.startButton]}
          onPress={isTracking ? stopTracking : startTracking}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : isTracking ? 'Stop Tracking' : 'Mulai Tracking'}
          </Text>
        </TouchableOpacity>
      </View>

      {currentLocation && (
        <View style={styles.locationInfo}>
          <Text style={styles.locationTitle}>Posisi Terkini:</Text>
          <Text style={styles.coordinates}>
            Lat: {currentLocation.latitude.toFixed(6)}
          </Text>
          <Text style={styles.coordinates}>
            Lng: {currentLocation.longitude.toFixed(6)}
          </Text>
          {currentLocation.accuracy && (
            <Text style={styles.accuracy}>
              Akurasi: ±{currentLocation.accuracy.toFixed(1)} meter
            </Text>
          )}
        </View>
      )}

      {isTracking && (
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>🟢 Tracking Aktif</Text>
          <Text style={styles.statusDescription}>
            Lokasi diupdate setiap 20 meter
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  locationInfo: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  locationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#666666',
  },
  coordinates: {
    fontSize: 13,
    fontFamily: 'monospace',
    color: '#333333',
    marginBottom: 2,
  },
  accuracy: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
  statusContainer: {
    backgroundColor: '#E8F5E8',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2E7D32',
  },
  statusDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
});