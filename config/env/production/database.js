module.exports =  ({ env }) => ({
	connection: {
		client: 'postgres',
		connection: {
		host: env('DATABASE_HOST', 'localhost'),
			port: env.int('DATABASE_PORT', 5432),
			database: env('DATABASE_NAME', 'shiptrack-strapi'),
			user: env('DATABASE_USERNAME', 'shiptrack-strapi'),
			password: env('DATABASE_PASSWORD', 'shiptrack-strapi'),
			ssl: {
				rejectUnauthorized:env.bool('DATABASE_SSL_SELF', false),
			},
		}
	}
});
