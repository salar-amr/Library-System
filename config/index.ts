export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  rabbitMqUrl: process.env.RMQ_URL || 'amqp://localhost:5672',
  jwtSecret: process.env.JWT_SECRET || 'fnru4fn8us8hufre',
  gateway: {
    graphQl: {
      playground: process.env.GATEWAY_GQL_PLAYGROUND || true,
      debug: process.env.GATEWAY_GQL_DEBUG || true,
    },
  },
  user: {
    database: {
      host: process.env.USER_DB_HOST || 'localhost',
      port: parseInt(process.env.USER_DB_PORT, 10) || 5432,
      username: process.env.USER_DB_USERNAME || 'salar',
      password: process.env.USER_DB_PASSWORD || 'pg@32503250',
      name: process.env.USER_DB_NAME || 'user',
    },
  },
  book: {
    database: {
      host: process.env.BOOK_DB_HOST || 'localhost',
      port: parseInt(process.env.BOOK_DB_PORT, 10) || 5433,
      username: process.env.BOOK_DB_USERNAME || 'salar',
      password: process.env.BOOK_DB_PASSWORD || 'pg@32503250',
      name: process.env.BOOK_DB_NAME || 'book',
    },
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  },
});
