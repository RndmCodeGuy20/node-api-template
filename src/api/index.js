import { Router } from 'express';
import { getHealth } from './health';

const router = new Router();

router.get('/health', getHealth);

export default router;
