// import * as React from 'react';
// import { useRef, useEffect } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ActivityIndicator, View, Text, Linking } from 'react-native';
// import useAuth from '../hooks/useAuth';
// import linkingConfig from './linkingConfig';
// import DeepLinkService from '../services/deepLinkService';

// // Screens
// import SplashScreen from '../screens/SplashScreen';
// import LoginScreen from '../screens/LoginScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProductScreen from '../screens/ProductScreen';
// import CartScreen from '../screens/CartScreen';
// import ProfileScreen from '../screens/ProfileScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// // Main App Tabs (protected)
// const AppTabs = () => {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Cart" component={CartScreen} />
//       <Tab.Screen name="Profile" component={ProfileScreen} />
//     </Tab.Navigator>
//   );
// };

// // Loading component
// const LoadingScreen = () => (
//   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
//     <ActivityIndicator size="large" color="#007AFF" />
//     <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>Loading...</Text>
//   </View>
// );

// const RootNavigator = () => {
//   const { isAuthenticated, isLoading } = useAuth();
  
//   // FIX: Provide initialValue null untuk useRef
//   const navigationRef = useRef<any>(null);

//   // Handle warm start deep links
//   useEffect(() => {
//     if (!isLoading && isAuthenticated && navigationRef.current) {
//       const handleUrl = async ({ url }: { url: string }) => {
//         console.log('Warm start URL received:', url);
//         await DeepLinkService.handleWarmStart(url, navigationRef.current);
//       };

//       const subscription = Linking.addEventListener('url', handleUrl);

//       // Test deep links in development
//       if (__DEV__) {
//         DeepLinkService.testDeepLinks();
//       }

//       return () => {
//         subscription.remove();
//       };
//     }
//   }, [isLoading, isAuthenticated]);

//   if (isLoading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <NavigationContainer
//       ref={navigationRef}
//       linking={linkingConfig}
//       fallback={<LoadingScreen />}
//       onStateChange={(state) => {
//         // Log navigation state for debugging
//         console.log('Navigation state changed:', state);
//       }}
//     >
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isAuthenticated ? (
//           // Authenticated flow
//           <>
//             <Stack.Screen name="AppTabs" component={AppTabs} />
//             <Stack.Screen 
//               name="Product" 
//               component={ProductScreen}
//               options={{ 
//                 headerShown: true, 
//                 title: 'Product Details',
//                 headerBackTitle: 'Back'
//               }}
//             />
//             <Stack.Screen 
//               name="Cart" 
//               component={CartScreen}
//               options={{ 
//                 headerShown: true, 
//                 title: 'Shopping Cart',
//                 headerBackTitle: 'Back'
//               }}
//             />
//             <Stack.Screen 
//               name="Profile" 
//               component={ProfileScreen}
//               options={{ 
//                 headerShown: true, 
//                 title: 'User Profile',
//                 headerBackTitle: 'Back'
//               }}
//             />
//           </>
//         ) : (
//           // Unauthenticated flow
//           <>
//             <Stack.Screen name="Splash" component={SplashScreen} />
//             <Stack.Screen name="Login" component={LoginScreen} />
//           </>
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default RootNavigator;

import * as React from 'react';
import { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View, Text, Linking } from 'react-native';
import useAuth from '../hooks/useAuth';
import linkingConfig from './linkingConfig';
import DeepLinkService from '../services/deepLinkService';

// Screens
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Main App Tabs (protected) - TANPA ProductScreen di sini
const AppTabs = () => {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        }
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarLabel: 'Cart',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

// Loading component
const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
    <ActivityIndicator size="large" color="#007AFF" />
    <Text style={{ marginTop: 10, fontSize: 16, color: '#666' }}>Loading...</Text>
  </View>
);

const RootNavigator = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  const navigationRef = useRef<any>(null);

  // Handle warm start deep links
  useEffect(() => {
    if (!isLoading && isAuthenticated && navigationRef.current) {
      const handleUrl = async ({ url }: { url: string }) => {
        console.log('Warm start URL received:', url);
        await DeepLinkService.handleWarmStart(url, navigationRef.current);
      };

      const subscription = Linking.addEventListener('url', handleUrl);

      // Test deep links in development
      if (__DEV__) {
        setTimeout(() => {
          DeepLinkService.testDeepLinks();
        }, 2000);
      }

      return () => {
        subscription.remove();
      };
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      linking={linkingConfig}
      fallback={<LoadingScreen />}
      onStateChange={(state) => {
        console.log('Navigation State:', state);
      }}
      onReady={() => {
        console.log('Navigation is ready');
      }}
    >
      <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        {isAuthenticated ? (
          // Authenticated flow - ProductScreen DI LUAR Tab Navigator
          <>
            <Stack.Screen name="AppTabs" component={AppTabs} />
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
              name="Profile" 
              component={ProfileScreen}
              options={{ 
                headerShown: true, 
                title: 'User Profile',
                headerBackTitle: 'Back'
              }}
            />
          </>
        ) : (
          // Unauthenticated flow
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;