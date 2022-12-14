import UserService from "../services/user.service.js";
import { logger } from "../utils/index.js";
import { sendMailTo } from "../utils/index.js";

class UserController {
  constructor() {}

  async renderLoginView(req, res) {
    try {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/login.ejs");
    } catch (err) {
      res.status(500);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async renderRegisterView(req, res) {
    try {
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/register.ejs");
    } catch (err) {
      res.status(500);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async getUserById(req, res) {
    try {
      const {
        user: { _id },
      } = req;
      const user = await UserService.getUserById(_id);
      if (!user) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "User Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/user.ejs", {
        user: user,
        cartId: user.cart_id,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      res.status(500);
      logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async createUser(req, res) {
    try {
      const { body } = req;
      const { file } = req;

      if (!file) {
        res.status(400);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 400,
          message: "Please upload a file",
        });
      }
      const { user, createdUser } = await UserService.createUser(body, file);

      if (user) {
        res.status(409);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 409,
          message: "User already exists",
        });
      }

      if (!user) {
        const info = await sendMailTo(
          "laury.walter@ethereal.email",
          "Nuevo registro.",
          "Nuevo usuario registrado."
        );
        res.status(302);
        logger.info(`Message id: ${info.messageId}`);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.redirect("/login");
      }
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }
}

export default new UserController();
