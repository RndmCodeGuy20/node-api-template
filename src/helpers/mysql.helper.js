import { logger } from '#helpers/index';
import { envConfig } from '#configs/index';

const util = require('util');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: envConfig.MYSQL.host,
  user: envConfig.MYSQL.user,
  password: envConfig.MYSQL.password,
  database: envConfig.MYSQL.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Get connection
 * @return {Promise<unknown>}
 */
export const getConnection = async () => {
  const dbPromise = new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          logger.log('error', 'Database connection was closed.');
          reject(new Error('Database connection was closed.'));
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          logger.log('error', 'Database has too many connections.');
          reject(new Error('Database has too many connections.'));
        }
        if (err.code === 'ECONNREFUSED') {
          logger.log('error', 'Database connection was refused.');
          reject(new Error('Database connection was refused.'));
        }
      }
      logger.log(
          'info',
          `Connected to the database: ${envConfig.MYSQL.DB_NAME}`,
      );

      if (connection) {
        const rollback = util.promisify(connection.rollback).bind(connection);
        const query = util.promisify(connection.query).bind(connection);
        const commit = util.promisify(connection.commit).bind(connection);
        resolve({ rollback, query, commit });
      }
    });
  });

  return await dbPromise;
};

/**
 * Query database
 * @type {any}
 */
export const mysqlQuery = util.promisify(pool.query).bind(pool);
