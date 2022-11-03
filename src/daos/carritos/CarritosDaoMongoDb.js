import ContenedorMongoDb from "../../containers/ContenedorMongoDb.js";

class CarritosDaoMongoDb extends ContenedorMongoDb {
  constructor() {
    super("cart", {
      productos: { type: [], require: true },
    });
  }

  async createNewCart(cart) {
    try {
      const data = await this.getAll();
      if (data === false) {
        cart.cartId = 1;
        cart.timestamp = Date.now();
        return this.createElement(cart);
      } else {
        let lastItem = data[data.length - 1]; // Encuentra el 'id' del último elemento del array
        cart.cartId = lastItem.id + 1;
        cart.timestamp = Date.now();
        return this.createElement(cart);
      }
    } catch (err) {
      return err;
    }
  }

  async createNewProduct(id, newProduct) {
    try {
      const data = await this.getAll();
      if (data === false) {
        return undefined; // No se encontraron carritos
      } else {
        const cart = this.getById(id);
        if (cart === null) {
          return false; // No se encontró el carrito
        } else {
          const cartProducts = await this.getProductsByCartId(id);
          if (cartProducts === null) {
            newProduct.id = 1;
            newProduct.timestamp = Date.now();
            await this.collection.findByIdAndUpdate(id, {
              $push: { productos: newProduct },
            });
          } else {
            let lastItem = cartProducts[cartProducts.length - 1];
            newProduct.id = lastItem.id + 1;
            newProduct.timestamp = Date.now();
            await this.collection.findByIdAndUpdate(id, {
              $push: { productos: newProduct },
            });
          }
          return doc;
        }
      }
    } catch (err) {
      return err;
    }
  }

  async getProductsByCartId(id) {
    try {
      const cart = await this.collection.findOne({ _id: id }, { productos: 1 });
      if (cart.productos.length > 0) {
        return cart.productos;
      } else {
        return null; // No se encontraron productos en el carrito
      }
    } catch (err) {
      return err;
    }
  }

  async deleteProductOfCartById(cart_id, prod_id) {
    try {
      const data = await this.getAll();
      if (data === false) {
        return undefined; // No se encontraron carritos
      } else {
        const cart = await this.getById(cart_id);
        if (cart === null) {
          return false; // No se encontró el carrito
        } else {
          await this.collection.findOneAndUpdate(
            { _id: cart_id },
            { $pull: { productos: { id: prod_id } } }
          ); // NO ESTARIA FUNCIONANDO
          return true;
        }
      }
    } catch (err) {
      return err;
    }
  }
}

export { CarritosDaoMongoDb };
