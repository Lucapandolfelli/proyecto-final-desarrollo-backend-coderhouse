import { Router } from "express";
import JWTAuth from "../middleware/jwt.middleware.js";
import { Product } from "../models/Product.js";
import User from "../models/User.js";
import cartRouter from "./cart.routes.js";
import productRouter from "./product.routes.js";
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";
import messageRouter from "./message.routes.js";
import { logger } from "../utils/index.js";
import { Category } from "../models/Category.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/", JWTAuth, async (req, res) => {
  try {
    const products = await Product.find({});
    const user = req.user;
    const categories = await Category.find({});
    const { cart_id } = await User.findById(req.user._id);
    res.status(200);
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res
      .cookie("cartIdCookie", cart_id, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .cookie("userIdCookie", user._id, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .cookie("categoriesCookie", categories, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 300000),
      })
      .render("index.ejs", {
        sectionTitle: "Productos",
        products,
        cartId: cart_id,
        categories,
        userId: req.cookies.userIdCookie,
      });
  } catch (err) {
    res.status(500);
    logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.render("./pages/error.ejs", {
      code: 500,
      message: "Internal Server Error",
    });
  }
});

router.use("/auth", authRouter);
router.use("/user", JWTAuth, userRouter);
router.use("/consultas", JWTAuth, messageRouter);
router.use("/api/cart", JWTAuth, cartRouter);
router.use("/api/products", productRouter);
router.use("/api/order", JWTAuth, orderRouter);

router.use((req, res) => {
  res.status(404);
  logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res.render("./pages/error.ejs", {
    code: 404,
    message: "Not Found",
  });
});

export default router;
