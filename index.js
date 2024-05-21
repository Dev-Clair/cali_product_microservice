const express = require("express");
const productrouter = require("./../route/productroute");

dotenv.config(".env");

const app = express();

app.use(express.json());

app.use("api/v1/products", productrouter);

const port = process.env.MONGO_PORT || 3000;

app.listen(port, () => {
  // log server start timestamp
});
