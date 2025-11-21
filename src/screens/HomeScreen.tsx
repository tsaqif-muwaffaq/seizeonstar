import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.subtitle}>Temukan produk terbaik untuk Anda</Text>
      
      <View style={styles.featureGrid}>
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('ProductList' as never)}
        >
          <Text style={styles.featureIcon}>🛍️</Text>
          <Text style={styles.featureText}>Belanja</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('Cart' as never)}
        >
          <Text style={styles.featureIcon}>🛒</Text>
          <Text style={styles.featureText}>Keranjang</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('Profile' as never)}
        >
          <Text style={styles.featureIcon}>👤</Text>
          <Text style={styles.featureText}>Profil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.featureCard}
          onPress={() => navigation.navigate('ProductUpload' as never)}
        >
          <Text style={styles.featureIcon}>📦</Text>
          <Text style={styles.featureText}>Jual Produk</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#F8F9FA',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});

export default HomeScreen;