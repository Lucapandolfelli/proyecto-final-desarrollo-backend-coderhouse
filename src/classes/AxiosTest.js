import axios from "axios";
import { logger } from "../utils/index.js";

class AxiosTest {
  constructor(hostname, path) {
    this.url = hostname + path;
    this.newProduct = {
      title: "Producto test",
      description: "Descripción del producto test",
      code: "test",
      thumbnail: "producto.jpg",
      price: 1000,
      stock: 2,
    };
  }

  async getAllProducts() {
    try {
      const { data } = await axios.get(this.url);
      logger.info(data);
    } catch (err) {
      logger.error(err?.message);
    }
  }

  async getProductById(id) {
    try {
      const { data } = await axios.get(this.url + id);
      logger.info(data);
    } catch (err) {
      logger.error(err?.message);
    }
  }

  async createProduct() {
    try {
      await axios.post(this.url, this.newProduct);
    } catch (err) {
      logger.error(err?.message);
    }
  }

  async deleteProductById(id) {
    try {
      const { data } = await axios.delete(this.url + id);
      logger.info(data);
    } catch (err) {
      logger.error(err?.message);
    }
  }
}

export default AxiosTest;
