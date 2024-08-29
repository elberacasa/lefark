import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { restaurants } from '../data/restaurants';

const { width } = Dimensions.get('window');

function RestaurantList({ navigation, route }) {
  const { city } = route.params;
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useFocusEffect(
    useCallback(() => {
      setFilteredRestaurants(restaurants);
      setSearchQuery('');
      setActiveFilter('All');
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = restaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleFilter = (cuisine) => {
    setActiveFilter(cuisine);
    if (cuisine === 'All') {
      setFilteredRestaurants(restaurants);
    } else {
      const filtered = restaurants.filter(restaurant => restaurant.cuisine === cuisine);
      setFilteredRestaurants(filtered);
    }
  };

  const renderRestaurantItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.restaurantItem}
      onPress={() => navigation.navigate('RestaurantDetail', { restaurantId: item.id, restaurantName: item.name })}
    >
      <ImageBackground source={{ uri: item.image }} style={styles.restaurantImage}>
        <View style={styles.overlay}>
          <Text style={styles.restaurantName}>{item.name}</Text>
          <Text style={styles.cuisineType}>{item.cuisine} • {item.price}</Text>
        </View>
      </ImageBackground>
      <View style={styles.restaurantInfo}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({item.reviewCount})</Text>
          <Text style={styles.distance}>{item.distance}</Text>
        </View>
        <Text style={styles.address}>{item.address}</Text>
        <View style={styles.deliveryInfo}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.deliveryTime}>{item.deliveryTime}</Text>
        </View>
        {item.specialOffer && (
          <View style={styles.offerContainer}>
            <Ionicons name="pricetag" size={16} color="#4CAF50" />
            <Text style={styles.offerText}>{item.specialOffer}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search restaurants or cuisines"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['All', 'Venezuelan', 'Japanese-Peruvian', 'Spanish', 'American']}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.filterButton, activeFilter === item && styles.activeFilter]}
              onPress={() => handleFilter(item)}
            >
              <Text style={[styles.filterButtonText, activeFilter === item && styles.activeFilterText]}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />
      </View>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 16,
    backgroundColor: '#f4511e',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 8,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#f4511e',
  },
  activeFilter: {
    backgroundColor: '#f4511e',
  },
  filterButtonText: {
    color: '#f4511e',
    fontWeight: 'bold',
  },
  activeFilterText: {
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  restaurantItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  restaurantImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  cuisineType: {
    fontSize: 16,
    color: 'white',
  },
  restaurantInfo: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewCount: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  distance: {
    marginLeft: 'auto',
    color: '#666',
    fontSize: 14,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTime: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 8,
    borderRadius: 4,
  },
  offerText: {
    marginLeft: 4,
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default RestaurantList;