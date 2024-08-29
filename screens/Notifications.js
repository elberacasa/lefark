import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const notifications = [
  { id: '1', title: 'Reserva confirmada', message: 'Tu reserva en Arepera La Caraqueña ha sido confirmada.', date: '2023-05-10', read: false },
  { id: '2', title: 'Nueva promoción', message: 'Aprovecha el 2x1 en postres en Pabellón Criollo.', date: '2023-05-08', read: true },
  { id: '3', title: 'Recordatorio de reserva', message: 'Tu reserva en Sushi Nikkei es mañana a las 20:00.', date: '2023-05-05', read: false },
];

function Notifications() {
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity style={[styles.notificationItem, !item.read && styles.unreadNotification]}>
      <View style={styles.notificationIcon}>
        <Ionicons name={item.read ? "notifications-outline" : "notifications"} size={24} color="#f4511e" />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificaciones</Text>
      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noNotifications}>No tienes notificaciones.</Text>
      )}
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
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  unreadNotification: {
    backgroundColor: '#FFF5F5',
  },
  notificationIcon: {
    marginRight: 15,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  noNotifications: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Notifications;