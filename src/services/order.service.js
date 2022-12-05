import { OrderDAO, CartDAO } from "../daos/index.js";
import { generatePurchaseDate } from "../utils/index.js";

class OrderService {
  constructor() {}

  async getAllOrdersByBuyerEmail(buyer_email) {
    try {
      return await OrderDAO.getAllOrdersByBuyerEmail(buyer_email);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getOrderById(order_id) {
    try {
      return await OrderDAO.getById(order_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createOrder(state, cart_id) {
    try {
      const { email, products } = await CartDAO.getById(cart_id);
      let total = 0;
      products.forEach((product) => {
        total = total + product.price;
      });
      const order = {
        products,
        state,
        purchase_date: generatePurchaseDate(new Date(Date.now())),
        buyer_email: email,
        total,
      };
      await CartDAO.deleteCartById(cart_id);
      return await OrderDAO.create(order);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new OrderService();
