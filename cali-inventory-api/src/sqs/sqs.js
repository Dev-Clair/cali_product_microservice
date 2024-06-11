const config = require("../../config");
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");

const client = new SQSClient({});

const Sqs_Queue_Url =
  `arn:aws:sqs:` +
  config.AWS_REGION +
  `:` +
  config.AWS_ACCOUNT_ID +
  `:` +
  `Cali_Product_Queue`;

const Cali_Product_Queue = async (Message_Body) => {
  const command = new SendMessageCommand({
    QueueUrl: Sqs_Queue_Url,
    DelaySeconds: 15,
    MessageAttributes: {},
    MessageBody: JSON.stringify(Message_Body),
  });

  const response = await client.send(command);

  console.log(response);
};

module.exports = Cali_Product_Queue;
