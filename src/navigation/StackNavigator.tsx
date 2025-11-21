import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthContext } from '../context/AuthContext';
import LoadingIndicator from '../components/LoadingIndicator';

// Import screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductUploadScreen from '../screens/ProductUploadScreen';
import ProfileImageScreen from '../screens/ProfileImageScreen';
import ProductListScreen from '../screens/ProductListScreen';

const Stack = createNativeStackNavigator();

const StackNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) {
    return <LoadingIndicator visible={true} text="Loading..." />;
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      {isAuthenticated ? (
        // Authenticated flow
        <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen 
            name="Product" 
            component={ProductScreen}
            options={{ 
              headerShown: true, 
              title: 'Product Details',
              headerBackTitle: 'Back',
              presentation: 'card'
            }}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen}
            options={{ 
              headerShown: true, 
              title: 'Shopping Cart',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
            options={{ 
              headerShown: true, 
              title: 'Checkout',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ 
              headerShown: true, 
              title: 'User Profile',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="ProductUpload" 
            component={ProductUploadScreen}
            options={{ 
              headerShown: true, 
              title: 'Upload Product',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="ProfileImage" 
            component={ProfileImageScreen}
            options={{ 
              headerShown: true, 
              title: 'Profile Photo',
              headerBackTitle: 'Back'
            }}
          />
          <Stack.Screen 
            name="ProductList" 
            component={ProductListScreen}
            options={{ 
              headerShown: true, 
              title: 'All Products',
              headerBackTitle: 'Back'
            }}
          />
        </>
      ) : (
        // Unauthenticated flow
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              headerShown: false,
              animation: 'fade'
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;