const { consumer } = require("./src/consumer");
const { queueLogger } = require("./src/service/loggerService");

exports.handle = async (event) => {
  for (const record of event.Records) {
    try {
      await consumer(record.body);
    } catch (error) {
      queueLogger.error(`Error processing message: ${error.message}`);
    }
  }
};
