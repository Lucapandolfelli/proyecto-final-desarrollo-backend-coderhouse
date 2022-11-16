import User from "../models/User.js";

class UserDAO {
  constructor() {}

  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username });
      return user;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getUserById(user_id) {
    try {
      const user = await User.findById(user_id);
      return user;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createUser(user) {
    try {
      const createdUser = await new User(user).save();
      return createdUser;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new UserDAO();
