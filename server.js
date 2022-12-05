import app from "./src/app.js";
import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";
import mongoose from "mongoose";
import { logger } from "./src/utils/index.js";

const enableExpress = () => {
  // Server
  const PORT = process.env.PORT || 8080;
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      logger.info(`MongoDB is connected.`);
      app.listen(PORT, () => {
        logger.info(
          `🚀 Server ${process.pid} running on http://localhost:${PORT}...`
        );
      });
    })
    .catch((error) => logger.error(error.message));
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
