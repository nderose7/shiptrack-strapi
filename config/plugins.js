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
  upload: {
    config: {
      provider: '@strapi/provider-upload-aws-s3',
      providerOptions: {
        accessKeyId: env('DO_SPACES_ACCESS_KEY_ID'),
        secretAccessKey: env('DO_SPACES_SECRET_ACCESS_KEY'),
        endpoint: env('DO_SPACES_ENDPOINT'), // e.g., 'nyc3.digitaloceanspaces.com'
        region: 'nyc3',
        params: {
          Bucket: env('DO_SPACES_BUCKET'),
        },
      },
    },
  },
  'encryptable-field': {
    enabled: true,
  },
})