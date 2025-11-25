import * as React from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { LocationPermission } from '../components/Location/LocationPermission';
import { LocationTracker } from '../components/Location/LocationTracker';
import { Geofencing } from '../components/Location/Geofencing';
import { useLocation } from '../hooks/useLocation';

export const LocationScreen: React.FC = () => {
  const { currentLocation, fetchCurrentLocation, sendLocationToServer, getLocationForAnalytics } = useLocation();

  const handleGetLocation = () => {
    fetchCurrentLocation(true);
  };

  const handleSendToServer = () => {
    sendLocationToServer();
  };

  const handleGetAnalyticsLocation = async () => {
    try {
      await getLocationForAnalytics();
    } catch (error) {
      console.error('Analytics location error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Fitur Lokasi</Text>
        
        {/* Permission Component */}
        <LocationPermission />
        
        {/* Current Location Info */}
        {currentLocation && (
          <View style={styles.currentLocation}>
            <Text style={styles.sectionTitle}>Lokasi Saat Ini</Text>
            <Text style={styles.coordinates}>
              Latitude: {currentLocation.latitude.toFixed(6)}
            </Text>
            <Text style={styles.coordinates}>
              Longitude: {currentLocation.longitude.toFixed(6)}
            </Text>
            {currentLocation.accuracy && (
              <Text style={styles.accuracy}>
                Akurasi: ±{currentLocation.accuracy.toFixed(1)} meter
              </Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Text style={styles.sectionTitle}>Aksi Cepat</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.actionButton} onPress={handleGetLocation}>
              <Text style={styles.actionButtonText}>🔍 Ambil Lokasi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSendToServer}>
              <Text style={styles.actionButtonText}>📡 Kirim ke Server</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.analyticsButton} onPress={handleGetAnalyticsLocation}>
            <Text style={styles.analyticsButtonText}>📊 Lokasi untuk Analitik</Text>
          </TouchableOpacity>
        </View>

        {/* Location Tracker */}
        <LocationTracker />

        {/* Geofencing */}
        <Geofencing />

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Fitur yang Diimplementasi:</Text>
          <Text style={styles.infoText}>✅ Izin Lokasi dengan Rationale</Text>
          <Text style={styles.infoText}>✅ Optimasi Baterai (One-Time Fetch)</Text>
          <Text style={styles.infoText}>✅ Live Tracking dengan Cleanup</Text>
          <Text style={styles.infoText}>✅ Integrasi Networking Hemat Data</Text>
          <Text style={styles.infoText}>✅ Geofencing Sederhana</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
    textAlign: 'center',
  },
  currentLocation: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  coordinates: {
    fontSize: 14,
    fontFamily: 'monospace',
    color: '#666666',
    marginBottom: 4,
  },
  accuracy: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
  },
  actionButtons: {
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  analyticsButton: {
        backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  analyticsButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 4,
  },
});