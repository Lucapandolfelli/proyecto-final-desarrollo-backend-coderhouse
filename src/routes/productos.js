import { Router } from "express";
import { productosDao as productoApi } from "../daos/index.js";
const router = Router();

// GET /api/productos/:id?
router.get("/:id?", async (req, res) => {
  const { id } = req.params;
  if (id) {
    // Si el 'id' no está undifined, devuelve un producto por su 'id'
    const data = await productoApi.getById(id);
    if (data === false) {
      res.status(404).send({ error: "No se encontró el producto." });
    } else {
      res.status(200).json({ data: data });
    }
  } else {
    // Sino, devuelve todos los productos
    const data = await productoApi.getAll();
    if (data === false) {
      res.status(404).send({ error: "No se encontraron productos." });
    } else {
      res.status(200).json({ data: data });
    }
  }
});

// POST /api/productos/
router.post("/", async (req, res) => {
  const newProduct = req.body;
  if (
    Object.entries(newProduct).length === 0 ||
    Object.entries(newProduct).length < 7
  ) {
    const data = await productoApi.createNewProduct(newProduct);
    res.status(201).json({ newProduct: data });
  } else {
    res.status(422).json({
      error: "No se pudo obtener los atributos del producto correctamente.",
    });
  }
});

// PUT /api/productos/:id
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  let newProduct = req.body;
  const data = await productoApi.getAll();
  if (data.length === 0) {
    res.status(404).send({ error: "No se encontraron productos." });
  } else {
    const lastItem = data[data.length - 1];
    if (lastItem.id >= id) {
      const product = await productoApi.editProduct(data, id, newProduct);
      res.status(200).json({ updatedProduct: product });
    } else {
      res.status(404).send({ error: "No se encontró el producto." });
    }
  }
});

// DELETE /api/productos/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if ((await productoApi.deleteById(id)) === false) {
    res.status(404).send({ error: "No se encontró el producto." });
  } else {
    res.status(200).send({ success: "Se eliminó el producto correctamente." });
  }
});

export default router;
