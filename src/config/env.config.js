import { hostname } from 'os';

const env = require('dotenv');
env.config({
  path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env',
});

const {
  NODE_ENV,
  APP_PORT,
  JWT_SECRET,
} = process.env;

export const envConfig = {
  ENV: NODE_ENV,
  PORT: APP_PORT,
  HOSTNAME: hostname(),
  JWT_SECRET_KEY: JWT_SECRET,
};
