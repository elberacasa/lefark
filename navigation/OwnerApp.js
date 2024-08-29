import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RestaurantDashboard from '../screens/RestaurantDashboard';
import Registration from '../screens/Registration';

const Stack = createStackNavigator();

function OwnerApp() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4A5568',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Dashboard" component={RestaurantDashboard} options={{ title: 'Restaurant Dashboard' }} />
      <Stack.Screen name="Registration" component={Registration} options={{ title: 'Register Restaurant' }} />
    </Stack.Navigator>
  );
}

export default OwnerApp;