module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/email/send',
      handler: 'email.sendEmail', // Refers to the 'sendEmail' method in the 'email' controller
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
