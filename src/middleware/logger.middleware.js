import { logger } from '#helpers/index';

export const loggerMiddleware = (req, res, next) => {
  // Log the request at the specified log level (defaulting to 'info' if not provided)
  logger.log('info', `API Request: ${req.method} ${req.url}`);
  next();
};
