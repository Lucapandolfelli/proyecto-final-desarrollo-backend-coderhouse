import { ProductDAO } from "../daos/index.js";

class ProductService {
  constructor() {}

  async getAllProducts() {
    try {
      return await ProductDAO.getAll();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductById(id_prod) {
    try {
      return await ProductDAO.getById(id_prod);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      return await ProductDAO.create(product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateProduct(id_prod, product) {
    try {
      return await ProductDAO.updateById(id_prod, product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(id_prod) {
    try {
      return await ProductDAO.deleteById(id_prod);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductService();
