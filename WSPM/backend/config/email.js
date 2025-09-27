const nodemailer = require("nodemailer");

/**
 * Creates a reusable transporter using environment variables.
 * Works with any SMTP server (Gmail/Outlook/SendGrid/etc.)
 *
 * Required ENV:
 *  - EMAIL_HOST (e.g., smtp.gmail.com)
 *  - EMAIL_PORT (e.g., 465 for SSL, 587 for TLS)
 *  - EMAIL_USER
 *  - EMAIL_PASS
 * Optional:
 *  - EMAIL_FROM (default uses EMAIL_USER)
 */
const createTransporter = () => {
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT || 587);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!host || !user || !pass) {
    console.warn(
      "⚠️  Email env not fully set. Email sending will fail until configured."
    );
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: user && pass ? { user, pass } : undefined,
  });
};

const mailer = createTransporter();

/**
 * Helper to send an email
 * @param {Object} opts
 * @param {string|string[]} opts.to
 * @param {string} opts.subject
 * @param {string} [opts.text]
 * @param {string} [opts.html]
 * @param {Array} [opts.attachments]
 */
const sendMail = async ({ to, subject, text, html, attachments }) => {
  const from =
    process.env.EMAIL_FROM || process.env.EMAIL_USER || "no-reply@example.com";

  const info = await mailer.sendMail({
    from,
    to,
    subject,
    text,
    html,
    attachments,
  });

  // nodemailer returns a messageId even in dev
  console.log("✉️  Mail sent:", info.messageId);
  return info;
};

module.exports = { mailer, sendMail };
