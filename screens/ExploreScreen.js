// screens/ExploreScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Navigate to SearchResults screen inside HomeStack
      navigation.navigate('HomeTab', {
        screen: 'SearchResults',
        params: { query: searchQuery },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Store"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchIcon}>
          <Icon name="search" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryCard}>
            <Image
              source={require('../assets/images/vegetables.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Fresh Fruits & Vegetable</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Image
              source={require('../assets/images/oil.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Cooking Oil & Ghee</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryCard}>
            <Image
              source={require('../assets/images/meat.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Meat & Fish</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.categoryCard}>
            <Image
              source={require('../assets/images/snacks.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Bakery & Snacks</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoryRow}>
          <TouchableOpacity style={styles.categoryCard}>
            <Image
              source={require('../assets/images/dairy.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Dairy & Eggs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Beverages')}
          >
            <Image
              source={require('../assets/images/beverages.png')}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName}>Beverages</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F3F2',
    borderRadius: 10,
    margin: 20,
    paddingHorizontal: 10,
  },
  searchInput: {
    paddingTop:30,
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
  },
  searchIcon: {
    marginTop:30,
    padding: 10,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    alignItems: 'center',
  },
  categoryImage: {
    width: 100,
    height: 100,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
});