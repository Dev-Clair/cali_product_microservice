const dotenv = require("dotenv");
const AWS = require("aws-sdk");

dotenv.config("../../env");

const Sqs_Queue_Url =
  `arn:aws:sqs:` +
  process.env.AWS_REGION +
  `:` +
  process.env.AWS_ACCOUNT_ID +
  `:` +
  `Cali_Product_Queue`;

const SQS = new AWS.SQS();

const AWS_SQS = async (Message_Body) => {
  const SendMessageRequest = {
    QueueUrl: Sqs_Queue_Url,
    DelaySeconds: 15,
    MessageAttributes: {},
    MessageBody: JSON.stringify(Message_Body),
  };
  try {
    await SQS.sendMessage(SendMessageRequest).promise();

    console.log(`Message sent to queue`);
  } catch (err) {
    console.log(`Cannot send message to queue:\n${err.message}`);
  }
};

module.exports = { AWS_SQS };
