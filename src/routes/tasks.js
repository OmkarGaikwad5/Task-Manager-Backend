import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import { listTasks, createTask, updateTask, toggleTask, deleteTask } from '../controllers/taskController.js';

const router = Router();
router.use(auth);

router.get('/', listTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.patch('/:id/toggle', toggleTask);
router.delete('/:id', deleteTask);

export default router;
