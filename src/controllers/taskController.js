import Task from '../models/Task.js';

export const listTasks = async (req, res) => {
  const filter = { user: req.userId };
  if (req.query.status === 'pending') filter.completed = false;
  if (req.query.status === 'completed') filter.completed = true;
  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });
  const task = await Task.create({ user: req.userId, title, description: description || '' });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const task = await Task.findOneAndUpdate(
    { _id: id, user: req.userId },
    { $set: { title, description, completed } },
    { new: true }
  );
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

export const toggleTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, user: req.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOneAndDelete({ _id: id, user: req.userId });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json({ message: 'Deleted' });
};
