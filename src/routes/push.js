import { Router } from "express";
import { auth } from "../middleware/auth.js";

// stub handlers
async function subscribe(req, res){ res.status(201).json({ ok: true }); }
async function testPush(req, res){ res.json({ delivered: true }); }

const router = Router();
router.use(auth);
router.post("/subscribe", subscribe);
router.post("/test", testPush);
export default router;
