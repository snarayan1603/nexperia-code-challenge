// src/controllers/emailController.js
const emailQueue = require("../queues/emailQueue");
const Campaign = require("../models/Campaign");
const Template = require("../models/Template");
const logger = require("../utils/logger");

exports.sendCampaignEmails = async (req, res) => {
  const { campaignId, templateId } = req.body;
  try {
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) return res.status(404).json({ error: "Campaign not found" });

    const template = await Template.findById(templateId);
    if (!template) return res.status(404).json({ error: "Template not found" });

    // // Assign template to campaign
    // campaign.template = templateId;
    // await campaign.save();

    campaign.recipients.forEach((recipient) => {
      const personalizedSubject = template.subject.replaceAll(
        "{first_name}",
        recipient.first_name
      );
      const personalizedBody = template.body.replaceAll(
        "{first_name}",
        recipient.first_name
      );

      const emailContent = {
        to: recipient.email,
        subject: personalizedSubject,
        html: personalizedBody,
        campaignId: campaignId,
      };

      logger.info(recipient.email);

      emailQueue.add(emailContent, { delay: 1000 }); // Adjust delay as needed
    });

    // Initialize metrics
    campaign.metrics.emailsPending = campaign.recipients.length;
    await campaign.save();

    res.json({ message: "Emails are being sent" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
