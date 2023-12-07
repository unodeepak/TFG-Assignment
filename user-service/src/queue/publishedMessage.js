const amqp = require("amqplib");

const publishedMessage = async (event, username) => {
  try {
    // const rmqConnect = await amqp.connect("amqp://localhost");
    const rmqConnect = await amqp.connect("amqp://rabbitmq");
    const channel = await rmqConnect.createChannel();

    const msg = `User ${username} and date ${new Date()}`;
    await channel.assertExchange(event, "fanout", { durable: false });
    channel.publish(event, "", Buffer.from(msg));

    setTimeout(() => {
      rmqConnect.close();
    }, 1000);
    console.log({ msg });
  } catch (error) {
    console.log("Error is: ", error);
    console.error(error);
  }
};

module.exports = publishedMessage;
