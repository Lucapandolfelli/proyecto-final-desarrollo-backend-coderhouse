import { createTransport } from "nodemailer";

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "laury.walter@ethereal.email",
    pass: "xuvKpgXngQ89FbyZrc",
  },
});

export default transporter;
