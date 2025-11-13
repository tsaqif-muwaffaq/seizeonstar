// import * as React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { apiClient } from '../api/apiClient';
// import { LoginCredentials, LoginResponse } from '../types/User';
// import { useNetInfo } from '../hooks/useNetInfo';
// import { NetworkStatus } from '../components/NetworkStatus';
// import { globalStyles } from '../styles/globalStyles';

// export const LoginScreen: React.FC = () => {
//   const navigation = useNavigation();
//   const { isConnected, isInternetReachable } = useNetInfo();
//   const [credentials, setCredentials] = React.useState<LoginCredentials>({
//     username: '',
//     password: '',
//   });
//   const [loading, setLoading] = React.useState(false);

//   const isOnline = isConnected && isInternetReachable;

//   const handleLogin = async () => {
//     if (!isOnline) {
//       Alert.alert('Offline', 'Tidak dapat login - Periksa koneksi internet Anda');
//       return;
//     }

//     if (!credentials.username || !credentials.password) {
//       Alert.alert('Error', 'Harap isi username dan password');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Using the configured axios instance with interceptors
//       const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
      
//       console.log('✅ Login successful! Token:', response.data.token);
      
//       Alert.alert(
//         'Login Berhasil', 
//         `Token: ${response.data.token}\n\nLihat konsol untuk detail lengkap.`
//       );

//       // Navigate to main app
//       navigation.navigate('MainApp' as never);
      
//     } catch (error: any) {
//       console.error('❌ Login error:', error);
      
//       let errorMessage = 'Login gagal';
//       if (error.response?.data?.message) {
//         errorMessage = error.response.data.message;
//       } else if (error.message) {
//         errorMessage = error.message;
//       }
      
//       Alert.alert('Login Gagal', errorMessage);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('MainApp' as never);
//   };

//   // Demo credentials helper
//   const fillDemoCredentials = () => {
//     setCredentials({
//       username: 'tsaqif',
//       password: '301106',
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <NetworkStatus />
      
//       <Text style={styles.title}>Login</Text>
//       <Text style={styles.subtitle}>Silakan login untuk melanjutkan</Text>

//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Username"
//           value={credentials.username}
//           onChangeText={(text) => setCredentials(prev => ({ ...prev, username: text }))}
//           autoCapitalize="none"
//         />
        
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           value={credentials.password}
//           onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
//           secureTextEntry
//         />

//         <TouchableOpacity
//           style={[
//             globalStyles.button, 
//             globalStyles.buttonPrimary, 
//             styles.loginButton,
//             (!isOnline || loading) && styles.disabledButton
//           ]}
//           onPress={handleLogin}
//           disabled={!isOnline || loading}
//         >
//           <Text style={globalStyles.buttonText}>
//             {loading ? 'Loading...' : 'Login dengan Axios'}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.demoButton, (!isOnline || loading) && styles.disabledButton]}
//           onPress={fillDemoCredentials}
//           disabled={!isOnline || loading}
//         >
//           <Text style={styles.demoButtonText}>Isi Demo Credentials</Text>
//         </TouchableOpacity>

//         <Text style={styles.demoHint}>
//           Demo: username: tsaqif, password: 301106
//         </Text>
//       </View>

//       <TouchableOpacity
//         style={[globalStyles.button, styles.skipButton]}
//         onPress={handleSkip}
//       >
//         <Text style={styles.skipText}>Lewati Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f9f9f9',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   form: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     fontSize: 16,
//     backgroundColor: '#fff',
//   },
//   loginButton: {
//     marginBottom: 12,
//     width: '100%',
//   },
//   disabledButton: {
//     opacity: 0.6,
//   },
//   demoButton: {
//     padding: 12,
//     backgroundColor: '#FF9800',
//     borderRadius: 8,
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   demoButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   demoHint: {
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//     fontStyle: 'italic',
//   },
//   skipButton: {
//     backgroundColor: 'transparent',
//     borderWidth: 1,
//     borderColor: '#2196F3',
//     width: '100%',
//   },
//   skipText: {
//     color: '#2196F3',
//     fontWeight: 'bold',
//   },
// });

import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { apiClient } from '../api/apiClient';
import { LoginCredentials, LoginResponse, User } from '../types/User';
import { useNetInfo } from '../hooks/useNetInfo';
import { NetworkStatus } from '../components/NetworkStatus';
import { globalStyles } from '../styles/globalStyles';

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const { isConnected, isInternetReachable } = useNetInfo();
  const [credentials, setCredentials] = React.useState<LoginCredentials>({
    username: 'kminchelle',
    password: '0lelplR',
  });
  const [loading, setLoading] = React.useState(false);

  const isOnline = isConnected && isInternetReachable;

  const handleLogin = async () => {
    if (!isOnline) {
      Alert.alert('Offline', 'Tidak dapat login - Periksa koneksi internet Anda');
      return;
    }

    if (!credentials.username || !credentials.password) {
      Alert.alert('Error', 'Harap isi username dan password');
      return;
    }

    setLoading(true);

    try {
      console.log('📤 Sending login request with:', credentials);
      
      const response = await apiClient.post('/auth/login', {
        username: credentials.username,
        password: credentials.password,
      });
      
      console.log('✅ Login successful! Response:', response.data);

      // Transform response to match your LoginResponse type
      const userData: User = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        gender: response.data.gender,
        image: response.data.image,
      };

      const loginData: LoginResponse = {
        success: true,
        token: response.data.token || response.data.accessToken,
        user: userData,
      };
      
      Alert.alert(
        'Login Berhasil', 
        `Welcome ${loginData.user?.firstName} ${loginData.user?.lastName}!`
      );

      console.log('🔑 Token received:', loginData.token);
      console.log('👤 User data:', loginData.user);

      // Navigate to main app
      navigation.navigate('MainApp' as never);
      
    } catch (error: any) {
      console.error('❌ Login error details:', {
        fullError: error,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      let errorMessage = 'Login gagal';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Login Gagal', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigation.navigate('MainApp' as never);
  };

  const fillDemoCredentials = () => {
    setCredentials({
      username: 'kminchelle',
      password: '0lelplR',
    });
  };

  const fillAlternativeDemo = () => {
    setCredentials({
      username: 'emilys',
      password: 'emilyspass',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <NetworkStatus />
        
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Silakan login untuk melanjutkan</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={credentials.username}
            onChangeText={(text) => setCredentials(prev => ({ ...prev, username: text }))}
            autoCapitalize="none"
            editable={!loading}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={credentials.password}
            onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
            secureTextEntry
            editable={!loading}
          />

          <TouchableOpacity
            style={[
              globalStyles.button, 
              globalStyles.buttonPrimary, 
              styles.loginButton,
              (!isOnline || loading) && styles.disabledButton
            ]}
            onPress={handleLogin}
            disabled={!isOnline || loading}
          >
            <Text style={globalStyles.buttonText}>
              {loading ? 'Loading...' : 'Login dengan Axios'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.demoButton, (!isOnline || loading) && styles.disabledButton]}
            onPress={fillDemoCredentials}
            disabled={!isOnline || loading}
          >
            <Text style={styles.demoButtonText}>Isi Demo Credentials (kminchelle)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.demoButton, styles.alternativeDemo, (!isOnline || loading) && styles.disabledButton]}
            onPress={fillAlternativeDemo}
            disabled={!isOnline || loading}
          >
            <Text style={styles.demoButtonText}>Isi Demo Credentials (emilys)</Text>
          </TouchableOpacity>

          <View style={styles.credentialInfo}>
            <Text style={styles.demoHintTitle}>Demo Credentials yang Valid:</Text>
            <Text style={styles.demoHint}>• Username: kminchelle, Password: 0lelplR</Text>
            <Text style={styles.demoHint}>• Username: emilys, Password: emilyspass</Text>
            <Text style={styles.note}>Menggunakan DummyJSON Auth API</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[globalStyles.button, styles.skipButton]}
          onPress={handleSkip}
          disabled={loading}
        >
          <Text style={styles.skipText}>Lewati Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  loginButton: {
    marginBottom: 12,
    width: '100%',
  },
  disabledButton: {
    opacity: 0.6,
  },
  demoButton: {
    padding: 12,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
  },
  alternativeDemo: {
    backgroundColor: '#4CAF50',
  },
  demoButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  credentialInfo: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  demoHintTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  demoHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  note: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 4,
  },
  skipButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2196F3',
    width: '100%',               
  },
  skipText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});