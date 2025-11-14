import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { AnyProduct, getProductName, getProductImageUrl, getProductPrice } from '../types/Product';
import { globalStyles } from '../styles/globalStyles';

type CheckoutRouteProp = RouteProp<{ Checkout: { product: AnyProduct } }, 'Checkout'>;

export const CheckoutScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<CheckoutRouteProp>();
  const { product } = route.params;

  const handleConfirmOrder = () => {
    Alert.alert('Sukses', 'Pesanan berhasil dikonfirmasi!');
    navigation.goBack();
  };

  const productName = getProductName(product);
  const productImageUrl = getProductImageUrl(product);
  const productPrice = getProductPrice(product);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Checkout</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.productSection}>
          <Text style={styles.sectionTitle}>Produk Dipesan</Text>
          <View style={styles.productCard}>
            <Image source={{ uri: productImageUrl }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productPrice}>Rp {productPrice.toLocaleString('id-ID')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.shippingSection}>
          <Text style={styles.sectionTitle}>Informasi Pengiriman</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Nama: John Doe</Text>
            <Text style={styles.infoText}>Alamat: Jl. Contoh No. 123, Jakarta</Text>
            <Text style={styles.infoText}>Telepon: 081234567890</Text>
          </View>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Metode Pembayaran</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Transfer Bank - BCA</Text>
            <Text style={styles.infoText}>No. Rek: 1234567890</Text>
          </View>
        </View>

        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>Ringkasan Pesanan</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rp {productPrice.toLocaleString('id-ID')}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Ongkir</Text>
              <Text style={styles.summaryValue}>Rp 15.000</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>
                Rp {(productPrice + 15000).toLocaleString('id-ID')}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.buttonPrimary, styles.confirmButton]}
          onPress={handleConfirmOrder}
        >
          <Text style={globalStyles.buttonText}>Konfirmasi Pesanan</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, styles.cancelButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelText}>Batalkan</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#f9f9f9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  productSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  shippingSection: {
    marginBottom: 25,
  },
  paymentSection: {
    marginBottom: 25,
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  summarySection: {
    marginBottom: 25,
  },
  summaryCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
    marginTop: 5,
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
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  confirmButton: {
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E53935',
  },
  cancelText: {
    color: '#E53935',
    fontWeight: 'bold',
  },
});