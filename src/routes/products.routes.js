import { Router } from "express";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.controller.js";

const router = Router();

// [GET] 🌐/api/products/:id?
router.get("/:id?", getProducts);

// [POST] 🌐/api/products/
router.post("/", createProduct);

// [PUT] 🌐/api/products/:id
router.put("/:id", updateProduct);

// [DELETE] 🌐/api/products/:id
router.delete("/:id", deleteProduct);

export default router;
