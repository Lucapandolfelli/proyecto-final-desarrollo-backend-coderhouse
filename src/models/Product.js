import { Schema, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, require: true },
  description: { type: String, require: true },
  code: { type: String, require: true },
  thumbnail: { type: String, require: true },
  price: { type: Number, require: true },
  stock: { type: Number, require: true },
});

const Product = model("Product", productSchema);

export { productSchema, Product };
