const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/profile', userController.getProfile);
router.patch('/profile', userController.updateProfile);
router.get('/stats', userController.getStats);

module.exports = router;