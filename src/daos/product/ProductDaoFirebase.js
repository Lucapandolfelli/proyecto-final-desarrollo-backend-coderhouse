import FirebaseDAO from "../../classes/FirebaseDAO.js";

class ProductDaoFirebase extends FirebaseDAO {
  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductDaoFirebase();
    }
    return this.instance;
  }

  async createNewProduct(newProduct) {
    try {
      const data = await this.getAll();
      if (data === false) {
        newProduct.id = 1;
      } else {
        let lastItem = data[data.length - 1];
        newProduct.id = lastItem.id + 1;
      }
      newProduct.timestamp = Date.now();
      const doc = this.collection.add(newProduct);
      if (doc.empty) {
        return false;
      } else {
        return newProduct;
      }
    } catch (err) {
      return err;
    }
  }
}

export default ProductDaoFirebase;
