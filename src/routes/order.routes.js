import { Router } from "express";
import OrderController from "../controllers/order.controller.js";

const orderRouter = Router();

// [GET] 🌐/api/order
orderRouter.get("/", OrderController.getAllOrdersByBuyerEmail);

// [GET] 🌐/api/order/:id
orderRouter.get("/:id", OrderController.getOrderById);

// [POST] 🌐/api/order
orderRouter.post("/", OrderController.createOrder);

export default orderRouter;
