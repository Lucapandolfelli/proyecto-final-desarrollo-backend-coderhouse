import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/register.ejs");
});

router.post("/", (req, res) => {
  const { username, email, password, age, address, image, phone } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) {
      res.status(500).json({ error: err?.message });
    }
    if (user) {
      res.status(409).json({ error: "User already exists." });
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        username,
        email,
        age,
        address,
        image,
        phone,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(302).redirect("/login");
    }
  });
});

export default router;
