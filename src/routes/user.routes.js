import { Router } from "express";
import User from "../models/User.js";
import { logger } from "../utils/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const {
    user: { _id },
  } = req;
  const user = await User.findById(_id);
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res
    .status(200)
    .render("./pages/user.ejs", { user: user, cartId: user.cart_id });
});

export default router;
