import { useNavigationState } from '@react-navigation/native';

export const useRootParams = () => {
  const rootParams = useNavigationState((state) => {
    // Akses parameter dari global state (simulasi)
    return {
      userID: (global as any).userID || undefined
    };
  });

  return rootParams;
};

export const useCurrentRoute = () => {
  const currentRoute = useNavigationState((state) => {
    const getActiveRoute = (routeState: any): string => {
      if (!routeState) return '';
      const route = routeState.routes[routeState.index];
      if (route.state) {
        return getActiveRoute(route.state);
      }
      return route.name;
    };

    return getActiveRoute(state);
  });

  return currentRoute;
};