import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const menuItems = {
  '1': [
    { id: '1', name: 'Classic Burger', price: '$12.99', description: 'Juicy beef patty with fresh toppings', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Cheeseburger', price: '$13.99', description: 'Classic burger with melted cheese', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Veggie Burger', price: '$11.99', description: 'Plant-based patty with fresh vegetables', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'French Fries', price: '$4.99', description: 'Crispy golden fries', image: 'https://via.placeholder.com/100' },
  ],
  '2': [
    { id: '1', name: 'Margherita Pizza', price: '$14.99', description: 'Classic tomato and mozzarella', image: 'https://via.placeholder.com/100' },
    { id: '2', name: 'Pepperoni Pizza', price: '$15.99', description: 'Spicy pepperoni with cheese', image: 'https://via.placeholder.com/100' },
    { id: '3', name: 'Vegetarian Pizza', price: '$14.99', description: 'Assorted vegetables and cheese', image: 'https://via.placeholder.com/100' },
    { id: '4', name: 'Garlic Bread', price: '$5.99', description: 'Toasted bread with garlic butter', image: 'https://via.placeholder.com/100' },
  ],
};

function Menu({ route }) {
  const { restaurantId, restaurantName } = route.params;
  const restaurantMenu = menuItems[restaurantId] || [];

  const renderItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurantName}</Text>
      <FlatList
        data={restaurantMenu}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.menuList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  menuList: {
    paddingBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
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
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    marginTop: 4,
    color: '#666',
  },
  itemPrice: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f4511e',
  },
});

export default Menu;