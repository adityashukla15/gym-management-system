
const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

async function createTransporter() {
  const accessToken = await oAuth2Client.getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.EMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken:process.env.ACCESS_TOKEN, // 🔥 THIS IS IMPORTANT
    },
  });
}

//transporter communicate krta hai google ke servers se ki isko emails bhejo
// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = await createTransporter(); // 👈 dynamic transporter

    const info = await transporter.sendMail({
      from: `"BankingSystem" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to Gym Ledger!';
    const text = `Hello ${name},\n\nThank you for registering at Gym Ledger. We're excited to have you on board!\n\nBest regards,\nThe Gym Ledger Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering at Gym Ledger. We're excited to have you on board!</p><p>Best regards,<br>The Gym Ledger Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

module.exports = {
    sendRegistrationEmail,
}