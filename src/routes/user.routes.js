import { Router } from "express";
import User from "../models/User.js";
import logger from "../logs/logger.js";

const router = Router();

router.get("/", async (req, res) => {
  const {
    user: { _id },
  } = req;
  const user = await User.findById(_id);
  logger.info(
    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
      req.method
    } - Status: 200`
  );
  res
    .status(200)
    .render("./pages/user.ejs", { user: user, cartId: user.cart_id });
});

export default router;
