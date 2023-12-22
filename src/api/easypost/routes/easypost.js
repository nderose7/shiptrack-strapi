console.log("Shipping routes loaded");

module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/create-child-user',
      handler: 'easypost.createChildUser',
      config: {
        policies: [],
        middlewares: [],
        description: 'Create easypost child user.',
      },
    },
    {
      method: 'POST',
      path: '/create-shipment',
      handler: 'easypost.createShipment',
      config: {
        policies: [],
        middlewares: [],
        description: 'Create a new shipment and retrieve shipping rates',
      },
    },
    {
      method: 'POST',
      path: '/create-shipment/:shipmentId/buy-label',
      handler: 'easypost.buyShipmentLabel',
      config: {
        policies: [],
        middlewares: [],
        description: 'Buy a shipment label for a specific shipment',
      },
    },
    {
      method: 'GET',
      path: '/track-shipment/:trackingCode',
      handler: 'easypost.trackShipment',
      config: {
        policies: [],
        middlewares: [],
        description: 'Track a shipment using its tracking code',
      },
    },
    {
      method: 'GET',
      path: '/retrieve-shipment/:shipmentId',
      handler: 'easypost.retrieveShipment',
      config: {
        policies: [],
        middlewares: [],
        description: 'Retrieve details of a specific shipment',
      },
    },
    {
      method: 'POST',
      path: '/add-carrier-ups/:companyId',
      handler: 'easypost.addCarrierAccountUPS',
      config: {
        policies: [],
        middlewares: [],
        description: 'Connect UPS carrier account.',
      },
    },

  ],
};
