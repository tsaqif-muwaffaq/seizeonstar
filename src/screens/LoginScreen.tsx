import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useBiometric } from '../hooks/useBiometric';
import { BiometricButton } from '../components/BiometricAuth/BiometricButton';
import { BiometricSetup } from '../components/BiometricAuth/BiometricSetup';

export const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { loginManual, loginWithBiometric, isLoading, hasStoredCredentials } = useAuth();
  const { biometricInfo, isAvailable } = useBiometric();

  useEffect(() => {
    // Auto try biometric login jika tersedia dan ada stored credentials
    if (hasStoredCredentials && isAvailable && !isLoading) {
      handleBiometricLogin();
    }
  }, [hasStoredCredentials, isAvailable, isLoading]);

  const handleManualLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Harap isi username dan password');
      return;
    }

    const result = await loginManual(username, password);
    
    if (result.success) {
      Alert.alert('Sukses', 'Login berhasil!');
    } else {
      Alert.alert('Gagal Login', result.error || 'Terjadi kesalahan');
    }
  };

  const handleBiometricLogin = async () => {
    const result = await loginWithBiometric();
    
    if (!result.success) {
      if (result.error?.includes('Tidak ada data login tersimpan')) {
        return;
      }
      Alert.alert('Gagal Login', result.error || 'Autentikasi biometric gagal');
    }
  };

  const getBiometricButtonText = () => {
    if (biometricInfo.biometryType === 'FaceID') {
      return 'Login dengan Face ID';
    } else {
      return 'Login dengan Sidik Jari';
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Selamat Datang</Text>
          <Text style={styles.subtitle}>Silakan login untuk melanjutkan</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#999"
          />

          <TouchableOpacity
            style={[styles.loginButton, isLoading && styles.buttonDisabled]}
            onPress={handleManualLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? 'Loading...' : 'Login Manual'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.demoText}>
            Demo: username: user, password: 1234
          </Text>

          {/* Biometric Login Button */}
          {isAvailable && hasStoredCredentials && (
            <BiometricButton
              onPress={handleBiometricLogin}
              title={getBiometricButtonText()}
              disabled={isLoading}
              context="untuk Login"
            />
          )}

          {/* Biometric Setup Prompt */}
          {!isAvailable && (
            <BiometricSetup />
          )}

          {/* Fallback untuk device tanpa biometric */}
          {!isAvailable && hasStoredCredentials && (
            <TouchableOpacity
              style={styles.fallbackButton}
              onPress={handleManualLogin}
              disabled={isLoading}
            >
              <Text style={styles.fallbackButtonText}>
                Login dengan Password
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: '#666666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#F8F9FA',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  demoText: {
    textAlign: 'center',
    color: '#666666',
    fontSize: 14,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  fallbackButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    marginVertical: 10,
  },
  fallbackButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});