// src/utils/sendEmail.js
const sgMail = require("@sendgrid/mail");
const logger = require("./logger");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  const msg = {
    to,
    from: process.env.FROM_EMAIL, // Verified sender
    subject,
    html,
  };
  try {
    await sgMail.send(msg);
    let info = `Email sent from ${process.env.FROM_EMAIL}  to ${to} SUBJECT ${subject} HTML ${html}`;
    logger.info(info);
    return { success: true, msg: info };
  } catch (error) {
    logger.error(
      `Failed to send email from ${process.env.FROM_EMAIL} to ${to}: ${error.message}`
    );
    console.error(error);
    return { success: false, error: error };
  }
};

module.exports = sendEmail;
