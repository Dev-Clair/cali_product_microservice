const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCOUNT_ID: process.env.AWS_ACCOUNT_ID,
};
