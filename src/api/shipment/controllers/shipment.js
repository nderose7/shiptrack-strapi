// path: /api/shipment/controllers/shipment.js

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::shipment.shipment', ({ strapi }) =>  ({
  // Extend the default find method
  async find(ctx) {
    console.log('Custom find method in shipment controller');

    // Check if filteredShipments exist in the state
    if (ctx.state.filteredShipments) {
      console.log('Using filtered shipments from policy');
      // Return the filtered shipments
      console.log(ctx.state.filteredShipments);
      return { data: ctx.state.filteredShipments, meta: {/* meta data */} };
    }

    // Otherwise, proceed with the default behavior
    const { data, meta } = await super.find(ctx);
    console.log('Shipments data:', data);
    return { data, meta };
  },

  async findOne(ctx) {
    console.log('Custom findOne method in shipment controller');

    // Check if the shipment is accessible (filtered in the policy)
    if (ctx.state.filteredShipment) {
      console.log('Using filtered shipment from policy');
      console.log(ctx.state.filteredShipment);
      return { data: ctx.state.filteredShipment };
    }

    // Otherwise, proceed with the default behavior
    const { data } = await super.findOne(ctx);
    console.log('Shipment data:', data);
    return { data };
  }

}));
