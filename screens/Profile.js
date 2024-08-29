import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

function Profile({ navigation }) {
  const { user, logout } = useAuth();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLogout = () => {
    logout();
    navigation.replace('Home');
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }}
          style={styles.profileImage}
        />
        <Text style={styles.name}>{user?.name || 'Juan Pérez'}</Text>
        <Text style={styles.email}>{user?.email || 'juan.perez@example.com'}</Text>
      </Animated.View>

      <Animated.View style={[styles.rewardsContainer, { opacity: fadeAnim }]}>
        <Text style={styles.rewardsTitle}>Tus Arepuntos</Text>
        <Text style={styles.rewardsAmount}>1,250</Text>
        <Text style={styles.rewardsInfo}>Gana Arepuntos con cada reserva y pago</Text>
      </Animated.View>

      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <ProfileItem icon="restaurant-outline" text="Mis Reservas" onPress={() => navigateTo('Reservations')} />
        <ProfileItem icon="heart-outline" text="Favoritos" onPress={() => navigateTo('Favorites')} />
        <ProfileItem icon="gift-outline" text="Promociones" onPress={() => navigateTo('Promotions')} />
        <ProfileItem icon="notifications-outline" text="Notificaciones" onPress={() => navigateTo('Notifications')} />
        <ProfileItem icon="card-outline" text="Métodos de Pago" onPress={() => navigateTo('PaymentMethods')} />
        <ProfileItem icon="settings-outline" text="Configuración" onPress={() => navigateTo('Settings')} />
      </Animated.View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function ProfileItem({ icon, text, onPress }) {
  return (
    <TouchableOpacity style={styles.sectionItem} onPress={onPress}>
      <Ionicons name={icon} size={24} color="#f4511e" />
      <Text style={styles.sectionItemText}>{text}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="#666" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#f4511e',
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
  rewardsContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rewardsAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f4511e',
    marginBottom: 10,
  },
  rewardsInfo: {
    textAlign: 'center',
    color: '#666',
  },
  section: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    elevation: 3,
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionItemText: {
    flex: 1,
    marginLeft: 20,
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#f4511e',
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Profile;