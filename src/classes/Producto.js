const fs = require("fs");
const source = "./src/data/producto.txt";

let id = 1;
let arrayObj = [];

class Producto {
  async createNewProduct(newProduct) {
    try {
      const data = await this.getAllProducts();
      if (data === false) {
        // Si el array está vacio
        newProduct.id = id; // Le agrega el 'id' 1
        newProduct.timestamp = Date.now(); // Le agrega el timestamp
        arrayObj.push(newProduct); // Carga el primer carrito
        await fs.promises.writeFile(source, JSON.stringify(arrayObj, null, 2));
      } else {
        // Si no está vacio
        let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
        newProduct.id = lastItem.id + 1; // Le suma 1
        newProduct.timestamp = Date.now(); // Le agrega el 'timestamp'
        data.push(newProduct); // Lo carga
        await fs.promises.writeFile(source, JSON.stringify(data, null, 2));
      }
      return newProduct;
    } catch (err) {
      return err;
    }
  }

  async getAllProducts() {
    try {
      const data = JSON.parse(await fs.promises.readFile(source, "utf-8")); // Lee el archivo de persistencia de datos
      if (data.length > 0) {
        return data; // El array no está vacio
      } else {
        return false; // El array está vacio
      }
    } catch (err) {
      return err;
    }
  }

  async getProductById(id) {
    try {
      const data = await this.getAllProducts(); // Trae todos los productos
      const product = data.find((obj) => obj.id == id); // Busca un producto por su 'id'
      if (product) {
        return product; // Encontró el carrito por su 'id'
      } else {
        return null; // No lo encontró
      }
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
      await fs.promises.writeFile(source, JSON.stringify(array, null, 2));
      return product;
    } catch (err) {
      return err;
    }
  }

  async deleteProductById(id) {
    try {
      const obj = await this.getProductById(id); // Trae un producto según su 'id'
      if (obj === null) {
        return false;
      } else {
        // Si lo encontró
        const data = await this.getAllProducts(); // Trae el array de productos
        if (data) {
          const newArray = data.filter((item) => item.id != obj.id); // Elimina el producto que se encontró por su 'id' y actualiza el array
          await fs.promises.writeFile(
            source,
            JSON.stringify(newArray, null, 2)
          );
          return true;
        }
      }
    } catch (err) {
      return err;
    }
  }

  /* async deleteAllProducts() {
    try {
      const data = await this.getAll();
      if (data === false) {
        return false;
      } else {
        data.splice(0, data.length);
        await fs.promises.writeFile(source, JSON.stringify(data, null, 2));
        return true;
      }
    } catch (err) {
      return err;
    }
  } */
}

module.exports = new Producto();
