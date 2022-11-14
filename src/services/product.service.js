import ProductDAO from "../dao/product.dao.js";

class ProductService {
  constructor() {}

  async getAllProducts() {
    try {
      return await ProductDAO.getAllProducts();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductById(id_prod) {
    try {
      return await ProductDAO.getProductById(id_prod);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      return await ProductDAO.createProduct(product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateProduct(id_prod, product) {
    try {
      return await ProductDAO.updateProduct(id_prod, product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(id_prod) {
    try {
      return await ProductDAO.deleteProductById(id_prod);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductService();
