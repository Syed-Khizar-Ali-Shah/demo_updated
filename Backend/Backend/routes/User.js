const express = require('express');
const router = express.Router();
const userController = require('../controllers/sessionController');
const userSession = require("../controllers/userSession")

// Create a new user
router.post('/', userSession.createUser);

// Get all users
router.get('/', userSession.getAllUsers);

router.get('/getIntructorDetailsById/:id', userSession.getUserById);

router.patch('session/:userId/:sessionId/editSession', userSession.editSession);

// Get a user by ID

// Update a user by ID
router.put('/:userId', userSession.updateUser);
router.delete('/:userId/:sessionId/delete', userController.deleteSession);

// Delete a user by ID
router.delete('/:userId', userSession.deleteUser);

module.exports = router;
