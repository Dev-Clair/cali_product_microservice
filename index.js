const dotenv = require("dotenv");
const express = require("express");

dotenv.config(".env.local");

const app = express();

const port = process.env.MONGO_PORT || 3000;
app.listen(port, () => {
  // log server start timestamp
});
