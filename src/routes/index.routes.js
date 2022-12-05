import { Router } from "express";
import { isAuth, auth } from "../middleware/index.js";
import { Product } from "../models/Product.js";
import User from "../models/User.js";
import cartRouter from "./cart.routes.js";
import productRouter from "./product.routes.js";
import loginRouter from "./login.routes.js";
import logoutRouter from "./logout.routes.js";
import registerRouter from "./register.routes.js";
import userRouter from "./user.routes.js";
import orderRouter from "./order.routes.js";
import { logger } from "../utils/index.js";
import { Category } from "../models/Category.js";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  const products = await Product.find({});
  const categories = await Category.find({});
  const { cart_id } = await User.findById(req.user._id);
  logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
  res
    .cookie("cartIdCookie", cart_id, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 300000),
    })
    .cookie("categoriesCookie", categories, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 300000),
    })
    .status(200)
    .render("index.ejs", {
      sectionTitle: "Productos",
      products,
      cartId: cart_id,
      categories,
    });
});

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/register", registerRouter);
router.use("/user", userRouter);
router.use("/api/cart", cartRouter);
router.use("/api/products", productRouter);
router.use("/api/order", orderRouter);

router.use((req, res) => {
  res.status(404).render("./pages/404.ejs");
});

export default router;
