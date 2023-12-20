module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/addresses/autocomplete',
      handler: 'address.autocomplete',
    },
    {
      method: 'GET',
      path: '/addresses/details',
      handler: 'address.placeDetails',
    },
  ],
};
