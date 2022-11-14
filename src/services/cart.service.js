import CartDAO from "../dao/cart.dao.js";

class CartService {
  constructor() {}

  async getCartById(cart_id) {
    try {
      return await CartDAO.getCartById(cart_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createCart(cart) {
    try {
      return await CartDAO.createCart(cart);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProductOfACart(cart_id, product) {
    try {
      return await CartDAO.createProductOfACart(cart_id, product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteCartById(cart_id) {
    try {
      return await CartDAO.deleteCartById(cart_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(cart_id, prod_id) {
    try {
      return await CartDAO.deleteProductById(cart_id, prod_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new CartService();
