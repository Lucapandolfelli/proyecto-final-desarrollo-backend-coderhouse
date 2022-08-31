import fs from "fs";

class ContenedorArchivo {
  constructor(path) {
    this.path = path;
  }

  async getById(id) {
    try {
      const data = await this.getAll();
      const cart = data.find((obj) => obj.id == id);
      if (cart) {
        return cart; // Encontró el carrito por su 'id'
      } else {
        return null; // No lo encontró
      }
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    try {
      const data = JSON.parse(await fs.promises.readFile(this.path, "utf-8"));
      if (data.length > 0) {
        return data; // El array no está vacio
      } else {
        return false; // El array está vacio
      }
    } catch (err) {
      return err;
    }
  }
}

export default ContenedorArchivo;
