// src/routes/templateRoutes.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const templateController = require('../controllers/templateController');
const { ensureAuth } = require('../middleware/authMiddleware');

// Create Template Route
router.post(
  '/create',
  ensureAuth,
  [
    check('name', 'Template name is required').not().isEmpty(),
    check('subject', 'Subject is required').not().isEmpty(),
    check('body', 'Body is required').not().isEmpty()
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  templateController.createTemplate
);

// Get All Templates
router.get('/', ensureAuth, templateController.getTemplates);

// Delete Template Route
router.delete('/:id', ensureAuth, templateController.deleteTemplate);

module.exports = router;
