// Archive DAO
import ProductDaoArchive from "./product/ProductDaoArchive.js";
import CartDaoArchive from "./cart/CartDaoArchive.js";

// Memory DAO
import ProductDaoMemory from "./product/ProductDaoMemory.js";
import CartDaoMemory from "./cart/CartDaoMemory.js";

// Firebase DAO
import ProductDaoFirebase from "./product/ProductDaoFirebase.js";
import CartDaoFirebase from "./cart/CartDaoFirebase.js";

// Mongo DAO
import ProductDaoMongo from "./product/ProductDaoMongo.js";
import CartDaoMongo from "./cart/CartDaoMongo.js";
import OrderDaoMongo from "./order/OrderDaoMongo.js";
import UserDaoMongo from "./user/UserDaoMongo.js";
import MessageDaoMongo from "./message/MessageDaoMongo.js";

let ProductDAO = null;
let CartDAO = null;
let OrderDAO = null;
let MessageDAO = null;
let UserDAO = null;

const PERS = process.env.PERS || "mongo";

switch (PERS) {
  case "archive":
    ProductDAO = ProductDaoArchive.getInstance();
    CartDAO = CartDaoArchive.getInstance();
    break;

  case "memory":
    ProductDAO = ProductDaoMemory.getInstance();
    CartDAO = CartDaoMemory.getInstance();
    break;

  case "firebase":
    ProductDAO = ProductDaoFirebase.getInstance();
    CartDAO = CartDaoFirebase.getInstance();
    break;

  case "mongo":
    ProductDAO = ProductDaoMongo.getInstance();
    CartDAO = CartDaoMongo.getInstance();
    OrderDAO = OrderDaoMongo.getInstance();
    MessageDAO = MessageDaoMongo.getInstance();
    UserDAO = UserDaoMongo.getInstance();
    break;
}

export { ProductDAO, CartDAO, UserDAO, OrderDAO, MessageDAO };
