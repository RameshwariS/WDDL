const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  dueDate: {
    type: Date,
    required: [true, 'Please add a due date'],
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending',
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['work', 'personal', 'shopping', 'other'],
    default: 'personal',
  },
  priority: {
    type: String,
    enum: ['high', 'medium', 'low'],
    default: 'medium',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Task', TaskSchema);