import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen1 } from '../screens/OnboardingScreen1';
import { OnboardingScreen2 } from '../screens/OnboardingScreen2';
import DrawerNavigator from './DrawerNavigator';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { ExtendedHomeTabs } from '../components/ExtendedHomeTabs';
import { CheckoutScreen } from '../screens/CheckoutScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { LoginScreen } from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="MainApp" component={DrawerNavigator} />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={{
          headerShown: true,
          title: 'Detail Produk',
          headerStyle: {
            backgroundColor: '#f9f9f9',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen}
        options={{
          headerShown: false, // Full screen modal
          presentation: 'modal',
        }}
      />
      <Stack.Screen 
        name="ExtendedTabs" 
        component={ExtendedHomeTabs}
        options={{
          headerShown: true,
          title: 'Semua Kategori Produk',
          headerStyle: {
            backgroundColor: '#f9f9f9',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="Analytics" 
        component={AnalyticsScreen}
        options={{
          headerShown: true,
          title: 'Analytics',
          headerStyle: {
            backgroundColor: '#f9f9f9',
          },
          headerTintColor: '#333',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;