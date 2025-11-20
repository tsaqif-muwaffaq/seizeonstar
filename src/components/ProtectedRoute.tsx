import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import TokenManager from '../utils/tokenManager';
import { RootStackParamList } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute();
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      setIsChecking(true);
      
      const token = await TokenManager.getToken();
      const isExpired = await TokenManager.isTokenExpired();
      
      if (!token || isExpired) {
        console.log('Authentication required, redirecting to login');
        
        // Store the intended route for redirect after login
        const currentRoute = route.name;
        const params = (route.params as any) || {};
        
        navigation.reset({
          index: 0,
          routes: [{ 
            name: 'Login', 
            params: { 
              redirectTo: currentRoute as keyof RootStackParamList,
              redirectParams: params
            }
          }],
        });
        
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
      navigation.navigate('Login');
    } finally {
      setIsChecking(false);
    }
  };

  if (isChecking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 10, color: '#666' }}>Checking authentication...</Text>
      </View>
    );
  }

  if (!isAuthenticated) {
    return fallback ? <>{fallback}</> : null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;