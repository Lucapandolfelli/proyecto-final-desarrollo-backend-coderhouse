import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const router = Router();

// [GET] 🌐/api/cart/:id/products
router.get("/:id/products", CartController.getProductsByCartId);

// [POST] 🌐/api/cart
router.post("/", CartController.createCart);

// [POST] 🌐/api/cart/:id/products/:id_prod
router.post("/:id/products/:id_prod", CartController.createProductOfACart);

// [DELETE] 🌐/api/cart/:id
router.delete("/:id", CartController.deleteCartById);

// [DELETE] 🌐/api/cart/:id/products/:id_prod/delete
router.post("/:id/products/:id_prod/delete", CartController.deleteProductById);

export default router;
