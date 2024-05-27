const dotenv = require("dotenv");
const { consumer } = require("./src/consumer");
const { databaseService } = require("./service/databaseService");
const { queueLogger } = require("./service/loggerService");

// Load Environment Variables
dotenv.config(".env");

exports.handle = async (event) => {
  for (const record of event.Records) {
    await databaseService(process.env.MONGO_URI);
    try {
      await consumer(record.body);
    } catch (error) {
      queueLogger.error(`Error processing message: ${error.message}`);
    }
  }
};
