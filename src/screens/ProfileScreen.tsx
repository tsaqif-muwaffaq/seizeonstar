import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export const ProfileScreen: React.FC = () => {
  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Profil Saya</Text>
      
      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://via.placeholder.com/100x100?text=User' }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Pengguna</Text>
        <Text style={styles.userEmail}>user@example.com</Text>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Akun</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Edit Profil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Alamat Pengiriman</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Pembayaran</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuSection}>
        <Text style={styles.sectionTitle}>Aplikasi</Text>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Notifikasi</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Privasi & Keamanan</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Bantuan & Dukungan</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={[globalStyles.button, globalStyles.buttonDanger, styles.logoutButton]}>
        <Text style={globalStyles.buttonText}>Keluar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  menuItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuText: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});