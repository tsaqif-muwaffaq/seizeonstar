import * as React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent 
      />
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;