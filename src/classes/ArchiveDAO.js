import fs from "fs";

let id = 1;
let arrayObj = [];

class ArchiveDAO {
  constructor(path) {
    this.path = path;
  }

  async getById(id) {
    try {
      const items = await this.getAll();
      return items.find((obj) => obj.id == id);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async getAll() {
    try {
      return JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async create(item) {
    try {
      const items = await this.getAll();
      if (items.length === 0) {
        item.id = id;
        item.timestamp = Date.now();
        arrayObj.push(item);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(arrayObj, null, 2)
        );
      } else {
        let lastItem = items[items.length - 1];
        item.id = lastItem.id + 1;
        item.timestamp = Date.now();
        items.push(item);
        await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2));
      }
      return item;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async updateById(array, id, product) {
    try {
      const index = array.findIndex((item) => item.id == id); // Busca el índice en el array de un producto según su 'id'
      array = array.filter((item) => item.id != id); // Elimina el producto que se quiere editar
      product.id = parseInt(id); // Le agrega el 'id'
      product.timestamp = Date.now(); // Le agrega el 'timestamp'
      array.splice(index, 0, product); // Añader el producto edita en el array
      await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
      return product;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async deleteById(id) {
    try {
      const item = await this.getById(id);
      let items = await this.getAll();

      if (!item) {
        return;
      }

      if (!items) {
        return;
      }

      items = items.filter((obj) => obj.id != item.id);
      await fs.promises.writeFile(this.path, JSON.stringify(items, null, 2));
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default ArchiveDAO;
