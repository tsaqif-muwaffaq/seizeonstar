// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { globalStyles } from '../styles/globalStyles';

// interface OnboardingScreen1Props {
//   navigation: any;
// }

// export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Image 
//         source={{ uri: 'https://via.placeholder.com/300x300?text=Welcome' }}
//         style={styles.image}
//       />
//       <Text style={styles.title}>Selamat Datang</Text>
//       <Text style={styles.description}>
//         Temukan produk terbaik dengan harga terjangkau hanya di aplikasi kami
//       </Text>
      
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity 
//           style={[globalStyles.button, globalStyles.buttonPrimary]}
//           onPress={() => navigation.navigate('Onboarding2')}
//         >
//           <Text style={globalStyles.buttonText}>Lanjut</Text>
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.button, styles.skipButton]}
//           onPress={() => navigation.replace('MainApp')}
//         >
//           <Text style={styles.skipText}>Lewati</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   image: {
//     width: 250,
//     height: 250,
//     marginBottom: 30,
//     borderRadius: 125,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   description: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 40,
//     lineHeight: 24,
//   },
//   buttonContainer: {
//     width: '100%',
//     gap: 10,
//   },
//   button: {
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   skipButton: {
//     backgroundColor: 'transparent',
//   },
//   skipText: {
//     color: '#2196F3',
//     fontWeight: 'bold',
//   },
// });

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

interface OnboardingScreen1Props {
  navigation: any;
}

export const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/300x300?text=Welcome' }}
        style={styles.image}
      />
      <Text style={styles.title}>Selamat Datang</Text>
      <Text style={styles.description}>
        Temukan produk terbaik dengan harga terjangkau hanya di aplikasi kami
      </Text>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[globalStyles.button, globalStyles.buttonPrimary]}
          onPress={() => navigation.navigate('Onboarding2')}
        >
          <Text style={globalStyles.buttonText}>Lanjut</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.skipButton]}
          onPress={() => navigation.navigate('MainTabs')} // DIUBAH: navigate ke 'HomeTab'
        >
          <Text style={styles.skipText}>Lewati</Text>
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
  skipButton: {
    backgroundColor: 'transparent',
  },
  skipText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});