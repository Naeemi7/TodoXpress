const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

const handler = async (event, context) => {
  try {
    await connectToDatabase();
    console.log("Received event body: ", event.body);
    const { id, title, description } = JSON.parse(event.body);

    const updatedTask = await Todo.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );

    if (!updatedTask) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body is empty" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Task is updated", updatedTask }),
    };
  } catch (error) {
    console.error("Error updating task:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};
module.exports = { handler };
