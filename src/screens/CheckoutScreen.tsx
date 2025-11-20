import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import ProtectedRoute from '../components/ProtectedRoute';

type CheckoutScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

const CheckoutScreen = () => {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();

  const handleCheckout = () => {
    Alert.alert(
      'Order Confirmed',
      'Your order has been placed successfully!',
      [
        {
          text: 'Continue Shopping',
          onPress: () => navigation.navigate('Home'),
        },
      ]
    );
  };

  return (
    <ProtectedRoute>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Checkout</Text>
          <Text style={styles.subtitle}>Protected route - requires authentication</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryItem}>
            <Text>Items (3)</Text>
            <Text>$127.97</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Shipping</Text>
            <Text>$5.99</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Tax</Text>
            <Text>$12.80</Text>
          </View>
          <View style={[styles.summaryItem, styles.total]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>$146.76</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Shipping Address</Text>
          <Text style={styles.addressText}>
            John Doe{'\n'}
            123 Main Street{'\n'}
            New York, NY 10001{'\n'}
            United States
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <Text style={styles.paymentText}>•••• •••• •••• 4242</Text>
          <Text style={styles.paymentSubtext}>Visa - Expires 12/25</Text>
        </View>

        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>Place Order</Text>
        </TouchableOpacity>

        <View style={styles.protectedInfo}>
          <Text style={styles.infoTitle}>Protected Route Info</Text>
          <Text style={styles.infoText}>
            • This screen is protected by ProtectedRoute component{'\n'}
            • Requires valid authentication token{'\n'}
            • Automatically redirects to login if token is expired{'\n'}
            • Deep links to this screen will check authentication
          </Text>
        </View>
      </ScrollView>
    </ProtectedRoute>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  total: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  addressText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  paymentText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  paymentSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  checkoutButton: {
    backgroundColor: '#34C759',
    margin: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  protectedInfo: {
    padding: 20,
    margin: 20,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007AFF',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default CheckoutScreen;