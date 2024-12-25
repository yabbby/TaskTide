const mongoose = require('mongoose');

// User schema definition
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the User model
module.exports = mongoose.model('User', userSchema);
