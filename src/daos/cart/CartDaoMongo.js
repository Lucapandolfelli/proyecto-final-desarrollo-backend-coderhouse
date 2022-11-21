import Cart from "../../models/Cart.js";
import MongoDAO from "../../classes/MongoDAO.js";

class CartDaoMongo extends MongoDAO {
  constructor() {
    super(Cart);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartDaoMongo();
    }
    return this.instance;
  }

  async createProductOfACart(cart_id, product) {
    try {
      return await this.model.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(cart_id, product_id) {
    try {
      return await this.model.updateOne(
        { _id: cart_id },
        { $pull: { products: { _id: product_id } } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default CartDaoMongo;
