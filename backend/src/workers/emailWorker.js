// src/workers/emailWorker.js

const emailQueue = require('../queues/emailQueue');
const logger = require('../utils/logger');

// Event listeners for comprehensive logging
emailQueue.on('ready', () => {
  logger.info('Bull worker connected to Redis and is ready to process jobs.');
});

emailQueue.on('error', (error) => {
  logger.error(`Bull worker connection error: ${error.message}`);
});

emailQueue.on('active', (job, jobPromise) => {
  logger.info(`Processing job ${job.id} for email: ${job.data.to}`);
});

emailQueue.on('completed', (job, result) => {
  logger.info(`Job completed for email: ${job.data.to}`);
});

emailQueue.on('failed', (job, err) => {
  logger.error(`Job failed for email: ${job.data.to} - Error: ${err.message}`);
});

// Handle graceful shutdown
const gracefulShutdown = () => {
  logger.info('Shutting down email worker...');
  emailQueue.close().then(() => {
    logger.info('Email worker shut down gracefully.');
    process.exit(0);
  }).catch((error) => {
    logger.error(`Error during shutdown: ${error.message}`);
    process.exit(1);
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

logger.info('Email worker is running and listening to the queue.');
