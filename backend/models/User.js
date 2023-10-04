import { Schema, model } from "mongoose";
import { todoSchema } from "./Todo.js";

const userSchema = new Schema({
  username: { type: String, required: true },
  tasks: [todoSchema],
});

const User = model("User", userSchema);

export default User;
