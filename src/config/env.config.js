import { hostname } from 'os';

const env = require('dotenv');
env.config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});

const {
  NODE_ENV,
  APP_PORT,
  APP_HOST,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  JWT_SECRET,
} = process.env;

export const envConfig = {
  ENV: NODE_ENV,
  PORT: APP_PORT,
  HOST: APP_HOST,
  HOSTNAME: hostname(),
  MYSQL: {
    DB_HOST: DB_HOST,
    DB_PORT: DB_PORT,
    DB_USER: DB_USER,
    DB_PASSWORD: DB_PASSWORD,
    DB_NAME: DB_NAME,
  },
  JWT_SECRET_KEY: JWT_SECRET,
};
