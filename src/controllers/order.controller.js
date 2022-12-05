import OrderService from "../services/order.service.js";
import { logger } from "../utils/index.js";

class OrderController {
  constructor() {}

  async getAllOrdersByBuyerEmail(req, res) {
    try {
      const { email } = req.user;
      const orders = await OrderService.getAllOrdersByBuyerEmail(email);
      if (!orders) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Orders not found." });
      }
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/order.ejs", {
        orders,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
      });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async getOrderById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const order = await OrderService.getOrderById(id);
      if (!order) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Order not found." });
      }
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/single-order.ejs", {
        order,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
      });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async createOrder(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 3) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(422).json({
        error: "No se pudo obtener los atributos del carrito correctamente.",
      });
    } else {
      try {
        const { state } = body;
        const newOrder = await OrderService.createOrder(
          state,
          req.cookies.cartIdCookie
        );
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(200).render("./pages/single-order.ejs", {
          purchase_date: order.purchase_date,
          order: newOrder,
          cartId: req.cookies.cartIdCookie,
          categories: req.cookies.categoriesCookie,
        });
      } catch (err) {
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(500).json({ error: err?.message });
      }
    }
  }
}

export default new OrderController();
