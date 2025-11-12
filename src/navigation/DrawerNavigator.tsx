import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigationState } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent';
import { useCurrentRoute } from '../hooks/useNavigationState';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  const currentRoute = useCurrentRoute();
  
  // Kunci drawer bersyarat berdasarkan rute aktif
  const getSwipeEnabled = () => {
    const lockedRoutes = ['ProductDetail', 'Checkout'];
    return !lockedRoutes.includes(currentRoute);
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: false, // 🔥 MATIKAN HEADER DI DRAWER - biar Stack yang handle
        swipeEnabled: getSwipeEnabled(),
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={TabNavigator}
        options={{ 
          title: 'Home',
          swipeEnabled: getSwipeEnabled(),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          swipeEnabled: getSwipeEnabled(),
        }}
      />
      <Drawer.Screen
        name="Analytics"
        component={AnalyticsScreen}
        options={{
          title: 'Analytics',
          swipeEnabled: getSwipeEnabled(),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;