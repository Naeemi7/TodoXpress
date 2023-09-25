const mongoose = require("mongoose");
const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

const Todo = model("Todo");

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    console.log("Received event body: ", event.body);
    const id = event.queryStringParameters.id;
    const deletedTask = await Todo.findByIdAndDelete(id);

    if (!deletedTask) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    console.log(deletedTask);
    return {
      statusCode: 200,

      body: JSON.stringify({
        message: "Task is deleted",
        deletedTask,
      }),
    };
  } catch (error) {
    console.error("Error deleting task:", error);

    return {
      statusCode: 500,

      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
