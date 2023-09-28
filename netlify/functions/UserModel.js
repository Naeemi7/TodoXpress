const mongoose = require("mongoose");
const { todoSchema } = require("./TodoSchema.js");

const userSchema = new mongoose.Schema({
  username: { type: String, min: 6, max: 20, required: true },
  tasks: [todoSchema],
});

const User = mongoose.model("User", userSchema);

export default User;
