import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AnalyticsScreen } from '../screens/AnalyticsScreen';

const Tab = createBottomTabNavigator();

// Custom Tab Icon Component
const TabIcon: React.FC<{ focused: boolean; name: string }> = ({ focused, name }) => {
  const getIcon = () => {
    switch (name) {
      case 'Katalog': return '🏠';
      case 'Profil': return '👤';
      case 'Analytics': return '📊';
      default: return '🔍';
    }
  };

  return (
    <View style={styles.tabIconContainer}>
      <Text style={[styles.tabIcon, focused && styles.tabIconFocused]}>
        {getIcon()}
      </Text>
    </View>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let label = 'Katalog';
          if (route.name === 'ProfileTab') label = 'Profil';
          if (route.name === 'AnalyticsTab') label = 'Analytics';

          return <TabIcon focused={focused} name={label} />;
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, // 🔥 MATIKAN HEADER DI TAB NAVIGATOR
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Katalog',
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profil',
        }}
      />
      <Tab.Screen 
        name="AnalyticsTab" 
        component={AnalyticsScreen}
        options={{
          tabBarLabel: 'Analytics',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    fontSize: 20,
    color: 'gray',
  },
  tabIconFocused: {
    color: '#2196F3',
  },
});

export default TabNavigator;