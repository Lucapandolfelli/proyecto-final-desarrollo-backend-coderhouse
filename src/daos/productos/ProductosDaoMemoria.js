import ContenedorMemoria from "../../containers/ContenedorMemoria.js";

class ProductosDaoMemoria extends ContenedorMemoria {
  createNewProduct(newProduct) {
    const data = this.getAll();
    if (data === false) {
      // Si el array está vacio
      newProduct.id = 1; // Le agrega el 'id' 1
      newProduct.timestamp = Date.now(); // Le agrega el timestamp
      this.array.push(newProduct); // Carga el primer carrito
    } else {
      // Si no está vacio
      let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
      newProduct.id = lastItem.id + 1; // Le suma 1
      newProduct.timestamp = Date.now(); // Le agrega el 'timestamp'
      this.array.push(newProduct); // Lo carga
    }
    return newProduct;
  }

  editProduct(array, id, product) {
    const index = array.findIndex((item) => item.id == id); // Busca el índice en el array de un producto según su 'id'
    array = array.filter((item) => item.id != id); // Elimina el producto que se quiere editar
    product.id = parseInt(id); // Le agrega el 'id'
    product.timestamp = Date.now(); // Le agrega el 'timestamp'
    array.splice(index, 0, product); // Añader el producto edita en el array
    return product;
  }
}

export { ProductosDaoMemoria };
