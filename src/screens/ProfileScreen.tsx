// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { globalStyles } from '../styles/globalStyles';
// import { useAuthContext } from '../context/AuthContext';

// const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { isAuthenticated } = useAuthContext();
  
//   if (!isAuthenticated) {
//     return (
//       <View style={styles.authPlaceholder}>
//         <Text style={styles.authPlaceholderText}>Harap Login untuk mengakses</Text>
//         <Text style={styles.authPlaceholderSubText}>
//           Silakan login terlebih dahulu untuk melihat konten profil
//         </Text>
//       </View>
//     );
//   }
  
//   return <>{children}</>;
// };

// export const ProfileScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const { user, isAuthenticated, logout } = useAuthContext();

//   const handleLogin = () => {
//     navigation.navigate('Login' as never);
//   };

//   const handleLogout = async () => {
//     Alert.alert(
//       'Konfirmasi Logout',
//       'Apakah Anda yakin ingin logout?',
//       [
//         {
//           text: 'Batal',
//           style: 'cancel',
//         },
//         {
//           text: 'Logout',
//           style: 'destructive',
//           onPress: async () => {
//             try {
//               await logout();
//               Alert.alert('Sukses', 'Anda telah logout');
//             } catch (error) {
//               Alert.alert('Error', 'Gagal logout');
//             }
//           },
//         },
//       ]
//     );
//   };

//   return (
//     <ScrollView style={globalStyles.container}>
//       <Text style={globalStyles.title}>Profil Saya</Text>
      
//       <AuthGuard>
//         <View style={styles.profileSection}>
//           <Image 
//             source={{ uri: user?.image || 'https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180' }}
//             style={styles.avatar}
//           />
//           <Text style={styles.userName}>
//             {user ? `${user.firstName} ${user.lastName}` : 'Pengguna'}
//           </Text>
//           <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
//           <Text style={styles.authStatus}>
//             Status: {isAuthenticated ? 'Terverifikasi' : 'Belum Login'}
//           </Text>
//           {user?.id && (
//             <Text style={styles.userId}>
//               User ID: {user.id}
//             </Text>
//           )}
//         </View>

//         <View style={styles.menuSection}>
//           <Text style={styles.sectionTitle}>Akun</Text>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <Text style={styles.menuText}>Edit Profil</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <Text style={styles.menuText}>Alamat Pengiriman</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <Text style={styles.menuText}>Pembayaran</Text>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.menuSection}>
//           <Text style={styles.sectionTitle}>Aplikasi</Text>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <Text style={styles.menuText}>Notifikasi</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <Text style={styles.menuText}>Privasi & Keamanan</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity style={styles.menuItem}>
//             <Text style={styles.menuText}>Bantuan & Dukungan</Text>
//           </TouchableOpacity>
//         </View>
//       </AuthGuard>

//       {!isAuthenticated ? (
//         <TouchableOpacity 
//           style={[globalStyles.button, globalStyles.buttonPrimary, styles.loginButton]}
//           onPress={handleLogin}
//         >
//           <Text style={globalStyles.buttonText}>Login</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity 
//           style={[globalStyles.button, globalStyles.buttonDanger, styles.logoutButton]}
//           onPress={handleLogout}
//         >
//           <Text style={globalStyles.buttonText}>Keluar</Text>
//         </TouchableOpacity>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   profileSection: {
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 15,
//   },
//   userName: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   userEmail: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 10,
//   },
//   authStatus: {
//     fontSize: 14,
//     color: '#4CAF50',
//     fontWeight: '600',
//     marginBottom: 5,
//   },
//   userId: {
//     fontSize: 12,
//     color: '#999',
//     fontFamily: 'monospace',
//     backgroundColor: '#f5f5f5',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//   },
//   menuSection: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 20,
//     padding: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#333',
//   },
//   menuItem: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#f0f0f0',
//   },
//   menuText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   authPlaceholder: {
//     alignItems: 'center',
//     padding: 40,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   authPlaceholderText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#666',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   authPlaceholderSubText: {
//     fontSize: 14,
//     color: '#999',
//     textAlign: 'center',
//     lineHeight: 20,
//   },
//   loginButton: {
//     marginBottom: 10,
//   },
//   logoutButton: {
//     marginTop: 20,
//     marginBottom: 40,
//   },
// });

import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useAuth from '../hooks/useAuth';
import { useAuthContext } from '../context/AuthContext';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuthContext();

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout? All data will be cleared.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              const success = await logout();
              
              if (success) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' as never }],
                });
              } else {
                Alert.alert('Error', 'Failed to logout properly');
              }
            } catch (error) {
              Alert.alert('Error', 'An error occurred during logout');
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.label}>User ID:</Text>
        <Text style={styles.value}>{user?.id}</Text>

        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user?.name}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <View style={styles.securityInfo}>
        <Text style={styles.sectionTitle}>Security Information</Text>
        <Text style={styles.securityNote}>
          • Authentication token is securely stored in device Keychain
        </Text>
        <Text style={styles.securityNote}>
          • API keys are protected by hardware encryption
        </Text>
        <Text style={styles.securityNote}>
          • Data will be cleared upon logout
        </Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        Logout will clear: Token (Keychain) + User Data (AsyncStorage)
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userInfo: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  securityInfo: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    margin: 20,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  securityNote: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerNote: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});

export default ProfileScreen;