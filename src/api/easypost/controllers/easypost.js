'use strict';

module.exports = {

  /**
   * Controller to create a child user in EasyPost.
   * @param {Object} ctx - The request context.
   * @returns {Object} - The response object.
   */
  async createChildUser(ctx) {
    try {
      const { name = '' } = ctx.request.body;
      const childUser = await strapi.service('api::easypost.easypost').createChildUser(name);
      ctx.body = childUser;
    } catch (error) {
      ctx.badRequest('Unable to create child user', { error });
    }
  },


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

  addCarrierAccount: async (ctx) => {
    try {
      const userId = ctx.params.userId;
      const carrierDetails = ctx.request.body;
      
      // Use EasyPost API to create/link the carrier account
      const easypostAccount = await strapi.service('api::easypost.easypost').createEasyPostCarrierAccount(carrierDetails);

      // Save details in Strapi
      const savedAccount = await strapi.service('api::carrier.carrier').create({
        easypostAccountId: easypostAccount.id,
        userId,
        ...carrierDetails,
      });

      ctx.send({ message: 'Carrier account added successfully', savedAccount });
    } catch (error) {
      ctx.throw(500, error.message);
    }
  },

  addCarrierAccountUPS: async (ctx) => {
    try {
      const companyId = ctx.params.companyId;
      //console.log("Params: ", companyId);

      const carrierDetails = ctx.request.body;
      const easypostAccount = await strapi.service('api::easypost.easypost').createEasyPostCarrierAccountUPS(carrierDetails);

      const savedAccount = await strapi.service('api::carrier.carrier').create({
        data: {
          //easypostAccountId: easypostAccount.id,
          company: { connect: [companyId] },
          accountId: carrierDetails.account_number,
          name: 'UPS',
        }
      });

      ctx.send({ message: 'Carrier account added successfully', savedAccount });

    } catch (error) {
      console.error('Error occurred:', error); // Log the error for debugging

      // Check if the error object has 'errors' array and send it along
      const errorResponse = {
        message: 'Error adding carrier account',
        error: error.message,
        details: error.errors || []
      };
      ctx.send(errorResponse);
      ctx.response.status = error.statusCode || 500; // Use the error's status or default to 500
      
    }
  }

};
