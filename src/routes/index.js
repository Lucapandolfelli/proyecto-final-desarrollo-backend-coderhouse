import { Router } from "express";
import cartRouter from "./carrito.js";
import productRouter from "./productos.js";

const router = Router();

router.use("/carrito", cartRouter);
router.use("/productos", productRouter);

export default router;
