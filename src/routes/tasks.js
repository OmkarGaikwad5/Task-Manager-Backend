import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { listTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/taskController.js';
import cors from 'cors';

const router = Router();
router.use(auth);

// ✅ CORS for tasks route
router.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
}));

// ✅ OPTIONS preflight
router.options("*", (_req, res) => {
  res.header("Access-Control-Allow-Origin", process.env.CORS_ORIGIN);
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

export default router;
