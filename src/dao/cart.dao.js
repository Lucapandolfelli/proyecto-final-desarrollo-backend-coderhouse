import Cart from "../models/Cart.js";

class CartDAO {
  constructor() {}

  async getCartById(cart_id) {
    try {
      const cart = await Cart.findById(cart_id);
      return cart;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createCart(cart) {
    try {
      const createdCart = await new Cart(cart).save();
      return createdCart;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProductOfACart(cart_id, product) {
    try {
      return await Cart.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteCartById(cart_id) {
    try {
      return await Cart.findByIdAndDelete(cart_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(cart_id, product_id) {
    try {
      return await Cart.updateOne(
        { _id: cart_id },
        { $pull: { products: { _id: product_id } } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new CartDAO();
