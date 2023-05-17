const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const router = express.Router();

const myCache = new NodeCache();

const nycBounds = {
  north: 40.917577,
  south: 40.477399,
  east: -73.700272,
  west: -74.259090
};

async function fetchRestaurants(latitude, longitude, pagetoken) {
  const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const url = `${baseUrl}?location=${latitude},${longitude}&type=restaurant&keyword=restaurant&rankby=distance&key=${process.env.GOOGLE_MAPS_API_KEY}` + (pagetoken ? `&pagetoken=${pagetoken}` : '') + `&region=us`;
  const { data } = await axios.get(url);
  return data;
}

router.get('/', async (req, res) => {
  try {
    const { latitude, longitude, pageToken } = req.query;

    if (
      latitude < nycBounds.south ||
      latitude > nycBounds.north ||
      longitude < nycBounds.west ||
      longitude > nycBounds.east
    ) {
      throw new Error('Coordinates are out of bounds.');
    }

    const cacheKey = `${latitude},${longitude},${pageToken || ''}`;
    const cachedData = myCache.get(cacheKey);

    let response;
    if (cachedData) {
      console.log('Cache hit:', cacheKey); // Log when the data is retrieved from the cache
      response = cachedData;
    } else {
      console.log('Cache miss:', cacheKey); // Log when the data is fetched and added to the cache
      response = await fetchRestaurants(latitude, longitude, pageToken);
      myCache.set(cacheKey, response, 86400); // cache the response for 1 day (86400 seconds)
    }    

    const allRestaurants = response.results;

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

    res.json({
      restaurants: restaurants,
      nextPageToken: response.next_page_token
    });

  } catch (error) {
    res.status(400).send(error.message);
  }
});

// // without caching
// router.get('/', async (req, res) => {
//   try {
//     const { latitude, longitude, pageToken } = req.query;

//     if (
//       latitude < nycBounds.south ||
//       latitude > nycBounds.north ||
//       longitude < nycBounds.west ||
//       longitude > nycBounds.east
//     ) {
//       throw new Error('Coordinates are out of bounds.');
//     }

//     if (
//       latitude >= nycBounds.south &&
//       latitude <= nycBounds.north &&
//       longitude >= nycBounds.west &&
//       longitude <= nycBounds.east
//     ) {
//       const response = await fetchRestaurants(latitude, longitude, pageToken);
//       const allRestaurants = response.results;

//       const restaurants = allRestaurants
//         .filter(result =>
//           result.geometry &&
//           result.geometry.location &&
//           result.geometry.location.lat >= nycBounds.south &&
//           result.geometry.location.lat <= nycBounds.north &&
//           result.geometry.location.lng >= nycBounds.west &&
//           result.geometry.location.lng <= nycBounds.east &&
//           result.types &&
//           result.types.includes('restaurant')
//         )
//         .map(result => ({
//           name: result.name,
//           address: result.vicinity,
//           location: {
//             lat: result.geometry.location.lat,
//             lng: result.geometry.location.lng
//           },
//           placeId: result.place_id
//         }));

//       res.json({
//         restaurants: restaurants,
//         nextPageToken: response.next_page_token
//       });
//     }
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

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