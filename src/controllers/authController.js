import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const sign = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already in use' });
  const user = await User.create({ name, email, password });
  const token = sign(user._id.toString());
  res
    .cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 3600 * 1000 })
    .status(201)
    .json({ message: 'Registered', user: { id: user._id, name: user.name, email: user.email }, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' });
  const token = sign(user._id.toString());
  res
    .cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 7 * 24 * 3600 * 1000 })
    .json({ message: 'Logged in', user: { id: user._id, name: user.name, email: user.email }, token });
};

export const me = async (req, res) => {
  const user = await User.findById(req.userId).lean();
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ id: user._id, name: user.name, email: user.email });
};

export const logout = async (_req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
