const dotenv = require("dotenv");
const DbConnection = require("mongoose");

dotenv.config();

let currentRetries = 0;

let retryDelay = 5000;

const maxRetries = 5;

const Connect = async () => {
  const connectionUri = process.env.MONGO_URI;
  try {
    console.log(`Attempting to connect.`);

    await DbConnection.connect(connectionUri, {
      serverSelectionTimeoutMS: 10000,
    });
  } catch (err) {
    if (currentRetries < maxRetries) {
      console.log(`Attempting to reconnect.`);

      currentRetries++;

      retryDelay *= 2;

      setTimeout(Connect, retryDelay);
    } else {
      console.log("Max retries reached. Could not reconnect to database.");
    }
  }
};

DbConnection.connection.on("connected", () => {
  console.log("Database connection successful");
});

DbConnection.connection.on("reconnected", () => {
  console.log("Database reconnection successful");
});

DbConnection.connection.on("disconnected", () => {
  console.log("Database connection failure");
});

DbConnection.connection.on("error", (err) => {
  console.log(`Database connection error: ${err.message}`);
});

Connect();

module.exports = DbConnection;
