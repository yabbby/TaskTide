const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'], credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Define User schema and model
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

// Password hashing before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it has been modified or is new
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

// Define Task schema and model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',  // Reference to the User model
    required: true,
  },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Access denied, no token provided' });

  jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret', (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};

// User Signup
app.post('/api/signup', async (req, res) => {
  const { firstName, email, password } = req.body;
  console.log('Received signup request:', { firstName, email, password });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ firstName, email, password });
    await newUser.save();
    console.log('User created successfully:', newUser);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    console.error('Signup error stack:', error.stack); // Log error stack trace for deeper insights
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Email not found' });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET || 'defaultsecret',
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      username: user.firstName,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create Task
app.post('/api/tasks', verifyToken, async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const userId = req.user._id; // Extract user ID from the token

  try {
    const newTask = new Task({ title, description, dueDate, status, user: userId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error while adding task', error: error.message });
  }
});

// Get All Tasks
app.get('/api/tasks', verifyToken, async (req, res) => {
  const userId = req.user._id; // Extract user ID from the token

  try {
    const tasks = await Task.find({ user: userId });
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks', error: error.message });
  }
});

// Update Task
app.put('/api/tasks/:id', verifyToken, async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error while updating task', error: error.message });
  }
});

// Delete Task
app.delete('/api/tasks/:id', verifyToken, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error while deleting task', error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
