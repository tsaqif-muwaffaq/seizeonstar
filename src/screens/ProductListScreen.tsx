import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../hooks/useApi';
import { useNetInfo } from '../hooks/useNetInfo';
import { NetworkStatus } from '../components/NetworkStatus';
import { LoadingIndicator } from '../components/LoadingIndicator';
import { Product, LegacyProduct } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const { isConnected, isInternetReachable } = useNetInfo();
  
  const { data, loading, error, refetch } = useApi<ProductsResponse>(
    '/products?limit=20',
    { immediate: true, timeout: 7000 }
  );

  const isOnline = isConnected && isInternetReachable;

  const handleProductPress = (product: Product) => {
    // Convert to LegacyProduct format for compatibility
    const legacyProduct: LegacyProduct = {
      id: product.id.toString(),
      name: product.title,
      price: product.price,
      imageUrl: product.thumbnail,
      description: product.description,
    };
    navigation.navigate('ProductDetail', { product: legacyProduct });
  };

  const handleRetry = () => {
    refetch();
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => handleProductPress(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.productBrand}>{item.brand}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <Text style={styles.productRating}>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  // Show network status
  if (!isOnline) {
    return (
      <View style={globalStyles.container}>
        <NetworkStatus />
        <View style={styles.offlineContainer}>
          <Text style={styles.offlineTitle}>📶 Offline</Text>
          <Text style={styles.offlineText}>
            Anda sedang Offline. Cek koneksi Anda.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show loading
  if (loading) {
    return (
      <View style={globalStyles.container}>
        <NetworkStatus />
        <LoadingIndicator text="Memuat produk..." />
      </View>
    );
  }

  // Show error
  if (error) {
    return (
      <View style={globalStyles.container}>
        <NetworkStatus />
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>❌ Error</Text>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
            <Text style={styles.retryButtonText}>Coba Lagi</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <NetworkStatus />
      
      <View style={styles.header}>
        <Text style={styles.title}>Daftar Produk</Text>
        <Text style={styles.subtitle}>
          {data?.products.length || 0} produk ditemukan
        </Text>
      </View>

      <FlatList
        data={data?.products || []}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshing={loading}
        onRefresh={refetch}
      />
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
  listContent: {
    padding: 8,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productBrand: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  productRating: {
    fontSize: 12,
    color: '#FF9800',
  },
  offlineContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  offlineTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 12,
  },
  offlineText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 12,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  retryButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});