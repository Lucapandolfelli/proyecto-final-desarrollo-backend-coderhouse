import mongoose from "mongoose";
import { logger } from "../utils/index.js";

if (process.env.NODE_ENV === "development") {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Mongo connected in development mode.`))
    .catch((err) => logger.error(err?.message));
} else {
  mongoose
    .connect(process.env.MONGODB_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info(`Mongo Atlas connected in production mode.`))
    .catch((err) => logger.error(err?.message));
}
