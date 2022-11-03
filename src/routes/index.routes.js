import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import { Product } from "../models/Product.js";
import cartRouter from "./cart.routes.js";
import productRouter from "./products.routes.js";
import loginRouter from "./login.routes.js";
import logoutRouter from "./logout.routes.js";
import registerRouter from "./register.routes.js";

const router = Router();

router.get("/", isAuth, async (req, res) => {
  const products = await Product.find();
  res.render("index.ejs", { products: products });
});

router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/register", registerRouter);
router.use("/api/carrito", cartRouter);
router.use("/api/productos", productRouter);

router.use((req, res) => {
  res.status(404).render("./pages/404.ejs");
});

export default router;
