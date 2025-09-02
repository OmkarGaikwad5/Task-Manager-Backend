import { Router } from 'express';
import cors from 'cors';
import { auth } from '../middleware/auth.js';
import { subscribe, testPush } from '../controllers/pushController.js';

const router = Router();

// ⚡ CORS must come first
router.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["POST","OPTIONS"],
}));

// ✅ Auth middleware after CORS
router.use(auth);

// Routes
router.post('/subscribe', subscribe);
router.post('/test', testPush);

export default router;
