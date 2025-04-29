import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Pressable, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Sử dụng FontAwesome5
import styles from './styles';

export default function SelectLocationScreen({ navigation }) {
  const [zone, setZone] = useState('Banasree');
  const [area, setArea] = useState('Types of your area');
  const [zoneModalVisible, setZoneModalVisible] = useState(false);
  const [areaModalVisible, setAreaModalVisible] = useState(false);

  const zones = ['Banasree', 'Other Zone'];
  const areas = ['Types of your area', 'Other Area'];

  const handleSubmit = async () => {
    try {
      await AsyncStorage.setItem('userLocation', JSON.stringify({ zone, area }));
      // Sử dụng 'Login' như trong mã cũ, hoặc 'MainApp' nếu bạn đã có AppNavigator.js
      navigation.navigate('Login'); // Thay 'MainApp' bằng 'Login'
    } catch (error) {
      console.error('Error saving location:', error);
    }
  };

  const renderItem = ({ item, onPress }) => (
    <Pressable style={styles.dropdownItem} onPress={onPress}>
      <Text style={styles.dropdownItemText}>{item}</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} // Quay về VerificationScreen
      >
        <Icon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.container}>
        <Icon name="map-marker-alt" size={70} color="#53B175" style={styles.mapIcon} />
        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.description}>
          Switch on your location to stay in tune with what’s happening in your area
        </Text>

        {/* Dropdown cho Your Zone */}
        <Text style={styles.label}>Your Zone</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setZoneModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{zone || 'Select Zone'}</Text>
        </TouchableOpacity>
        <Modal
          visible={zoneModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setZoneModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setZoneModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={zones}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    onPress: () => {
                      setZone(item);
                      setZoneModalVisible(false);
                    },
                  })
                }
                keyExtractor={(item) => item}
              />
            </View>
          </Pressable>
        </Modal>

        {/* Dropdown cho Your Area */}
        <Text style={styles.label}>Your Area</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setAreaModalVisible(true)}
        >
          <Text style={styles.dropdownText}>{area || 'Select Area'}</Text>
        </TouchableOpacity>
        <Modal
          visible={areaModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setAreaModalVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setAreaModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <FlatList
                data={areas}
                renderItem={({ item }) =>
                  renderItem({
                    item,
                    onPress: () => {
                      setArea(item);
                      setAreaModalVisible(false);
                    },
                  })
                }
                keyExtractor={(item) => item}
              />
            </View>
          </Pressable>
        </Modal>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}