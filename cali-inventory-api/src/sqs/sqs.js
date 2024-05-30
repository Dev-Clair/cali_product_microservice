const dotenv = require("dotenv");
const { SendMessageCommand, SQSClient } = require("aws-sdk/clients/sqs");
// import { SendMessageCommand, SQSClient } from "@aws-sdk/clients/sqs";

dotenv.config("../../env");

const client = new SQSClient({});

const Sqs_Queue_Url =
  `arn:aws:sqs:` +
  process.env.AWS_REGION +
  `:` +
  process.env.AWS_ACCOUNT_ID +
  `:` +
  `Cali_Product_Queue`;

const cali_product_queue = async (Message_Body) => {
  const command = new SendMessageCommand({
    QueueUrl: Sqs_Queue_Url,
    DelaySeconds: 15,
    MessageAttributes: {},
    MessageBody: JSON.stringify(Message_Body),
  });

  const response = await client.send(command);
  console.log(response);
};

module.exports = { cali_product_queue };
