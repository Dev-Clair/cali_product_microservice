const dotenv = require("dotenv");
const productQueueConsumer = require("./productQueueConsumer");
const databaseService = require("../service/databaseService");

// Load Environment Variables
dotenv.config("../.env");
