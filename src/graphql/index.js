import { buildSchema } from "graphql";
import ProductService from "../services/product.service.js";
import CartService from "../services/cart.service.js";

const schema = buildSchema(`
  input InputProduct {
    title: String!,
    description: String!,
    category: String!,
    thumbnail: String!,
    price: Int!,
    stock: Int!
  }

  type Product {
    _id: String!,
    title: String!,
    description: String!,
    category: String!,
    thumbnail: String!,
    price: Int!,
    stock: Int!,
    in_cart: Int
  }

  type Cart {
    _id: String!,
    email: String!,
    products: [Product]!,
    delivery_address: String!
  }

  type Query {
    getAllProducts: [Product],
    getProductById(_id: String!): Product,
    getCartById(_id: String!): Cart
  }

  type Mutation {
    createProduct(title: String!, description: String!, category: String!, thumbnail: String!, price: Int!, stock: Int!): Product,
    createCart(email: String!, products: [InputProduct]!, delivery_address: String!): Cart,
    createProductOfACart(_id: String!, product: InputProduct): Cart,
    updateProduct(_id: String!, product: InputProduct): Product
    deleteProductById(_id: String!): Product,
    deleteCartById(_id: String!): Cart,
    deleteProductByCartId(cart_id: String!, prod_id: String!): Product
  }
`);

const root = {
  getAllProducts: ProductService.getAllProducts,
  getProductById: ProductService.getProductById,
  getCartById: CartService.getCartById,
  createProduct: ProductService.createProduct,
  createCart: CartService.createCart,
  updateProduct: ProductService.updateProduct,
  deleteProductById: ProductService.deleteProductById,
  deleteCartById: CartService.deleteCartById,
  deleteProductByCartId: CartService.deleteProductByCartId,
};

export { schema, root };
