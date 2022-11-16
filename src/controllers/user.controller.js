import UserService from "../services/user.service.js";
import { logger } from "../utils/index.js";
import { sendMailTo } from "../utils/index.js";

class UserController {
  constructor() {}

  async renderLoginView(req, res) {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/login.ejs");
    } catch (err) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async renderRegisterView(req, res) {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/register.ejs");
    } catch (err) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async getUserById(req, res) {
    try {
      const {
        user: { _id },
      } = req;

      const user = await UserService.getUserById(_id);

      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res
        .status(200)
        .render("./pages/user.ejs", { user: user, cartId: user.cart_id });
    } catch (err) {
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async createUser(req, res) {
    try {
      const { body } = req;
      const { file } = req;

      if (!file) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(400).json({ error: "Please upload a file." });
      }
      const { user, createdUser } = await UserService.createUser(body, file);

      if (user) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(409).json({ error: "User already exists." });
      }

      if (!user) {
        const info = await sendMailTo(
          "laury.walter@ethereal.email",
          "Nuevo registro.",
          "Nuevo usuario registrado."
        );

        logger.info(`Message id: ${info.messageId}`);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(302).redirect("/login");
      }
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }
}

export default new UserController();
