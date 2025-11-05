// import React from 'react';
import * as React from 'react';
import { useState } from 'react';

import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { globalStyles } from './src/styles/globalStyles';
import { HomeScreen } from './src/screens/HomeScreen';


const App: React.FC = () => {
  return (
   <SafeAreaView style={globalStyles.container}>
   <StatusBar barStyle="dark-content" backgroundColor="#f9f9f9" />
      <HomeScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
});
