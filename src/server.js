import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import pushRoutes from './routes/push.js';

const app = express();
connectDB();

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// ⚡ CORS setup
app.use(cors({
  origin: 'https://task-manager-v-theta.vercel.app', // frontend URL
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  credentials: true, // allow cookies to be sent
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/push', pushRoutes);

app.get('/', (_req, res) => res.json({ ok: true, service: 'Task Manager API' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
