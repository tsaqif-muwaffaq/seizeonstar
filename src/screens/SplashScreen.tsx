import * as React from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Navigate based on authentication status
      const timer = setTimeout(() => {
        if (isAuthenticated) {
          navigation.navigate('AppTabs' as never);
        } else {
          navigation.navigate('Login' as never);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛍️ E-Commerce</Text>
      <Text style={styles.subtitle}>Aplikasi Belanja Terbaik</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreen;