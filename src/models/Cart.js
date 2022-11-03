import { Schema, model } from "mongoose";
import { productSchema } from "./Product.js";

const cartSchema = new Schema({
  products: { type: [productSchema], require: true },
});

const Cart = model("Cart", cartSchema);

export default Cart;
