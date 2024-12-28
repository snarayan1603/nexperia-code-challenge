// src/routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const { ensureAuth } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");

// Send Campaign Emails Route
router.post(
  "/send",
  ensureAuth,
  [
    check("campaignId", "Campaign ID is required").not().isEmpty(),
    check("templateId", "Template ID is required").not().isEmpty(),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  emailController.sendCampaignEmails
);

module.exports = router;
