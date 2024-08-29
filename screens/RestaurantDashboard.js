import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const initialOrders = [
  { id: '1', customer: 'John Doe', items: ['Classic Burger', 'French Fries'], total: '$17.98', status: 'Pending' },
  { id: '2', customer: 'Jane Smith', items: ['Veggie Burger', 'Soda'], total: '$15.98', status: 'Preparing' },
  { id: '3', customer: 'Bob Johnson', items: ['Cheeseburger', 'Onion Rings'], total: '$18.98', status: 'Ready' },
];

function RestaurantDashboard({ navigation }) {
  const [orders, setOrders] = useState(initialOrders);
  const { logout } = useAuth();

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderCustomer}>{item.customer}</Text>
      <Text>{item.items.join(', ')}</Text>
      <Text style={styles.orderTotal}>{item.total}</Text>
      <View style={styles.orderActions}>
        <Text style={styles.orderStatus}>{item.status}</Text>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => updateOrderStatus(item.id, 'Completed')}
        >
          <Text style={styles.updateButtonText}>Mark Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleLogout = () => {
    logout();
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Dashboard</Text>
      <Text style={styles.subtitle}>Current Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.orderList}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderList: {
    paddingBottom: 20,
  },
  orderItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderTotal: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#f4511e',
  },
  updateButton: {
    backgroundColor: '#4A5568',
    padding: 8,
    borderRadius: 4,
  },
  updateButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#4A5568',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default RestaurantDashboard;