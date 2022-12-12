import MessageService from "./services/message.service.js";
import { logger } from "./utils/index.js";

export default (io) => {
  io.on("connection", async (socket) => {
    logger.info(`${socket.id} connected.`);

    io.emit("messages", await MessageService.getAllMessages());
  });
};
