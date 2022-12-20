import Cart from "../../models/Cart.js";
import MongoDAO from "../../classes/MongoDAO.js";
import { Product } from "../../models/Product.js";

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

  async createProductOfACart(cart_id, product, total) {
    try {
      const { products } = await this.model.findOne(
        { _id: cart_id },
        {
          products: { $elemMatch: { _id: product._id } },
        }
      );
      if (products.length > 0) {
        await this.deleteProductByCartId(cart_id, product._id);
      }
      return await this.model.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product }, total }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteCartById(cart_id) {
    try {
      const cart = await this.getById(cart_id);
      await this.model.updateOne(
        { _id: cart_id },
        { $set: { products: [], total: 0 } }
      );
      return cart;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  //TODO: set 'in_cart' property -1 on delete
  async deleteProductByCartId(cart_id, product_id) {
    try {
      const { products } = await this.model.findOne(
        { _id: cart_id },
        {
          products: { $elemMatch: { _id: product_id } },
        }
      );
      let { total } = await this.getById(cart_id);
      const newTotal = total - products[0].price * products[0].in_cart;
      await this.model.updateOne(
        { _id: cart_id },
        {
          $pull: { products: { _id: product_id } },
          $set: { total: newTotal },
        }
      );
      return products[0];
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductOfAllCartsById(product_id) {
    try {
      const product = await Product.findById(product_id);
      await this.model.updateMany({ $pull: { products: { _id: product_id } } });
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default CartDaoMongo;
