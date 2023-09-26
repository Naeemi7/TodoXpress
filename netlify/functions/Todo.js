const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = model("Todo", todoSchema);

module.exports = Todo;
QAC;
