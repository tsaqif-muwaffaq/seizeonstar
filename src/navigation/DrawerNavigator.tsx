// // src/navigation/DrawerNavigator.tsx
// import * as React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { HomeScreen } from '../screens/HomeScreen';
// import { ProfileScreen } from '../screens/ProfileScreen';
// import { SettingsScreen } from '../screens/SettingsScreen';
// import { CustomDrawerContent } from '../components/CustomDrawerContent';

// const Drawer = createDrawerNavigator();

// export const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Home"
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{
//         drawerType: 'front',
//         gestureEnabled: false, // Default locked (Soal 4)
//         swipeEnabled: false, // Default locked (Soal 4)
//       }}
//     >
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//     </Drawer.Navigator>
//   );
// };

import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
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
        // Untuk mengunci drawer, gunakan drawerLockMode di screen options
      }}
    >
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Home',
         swipeEnabled: false, // Kunci drawer (pengganti drawerLockMode)
    headerShown: false,  // Opsional, hilangkan headerKunci drawer (Soal 4)
        }}
      />
      <Drawer.Screen
  name="Profile"
  component={ProfileScreen}
  options={{
    title: 'Profile',
    headerTitle: 'Profile',
    swipeEnabled: false, // Kunci drawer
  }}
/>

     <Drawer.Screen
  name="Settings"
  component={SettingsScreen}
  options={{
    swipeEnabled: true,
    title: 'Settings',
  }}
/>

    </Drawer.Navigator>
  );
};

export default DrawerNavigator;