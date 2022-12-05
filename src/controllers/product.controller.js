import ProductService from "../services/product.service.js";
import { logger } from "../utils/index.js";

class ProductController {
  constructor() {}

  async getProducts(req, res) {
    const {
      params: { id },
    } = req;
    if (id) {
      try {
        const product = await ProductService.getProductById(id);
        if (!product) {
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.status(404).json({ error: "Product not found." });
        }
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(200).render("./pages/single-product.ejs", {
          product,
          cartId: req.cookies.cartIdCookie,
          categories: req.cookies.categoriesCookie,
        });
      } catch (err) {
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(500).json({ error: err.message });
      }
    } else {
      try {
        const products = await ProductService.getAllProducts();
        if (!products) {
          logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
          res.status(404).json({ error: "Products not found." });
        }
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(200).json(products);
      } catch (err) {
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(500).json({ error: err?.message });
      }
    }
  }

  async getProductsByCategoryName(req, res) {
    const {
      params: { category },
    } = req;
    try {
      const products = await ProductService.getProductsByCategoryName(
        category.charAt(0).toUpperCase() + category.slice(1) // Set first letter capitalize to be found on mongo
      );
      if (!products) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: `Products of ${category} not found.` });
      }
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("index.ejs", {
        products,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        sectionTitle: category,
      });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err.message });
    }
  }

  async createProduct(req, res) {
    const { body } = req;
    if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(422).json({
        error: "No se pudo obtener los atributos del producto correctamente.",
      });
    } else {
      try {
        const createdProduct = await ProductService.createProduct(body);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(201).json({ createdProduct });
      } catch (err) {
        logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(500).json({ error: err?.message });
      }
    }
  }

  async updateProduct(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const newProduct = req.body;
      const product = await ProductService.getProductById(id);
      if (!product) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Product not found." });
      }
      const updatedProduct = await ProductService.updateProduct(id, newProduct);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).json({ updatedProduct });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async deleteProductById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const product = await ProductService.getProductById(id);
      if (!product) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Product not found." });
      }
      const deletedProduct = await ProductService.deleteProductById(id);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).json({ deletedProduct });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }
}

export default new ProductController();
