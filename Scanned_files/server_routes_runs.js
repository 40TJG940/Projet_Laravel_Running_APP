const express = require('express');
const router = express.Router();
const runController = require('../controllers/runController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/start', runController.startRun);
router.patch('/:id/location', runController.updateLocation);
router.post('/:id/end', runController.endRun);
router.get('/', runController.getRuns);
router.get('/stats', runController.getStats);

module.exports = router;