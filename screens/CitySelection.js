import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const cities = [
  { id: '1', name: 'Caracas' },
  { id: '2', name: 'Maracaibo' },
  { id: '3', name: 'Valencia' },
  { id: '4', name: 'Barquisimeto' },
  { id: '5', name: 'Maracay' },
];

function CitySelection({ navigation }) {
  const handleCitySelect = (city) => {
    navigation.navigate('RestaurantList', { city: city.name });
  };

  const handleUseCurrentLocation = () => {
    // In a real app, you would use geolocation here
    // For now, we'll just navigate to Caracas as an example
    navigation.navigate('RestaurantList', { city: 'Caracas' });
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity style={styles.cityItem} onPress={() => handleCitySelect(item)}>
      <Text style={styles.cityName}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={24} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select a City</Text>
      <TouchableOpacity style={styles.locationButton} onPress={handleUseCurrentLocation}>
        <Ionicons name="location" size={24} color="#f4511e" />
        <Text style={styles.locationButtonText}>Use Current Location</Text>
      </TouchableOpacity>
      <FlatList
        data={cities}
        renderItem={renderCityItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.cityList}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  locationButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#f4511e',
    fontWeight: 'bold',
  },
  cityList: {
    paddingHorizontal: 20,
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  cityName: {
    fontSize: 18,
  },
});

export default CitySelection;