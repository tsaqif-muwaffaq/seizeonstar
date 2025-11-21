import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CheckoutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
        <View style={styles.summaryItem}>
          <Text>Subtotal</Text>
          <Text>Rp 1.299.000</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text>Ongkos Kirim</Text>
          <Text>Rp 25.000</Text>
        </View>
        <View style={[styles.summaryItem, styles.total]}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>Rp 1.324.000</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Bayar Sekarang</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  total: {
    borderTopWidth: 1,
    borderTopColor: '#DDD',
    paddingTop: 8,
    marginTop: 8,
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  payButton: {
    backgroundColor: '#34C759',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen;