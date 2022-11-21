class MemoryDAO {
  constructor() {
    this.memory = [];
  }

  getById(id) {
    try {
      return this.memory.find((item) => item._id == id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  getAll() {
    try {
      return this.memory;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  create(item) {
    try {
      const items = this.getAll();
      if (items.length === 0) {
        item.id = 1;
        item.timestamp = Date.now();
        this.memory.push(item);
      } else {
        let lastItem = data[data.length - 1];
        item.id = lastItem.id + 1;
        item.timestamp = Date.now();
        this.memory.push(item);
      }
      return item;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  updateById(id, item) {
    try {
      const index = this.memory.findIndex((item) => item.id == id);
      this.memory = this.memory.filter((item) => item.id != id);
      item.id = parseInt(id);
      item.timestamp = Date.now();
      this.memory.splice(index, 0, item);
      return item;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  deleteById(id) {
    try {
      const item = this.getById(id);
      const items = this.getAll();

      if (!item) {
        return;
      }

      if (!items) {
        return;
      }

      this.memory = items.filter((obj) => obj.id !== item.id);
      return;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default MemoryDAO;
