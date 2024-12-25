const mongoose = require('mongoose');

// Task schema definition
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value >= new Date(); // Ensure the dueDate is not in the past
      },
      message: 'Due date cannot be in the past',
    },
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed'],
    default: 'Pending',
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model
    required: true, // You can make it required if every task must be associated with a user
  },
}, { timestamps: true });

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
