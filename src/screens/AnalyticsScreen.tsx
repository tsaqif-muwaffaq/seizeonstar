import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

export const AnalyticsScreen: React.FC = () => {
  const [analyticsHistory, setAnalyticsHistory] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Ambil history dari global object
    const interval = setInterval(() => {
      if ((global as any).navigationHistory) {
        setAnalyticsHistory((global as any).navigationHistory);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Analytics History</Text>
      <Text style={styles.subtitle}>Riwayat navigasi pengguna</Text>
      
      <ScrollView style={styles.historyContainer} showsVerticalScrollIndicator={false}>
        {analyticsHistory.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Belum ada data analytics</Text>
            <Text style={styles.emptySubtext}>
              Navigasi ke berbagai screen untuk melihat riwayat di sini
            </Text>
          </View>
        ) : (
          analyticsHistory.map((log, index) => (
            <View key={index} style={styles.logItem}>
              <Text style={styles.logText}>{log}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <View style={styles.stats}>
        <Text style={styles.statsText}>
          Total Navigasi: {analyticsHistory.length}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  historyContainer: {
    flex: 1,
    marginBottom: 20,
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  logText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  stats: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
  },
  statsText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});