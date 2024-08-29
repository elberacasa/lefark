import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const favoriteRestaurants = [
  { id: '1', name: 'Arepera La Caraqueña', cuisine: 'Venezuelan', rating: 4.7, image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: '2', name: 'Pabellón Criollo', cuisine: 'Venezuelan', rating: 4.5, image: 'https://images.unsplash.com/photo-1534790566855-4cb788d389ec?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
  { id: '3', name: 'Sushi Nikkei', cuisine: 'Japanese-Peruvian', rating: 4.8, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
];

function Favorites() {
  const renderFavoriteItem = ({ item }) => (
    <TouchableOpacity style={styles.favoriteItem}>
      <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.name}</Text>
        <Text style={styles.cuisineType}>{item.cuisine}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{item.rating}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="heart-dislike" size={24} color="#f4511e" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoritos</Text>
      {favoriteRestaurants.length > 0 ? (
        <FlatList
          data={favoriteRestaurants}
          renderItem={renderFavoriteItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noFavorites}>No tienes restaurantes favoritos.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    overflow: 'hidden',
  },
  restaurantImage: {
    width: 100,
    height: 100,
  },
  restaurantInfo: {
    flex: 1,
    padding: 10,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cuisineType: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: 'bold',
  },
  removeButton: {
    padding: 10,
    justifyContent: 'center',
  },
  noFavorites: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Favorites;