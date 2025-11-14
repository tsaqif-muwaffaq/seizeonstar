import { useState, useEffect } from 'react';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { NetworkState } from '../types/Product';

export const useNetworkStatus = (): NetworkState & { netInfo: NetInfoState } => {
  const netInfo = useNetInfo();
  const [networkState, setNetworkState] = useState<NetworkState>({
    isConnected: false,
    isInternetReachable: false,
  });

  useEffect(() => {
    const newState: NetworkState = {
      isConnected: netInfo.isConnected ?? false,
      isInternetReachable: netInfo.isInternetReachable ?? false,
    };
    
    setNetworkState(newState);

    // Log ketika koneksi berubah
    if (netInfo.isConnected !== null && netInfo.isInternetReachable !== null) {
      if (!netInfo.isInternetReachable) {
        console.log('Koneksi terputus. Menggunakan mode offline.');
      } else if (netInfo.isConnected) {
        console.log('Koneksi pulih. Melanjutkan operasi.');
      }
    }
  }, [netInfo.isConnected, netInfo.isInternetReachable]);

  return { ...networkState, netInfo };
};