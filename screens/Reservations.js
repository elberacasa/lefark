import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const reservations = [
  { id: '1', restaurant: 'Arepera La Caraqueña', date: '2023-05-15', time: '19:00', guests: 2 },
  { id: '2', restaurant: 'Pabellón Criollo', date: '2023-05-20', time: '20:30', guests: 4 },
  { id: '3', restaurant: 'Sushi Nikkei', date: '2023-05-25', time: '18:30', guests: 3 },
];

function Reservations({ navigation }) {
  const renderReservationItem = ({ item }) => (
    <View style={styles.reservationItem}>
      <Text style={styles.restaurantName}>{item.restaurant}</Text>
      <Text style={styles.reservationDetails}>Date: {item.date}</Text>
      <Text style={styles.reservationDetails}>Time: {item.time}</Text>
      <Text style={styles.reservationDetails}>Guests: {item.guests}</Text>
      <TouchableOpacity style={styles.cancelButton}>
        <Text style={styles.cancelButtonText}>Cancel Reservation</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Reservations</Text>
      {reservations.length > 0 ? (
        <FlatList
          data={reservations}
          renderItem={renderReservationItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noReservations}>You don't have any active reservations.</Text>
      )}
      <TouchableOpacity
        style={styles.newReservationButton}
        onPress={() => navigation.navigate('RestaurantList')}
      >
        <Ionicons name="add-circle-outline" size={24} color="white" />
        <Text style={styles.newReservationButtonText}>Make a New Reservation</Text>
      </TouchableOpacity>
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
  reservationItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  reservationDetails: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  cancelButton: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noReservations: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  newReservationButton: {
    backgroundColor: '#f4511e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  newReservationButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default Reservations;