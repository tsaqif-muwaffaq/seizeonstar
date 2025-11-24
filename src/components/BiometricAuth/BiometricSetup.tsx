import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useBiometric } from '../../hooks/useBiometric';
import { showBiometricSetupAlert } from '../../utils/biometricUtils';

export const BiometricSetup: React.FC = () => {
  const { biometricInfo, checkBiometricAvailability } = useBiometric();

  const handleSetupPress = async () => {
    const info = await checkBiometricAvailability();
    
    if (!info.available && info.error === 'NOT_ENROLLED') {
      showBiometricSetupAlert();
    } else if (info.available) {
      Alert.alert(
        'Biometric Siap',
        'Perangkat Anda sudah mendukung autentikasi biometric. Anda dapat menggunakan fitur ini untuk login cepat.'
      );
    } else {
      Alert.alert(
        'Tidak Mendukung',
        'Perangkat Anda tidak mendukung autentikasi biometric atau terjadi error.'
      );
    }
  };

  if (biometricInfo.available) {
    return null; // Tidak perlu menampilkan setup jika sudah tersedia
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tingkatkan Keamanan</Text>
      <Text style={styles.description}>
        Aktifkan autentikasi biometric untuk login yang lebih cepat dan aman
      </Text>
      <TouchableOpacity style={styles.setupButton} onPress={handleSetupPress}>
        <Text style={styles.setupButtonText}>Atur Biometric</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#1C1C1E',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 18,
  },
  setupButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  setupButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});