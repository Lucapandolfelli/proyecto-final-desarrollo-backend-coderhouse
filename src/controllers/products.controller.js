/* import { productosDao as productoApi } from "../daos/index.js"; */
import { Product } from "../models/Product.js";
import logger from "../logs/logger.js";

export const getProducts = async (req, res) => {
  /* const { id } = req.params;
  if (id) {
    // Si el 'id' no está undifined, devuelve un producto por su 'id'
    const products = await productoApi.getById(id);
    if (products === false) {
      res.status(404).send({ error: "No se encontró el producto." });
    } else {
      res.status(200).json({ products: products });
    }
  } else {
    // Sino, devuelve todos los productos
    const products = await productoApi.getAll();
    if (products === false) {
      res.status(404).send({ error: "No se encontraron productos." });
    } else {
      res.status(200).render("index.ejs", { products: products });
    }
  } */
  const { id } = req.params;
  if (id) {
    try {
      const product = await Product.findById(id);
      if (product) {
        logger.info(
          `URL: ${req.baseUrl} - Method: ${req.method} - Status: 200`
        );
        res.status(200).json(product);
      } else {
        logger.error(
          `URL: ${req.baseUrl} - Method: ${req.method} - Status: 404`
        );
        res.status(404).json({ error: "Product not found." });
      }
    } catch (err) {
      logger.warn(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 500`);
      res.status(404).json({ error: err.message });
    }
  } else {
    try {
      const products = await Product.find();
      if (products) {
        logger.info(
          `URL: ${req.baseUrl} - Method: ${req.method} - Status: 200`
        );
        res.status(200).json(products);
      } else {
        logger.error(
          `URL: ${req.baseUrl} - Method: ${req.method} - Status: 404`
        );
        res.status(404).json({ error: "Products not found." });
      }
    } catch (err) {
      logger.warn(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 500`);
      res.status(500).json({ error: err?.message });
    }
  }
};

export const createProduct = async (req, res) => {
  const body = req.body;
  if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
    logger.error(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 422`);
    res.status(422).json({
      error: "No se pudo obtener los atributos del producto correctamente.",
    });
  } else {
    /* const data = await productoApi.createNewProduct(newProduct); */
    try {
      const newProduct = new Product(body);
      await newProduct.save();
      logger.info(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 201`);
      res.status(201).json({ newProduct: newProduct });
    } catch (err) {
      logger.warn(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 500`);
      res.status(500).json({ error: err?.message });
    }
  }
};

export const updateProduct = async (req, res) => {
  /* const products = await productoApi.getAll();
  if (products.length === 0) {
    res.status(404).send({ error: "No se encontraron productos." });
  } else {
    const lastItem = products[products.length - 1];
    if (lastItem.id >= id) {
      const editedProduct = await productoApi.editProduct(
        products,
        id,
        newProduct
      );
      console.log(editedProduct);
      res.status(200).json({ updatedProduct: editedProduct });
    } else {
      res.status(404).send({ error: "No se encontró el producto." });
    }
  } */
  const { id } = req.params;
  const newProduct = req.body;
  try {
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndUpdate(id, newProduct);
      logger.info(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 200`);
      res.status(200).json({ message: "Updated.", newProduct: newProduct });
    } else {
      logger.error(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 404`);
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
    logger.warn(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 500`);
    res.status(500).json({ error: err?.message });
  }
};

export const deleteProduct = async (req, res) => {
  /* const { id } = req.params;
  if ((await productoApi.deleteById(id)) === false) {
    res.status(404).send({ error: "No se encontró el producto." });
  } else {
    res.status(200).send({ success: "Se eliminó el producto correctamente." });
  } */
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndDelete(id);
      /* await Product.deleteOne({ _id: id }); */
      logger.info(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 200`);
      res.status(200).json({ message: "Deleted." });
    } else {
      logger.error(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 404`);
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
    logger.warn(`URL: ${req.baseUrl} - Method: ${req.method} - Status: 500`);
    res.status(500).json({ error: err?.message });
  }
};
