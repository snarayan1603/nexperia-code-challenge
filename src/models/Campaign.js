// src/models/Campaign.js
const mongoose = require("mongoose");

const RecipientSchema = new mongoose.Schema({
  email: { type: String, required: true },
  first_name: { type: String, required: true },
});

const TemplateSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "Template" },
  name: { type: String },
});

const CampaignSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  template: TemplateSchema,
  recipients: [RecipientSchema],
  metrics: {
    emailsSent: { type: Number, default: 0 },
    emailsPending: { type: Number, default: 0 },
    emailsFailed: { type: Number, default: 0 },
    failedEmails: [{ email: String, error: String }],
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Campaign", CampaignSchema);
