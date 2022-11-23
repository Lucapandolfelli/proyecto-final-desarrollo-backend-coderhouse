import axios from "axios";
import { logger } from "../utils/index.js";

export default class AxiosTest {
  constructor(hostname, path) {
    this.url = hostname + path;
  }

  async getAllProducts() {
    try {
      const { data } = await axios.get(this.url);
      logger.info(data);
    } catch (err) {
      logger.error(err);
    }
  }

  async getProductById(id) {
    try {
      const { data } = await axios.get(this.url + id);
      logger.info(data);
    } catch (err) {
      logger.error(err);
    }
  }
}
