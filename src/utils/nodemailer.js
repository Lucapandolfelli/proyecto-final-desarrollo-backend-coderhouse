import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

const sendMailTo = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.NODEMAILER_FROM || "Tiendita",
    to,
    subject,
    text,
  };
  return await transporter.sendMail(mailOptions);
};

export default sendMailTo;
