// import React, { useState } from 'react';
import * as React from 'react';
import { useState } from 'react';

import { View, FlatList, Text, StyleSheet, Modal, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Product } from '../types/Product';
import { initialProducts } from '../data/products';
import { AddProductModal } from '../components/AddProductModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { globalStyles } from '../styles/globalStyles';

export const HomeScreen: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [detailModalVisible, setDetailModalVisible] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {width, height} = useWindowDimensions()

  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => [...prev, newProduct]);
    setAddModalVisible(false);
  };

  const handleProductPress = (product: Product) => {
    setSelectedProduct(product);
    setDetailModalVisible(true);
  };

  const isLandscape = width > height;
  const numColumns = isLandscape ? 3 : 1;

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      onPress={() => handleProductPress(item)} 
      style={[styles.card, isLandscape ? { width: `${100 / numColumns - 2}%` } : {}]}>
        <Image source={{ uri: item.imageUrl }} style={styles.image} />
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>Rp {item.price.toLocaleString('id-ID')}</Text>
        {item.description ? <Text style={styles.desc}>{item.description}</Text> : null}
    </TouchableOpacity>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>seizeonstar.catalog</Text>

      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        numColumns={numColumns}
        key={numColumns}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Tambah Produk</Text>
      </TouchableOpacity>

      <Modal
        visible={addModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setAddModalVisible(false)}
      >
        <AddProductModal
          onAdd={handleAddProduct}
          onClose={() => setAddModalVisible(false)}
        />
      </Modal>

      <Modal
        visible={detailModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setDetailModalVisible(false)}
      >
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setDetailModalVisible(false)}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 5,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginHorizontal: 5,
  },
  image: {
    width: '100%',
    height: 250,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: '#2196F3',
    marginTop: 4,
  },
  desc: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    elevation: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
