import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocation } from '../../hooks/useLocation';

export const LocationPermission: React.FC = () => {
  const { permission, checkAndRequestPermission, fetchCurrentLocation } = useLocation();

  const handleRequestPermission = async () => {
    const granted = await checkAndRequestPermission();
    
    if (granted) {
      Alert.alert('Sukses', 'Izin lokasi diberikan');
      fetchCurrentLocation();
    } else {
      Alert.alert(
        'Izin Ditolak',
        'Fitur pencari toko terdekat membutuhkan akses lokasi. Silakan aktifkan izin lokasi di pengaturan.',
        [
          { text: 'Batal', style: 'cancel' },
          { text: 'Pengaturan', onPress: () => {} },
        ]
      );
    }
  };

  if (permission?.granted) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Akses Lokasi Diperlukan</Text>
      <Text style={styles.description}>
        Kami butuh lokasi Anda untuk menampilkan toko terdekat secara akurat dan menghitung ongkos kirim.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleRequestPermission}>
        <Text style={styles.buttonText}>Berikan Izin Lokasi</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976D2',
  },
  description: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 12,
    lineHeight: 18,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});