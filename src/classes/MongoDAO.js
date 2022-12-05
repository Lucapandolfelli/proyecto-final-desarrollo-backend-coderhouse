class MongoDAO {
  constructor(model) {
    this.model = model;
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
      return await this.model.find({});
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async create(item) {
    try {
      const newItem = new this.model(item);
      await newItem.save();
      return newItem;
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
      const item = await this.getById(id);
      await this.model.deleteOne({ _id: id });
      return item;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default MongoDAO;
