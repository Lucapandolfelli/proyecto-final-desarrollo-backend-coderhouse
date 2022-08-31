import mongoose from "mongoose";
import config from "../config.js";

// Conexión a MongoDB
await mongoose.connect(config.mongoDb.connectionString);

class ContenedorMongoDb {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  async getById(id) {
    try {
      const doc = await this.collection.findOne({ _id: id });
      if (!doc) {
        return false; // No se encontró
      } else {
        return doc;
      }
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      const docs = await this.collection.find();
      if (docs.length > 0) {
        return docs;
      } else {
        return false; // No se encontraron
      }
    } catch (err) {
      return err;
    }
  }

  async createElement(newElement) {
    try {
      const doc = await this.collection.create(newElement);
      return doc;
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      const element = await this.getById(id);
      if (element === null) {
        return false; // No se encontró el elemento
      } else {
        let array = await this.getAll();
        if (array === false) {
          return null; // No se encontraron elementos en el array
        } else {
          await this.collection.findByIdAndDelete(id);
          return true; // Eliminado correctamente
        }
      }
    } catch (err) {
      return err;
    }
  }
}

export default ContenedorMongoDb;
