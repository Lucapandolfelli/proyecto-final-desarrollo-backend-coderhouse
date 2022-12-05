import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, ref: "Category", require: true },
    thumbnail: { type: String, require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    in_cart: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = model("Product", ProductSchema);

export { ProductSchema, Product };
