import { ProductDAO } from "../daos/index.js";
import { Category } from "../models/Category.js";
import CartService from "./cart.service.js";

class ProductService {
  constructor() {}

  async getAllProducts() {
    try {
      return await ProductDAO.getAll();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductById(product_id) {
    try {
      return await ProductDAO.getById(product_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductsByCategoryName(category_name) {
    try {
      return await ProductDAO.getProductsByCategoryName(category_name);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      const category = await Category.findOne({ name: product.category });
      if (!category) {
        await new Category({ name: product.category }).save();
      }
      return await ProductDAO.create(product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateProduct(product_id, product) {
    try {
      return await ProductDAO.updateById(product_id, product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(product_id) {
    try {
      await CartService.deleteProductOfAllCartsById(product_id);
      return await ProductDAO.deleteById(product_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductService();
