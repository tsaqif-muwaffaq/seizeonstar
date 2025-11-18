import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { initializeApiKey } from '../services/api';
import { useAuthContext } from '../context/AuthContext';

const SplashScreen = () => {
  const navigation = useNavigation();
 const { loadAuthData, isAuthenticated, isLoading } = useAuthContext();
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Initialize API Key in Keychain
        await initializeApiKey();
        
        // Load auth data (hybrid storage - Keychain + AsyncStorage)
        await loadAuthData();
      } catch (error) {
        console.error('Splash: Initialization failed', error);
      }
    };

    initializeApp();
  }, [loadAuthData]);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' as never }],
        });
      } else {
        navigation.navigate('Login' as never);
      }
    }
  }, [isLoading, isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Commerce App</Text>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.subtitle}>Loading secure data...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});

export default SplashScreen;