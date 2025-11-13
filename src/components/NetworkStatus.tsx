import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNetInfo } from '../hooks/useNetInfo';

export const NetworkStatus: React.FC = () => {
  const { isConnected, isInternetReachable, type } = useNetInfo();

  if (isConnected === null) {
    return null; // Still loading
  }

  const isOnline = isConnected && isInternetReachable;
  const statusColor = isOnline ? '#4CAF50' : '#F44336';
  const statusText = isOnline ? 'Online' : 'Offline';
  const connectionType = type && type !== 'unknown' ? `(${type})` : '';

  return (
    <View style={[styles.container, { backgroundColor: statusColor }]}>
      <Text style={styles.text}>
        {statusText} {connectionType}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'center',
    marginVertical: 8,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});