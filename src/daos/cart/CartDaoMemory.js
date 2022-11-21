import MemoryDAO from "../../classes/MemoryDAO.js";

class CartDaoMemory extends MemoryDAO {
  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartDaoMemory();
    }
    return this.instance;
  }

  createProductOfACart(cart_id, product) {
    try {
      const cart = this.getCartById(cart_id);
      const carts = this.getAllCarts();

      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      carts = carts.filter((item) => item.id != cart.id);

      if (cart.products.length > 0) {
        let lastItem = cart.products[cart.products.length - 1];
        product.id = lastItem.id + 1;
      } else {
        product.id = 1;
      }

      product.timestamp = Date.now();
      cart.products.push(product);
      this.array.push(cart);
      this.array.sort((a, b) => a.id - b.id);
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  deleteProductById(cart_id, product_id) {
    try {
      const cart = this.getCartById(cart_id);
      const carts = this.getAllCarts();

      if (!cart) {
        return;
      }

      if (!carts) {
        return;
      }

      carts = carts.filter((item) => item.id != cart_id);

      if (cart.products.find((item) => item.id == product_id) === undefined) {
        return;
      } else {
        cart.products = cart.products.filter((item) => item.id != product_id);
        this.array.push(cart);
        carts.sort((a, b) => a.id - b.id);
        return;
      }
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default CartDaoMemory;
