const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');

router.get('/dashboard/:parentId', parentController.getDashboard);

module.exports = router;