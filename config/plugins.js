module.exports = ({ env }) => ({
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST', 'localhost'),
        port: env.int('SMTP_PORT', 1025),
        ignoreTLS: true,
        ...(env('SMTP_USERNAME') && {
          auth: {
            user: env('SMTP_USERNAME'),
            pass: env('SMTP_PASSWORD'),
          },
        }),
      },
      settings: {
        defaultFrom: env('EMAIL_DEFAULT_FROM', ' ShipTrack <no-reply@shiptrackapp.com>'),
        defaultReplyTo: env('EMAIL_DEFAULT_REPLY_TO', 'hello@shiptrackapp.com'),
      },
    },
  },
})