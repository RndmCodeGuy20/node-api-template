import { Router } from 'express';
import coreRouter from './modules/core/routes';

const router = new Router();

router.get('/', (req, res) => {
  res.jsend.success(
      {
        timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} IST`,
      },
      'V1.0 API',
  );
});

router.use(coreRouter);

export default router;