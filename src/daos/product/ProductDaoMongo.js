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

  async getProductsByCategoryName(category_name) {
    try {
      const products = await this.model.find({ category: category_name });
      return products;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default ProductDaoMongo;
