import { Router } from "express";
import {
  getProductsByCartId,
  createCart,
  deleteCart,
  deleteProductById,
  createProductOfACart,
} from "../controllers/carts.controller.js";

const router = Router();

// GET 🌐/api/carrito/:id/productos
router.get("/:id/productos", getProductsByCartId);

// POST 🌐/api/carrito
router.post("/", createCart);

// POST 🌐/api/carrito/:id/productos/:id_prod
router.post("/:id/productos/:id_prod", createProductOfACart);

// DELETE 🌐/api/carrito/:id
router.delete("/:id", deleteCart);

// DELETE 🌐/api/carrito/:id/productos/:id_prod
router.delete("/:id/productos/:id_prod", deleteProductById);

export default router;
