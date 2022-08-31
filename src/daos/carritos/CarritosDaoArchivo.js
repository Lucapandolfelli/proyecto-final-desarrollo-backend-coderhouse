import ContenedorArchivo from "../../containers/ContenedorArchivo.js";
import fs from "fs";

let id = 1;
let arrayObj = [];

class CarritosDaoArchivo extends ContenedorArchivo {
  constructor() {
    super("db/carritos.json");
  }

  async createNewCart(cart) {
    try {
      const data = await this.getAll();
      if (data === false) {
        // Si el array está vacio
        cart.id = id; // Le agrega el 'id' 1
        cart.timestamp = Date.now();
        arrayObj.push(cart); // Carga el primer carrito
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(arrayObj, null, 2)
        );
      } else {
        // Si no está vacio
        let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
        cart.id = lastItem.id + 1; // Le suma 1
        cart.timestamp = Date.now();
        data.push(cart); // Lo carga
        await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
      }
      return cart;
    } catch (err) {
      return err;
    }
  }

  async createNewProduct(id, newProduct) {
    try {
      let array = await this.getAll();
      if (array === false) {
        return undefined; // No hay carritos en el array
      } else {
        const data = await this.getById(id);
        if (data === null) {
          return false; // No encontró el carrito
        } else {
          array = array.filter((item) => item.id != data.id); // Borramos el carrito que matcheó
          if (data.productos.length > 0) {
            let lastItem = data.productos[data.productos.length - 1]; // Encuentra el 'id' del último elemento del array
            newProduct.id = lastItem.id + 1; // Le suma 1
          } else {
            newProduct.id = 1;
          }
          newProduct.timestamp = Date.now(); // Le agregamos el 'timestamp'
          data.productos.push(newProduct); // Lo carga al array de productos del carrito
          array.push(data); // Cargamos ese array de productos al array de carritos
          array.sort((a, b) => a.id - b.id);
          await fs.promises.writeFile(
            this.path,
            JSON.stringify(array, null, 2)
          );
        }
        return newProduct;
      }
    } catch (err) {
      return err;
    }
  }

  async getProductsByCartId(id) {
    try {
      const data = await this.getAll();
      if (data === false) {
        return false; // No hay carritos
      } else {
        // Hay carritos
        const cart = data.find((obj) => obj.id == id);
        if (cart.productos.length > 0) {
          return cart; // Encontró productos en el carrito
        } else {
          return null; // No encontró productos en el carrito
        }
      }
    } catch (err) {
      return err;
    }
  }

  async deleteProductOfCartById(cart_id, prod_id) {
    try {
      let array = await this.getAll();
      if (array == false) {
        return false; // No se encontraron carritos
      } else {
        let data = await this.getById(cart_id);
        if (data === null) {
          return null; // No se encontró el carrito
        } else {
          array = array.filter((item) => item.id != cart_id); // Eliminamos el carrito que coincidió
          if (data.productos.find((item) => item.id == prod_id) === undefined) {
            return undefined;
          } else {
            data.productos = data.productos.filter(
              (item) => item.id != prod_id
            );
            array.push(data);
            array.sort((a, b) => a.id - b.id);
            await fs.promises.writeFile(
              this.path,
              JSON.stringify(array, null, 2)
            );
            return true;
          }
        }
      }
    } catch (err) {
      return err;
    }
  }

  async deleteById(id) {
    try {
      const cart = await this.getById(id);
      if (cart === null) {
        return false; // No encontró el carrito
      } else {
        // Encontró el carrito
        let data = await this.getAll();
        if (data === false) {
          return null; // No encontró carritos en el array
        } else {
          data = data.filter((item) => item.id != cart.id);
          await fs.promises.writeFile(this.path, JSON.stringify(data, null, 2));
          return true;
        }
      }
    } catch (err) {
      return err;
    }
  }
}

export { CarritosDaoArchivo };
