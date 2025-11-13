import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNetInfo } from '../hooks/useNetInfo';
import { NetworkStatus } from '../components/NetworkStatus';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { globalStyles } from '../styles/globalStyles';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

interface CartData {
  id: number;
  products: CartItem[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export const CartScreen: React.FC = () => {
  const { isConnected, isInternetReachable, type } = useNetInfo();
  const [cartData, setCartData] = useState<CartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [pollingCount, setPollingCount] = useState(0);

  const isOnline = isConnected && isInternetReachable;
  const isCellular = type === 'cellular';

  // Simulate cart data fetch
  const fetchCartData = async () => {
    if (!isOnline || isCellular) {
      setLoading(false);
      return;
    }

    try {
      // Simulate API call - in real app, this would be actual API call
      const mockCartData: CartData = {
        id: 1,
        products: [
          { id: 1, title: 'iPhone 9', price: 549, quantity: 2, total: 1098 },
          { id: 2, title: 'iPhone X', price: 899, quantity: 1, total: 899 },
        ],
        total: 1997,
        discountedTotal: 1897,
        userId: 1,
        totalProducts: 2,
        totalQuantity: 3,
      };

      setCartData(mockCartData);
      setPollingCount(prev => prev + 1);
    } catch (error) {
      console.error('Error fetching cart data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Polling implementation
  useEffect(() => {
    if (isCellular) {
      console.log('📵 Polling disabled: Cellular network detected');
      return;
    }

    if (!isOnline) {
      setLoading(false);
      return;
    }

    // Initial fetch
    fetchCartData();

    // Set up polling interval (15 seconds)
    const intervalId = setInterval(() => {
      console.log('🔄 Polling cart data...');
      fetchCartData();
    }, 15000); // 15 seconds

    // Cleanup interval on unmount or when dependencies change
    return () => {
      console.log('🧹 Cleaning up polling interval');
      clearInterval(intervalId);
    };
  }, [isOnline, isCellular]);

  if (loading && isOnline && !isCellular) {
    return (
      <View style={globalStyles.container}>
        <NetworkStatus />
        <LoadingIndicator text="Memuat keranjang..." />
      </View>
    );
  }

  const renderProductItem = (product: CartItem) => (
    <View style={styles.productItem} key={product.id}>
      <Text style={styles.productName}>{product.title}</Text>
      <View style={styles.productDetails}>
        <Text>${product.price} x {product.quantity}</Text>
        <Text style={styles.productTotal}>${product.total}</Text>
      </View>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <NetworkStatus />
      
      <View style={styles.header}>
        <Text style={styles.title}>🛒 Keranjang Belanja</Text>
        <Text style={styles.subtitle}>
          {isCellular ? 'Polling dimatikan (jaringan seluler)' : `Polling count: ${pollingCount}`}
        </Text>
      </View>

      {isCellular && (
        <View style={styles.cellularWarning}>
          <Text style={styles.warningText}>
            📵 Polling dimatikan untuk menghemat kuota data seluler
          </Text>
        </View>
      )}

      {!isOnline ? (
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineText}>
            Tidak dapat memuat keranjang - Periksa koneksi internet Anda
          </Text>
        </View>
      ) : cartData ? (
        <ScrollView style={styles.content}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Ringkasan Belanja</Text>
            <View style={styles.summaryRow}>
              <Text>Total Produk:</Text>
              <Text style={styles.summaryValue}>{cartData.totalProducts}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Total Quantity:</Text>
              <Text style={styles.summaryValue}>{cartData.totalQuantity}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text>Subtotal:</Text>
              <Text style={styles.summaryValue}>${cartData.total}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>${cartData.discountedTotal}</Text>
            </View>
          </View>

          <View style={styles.productsSection}>
            <Text style={styles.sectionTitle}>Produk dalam Keranjang</Text>
            {cartData.products.map(renderProductItem)}
          </View>

          <TouchableOpacity style={[globalStyles.button, globalStyles.buttonPrimary, styles.checkoutButton]}>
            <Text style={globalStyles.buttonText}>Lanjut ke Checkout</Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Keranjang kosong</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  cellularWarning: {
    backgroundColor: '#FFF3CD',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryValue: {
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 8,
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  productsSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  productItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  productDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productTotal: {
    fontWeight: 'bold',
    color: '#2196F3',
  },
  checkoutButton: {
    marginTop: 16,
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  offlineText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});