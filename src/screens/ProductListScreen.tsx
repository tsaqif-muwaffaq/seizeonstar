import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type ProductListScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductList'>;

const ProductListScreen: React.FC = () => {
  const navigation = useNavigation<ProductListScreenNavigationProp>();

  // Sample products data
  const products = [
    {
      id: '1',
      name: 'Nike Air Max',
      price: 'Rp 1.299.000',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Adidas Ultraboost',
      price: 'Rp 1.499.000',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Puma RS-X',
      price: 'Rp 899.000',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'New Balance 574',
      price: 'Rp 799.000',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const renderProductItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('Product', { productId: item.id })}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Products</Text>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => navigation.navigate('ProductUpload')}
        >
          <Text style={styles.uploadButtonText}>+ Upload Product</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productsList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  uploadButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  productsList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    margin: 6,
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 12,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;