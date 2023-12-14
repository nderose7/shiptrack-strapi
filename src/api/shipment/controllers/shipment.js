'use strict';

/**
 * shipment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::shipment.shipment',
({
  strapi
}) => ({
  async find(ctx) {
    const { filters } = ctx.query
    ctx.query = {
      ...ctx.query,
      populate: "*",
      
    }
    return await super.find(ctx);
  },
  
  async update(ctx){
    ctx.query.filters = {
        ...(ctx.query.filters || {}),
        owner: ctx.state.user.id
    };

    return await super.update(ctx);
  },
  async delete(ctx){
    ctx.query.filters = {
        ...(ctx.query.filters || {}),
        owner: ctx.state.user.id
    };

    return await super.delete(ctx);
  },
  
  async create(ctx) {
    console.log('Creating App!')
    return await super.create(ctx);
  }
}));