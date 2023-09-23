const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    console.log("Received event body: ", event.body);
    const body = JSON.parse(event.body);

    if (!body.id) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "ID is required" }),
      };
    }

    const deletedTask = await Todo.findByIdAndDelete(body.id);

    if (!deletedTask) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task is deleted", deletedTask }),
    };
  } catch (error) {
    console.error("Error deleting task:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
