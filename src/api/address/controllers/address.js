const { Client } = require('@googlemaps/google-maps-services-js');

module.exports = {
  autocomplete: async (ctx) => {
    //console.log("Autocomplete firing...")
    const client = new Client({});
    try {
      //console.log("Client: ", client)
      //console.log("API KEY: ", process.env.GOOGLE_MAPS_API_KEY)
      //console.log("Input: ", ctx.query.input);
      const response = await client.placeAutocomplete({
        params: {
          input: ctx.query.input,
          key: process.env.GOOGLE_MAPS_API_KEY, // Your Google Maps API key
        },
      });
      //console.log("Response: ", response)
      ctx.send(response.data.predictions);
    } catch (error) {
      console.error("Error in autocomplete:", error);
      ctx.throw(500, error.message);
    }
  },

  placeDetails: async (ctx) => {
    const client = new Client({});
    try {
      const placeId = ctx.query.place_id;
      const response = await client.placeDetails({
        params: {
          place_id: placeId,
          key: process.env.GOOGLE_MAPS_API_KEY,
          fields: ['address_components', 'formatted_address'] // Specify the fields you need
        },
      });
      console.log(response.data.result)
      ctx.send(response.data.result);
    } catch (error) {
      console.error("Error in placeDetails:", error);
      ctx.throw(500, error.message);
    }
  },
};
