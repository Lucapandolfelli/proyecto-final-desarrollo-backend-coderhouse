import { Schema, model } from "mongoose";
import { MessageSchema } from "./Message.js";

const userSchema = new Schema(
  {
    username: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    address: { type: String, require: true },
    age: { type: Number, require: true },
    phone: { type: String, require: true },
    image: { type: String, require: true },
    cart_id: { type: String, require: true },
    messages: { type: [MessageSchema] },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
