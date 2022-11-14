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
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Cart not found." });
      }
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/cart.ejs", {
        products: cart.products,
        cartId: cart._id,
      });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async createCart(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(422).json({
        error: "No se pudo obtener los atributos del carrito correctamente.",
      });
    } else {
      try {
        const newCart = await CartService.createCart(body);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(201).json({ newCartId: newCart._id });
      } catch (err) {
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(500).json({ error: err?.message });
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
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Product not found." });
        if (!cart) {
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.status(404).json({ error: "Cart not found." });
        }
      }
      await CartService.createProductOfACart(id, product);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(302).redirect(`/api/cart/${id}/products`);
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async deleteCartById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const cart = await CartService.getCartById(id);
      if (!cart) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Cart not found." });
      }
      await CartService.deleteCartById(id);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).json({ message: "Deleted." });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
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
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Product not found." });
        if (!cart) {
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.status(404).json({ error: "Cart not found." });
        }
      }
      await CartService.deleteProductById(id, id_prod);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(302).redirect(`/api/cart/${id}/products`);
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }
}

export default new CartController();
