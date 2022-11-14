import { Router } from "express";
import User from "../models/User.js";
import Cart from "../models/Cart.js";
import bcrypt from "bcrypt";
import { sendMailTo } from "../utils/index.js";

const router = Router();

router.get("/", (req, res) => {
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
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
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
    if (user) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
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
        const info = await sendMailTo(
          "laury.walter@ethereal.email",
          "Nuevo registro.",
          "Nuevo usuario registrado."
        );
        logger.info(
          `${new Date().toLocaleString()} - Message id: ${info.messageId}`
        );
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(302).redirect("/login");
      } catch (err) {
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(500).json({ error: err?.message });
      }
    }
  });
});

export default router;
