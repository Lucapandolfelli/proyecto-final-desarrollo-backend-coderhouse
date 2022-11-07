import { Router } from "express";
import {
  getProductsByCartId,
  createCart,
  deleteCart,
  deleteProductById,
  createProductOfACart,
} from "../controllers/carts.controller.js";

const router = Router();

// [GET] 🌐/api/cart/:id/products
router.get("/:id/products", getProductsByCartId);

// [POST] 🌐/api/cart
router.post("/", createCart);

// [POST] 🌐/api/cart/:id/products/:id_prod
router.post("/:id/products/:id_prod", createProductOfACart);

// [DELETE] 🌐/api/cart/:id
router.delete("/:id", deleteCart);

// [DELETE] 🌐/api/cart/:id/products/:id_prod
router.delete("/:id/products/:id_prod", deleteProductById);

export default router;
