import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getRestaurantById } from '../data/restaurants';

function QuickView({ route, navigation }) {
  const { restaurantId } = route.params;
  const restaurant = getRestaurantById(restaurantId);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.price}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
        </View>
        <Text style={styles.address}>{restaurant.address}</Text>
        {restaurant.specialOffer && (
          <View style={styles.offerContainer}>
            <Ionicons name="pricetag" size={16} color="#4CAF50" />
            <Text style={styles.offerText}>{restaurant.specialOffer}</Text>
          </View>
        )}
        <Text style={styles.openingHours}>Opening Hours: {restaurant.openingHours}</Text>
        <TouchableOpacity 
          style={styles.detailButton}
          onPress={() => navigation.navigate('RestaurantDetail', { restaurantId, restaurantName: restaurant.name })}
        >
          <Text style={styles.detailButtonText}>View Full Details</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  offerText: {
    marginLeft: 4,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  openingHours: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  detailButton: {
    backgroundColor: '#f4511e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default QuickView;