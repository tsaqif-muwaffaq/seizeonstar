import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import { SettingsScreen } from '../screens/SettingsScreen';
import { CustomDrawerContent } from '../components/CustomDrawerContent';

const Drawer = createDrawerNavigator();

export const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: 'front',
        headerShown: true,
        headerTitle: 'seizeonstar.catalog',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerStyle: {
          backgroundColor: '#f9f9f9',
        },
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={TabNavigator}
        options={{ 
          title: 'Home',
          swipeEnabled: false,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          swipeEnabled: true,
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;