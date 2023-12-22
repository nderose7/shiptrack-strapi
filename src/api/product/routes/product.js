'use strict';

/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product', {
  config: {
    find: {
      policies: ['global::is-company-member'],
    },
    findOne: {
      policies: ['global::is-company-member'],
    },
    create: {
      middlewares: ['global::multi-owner'],
    },
    update: {
      policies: ['global::is-admin']
    },
    delete: {
      policies: ['global::is-admin']
    }
  }
});

