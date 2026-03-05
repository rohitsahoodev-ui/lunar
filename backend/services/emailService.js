import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_PORT == 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"LunarHost" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};
