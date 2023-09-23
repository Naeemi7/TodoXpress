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
    const { id } = JSON.parse(event.body);
    const taskId = mongoose.Types.ObjectId(id);

    // Use the same logic as your backend controller to mark the task as complete
    const completedTask = await Todo.findByIdAndUpdate(
      taskId,
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

    console.log(completedTask);
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        message: "Task is marked as done",
        completedTask,
      }),
    };
  } catch (error) {
    console.error("Error completing task:", error);

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
