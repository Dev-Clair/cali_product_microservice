const dotenv = require("dotenv");
const productQueueConsumer = require("./queue/productQueueConsumer");
const databaseService = require("./service/databaseService");
const { queueLogger } = require("./service/loggerService");

// Load Environment Variables
dotenv.config(".env");

exports.handler = async (event) => {
  for (const record of event.Records) {
    await databaseService(process.env.MONGO_URI);
    try {
      await productQueueConsumer(record.body);
    } catch (error) {
      queueLogger.error(`Error processing message: ${error.message}`);
    }
  }
};
