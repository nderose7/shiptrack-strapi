const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  register: async (ctx) => {
    try {
      const { userId, email, name, phone, company, firstName, lastName, jobTitle } = ctx.request.body;

      // Step 2: Create a new Stripe customer
      const customer = await stripe.customers.create({ email });

      console.log(customer.id)
      console.log("Attempting to create child user...")
      console.log(userId)

      console.log("Name: ", name)
     
      const createChildUser = await strapi.service('api::easypost.easypost').createChildUser({
          name: name,
      })
      console.log("Updating user with childuser:", createChildUser)
      const updateUser = await strapi.entityService.update('plugin::users-permissions.user', userId, { 
        data: {
          stripeCustomerId: customer.id,
          admin: true,
          apiTestKey: createChildUser.api_keys.find(key => key.mode === 'test').key,
          apiProdKey: createChildUser.api_keys.find(key => key.mode === 'production').key,
          easyPostUserId: createChildUser.id,
          easyPostParentId: createChildUser.parent_id
        }
      });

      try {
        await strapi.plugins['email'].services.email.send({
          from: 'CloudShip <no-reply@cloudshipapp.com>',
          to: email, // replace with user's email
          subject: 'Welcome to CloudShip!',
          text: 'Welcome! Your CloudShip account has been created. Thanks for joining! - The CloudShip Team',
          html: '<p style="font-family: Arial, sans-serif;">Welcome! Your CloudShip account has been created. </p> <p style="font-family: Arial, sans-serif;">Thanks for joining!</p> <p style="font-family: Arial, sans-serif;">- The CloudShip Team </p>',
        });
      } catch (err) {
        console.error('Error sending email to new user:', err);
      }

      try {
      // Send email using Strapi's email plugin
      await strapi.plugins['email'].services.email.send({
          to: 'nderose7@gmail.com',
          from: email,
          subject: 'New CloudShip User!',
          text: "New User: " + email,
          html: `<p style="font-family: Arial, sans-serif;"><b>New User:</b> ${email}`,
      });
      } catch (err) {
        console.error('Error sending email:', err);
      }
      
      ctx.send({
        createChildUser
      });

    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.send({ error: error.message });
    }
  },
};
