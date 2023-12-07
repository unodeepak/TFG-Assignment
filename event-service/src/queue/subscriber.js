const amqp = require("amqplib");
const logger = require("../logger/logConfig");

const receiveMessage = async (queueName) => {
  try {
    // const connection = await amqp.connect("amqp://localhost");
    const connection = await amqp.connect("amqp://rabbitmq");
    const channel = await connection.createChannel();

    const exchange = "user_events";

    await channel.assertExchange(exchange, "fanout", { durable: false });
    await channel.assertQueue(queueName, { durable: false });
    await channel.bindQueue(queueName, exchange, "");

    channel.consume(
      queueName,
      (msg) => {
        if (msg.content) {
          const message = msg.content.toString();
          logger.info(message);
          console.log("Event received and logged:", message);
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.error(error);
  }
};

module.exports = receiveMessage;
