'use strict';

/**
 * company router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::company.company', {
  config: {
    find: {
      policies: ['global::is-owner'],
    },
    findOne: {
      policies: ['global::is-owner'],
    },
    create: {
      middlewares: ['global::multi-owner'],
    },
    update: {
      policies: ['global::is-owner']
    },
    delete: {
      policies: ['global::is-owner']
    }
  }
});
