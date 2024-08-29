export const restaurants = [
  {
    id: '1',
    name: 'Arepera La Caraqueña',
    cuisine: 'Venezuelan',
    rating: 4.7,
    reviewCount: 328,
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    price: '$$',
    address: 'Av. Francisco de Miranda, Caracas',
    description: 'Experience authentic Venezuelan cuisine in a cozy Caracas atmosphere. Our chef brings the flavors of Venezuela to your plate with locally sourced ingredients and traditional recipes.',
    specialOffer: '20% off on arepas',
    distance: '0.5 km',
    deliveryTime: '20-30 min',
    openingHours: 'Mon-Sat: 11:00 AM - 11:00 PM, Sun: 12:00 PM - 10:00 PM',
    phoneNumber: '+58 212 123 4567',
    website: 'www.areperalacaraquena.com',
    menu: [
      { id: '1', name: 'Arepa Reina Pepiada', price: '8.000 Bs.', description: 'Shredded chicken and avocado arepa', image: 'https://images.unsplash.com/photo-1598023696416-0193a0bcd302?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      { id: '2', name: 'Pabellón Criollo', price: '15.000 Bs.', description: 'Traditional Venezuelan dish with shredded beef, black beans, rice, and fried plantains', image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      { id: '3', name: 'Cachapa', price: '10.000 Bs.', description: 'Sweet corn pancake filled with cheese', image: 'https://images.unsplash.com/photo-1591454371758-644f9d123a81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
      { id: '4', name: 'Tres Leches', price: '7.000 Bs.', description: 'Traditional three milk cake', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' },
    ],
    reviews: [
      { id: '1', user: 'Maria L.', rating: 5, date: '2023-03-15', comment: '¡Delicioso! Las mejores arepas de Caracas.' },
      { id: '2', user: 'Juan P.', rating: 4, date: '2023-02-28', comment: 'Excelente comida y servicio. Un poco caro pero vale la pena para ocasiones especiales.' },
      { id: '3', user: 'Ana T.', rating: 5, date: '2023-04-02', comment: '¡El pabellón criollo estaba espectacular! Definitivamente volveré.' },
    ],
  },
  // Add more restaurants here...
];

export const getRestaurantById = (id) => {
  return restaurants.find(restaurant => restaurant.id === id);
};