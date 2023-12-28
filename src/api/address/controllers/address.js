'use strict';

/**
 *  company controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Client } = require('@googlemaps/google-maps-services-js');

module.exports = createCoreController('api::address.address', ({
  strapi
}) => ({

  async find(ctx) {
    console.log('Custom find method in product controller');

    let filters = {};
    

    // Apply the filter if userCompany is set in the context
    if (ctx.state.userCompany) {
      filters = { company: ctx.state.userCompany };
    }

    const results = await strapi.entityService.findMany('api::address.address', {
      populate: '*', // adjust as needed
      filters: filters,
    });

    console.log('Filtered address data:', results);
    return { data: results };
  },

  async findOne(ctx) {
    console.log('Custom findOne method in product controller');
    
    // Extract the ID of the product from the context
    const { id } = ctx.params;
    console.log("ID: ", id)
    // Default response for unauthorized or not found
    const unauthorizedResponse = {
      data: null,
      error: "Not Found or Access Denied"
    };

    // Check if user's company is set in the context
    if (ctx.state.userCompany) {
       console.log('Company id found: ', ctx.state.userCompany);
      const address = await strapi.entityService.findOne('api::address.address', id, {
        populate: '*', // adjust as needed
        filters: { company: ctx.state.userCompany }, // Apply company filter
      });

      console.log("Address:", address.company.id)

      // Check if a product is found and belongs to the user's company
      if (address && address.company.id === ctx.state.userCompany) {
        console.log('Address data:', address);
        return { data: address };
      } else {
        // Return unauthorized or not found response
        return unauthorizedResponse;
      }
    } else {
      // If userCompany isn't set in the context, return an unauthorized response
      return unauthorizedResponse;
    }
  },

  async findOne(ctx) {
    // Include populate in ctx.query to define what relations (and nested relations) to populate
    ctx.query = {
      ...ctx.query,
      populate: {
        company: {
          populate: '*' // or specify nested fields you want to populate
        },
        // Add other relations here if necessary
      }
    };

    return await super.findOne(ctx);
  },

  
  async update(ctx){
    //console.log("Attempting update...")
    ctx.query = {
      ...ctx.query,
      populate: {
        company: {
          populate: '*' // or specify nested fields you want to populate
        },
        // Add other relations here if necessary
      }
    };

    return await super.update(ctx);
  },
  async delete(ctx){
    ctx.query = {
      ...ctx.query,
      populate: {
        company: {
          populate: '*' // or specify nested fields you want to populate
        },
        // Add other relations here if necessary
      }
    };

    return await super.delete(ctx);
  },
  
  async create(ctx) {
    //console.log('Creating new address')
    ctx.query = {
      ...ctx.query,
      populate: {
        company: {
          populate: '*' // or specify nested fields you want to populate
        },
        // Add other relations here if necessary
      }
    };

    return await super.create(ctx);
  },

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
}));
