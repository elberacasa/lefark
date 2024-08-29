import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput, FlatList, ImageBackground, Dimensions, Linking, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getRestaurantById } from '../data/restaurants';
import ReservationPanel from '../components/ReservationPanel';

const { width } = Dimensions.get('window');

function RestaurantDetail({ route, navigation }) {
  const { restaurantId } = route.params;
  const restaurant = getRestaurantById(restaurantId);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showReservationPanel, setShowReservationPanel] = useState(false);

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

  const handleCall = () => {
    const phoneNumber = restaurant.phoneNumber.replace(/\s/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = () => {
    const phoneNumber = restaurant.phoneNumber.replace(/\s/g, '');
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  const handleWebsite = () => {
    Linking.openURL(`https://${restaurant.website}`);
  };

  const handleMap = () => {
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
    const latLng = `${restaurant.latitude},${restaurant.longitude}`;
    const label = restaurant.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    });
    Linking.openURL(url);
  };

  const handleReservation = (reservationDetails) => {
    // Here you would typically send the reservation data to a server
    Alert.alert('Reservation Confirmed', `Your table at ${restaurant.name} has been booked for ${reservationDetails.date} at ${reservationDetails.time} for ${reservationDetails.guests} guests.`);
    setShowReservationPanel(false);
  };

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
          <Text style={styles.rating}>{restaurant.rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({restaurant.reviewCount} reviews)</Text>
        </View>
        <TouchableOpacity style={styles.addressContainer} onPress={handleMap}>
          <Ionicons name="location-outline" size={20} color="#f4511e" />
          <Text style={styles.address}>{restaurant.address}</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          {showFullDescription ? restaurant.description : `${restaurant.description.slice(0, 100)}...`}
        </Text>
        <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
          <Text style={styles.readMore}>{showFullDescription ? 'Read Less' : 'Read More'}</Text>
        </TouchableOpacity>
        
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCall}>
            <Ionicons name="call-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleWhatsApp}>
            <Ionicons name="logo-whatsapp" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>WhatsApp</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleWebsite}>
            <Ionicons name="globe-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Website</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleMap}>
            <Ionicons name="map-outline" size={24} color="#f4511e" />
            <Text style={styles.actionButtonText}>Map</Text>
          </TouchableOpacity>
        </View>

        {restaurant.specialOffer && (
          <TouchableOpacity style={styles.offerContainer} onPress={() => setShowReservationPanel(true)}>
            <Ionicons name="pricetag" size={20} color="#4CAF50" />
            <Text style={styles.offerText}>{restaurant.specialOffer}</Text>
          </TouchableOpacity>
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
        <TouchableOpacity onPress={handleWebsite}>
          <Text style={[styles.info, styles.link]}><Ionicons name="globe-outline" size={16} color="#666" /> {restaurant.website}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.reserveButton} onPress={() => setShowReservationPanel(true)}>
          <Text style={styles.reserveButtonText}>Book a Table</Text>
        </TouchableOpacity>

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

      {showReservationPanel && (
        <ReservationPanel
          restaurant={restaurant}
          onClose={() => setShowReservationPanel(false)}
          onReserve={handleReservation}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  cuisine: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
  infoContainer: {
    padding: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewCount: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  readMore: {
    color: '#f4511e',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionButtonText: {
    marginTop: 4,
    fontSize: 12,
    color: '#f4511e',
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  offerText: {
    marginLeft: 8,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    fontSize: 14,
    marginBottom: 8,
  },
  link: {
    color: '#f4511e',
    textDecorationLine: 'underline',
  },
  reserveButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  reserveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
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