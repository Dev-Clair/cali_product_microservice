const Consumer = require("./consumer");
const getDbConnection = require("./connection");

getDbConnection;

exports.consume = async (event) => {
  for (const record of event.Records) {
    await Consumer(record.body).catch((err) => {
      console.error(`Process terminated: ${err.message}.`);
    });
  }
};
