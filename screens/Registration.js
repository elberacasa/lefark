import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

function Registration({ navigation }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [contactDetails, setContactDetails] = useState('');

  const handleRegister = () => {
    // Here you would typically send the registration data to a server
    Alert.alert('Registration Successful', 'Welcome to our platform!');
    // Navigate to the dashboard (we'll create this later)
    navigation.navigate('Dashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register Your Restaurant</Text>
      <TextInput
        style={styles.input}
        placeholder="Restaurant Name"
        value={restaurantName}
        onChangeText={setRestaurantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact Details"
        value={contactDetails}
        onChangeText={setContactDetails}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Registration;