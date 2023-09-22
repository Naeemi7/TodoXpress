const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

const handler = async (event, context) => {
  try {
    await connectToDatabase();
    console.log("Received event body: ", event.body);
    const body = JSON.parse(event.body);

    if (!body.title) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Title is required" }),
      };
    }

    const newTask = await Todo.create(body);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "New Task Created", newTask }),
    };
  } catch (error) {
    console.error("Error adding task:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

module.exports = { handler };
