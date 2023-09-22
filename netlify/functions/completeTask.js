const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");

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

    const completedTask = await Todo.findByIdAndUpdate(
      body.id,
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
      body: JSON.stringify({ message: "Task is updated", completedTask }),
    };
  } catch (error) {
    console.error("Error completing task:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
