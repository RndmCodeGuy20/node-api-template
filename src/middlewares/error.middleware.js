import { envConfig } from '#configs/index';
import { ENVIRONMENTS, ERROR_CODES } from '#constants/index';
import { logger } from '#helpers/index';

export const errorMiddleware = (error, req, res) => {
  error.details = Array.isArray(error.details) ?
		error.details :
		[error.details];
  logger.log('debug', error, { label: 'API' });
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
  // logger.log('error', error, { label: 'API' });
  res.jsend.error(error.message, error.status, ERROR_CODES.UNKNOWN_ERROR, {
    errorName: error.name,
    reason: error.reason,
    code: error.errorCode,
    ...(envConfig.ENV === ENVIRONMENTS.DEVELOPMENT && {
      details: error.details,
    }),
  });
};
