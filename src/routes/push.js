import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { subscribe, testPush } from '../controllers/pushController.js';

const router = Router();
router.use(auth);

router.post('/subscribe', subscribe);
router.post('/test', testPush);

export default router;
