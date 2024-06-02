const dotenv = require("dotenv");
const DbConnection = require("mongoose");

dotenv.config();

let currentRetries = 0;

let retryDelay = 5000;

const maxRetries = 5;

const Connect = async () => {
  const connectionUri = process.env.MONGO_URI;
  try {
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
      console.log(
        `Database connection error.\nMax retries reached, Could not establish connection to database:\n${err.message}`
      );
    }
  }
};

DbConnection.connection.on("connecting", () => {
  console.log(`Attempting to connect`);
});

DbConnection.connection.on("connected", () => {
  console.log("Database connection successful");
});

DbConnection.connection.on("disconnected", () => {
  console.log("Database connection failure");
});

DbConnection.connection.on("reconnected", () => {
  console.log("Database reconnection successful");
});

Connect();

module.exports = DbConnection;
