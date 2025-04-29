import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function BeveragesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity>
          <Icon name="shopping-cart" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent} // Thêm contentContainerStyle để quản lý nội dung bên trong
        showsVerticalScrollIndicator={false} // Ẩn thanh cuộn dọc nếu không cần thiết
      >
        <View style={styles.productRow}>
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={require('../assets/images/diet_coke.png')} // Thay bằng ảnh Diet Coke
              style={styles.productImage}
            />
            <Text style={styles.productName}>Diet Coke</Text>
            <Text style={styles.productWeight}>355ml, Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>$1.99</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={require('../assets/images/sprite.png')} // Thay bằng ảnh Sprite
              style={styles.productImage}
            />
            <Text style={styles.productName}>Sprite Can</Text>
            <Text style={styles.productWeight}>325ml, Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>$1.50</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.productRow}>
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={require('../assets/images/apple_juice.png')} // Thay bằng ảnh Apple Juice
              style={styles.productImage}
            />
            <Text style={styles.productName}>Apple & Grape Juice</Text>
            <Text style={styles.productWeight}>2L, Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>$15.99</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={require('../assets/images/orange_juice.png')} // Thay bằng ảnh Orange Juice
              style={styles.productImage}
            />
            <Text style={styles.productName}>Orange Juice</Text>
            <Text style={styles.productWeight}>2L, Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>$15.99</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.productRow}>
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={require('../assets/images/coca_cola.png')} // Thay bằng ảnh Coca Cola
              style={styles.productImage}
            />
            <Text style={styles.productName}>Coca Cola Can</Text>
            <Text style={styles.productWeight}>325ml, Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>$4.99</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.productCard}>
            <Image
              source={require('../assets/images/pepsi.png')} // Thay bằng ảnh Pepsi
              style={styles.productImage}
            />
            <Text style={styles.productName}>Pepsi Can</Text>
            <Text style={styles.productWeight}>325ml, Price</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.productPrice}>$4.99</Text>
              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff', // Thêm nền trắng cho header để rõ ràng hơn
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  scrollContent: {
    paddingBottom: 20, // Thêm padding để nội dung không bị che bởi bottom tab
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '48%',
    alignItems: 'center', // Căn giữa nội dung trong card
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain', // Đảm bảo ảnh không bị méo
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10,
    textAlign: 'center',
  },
  productWeight: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
});