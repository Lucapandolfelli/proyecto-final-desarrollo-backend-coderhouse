import OrderService from "../services/order.service.js";
import { logger, sendMailTo } from "../utils/index.js";

class OrderController {
  constructor() {}

  async getAllOrdersByBuyerEmail(req, res) {
    try {
      const { email } = req.user;
      const orders = await OrderService.getAllOrdersByBuyerEmail(email);
      if (!orders) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Orders Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/order.ejs", {
        orders,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
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
        res.status(404).render("./pages/error.ejs", {
          code: 404,
          message: "Order Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/single-order.ejs", {
        order,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async createOrder(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 3) {
      res.status(422);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 422,
        message: "No se pudo obtener los atributos del carrito correctamente",
      });
    } else {
      try {
        const { state } = body;
        const newOrder = await OrderService.createOrder(
          state,
          req.cookies.cartIdCookie
        );
        sendMailTo(
          newOrder.buyer_email,
          "Compraste en Tiendita",
          `Tu compra se ha realizado correctamente. Tu número de orden es ${newOrder._id}`
        );
        res.status(200);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/single-order.ejs", {
          purchase_date: newOrder.purchase_date,
          order: newOrder,
          cartId: req.cookies.cartIdCookie,
          categories: req.cookies.categoriesCookie,
          userId: req.cookies.userIdCookie,
        });
      } catch (err) {
        res.status(500);
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 500,
          message: "Internal Server Error",
        });
      }
    }
  }
}

export default new OrderController();
