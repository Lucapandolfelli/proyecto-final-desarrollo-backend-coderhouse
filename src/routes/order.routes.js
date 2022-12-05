import { Router } from "express";
import OrderController from "../controllers/order.controller.js";

const router = Router();

// [POST] 🌐/api/order
router.get("/", OrderController.getAllOrdersByBuyerEmail);

// [POST] 🌐/api/order/:id
router.get("/:id", OrderController.getOrderById);

// [POST] 🌐/api/order
router.post("/", OrderController.createOrder);

export default router;
