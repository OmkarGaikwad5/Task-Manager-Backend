import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { subscribe, testPush } from '../controllers/pushController.js';
import cors from 'cors';

const router = Router();
router.use(auth);

// ✅ CORS for push route
router.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["POST","OPTIONS"],
}));

// ✅ OPTIONS preflight
router.options("*", (_req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

router.post('/subscribe', subscribe);
router.post('/test', testPush);

export default router;
