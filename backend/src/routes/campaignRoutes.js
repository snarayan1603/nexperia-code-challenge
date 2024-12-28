// src/routes/campaignRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { ensureAuth } = require("../middleware/authMiddleware");
const Campaign = require("../models/Campaign");
const validator = require("validator");

// Configure Multer
const upload = multer({ dest: "uploads/" });

// CSV Upload Endpoint
router.post(
  "/upload-csv",
  ensureAuth,
  upload.single("file"),
  async (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        // Validate required fields
        const requiredFields = ["email", "first_name"];
        const hasAllFields = results.every((record) =>
          requiredFields.every((field) => field in record)
        );
        if (!hasAllFields) {
          return res.status(400).json({ error: "CSV missing required fields" });
        }

        const invalidEmails = results.filter(
          (record) => !validator.isEmail(record.email)
        );
        if (invalidEmails.length > 0) {
          return res.status(400).json({
            error: "CSV contains invalid email addresses",
            invalidEmails,
          });
        }

        // Create Campaign and Save Recipients
        try {
          const campaign = new Campaign({
            user: req.user.id,
            name: req.body.name || "Untitled Campaign",
            recipients: results,
            template: { id: req.body.templateId, name: req.body.templateName },
          });
          await campaign.save();
          res.status(201).json({
            message: "CSV uploaded and processed",
            campaignId: campaign._id,
          });
        } catch (error) {
          res.status(500).json({ error: "Server error" });
        }
      });
  }
);

// Fetch All Campaigns
router.get("/all", ensureAuth, async (req, res) => {
  try {
    // Find all campaigns for the logged-in user
    // Or remove { user: req.user.id } if you want to fetch ALL users' campaigns
    const campaigns = await Campaign.find({ user: req.user.id });

    // Return campaigns as JSON
    res.json({ campaigns });
  } catch (err) {
    console.error("Error fetching campaigns:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Campaign Endpoint
router.delete("/:id", ensureAuth, async (req, res) => {
  try {
    const campaignId = req.params.id;

    // Find and delete the campaign
    const campaign = await Campaign.findOneAndDelete({
      _id: campaignId,
      user: req.user.id,
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found or unauthorized" });
    }

    res.json({ message: "Campaign deleted successfully", campaign });
  } catch (err) {
    console.error("Error deleting campaign:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
