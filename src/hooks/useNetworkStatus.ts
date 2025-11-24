import { useState, useEffect } from 'react';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
  const netInfo = useNetInfo();
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    setIsConnected(netInfo.isConnected);
    setConnectionType(netInfo.type);
  }, [netInfo]);

  return {
    isConnected,
    connectionType,
    isInternetReachable: netInfo.isInternetReachable,
    details: netInfo.details,
  };
};