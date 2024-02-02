import { envConfig } from '#configs/index';
import { ENVIRONMENTS, ERROR_CODES } from '#constants/index';
import { logger } from '#helpers/logger';

export const errorMiddleware = (error, req, res) => {
  error.details = Array.isArray(error.details) ?
        error.details :
        [error.details];
  if (error.status < 500) {
    res.jsend.fail(
        error.message,
        {
          errorName: error.name,
          ...(envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && {
            details: error.details,
          }),
        },
        error.errorCode,
        error.status,
    );
    return;
  }
  logger.error(error.details);
  res.jsend.error(error.message, error.status, ERROR_CODES.UNKNOWN_ERROR, {
    errorName: error.name,
    reason: error.reason,
    code: error.errorCode,
    ...(envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && {
      details: error.details,
    }),
  });
};
