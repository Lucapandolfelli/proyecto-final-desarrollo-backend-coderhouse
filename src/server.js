import express from "express";
import router from "./routes/index.routes.js";
import session from "express-session";
import mongoose from "mongoose";
import passport from "passport";
import cors from "cors";
import "./middleware/passport.js";
import compression from "compression";
import cookieParser from "cookie-parser";
import cluster from "node:cluster";
import { cpus } from "node:os";
import process from "node:process";
import { logger } from "./utils/index.js";

const enableExpress = () => {
  // Express
  const app = express();
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(express.static("public"));
  app.use(compression());
  app.use(cookieParser("coderhouse"));
  app.use(
    session({
      secret: "coderhouse",
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(router);

  // View Engine
  app.set("view engine", "ejs");
  app.set("views", "./public/views");

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
