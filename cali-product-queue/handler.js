const { consumer } = require("./src/consumer");
const { logger } = require("./src/service/loggerService");

exports.consume = async (event) => {
  for (const record of event.Records) {
    try {
      await consumer(record.body);
    } catch (error) {
      logger.error(`Error processing message: ${error.message}`);
    }
  }
};
