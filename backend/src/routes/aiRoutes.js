// src/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const { ensureAuth } = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

// AI Suggestions Route
router.post(
  '/suggestions',
  ensureAuth,
  [
    check('description', 'Description is required').not().isEmpty()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  aiController.getSuggestions
);

module.exports = router;
