const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const run = async () => {
  // Producing
  await producer.connect();
  console.log(1)
  await producer.send({
    topic: "topic1",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
  console.log(2)
  process.exit()
};

run().catch(console.error);