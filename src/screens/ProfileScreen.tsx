import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { useBiometric } from '../hooks/useBiometric';

export const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuthContext();
  const { biometricInfo, checkBiometricAvailability } = useBiometric();

  const handleCheckBiometric = async () => {
    const info = await checkBiometricAvailability();
    Alert.alert(
      'Status Biometric',
      `Tersedia: ${info.available ? 'Ya' : 'Tidak'}\nTipe: ${info.biometryType || 'Tidak diketahui'}\nError: ${info.error || 'Tidak ada'}`,
      [{ text: 'OK' }]
    );
  };

  const handleClearStorage = () => {
    Alert.alert(
      'Bersihkan Storage',
      'Ini akan menghapus semua data tersimpan termasuk credentials. Lanjutkan?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Bersihkan', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            Alert.alert('Sukses', 'Storage berhasil dibersihkan');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profil Pengguna</Text>

        {/* User Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Informasi Akun</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Username:</Text>
            <Text style={styles.infoValue}>{user?.username}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email:</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>User ID:</Text>
            <Text style={styles.infoValue}>{user?.id}</Text>
          </View>
        </View>

        {/* Biometric Info */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Status Biometric</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tersedia:</Text>
            <Text style={styles.infoValue}>
              {biometricInfo.available ? '✅ Ya' : '❌ Tidak'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Tipe:</Text>
            <Text style={styles.infoValue}>
              {biometricInfo.biometryType || 'Tidak diketahui'}
            </Text>
          </View>
          {biometricInfo.error && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Error:</Text>
              <Text style={[styles.infoValue, styles.errorText]}>
                {biometricInfo.error}
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={styles.actionsSection}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleCheckBiometric}
          >
            <Text style={styles.actionButtonText}>Cek Status Biometric</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.warningButton]}
            onPress={handleClearStorage}
          >
            <Text style={styles.actionButtonText}>Bersihkan Storage</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.dangerButton]}
            onPress={logout}
          >
            <Text style={styles.actionButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#1C1C1E',
    fontWeight: '400',
  },
  errorText: {
    color: '#FF3B30',
  },
  actionsSection: {
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  warningButton: {
    backgroundColor: '#FF9500',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});