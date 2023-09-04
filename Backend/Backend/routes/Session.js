const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');

// Create a new session
router.post('sessionBooking/', sessionController.createSession);

// Get all sessions
router.get('/', sessionController.getAllSessions);

// Get a session by ID
router.get('/sessions/getSingleSessionById/:id', sessionController.getSessionById);

// Update a session by ID
router.put('/:sessionId', sessionController.updateSession);

// Delete a session by ID
router.delete('/:sessionId', sessionController.deleteSession);

module.exports = router;
