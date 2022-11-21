import MemoryDAO from "../../classes/MemoryDAO.js";

class ProductDaoMemory extends MemoryDAO {
  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductDaoMemory();
    }
    return this.instance;
  }
}

export default ProductDaoMemory;
