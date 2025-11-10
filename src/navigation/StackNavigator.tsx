// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import OnboardingScreen1 from 'src/screens/OnboardingScreen1';
// import OnboardingScreen2 from 'src/screens/OnboardingScreen2';
// import TabNavigator from 'src/navigation/TabNavigator';

// const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
//       <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
//       <Stack.Screen name="MainApp" component={TabNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default StackNavigator;

// import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { OnboardingScreen1 } from '../screens/OnboardingScreen1';
// import { OnboardingScreen2 } from '../screens/OnboardingScreen2';
// import TabNavigator from './TabNavigator';

// const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
//       <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
//       <Stack.Screen name="MainApp" component={TabNavigator} />
//     </Stack.Navigator>
//   );
// };

// export default StackNavigator;

// bates awal 

// import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { OnboardingScreen1 } from '../screens/OnboardingScreen1';
// import { OnboardingScreen2 } from '../screens/OnboardingScreen2';
// import TabNavigator from './TabNavigator';

// const Stack = createNativeStackNavigator();

// const StackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
//       <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
//       <Stack.Screen name="MainTabs" component={TabNavigator} /> {/* GUNAKAN MainTabs */}
//     </Stack.Navigator>
//   );
// };

// export default StackNavigator;

// bates akhir 

import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingScreen1 } from '../screens/OnboardingScreen1';
import { OnboardingScreen2 } from '../screens/OnboardingScreen2';
import TabNavigator from './TabNavigator';
import { ExtendedHomeTabs } from '../components/ExtendedHomeTabs';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Onboarding1" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding1" component={OnboardingScreen1} />
      <Stack.Screen name="Onboarding2" component={OnboardingScreen2} />
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="ExtendedTabs" component={ExtendedHomeTabs} />
    </Stack.Navigator>
  );
};

export default StackNavigator;