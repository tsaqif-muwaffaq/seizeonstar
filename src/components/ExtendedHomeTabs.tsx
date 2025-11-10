import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet } from 'react-native';

const TopTab = createMaterialTopTabNavigator();

// Create tab screens for 8 categories
const PopularTab = () => (
  <View style={styles.tabContainer}>
    <Text>Popular Products</Text>
  </View>
);

const NewTab = () => (
  <View style={styles.tabContainer}>
    <Text>New Products</Text>
  </View>
);

const ElectronicsTab = () => (
  <View style={styles.tabContainer}>
    <Text>Electronics</Text>
  </View>
);

const ClothingTab = () => (
  <View style={styles.tabContainer}>
    <Text>Clothing</Text>
  </View>
);

const FoodTab = () => (
  <View style={styles.tabContainer}>
    <Text>Food</Text>
  </View>
);

const AutomotiveTab = () => (
  <View style={styles.tabContainer}>
    <Text>Automotive</Text>
  </View>
);

const EntertainmentTab = () => (
  <View style={styles.tabContainer}>
    <Text>Entertainment</Text>
  </View>
);

const BabyTab = () => {
  React.useEffect(() => {
    console.log('Baby tab focused');
    return () => console.log('Baby tab unfocused');
  }, []);

  return (
    <View style={styles.tabContainer}>
      <Text>Baby Products</Text>
    </View>
  );
};

export const ExtendedHomeTabs = () => {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        tabBarIndicatorStyle: { backgroundColor: '#2196F3' },
        tabBarLabelStyle: { textTransform: 'none', fontSize: 12 },
        lazy: true,
        lazyPreloadDistance: 1,
        swipeEnabled: true,
        tabBarScrollEnabled: true, // Enable horizontal scroll for many tabs
      }}
    >
      <TopTab.Screen name="Popular" component={PopularTab} />
      <TopTab.Screen name="New" component={NewTab} />
      <TopTab.Screen name="Electronics" component={ElectronicsTab} />
      <TopTab.Screen name="Clothing" component={ClothingTab} />
      <TopTab.Screen name="Food" component={FoodTab} />
      <TopTab.Screen name="Automotive" component={AutomotiveTab} />
      <TopTab.Screen name="Entertainment" component={EntertainmentTab} />
      <TopTab.Screen name="Baby" component={BabyTab} />
    </TopTab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});