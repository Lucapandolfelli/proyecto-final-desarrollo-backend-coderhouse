import { Product } from "../models/Product.js";

class ProductDAO {
  constructor() {}

  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductById(id_prod) {
    try {
      const product = await Product.findById(id_prod);
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      const createdProduct = await new Product(product).save();
      return createdProduct;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateProduct(id_prod, product) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id_prod, product);
      return updatedProduct;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(id_prod) {
    try {
      return await Product.findByIdAndDelete(id_prod);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductDAO();
