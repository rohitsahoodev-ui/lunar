import nodemailer from 'nodemailer';

let transporterInstance = null;

const getTransporter = () => {
  if (!transporterInstance) {
    transporterInstance = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }
  return transporterInstance;
};

export const sendEmail = async (to, subject, html) => {
  try {
    const transporter = getTransporter();
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
