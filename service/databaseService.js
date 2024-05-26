const mongoose = require("mongoose");

const databaseService = async (connectionString) => {
  await mongoose.connect(connectionString);
};

module.exports = { databaseService };
