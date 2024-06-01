const mongoose = require("mongoose");

const Connection = async (connection_uri) => {
  try {
    const Connection = await mongoose.connect(connection_uri, {});

    Connection.connections[0].readyState;

    console.log(`Database connection successful.`);
  } catch (err) {
    console.error(`Database connection unsuccessful: ${err.message}.`);
  }
};

module.exports = { Connection };
