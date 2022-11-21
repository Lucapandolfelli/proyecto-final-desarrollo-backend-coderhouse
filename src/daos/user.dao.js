import User from "../models/User.js";

class UserDAO {
  constructor() {
    this.collection = User;
  }

  async getUserByUsername(username) {
    try {
      return await this.collection.findOne({ username });
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getUserById(user_id) {
    try {
      return await this.collection.findById(user_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createUser(user) {
    try {
      return await new this.collection(user).save();
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new UserDAO();
