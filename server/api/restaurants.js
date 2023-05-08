const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { requireAuth } = require('./authentication/authMiddleware');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.MAPS_API_KEY,
  Promise: Promise
});

function isInNYC(lat, lng) {
  const nycBounds = {
    north: 40.917577,
    south: 40.477399,
    east: -73.700272,
    west: -74.25909
  };
  return lat >= nycBounds.south && lat <= nycBounds.north && lng >= nycBounds.west && lng <= nycBounds.east;
}

router.get('/', requireAuth, async (req, res, next) => {
  try {
    console.log('user:', req.user)
    const userLat = req.user.latitude;
    const userLng = req.user.longitude;
    console.log("User latitude:", userLat);
    console.log("User longitude:", userLng);

    // Call the Google Places API to get nearby restaurants, cafes, bakeries, delis, and bodegas
    const response = await googleMapsClient.placesNearby({
      location: [userLat, userLng],
      radius: 1609,
      type: 'restaurant'
    }).asPromise();

    // Filter out any restaurants that aren't within the five boroughs of NYC
    const nycBounds = {
      north: 40.917577,
      south: 40.477399,
      east: -73.700272,
      west: -74.25909
    };
    const restaurants = response.json.results.filter(result => {
      const lat = result.geometry.location.lat;
      const lng = result.geometry.location.lng;
      return lat >= nycBounds.south && lat <= nycBounds.north && lng >= nycBounds.west && lng <= nycBounds.east;
    });

    // Extract the relevant information from the API response and create a new Restaurant instance for each place
    const restaurantsInfo = restaurants.map((result) => ({
      name: result.name,
      address: result.vicinity,
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      photoUrl: result.photos && result.photos[0] && result.photos[0].getUrl ? result.photos[0].getUrl() : null,
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
    restaurantsInfo.forEach((restaurant) => {
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
    restaurantsInfo.sort((a, b) => a.distance - b.distance);

    // Return the sorted restaurants
    res.json(restaurantsInfo);
  } catch (error) {
    next(error);
  }
});

module.exports = router;