'use strict';

/**
 * `assign-owner` middleware.
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    // Check if `owners` field is an array; if not, initialize it with an empty array
    if (!Array.isArray(ctx.request.body.data.users)) {
      ctx.request.body.data.users = [];
    }
    // Add the current user's ID to the `owners` array if not already present
    if (!ctx.request.body.data.users.includes(ctx.state.user.id)) {
      ctx.request.body.data.users.push(ctx.state.user.id);
    }

    await next();
  };
};
