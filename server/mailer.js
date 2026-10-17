import nodemailer from 'nodemailer';
import { config } from './config.js';

// Forwards contact-form messages to the professor's inbox over SMTP.
// Plain-text only (no HTML) so visitor input can never inject markup.
const smtp = config.smtp;
export const mailEnabled = Boolean(smtp.host && smtp.user && smtp.pass);

const transporter = mailEnabled
  ? nodemailer.createTransport({
      host: smtp.host,
      port: smtp.port,
      secure: smtp.port === 465,
      auth: { user: smtp.user, pass: smtp.pass },
      tls: { minVersion: 'TLSv1.2' },
    })
  : null;

// Header fields must be a single line (blocks header injection).
const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();

export async function forwardMessage({ name, email, subject, message }) {
  if (!transporter) return false;
  await transporter.sendMail({
    from: { name: 'Portfolio contact form', address: smtp.from || smtp.user },
    to: config.mailTo,
    replyTo: { name: oneLine(name), address: oneLine(email) },
    subject: `[Website] ${oneLine(subject)}`,
    text: [
      `Name:    ${oneLine(name)}`,
      `Email:   ${oneLine(email)}`,
      `Subject: ${oneLine(subject)}`,
      '',
      message,
      '',
      '-- Sent from the contact form on your portfolio website.',
    ].join('\n'),
  });
  return true;
}

export function verifyMailer() {
  if (!transporter) {
    console.warn('[mail] SMTP not configured - messages are only saved to server/data.');
    return;
  }
  transporter
    .verify()
    .then(() => console.log(`[mail] SMTP ready - forwarding to ${config.mailTo}`))
    .catch((err) => console.error('[mail] SMTP login failed:', err.message));
}
