import { UserDAO } from "../daos/index.js";
import CartService from "../services/cart.service.js";
import bcrypt from "bcrypt";

class UserService {
  constructor() {}

  async getUserByUsername(username) {
    try {
      return await UserDAO.getUserByUsername(username);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getUserById(user_id) {
    try {
      return await UserDAO.getUserById(user_id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createUser(body, file) {
    try {
      const { username, email, age, address, phone, password } = body;
      const user = await this.getUserByUsername(username);

      if (user) {
        return user; // Already exist a user with that username
      }

      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 8); // Encrypting the password
        const userCart = await CartService.createCart([]); // Create a cart for this user
        const newUser = {
          username,
          email,
          age,
          address,
          image: file.filename,
          phone,
          password: hashedPassword,
          cart_id: userCart._id,
        };
        return await UserDAO.create(newUser);
      }
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new UserService();
