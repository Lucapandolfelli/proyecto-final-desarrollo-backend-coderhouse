import ArchiveDAO from "../../classes/ArchiveDAO.js";
import fs from "fs";

let id = 1;
let arrayObj = [];

class ProductDaoArchive extends ArchiveDAO {
  constructor() {
    super("../../db/products.json");
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new ProductDaoArchive();
    }
    return this.instance;
  }
}

export default ProductDaoArchive;
