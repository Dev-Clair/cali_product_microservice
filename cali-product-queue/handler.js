const { consumer } = require("./consumer");

exports.consume = async (event) => {
  for (const record of event.Records) {
    await consumer(record.body).catch(() => {
      console.error(`Process terminated: ${error.message}.`);
    });
  }
};
