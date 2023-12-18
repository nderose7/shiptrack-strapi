const EasyPost = require('@easypost/api');

const apiKey = process.env.EASYPOST_API_KEY; // Store your API key in an environment variable
//console.log("Apikey: ", apiKey)
const easyPostClient = new EasyPost(apiKey);

module.exports = {
  /**
   * Create a shipment and retrieve shipping rates.
   * @param {Object} shipmentDetails - Details of the shipment including addresses and parcel info.
   * @returns {Promise<Object>} - The shipment object with rates.
   */
  async createShipment(shipmentDetails) {
    try {
      const shipment = await easyPostClient.Shipment.create(shipmentDetails);
      return shipment;
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      // Log other details if available
      if (error.detail) {
        console.error("Error details:", error.detail);
      }
      // Re-throw the error if you want to propagate it further
      throw error;
    }
  },

  /**
   * Buy a shipment label.
   * @param {string} shipmentId - The ID of the shipment.
   * @param {string} rateId - The ID of the rate to purchase.
   * @returns {Promise<Object>} - The shipment object with label.
   */
  async buyShipmentLabel(shipmentId, rateId) {
      console.log("Attempting to buy label");
      try {
          console.log("Shipment ID: ", shipmentId);
          console.log("Rate ID: ", rateId);
          //const shipment = await easyPostClient.Shipment.retrieve(shipmentId);
          //console.log("Shipment: ", shipment)
          /*if (!shipment.buy) {
              throw new Error('Retrieved object does not have a buy method');
          }*/
          console.log("Rate ID for service: ", rateId);

          // Call the buy method on the shipment object
          const boughtShipment = await easyPostClient.Shipment.buy(shipmentId, rateId);
          //await shipment.buy({ rate: { id: rateId } });
          console.log("boughtShipment: ", boughtShipment)
          return boughtShipment;
      } catch (error) {
          console.error("Label Error code:", error.code);
          console.error("Label Error message:", error.message);
          if (error.detail) {
              console.error("Label Error details:", error.detail);
          }
          throw error;
      }
  },



  /**
   * Track a shipment.
   * @param {string} trackingCode - The tracking code of the shipment.
   * @returns {Promise<Object>} - The tracking details.
   */
  async trackShipment(trackingCode) {
    try {
      const tracker = await easyPostClient.Tracker.create({ tracking_code: trackingCode });
      return tracker;
    } catch (error) {
      throw new Error('Error tracking shipment: ' + error.message);
    }
  },

  /**
   * Retrieve shipment details.
   * @param {string} shipmentId - The ID of the shipment.
   * @returns {Promise<Object>} - The shipment details.
   */
  async retrieveShipment(shipmentId) {
    try {
      const shipment = await easyPostClient.Shipment.retrieve(shipmentId);
      return shipment;
    } catch (error) {
      throw new Error('Error retrieving shipment: ' + error.message);
    }
  }
};
