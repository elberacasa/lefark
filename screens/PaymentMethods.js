import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const paymentMethods = [
  { id: '1', type: 'credit', name: 'Visa', lastFour: '1234', expirationDate: '12/24' },
  { id: '2', type: 'debit', name: 'Mastercard', lastFour: '5678', expirationDate: '09/25' },
  { id: '3', type: 'paypal', name: 'PayPal', email: 'usuario@example.com' },
];

function PaymentMethods() {
  const renderPaymentMethodItem = ({ item }) => (
    <View style={styles.paymentMethodItem}>
      <View style={styles.paymentMethodIcon}>
        <Ionicons 
          name={item.type === 'paypal' ? 'logo-paypal' : 'card-outline'} 
          size={24} 
          color="#f4511e" 
        />
      </View>
      <View style={styles.paymentMethodInfo}>
        <Text style={styles.paymentMethodName}>{
          item.type === 'paypal' ? item.email : `${item.name} - ${item.lastFour}`
        }</Text>
        {item.type !== 'paypal' && (
          <Text style={styles.paymentMethodExpiration}>Expira: {item.expirationDate}</Text>
        )}
      </View>
      <TouchableOpacity style={styles.removeButton}>
        <Ionicons name="trash-outline" size={24} color="#f4511e" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Métodos de Pago</Text>
      {paymentMethods.length > 0 ? (
        <FlatList
          data={paymentMethods}
          renderItem={renderPaymentMethodItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noPaymentMethods}>No tienes métodos de pago guardados.</Text>
      )}
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Agregar Método de Pago</Text>
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
  paymentMethodItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  paymentMethodIcon: {
    marginRight: 15,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  paymentMethodExpiration: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    padding: 10,
  },
  noPaymentMethods: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#f4511e',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PaymentMethods;