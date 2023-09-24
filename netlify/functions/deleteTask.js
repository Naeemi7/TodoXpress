import { connectToDatabase } from "./dbConnection.js";
import { model } from "mongoose";
import { ObjectId } from "mongoose";
import { StatusCodes } from "http-status-codes";
import dotenv from "dotenv";

dotenv.config();

const Todo = model("Todo");

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    await connectToDatabase();
    console.log("Received event body: ", event.body);
    const { id } = JSON.parse(event.body);
    const taskId = ObjectId(id);

    const deletedTask = await Todo.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return {
        statusCode: StatusCodes.NOT_FOUND,
        body: JSON.stringify({ message: "Task not found" }),
      };
    }

    console.log(deletedTask);
    return {
      statusCode: StatusCodes.OK,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept",
      },
      body: JSON.stringify({
        message: "Task is deleted",
        deletedTask,
      }),
    };
  } catch (error) {
    console.error("Error deleting task:", error);

    return {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
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
