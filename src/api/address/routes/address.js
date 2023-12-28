module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/addresses',
      handler: 'address.find',
      config: {
        policies: ['global::is-company-member'],
      },
    },
    {
      method: 'GET',
      path: '/addresses/:id',
      handler: 'address.findOne',
      config: {
        policies: ['global::is-company-member'],
      },
    },
    {
      method: 'POST',
      path: '/addresses',
      handler: 'address.create',
      config: {
        middlewares: ['global::multi-owner'],
      },
    },
    {
      method: 'PUT',
      path: '/addresses/:id',
      handler: 'address.update',
      config: {
        policies: ['global::is-admin'],
      },
    },
    {
      method: 'DELETE',
      path: '/addresses/:id',
      handler: 'address.delete',
      config: {
        policies: ['global::is-admin'],
      },
    },
    {
      method: 'GET',
      path: '/address-autocomplete',
      handler: 'address.autocomplete',
    },
    {
      method: 'GET',
      path: '/address-details',
      handler: 'address.placeDetails',
    },
  ]
};
