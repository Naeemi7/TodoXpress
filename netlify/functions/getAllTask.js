const connectToDatabase = require("./dbConnection.js");
const Todo = require("./Todo.js");
const dotenv = require("dotenv");

dotenv.config();

const handler = async (event, context) => {
  try {
    await connectToDatabase();
    console.log("Fetching Tasks from database...");
    const tasks = await Todo.find();
    console.log("Fetched Tasks", tasks);

    if (!tasks || tasks.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No Tasks Found" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error) {
    console.error("Error happened:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }),
    };
  }
};

module.exports = { handler };
