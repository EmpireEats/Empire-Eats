const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { requireAuth } = require('./authentication/authMiddleware');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_API_KEY,
  Promise: Promise
});

router.get('/', async (req, res, next) => {
  try {
    // Get the user's latitude and longitude from the JWT token
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    const userLat = decoded.latitude;
    const userLng = decoded.longitude;
    console.log("User latitude:", userLat);
    console.log("User longitude:", userLng);

    // Call the Google Places API to get nearby restaurants, cafes, bakeries, delis, and bodegas
    const response = await googleMapsClient.placesNearby({
      location: [userLat, userLng],
      radius: 1609,
      type: 'restaurant, cafe, bakery, grocery_or_supermarket'
    }).asPromise();

    // Extract the relevant information from the API response and create a new Restaurant instance for each place
    const restaurants = response.json.results.map((result) => ({
      name: result.name,
      address: result.vicinity,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      photoUrl: result.photos ? result.photos[0].getUrl() : null,
      rating: result.rating || null,
      types: result.types || null,
      website: result.website || null,
      phoneNumber: result.formatted_phone_number || null,
      openingHours: result.opening_hours ? {
        weekdayText: result.opening_hours.weekday_text,
        isOpenNow: result.opening_hours.open_now
      } : null
    }));

    // Compute the distance between the user and each restaurant using the Haversine formula
    restaurants.forEach((restaurant) => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = userLat * Math.PI/180;
      const λ1 = userLng * Math.PI/180;
      const φ2 = restaurant.latitude * Math.PI/180;
      const λ2 = restaurant.longitude * Math.PI/180;
      const Δφ = φ2 - φ1;
      const Δλ = λ2 - λ1;
      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const d = R * c;
      restaurant.distance = d;
    });

    // Sort the restaurants by distance, closest first
    restaurants.sort((a, b) => a.distance - b.distance);

    res.json(restaurants);
  } catch (error) {
    next(error);
  }
});

module.exports = router;