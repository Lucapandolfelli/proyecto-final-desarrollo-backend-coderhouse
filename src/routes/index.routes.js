import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import { Product } from "../models/Product.js";
import cartRouter from "./cart.routes.js";
import productRouter from "./products.routes.js";
import loginRouter from "./login.routes.js";
import logoutRouter from "./logout.routes.js";
import registerRouter from "./register.routes.js";
import userRouter from "./user.routes.js";
import logger from "../logs/logger.js";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  const products = await Product.find();
  logger.info(
    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
      req.method
    } - Status: 200`
  );
  res.status(200).render("index.ejs", { products: products });
});

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/register", registerRouter);
router.use("/user", userRouter);
router.use("/api/carrito", cartRouter);
router.use("/api/productos", productRouter);

router.use((req, res) => {
  logger.error(
    `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
      req.method
    } - Status: 404`
  );
  res.status(404).render("./pages/404.ejs");
});

export default router;
