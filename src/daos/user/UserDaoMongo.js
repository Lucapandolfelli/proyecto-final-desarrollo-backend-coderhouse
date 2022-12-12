import MongoDAO from "../../classes/MongoDAO.js";
import User from "../../models/User.js";

class UserDaoMongo extends MongoDAO {
  constructor() {
    super(User);
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new UserDaoMongo();
    }
    return this.instance;
  }

  async getUserByUsername(username) {
    try {
      return await this.model.findOne({ username });
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async addMessageToUserById(user_id, message) {
    try {
      return await this.model.updateOne(
        { _id: user_id },
        { $push: { messages: message } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateUserMessagesById(user_id, messages) {
    try {
      await this.model.updateOne({ _id: user_id }, { $set: { messages: [] } });
      return await this.model.updateOne(
        { _id: user_id },
        { $push: { messages: messages } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  /* async deleteMessageFromUserById(message_id, user_id) {
    try {
      return await this.model.updateOne(
        { _id: user_id },
        { $pull: { messages: { _id: message_id } } }
      );
    } catch (err) {
      throw new Error(err?.message);
    }
  } */
}

export default UserDaoMongo;
