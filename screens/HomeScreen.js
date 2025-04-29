import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function HomeScreen({ navigation }) {
  // Dữ liệu sản phẩm cho Exclusive Offer
  const exclusiveOffers = [
    {
      id: '1',
      name: 'Organic Bananas',
      weight: '7pcs',
      price: 4.99,
      image: 'banana.jpg',
    },
    {
      id: '2',
      name: 'Red Apple',
      weight: '1kg',
      price: 4.99,
      image: 'apple.png',
    },
  ];

  // Dữ liệu sản phẩm cho Best Selling
  const bestSelling = [
    {
      id: '3',
      name: 'Pepper',
      weight: '1kg',
      price: 4.99,
      image: 'pepper.png',
    },
    {
      id: '4',
      name: 'Ginger',
      weight: '1kg',
      price: 4.99,
      image: 'ginger.png',
    },
  ];

  // Dữ liệu cho Groceries (Pulses, Rice không cần giá và nút Add)
  const groceries = [
    {
      id: '5',
      name: 'Pulses',
      image: 'pulses.png',
    },
    {
      id: '6',
      name: 'Rice',
      image: 'rice.png',
    },
  ];

  // Dữ liệu sản phẩm trong danh mục Groceries (có giá và nút Add)
  const groceryProducts = [
    {
      id: '7',
      name: 'Beef Bone',
      weight: '1kg',
      price: 4.99,
      image: 'beef.png',
    },
    {
      id: '8',
      name: 'Broiler Chicken',
      weight: '1kg',
      price: 4.99,
      image: 'chicken.png',
    },
  ];

  // Ánh xạ tên tệp hình ảnh với require
  const imageMap = {
    'banana.jpg': require('../assets/images/banana.jpg'),
    'apple.png': require('../assets/images/apple.png'),
    'pepper.png': require('../assets/images/pepper.png'),
    'ginger.png': require('../assets/images/ginger.png'),
    'pulses.png': require('../assets/images/pulses.png'),
    'rice.png': require('../assets/images/rice.png'),
    'beef.png': require('../assets/images/beef.png'),
    'chicken.png': require('../assets/images/chicken.png'),
  };

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (product) => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      let cartItems = storedItems ? JSON.parse(storedItems) : [];
      
      // Đảm bảo cartItems là một mảng
      if (!Array.isArray(cartItems)) {
        cartItems = [];
      }

      const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, tăng số lượng
        cartItems[existingItemIndex].quantity += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm mới với số lượng 1
        cartItems.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart: ' + error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/carrot_icon.png')}
          style={styles.headerIcon}
          resizeMode="contain"
        />
        <View style={styles.locationContainer}>
          <Icon name="location-on" size={20} color="#53B175" />
          <Text style={styles.locationText}>Dhaka, Banassre</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          placeholderTextColor="#666"
        />
      </View>

      {/* Banner */}
      <View style={styles.bannerContainer}>
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.bannerImage}
          resizeMode="contain"
        />
      </View>

      {/* Exclusive Offer */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Exclusive Offer</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {exclusiveOffers.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { product })}
            >
              <Image
                source={imageMap[product.image]}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productWeight}>{product.weight}, Price</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(product)}
                >
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Best Selling */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Best Selling</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {bestSelling.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { product })}
            >
              <Image
                source={imageMap[product.image]}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productWeight}>{product.weight}, Price</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(product)}
                >
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Groceries */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Groceries</Text>
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.horizontalScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {groceries.map((item) => (
            <TouchableOpacity key={item.id} style={styles.groceryCard}>
              <Image
                source={imageMap[item.image]}
                style={styles.groceryImage}
                resizeMode="contain"
              />
              <Text style={styles.groceryName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.horizontalScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {groceryProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => navigation.navigate('ProductDetail', { product })}
            >
              <Image
                source={imageMap[product.image]}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productWeight}>{product.weight}, Price</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(product)}
                >
                  <Icon name="add" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  bannerContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 16,
    color: '#53B175',
  },
  horizontalScrollContainer: {
    height: 240,
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 0.2,
    padding: 10,
    marginHorizontal: 10,
    width: 150,
    minHeight: 200,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'left',
  },
  productWeight: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    textAlign: 'left',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addButton: {
    backgroundColor: '#53B175',
    borderRadius: 5,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groceryCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    width: 150,
    minHeight: 150,
    alignItems: 'center',
  },
  groceryImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  groceryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
});