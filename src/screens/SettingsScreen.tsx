// // src/screens/SettingsScreen.tsx
// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
// import { globalStyles } from '../styles/globalStyles';

// export const SettingsScreen = ({ navigation }: any) => {
//   const [isDrawerLocked, setIsDrawerLocked] = React.useState(true);

//   const toggleDrawerLock = () => {
//     setIsDrawerLocked(!isDrawerLocked);
//     // In real app, update drawer lock mode via context or state management
//     console.log('Drawer locked:', !isDrawerLocked);
//   };

//   const goHomeAndCloseDrawer = () => {
//     navigation.navigate('Home');
//     navigation.closeDrawer();
//   };

//   return (
//     <View style={globalStyles.container}>
//       <Text style={styles.settingsTitle}>Settings</Text>
      
//       <View style={styles.settingItem}>
//         <Text style={styles.settingText}>Enable Swipe Gesture</Text>
//         <Switch
//           value={!isDrawerLocked}
//           onValueChange={toggleDrawerLock}
//         />
//       </View>

//       <TouchableOpacity
//         style={[globalStyles.button, globalStyles.buttonPrimary, styles.actionButton]}
//         onPress={goHomeAndCloseDrawer}
//       >
//         <Text style={globalStyles.buttonText}>Go Home & Close Drawer</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   settingsTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 30,
//     textAlign: 'center',
//   },
//   settingItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   settingText: {
//     fontSize: 16,
//   },
//   actionButton: {
//     marginTop: 30,
//   },
// });

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export const SettingsScreen = ({ navigation }: any) => {
  const [isDrawerLocked, setIsDrawerLocked] = React.useState(true);

  const toggleDrawerLock = () => {
    setIsDrawerLocked(!isDrawerLocked);
    
    // Update drawer lock mode untuk semua screen
    navigation.getParent()?.setOptions({
      drawerLockMode: !isDrawerLocked ? 'locked-closed' : 'unlocked'
    });
    
    console.log('Drawer locked:', !isDrawerLocked);
  };

  const goHomeAndCloseDrawer = () => {
    navigation.navigate('Home');
    navigation.closeDrawer();
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.settingsTitle}>Settings</Text>
      
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Enable Swipe Gesture</Text>
        <Switch
          value={!isDrawerLocked}
          onValueChange={toggleDrawerLock}
        />
      </View>

      <Text style={styles.settingDescription}>
        {isDrawerLocked 
          ? 'Drawer terkunci - gunakan tombol menu untuk membuka' 
          : 'Drawer terbuka - bisa swipe dari tepi layar'
        }
      </Text>

      <TouchableOpacity
        style={[globalStyles.button, globalStyles.buttonPrimary, styles.actionButton]}
        onPress={goHomeAndCloseDrawer}
      >
        <Text style={globalStyles.buttonText}>Go Home & Close Drawer</Text>
      </TouchableOpacity>

      {/* Tombol untuk test buka/tutup drawer */}
      <TouchableOpacity
        style={[globalStyles.button, styles.secondaryButton]}
        onPress={() => navigation.toggleDrawer()}
      >
        <Text style={globalStyles.buttonText}>Toggle Drawer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  settingsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingText: {
    fontSize: 16,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  actionButton: {
    marginTop: 20,
  },
  secondaryButton: {
    backgroundColor: '#666',
    marginTop: 10,
  },
});