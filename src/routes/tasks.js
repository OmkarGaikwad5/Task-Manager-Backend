import { Router } from 'express';
import cors from 'cors';
import { auth } from '../middleware/auth.js';
import { listTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/taskController.js';

const router = Router();

// ⚡ CORS must come first
router.use(cors({
  origin: process.env.CORS_ORIGIN, 
  credentials: true,
  methods: ["GET","POST","PUT","PATCH","DELETE","OPTIONS"],
}));

// ✅ Auth middleware after CORS
router.use(auth);

// Routes
router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

export default router;
