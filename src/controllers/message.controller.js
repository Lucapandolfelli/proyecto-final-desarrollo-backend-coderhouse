import MessageService from "../services/message.service.js";
import { logger } from "../utils/index.js";

class MessageController {
  constructor() {}

  async getAllMessages(req, res) {
    try {
      const messages = await MessageService.getAllMessages(
        req.cookies.userIdCookie
      );
      if (!messages) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Message Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async getMessagesByUserId(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const messages = await MessageService.getMessagesByUserId(id);
      if (!messages) {
        res.status(404);
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.render("./pages/error.ejs", {
          code: 404,
          message: "Message Not Found",
        });
      }
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/mis-consultas.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async createMessage(req, res) {
    try {
      const { body } = req;
      const messages = await MessageService.createMessage(
        body,
        req.cookies.userIdCookie
      );
      res.status(200);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      });
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  async addReplyToMessageById(req, res) {
    try {
      const {
        params: { id },
      } = req;
      const { body } = req;
      const messages = await MessageService.addReplyToMessageById(
        id,
        body,
        req.cookies.userIdCookie
      );
      /* logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/chat.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
        userImage: req.user.image,
      }); */
      res.redirect("/consultas");
    } catch (err) {
      res.status(500);
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.render("./pages/error.ejs", {
        code: 500,
        message: "Internal Server Error",
      });
    }
  }

  /* async deleteMessageById(req, res) {
    try {
      const {
        params: { user_id, message_id },
      } = req;
      const messages = await this.getAllMessages();
      await MessageService.deleteMessageById(user_id, message_id);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/mis-consultas.ejs", {
        messages,
        cartId: req.cookies.cartIdCookie,
        categories: req.cookies.categoriesCookie,
        userId: req.cookies.userIdCookie,
      });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res
        .status(500)
        .render("./pages/error.ejs", {
          code: 500,
          message: "Internal Server Error",
        });
    }
  } */
}

export default new MessageController();
