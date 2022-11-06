/* import { carritosDao as carritoApi } from "../daos/index.js"; */
import Cart from "../models/Cart.js";
import { Product } from "../models/Product.js";
import logger from "../logs/logger.js";

export const getProductsByCartId = async (req, res) => {
  /* const data = await carritoApi.getProductsByCartId(id);
  if (data === false) {
    res.status(404).send({ error: "No se encontraron carritos." });
  } else {
    if (data === null) {
      res
        .status(404)
        .send({ error: "No se encontraron productos en el carrito." });
    } else {
      res.status(200).json({ cartProducts: data });
    }
  } */
  const {
    params: { id },
  } = req;
  try {
    const cart = await Cart.findById(id);
    if (cart) {
      logger.info(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 200`
      );
      res.status(200).json({ products: cart.products });
    } else {
      logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 404`
      );
      res.status(404).json({ error: "Cart not found." });
    }
  } catch (err) {
    logger.warn(
      `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
        req.method
      } - Status: 500`
    );
    res.status(500).json({ error: err?.message });
  }
};

export const createCart = async (req, res) => {
  const { body } = req;
  if (Object.entries(body).length == 0 || Object.entries(body).length < 1) {
    logger.error(
      `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
        req.method
      } - Status: 422`
    );
    res.status(422).json({
      error: "No se pudo obtener los atributos del carrito correctamente.",
    });
    /* const data = await carritoApi.createNewCart(body);
    res.status(201).json({ newCart: data }); */
  } else {
    try {
      const newCart = new Cart(body);
      await newCart.save();
      logger.info(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 201`
      );
      res.status(201).json({ newCartId: newCart._id });
    } catch (err) {
      logger.warn(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 500`
      );
      res.status(500).json({ error: err?.message });
    }
  }
};

export const createProductOfACart = async (req, res) => {
  /* if (
    Object.entries(newProduct).length === 0 ||
    Object.entries(newProduct).length < 9
  ) {
    const data = await carritoApi.createNewProduct(id, newProduct);
    if (data === undefined) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      if (data === false) {
        res.status(404).send({ error: "No se encontró el carrito." });
      } else {
        res.status(201).json({ newProduct: data });
      }
    }
  } else {
    res.status(422).json({
      error: "No se pudo obtener los atributos del producto correctamente.",
    });
  } */
  const {
    params: { id, id_prod },
  } = req;
  try {
    const product = await Product.findById(id_prod);
    const cart = await Cart.findById(id);
    if (product) {
      if (cart) {
        await Cart.updateOne({ _id: id, $push: { products: product } });
        logger.info(
          `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
            req.method
          } - Status: 201`
        );
        res
          .status(201)
          .json({ message: "Product added to cart.", newProduct: product });
      } else {
        logger.error(
          `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
            req.method
          } - Status: 404`
        );
        res.status(404).json({ error: "Cart not found." });
      }
    } else {
      logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 404`
      );
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
    logger.warn(
      `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
        req.method
      } - Status: 500`
    );
    res.status(500).json({ error: err?.message });
  }
};

export const deleteCart = async (req, res) => {
  /* const data = await carritoApi.deleteById(id);
  if (data === false) {
    res.status(404).send({ error: "No se encontró el carrito." });
  } else {
    if (data === null) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      res.status(200).send({ success: "Se eliminó el carrito correctamente." });
    }
  } */
  const {
    params: { id },
  } = req;
  try {
    const cart = await Cart.findById(id);
    if (cart) {
      await Cart.findByIdAndDelete(id);
      logger.info(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 200`
      );
      res.status(200).json({ message: "Deleted." });
    } else {
      logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 404`
      );
      res.status(404).json({ error: "Cart not found." });
    }
  } catch (err) {
    logger.warn(
      `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
        req.method
      } - Status: 500`
    );
    res.status(500).json({ error: err?.message });
  }
};

export const deleteProductById = async (req, res) => {
  /* const data = await carritoApi.deleteProductOfCartById(id, id_prod);
  if (data === false) {
    res
      .status(404)
      .send({ error: "No se encontraron los productos del carrito." });
  } else {
    if (data === null) {
      res.status(404).send({ error: "No se encontraron carritos." });
    } else {
      if (data === undefined) {
        res.status(404).send({ error: "No se encontró el producto." });
      } else {
        res
          .status(200)
          .send({ success: "Se eliminó el carrito correctamente." });
      }
    }
  } */
  const {
    params: { id, id_prod },
  } = req;
  try {
    const product = await Product.findById(id_prod);
    const cart = await Cart.findById(id);
    if (product) {
      if (cart) {
        await Cart.updateOne(
          { _id: id },
          { $pull: { products: { _id: id_prod } } }
        );
        logger.info(
          `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
            req.method
          } - Status: 200`
        );
        res.status(200).json({ message: "Product deleted of this cart." });
      } else {
        logger.error(
          `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
            req.method
          } - Status: 404`
        );
        res.status(404).json({ error: "Cart not found." });
      }
    } else {
      logger.error(
        `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
          req.method
        } - Status: 404`
      );
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
    logger.warn(
      `${new Date().toLocaleString()} - URL: ${req.baseUrl} - Method: ${
        req.method
      } - Status: 500`
    );
    res.status(500).json({ error: err?.message });
  }
};
