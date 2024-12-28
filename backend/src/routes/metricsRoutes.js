// src/routes/metricsRoutes.js
const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');
const { ensureAuth } = require('../middleware/authMiddleware');

// Get Metrics for a Campaign
router.get('/:id/metrics', ensureAuth, metricsController.getMetrics);

module.exports = router;
