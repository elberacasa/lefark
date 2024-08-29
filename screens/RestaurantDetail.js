import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList, ImageBackground, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getRestaurantById } from '../data/restaurants';

const { width } = Dimensions.get('window');

function RestaurantDetail({ route, navigation }) {
  const { restaurantId } = route.params;
  const restaurant = getRestaurantById(restaurantId);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewPhotos, setReviewPhotos] = useState([]);

  const handleAddReview = () => {
    if (newReview.trim() === '') return;
    const review = {
      id: String(restaurant.reviews.length + 1),
      user: 'You',
      rating: newRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReview.trim(),
      photos: reviewPhotos,
      isVerified: true, // Assuming the current user is always verified
    };
    restaurant.reviews.unshift(review);
    setNewReview('');
    setNewRating(5);
    setReviewPhotos([]);
  };

  const handleAddPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setReviewPhotos([...reviewPhotos, result.assets[0].uri]);
    }
  };

  const renderReviewItem = ({ item }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewUserInfo}>
          <Text style={styles.reviewUser}>{item.user}</Text>
          {item.isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
              <Text style={styles.verifiedText}>Verified Diner</Text>
            </View>
          )}
        </View>
        <Text style={styles.reviewDate}>{item.date}</Text>
      </View>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= item.rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
      <Text style={styles.reviewComment}>{item.comment}</Text>
      {item.photos && item.photos.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewPhotosContainer}>
          {item.photos.map((photo, index) => (
            <Image key={index} source={{ uri: photo }} style={styles.reviewPhoto} />
          ))}
        </ScrollView>
      )}
    </View>
  );

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
        <Text style={styles.menuItemPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: restaurant.image }} style={styles.image}>
        <View style={styles.imageOverlay}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.price}</Text>
        </View>
      </ImageBackground>
      <View style={styles.infoContainer}>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.rating}>{restaurant.rating?.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({restaurant.reviewCount} reviews)</Text>
        </View>
        <Text style={styles.address}>{restaurant.address}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Reservation', { restaurantId, restaurantName: restaurant.name })}>
            <Ionicons name="calendar-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Reserve</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="call-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="map-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Map</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Share</Text>
          </TouchableOpacity>
        </View>

        {restaurant.specialOffer && (
          <View style={styles.offerContainer}>
            <Ionicons name="pricetag" size={20} color="#4CAF50" />
            <Text style={styles.offerText}>{restaurant.specialOffer}</Text>
          </View>
        )}
        
        {restaurant.menu && restaurant.menu.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Menu Highlights</Text>
            <FlatList
              data={restaurant.menu}
              renderItem={renderMenuItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}

        <Text style={styles.sectionTitle}>Information</Text>
        <Text style={styles.info}><Ionicons name="time-outline" size={16} color="#666" /> {restaurant.openingHours}</Text>
        <Text style={styles.info}><Ionicons name="call-outline" size={16} color="#666" /> {restaurant.phoneNumber}</Text>
        <Text style={styles.info}><Ionicons name="globe-outline" size={16} color="#666" /> {restaurant.website}</Text>

        <Text style={styles.sectionTitle}>Reviews</Text>
        <View style={styles.addReviewContainer}>
          <TextInput
            style={styles.reviewInput}
            placeholder="Write a review..."
            value={newReview}
            onChangeText={setNewReview}
            multiline
          />
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setNewRating(star)}>
                <Ionicons
                  name={star <= newRating ? 'star' : 'star-outline'}
                  size={30}
                  color="#f4511e"
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.addPhotoButton} onPress={handleAddPhoto}>
            <Ionicons name="camera-outline" size={24} color="#f4511e" />
            <Text style={styles.addPhotoText}>Add Photo</Text>
          </TouchableOpacity>
          {reviewPhotos.length > 0 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.reviewPhotosContainer}>
              {reviewPhotos.map((photo, index) => (
                <Image key={index} source={{ uri: photo }} style={styles.reviewPhoto} />
              ))}
            </ScrollView>
          )}
          <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
            <Text style={styles.addReviewButtonText}>Add Review</Text>
          </TouchableOpacity>
        </View>
        {restaurant.reviews && restaurant.reviews.length > 0 && (
          <FlatList
            data={restaurant.reviews}
            renderItem={renderReviewItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  imageOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    padding: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 18,
    color: 'white',
    marginBottom: 8,
  },
  infoContainer: {
    padding: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontWeight: 'bold',
    fontSize: 18,
  },
  reviewCount: {
    marginLeft: 4,
    color: '#666',
    fontSize: 16,
  },
  address: {
    color: '#666',
    marginBottom: 12,
  },
  description: {
    marginBottom: 16,
    lineHeight: 24,
    fontSize: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    marginTop: 4,
    color: '#f4511e',
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
  },
  offerText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 16,
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
  },
  menuItem: {
    width: width * 0.7,
    marginRight: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  menuItemInfo: {
    padding: 12,
  },
  menuItemName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  menuItemDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  menuItemPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f4511e',
  },
  addReviewContainer: {
    marginBottom: 16,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    height: 100,
    textAlignVertical: 'top',
  },
  addReviewButton: {
    backgroundColor: '#f4511e',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addReviewButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  reviewItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  reviewUser: {
    fontWeight: 'bold',
  },
  reviewDate: {
    color: '#666',
  },
  reviewComment: {
    color: '#333',
  },
  reviewUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  verifiedText: {
    color: '#4CAF50',
    fontSize: 12,
    marginLeft: 4,
  },
  reviewPhotosContainer: {
    marginTop: 10,
  },
  reviewPhoto: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  addPhotoText: {
    marginLeft: 8,
    color: '#f4511e',
    fontWeight: 'bold',
  },
});

export default RestaurantDetail;