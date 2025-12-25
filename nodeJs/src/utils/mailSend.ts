import nodemailer from "nodemailer";

interface SendMailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SEND_MAIL_USER, // Your email
    pass: process.env.SEND_MAIL_PASS, // App Password
  },
  tls: {
    rejectUnauthorized: false, // Fix for self-signed certificate error
  },
});

const sendMail = async ({
  to,
  subject,
  html,
  text,
}: SendMailOptions): Promise<void> => {
  await transporter.sendMail({
    from: `<${process.env.SEND_MAIL_USER}>`,
    to,
    subject,
    html,
    text,
  });
};

export default {
  transporter,
  sendMail
}
