/* import { productosDao as productoApi } from "../daos/index.js"; */
import { Product } from "../models/Product.js";

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
        res.status(200).json(products);
      } else {
        res.status(404).json({ error: "Product not found." });
      }
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  } else {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  }
};

export const createProduct = async (req, res) => {
  const body = req.body;
  if (Object.entries(body).length == 0 || Object.entries(body).length < 6) {
    res.status(422).json({
      error: "No se pudo obtener los atributos del producto correctamente.",
    });
  } else {
    /* const data = await productoApi.createNewProduct(newProduct); */
    try {
      const newProduct = new Product(body);
      await newProduct.save();
      res.status(201).json({ newProduct: newProduct });
    } catch (err) {
      res.status(500).json({ error: err?.message });
    }
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const newProduct = req.body;
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
  try {
    const product = await Product.findById(id);
    if (product) {
      await Product.findByIdAndUpdate(id, newProduct);
      res.status(200).json({ message: "Updated.", newProduct: newProduct });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
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
      res.status(200).json({ message: "Deleted." });
    } else {
      res.status(404).json({ error: "Product not found." });
    }
  } catch (err) {
    res.status(500).json({ error: err?.message });
  }
};
