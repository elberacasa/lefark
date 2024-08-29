import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, TextInput, ImageBackground, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { restaurants } from '../data/restaurants';

const { width } = Dimensions.get('window');

const initialRestaurants = [
  { id: '1', name: 'Arepera La Caraqueña', cuisine: 'Venezuelan', rating: 4.7, reviewCount: 328, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', price: '$$', address: 'Av. Francisco de Miranda, Caracas', specialOffer: '20% off on arepas', distance: '0.5 km', deliveryTime: '20-30 min' },
  { id: '2', name: 'Pabellón Criollo', cuisine: 'Venezuelan', rating: 4.5, reviewCount: 215, image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', price: '$$$', address: 'Calle Real de Sabana Grande, Caracas', specialOffer: 'Free dessert with main course', distance: '0.8 km', deliveryTime: '25-35 min' },
  { id: '3', name: 'Sushi Nikkei', cuisine: 'Japanese-Peruvian', rating: 4.8, reviewCount: 542, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', price: '$$$$', address: 'C. C. San Ignacio, Caracas', specialOffer: 'All-you-can-eat sushi on Sundays', distance: '1.2 km', deliveryTime: '30-40 min' },
  { id: '4', name: 'La Castellana Grill', cuisine: 'Steakhouse', rating: 4.3, reviewCount: 187, image: 'https://images.unsplash.com/photo-1515443961218-a51367888e4b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', price: '$$$', address: 'Av. Principal de La Castellana, Caracas', specialOffer: 'Happy hour: 2-for-1 cocktails', distance: '1.5 km', deliveryTime: '35-45 min' },
  { id: '5', name: 'Empanadas Don Carlos', cuisine: 'Venezuelan', rating: 4.6, reviewCount: 401, image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80', price: '$', address: 'Av. Libertador, Caracas', specialOffer: 'Buy 5 empanadas, get 1 free', distance: '0.3 km', deliveryTime: '15-25 min' },
];

function RestaurantList({ navigation, route }) {
  const { city } = route.params;
  const [restaurants, setRestaurants] = useState(restaurants);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useFocusEffect(
    useCallback(() => {
      setRestaurants(initialRestaurants);
      setSearchQuery('');
      setActiveFilter('All');
    }, [])
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filteredRestaurants = initialRestaurants.filter(restaurant => 
      restaurant.name.toLowerCase().includes(query.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(query.toLowerCase())
    );
    setRestaurants(filteredRestaurants);
  };

  const handleFilter = (cuisine) => {
    setActiveFilter(cuisine);
    if (cuisine === 'All') {
      setRestaurants(initialRestaurants);
    } else {
      const filteredRestaurants = initialRestaurants.filter(restaurant => 
        restaurant.cuisine === cuisine
      );
      setRestaurants(filteredRestaurants);
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
          data={['All', 'Venezuelan', 'Japanese-Peruvian', 'Steakhouse']}
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
        data={restaurants}
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