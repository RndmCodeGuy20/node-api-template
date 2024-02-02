import winston from 'winston';
import { envConfig } from '#configs/index';

winston.addColors(winston.config.syslog.colors);

const logger = winston.createLogger({
  level: 'silly',
  // colors: winston.config.syslog.colors,
  format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint(),
  ),
  transports: [
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'error',
    }),
    new winston.transports.File({ filename: './logs/combined.log' }),
  ],
});

if (envConfig.ENV !== 'production') {
  logger.add(
      new winston.transports.Console({
        format: winston.format.combine(
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            winston.format.colorize({
              all: true,
              colors: {
                debug: 'blue',
                info: 'green',
                warn: 'yellow',
                error: 'red',
                silly: 'magenta',
              },
            }),
            winston.format.json({
              space: 2,
              replacer: (key, value) => {
                if (key === 'timestamp') {
                  return undefined;
                }
                return value;
              },
            }),
            winston.format.printf(({ timestamp, level, message }) => {
              // const ISTDate = new Date(timestamp).toISOString();
              //
              // const date = ISTDate.slice(0, 10);
              // const time = ISTDate.slice(11, 19);
              //
              // return `${date} ${time} [${level}]: ${message}`;
              return `${timestamp} [${level}]: ${message}`;
            }),
        ),
      }),
  );
}

export { logger };
