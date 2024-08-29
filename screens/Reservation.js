import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import ReservationPanel from '../components/ReservationPanel';

function Reservation({ route, navigation }) {
  const { restaurantName, restaurantId } = route.params;
  const [showReservationPanel, setShowReservationPanel] = useState(true);

  const handleReservation = (reservationDetails) => {
    // Here you would typically send the reservation data to a server
    console.log('Reservation details:', reservationDetails);
    Alert.alert(
      'Reservation Confirmed',
      `Your table at ${restaurantName} has been booked for ${reservationDetails.date} at ${reservationDetails.time} for ${reservationDetails.guests} guests.`,
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Table at {restaurantName}</Text>
      {showReservationPanel && (
        <ReservationPanel
          restaurant={{ id: restaurantId, name: restaurantName }}
          onClose={() => navigation.goBack()}
          onReserve={handleReservation}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
});

export default Reservation;