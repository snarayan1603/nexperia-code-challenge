// src/queues/emailQueue.js
const Bull = require("bull");
const sendEmail = require("../utils/sendEmail");
const Campaign = require("../models/Campaign");
const logger = require("../utils/logger");

const emailQueue = new Bull("email", {
  redis: { host: "127.0.0.1", port: "6379" },
});

emailQueue.process(async (job) => {
  const { to, subject, html, campaignId } = job.data;
  const result = await sendEmail(to, subject, html);

  if (result.success) {
    await Campaign.updateOne(
      { _id: campaignId },
      {
        $inc: {
          "metrics.emailsSent": 1,
          "metrics.emailsPending": -1,
        },
      }
    );
  } else {
    await Campaign.updateOne(
      { _id: campaignId },
      {
        $inc: {
          "metrics.emailsFailed": 1,
          "metrics.emailsPending": -1,
        },
        $push: {
          "metrics.failedEmails": { email: to, error: result.error },
        },
      }
    );
  }
});

emailQueue.on("failed", (job, err) => {
  logger.error(`Job failed for email: ${job.data.to} - Error: ${err.message}`);
});

module.exports = emailQueue;
