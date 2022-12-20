import { CartDAO } from "../daos/index.js";

class CartService {
  constructor() {}

  async getCartById(cart_id) {
    try {
      return await CartDAO.getById(cart_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createCart(cart) {
    try {
      return await CartDAO.create(cart);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProductOfACart(cart_id, product) {
    try {
      let { products, total } = await this.getCartById(cart_id);
      const productInCart = products.find((item) =>
        item._id.equals(product._id)
      );
      total = total + product.price;
      if (!productInCart) {
        product.in_cart = 1;
        return await CartDAO.createProductOfACart(cart_id, product, total);
      }
      product.in_cart = productInCart.in_cart + 1;
      return await CartDAO.createProductOfACart(cart_id, product, total);
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

  async deleteProductByCartId(cart_id, prod_id) {
    try {
      return await CartDAO.deleteProductByCartId(cart_id, prod_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductOfAllCartsById(prod_id) {
    try {
      return await CartDAO.deleteProductOfAllCartsById(prod_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new CartService();
