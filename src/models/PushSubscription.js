import mongoose from 'mongoose';

const subSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subscription: { type: Object, required: true },
}, { timestamps: true });

export default mongoose.model('PushSubscription', subSchema);
