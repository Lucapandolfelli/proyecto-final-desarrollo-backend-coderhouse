import app from "./src/app.js";
import cluster from "node:cluster";
import { cpus } from "node:os";
import http from "node:http";
import { Server as WebSocketServer } from "socket.io";
import process from "node:process";
import mongoose from "mongoose";
import { logger } from "./src/utils/index.js";
import sockets from "./src/sockets.js";

const server = http.createServer(app);
const io = new WebSocketServer(server);

const enableExpress = () => {
  const PORT = process.env.PORT || 8080;
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      logger.info(`MongoDB is connected.`);
      server.listen(PORT, () => {
        logger.info(
          `🚀 Server ${process.pid} running on http://localhost:${PORT}...`
        );
      });
    })
    .then(() => sockets(io))
    .catch((err) => logger.error(err?.message));
};

const enableCluster = () => {
  const numCPUs = cpus().length;

  if (cluster.isPrimary) {
    logger.info(`Master ${process.pid} is running.`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      logger.info(`${worker.process.pid} is finished.`);
      cluster.fork();
    });
  } else {
    enableExpress();
  }
};

const CLUSTER = false;

if (CLUSTER) {
  enableCluster();
} else {
  enableExpress();
}
