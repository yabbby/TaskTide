const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema definition
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

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
module.exports = User;
