import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";

class ProductosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("productos", {
      nombre: { type: String, require: true },
      descripcion: { type: String, require: true },
      codigo: { type: String, require: true },
      foto: { type: String, require: true },
      precio: { type: Number, require: true },
      stock: { type: Number, require: true },
    });
  }

  async createNewProduct(newProduct) {
    try {
      const data = await this.getAll();
      if (data === false) {
        newProduct.id = 1;
        newProduct.timestamp = Date.now();
        return this.createElement(newProduct);
      } else {
        let lastItem = data[data.length - 1];
        newProduct.id = lastItem + 1;
        newProduct.timestamp = Date.now();
        return this.createElement(newProduct);
      }
    } catch (err) {
      return err;
    }
  }

  async editProduct(id, newProduct) {
    try {
      const doc = await this.collection.findByIdAndUpdate(id, newProduct);
      return doc;
    } catch (err) {
      return err;
    }
  }
}

export { ProductosDaoMongoDb };
