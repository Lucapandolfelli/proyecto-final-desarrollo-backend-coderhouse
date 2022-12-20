import CartService from "../services/cart.service.js";
import ProductService from "../services/product.service.js";
import { logger } from "../utils/index.js";

class CartController {
  constructor() {}

  async getProductsByCartId(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const cart = await CartService.getCartById(id);
      if (!cart) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Cart Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/cart.ejs", {
        products: cart.products,
        cartId: req.cookies.cartIdCookie,
        cartTotal: cart.total,
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

  async createCart(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
      res.status(422);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 422,
        message: "No se pudo obtener los atributos del carrito correctamente",
      });
    } else {
      try {
        const newCart = await CartService.createCart(body);
        res.status(201);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.json({ newCartId: newCart._id });
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

  async createProductOfACart(req, res) {
    try {
      const {
        params: { id, id_prod },
      } = req;
      const product = await ProductService.getProductById(id_prod);
      const cart = await CartService.getCartById(id);
      if (!product) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Product Not Found",
        });
        if (!cart) {
          res.status(404);
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.render("./pages/error.ejs", {
            code: 404,
            message: "Cart Not Found",
          });
        }
      }
      await CartService.createProductOfACart(id, product);
      res.status(302);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.redirect(`/api/cart/${id}/products`);
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async deleteCartById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const cart = await CartService.getCartById(id);
      if (!cart) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Cart Not Found",
        });
      }
      await CartService.deleteCartById(id);
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.redirect(`/api/cart/${id}/products`);
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async deleteProductById(req, res) {
    try {
      const {
        params: { id, id_prod },
      } = req;
      const product = await ProductService.getProductById(id_prod);
      const cart = await CartService.getCartById(id);
      if (!product) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Product Not Found",
        });
        if (!cart) {
          res.status(404);
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.render("./pages/error.ejs", {
            code: 404,
            message: "Cart Not Found",
          });
        }
      }
      await CartService.deleteProductByCartId(id, id_prod);
      res.status(302);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.redirect(`/api/cart/${id}/products`);
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: err?.message,
      });
    }
  }
}

export default new CartController();
