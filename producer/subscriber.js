module.exports = {
    subscriber: async (event, context) => {
        console.log("consumer 시작")

        const { Kafka } = require("kafkajs");
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092", "kafka.kubeless.svc:9092"],
        });
        const consumer = kafka.consumer({ groupId: "test-group" });

        await consumer.connect();
        await consumer.subscribe({ topic: "test-topic", fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });
            },
        });
        // await consumer.disconnect();
        console.log("consumer 종료")
    },
};
