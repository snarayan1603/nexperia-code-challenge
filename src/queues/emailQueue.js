// src/queues/emailQueue.js
const Bull = require("bull");
const sendEmail = require("../utils/sendEmail");
const Campaign = require("../models/Campaign");
const logger = require("../utils/logger");

const emailQueue = new Bull("email", process.env.REDIS_URL);

// Log when the queue is ready to accept jobs
emailQueue.on('ready', () => {
  logger.info('Bull queue is connected and ready to receive jobs.');
});


emailQueue.process(async (job) => {
  const { to, subject, html, campaignId } = job.data;
  const result = await sendEmail(to, subject, html);
  logger.info(`Added in Queue ${to}`)

  if (campaignId)
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
