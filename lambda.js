const dotenv = require("dotenv");
const consumerQueue = require("./queue/consumerQueue");
const databaseService = require("./service/databaseService");
const { queueLogger } = require("./service/loggerService");

// Load Environment Variables
dotenv.config(".env");

exports.handler = async (event) => {
  for (const record of event.Records) {
    await databaseService(process.env.MONGO_URI);
    try {
      await consumerQueue(record.body);
    } catch (error) {
      queueLogger.error(`Error processing message: ${error.message}`);
    }
  }
};
