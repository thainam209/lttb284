// screens/SearchResultsScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import products from '../data.js'; // Nhập danh sách sản phẩm từ data.js

const SearchResultsScreen = ({ route, navigation }) => {
  const { query } = route.params || {}; // Nhận từ khóa tìm kiếm từ ExploreScreen
  const [searchQuery, setSearchQuery] = useState(query || ''); // State quản lý từ khóa tìm kiếm
  const [filteredProducts, setFilteredProducts] = useState(products); // State quản lý danh sách sản phẩm đã lọc

  // Lọc sản phẩm khi từ khóa tìm kiếm thay đổi
  useEffect(() => {
    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleFilterPress = () => {
    navigation.navigate('Filter');
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text); // Cập nhật từ khóa tìm kiếm
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemWeight}>{item.weight}</Text>
      {item.price > 0 && (
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
      )}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm"
          value={searchQuery}
          onChangeText={handleSearchChange} // Cập nhật từ khóa tìm kiếm khi người dùng nhập
        />
        <TouchableOpacity onPress={handleFilterPress} style={styles.filterIcon}>
          <Icon name="filter-list" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Danh sách sản phẩm */}
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  filterIcon: {
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },
  itemWeight: {
    fontSize: 14,
    color: '#666',
  },
  itemPrice: {
    fontSize: 16,
    color: '#53B175',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#53B175',
    borderRadius: 5,
    padding: 5,
    marginTop: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SearchResultsScreen;