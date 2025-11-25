import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useGeofencing } from '../../hooks/useGeofencing';
import { StoreLocation } from '../../types/location';

export const Geofencing: React.FC = () => {
  const { geofencingEvents, nearbyStores, isMonitoring, startGeofencing, stopGeofencing, getAllStores } = useGeofencing();

  const handleToggleGeofencing = () => {
    if (isMonitoring) {
      stopGeofencing();
      Alert.alert('Geofencing Dihentikan', 'Monitoring toko terdekat telah dihentikan');
    } else {
      startGeofencing();
      Alert.alert('Geofencing Aktif', 'Sistem akan memberi notifikasi saat Anda dekat toko');
    }
  };

  const renderStore = (store: StoreLocation, index: number) => (
    <View key={store.id} style={styles.storeItem}>
      <Text style={styles.storeName}>{store.name}</Text>
      <Text style={styles.storeAddress}>{store.address}</Text>
      <Text style={styles.storeRadius}>Radius: {store.radius}m</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Geofencing - Promo Toko Terdekat</Text>
      
      <TouchableOpacity
        style={[styles.toggleButton, isMonitoring ? styles.stopButton : styles.startButton]}
        onPress={handleToggleGeofencing}
      >
        <Text style={styles.toggleButtonText}>
          {isMonitoring ? 'Hentikan Monitoring' : 'Aktifkan Geofencing'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Daftar Toko:</Text>
      <ScrollView style={styles.storesContainer}>
        {getAllStores().map(renderStore)}
      </ScrollView>

      {nearbyStores.length > 0 && (
        <View style={styles.nearbyContainer}>
          <Text style={styles.sectionTitle}>Toko Terdekat ({nearbyStores.length}):</Text>
          <ScrollView style={styles.storesContainer}>
            {nearbyStores.map(renderStore)}
          </ScrollView>
        </View>
      )}

      {geofencingEvents.length > 0 && (
        <View style={styles.eventsContainer}>
          <Text style={styles.sectionTitle}>Riwayat Geofencing:</Text>
          <ScrollView style={styles.eventsList}>
            {geofencingEvents.slice(-5).reverse().map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text style={styles.eventStore}>{event.storeName}</Text>
                <Text style={[
                  styles.eventType,
                  event.event === 'ENTER' ? styles.enterEvent : styles.exitEvent
                ]}>
                  {event.event === 'ENTER' ? '🟢 MASUK' : '🔴 KELUAR'}
                </Text>
                <Text style={styles.eventTime}>
                  {new Date(event.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {isMonitoring && (
        <View style={styles.monitoringStatus}>
          <Text style={styles.monitoringText}>🔍 Sedang memantau toko terdekat...</Text>
          <Text style={styles.monitoringHint}>
            Notifikasi akan muncul otomatis saat Anda dalam radius 100m dari toko
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
    textAlign: 'center',
  },
  toggleButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#2196F3',
  },
  stopButton: {
    backgroundColor: '#FF9800',
  },
  toggleButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333333',
  },
  storesContainer: {
    maxHeight: 150,
    marginBottom: 16,
  },
  storeItem: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  storeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 2,
  },
  storeAddress: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  storeRadius: {
    fontSize: 11,
    color: '#888888',
    fontStyle: 'italic',
  },
  nearbyContainer: {
    marginBottom: 16,
  },
  eventsContainer: {
    marginBottom: 16,
  },
  eventsList: {
    maxHeight: 120,
  },
  eventItem: {
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventStore: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    flex: 2,
  },
  eventType: {
    fontSize: 11,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  enterEvent: {
    color: '#4CAF50',
  },
  exitEvent: {
    color: '#F44336',
  },
  eventTime: {
    fontSize: 10,
    color: '#888888',
    flex: 1,
    textAlign: 'right',
  },
  monitoringStatus: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  monitoringText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
  },
  monitoringHint: {
    fontSize: 12,
    color: '#424242',
  },
});