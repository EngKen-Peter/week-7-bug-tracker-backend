import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, default: 'open' },
  priority: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Bug', bugSchema);
