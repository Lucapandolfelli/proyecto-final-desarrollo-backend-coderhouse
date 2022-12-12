import { Message } from "../../models/Message.js";
import MongoDAO from "../../classes/MongoDAO.js";

class MessageDaoMongo extends MongoDAO {
  constructor() {
    super(Message);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new MessageDaoMongo();
    }
    return this.instance;
  }

  async addReplyToMessageById(message_id, reply) {
    try {
      await this.model.updateOne(
        { _id: message_id },
        { $push: { replies: reply } }
      );
      return this.getById(message_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default MessageDaoMongo;
