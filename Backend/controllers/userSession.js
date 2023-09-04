const User = require('../models/User'); 
const Session = require('../models/Session'); // Assuming this is where your User model is defined

// Create a new user
module.exports.createUser = async (req, res) => {
  console.log(req.body)
  try {
    const user = new User(req.body);
    console.log("user",user)
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.editSession = async (req, res) => {
    const { userId, sessionId } = req.params;
  
    try {
      // Find the session by ID
      const session = await Session.findById(sessionId);
  
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      // Check if the session belongs to the specified user
      if (String(session.userId) !== userId) {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      // Update the session with the provided data
      const updatedSession = await Session.findByIdAndUpdate(
        sessionId,
        req.body,
        { new: true }
      );
  
      res.status(200).json(updatedSession);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  console.log(req.params.id)
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true, // Return the updated user
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSession = async (req, res) => {
  const { userId, sessionId } = req.params;

  try {
    // Find the session by ID
    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if the session belongs to the specified user
    if (String(session.userId) !== userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Delete the session
    await Session.findByIdAndRemove(sessionId);

    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};