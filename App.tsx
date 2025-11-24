import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { ProtectedRoute } from './src/components/ProtectedRoute';
import { HomeScreen } from './src/screens/HomeScreen';
import { TransferScreen } from './src/screens/TransferScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { ProductUploadScreen } from './src/screens/ProductUploadScreen';
import { ProfileImageScreen } from './src/screens/ProfileImageScreen';

// Define stack param list
export type RootStackParamList = {
  Home: undefined;
  Transfer: undefined;
  Profile: undefined;
  ProductUpload: undefined;
  ProfileImage: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainApp() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          title: 'Beranda',
          headerBackTitle: 'Kembali'
        }}
      />
      <Stack.Screen 
        name="Transfer" 
        component={TransferScreen}
        options={{ 
          title: 'Transfer',
          headerBackTitle: 'Kembali'
        }}
      />
      <Stack.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ 
          title: 'Profil',
          headerBackTitle: 'Kembali'
        }}
      />
      <Stack.Screen 
        name="ProductUpload" 
        component={ProductUploadScreen}
        options={{ 
          title: 'Upload Produk',
          headerBackTitle: 'Kembali'
        }}
      />
      <Stack.Screen 
        name="ProfileImage" 
        component={ProfileImageScreen}
        options={{ 
          title: 'Foto Profil',
          headerBackTitle: 'Kembali'
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <ProtectedRoute>
          <MainApp />
        </ProtectedRoute>
      </NavigationContainer>
    </AuthProvider>
  );
}