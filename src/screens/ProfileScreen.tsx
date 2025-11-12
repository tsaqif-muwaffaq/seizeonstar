import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { globalStyles } from '../styles/globalStyles';
import { useRootParams } from '../hooks/useNavigationState';

// Type untuk root params
interface RootParams {
  userID?: string;
}

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const rootParams = useRootParams() as RootParams;
  const isAuthenticated = !!rootParams?.userID;
  
  if (!isAuthenticated) {
    return (
      <View style={styles.authPlaceholder}>
        <Text style={styles.authPlaceholderText}>Harap Login untuk mengakses</Text>
        <Text style={styles.authPlaceholderSubText}>
          Silakan login terlebih dahulu untuk melihat konten profil
        </Text>
      </View>
    );
  }
  
  return <>{children}</>;
};

export const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const rootParams = useRootParams() as RootParams;
  const userID = rootParams?.userID;

  const handleLogin = () => {
    navigation.navigate('Login' as never);
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Profil Saya</Text>
      
      <AuthGuard>
        <View style={styles.profileSection}>
          <Image 
            source={{ uri: 'https://tse4.mm.bing.net/th/id/OIP.hGSCbXlcOjL_9mmzerqAbQHaHa?pid=Api&P=0&h=180' }}
            style={styles.avatar}
          />
          <Text style={styles.userName}>Pengguna #{userID}</Text>
          <Text style={styles.userEmail}>user{userID}@example.com</Text>
          <Text style={styles.authStatus}>
            Status: {userID ? 'Terverifikasi' : 'Belum Login'}
          </Text>
          {userID && (
            <Text style={styles.userId}>
              User ID: {userID}
            </Text>
          )}
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
      </AuthGuard>

      {!userID && (
        <TouchableOpacity 
          style={[globalStyles.button, globalStyles.buttonPrimary, styles.loginButton]}
          onPress={handleLogin}
        >
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

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
    marginBottom: 10,
  },
  authStatus: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 5,
  },
  userId: {
    fontSize: 12,
    color: '#999',
    fontFamily: 'monospace',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
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
  authPlaceholder: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  authPlaceholderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  authPlaceholderSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  loginButton: {
    marginBottom: 10,
  },
  logoutButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});