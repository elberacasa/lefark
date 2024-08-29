import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      <Text>Aquí se mostrarán las opciones de configuración.</Text>
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
});

export default Settings;