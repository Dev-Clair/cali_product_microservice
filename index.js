const express = require("express");
const dotenv = require("dotenv");

dotenv.config(".env");

const app = express();

const port = process.env.MONGO_PORT || 3000;
app.listen(port, () => {
  // log server start timestamp
});
