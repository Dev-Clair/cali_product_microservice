const { Consumer } = require("./consumer");

exports.consume = async (event) => {
  for (const record of event.Records) {
    await Consumer(record.body).catch((err) => {
      console.error(`Process terminated: ${err.message}.`);
    });
  }
};
