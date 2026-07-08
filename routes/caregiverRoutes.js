const express = require('express');
const router = express.Router();
const caregiverController = require('../controllers/caregiverController');

router.get('/dashboard/:caregiverId', caregiverController.getDashboard);
router.post('/attendance', caregiverController.markAttendance);

module.exports = router;