const { default: mongoose } = require("mongoose");
const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    console.log("Received event body: ", event.body);
    const { id, title, description } = JSON.parse(event.body);
    const taskId = mongoose.Types.ObjectId(id);

    if (!title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Title is required" }),
      };
    }

    // Use the same logic as your backend controller to update the task
    const updatedTask = await Todo.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedTask) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    console.log(updatedTask);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        message: "Task is updated",
        updatedTask,
      }),
    };
  } catch (error) {
    console.error("Error updating task:", error);

    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
