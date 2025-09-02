import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import taskRoutes from "./routes/tasks.js";
import pushRoutes from "./routes/push.js";

const app = express();

// connect once at cold start (safe on Vercel)
connectDB();

// JSON & cookies
app.use(express.json());
app.use(cookieParser());

// *** CORS: allow your frontend and cookies ***
const FRONTEND_ORIGIN = process.env.CORS_ORIGIN || "https://task-manager-v-theta.vercel.app";
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
   
  })
);

// health
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "Task Manager API", originAllowed: FRONTEND_ORIGIN });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/push", pushRoutes);

export default app;
