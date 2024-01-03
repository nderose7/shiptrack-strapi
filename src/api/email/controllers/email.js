// Path: ./src/api/email/controllers/email.js

module.exports = {
  async sendEmail(ctx) {
    try {
      console.log("Attempting to send email...");
      await strapi.plugins['email'].services.email.send({
        to: ctx.request.body.recipient,  // recipient email address
        from: 'labels@cloudship.com', // sender email address
        subject: 'Shipping Label',
        html: `<img src="${ctx.request.body.imageUrl}" alt="Label Image">`
      });

      ctx.send({ message: 'Email sent successfully' });
    } catch (err) {
      console.error('Email sending error:', err);

      // Send back a more detailed error message
      ctx.send({
        error: 'Failed to send email',
        details: err.message || 'No additional error details are available'
      }, 500);
    }
  }
};
