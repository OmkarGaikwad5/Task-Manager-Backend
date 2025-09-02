import { Router } from 'express';
import { register, login, me, logout } from '../controllers/authController.js';
import { auth } from '../middleware/auth.js';
import cors from 'cors';

const router = Router();

// ✅ CORS for this route
router.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET","POST","OPTIONS"],
}));

// ✅ Handle preflight requests
router.options("*", (_req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', auth, me);

export default router;
