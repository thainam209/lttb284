// screens/FilterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Dùng biểu tượng checkbox

const FilterScreen = ({ navigation }) => {
  const [filters, setFilters] = useState({
    category: {
      eggs: true,
      noodlesPasta: false,
      chipsCrisps: false,
      fastFood: false,
    },
    brand: {
      individualCollection: false,
      cocola: true,
      ifad: false,
      kaziFarmas: false,
    },
  });

  const handleCategoryChange = (category) => {
    setFilters({
      ...filters,
      category: {
        ...filters.category,
        [category]: !filters.category[category],
      },
    });
  };

  const handleBrandChange = (brand) => {
    setFilters({
      ...filters,
      brand: {
        ...filters.brand,
        [brand]: !filters.brand[brand],
      },
    });
  };

  const applyFilters = () => {
    navigation.goBack();
  };

  const CustomCheckbox = ({ isChecked, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.checkboxContainer}>
      {isChecked ? (
        <Icon name="check-box" size={24} color="#53B175" />
      ) : (
        <Icon name="check-box-outline-blank" size={24} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.category.eggs}
            onPress={() => handleCategoryChange('eggs')}
          />
          <Text style={styles.filterText}>Egg</Text>
        </View>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.category.noodlesPasta}
            onPress={() => handleCategoryChange('noodlesPasta')}
          />
          <Text style={styles.filterText}>Noodles & Pasta</Text>
        </View>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.category.chipsCrisps}
            onPress={() => handleCategoryChange('chipsCrisps')}
          />
          <Text style={styles.filterText}>Chips & Crisps</Text>
        </View>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.category.fastFood}
            onPress={() => handleCategoryChange('fastFood')}
          />
          <Text style={styles.filterText}>Fast Food</Text>
        </View>

        <Text style={styles.sectionTitle}>Brand</Text>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.brand.individualCollection}
            onPress={() => handleBrandChange('individualCollection')}
          />
          <Text style={styles.filterText}>Individual Callection</Text>
        </View>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.brand.cocola}
            onPress={() => handleBrandChange('cocola')}
          />
          <Text style={styles.filterText}>Cocola</Text>
        </View>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.brand.ifad}
            onPress={() => handleBrandChange('ifad')}
          />
          <Text style={styles.filterText}>Ifad</Text>
        </View>
        <View style={styles.filterItem}>
          <CustomCheckbox
            isChecked={filters.brand.kaziFarmas}
            onPress={() => handleBrandChange('kaziFarmas')}
          />
          <Text style={styles.filterText}>Kazi Farmas</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.applyButton} onPress={applyFilters}>
        <Text style={styles.applyButtonText}>Apply Filter</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    paddingTop: 30,
    marginBottom: 30,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  filterItem: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    marginVertical: 5,
  },
  filterText: {
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButton: {
    backgroundColor: '#53B175',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FilterScreen;