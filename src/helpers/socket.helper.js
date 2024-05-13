import { Server } from 'socket.io';
import { envConfig } from '#configs/env.config';
import { logger } from '#helpers/logger.helper';
import { consumeMessage } from '#helpers/index';

/**
 * @description - Initialize socket connection
 * @param {Server} server
 */
export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', async (socket) => {
    logger.log('verbose', 'User connected, socketId: ', socket.id);

    try {
      await consumeMessage(envConfig.KAFKA.KAFKA_TOPIC, (message) => {
        logger.log('verbose', `Message received: ${message.value.toString()}`);
        io.emit('data', message.value.toString());
      });
    } catch (error) {
      logger.error(error);
      throw error;
    }

    socket.on('data', (data) => {
      console.log(data);
      // io.emit('data', data);
    });

    socket.on('disconnect', () => {
      logger.log('verbose', 'User disconnected, socketId: ', socket.id);
    });
  });
}
