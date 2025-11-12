import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Simulasi login berhasil, kirim userID ke Root Drawer
    navigation.navigate('MainApp' as never);
    
    // Set timeout untuk simulate navigation dengan params
    setTimeout(() => {
      // Simpan userID di global state untuk diakses oleh ProfileScreen
      (global as any).userID = 'U123';
    }, 100);
  };

  const handleSkip = () => {
    navigation.navigate('MainApp' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Silakan login untuk melanjutkan</Text>
      
      <TouchableOpacity
        style={[globalStyles.button, globalStyles.buttonPrimary, styles.loginButton]}
        onPress={handleLogin}
      >
        <Text style={globalStyles.buttonText}>Login (Simulasi - UserID: U123)</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[globalStyles.button, styles.skipButton]}
        onPress={handleSkip}
      >
        <Text style={styles.skipText}>Lewati Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  loginButton: {
    marginBottom: 15,
    width: '100%',
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
    width: '100%',
  },
  skipText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});