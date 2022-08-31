import ContenedorArchivo from "../../containers/ContenedorArchivo.js";
import fs from "fs";

let id = 1;
let arrayObj = [];

class ProductosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("db/productos.json");
  }

  async createNewProduct(newProduct) {
    try {
      const data = await this.getAll();
      if (data === false) {
        // Si el array está vacio
        newProduct.id = id; // Le agrega el 'id' 1
        newProduct.timestamp = Date.now(); // Le agrega el timestamp
        arrayObj.push(newProduct); // Carga el primer carrito
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(arrayObj, null, 2)
        );
      } else {
        // Si no está vacio
        let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
        newProduct.id = lastItem.id + 1; // Le suma 1
        newProduct.timestamp = Date.now(); // Le agrega el 'timestamp'
        data.push(newProduct); // Lo carga
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
      }
      return newProduct;
    } catch (err) {
      return err;
    }
  }

  async editProduct(array, id, product) {
    try {
      const index = array.findIndex((item) => item.id == id); // Busca el índice en el array de un producto según su 'id'
      array = array.filter((item) => item.id != id); // Elimina el producto que se quiere editar
      product.id = parseInt(id); // Le agrega el 'id'
      product.timestamp = Date.now(); // Le agrega el 'timestamp'
      array.splice(index, 0, product); // Añader el producto edita en el array
      await fs.promises.writeFile(this.path, JSON.stringify(array, null, 2));
      return product;
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      const obj = await this.getById(id); // Trae un producto según su 'id'
      if (obj === null) {
        return false;
      } else {
        // Si lo encontró
        const data = await this.getAll(); // Trae el array de productos
        if (data) {
          const newArray = data.filter((item) => item.id != obj.id); // Elimina el producto que se encontró por su 'id' y actualiza el array
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(newArray, null, 2)
          );
          return true;
        }
      }
    } catch (err) {
      return err;
    }
  }
}

export { ProductosDaoArchivo };
