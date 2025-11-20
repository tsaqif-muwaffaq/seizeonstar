import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import useWishlist from '../hooks/useWishlist';
import { initializeApiKey } from '../services/api';
import StorageService from '../services/storageService';
import TokenManager from '../utils/tokenManager';
import { RootStackParamList } from '../types';

type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();
  const { loadAuthData, isAuthenticated, isLoading: authLoading } = useAuth();
  const { refresh: loadWishlist } = useWishlist();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('Initializing app...');

      // Load all data in parallel
      await Promise.allSettled([
        // 1. Initialize API Key
        initializeApiKey(),

        // 2. Load authentication data
        loadAuthData(),

        // 3. Load wishlist data (if authenticated)
        (async () => {
          const isExpired = await TokenManager.isTokenExpired();
          if (!isExpired) {
            await loadWishlist();
          }
        })(),

        // 4. Clear expired product caches
        StorageService.clearExpiredProductCaches(),

        // 5. Simulate other startup tasks
        new Promise(resolve => setTimeout(resolve, 1000)),
      ]);

      console.log('App initialization completed');

    } catch (error) {
      console.error('App initialization failed:', error);
    } finally {
      navigateToApp();
    }
  };

  const navigateToApp = () => {
    if (!authLoading) {
      if (isAuthenticated) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'AppTabs' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>E-Commerce App</Text>
      <ActivityIndicator size="large" color="#007AFF" />
      
      <View style={styles.loadingInfo}>
        <Text style={styles.loadingText}>Loading secure data...</Text>
        <Text style={styles.subText}>Initializing app components</Text>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Features Loading:</Text>
        <Text style={styles.featureItem}>• Authentication & Token Management</Text>
        <Text style={styles.featureItem}>• Secure API Configuration</Text>
        <Text style={styles.featureItem}>• Wishlist & Cart Data</Text>
        <Text style={styles.featureItem}>• Product Cache Cleanup</Text>
        <Text style={styles.featureItem}>• Deep Link Handlers</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  loadingInfo: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#999',
  },
  features: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    width: '100%',
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default SplashScreen;