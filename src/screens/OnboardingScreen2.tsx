import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface OnboardingScreen2Props {
  navigation: any;
}

export const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/300x300?text=Explore' }}
        style={styles.image}
      />
      <Text style={styles.title}>Jelajahi Katalog</Text>
      <Text style={styles.description}>
        Lihat berbagai produk menarik dan temukan yang sesuai dengan kebutuhan Anda
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[globalStyles.button, globalStyles.buttonPrimary]}
          onPress={() => navigation.replace('MainApp')}
        >
          <Text style={globalStyles.buttonText}>Mulai Belanja</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.backButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backText}>Kembali</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 30,
    borderRadius: 125,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 40,
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 10,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: 'transparent',
  },
  backText: {
    color: '#666',
    fontWeight: 'bold',
  },
});