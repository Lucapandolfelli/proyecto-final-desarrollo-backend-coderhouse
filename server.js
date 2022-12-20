import app from "./src/app.js";
import cluster from "node:cluster";
import { cpus } from "node:os";
import http from "node:http";
import { Server as WebSocketServer } from "socket.io";
import process from "node:process";
import { logger } from "./src/utils/index.js";
import sockets from "./src/sockets.js";
import "./src/config/db.js";

const server = http.createServer(app);
const io = new WebSocketServer(server);

const enableExpress = () => {
  const PORT = process.env.PORT || 8080;
  server.listen(PORT, () => {
    logger.info(
      `🚀 Server ${process.pid} running on http://localhost:${PORT}...`
    );
    sockets(io);
  });
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
