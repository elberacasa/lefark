import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const promotions = [
  { id: '1', title: '20% de descuento en Arepera La Caraqueña', description: 'Válido de lunes a jueves', expirationDate: '2023-05-31' },
  { id: '2', title: '2x1 en postres en Pabellón Criollo', description: 'Con la compra de un plato principal', expirationDate: '2023-06-15' },
  { id: '3', title: 'Sushi gratis en Sushi Nikkei', description: 'En tu cumpleaños', expirationDate: '2023-12-31' },
];

function Promotions() {
  const renderPromotionItem = ({ item }) => (
    <View style={styles.promotionItem}>
      <Ionicons name="pricetag" size={24} color="#f4511e" style={styles.promotionIcon} />
      <View style={styles.promotionInfo}>
        <Text style={styles.promotionTitle}>{item.title}</Text>
        <Text style={styles.promotionDescription}>{item.description}</Text>
        <Text style={styles.promotionExpiration}>Válido hasta: {item.expirationDate}</Text>
      </View>
      <TouchableOpacity style={styles.useButton}>
        <Text style={styles.useButtonText}>Usar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promociones</Text>
      {promotions.length > 0 ? (
        <FlatList
          data={promotions}
          renderItem={renderPromotionItem}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noPromotions}>No hay promociones disponibles en este momento.</Text>
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
  promotionItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  promotionIcon: {
    marginRight: 15,
  },
  promotionInfo: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  promotionExpiration: {
    fontSize: 12,
    color: '#999',
  },
  useButton: {
    backgroundColor: '#f4511e',
    padding: 8,
    borderRadius: 5,
  },
  useButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  noPromotions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default Promotions;