import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { LoginScreen } from '../screens/LoginScreen';
import { useBiometric } from '../hooks/useBiometric';
import { Text } from 'react-native-gesture-handler';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, hasStoredCredentials, forceLogout } = useAuth();
  const { biometricInfo } = useBiometric();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Simulasi pengecekan auth state
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsChecking(false);
    };

    checkAuth();
  }, []);

  // Handle biometric lockout
  useEffect(() => {
    if (biometricInfo.error === 'LOCKED_OUT') {
      Alert.alert(
        'Keamanan',
        'Terlalu banyak percobaan biometric gagal. Untuk keamanan, Anda harus login ulang.',
        [
          {
            text: 'OK',
            onPress: () => {
              forceLogout();
            }
          }
        ]
      );
    }
  }, [biometricInfo.error, forceLogout]);

  if (isChecking) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Memuat...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666666',
  },
});