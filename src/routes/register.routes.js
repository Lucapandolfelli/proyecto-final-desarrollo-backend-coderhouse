import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import logger from "../logs/logger.js";
import { transporter, upload } from "../utils/index.js";
import Cart from "../models/Cart.js";

const router = Router();

const mailOptions = {
  from: "Tiendita",
  to: "laury.walter@ethereal.email",
  subject: "Nuevo registro.",
  text: "Nuevo usuario registrado.",
};

router.get("/", (req, res) => {
  logger.info(
    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
      req.method
    } - Status: 200`
  );
  res.status(200).render("./pages/register.ejs");
});

router.post("/", upload.single("image"), (req, res) => {
  const { username, email, password, age, address, phone } = req.body;
  const { file } = req;
  if (!file) {
    res.status(400).json({ error: "Please upload a file." });
  }
  User.findOne({ username }, async (err, user) => {
    if (err) {
      logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 500`
      );
      res.status(500).json({ error: err?.message });
    }
    if (user) {
      logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 409`
      );
      res.status(409).json({ error: "User already exists." });
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const userCart = new Cart([]);
      await userCart.save();
      const newUser = new User({
        username,
        email,
        age,
        address,
        image: file.filename,
        phone,
        password: hashedPassword,
        cart_id: userCart._id,
      });
      try {
        await newUser.save();
        /* const info = await transporter.sendMail(mailOptions); */
        logger.info(
          `${new Date().toLocaleString()} - Message id: ${info.messageId}`
        );
        res.status(302).redirect("/login");
      } catch (err) {
        res.status(500).json({ error: err?.message });
      }
    }
  });
});

export default router;
