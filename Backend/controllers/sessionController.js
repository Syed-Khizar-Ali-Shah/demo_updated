const Session = require('../models/Session'); // Assuming this is where your Session model is defined

// Create a new session
exports.createSession = async (req, res) => {
  try {
    const session = new Session(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all sessions
exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a session by ID
exports.getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a session by user and session ID
// exports.deleteSessionByUser = async (req, res) => {
//     const { userId, sessionId } = req.params;
  
//     try {
//       // Find the session by ID
//       const session = await Session.findById(sessionId);
  
//       if (!session) {
//         return res.status(404).json({ message: 'Session not found' });
//       }
  
//       // Check if the session belongs to the specified user
//       if (String(session.userId) !== userId) {
//         return res.status(403).json({ message: 'Access denied' });
//       }
  
//       // Delete the session
//       await Session.findByIdAndDelete(sessionId);
  
//       res.status(204).send(); // No content response
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   };
  

// Update a session by ID
exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.sessionId, req.body, {
      new: true, // Return the updated session
    });
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(200).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a session by ID
exports.deleteSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    res.status(204).send(); // No content response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
