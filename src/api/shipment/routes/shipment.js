'use strict';

/**
 * shipment router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::shipment.shipment', {
  config: {
    find: {
      policies: ['global::is-owner-or-admin'],
    },
    findOne: {
      policies: ['global::is-owner-or-admin'],
    },
    create: {
      middlewares: ['global::assign-owner'],
    },
    update: {
      policies: ['global::is-owner-or-admin']
    },
    delete: {
      policies: ['global::is-owner-or-admin']
    }
  }
});
