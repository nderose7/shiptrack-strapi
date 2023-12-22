const EasyPost = require('@easypost/api');

const apiKey = process.env.EASYPOST_API_KEY; // Store your API key in an environment variable
//console.log("Apikey: ", apiKey)
const easyPostClient = new EasyPost(apiKey);

module.exports = {

  /**
   * Create a child user.
   * @returns {Promise<Object>} - The created child user object.
   */
  async createChildUser(name = '') {
    try {
      const userParams = {};
      if (name) userParams.name = name;

      console.log("Userparams: ", userParams)

      const childUser = await easyPostClient.User.create(name);

      return childUser;
    } catch (error) {
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      if (error.detail) {
        console.error("Error details:", error.detail);
      }
      throw error;
    }
  },



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
  },


  async createEasyPostCarrierAccount(carrierDetails) {

    try {
      const carrierAccount = await easyPostClient.CarrierAccount.create({
        type: carrierDetails.type, // e.g., 'DhlEcsAccount'
        description: carrierDetails.description,
        credentials: {
          client_id: carrierDetails.credentials.client_id,
          client_secret: carrierDetails.credentials.client_secret,
          distribution_center: carrierDetails.credentials.distribution_center,
          pickup_id: carrierDetails.credentials.pickup_id,
          // ... other necessary credential fields
        },
        test_credentials: {
          client_id: carrierDetails.test_credentials.client_id,
          client_secret: carrierDetails.test_credentials.client_secret,
          distribution_center: carrierDetails.test_credentials.distribution_center,
          pickup_id: carrierDetails.test_credentials.pickup_id,
          // ... other necessary test credential fields
        },
      });

      return carrierAccount;
    } catch (error) {
      console.error('Error creating carrier account with EasyPost:', error);
      throw error;
    }
  },

  async createEasyPostCarrierAccountUPS(carrierDetails) {
    try {
      console.log('Carrier Details:', carrierDetails); // Log the carrier details for verification

      console.log("Account ID: ", carrierDetails.account_number)

      const carrierAccount = await easyPostClient.CarrierAccount.create({
        type: 'UpsAccount', // Specify UPS account type
        description: 'UPS Account',
        reference: 'Strapi Company ID: ' + carrierDetails.companyId, // Replace with an actual reference if necessary
        registration_data: {
          account_number: carrierDetails.account_number,
          city: carrierDetails.city,
          company: carrierDetails.company,
          country: carrierDetails.country,
          email: carrierDetails.email,
          name: carrierDetails.name,
          phone: carrierDetails.phone,
          postal_code: carrierDetails.postal_code,
          state: carrierDetails.state,
          street1: carrierDetails.street1,
          title: carrierDetails.title,
          website: carrierDetails.website,
        },
      });

      return carrierAccount;
    } catch (error) {
      console.error('Request:', carrierDetails); // Log the request details
      if (error.response) {
        // Log the full response from the API if available
        console.error('API Response:', error.response);
      } else {
        // Log the error message
        console.error('Error:', error);
        //console.error('Error:', error.code, error.message);
      }
      throw error;
    }
  },

  


};
