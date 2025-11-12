import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
// Pastikan import ini sesuai dengan yang Anda gunakan
import { 
  DrawerContentScrollView, 
  DrawerItemList, 
  DrawerContentComponentProps 
} from '@react-navigation/drawer'; 
import { useNavigation } from '@react-navigation/native';

// Ganti 'any' dengan tipe data navigasi yang benar jika Anda menggunakannya
type CustomDrawerContentProps = DrawerContentComponentProps; 

export const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
  const navigation = useNavigation();

  // Data user simulasi
  const user = {
    name: 'John Doe',
    avatar: 'https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180',
    email: 'john.doe@example.com'
  };

  const handleLogout = () => {
    // Logika logout Anda
    props.navigation.closeDrawer();
    console.log('User logged out');
    // Tambahkan navigasi ke Login Screen jika ada:
    // navigation.navigate('Login'); 
  };

  // Contoh item menu tambahan yang ingin di-customize
  const customMenuItems = [
    { label: 'Tentang Aplikasi', target: 'About' },
    { label: 'Pengaturan Akun', target: 'Settings' },
  ];

  const navigateToScreen = (screenName: string) => {
    props.navigation.closeDrawer();
    // Gunakan fungsi navigate, asumsikan 'About' dan 'Settings' ada di RootStack
    // Perlu disesuaikan dengan navigasi yang ada di app Anda
    // navigation.navigate(screenName as any);
    console.log(`Navigasi ke: ${screenName}`);
  };

  return (
    <DrawerContentScrollView 
      {...props} 
      contentContainerStyle={styles.container}
    >
      {/* User Profile Section */}
      <View style={styles.userSection}>
        <Image 
          source={{ uri: user.avatar }} 
          style={styles.avatar} 
        />
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>

      {/* Item List Bawaan Drawer (Home, dll.) */}
      <DrawerItemList {...props} />
      
      {/* Divider */}
      <View style={styles.divider} />

      {/* Custom Menu Items */}
      <ScrollView>
        {customMenuItems.map((item) => (
          <TouchableOpacity
            key={item.target}
            style={styles.menuItem}
            onPress={() => navigateToScreen(item.target)}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Logout Button */}
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
    backgroundColor: '#fff', // Pastikan background putih
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 20,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0', // Border lebih halus
    backgroundColor: '#f8f9fa', // Background section profil
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2, // Tambahkan border
    borderColor: '#007AFF', // Warna border biru
  },
  userName: {
    fontSize: 18,
    fontWeight: '700', // Lebih tebal
    marginBottom: 4,
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#6c757d', // Warna teks lebih netral
  },
  menuItem: {
    paddingVertical: 18, // Padding lebih besar
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500', // Sedikit lebih tebal
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef', // Warna divider lebih lembut
    marginVertical: 20,
    marginHorizontal: 20,
  },
  logoutButton: {
    paddingVertical: 16,
    marginHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#ffe5e5', // Background tombol logout yang lembut
    borderRadius: 10, // Sudut lebih melengkung
    marginTop: 'auto', // Dorong ke bawah
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    color: '#dc3545', // Warna merah yang lebih standar
    fontWeight: '700',
  },
});