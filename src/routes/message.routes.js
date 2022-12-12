import { Router } from "express";
import MessageController from "../controllers/message.controller.js";

const messageRouter = Router();

// [GET] 🌐/consultas
messageRouter.get("/", MessageController.getAllMessages);

// [GET] 🌐/consultas/:id
messageRouter.get("/user/:id", MessageController.getMessagesByUserId);

// [POST] 🌐/consultas
messageRouter.post("/", MessageController.createMessage);

// [POST] 🌐/consultas/:id/reply
messageRouter.post("/:id/reply", MessageController.addReplyToMessageById);

// [POST] 🌐/consultas/:id/delete
/* messageRouter.post(
  "/user/:user_id/consulta/:message_id/delete",
  MessageController.deleteMessageById
); */

export default messageRouter;
