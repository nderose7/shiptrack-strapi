'use strict';

module.exports = {
  /**
   * Create a shipment and retrieve shipping rates.
   *
   * @param {Object} ctx - Context object containing request and response.
   * @returns {Promise<Object>} - The shipment object with rates.
   */
  createShipment: async (ctx) => {
    
    try {
      console.log("Attempting to create a shipment...")
      const shipmentDetails = ctx.request.body;
      console.log("shipmentDetails: ", shipmentDetails)
      const shipment = await strapi.service('api::easypost.easypost').createShipment(shipmentDetails);

      return ctx.send(shipment);
    } catch (error) {
      return ctx.badRequest('Error creating shipment', { error: error.message });
    }
  },

  /**
   * Buy a shipment label for a specific shipment.
   *
   * @param {Object} ctx - Context object containing request and response.
   * @returns {Promise<Object>} - The shipment object with label.
   */
  buyShipmentLabel: async (ctx) => {
    try {
      const { shipmentId } = ctx.params;
      const { rateId } = ctx.request.body;
      console.log("rate id: ", rateId)
      const shipment = await strapi.service('api::easypost.easypost').buyShipmentLabel(shipmentId, rateId);
      return ctx.send(shipment);
    } catch (error) {
      return ctx.badRequest('Error buying shipment label', { error: error.message });
    }
  },

  /**
   * Track a shipment using its tracking code.
   *
   * @param {Object} ctx - Context object containing request and response.
   * @returns {Promise<Object>} - The tracking details.
   */
  trackShipment: async (ctx) => {
    try {
      const { trackingCode } = ctx.params;
      const tracker = await strapi.service('api::easypost.easypost').trackShipment(trackingCode);
      return ctx.send(tracker);
    } catch (error) {
      return ctx.badRequest('Error tracking shipment', { error: error.message });
    }
  },

  /**
   * Retrieve details of a specific shipment.
   *
   * @param {Object} ctx - Context object containing request and response.
   * @returns {Promise<Object>} - The shipment details.
   */
  retrieveShipment: async (ctx) => {
    try {
      const { shipmentId } = ctx.params;
      const shipment = await strapi.service('api::easypost.easypost').retrieveShipment(shipmentId);
      return ctx.send(shipment);
    } catch (error) {
      return ctx.badRequest('Error retrieving shipment', { error: error.message });
    }
  },
};
