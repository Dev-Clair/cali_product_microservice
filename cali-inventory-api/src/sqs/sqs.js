const dotenv = require("dotenv");
const { SendMessageCommand, SQS } = require("aws-sdk/clients/sqs");

dotenv.config("../../env");

const client = SQS;

const Sqs_Queue_Url =
  `arn:aws:sqs:` +
  process.env.AWS_REGION +
  `:` +
  process.env.AWS_ACCOUNT_ID +
  `:` +
  `Cali_Product_Queue`;

const AWS_SQS = async (Message_Body) => {
  const command = SendMessageCommand({
    QueueUrl: Sqs_Queue_Url,
    DelaySeconds: 15,
    MessageAttributes: {},
    MessageBody: JSON.stringify(Message_Body),
  });

  const response = await client.send(command);
  console.log(response);
};

module.exports = { AWS_SQS };
