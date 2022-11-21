import MongoClient from "../config/MongoClient.js";

class MongoDAO {
  constructor(model) {
    this.model = model;
    /* this.connection = new MongoClient(); */
  }

  async getById(id) {
    try {
      return await this.model.findById(id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      return await this.model.find();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async create(item) {
    try {
      return await new this.model(item).save();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(id, item) {
    try {
      return await this.model.findByIdAndUpdate(id, item);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      return await this.model.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default MongoDAO;
