import * as React from 'react';
import { NavigationContainer as RNNavigationContainer } from '@react-navigation/native';
import { AnalyticsScreen } from 'src/screens/AnalyticsScreen';

interface NavigationContainerProps {
  children: React.ReactNode;
}

export const NavigationContainer: React.FC<NavigationContainerProps> = ({ children }) => {
  const [analyticsHistory, setAnalyticsHistory] = React.useState<string[]>([]);

  const handleStateChange = (state: any) => {
    if (state && state.routes && state.routes.length > 0) {
      const currentRoute = state.routes[state.index];
      const routeName = getActiveRouteName(currentRoute);
      
      if (routeName) {
        const analyticsMessage = `[ANALYTICS] Rute dikunjungi: ${routeName}`;
        console.log(analyticsMessage);
        
        // Simpan ke history untuk ditampilkan di AnalyticsScreen
        setAnalyticsHistory(prev => {
          const newHistory = [...prev, `${new Date().toLocaleTimeString()} - ${analyticsMessage}`];
          // Batasi history ke 50 item terakhir
          return newHistory.slice(-50);
        });
      }
    }
  };

  const getActiveRouteName = (route: any): string => {
    if (route.state) {
      return getActiveRouteName(route.state.routes[route.state.index]);
    }
    return route.name;
  };

  return (
    <RNNavigationContainer 
      onStateChange={handleStateChange}
      // Simpan history di ref untuk diakses oleh AnalyticsScreen
      ref={(ref: any) => {
        if (ref) {
          (global as any).navigationHistory = analyticsHistory;
        }
      }}
    >
      {children}
    </RNNavigationContainer>
  );
};