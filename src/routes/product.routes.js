import { Router } from "express";
import ProductController from "../controllers/product.controller.js";

const router = Router();

// [GET] 🌐/api/products/:id?
router.get("/:id?", ProductController.getProducts);

// [GET] 🌐/api/products/:category
router.get("/category/:category", ProductController.getProductsByCategoryName);

// [POST] 🌐/api/products/
router.post("/", ProductController.createProduct);

// [PUT] 🌐/api/products/:id
router.put("/:id", ProductController.updateProduct);

// [DELETE] 🌐/api/products/:id
router.delete("/:id", ProductController.deleteProductById);

export default router;
