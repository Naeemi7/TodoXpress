const connectToDatabase = require("./dbConnection.js");
const User = require("./UserModel.js");
const dotenv = require("dotenv");

dotenv.config();

exports.handler = async (event, context) => {
  try {
    await connectToDatabase();

    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Request body is required" }),
      };
    }

    const { username } = JSON.parse(event.body);

    if (!username) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Username is required" }),
      };
    }

    const newUser = await User.create({
      username,
    });

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "New User Created", newUser }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error", error }),
    };
  }
};
