import ContenedorMemoria from "../../containers/ContenedorMemoria.js";

class CarritosDaoMemoria extends ContenedorMemoria {
  getProductsByCartId(id) {
    const data = this.getAll();
    if (data === false) {
      return false; // No se encontraron carritos
    } else {
      const cart = this.getById(id);
      if (cart.productos.length > 0) {
        return cart; // Encontró productos en el carrito
      } else {
        return null; // No encontró productos en el carrito
      }
    }
  }

  createNewCart(cart) {
    const data = this.getAll();
    if (data === false) {
      // Si el array está vacio
      cart.id = 1; // Le agrega el 'id' 1
      cart.timestamp = Date.now();
      this.array.push(cart); // Carga el primer carrito
    } else {
      // Si no está vacio
      let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
      cart.id = lastItem.id + 1; // Le suma 1
      cart.timestamp = Date.now();
      this.array.push(cart); // Lo carga
    }
    return cart;
  }

  createNewProduct(id, newProduct) {
    let array = this.getAll();
    if (array === false) {
      return undefined; // No hay carritos en el array
    } else {
      const data = this.getById(id);
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
        this.array.push(data); // Cargamos ese array de productos al array de carritos
        this.array.sort((a, b) => a.id - b.id);
      }
      return newProduct;
    }
  }

  deleteProductOfCartById(cart_id, prod_id) {
    let array = this.getAll();
    if (array == false) {
      return false; // No se encontraron carritos
    } else {
      let data = this.getById(cart_id);
      if (data === null) {
        return null; // No se encontró el carrito
      } else {
        array = array.filter((item) => item.id != cart_id); // Eliminamos el carrito que coincidió
        if (data.productos.find((item) => item.id == prod_id) === undefined) {
          return undefined;
        } else {
          data.productos = data.productos.filter((item) => item.id != prod_id);
          this.array.push(data);
          array.sort((a, b) => a.id - b.id);
          return true;
        }
      }
    }
  }
}

export { CarritosDaoMemoria };
