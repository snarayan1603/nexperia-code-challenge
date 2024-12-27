// src/routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const { ensureAuth } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const emailQueue = require("../queues/emailQueue");
const sendEmail = require("../utils/sendEmail");

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

router.get("/test-send", async (req, res, next) => {
  const emailContent = {
    to: "mr.singh160320@gmail.com",
    subject: "Subject",
    html: "Bsdiwala is working",
  };

  res.json({
    msg: await sendEmail(
      emailContent.to,
      emailContent.subject,
      emailContent.html
    ),
  });
});

module.exports = router;
