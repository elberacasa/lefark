import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Restaurant App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login', { userType: 'customer' })}
      >
        <Text style={styles.buttonText}>I'm a Customer</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.ownerButton]}
        onPress={() => navigation.navigate('Login', { userType: 'owner' })}
      >
        <Text style={styles.buttonText}>I'm a Restaurant Owner</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  ownerButton: {
    backgroundColor: '#4A5568',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;