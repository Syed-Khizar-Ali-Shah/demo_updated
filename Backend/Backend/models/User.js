const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userType: {
    type: String, // Add other user types if needed
    required: true,
  },
  courses: [String],
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  skillLevel: {
    type : String,
  },
  image: {
    type : String,
  },
  experience: [String],
  training: [String], // Array of training or certification names
  education: [String],
  certification: [String], // Array of certification names
  availability: [String]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

