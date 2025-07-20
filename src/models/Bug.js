import mongoose from 'mongoose';

const bugSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Bug title is required'],
    },
    description: {
      type: String,
      required: [true, 'Bug description is required'],
    },
    status: {
      type: String,
      enum: ['open', 'in progress', 'closed'],
      default: 'open',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

export const Bug = mongoose.model('Bug', bugSchema);
