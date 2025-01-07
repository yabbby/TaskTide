const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Add jwt package for token validation

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Ensure this matches your frontend's URL
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Define the Task model
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Define the Contact model
const contactSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

const Contact = mongoose.model('Contact', contactSchema);

// Sample users
const users = [];

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from the header

  if (!token) {
    return res.status(403).json({ message: 'Access denied, no token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Add decoded info to the request object
    next();
  });
};

// POST /api/signup
app.post('/api/signup', (req, res) => {
  const { firstName, email, password } = req.body;
  const userExists = users.find(user => user.email === email);
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { firstName, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User created successfully' });
});

// POST /api/login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Create JWT token
  const token = jwt.sign({ email: user.email, username: user.firstName }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiry time
  });

  res.status(200).json({ message: 'Login successful', token, username: user.firstName });
});

// POST /api/tasks - Protected route to create a task
app.post('/api/tasks', verifyToken, async (req, res) => {
  const { title, description, dueDate, status } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'All fields (title, description, dueDate) are required' });
  }

  console.log('Incoming request body:', req.body); // Debug log

  try {
    const newTask = new Task({ title, description, dueDate, status });
    const savedTask = await newTask.save();
    console.log('Task created successfully:', savedTask); // Debug log
    res.status(201).json(savedTask);
  } catch (error) {
    console.error('Error adding task:', error.message); // Debug log
    res.status(500).json({ message: 'Server error while adding task' });
  }
});

// GET /api/tasks - Protected route to fetch tasks
app.get('/api/tasks', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find(); // Fetch all tasks from the database
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error while fetching tasks' });
  }
});

// POST /api/contact - Route to handle contact form submissions
app.post('/api/contact', (req, res) => {
  const { firstName, email, message } = req.body;

  if (!firstName || !email || !message) {
    return res.status(400).json({ message: 'All fields (firstName, email, message) are required' });
  }

  const newContact = new Contact({ firstName, email, message });
  
  newContact.save()
    .then(() => res.status(201).json({ message: 'Contact information received successfully' }))
    .catch(error => res.status(500).json({ message: 'Server error while saving contact information', error }));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
