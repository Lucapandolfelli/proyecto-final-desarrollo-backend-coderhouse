import { Product } from "../../models/Product.js";
import MongoDAO from "../../classes/MongoDAO.js";

class ProductDaoMongo extends MongoDAO {
  constructor() {
    super(Product);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductDaoMongo();
    }
    return this.instance;
  }

  /* async getAllProducts() {
    try {
      const products = await this.collection.find();
      return products;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getProductById(id_prod) {
    try {
      const product = await this.collection.findById(id_prod);
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      const createdProduct = await new this.collection(product).save();
      return createdProduct;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateProduct(id_prod, product) {
    try {
      const updatedProduct = await this.collection.findByIdAndUpdate(
        id_prod,
        product
      );
      return updatedProduct;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(id_prod) {
    try {
      return await this.collection.findByIdAndDelete(id_prod);
    } catch (err) {
      throw new Error(err?.message);
    }
  } */
}

export default ProductDaoMongo;
