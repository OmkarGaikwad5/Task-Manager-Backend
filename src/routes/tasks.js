import { Router } from "express";
import { auth } from "../middleware/auth.js";

// plug in your actual controller logic:
async function listTasks(req, res){ /* ... */ res.json([]); }
async function createTask(req, res){ /* ... */ res.status(201).json({}); }
async function updateTask(req, res){ /* ... */ res.json({}); }
async function toggleTask(req, res){ /* ... */ res.json({}); }
async function deleteTask(req, res){ /* ... */ res.status(204).end(); }

const router = Router();

// CORS already applied globally in app.js
router.use(auth);

router.get("/", listTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.patch("/:id/toggle", toggleTask);
router.delete("/:id", deleteTask);

export default router;
