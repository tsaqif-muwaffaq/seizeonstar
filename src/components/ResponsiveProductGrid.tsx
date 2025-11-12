import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types/Product';

interface ResponsiveProductGridProps {
  products: Product[];
  categoryName: string;
  onProductPress: (product: Product) => void;
}

export const ResponsiveProductGrid: React.FC<ResponsiveProductGridProps> = ({
  products,
  categoryName,
  onProductPress,
}) => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  
  // Responsive layout calculations
  const numColumns = isLandscape ? 4 : 2;
  const imageHeight = isLandscape ? 120 : 140;
  const cardMargin = isLandscape ? 4 : 6;
  const fontSize = {
    name: isLandscape ? 12 : 14,
    price: isLandscape ? 12 : 14,
    desc: isLandscape ? 10 : 11,
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={[
        styles.productCard, 
        { 
          width: `${100 / numColumns - 2}%`,
          margin: cardMargin,
        }
      ]}
      activeOpacity={0.7}
      onPress={() => onProductPress(item)}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={[styles.productImage, { height: imageHeight }]} 
        resizeMode="cover"
      />
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { fontSize: fontSize.name }]} numberOfLines={2}>
          {item.name}
        </Text>
        <Text style={[styles.productPrice, { fontSize: fontSize.price }]}>
          Rp {item.price.toLocaleString('id-ID')}
        </Text>
        {item.description ? (
          <Text style={[styles.productDesc, { fontSize: fontSize.desc }]} numberOfLines={2}>
            {item.description}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={[
        styles.categoryTitle,
        { fontSize: isLandscape ? 18 : 20 }
      ]}>
        {categoryName}
      </Text>
      <Text style={styles.productCount}>
        {products.length} produk tersedia • {isLandscape ? 'Landscape' : 'Portrait'}
      </Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
        numColumns={numColumns}
        key={`flatlist-${numColumns}-${isLandscape ? 'landscape' : 'portrait'}`}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada produk dalam kategori ini</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  categoryTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 4,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  productCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    marginHorizontal: 8,
    textAlign: 'center',
  },
  productsList: {
    paddingBottom: 20,
    paddingTop: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    lineHeight: 16,
  },
  productPrice: {
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 4,
  },
  productDesc: {
    color: '#666',
    lineHeight: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
});