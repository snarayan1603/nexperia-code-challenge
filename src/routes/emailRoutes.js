// src/routes/emailRoutes.js
const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");
const { ensureAuth } = require("../middleware/authMiddleware");
const { check, validationResult } = require("express-validator");
const emailQueue = require("../queues/emailQueue");
const sendEmail = require("../utils/sendEmail");
const logger = require("../utils/logger");

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

router.get("/health", async (req, res) => {
  try {
    // Ping Redis through Bull
    await emailQueue.isReady(); // Returns a promise that resolves when the queue is ready

    res
      .status(200)
      .json({ status: "ok", message: "Redis connection is healthy." });
  } catch (error) {
    res
      .status(500)
      .json({
        status: "error",
        message: "Redis connection failed.",
        error: error.message,
      });
  }
});

router.get("/test-send", async (req, res, next) => {
  const emailContent = {
    to: "mr.singh160320@gmail.com",
    subject: "Subject",
    html: "Bsdiwala is working",
  };

  emailQueue.add(emailContent, { delay: 1000 });

  res.json({
    msg: "sending",
  });
});

module.exports = router;
