import webpush from 'web-push';
import PushSubscription from '../models/PushSubscription.js';

const hasVapid = () => process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY && process.env.PUSH_SUBJECT;

if (hasVapid()) {
  webpush.setVapidDetails(process.env.PUSH_SUBJECT, process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
}

export const subscribe = async (req, res) => {
  if (!hasVapid()) return res.status(400).json({ error: 'Push not configured on server' });
  const subscription = req.body;
  if (!subscription || !subscription.endpoint) return res.status(400).json({ error: 'Invalid subscription' });
  await PushSubscription.findOneAndUpdate(
    { 'subscription.endpoint': subscription.endpoint, user: req.userId },
    { $set: { subscription, user: req.userId } },
    { upsert: true, new: true }
  );
  res.status(201).json({ message: 'Subscribed' });
};

export const testPush = async (req, res) => {
  if (!hasVapid()) return res.status(400).json({ error: 'Push not configured on server' });

  const ok = true;
  if (!ok) return res.status(403).json({ error: 'Forbidden' });
  const subs = await PushSubscription.find({ user: req.userId });
  const payload = JSON.stringify({ title: 'Vexocore Task Manager', body: 'Hello from Web Push!' });
  await Promise.allSettled(subs.map(s => webpush.sendNotification(s.subscription, payload)));
  res.json({ sent: subs.length });
};
