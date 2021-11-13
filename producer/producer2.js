module.exports = {
    producer: async (event, context) => {
        console.log("event occurs");
        // const data = { userId: "1234123dsfadf", a: 0.1, b: 0.2 };

        const data = event.data;
        if (!data || data == "") {
            return "data doesn't exist";
        }

        const { Kafka } = require("kafkajs");
        const kafka = new Kafka({
            clientId: "my-app",
            brokers: ["localhost:9092", "kafka.kubeless.svc:9092"],
        });

        const producer = kafka.producer();
        await producer.connect();
        console.log("보내기");
        await producer.send({
            topic: "test-topic",
            messages: [{ value: null, data: data }],
        });
        console.log("컨수머");
        await producer.disconnect();
    },
};
