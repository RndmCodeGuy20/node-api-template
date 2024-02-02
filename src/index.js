import app from './app';
import { envConfig } from '#configs/index';

let server;

const init = async () => {
  server = app.listen(envConfig.PORT, () => {
    logger.info(
        `Listening on ${envConfig.HOSTNAME} http://localhost:${envConfig.PORT}`,
    );
  });
};


const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.fatal(`unexpectedErrorHandler ${error}`);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});

init()
    .then((r) => logger.info(`Server started on port ${envConfig.PORT}`))
    .catch((e) => {
      logger.error(`Server failed to start ${e}`);
      process.exit(1);
    });
