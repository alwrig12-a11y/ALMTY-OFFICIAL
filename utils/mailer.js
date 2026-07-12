const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', // Or SendGrid / Resend SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // App Password
  }
});

const sendDossierAccessCode = async (toEmail, accessCode) => {
  const mailOptions = {
    from: '"ALMTY SYNDICATE" <no-reply@almty.io>',
    to: toEmail,
    subject: '[ALMTY PROTOCOL]: DOSSIER ACCESS CODE DISPATCHED',
    text: `OPERATIVE,\n\nYOUR DOSSIER ACCESS CODE IS: ${accessCode}\n\nUSE THIS CODE TO COMPLETE INITIATION AT ALMTY.IO.\n\nALMTY LLC // NODE 502`
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendDossierAccessCode };