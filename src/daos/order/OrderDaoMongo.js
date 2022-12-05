import { Order } from "../../models/Order.js";
import MongoDAO from "../../classes/MongoDAO.js";

class OrderDaoMongo extends MongoDAO {
  constructor() {
    super(Order);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new OrderDaoMongo();
    }
    return this.instance;
  }

  async getAllOrdersByBuyerEmail(buyer_email) {
    try {
      return await this.model.find({ buyer_email: buyer_email });
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default OrderDaoMongo;
