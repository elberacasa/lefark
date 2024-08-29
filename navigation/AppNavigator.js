import { createStackNavigator } from '@react-navigation/stack';
import RestaurantList from '../screens/RestaurantList';
import RestaurantDetail from '../screens/RestaurantDetail';
import MapSearch from '../screens/MapSearch';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="RestaurantList" component={RestaurantList} options={{ title: 'Restaurants' }} />
      <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} options={{ title: 'Restaurant Details' }} />
      <Stack.Screen name="MapSearch" component={MapSearch} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default AppNavigator;