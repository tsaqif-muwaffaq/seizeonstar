// // src/components/CustomDrawerContent.tsx
// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { DrawerContentScrollView } from '@react-navigation/drawer';

// export const CustomDrawerContent = (props: any) => {
//   const user = {
//     name: 'John Doe',
//     avatar: 'https://via.placeholder.com/100x100?text=User',
//     email: 'john.doe@example.com'
//   };

//   const handleLogout = () => {
//     props.navigation.closeDrawer();
//     console.log('User logged out');
//   };

//   return (
//     <DrawerContentScrollView {...props} style={styles.container}>
//       {/* User Profile Section */}
//       <View style={styles.userSection}>
//         <Image 
//           source={{ uri: user.avatar }} 
//           style={styles.avatar} 
//         />
//         <Text style={styles.userName}>{user.name}</Text>
//         <Text style={styles.userEmail}>{user.email}</Text>
//       </View>

//       {/* Menu Items */}
//       <TouchableOpacity
//         style={styles.menuItem}
//         onPress={() => props.navigation.navigate('Home')}
//       >
//         <Text style={styles.menuText}>Home</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.menuItem}
//         onPress={() => props.navigation.navigate('Settings')}
//       >
//         <Text style={styles.menuText}>Settings</Text>
//       </TouchableOpacity>

//       {/* Divider */}
//       <View style={styles.divider} />

//       {/* Logout Button */}
//       <TouchableOpacity
//         style={styles.logoutButton}
//         onPress={handleLogout}
//       >
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </DrawerContentScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 50,
//   },
//   userSection: {
//     alignItems: 'center',
//     marginBottom: 30,
//     padding: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   avatar: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   userName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   userEmail: {
//     fontSize: 14,
//     color: '#666',
//   },
//   menuItem: {
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   menuText: {
//     fontSize: 16,
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#e0e0e0',
//     marginVertical: 20,
//     marginHorizontal: 20,
//   },
//   logoutButton: {
//     paddingVertical: 15,
//     marginHorizontal: 20,
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//     marginTop: 'auto',
//     marginBottom: 30,
//   },
//   logoutText: {
//     fontSize: 16,
//     color: '#E53935',
//     fontWeight: 'bold',
//   },
// });

import * as React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

interface CustomDrawerContentProps {
  navigation: any;
}

export const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const user = {
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/100x100?text=User',
    email: 'john.doe@example.com'
  };

  const handleLogout = () => {
    props.navigation.closeDrawer();
    console.log('User logged out');
  };

  const menuItems = [
    { name: 'Home', label: 'Home' },
    { name: 'Profile', label: 'Profile' },
    { name: 'Settings', label: 'Settings' },
  ];

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* User Profile Section - SOAL 1 */}
      <View style={styles.userSection}>
        <Image 
          source={{ uri: user.avatar }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Menu Items */}
      {menuItems.map((item) => (
        <TouchableOpacity
          key={item.name}
          style={styles.menuItem}
          onPress={() => {
            props.navigation.navigate(item.name);
            // Tutup drawer setelah navigasi
            props.navigation.closeDrawer();
          }}
        >
          <Text style={styles.menuText}>{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Divider */}
      <View style={styles.divider} />

      {/* Logout Button - SOAL 1 */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 50,
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  menuItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
    marginHorizontal: 20,
  },
  logoutButton: {
    paddingVertical: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    marginTop: 'auto',
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    color: '#E53935',
    fontWeight: '600',
  },
});