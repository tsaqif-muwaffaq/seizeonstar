import * as React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Product } from '../types/Product';

const TopTab = createMaterialTopTabNavigator();

// Data produk untuk setiap kategori
const productCategories: { [key: string]: Product[] } = {
  'Populer': [
    {
      id: '1',
      name: 'Chambre de Lavain Basic Hoodie',
      price: 1000000,
      imageUrl: 'https://down-id.img.susercontent.com/file/id-11134207-7r98t-lnl92u2hdkd7ef',
      description: 'Hoodie basic hitam dengan bahan katun lembut 380 gsm'
    },
    {
      id: '2',
      name: 'Chambre de Lavain Badstar White',
      price: 1500000,
      imageUrl: 'https://p16-oec-sg.ibyteimg.com/tos-alisg-i-aphluv4xwc-sg/4e78458ea9dd4f6c94770be2e0a106a9~tplv-aphluv4xwc-resize-webp:800:800.webp',
      description: 'Hoodie putih dengan design badstar exclusive'
    },
    {
      id: '10',
      name: 'Chambre de Lavain Shootlove White',
      price: 2000000,
      imageUrl: 'https://filebroker-cdn.lazada.co.id/kf/Saeab12fc9e14482a858ed9d5755553bfc.jpg',
      description: 'Hoodie putih limited edition dengan design shootlove'
    }
  ],
  'Terbaru': [
    {
      id: '11',
      name: 'Chambre de Lavain shootlove zip black',
      price: 2000000,
      imageUrl: 'https://d2kchovjbwl1tk.cloudfront.net/vendor/3899/product/3B613652-D93B-4C31-8A47-1583D085E59D_1691214385268.jpeg',
      description: 'Hoodie edisi musim panas dengan bahan lebih ringan'
    },
    {
      id: '12',
      name: 'Chambre de Lavain masking tape',
      price: 1000000,
      imageUrl: 'https://d2kchovjbwl1tk.cloudfront.net/vendor/3899/product/hoodie_masking_tape1_1720604916741.jpg',
      description: 'Hoodie dengan aksen neon untuk tampilan yang bold'
    },
    {
      id: '13',
      name: 'Chambre de Lavain forever black',
      price: 950000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.dgh_Nr85Y-qKKFbcKPHHcgHaHa?pid=Api&P=0&h=180',
      description: 'Hoodie dengan desain trendy'
    }
  ],
  'Elektronik': [
    {
      id: 'e1',
      name: 'iphone 17 pro max',
      price: 34500000,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.V0OB6hCE9LZroc46anV0KwHaFj?pid=Api&P=0&h=180',
      description: 'Smartphone flagship dengan processor terbaru'
    },
    {
      id: 'e2',
      name: 'Wireless Earbuds',
      price: 4500000,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.9SVPktU-Q476v1w14MM_lwHaHa?pid=Api&P=0&h=180',
      description: 'Earbuds nirkabel dengan noise cancellation'
    },
    {
      id: 'e3',
      name: 'apple Smart Watch',
      price: 5200000,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.mHC0GgPg_QyyQWppOnvElQHaHa?pid=Api&P=0&h=180',
      description: 'Smartwatch dengan fitur kesehatan lengkap'
    },
    {
      id: 'e4',
      name: 'Tablet Pro',
      price: 9500000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.IPUYLNovI_koN5vPQ39MSAHaHa?pid=Api&P=0&h=180',
      description: 'Tablet untuk produktivitas dan kreativitas'
    }
  ],
  'Pakaian': [
    {
      id: 'p1',
      name: 'Kaos Basic Cotton',
      price: 120000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.76enRI8fPl0DYtxqsevuywHaHa?pid=Api&P=0&h=180',
      description: 'Kaos basic dari katun 100% yang nyaman'
    },
    {
      id: 'p2',
      name: 'baggy jeans',
      price: 750000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.mxC4Pk5UYw3VYzqa4BhxCgHaJf?pid=Api&P=0&h=180',
      description: 'baggy jeans dengan bahan denim premium'
    },
    {
      id: 'p3',
      name: 'Jacket Denim',
      price: 850000,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.Rnfh3JKC9tl5QFJ_nnoo2QHaHa?pid=Api&P=0&h=180',
      description: 'Jacket denim classic untuk style casual'
    },
    {
      id: 'p4',
      name: 'Sneakers',
      price: 980000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.THfFUMPCq7nWD2FA_aO5vgHaG5?pid=Api&P=0&h=180',
      description: 'Sneakers untuk aktivitas sehari-hari'
    }
  ],
  'Makanan': [
    {
      id: 'f1',
      name: 'Snack Box Premium',
      price: 75000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.3XI6NJI0JxKegyKngQhBHAHaGZ?pid=Api&P=0&h=180',
      description: 'Snack box dengan berbagai camilan premium'
    },
    {
      id: 'f2',
      name: 'Minuman Energy',
      price: 45000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.HVn4Y-jd529F8yr0bAExQAHaHa?pid=Api&P=0&h=180',
      description: 'Minuman energi untuk tambahan stamina'
    },
    {
      id: 'f3',
      name: 'Kopi kenangan',
      price: 45000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.qow9zWX997H-0gmjoGdjLwHaFF?pid=Api&P=0&h=180',
      description: 'Kopi specialty dari biji pilihan'
    },
    {
      id: 'f4',
      name: 'Healthy Snack',
      price: 35000,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.udqvjCP9uMLO1CXdD5SkRgHaKY?pid=Api&P=0&h=180',
      description: 'Camilan sehat rendah kalori'
    }
  ],
  'Otomotif': [
    {
      id: 'a1',
      name: 'Oli Mobil Synthetic',
      price: 150000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.8CJyhl1ctlLmjO21-dEGqAHaHa?pid=Api&P=0&h=180',
      description: 'Oli mobil synthetic untuk performa optimal'
    },
    {
      id: 'a2',
      name: 'Car Vacuum Cleaner',
      price: 280000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.KcXeftYRkSty4rsc1619PwHaHa?pid=Api&P=0&h=180',
      description: 'Vacuum cleaner portable untuk mobil'
    },
    {
      id: 'a3',
      name: 'Car Phone Holder',
      price: 85000,
      imageUrl: 'https://tse1.mm.bing.net/th/id/OIP._Zwu9YXSy0-Om4sBU6fSiQHaHN?pid=Api&P=0&h=180',
      description: 'Holder smartphone untuk dashboard mobil'
    },
    {
      id: 'a4',
      name: 'Car Perfume',
      price: 65000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.bYDMK2ll3FZDkbRC4rQPdQHaHa?pid=Api&P=0&h=180',
      description: 'Pengharum mobil dengan aroma lasting'
    }
  ],
  'Hiburan': [
    {
      id: 'ent1',
      name: 'Headphone Wireless',
      price: 680000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.H36jq-sM3m5YFJTDkTFOzwHaHa?pid=Api&P=0&h=180',
      description: 'Headphone wireless dengan sound quality terbaik'
    },
    {
      id: 'ent2',
      name: 'Game Controller',
      price: 320000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.drMZLp7PCDs8V32aj-ljFAHaHa?pid=Api&P=0&h=180',
      description: 'Controller gaming ergonomis'
    },
    {
      id: 'ent3',
      name: 'Bluetooth Speaker',
      price: 420000,
      imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.RQUwkqX4SiNTooGpGz2fSAHaHa?pid=Api&P=0&h=180',
      description: 'Speaker portable dengan bass yang powerful'
    },
    {
      id: 'ent4',
      name: 'VR Headset',
      price: 1850000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.2zpNNfSSdnoQrlDrHzUCwgHaHa?pid=Api&P=0&h=180',
      description: 'VR headset untuk pengalaman immersive'
    }
  ],
  'Perlengkapan Bayi': [
    {
      id: 'b1',
      name: 'Stroller Premium',
      price: 1500000,
      imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.RDVRDeWZ8BAb0fWzdB5ThAHaHa?pid=Api&P=0&h=180',
      description: 'Stroller bayi dengan fitur keamanan lengkap'
    },
    {
      id: 'b2',
      name: 'Baby Monitor',
      price: 450000,
      imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.0sn3QuJycMvMsXCw4fqPPgHaHa?pid=Api&P=0&h=180',
      description: 'Monitor bayi dengan camera dan sensor'
    },
    {
      id: 'b3',
      name: 'Mainan Edukasi',
      price: 125000,
      imageUrl: 'https://tse4.mm.bing.net/th/id/OIP.l6eA1a4gtVzVDy9qwvTrYAHaHa?pid=Api&P=0&h=180',
      description: 'Mainan edukasi untuk perkembangan anak'
    },
    {
      id: 'b4',
      name: 'Baby Carrier',
      price: 380000,
      imageUrl: 'https://via.placeholder.com/300x300?text=Baby+Carrier',
      description: 'Baby carrier ergonomis yang nyaman'
    }
  ]
};

// Type untuk navigation
type ExtendedTabsNavigationProp = {
  navigate: (screen: string, params?: { product: Product }) => void;
};

// Komponen untuk menampilkan produk dalam grid
const ProductGrid = ({ products, categoryName }: { products: Product[], categoryName: string }) => {
  const navigation = useNavigation<ExtendedTabsNavigationProp>();
  const { width } = useWindowDimensions();
  const isLandscape = width > 600;
  const numColumns = isLandscape ? 3 : 2;

  // Soal Praktik 2: Navigasi ke Stack Detail
  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <TouchableOpacity 
      style={[
        styles.productCard, 
        { width: `${100 / numColumns - 4}%` }
      ]}
      activeOpacity={0.7}
      onPress={() => handleProductPress(item)}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.productImage} 
        defaultSource={{ uri: 'https://via.placeholder.com/300x300?text=Loading...' }}
      />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productPrice}>Rp {item.price.toLocaleString('id-ID')}</Text>
        {item.description ? (
          <Text style={styles.productDesc} numberOfLines={2}>{item.description}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.categoryTitle}>{categoryName}</Text>
      <Text style={styles.productCount}>{products.length} produk tersedia</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productsList}
        numColumns={numColumns}
        key={`flatlist-${numColumns}`}
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

// Screen components untuk setiap kategori
const PopularTab = () => <ProductGrid products={productCategories['Populer']} categoryName="Produk Populer" />;
const NewTab = () => <ProductGrid products={productCategories['Terbaru']} categoryName="Produk Terbaru" />;
const ElectronicsTab = () => <ProductGrid products={productCategories['Elektronik']} categoryName="Elektronik" />;
const ClothingTab = () => <ProductGrid products={productCategories['Pakaian']} categoryName="Pakaian & Fashion" />;
const FoodTab = () => <ProductGrid products={productCategories['Makanan']} categoryName="Makanan & Minuman" />;
const AutomotiveTab = () => <ProductGrid products={productCategories['Otomotif']} categoryName="Otomotif" />;
const EntertainmentTab = () => <ProductGrid products={productCategories['Hiburan']} categoryName="Hiburan & Gadget" />;

const BabyTab = () => {
  React.useEffect(() => {
    console.log('Baby tab focused');
    return () => console.log('Baby tab unfocused');
  }, []);

  return <ProductGrid products={productCategories['Perlengkapan Bayi']} categoryName="Perlengkapan Bayi" />;
};

export const ExtendedHomeTabs = () => {
  return (
    <View style={styles.container}>
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#2196F3',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: { 
            backgroundColor: '#2196F3',
            height: 3,
          },
          tabBarLabelStyle: { 
            textTransform: 'none', 
            fontSize: 14,
            fontWeight: '500',
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#e0e0e0',
          },
          tabBarItemStyle: {
            width: 'auto',
            paddingHorizontal: 16,
            minHeight: 50,
          },
          tabBarScrollEnabled: true,
          lazy: true,
          lazyPreloadDistance: 1,
          swipeEnabled: true,
        }}
      >
        <TopTab.Screen name="Populer" component={PopularTab} />
        <TopTab.Screen name="Terbaru" component={NewTab} />
        <TopTab.Screen name="Elektronik" component={ElectronicsTab} />
        <TopTab.Screen name="Pakaian" component={ClothingTab} />
        <TopTab.Screen name="Makanan" component={FoodTab} />
        <TopTab.Screen name="Otomotif" component={AutomotiveTab} />
        <TopTab.Screen name="Hiburan" component={EntertainmentTab} />
        <TopTab.Screen name="Bayi" component={BabyTab} />
      </TopTab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  categoryContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 8,
  },
  categoryTitle: {
    fontSize: 20,
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
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    lineHeight: 18,
  },
  productPrice: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 4,
  },
  productDesc: {
    fontSize: 11,
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