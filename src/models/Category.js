import { model, Schema } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, require: true },
});

const Category = model("Category", CategorySchema);

export { Category, CategorySchema };
