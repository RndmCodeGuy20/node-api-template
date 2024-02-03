const WebSocket = require('ws');
import { logger } from '#helpers/index';

const wss = new WebSocket.Server({ noServer: true, path: '/socket' });

wss.on('connection', function connection(ws) {
  logger.log('info', 'connected', { label: 'socket' });
  ws.on('message', function incoming(message) {
    logger.log('debug', `received: ${message}`, { label: 'socket' });
  });

  ws.send('something');

  ws.on('close', function close() {
    logger.log('info', 'disconnected');
  });
});

export default wss;
