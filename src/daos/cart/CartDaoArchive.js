import ArchiveDAO from "../../classes/ArchiveDAO.js";
import fs from "fs";

class CartDaoArchive extends ArchiveDAO {
  constructor() {
    super("../../db/carts.json");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartDaoArchive();
    }
    return this.instance;
  }

  async createProductOfACart(cart_id, product) {
    try {
      let carts = await this.getAll();
      const cart = await this.getById(cart_id);

      if (!carts) {
        return;
      }

      if (!cart) {
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
      carts.push(cart);
      cart.sort((a, b) => a.id - b.id);
      return await fs.promises.writeFile(
        this.path,
        JSON.stringify(cart, null, 2)
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteProductById(cart_id, product_id) {
    try {
      let carts = await this.getAll();
      let cart = await this.getById(cart_id);

      if (!carts) {
        return;
      }

      if (!cart) {
        return;
      }

      carts = carts.filter((item) => item.id != cart_id);

      if (cart.products.find((item) => item.id == product_id)) {
        cart.products = cart.products.filter((item) => item.id != product_id);
        carts.push(cart);
        carts.sort((a, b) => a.id - b.id);
        return await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, 2)
        );
      }
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default CartDaoArchive;
