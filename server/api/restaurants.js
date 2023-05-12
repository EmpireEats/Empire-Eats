const express = require('express');
const axios = require('axios');
const router = express.Router();

const nycBounds = {
  north: 40.917577,
  south: 40.477399,
  east: -73.700272,
  west: -74.259090
};

// router.get('/', async (req, res) => {
//   try {
//     const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${req.query.latitude},${req.query.longitude}&radius=1609.34&type=restaurant&key=${process.env.GOOGLE_MAPS_API_KEY}`);
//     const restaurants = data.results.filter(result =>
//       result.geometry &&
//       result.geometry.location &&
//       result.geometry.location.lat >= nycBounds.south &&
//       result.geometry.location.lat <= nycBounds.north &&
//       result.geometry.location.lng >= nycBounds.west &&
//       result.geometry.location.lng <= nycBounds.east
//     ).map(result => ({
//       name: result.name,
//       address: result.vicinity,
//       location: {
//         lat: result.geometry.location.lat,
//         lng: result.geometry.location.lng
//       },
//       placeId: result.place_id
//     }));
//     res.json(restaurants);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });


//BEST WORKING BACKEND ROUTE
async function fetchRestaurants(latitude, longitude, pagetoken) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const url = `${baseUrl}?location=${latitude},${longitude}&type=restaurant&keyword=restaurant&rankby=distance&key=${process.env.GOOGLE_MAPS_API_KEY}` + (pagetoken ? `&pagetoken=${pagetoken}` : '');
  const { data } = await axios.get(url);
  return data;
}

router.get('/', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    let allRestaurants = [];

    const firstResponse = await fetchRestaurants(latitude, longitude);
    allRestaurants = allRestaurants.concat(firstResponse.results);

    if (firstResponse.next_page_token) {
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      const secondResponse = await fetchRestaurants(latitude, longitude, firstResponse.next_page_token);
      allRestaurants = allRestaurants.concat(secondResponse.results);
    }

    const restaurants = allRestaurants
      .filter(result =>
        result.geometry &&
        result.geometry.location &&
        result.geometry.location.lat >= nycBounds.south &&
        result.geometry.location.lat <= nycBounds.north &&
        result.geometry.location.lng >= nycBounds.west &&
        result.geometry.location.lng <= nycBounds.east &&
        result.types &&
        result.types.includes('restaurant')
      )
      .map(result => ({
        name: result.name,
        address: result.vicinity,
        location: {
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng
        },
        placeId: result.place_id
      }));

    res.json(restaurants);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/:placeId', async (req, res) => {
  try {
    const { data } = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.params.placeId}&fields=name,formatted_address,geometry,formatted_phone_number,opening_hours,types,website&key=${process.env.GOOGLE_MAPS_API_KEY}`);
    const restaurant = {
      name: data.result.name,
      address: data.result.formatted_address,
      location: {
        lat: data.result.geometry.location.lat,
        lng: data.result.geometry.location.lng
      },
      vicinity: data.result.vicinity,
      placeId: data.result.place_id,
      formattedPhoneNumber: data.result.formatted_phone_number,
      openingHours: data.result.opening_hours,
      types: data.result.types,
      website: data.result.website
    };
    res.json(restaurant);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;