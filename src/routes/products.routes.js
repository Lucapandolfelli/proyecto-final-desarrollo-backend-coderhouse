import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

// GET 🌐/api/productos/:id?
router.get("/:id?", getProducts);

// POST 🌐/api/productos/
router.post("/", createProduct);

// PUT 🌐/api/productos/:id
router.put("/:id", updateProduct);

// DELETE 🌐/api/productos/:id
router.delete("/:id", deleteProduct);

export default router;
