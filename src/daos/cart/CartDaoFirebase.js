import FirebaseDAO from "../../classes/FirebaseDAO.js";

class CartDaoFirebase extends FirebaseDAO {
  constructor() {
    super();
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CartDaoFirebase();
    }
    return this.instance;
  }
}

export default CartDaoFirebase;
