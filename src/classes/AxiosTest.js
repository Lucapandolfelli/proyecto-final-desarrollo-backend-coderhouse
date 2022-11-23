import axios from "axios";
import { logger } from "../utils/index.js";

export default class AxiosTest {
  constructor() {}

  async getAllProducts() {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products");
      logger.info(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async getProductById(id) {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
      logger.info(data);
    } catch (err) {
      logger.error(err);
    }
  }
}
