import axios from "axios";
import { logger } from "../utils/index.js";

const url = `http://localhost:3000/api/products/`;
const newProduct = {
  title: "Producto test",
  description: "Descripción del producto test",
  code: "test",
  thumbnail: "producto.jpg",
  price: 1000,
  stock: 2,
};
const id = "637d93b131af9d7b7c45f469";

// [GET] /api/products
axios
  .get(url)
  .then((res) => {
    logger.info(res.data);
  })
  .catch((err) => {
    logger.error(err?.message);
  });

// [GET] /api/products/:id
axios
  .get(url + id)
  .then((res) => {
    logger.info(res.data);
  })
  .catch((err) => {
    logger.error(err?.message);
  });

// [POST] /api/products
axios
  .post(url, newProduct)
  .then((res) => {
    logger.info(res.statusText);
  })
  .catch((err) => {
    logger.error(err?.message);
  });

// [PUT] /api/products/:id
axios
  .put(url + id, newProduct)
  .then((res) => {
    logger.info(res.statusText);
  })
  .catch((err) => {
    logger.error(err?.message);
  });

// [DELETE] /api/products/:id
axios
  .delete(url + id)
  .then((res) => {
    logger.info(res.statusText);
  })
  .catch((err) => {
    logger.error(err?.message);
  });
