import { Schema, model } from "mongoose";
import { ProductSchema } from "./Product.js";

const cartSchema = new Schema(
  {
    email: { type: String, require: true },
    products: { type: [ProductSchema], require: true },
    delivery_address: { type: String, require: true },
    total: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Cart = model("Cart", cartSchema);

export default Cart;
