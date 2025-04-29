import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFocusEffect } from '@react-navigation/native';

export default function FavouriteScreen() {
  const [favorites, setFavorites] = useState([]);

  // Ánh xạ tên tệp hình ảnh với require
  const imageMap = {
    'banana.jpg': require('../assets/images/banana.jpg'),
    'apple.png': require('../assets/images/apple.png'),
    'pepper.png': require('../assets/images/pepper.png'),
    'ginger.png': require('../assets/images/ginger.png'),
    'beef.png': require('../assets/images/beef.png'),
    'chicken.png': require('../assets/images/chicken.png'),
  };

  // Hàm tải danh sách yêu thích từ AsyncStorage
  const loadFavorites = useCallback(async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      let favoritesData = storedFavorites ? JSON.parse(storedFavorites) : [];
      
      // Đảm bảo favoritesData là một mảng
      if (!Array.isArray(favoritesData)) {
        favoritesData = [];
      }
      
      setFavorites(favoritesData);
    } catch (error) {
      console.error('Error loading favorites:', error);
      setFavorites([]);
    }
  }, []);

  // Tải lại danh sách yêu thích mỗi khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [loadFavorites])
  );

  // Xóa sản phẩm khỏi danh sách yêu thích
  const removeFromFavorites = async (id) => {
    try {
      const updatedFavorites = favorites.filter((item) => item.id !== id);
      setFavorites(updatedFavorites);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing item from favorites:', error);
    }
  };

  // Hiển thị mỗi sản phẩm trong danh sách yêu thích
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {imageMap[item.image] ? (
        <Image
          source={imageMap[item.image]}
          style={styles.itemImage}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.itemImagePlaceholder}>
          <Text style={styles.placeholderText}>No Image</Text>
        </View>
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeFromFavorites(item.id)}
      >
        <Icon name="delete" size={24} color="#FF0000" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites yet</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  title: {
    paddingTop: 30,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 5,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    color: '#666',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  itemPrice: {
    fontSize: 14,
    color: '#53B175',
    marginTop: 5,
  },
  removeButton: {
    padding: 10,
  },
});