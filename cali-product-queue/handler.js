const { consumer } = require("./src/consumer");

exports.consume = async (event) => {
  for (const record of event.Records) {
    try {
      console.log(record.body);
      await consumer(record.body);
    } catch (error) {
      console.log(`Error processing message: ${error.message}`);
    }
  }
};
