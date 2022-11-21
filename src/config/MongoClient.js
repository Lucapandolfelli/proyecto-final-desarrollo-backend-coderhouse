import mongoose from "mongoose";
import { logger } from "../utils/index.js";

class MongoClient {
  constructor() {
    this.connected = false;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.connected = true;
      logger.info("MongoDB connected.");
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async disconnect() {
    try {
      await mongoose.connection.close();
      this.connected = false;
      logger.info("MongoDB disconnected.");
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default MongoClient;
