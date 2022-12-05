import { Router } from "express";
import CartController from "../controllers/cart.controller.js";

const cartRouter = Router();

// [GET] 🌐/api/cart/:id/products
cartRouter.get("/:id/products", CartController.getProductsByCartId);

// [POST] 🌐/api/cart
cartRouter.post("/", CartController.createCart);

// [POST] 🌐/api/cart/:id/products/:id_prod
cartRouter.post("/:id/products/:id_prod", CartController.createProductOfACart);

// [DELETE] 🌐/api/cart/:id
cartRouter.post("/:id/delete", CartController.deleteCartById);

// [DELETE] 🌐/api/cart/:id/products/:id_prod/delete
cartRouter.post(
  "/:id/products/:id_prod/delete",
  CartController.deleteProductById
);

export default cartRouter;
