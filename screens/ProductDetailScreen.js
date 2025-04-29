import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params; // Nhận dữ liệu sản phẩm từ HomeScreen
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Ánh xạ tên tệp hình ảnh với require
  const imageMap = {
    'banana.jpg': require('../assets/images/banana.jpg'),
    'apple.png': require('../assets/images/apple.png'),
    'pepper.png': require('../assets/images/pepper.png'),
    'ginger.png': require('../assets/images/ginger.png'),
    'beef.png': require('../assets/images/beef.png'),
    'chicken.png': require('../assets/images/chicken.png'),
  };

  // Kiểm tra xem sản phẩm có trong danh sách yêu thích không khi màn hình được tải
  useEffect(() => {
    const checkFavorite = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
        if (!Array.isArray(favorites)) {
          return;
        }
        const isProductFavorite = favorites.some((item) => item.id === product.id);
        setIsFavorite(isProductFavorite);
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    checkFavorite();
  }, [product.id]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('cartItems');
      let cartItems = storedItems ? JSON.parse(storedItems) : [];

      // Đảm bảo cartItems là một mảng
      if (!Array.isArray(cartItems)) {
        cartItems = [];
      }

      const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

      if (existingItemIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        cartItems[existingItemIndex].quantity += quantity;
      } else {
        // Nếu sản phẩm chưa có, thêm mới với số lượng
        cartItems.push({ ...product, quantity });
      }

      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart: ' + error.message);
    }
  };

  // Thêm hoặc xóa sản phẩm khỏi danh sách yêu thích
  const toggleFavorite = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      // Đảm bảo favorites là một mảng
      if (!Array.isArray(favorites)) {
        favorites = [];
      }

      if (isFavorite) {
        // Xóa sản phẩm khỏi danh sách yêu thích
        favorites = favorites.filter((item) => item.id !== product.id);
        setIsFavorite(false);
        alert('Product removed from favorites!');
      } else {
        // Thêm sản phẩm vào danh sách yêu thích
        favorites.push(product);
        setIsFavorite(true);
        alert('Product added to favorites!');
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error toggling favorite:', error);
      alert('Failed to toggle favorite: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFavorite}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={isFavorite ? '#FF0000' : '#000'}
            />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        {imageMap[product.image] ? (
          <Image
            source={imageMap[product.image]}
            style={styles.productImage}
            resizeMode="contain"
          />
        ) : (
          <View style={styles.productImagePlaceholder}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productWeight}>{product.weight}, Price</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            >
              <Icon name="remove" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
              <Icon name="add" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.productPrice}>${(product.price * quantity).toFixed(2)}</Text>
          </View>
        </View>

        {/* Product Details */}
        <TouchableOpacity style={styles.detailSection}>
          <Text style={styles.detailTitle}>Product Detail</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.detailText}>
          Apples May Be Good for Weight Loss. Apples Are Good for Your Heart. As Part of a Healthful and Varied Diet.
        </Text>

        {/* Nutrition */}
        <TouchableOpacity style={styles.detailSection}>
          <Text style={styles.detailTitle}>Nutritions</Text>
          <Icon name="keyboard-arrow-down" size={24} color="#000" />
        </TouchableOpacity>

        {/* Review */}
        <TouchableOpacity style={styles.detailSection}>
          <Text style={styles.detailTitle}>Review</Text>
          <View style={styles.reviewStars}>
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
            <Icon name="star" size={20} color="#FFD700" />
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Add to Basket Button */}
      <TouchableOpacity style={styles.addButton} onPress={addToCart}>
        <Text style={styles.addButtonText}>Add To Basket</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  productImage: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  productImagePlaceholder: {
    width: '100%',
    height: 250,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  productWeight: {
    fontSize: 16,
    color: '#666',
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 20,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  detailSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  reviewStars: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#53B175',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});