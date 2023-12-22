// path: /api/product/controllers/product.js

'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) =>  ({
  // Extend the default find method
  async find(ctx) {
    console.log('Custom find method in product controller');

    let filters = {};
    

    // Apply the filter if userCompany is set in the context
    if (ctx.state.userCompany) {
      filters = { company: ctx.state.userCompany };
    }

    const results = await strapi.entityService.findMany('api::product.product', {
      populate: '*', // adjust as needed
      filters: filters,
    });

    console.log('Filtered products data:', results);
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
      const product = await strapi.entityService.findOne('api::product.product', id, {
        populate: '*', // adjust as needed
        filters: { company: ctx.state.userCompany }, // Apply company filter
      });

      console.log("Product:", product.company.id)

      // Check if a product is found and belongs to the user's company
      if (product && product.company.id === ctx.state.userCompany) {
        console.log('Product data:', product);
        return { data: product };
      } else {
        // Return unauthorized or not found response
        return unauthorizedResponse;
      }
    } else {
      // If userCompany isn't set in the context, return an unauthorized response
      return unauthorizedResponse;
    }
  },

}));
