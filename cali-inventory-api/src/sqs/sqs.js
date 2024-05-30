const dotenv = require("dotenv");
const { SendMessageCommand, SQSClient } = require("aws-sdk");

dotenv.config("../../env");

const client = new SQSClient({});

const Sqs_Queue_Url =
  `arn:aws:sqs:` +
  process.env.AWS_REGION +
  `:` +
  process.env.AWS_ACCOUNT_ID +
  `:Cali_Product_Queue`;

const cali_product_queue = async (Message_Body) => {
  const command = new SendMessageCommand({
    QueueUrl: Sqs_Queue_Url,
    messageBody: Message_Body,
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};

module.exports = { cali_product_queue };
