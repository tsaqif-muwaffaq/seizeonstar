import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { useAuthContext } from '../context/AuthContext';
import { useBiometric } from '../hooks/useBiometric';
import { BiometricButton } from '../components/BiometricAuth/BiometricButton';
import { BiometricSetup } from '../components/BiometricAuth/BiometricSetup';

export const HomeScreen: React.FC<any> = ({ navigation }) => {
  const { user, logout, hasStoredCredentials } = useAuthContext();
  const { biometricInfo, isAvailable } = useBiometric();

  const handleLogout = async () => {
    Alert.alert(
      'Konfirmasi Logout',
      'Apakah Anda yakin ingin logout?',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
          }
        }
      ]
    );
  };

  const handleTestBiometric = async () => {
    Alert.alert('Biometric', 'Fitur biometric siap digunakan!');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          Selamat Datang, {user?.username || 'User'}!
        </Text>

        {/* Info Biometric */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Status Keamanan</Text>
          <Text style={styles.infoText}>
            {isAvailable 
              ? `✅ ${biometricInfo.biometryType} tersedia`
              : '❌ Biometric tidak tersedia'
            }
          </Text>
          <Text style={styles.infoText}>
            {hasStoredCredentials 
              ? '✅ Credentials tersimpan dengan aman'
              : '❌ Belum ada credentials tersimpan'
            }
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Transfer')}>
            <Text style={styles.actionButtonText}>💰 Transfer</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.actionButtonText}>👤 Profil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Location')}>
            <Text style={styles.actionButtonText}>📍 Fitur Lokasi</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ProductUpload')}>
            <Text style={styles.actionButtonText}>📦 Upload Produk</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('ProfileImage')}>
            <Text style={styles.actionButtonText}>🖼️ Foto Profil</Text>
          </TouchableOpacity>

          <BiometricButton
            onPress={handleTestBiometric}
            title="Tes Biometric"
            context="untuk Tes"
          />
        </View>

        {/* Biometric Setup Prompt */}
        {!isAvailable && (
          <BiometricSetup />
        )}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1C1C1E',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 4,
  },
  actionsContainer: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});