import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useAuth from '../hooks/useAuth';
import { RootStackParamList, LoginRedirectParams } from '../types';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const route = useRoute();
  const { login } = useAuth();

  // Get redirect parameters from deep links or protected routes
  const redirectParams = route.params as LoginRedirectParams | undefined;

  useEffect(() => {
    if (redirectParams?.redirectTo) {
      console.log('Login screen opened with redirect to:', redirectParams.redirectTo);
    }
  }, [redirectParams]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setIsLoggingIn(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        Alert.alert('Success', 'Login successful!');
        
        // Handle redirect after successful login
        if (redirectParams?.redirectTo) {
          console.log('Redirecting to:', redirectParams.redirectTo, 'with params:', redirectParams.redirectParams);
          
          // Navigate to the intended route with parameters
          navigation.reset({
            index: 0,
            routes: [
              { 
                name: 'AppTabs',
                params: { 
                  screen: redirectParams.redirectTo,
                  params: redirectParams.redirectParams 
                }
              }
            ],
          });
        } else {
          // Default navigation to home
          navigation.reset({
            index: 0,
            routes: [{ name: 'AppTabs' }],
          });
        }
      } else {
        Alert.alert('Error', 'Login failed. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleTestLogin = (testEmail: string, testPassword: string) => {
    setEmail(testEmail);
    setPassword(testPassword);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to your account</Text>
        
        {redirectParams?.redirectTo && (
          <View style={styles.redirectNotice}>
            <Text style={styles.redirectText}>
              Authentication required to access {redirectParams.redirectTo}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          autoComplete="email"
        />
        
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoComplete="password"
        />
        
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={styles.testAccounts}>
          <Text style={styles.testTitle}>Test Accounts (Click to fill):</Text>
          
          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => handleTestLogin('user@example.com', 'password123')}
          >
            <Text style={styles.testButtonText}>Regular User</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.testButton}
            onPress={() => handleTestLogin('admin@example.com', 'admin123')}
          >
            <Text style={styles.testButtonText}>Admin User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.features}>
        <Text style={styles.featuresTitle}>Authentication Features:</Text>
        <Text style={styles.featureItem}>• Secure Token Storage (Keychain)</Text>
        <Text style={styles.featureItem}>• Automatic Token Expiry Handling</Text>
        <Text style={styles.featureItem}>• Protected Route Redirects</Text>
        <Text style={styles.featureItem}>• Deep Link Authentication Flow</Text>
        <Text style={styles.featureItem}>• Session Management</Text>
      </View>

      <View style={styles.deepLinkInfo}>
        <Text style={styles.infoTitle}>Deep Link Authentication Flow</Text>
        <Text style={styles.infoText}>
          When accessing protected routes via deep links:{'\n'}
          1. App checks authentication token{'\n'}
          2. If expired/missing → redirects to login{'\n'}
          3. After login → automatically navigates to target{'\n'}
          4. Token stored securely in device Keychain
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    padding: 30,
    paddingTop: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  redirectNotice: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff3cd',
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  redirectText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  testAccounts: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  testTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  testButton: {
    backgroundColor: '#6c757d',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 5,
  },
  testButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  features: {
    padding: 20,
    margin: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  featureItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  deepLinkInfo: {
    padding: 20,
    margin: 20,
    backgroundColor: '#e7f3ff',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default LoginScreen;