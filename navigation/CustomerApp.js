import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import RestaurantList from '../screens/RestaurantList';
import RestaurantDetail from '../screens/RestaurantDetail';
import Menu from '../screens/Menu';
import Reservation from '../screens/Reservation';
import QuickView from '../screens/QuickView';
import Profile from '../screens/Profile';
import CitySelection from '../screens/CitySelection';
import Contact from '../screens/Contact';
import Reservations from '../screens/Reservations';
import Favorites from '../screens/Favorites';
import Promotions from '../screens/Promotions';
import Notifications from '../screens/Notifications';
import PaymentMethods from '../screens/PaymentMethods';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

function CustomerApp() {
  return (
    <Stack.Navigator
      initialRouteName="CitySelection"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="CitySelection" 
        component={CitySelection} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="RestaurantList" 
        component={RestaurantList} 
        options={({ route, navigation }) => ({ 
          title: route.params.city,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CitySelection')} style={{ marginLeft: 15 }}>
              <Ionicons name="location-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 15 }}>
              <Ionicons name="person-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
          ),
        })} 
      />
      <Stack.Screen 
        name="RestaurantDetail" 
        component={RestaurantDetail} 
        options={({ route }) => ({ title: route.params.restaurantName })}
      />
      <Stack.Screen name="Menu" component={Menu} options={{ title: 'Restaurant Menu' }} />
      <Stack.Screen name="Reservation" component={Reservation} options={{ title: 'Book a Table' }} />
      <Stack.Screen name="QuickView" component={QuickView} options={{ title: 'Quick View' }} />
      <Stack.Screen 
        name="Profile" 
        component={Profile} 
        options={{ 
          title: 'Mi Perfil',
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}>
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen name="Contact" component={Contact} options={{ title: 'Contact Us' }} />
      <Stack.Screen name="Reservations" component={Reservations} options={{ title: 'Mis Reservas' }} />
      <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favoritos' }} />
      <Stack.Screen name="Promotions" component={Promotions} options={{ title: 'Promociones' }} />
      <Stack.Screen name="Notifications" component={Notifications} options={{ title: 'Notificaciones' }} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethods} options={{ title: 'Métodos de Pago' }} />
      <Stack.Screen name="Settings" component={Settings} options={{ title: 'Configuración' }} />
    </Stack.Navigator>
  );
}

export default CustomerApp;