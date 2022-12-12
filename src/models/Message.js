import { Schema, model } from "mongoose";

const ReplySchema = new Schema({
  user_id: { type: String, require: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hour: { type: String, required: true },
  image: { type: String, required: true },
});

const MessageSchema = new Schema({
  user_id: { type: String, require: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  hour: { type: String, required: true },
  image: { type: String, required: true },
  replies: { type: [ReplySchema], default: [] },
});

const Message = model("Message", MessageSchema);

export { Message, MessageSchema };
