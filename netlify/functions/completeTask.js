const mongoose = require("mongoose");
const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();

    const id = event.queryStringParameters.id;
    console.log("Received event params: ", id);
    const completedTask = await Todo.findByIdAndUpdate(
      id,
      {
        completed: true,
      },
      { new: true }
    );

    if (!completedTask) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    return {
      statusCode: 200,

      body: JSON.stringify({
        message: "Task is marked as done",
        completedTask,
      }),
    };
  } catch (error) {
    console.error("Error completing task:", error);

    return {
      statusCode: 500,

      body: JSON.stringify(error),
    };
  }
};
