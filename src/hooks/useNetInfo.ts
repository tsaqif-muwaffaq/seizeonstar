import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { Alert } from 'react-native';

export interface NetworkState {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  type: string;
  details: any;
}

export const useNetInfo = () => {
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: null,
    isInternetReachable: null,
    type: 'unknown',
    details: null,
  });

  useEffect(() => {
    // Subscribe to network state changes
    const unsubscribe = NetInfo.addEventListener(state => {
      const newState = {
        isConnected: state.isConnected,
        isInternetReachable: state.isInternetReachable,
        type: state.type || 'unknown',
        details: state.details,
      };
      
      setNetworkState(newState);
      
      // Log network changes for debugging
      console.log('🌐 Network state changed:', newState);
    });

    // Fetch initial network state
    const fetchInitialState = async () => {
      try {
        const state = await NetInfo.fetch();
        setNetworkState({
          isConnected: state.isConnected,
          isInternetReachable: state.isInternetReachable,
          type: state.type || 'unknown',
          details: state.details,
        });
      } catch (error) {
        console.error('Error fetching initial network state:', error);
      }
    };

    fetchInitialState();

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return networkState;
};

// Hook specifically for checking if we should make network requests
export const useNetworkAwareFetch = () => {
  const { isConnected, isInternetReachable, type } = useNetInfo();
  
  const canMakeRequests = Boolean(isConnected && isInternetReachable);
  const isCellular = type === 'cellular';
  
  return {
    canMakeRequests,
    isCellular,
    networkType: type,
    isOnline: canMakeRequests,
  };
};